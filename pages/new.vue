<template>
  <div class="px-5 bg-[#94a3b8] h-full w-full flex flex-col">
    <div class="header-container">
      <header class="w-full flex justify-center">
        <h1 class="text-2xl">New reservation</h1>
      </header>
    </div>
    <div class="form-container">
      <ReservationForm />
    </div>
  </div>
</template>

<script>
import ReservationForm from "../components/ReservationForm.vue";

export default {
  components: {
    ReservationForm,
  },
  setup() {
    return {};
  },
};
</script>
