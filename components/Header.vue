<template>
  <nav
    class="w-full h-13 py-4 flex gap-2 justify-center items-center bg-[#BCA37F] text-white"
  >
    <i class="fa-solid fa-calendar-days fa-2xl"></i>
    <NuxtLink to="/">
      <button class="p-2 bg-[#113946] rounded">Home</button>
    </NuxtLink>
    <div v-if="userStore.userData.userLoggedIn" class="flex justify-between">
      <NuxtLink to="/new">
        <button class="p-2 bg-[#113946] rounded">New Reservation</button>
      </NuxtLink>
      <p>
        {{
          `Hello, ${userStore.userRegistrationData.firstName} ${userStore.userRegistrationData.lastName}`
        }}
      </p>
      <button @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script>
import { useUserStore } from "../store/user";
import { signOut } from "firebase/auth";
import { inject } from "vue";

export default {
  setup() {
    const auth = inject("auth");
    const userStore = useUserStore();

    const logout = async () => {
      try {
        await signOut(auth);
        userStore.userData.userLoggedIn = false;
        console.log("sign-out success");
      } catch (error) {
        console.log(error);
      }
    };

    return {
      userStore,
      logout,
    };
  },
};
</script>
