import { defineStore } from "pinia";

export const useNewReservationStore = defineStore("newReservationStore", () => {
  const reservationData = ref({
    selectedDate: new Date(),
    fullName: "",
    email: "",
    description: "",
  });

  return { reservationData };
});
