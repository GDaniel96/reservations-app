<template>
  <h1 class="text-xl text-white text-center">My reservations</h1>
  <div class="filters flex justify-evenly">
    <div class="flex gap-2">
      <input
        type="checkbox"
        name="all"
        v-model="filters.showAll"
        @click="toggleFilters"
        :disabled="filters.showAll"
      />
      <label for="all" class="text-xs sm:text-base">All </label>
    </div>
    <div class="flex gap-2">
      <input
        type="checkbox"
        name="nextWeek"
        v-model="filters.nextWeek"
        @click="toggleFilters"
        :disabled="filters.nextWeek"
      />
      <label for="nextWeek" class="text-xs sm:text-base">Next week </label>
    </div>
    <div class="flex gap-2">
      <input
        type="checkbox"
        name="nextMonth"
        v-model="filters.nextMonth"
        @click="toggleFilters"
        :disabled="filters.nextMonth"
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
  getDoc,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { inject } from "vue";

export default {
  setup() {
    const reservationDocuments = ref([]);
    const db = inject("firestore");
    const auth = inject("auth");
    const filters = ref({
      showAll: true,
      nextWeek: false,
      nextMonth: false,
    });

    const getDocuments = async () => {
      const user = auth.currentUser;

      if (!user) {
        return;
      }

      const userAdminDoc = doc(db, "users", "04oZeeW25fgRQG4ISdXI");
      const queryAdminSnapshot = await getDoc(userAdminDoc);

      const documentsByUserQuery = query(
        collection(db, "reservations"),
        where("userId", "==", user.uid)
      );

      const querySnapshot = await getDocs(
        user.uid === queryAdminSnapshot.data().uid
          ? collection(db, "reservations")
          : documentsByUserQuery
      );

      querySnapshot.forEach((doc) => {
        reservationDocuments.value.push({ ...doc.data(), docId: doc.id });
      });
    };

    const deleteReservation = async (docId) => {
      await deleteDoc(doc(db, "reservations", docId));
      reservationDocuments.value = [];
      getDocuments();
    };

    const toggleFilters = () => {
      if (!filters.value.showAll) {
        showAll();
      } else if (!filters.value.nextWeek) {
        showNextWeek();
      } else if (!filters.value.nextMonth) {
        showNextMonth();
      }
    };

    const showAll = () => {
      filters.value.nextWeek = false;
      filters.value.nextMonth = false;
      reservationDocuments.value = [];
      getDocuments();
    };

    const showNextWeek = () => {
      const currentDate = new Date();
      const nextWeek = new Date(currentDate);

      filters.value.showAll = false;
      filters.value.nextMonth = false;
      reservationDocuments.value = reservationDocuments.value.filter((item) => {
        if (
          item.selectedDate.seconds * 1000 <=
          nextWeek.setDate(nextWeek.getDate() + 7)
        ) {
          return true;
        }
      });
    };

    const showNextMonth = () => {
      const currentDate = new Date();

      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      filters.value.showAll = false;
      filters.value.nextWeek = false;

      let nextMonth = currentMonth + 1;
      let nextYear = currentYear;

      if (nextMonth > 11) {
        nextMonth = 0;
        nextYear += 1;
      }

      const nextMonthDate = new Date(nextYear, nextMonth, 1);

      if (
        item.selectedDate.seconds * 1000 >=
        nextMonthDate.setDate(nextMonthDate.getDate())
      ) {
        return true;
      }
    };

    onBeforeMount(() => {
      getDocuments();
    });

    return {
      reservationDocuments,
      deleteReservation,
      filters,
      toggleFilters,
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
