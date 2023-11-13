<template>
  <div class="calendar-container w-[700px] bg-[#4B4B4F] rounded-xl">
    <header
      class="calendar-header flex items-center justify-between pt-6 px-8 pb-2.5"
    >
      <p class="calendar-current-date text-2xl">
        {{ months[month] }}
      </p>
      <div class="calendar-navigation flex">
        <span
          id="calendar-prev"
          class="h-9 w-9 cursor-pointer rounded-full leading-9 text-2xl text-[#aeabab] hover:bg-[#f2f2f2] pl-2"
          @click="setPreviousMonth"
          ><i class="fa-solid fa-arrow-left"></i
        ></span>
        <span
          id="calendar-next"
          class="h-9 w-9 cursor-pointer rounded-full leading-9 text-2xl text-[#aeabab] hover:bg-[#f2f2f2] pl-2"
          @click="setNextMonth"
          ><i class="fa-solid fa-arrow-right"></i
        ></span>
      </div>
    </header>
    <div class="calendar-body pt-6 px-1 pb-2.5">
      <ul class="calendar-days flex align-center text-2xl gap-2.5 shrink pb-5">
        <li v-for="weekday in weekdays">
          {{ weekday }}
        </li>
      </ul>
      <ul class="calendar-dates flex flex-wrap relative">
        <li v-for="emptyDay in paddingDays" class="w-[calc(100%/7)]">
          {{ "" }}
        </li>
        <li
          class="text-3xl w-[calc(100%/7)] text-center hover:bg-[#f2f2f2] p-4 cursor-pointer"
          :class="day === currentDay ? 'bg-[#6332c5]' : ''"
          v-for="(day, index) in daysInMonth"
          :key="index"
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

    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const actualDate = ref({
      date1: new Date(),
    });

    const date = new Date();
    const month = actualDate.value.date1.getMonth();
    const year = actualDate.value.date1.getFullYear();
    const currentDay = actualDate.value.date1.getDate();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

    const setNextMonth = () => {
      actualDate.value.date1.setMonth(new Date().getMonth() + 1);
      actualDate.value.date1.getDate();
      console.log(actualDate);
    };

    const setPreviousMonth = () => {
      actualDate.value.date1.setMonth(new Date().getMonth() - 2);
      console.log(actualDate);
    };

    return {
      paddingDays,
      daysInMonth,
      weekdays,
      currentDay,
      actualDate,
      months,
      month,
      setNextMonth,
      setPreviousMonth,
    };
    // let date = new Date();
    // let month = date.getMonth();
    // let year = date.getFullYear();
    // let currentDay = date.getDate();

    // let displayedMonth = ref(months[month]);

    // let numberOfDays = ref(new Date(year, month, 0).getDate());

    // console.log(months[month]);

    // const setNextMonth = () => {
    //   if (month >= 11) {
    //     date = new Date(year, month, new Date().getDate());
    //     numberOfDays.value = date.getDate();
    //     // Set the year to the new year
    //     year = date.getFullYear();
    //     // Set the month to the new month
    //     month = date.getMonth();
    //   }
    //   date.setMonth(month++);
    //   displayedMonth.value = months[month];
    //   console.log(month);
    // };
    // const setPreviousMonth = () => {
    //   if (month < 0) {
    //     date = new Date(year, month, new Date().getDate());
    //     // Set the year to the new year
    //     year = date.getFullYear();
    //     // Set the month to the new month
    //     month = date.getMonth();
    //     return;
    //   }
    //   date.setMonth(month--);
    //   displayedMonth.value = months[month];
    //   console.log(date);
    //   console.log(month);
    // };

    // return {
    //   year,
    //   month,
    //   numberOfDays,
    //   currentDay,
    //   displayedMonth,
    //   setNextMonth,
    //   setPreviousMonth,
    // };
  },
};
</script>
