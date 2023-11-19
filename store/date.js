import { defineStore } from "pinia";

export const useNewReservationStore = defineStore("newReservationStore", () => {
  const reservationData = ref({
    selectedDate: new Date(),
    fullName: "",
    email: "",
    description: "",
  });

  function setData(data) {
    reservationData.value.selectedDate = new Date(`${data.date}  ${data.time}`);
  }

  return { reservationData, setData };
});
