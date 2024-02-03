<template>
  <h1 class="text-xl text-white text-center">My reservations</h1>
  <div class="filters flex justify-evenly">
    <div class="flex gap-2">
      <input value="all" type="radio" name="filter" v-model="currentFilter" />
      <label for="all" class="text-xs sm:text-base">All </label>
    </div>
    <div class="flex gap-2">
      <input
        value="nextWeek"
        type="radio"
        name="filter"
        v-model="currentFilter"
      />
      <label for="nextWeek" class="text-xs sm:text-base">Next week </label>
    </div>
    <div class="flex gap-2">
      <input
        value="nextMonth"
        type="radio"
        name="filter"
        v-model="currentFilter"
      />
      <label for="nextMonth" class="text-xs sm:text-base">Next month </label>
    </div>
  </div>
  <div
    v-for="document in reservationDocuments"
    class="w-full h-auto bg-[#0f172a] rounded p-2 text-sm sm:text-base text-white flex flex-col gap-2 overflow-visible relative"
  >
    <h2 class="description font-bold text-base sm:text-xl overflow-auto">
      {{ document.description }}
    </h2>
    <h2>{{ document.fullName }}</h2>
    <p>{{ document.email }}</p>
    <p>{{ new Date(document.selectedDate.seconds * 1000).toDateString() }}</p>
    <p>{{ new Date(document.selectedDate.seconds * 1000).toTimeString() }}</p>
    <button
      class="bg-[#dc2626] hover:bg-[#ec4949] rounded-full w-6 absolute -top-2 -right-2"
      @click="deleteReservation(document.docId)"
    >
      <i class="fa-solid fa-trash-can"></i>
    </button>
  </div>
</template>

<script>
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { inject } from "vue";
import { useUserStore } from "../store/user";

export default {
  setup() {
    const reservationDocuments = ref([]);
    const userStore = useUserStore();
    const db = inject("firestore");
    const auth = inject("auth");
    const currentFilter = ref("all");
    const cutoffDate = computed(() => {
      return getCutoffDateByFilterType(currentFilter);
    });
    const isAdmin = userStore.userData.isAdmin;

    const getCutoffDateByFilterType = (filterType) => {
      const currentDate = new Date();
      if (filterType.value === "all") {
        return new Date();
      } else if (filterType.value === "nextWeek") {
        return new Date(
          new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000)
        );
      } else if (filterType.value === "nextMonth") {
        return new Date(
          new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        );
      }
    };

    const getDocuments = async () => {
      const user = auth.currentUser;

      if (!user) {
        return;
      }

      const queryArguments = [collection(db, "reservations")];
      queryArguments.push(where("selectedDate", ">=", cutoffDate.value));

      if (!isAdmin) {
        queryArguments.push(where("userId", "==", user.uid));
      }

      const documentsByUserQuery = query(...queryArguments);

      const querySnapshot = await getDocs(documentsByUserQuery);

      reservationDocuments.value = [];

      querySnapshot.forEach((doc) => {
        reservationDocuments.value.push({ ...doc.data(), docId: doc.id });
      });
    };

    const deleteReservation = async (docId) => {
      await deleteDoc(doc(db, "reservations", docId));
      reservationDocuments.value = [];
      getDocuments();
    };

    onBeforeMount(() => {
      getDocuments();
    });

    watch(cutoffDate, () => {
      getDocuments();
    });

    return {
      reservationDocuments,
      deleteReservation,
      currentFilter,
      cutoffDate,
    };
  },
};
</script>

<style>
.description::-webkit-scrollbar {
  height: 10px;
}

/* Track */
.description::-webkit-scrollbar-track {
  background: #94a3b8;
  border-radius: 5px;
}

/* Handle */
.description::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 5px;
}
</style>
