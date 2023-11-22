<template>
  <div
    class="container mx-auto h-full flex justify-center items-center h-screen gap-2"
  >
    <div class="text flex flex-col gap-10 items-center section text-2xl w-1/2">
      <h1>
        Simplify the reservation process by selecting the day and the time
        needed. You just need to submit your request and you will receive an
        e-mail with all the details
      </h1>
      <NuxtLink to="/new" v-if="userStore.userData.userLoggedIn">
        <button
          class="p-2 bg-teal-500 rounded w-fit text-white border-neutral-950 border-2"
        >
          Make a reservation
        </button>
      </NuxtLink>
    </div>
    <div
      v-if="!userStore.userData.userLoggedIn"
      class="w-2/4 h-2/4 bg-[#4B4B4F] h-fit bg-opacity-70 p-4 flex gap-2 flex-col rounded-2xl overflow-auto"
    >
      <Authentication />
    </div>

    <div
      v-else
      class="previous-reservations w-2/4 h-2/4 bg-[#4B4B4F] bg-opacity-70 p-4 flex gap-2 flex-col rounded-2xl overflow-auto"
    >
      <div
        class="w-full h-20 bg-[#2D2D30] rounded-3xl p-2 text-white"
        v-for="document in dbDocuments"
      >
        <p>{{ document.fullName }}</p>
        <p>{{ document.email }}</p>
        <p>{{ document.description }}</p>
        <p>{{ document.selectedDate.seconds }}</p>
      </div>
    </div>
  </div>

  <!-- <div
    class="w-full h-20 bg-[#2D2D30] rounded-3xl p-2 text-white"
    v-for="document in test"
  >
    <p>{{ document.fullName }}</p>
    <p>{{ document.email }}</p>
    <p>{{ document.description }}</p>
    <p>{{ document.selectedDate.seconds }}</p>
  </div> -->
</template>

<script>
import Authentication from "../components/Authentication.vue";
import { useUserStore } from "../store/user";
import { collection, getDocs } from "firebase/firestore";
import { inject, onBeforeMount, onBeforeUnmount } from "vue";

export default {
  async setup() {
    const userStore = useUserStore();
    const auth = inject("auth");
    const db = inject("firestore");
    const reservationCollection = collection(db, "reservations");
    // const test = ref([]);

    // onBeforeUnmount(() => {
    //   console.log("components before unmount");

    // reservationDocuments.forEach((doc) => {
    //   if (doc.data().userId === auth.currentUser.uid) {
    //     test.value.push(doc.data());
    //   } else {
    //     return;
    //   }
    // });
    // });
    // const userQuery = query(
    //   reservationCollection,
    //   where("userId", "==", auth.currentUser.uid)
    // );
    const reservationDocuments = await getDocs(reservationCollection);

    const dbDocuments = computed(() => {
      const items = [];

      reservationDocuments.forEach((doc) => {
        if (doc.data().userId === auth.currentUser.uid) {
          items.push(doc.data());
          // test.value.push(doc.data());
        } else {
          return;
        }
      });
      console.log(items);
      return items;
    });

    return {
      dbDocuments,
      userStore,
      // test,
    };
  },
  components: { Authentication },
};
</script>
