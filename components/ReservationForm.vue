<template>
  <section class="flex w-full flex gap-6 mt-10">
    <div class="date-container w-full">
      <DatePicker
        v-model="store.reservationData.currentDate"
        expanded
        mode="dateTime"
        is24hr
        is-dark
      />
      <p>{{ store.reservationData.currentDate }}</p>
    </div>
    <div
      class="form-container w-full bg-[#0f172a] shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <VForm
        class="bg-[#334155] shadow-md rounded px-8 pt-6 pb-8 mb-4"
        @submit="store.setData"
        :validation-schema="schema"
      >
        <div class="relative z-0 w-full mb-6 group">
          <VField
            class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            name="full_name"
            type="text"
            placeholder=""
            v-model="store.reservationData.fullName"
          />
          <label
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            for="fullName"
          >
            Full name
          </label>
          <VErrorMessage class="text-red-600" name="full_name" />
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <VField
            class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            name="email"
            type="email"
            placeholder=""
            v-model="store.reservationData.email"
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
            name="date"
            type="text"
            placeholder=""
            v-model="store.formatedDate"
            disabled
          />
          <label
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            for="date"
          >
            Reservation date
          </label>
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <VField
            class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            name="time"
            type="text"
            placeholder=""
            v-model="store.formatedTime"
            disabled
          />
          <label
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            for="time"
          >
            Reservation time
          </label>
        </div>

        <div class="relative z-0 w-full mb-6 group">
          <VField
            class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            name="description"
            as="textarea"
            placeholder=""
            v-model="store.reservationData.description"
          />
          <label
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            for="description"
          >
            Description
          </label>
          <VErrorMessage class="text-red-600" name="description" />
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
    </div>
  </section>
</template>

<script>
import "v-calendar/style.css";
import { DatePicker } from "v-calendar";
import { useDateStore } from "~/store/date";

export default {
  setup() {
    const store = useDateStore();

    const schema = {
      email: "required|email",
      full_name: "alpha_spaces|required",
      description: "required|min:10|max:100",
    };

    return {
      store,
      schema,
    };
  },

  components: { DatePicker },
};
</script>
