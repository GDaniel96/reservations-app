<template>
  <div
    class="flex justify-center bg-[#94a3b8] items-center w-full h-screen gap-2 px-6"
  >
    <div class="text flex flex-col items-center text-2xl gap-6 w-2/4 px-3">
      <h1>
        Simplify the reservation process by selecting the day and the time
        needed. You just need to submit your request and you will receive an
        e-mail with all the details
      </h1>
      <NuxtLink to="/new" v-if="userStore.userData.userLoggedIn">
        <button
          class="bg-[#113946] hover:bg-[#475569] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Make a reservation
        </button>
      </NuxtLink>
    </div>
    <div
      v-if="!userStore.userData.userLoggedIn"
      class="w-2/4 h-2/4 bg-[#334155] h-fit bg-opacity-100 p-4 flex gap-2 flex-col rounded overflow-none"
    >
      <Authentication />
    </div>

    <div
      v-else
      class="previous-reservations w-2/4 h-2/4 bg-[#334155] p-4 flex gap-3 flex-col rounded overflow-auto"
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

export default {
  setup() {
    const userStore = useUserStore();
    const auth = inject("auth");

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        return;
      }

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
