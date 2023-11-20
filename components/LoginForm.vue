<template>
  <div
    class="text-white text-center font-bold p-4"
    :class="login_color"
    v-if="login_show_alert"
  >
    {{ login_message }}
  </div>
  <VForm
    class="bg-[#334155] shadow-md rounded-tl-none px-8 pt-6 pb-8 mb-4"
    @submit="submitLogInInformation"
  >
    <div class="relative z-0 w-full mb-6 group">
      <VField
        class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        name="email"
        type="text"
        placeholder=""
        v-model="loginDetails.email"
      />
      <label
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        for="email"
      >
        Email
      </label>
      <VErrorMessage class="text-red-600" name="email" />
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <VField
        class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        name="password"
        type="password"
        placeholder=""
        v-model="loginDetails.password"
      />
      <label
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        for="password"
      >
        Password
      </label>
      <VErrorMessage class="text-red-600" name="password" />
    </div>
    <div class="flex items-center justify-between flex-col">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Submit
      </button>
    </div>
  </VForm>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { useUserStore } from "~/store/user";

export default {
  setup() {
    const auth = inject("auth");
    const db = inject("firestore");
    const userStore = useUserStore();

    const login_show_alert = ref(false);
    const login_message = ref("");
    const login_color = ref("");

    const loginDetails = ref({
      email: "",
      password: "",
    });

    const submitLogInInformation = async () => {
      login_show_alert.value = true;
      login_message.value = "Please wait! You are being logged in";
      login_color.value = "bg-blue-500";
      try {
        await signInWithEmailAndPassword(
          auth,
          loginDetails.value.email,
          loginDetails.value.password
        );

        login_show_alert.value = true;
        login_message.value = "Congratulations! You logged in successfully ";
        login_color.value = "bg-green-500";

        userStore.userData.userLoggedIn = true;
      } catch (error) {
        console.log(error.code);
        login_show_alert.value = true;
        login_message.value = `Ups! There is an error: ${error.code}`;
        login_color.value = "bg-red-500";
      }
    };

    return {
      loginDetails,
      submitLogInInformation,
      login_show_alert,
      login_message,
      login_color,
    };
  },
};
</script>
