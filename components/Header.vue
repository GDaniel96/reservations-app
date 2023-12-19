<template>
  <nav
    class="w-full h-13 py-4 flex gap-2 justify-center items-center bg-[#112337] text-white mb-6"
  >
    <NuxtLink to="/">
      <button class="p-2 bg-[#113946] hover:bg-[#475569] rounded">Home</button>
    </NuxtLink>
    <div
      v-if="userStore.userData.userLoggedIn"
      class="flex justify-between gap-2"
    >
      <NuxtLink to="/new">
        <button class="p-2 bg-[#113946] hover:bg-[#475569] rounded">
          New Reservation
        </button>
      </NuxtLink>

      <button
        @click="logout"
        class="p-2 bg-[#dc2626] hover:bg-[#ec4949] rounded"
      >
        Logout
      </button>
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
        navigateTo("/");
      } catch (error) {
        console.log(error);
      }
    };

    return {
      userStore,
      logout,
      auth,
    };
  },
};
</script>
