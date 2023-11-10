<template>
  <div class="calendar-container w-[500px] bg-[#4B4B4F] rounded-xl">
    <header
      class="calendar-header flex items-center justify-between pt-6 px-8 pb-2.5"
    >
      <p class="calendar-current-date text-2xl">November</p>
      <div class="calendar-navigation flex">
        <span
          id="calendar-prev"
          class="h-9 w-9 cursor-pointer rounded-full leading-9 text-2xl text-[#aeabab] hover:bg-[#f2f2f2] pl-2"
          ><i class="fa-solid fa-arrow-left"></i
        ></span>
        <span
          id="calendar-next"
          class="h-9 w-9 cursor-pointer rounded-full leading-9 text-2xl text-[#aeabab] hover:bg-[#f2f2f2] pl-2"
          ><i class="fa-solid fa-arrow-right"></i
        ></span>
      </div>
    </header>
    <div class="calendar-body pt-6 px-8 pb-2.5">
      <ul class="calendar-days flex align-center text-2xl gap-6">
        <li>Sun</li>
        <li>Mon</li>
        <li>Tue</li>
        <li>Wed</li>
        <li>Thu</li>
        <li>Fri</li>
        <li>Sat</li>
      </ul>
      <ul class="calendar-dates flex flex-wrap relative">
        <li
          class="text-xl w-[calc(100%/7)] text-center"
          v-for="day in numberOfDays"
        >
          {{ day }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const numberOfDays = new Date(year, month, 0).getDate();

    return { year, month, numberOfDays };
  },
  computed: {},
};
</script>
