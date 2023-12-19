import { defineStore } from "pinia";
import { inject } from "vue";

export const useUserStore = defineStore("userStore", () => {
  const auth = inject("auth");

  const userData = ref({
    userLoggedIn: false,
    isAdmin: false,
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
