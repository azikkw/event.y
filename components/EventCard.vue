<template>
  <NuxtLink :to="`/events/${event.id}`" class="event-card-header bg-white rounded-lg mb-2.5 border-b border-[#EEEDF2] lg:hover:border-[#dddddd]">
    <div class="calendar">
      <p>{{event.calendar?.month}}</p>
      <p>{{event.calendar?.day}}</p>
    </div>
    <ul>
      <li class="name">{{event?.title}}</li>
      <li class="location">{{event?.location}}</li>
      <li class="date">{{event?.fullDate}}</li>
    </ul>
    <Icon class="more-info" name="solar:alt-arrow-right-line-duotone"/>
  </NuxtLink>
</template>

<script setup>
  const { event } = defineProps(['event']);
</script>

<style scoped>

</style>