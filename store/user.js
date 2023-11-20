import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", () => {
  const userData = ref({
    userLoggedIn: false,
  });

  const userRegistrationData = ref({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  return {
    userData,
    userRegistrationData,
  };
});
