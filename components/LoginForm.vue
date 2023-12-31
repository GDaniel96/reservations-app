<template>
  <div
    class="text-white text-center text-sm font-bold p-4"
    :class="loginColor"
    v-if="loginShowAlert"
  >
    {{ loginMessage }}
  </div>
  <VForm
    class="bg-[#1e293b] shadow-md rounded-tl-none px-8 pt-6 pb-8 mb-4"
    @submit="submitLogInInformation"
  >
    <div class="relative z-0 w-full mb-6 group">
      <VField
        class="block py-2 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer sm:py-2.5"
        name="email"
        type="text"
        placeholder=""
        v-model="loginDetails.email"
      />
      <label
        class="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 sm:text-sm"
        for="email"
      >
        Email
      </label>
      <VErrorMessage class="text-red-600" name="email" />
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <VField
        class="block py-2 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer sm:py-2.5"
        name="password"
        type="password"
        placeholder=""
        v-model="loginDetails.password"
      />
      <label
        class="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 sm:text-sm"
        for="password"
      >
        Password
      </label>
      <VErrorMessage class="text-red-600" name="password" />
    </div>
    <div class="flex items-center justify-between flex-col">
      <button
        class="bg-[#113946] hover:bg-[#475569] text-white text-sm py-1 px-2 rounded focus:outline-none focus:shadow-outline sm:py-2 px-4"
        type="submit"
      >
        Submit
      </button>
    </div>
  </VForm>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  setup() {
    const auth = inject("auth");

    const loginShowAlert = ref(false);
    const loginMessage = ref("");
    const loginColor = ref("");

    const loginDetails = ref({
      email: "",
      password: "",
    });

    const submitLogInInformation = async () => {
      loginShowAlert.value = true;
      loginMessage.value = "Please wait! You are being logged in";
      loginColor.value = "bg-blue-500";
      try {
        await signInWithEmailAndPassword(
          auth,
          loginDetails.value.email,
          loginDetails.value.password
        );

        loginMessage.value = "Congratulations! You logged in successfully ";
        loginColor.value = "bg-green-500";
      } catch (error) {
        loginMessage.value = `Ups! There is an error: ${error.code}`;
        loginColor.value = "bg-red-500";
      }
    };

    return {
      loginDetails,
      submitLogInInformation,
      loginShowAlert,
      loginMessage,
      loginColor,
    };
  },
};
</script>
