<template>
  <section>
    <div class="form-header flex justify-center gap-2">
      <div
        class="w-1/2 text-center p-4 bg rounded-t"
        :class="{
          'bg-[#1e293b]': userHasAccount,
          'bg-[#334155]': !userHasAccount,
        }"
      >
        <a href="#" @click="switchAuthenticationForm">Login</a>
      </div>
      <div
        class="w-1/2 text-center p-4 rounded-t"
        :class="{
          'bg-[#1e293b]': !userHasAccount,
          'bg-[#334155]': userHasAccount,
        }"
      >
        <a href="#" @click="switchAuthenticationForm">Register</a>
      </div>
    </div>

    <div class="form-container">
      <LoginForm v-if="userHasAccount" />
      <RegisterForm v-else />
    </div>
  </section>
</template>

<script>
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";

export default {
  setup() {
    const userHasAccount = ref(true);
    const switchAuthenticationForm = () => {
      userHasAccount.value = !userHasAccount.value;
    };
    return { userHasAccount, switchAuthenticationForm };
  },

  components: {
    LoginForm,
  },
};
</script>
