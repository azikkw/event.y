<template>
  <div v-if="event" class="page">
    <Head>
      <Title>{{event.title}} | Moviesta</Title>
      <Meta name="description" :content="event.description" />
    </Head>
    <p class="title flex items-center gap-2.5">
      <BackButton/> Event
    </p>
    <div class="event-container">
      <div class="event-calendar">
        <p>{{event.calendar.month}}</p>
        <p>{{event.calendar.day}}</p>
      </div>
      <p class="event-title">{{event.title}}</p>
      <p class="divider">Event details:</p>
      <div class="event-info">
        <Icon name="solar:map-point-rotate-bold"/><p>{{event.location}}</p>
      </div>
      <div class="event-info">
        <Icon name="solar:calendar-linear"/><p>{{event.fullDate}}</p>
      </div>
      <p class="divider !mt-5">Description:</p>
      <p class="event-description">{{event.description}}</p>
      <div class="event-actions">
        <button class="edit-btn" aria-label="Edit event btn">Edit event</button>
        <button class="remove-btn" aria-label="Remove event btn"><Icon name="solar:trash-bin-minimalistic-bold"/></button>
      </div>
    </div>
  </div>
</template>

<script setup>

  const { id } = useRoute().params;
  const event = ref(null);

  onMounted(async () => {
    event.value = await getEvent(id);
  });

</script>

<style scoped>

  .event-container {
    @apply bg-white rounded-lg p-[15px] sm:px-10 sm:py-6 mt-5;
  }
  .divider {
    @apply text-lg sm:text-xl lg:text-lg font-medium mt-3 sm:mt-4 lg:mt-3 mb-1 sm:mb-2 lg:mb-1 opacity-85;
  }
  .event-calendar {
    @apply size-[80px] bg-[#f3f3f3] rounded-lg flex flex-col justify-center items-center mb-3 sm:mb-4;
  }
  .event-calendar p:first-child {
    @apply font-medium text-[17px] text-custom-1 mt-1.5;
  }
  .event-calendar p:last-child {
    @apply text-[28px] font-medium -mt-1.5;
  }
  .event-title {
    @apply text-[19px] sm:text-[21px] lg:text-[19px] font-medium;
  }
  .event-info {
    @apply flex items-center gap-3 lg:gap-2 mb-1 sm:mb-2 lg:mb-1;
  }
  .event-info span {
    @apply size-[26px] sm:size-8 lg:size-5 text-custom-2;
  }
  .event-info p {
    @apply sm:text-lg lg:text-[16px] max-w-[85%];
  }
  .event-actions {
    @apply mt-6 flex gap-2;
  }
  .edit-btn {
    @apply flex-1 sm:flex-none sm:w-[280px] lg:w-[220px] h-[46px] sm:h-[50px] lg:h-[44px] text-[17px] sm:text-lg lg:text-[16px];
  }
  .remove-btn {
    @apply size-[46px] sm:size-[50px] lg:size-[44px] flex items-center justify-center bg-gray-200 hover:bg-gray-300;
  }
  .remove-btn span {
    @apply size-6 sm:size-7 lg:size-6 text-black;
  }

</style>