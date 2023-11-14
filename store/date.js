import { defineStore } from "pinia";

export const useDateStore = defineStore("dateStore", () => {
  const currentDate = ref(new Date());

  function setDate(dateValue) {
    currentDate.value = new Date(dateValue);
    console.log(dateValue);
  }
  return { currentDate, setDate };
});
