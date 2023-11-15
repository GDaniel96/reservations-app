import { defineStore } from "pinia";

export const useDateStore = defineStore("dateStore", () => {
  const reservationData = ref({
    currentDate: new Date(),
    selectedDate: null,
    fullName: "",
    email: "",
    description: "",
  });

  const formatedDate = computed(() => {
    return reservationData.value.currentDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  });

  const formatedTime = computed(() => {
    return reservationData.value.currentDate.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  });

  function setData(data) {
    reservationData.value.selectedDate = new Date(`${data.date}  ${data.time}`);
  }

  return { reservationData, setData, formatedDate, formatedTime };
});
