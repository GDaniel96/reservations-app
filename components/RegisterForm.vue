<template>
  <main>
    <VForm
      class="bg-[#1e293b] shadow-md rounded-tl-none px-8 pt-6 pb-8 mb-4"
      @submit="registerUser"
    >
      <div class="relative z-0 w-full mb-6 group">
        <VField
          class="block py-2 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer sm:py-2.5"
          name="firstName"
          type="text"
          placeholder=""
          v-model="userStore.userRegistrationData.firstName"
        />
        <label
          class="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 sm:text-sm"
          for="firstName"
        >
          First Name
        </label>
        <VErrorMessage class="text-red-600" name="email" />
      </div>
      <div class="relative z-0 w-full mb-6 group">
        <VField
          class="block py-2 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer sm:py-2.5"
          name="lastName"
          type="text"
          placeholder=""
          v-model="userStore.userRegistrationData.lastName"
        />
        <label
          class="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 sm:text-sm"
          for="lastName"
        >
          Last Name
        </label>
        <VErrorMessage class="text-red-600" name="email" />
      </div>

      <div class="relative z-0 w-full mb-6 group">
        <VField
          class="block py-2 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer sm:py-2.5"
          name="email"
          type="text"
          placeholder=""
          v-model="userStore.userRegistrationData.email"
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
          v-model="userStore.userRegistrationData.password"
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
  </main>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useUserStore } from "../store/user";
import { inject } from "vue";

export default {
  setup() {
    const auth = inject("auth");
    const db = inject("firestore");
    const userStore = useUserStore();

    const registerUser = async () => {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        userStore.userRegistrationData.email,
        userStore.userRegistrationData.password
      );
      await addDoc(collection(db, "users"), {
        uid: userCred.user.uid,
        firstName: userStore.userRegistrationData.firstName,
        lastName: userStore.userRegistrationData.lastName,
        email: userStore.userRegistrationData.email,
        role: userStore.userRegistrationData.role,
        password: userStore.userRegistrationData.password,
      });

      resetForm();
    };

    const resetForm = () => {
      userStore.userRegistrationData.firstName = "";
      userStore.userRegistrationData.lastName = "";
      userStore.userRegistrationData.email = "";
      userStore.userRegistrationData.password = "";
    };
    return { registerUser, userStore };
  },
};
</script>
