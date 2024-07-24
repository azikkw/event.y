<template>
  <div class="page">
    <p class="title">Events</p>
    <div class="actions">
      <div @click="toggleSortType" class="sort">
        <p class="sort-title">Date by</p>
        <Icon :name="`solar:arrow-up-linear`" :class="{'changed': sortType === 'Desc'}"/>
        <p class="sort-type">{{sortType}}</p>
      </div>
      <NuxtLink to="/create-event" class="create-event">Create event</NuxtLink>
    </div>
    <ul class="events-list">
      <li v-for="event in eventsList">
        <EventCard :event="event" :key="event.id" />
      </li>
    </ul>
  </div>
</template>

<script setup>

  useHead({
    title: 'Events | event.y',
  });

  const eventsList = ref([]);
  const sortType = ref('Asc');

  onMounted(async () => {
    eventsList.value = await getEvents();
  });

  const toggleSortType = () => {
    if(sortType.value === 'Asc') {
      sortType.value = 'Desc';
      eventsList.value.sort((a, b) => new Date(b?.date) - new Date(a?.date))
    } else {
      sortType.value = 'Asc';
      eventsList.value.sort((a, b) => new Date(a?.date) - new Date(b?.date))
    }
  }

</script>

<style scoped>

  .events-list {
    @apply mt-5 sm:mt-7;
  }
  .actions {
    @apply w-full sm:w-fit flex items-center gap-2.5 sm:gap-4 mt-3 sm:mt-4;
  }
  .sort {
    @apply w-[50%] h-[44px] sm:h-[48px] lg:h-[42px] flex items-center gap-1 cursor-pointer border border-[#7a7a7a] lg:hover:border-[#2e2e2e] px-5 sm:px-6 rounded-[25px];
  }
  .sort span {
    @apply size-[18px];
  }
  .sort span.changed {
    @apply rotate-180;
  }
  .sort-type {
    @apply font-medium;
  }
  .create-event {
    @apply w-[50%] sm:w-[280px] lg:w-[190px] h-[46px] sm:h-[50px] lg:h-[44px] flex justify-center items-center rounded-lg text-white font-medium lg:font-normal text-[17px] sm:text-lg lg:text-[16px] bg-custom-1 hover:bg-custom-4 lg:transition-all lg:duration-200;
  }

  @media (min-width: 360px) {
    .sort {
      @apply w-fit h-[44px] sm:h-[48px] lg:h-[42px] flex items-center gap-1 cursor-pointer border border-[#7a7a7a] lg:hover:border-[#2e2e2e] px-5 sm:px-6 rounded-[25px];
    }
  }

</style>