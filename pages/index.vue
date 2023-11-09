<template>
  <div
    class="container mx-auto h-full flex justify-center items-center h-screen gap-2"
  >
    <div class="text flex flex-col gap-10 items-center section text-2xl w-2/4">
      <h1>
        Simplify the reservation process by selecting the day and the time
        needed. You just need to submit your request and you will receive an
        e-mail with all the details
      </h1>
      <NuxtLink to="/new">
        <button
          class="p-2 bg-teal-500 rounded w-fit text-white border-neutral-950 border-2"
        >
          Make a reservation
        </button>
      </NuxtLink>
    </div>
    <div
      class="previous-reservations w-2/4 h-2/4 bg-[#4B4B4F] bg-opacity-70 p-4 flex gap-2 flex-col rounded-2xl overflow-auto"
    >
      <div class="w-full h-20 bg-[#2D2D30] rounded-3xl p-2 text-white">
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
