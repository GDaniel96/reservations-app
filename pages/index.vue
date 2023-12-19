<template>
  <div
    class="bg-[#94a3b8] h-full flex flex-col gap-10 mb-6 px-3 md:flex-row h-full items-center gap-2"
  >
    <div class="text flex flex-col items-center gap-6 md:w-2/4 text-center">
      <h1 class="text-2xl md:text-3xl">ReserveIt</h1>
      <p class="md:text-xl">
        Simplify the reservation process by selecting the day and the time
        needed. You just need to submit your request and you will receive an
        e-mail with all the details
      </p>
      <NuxtLink to="/new" v-if="userStore.userData.userLoggedIn">
        <button
          class="bg-[#113946] hover:bg-[#475569] text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline sm:py-2 px-4"
        >
          Make a reservation
        </button>
      </NuxtLink>
    </div>
    <div
      v-if="!userStore.userData.userLoggedIn"
      class="bg-[#334155] h-fit bg-opacity-100 p-4 flex gap-2 flex-col rounded overflow-none md:w-2/4"
    >
      <Authentication />
    </div>

    <div
      v-else
      class="previous-reservations bg-[#334155] p-4 flex gap-3 flex-col rounded overflow-auto md:w-2/4"
    >
      <Reservations />
    </div>
  </div>
</template>

<script>
import Authentication from "../components/Authentication.vue";
import Reservations from "../components/Reservations.vue";
import Loading from "~/components/Loading.vue";
import { useUserStore } from "../store/user";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, query, where, collection } from "firebase/firestore";

export default {
  setup() {
    const userStore = useUserStore();
    const auth = inject("auth");
    const db = inject("firestore");

    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        return;
      }
      const userDocument = query(
        collection(db, "users"),
        where("uid", "==", user.uid)
      );
      const userQuerySnapshot = await getDocs(userDocument).then(
        (documents) => {
          return documents.docs[0];
        }
      );
      userStore.userData.isAdmin =
        userQuerySnapshot.data().role === "admin" ? true : false;

      userStore.userData.userLoggedIn = true;
    });

    return {
      userStore,
    };
  },
  components: { Authentication, Reservations, Loading },
};
</script>

<style>
.previous-reservations::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.previous-reservations::-webkit-scrollbar-track {
  background: #94a3b8;
  border-radius: inherit;
}

/* Handle */
.previous-reservations::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 5px;
}
</style>
