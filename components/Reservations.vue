<template>
  <div
    v-for="document in reservationDocuments"
    class="w-full h-20 bg-[#2D2D30] rounded-3xl p-2 text-white"
  >
    <p>{{ document.fullName }}</p>
    <p>{{ document.email }}</p>
    <p>{{ document.description }}</p>
    <p>{{ document.selectedDate.seconds }}</p>
  </div>
</template>

<script>
import { collection, getDocs, query, where } from "firebase/firestore";
import { inject } from "vue";

export default {
  setup() {
    const reservationDocuments = ref([]);

    const getDocuments = async () => {
      const auth = inject("auth");
      const db = inject("firestore");
      const user = auth.currentUser;

      if (!user) {
        return;
      }

      const documentsByUserQuery = query(
        collection(db, "reservations"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(documentsByUserQuery);

      querySnapshot.forEach((doc) => {
        reservationDocuments.value.push(doc.data());
      });
    };

    onBeforeMount(() => {
      getDocuments();
    });
    return {
      reservationDocuments,
    };
  },
};
</script>
