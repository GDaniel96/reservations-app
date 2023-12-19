<template>
  <section>
    <div class="form-header flex justify-center gap-2">
      <div
        class="w-1/2 text-center p-4 bg rounded-t text-sm"
        :class="{
          'bg-[#1e293b]': loginFormVisible,
          'bg-[#334155]': !loginFormVisible,
        }"
      >
        <a href="#" @click="switchAuthenticationForm">Login</a>
      </div>
      <div
        class="w-1/2 text-center p-4 rounded-t text-sm"
        :class="{
          'bg-[#1e293b]': !loginFormVisible,
          'bg-[#334155]': loginFormVisible,
        }"
      >
        <a href="#" @click="switchAuthenticationForm">Register</a>
      </div>
    </div>

    <div class="form-container">
      <LoginForm v-if="loginFormVisible" />
      <RegisterForm v-else />
    </div>
  </section>
</template>

<script>
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";

export default {
  setup() {
    const loginFormVisible = ref(true);
    const switchAuthenticationForm = () => {
      loginFormVisible.value = !loginFormVisible.value;
    };
    return { loginFormVisible, switchAuthenticationForm };
  },

  components: {
    LoginForm,
  },
};
</script>
