<template>
  <nav
    class="w-full h-13 py-4 flex gap-2 justify-center items-center bg-[#BCA37F] text-white"
  >
    <i class="fa-solid fa-calendar-days fa-2xl"></i>
    <NuxtLink to="/">
      <button class="p-2 bg-[#113946] rounded">Home</button>
    </NuxtLink>
    <NuxtLink to="/new">
      <button class="p-2 bg-[#113946] rounded">New Reservation</button>
    </NuxtLink>
  </nav>
</template>

<script>
export default {};
</script>
