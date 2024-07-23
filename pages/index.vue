<template>
  <div class="page">
    <p class="title">Events</p>
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
  const userInfo = ref(null);

  onMounted(async () => {
    userInfo.value = await getUserInfo();
    eventsList.value = await getEvents();
  });

</script>

<style scoped>

  .events-list {
    @apply  mt-[18px] sm:mt-5;
  }

</style>