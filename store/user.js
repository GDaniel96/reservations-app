import { defineStore } from "pinia";
import { inject } from "vue";

export const useUserStore = defineStore("userStore", () => {
  const auth = inject("auth");

  const userData = ref({
    userLoggedIn: false,
  });

  const userRegistrationData = ref({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });

  return {
    userData,
    userRegistrationData,
  };
});
