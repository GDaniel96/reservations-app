<template>
  <h1 class="text-2xl text-white">My reservations</h1>
  <div
    v-for="document in reservationDocuments"
    class="w-full h-auto bg-[#0f172a] rounded p-2 text-white flex flex-col gap-2 overflow-visible relative"
  >
    <h2 class="description font-bold text-lg overflow-auto">
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

    onBeforeMount(() => {
      getDocuments();
    });

    return {
      reservationDocuments,
      deleteReservation,
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
