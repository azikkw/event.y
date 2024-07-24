<template>
  <div class="event-card">
    <div @click="moreInfo" class="event-card-header">
      <div class="calendar">
        <p>{{getCalendarMonth(event.dates)}}</p>
        <p>{{getCalendarDay(event.dates)}}</p>
      </div>
      <ul>
        <li class="name">{{event.name}}</li>
        <li class="date">{{getFullDate(event.dates)}}</li>
      </ul>
      <p class="font-medium text-[15px]">{{inEventsText}}</p>
      <Icon class="more-info" name="solar:alt-arrow-up-line-duotone" :style="{rotate: isOpen ? '180deg' : '0deg'}"/>
    </div>
    <div class="event-card-body" :style="{display: isOpen ? 'block' : 'none'}">
      <p class="name full">Title: {{event.name}}</p>
      <p class="location full">Location: {{getEventLocation(event)}}</p>
      <p class="date full">Event date: {{getFullDate(event.dates)}}</p>
      <p class="description">Description: {{getEventDescription(event)}}</p>
      <button @click="toggleEvent" class="add-btn" aria-label="Add to events btn">{{buttonText}}</button>
    </div>
  </div>
</template>

<script setup>

  const { event, isOpen } = defineProps(['event', 'isOpen']);
  const emit = defineEmits(['moreInfo']);

  const inEvents = ref(false);
  const inEventsText = ref('');
  const buttonText = ref('Add to events');

  const moreInfo = () => {
    emit('moreInfo');
  };

  // Add event to my events collection
  const toggleEvent = async () => {
    if(!inEvents.value) {
      buttonText.value = 'Adding....';
      await addToEvents(event).then(() => inEvents.value = true);
      buttonText.value = 'Remove from events';
      inEventsText.value = 'Added';
    } else {
      buttonText.value = 'Removing....';
      await removeFromEvents(event.id).then(() => inEvents.value = false);
      buttonText.value = 'Add to events';
      inEventsText.value = '';
    }
  }

</script>

<style scoped>

  /* Event card */
  .event-card {
    @apply bg-white rounded-lg mb-2.5 border-b border-[#ededed] lg:hover:border-[#dddddd];
  }
  /* Card header styles in tailwind.css */
  /* Card body */
  .event-card-body {
    @apply w-full p-3 lg:px-8 border-t border-[#EEEDF2];
  }
  .event-card p.full {
    @apply mb-[5px];
  }
  .name.full,
  .location.full,
  .date.full {
    @apply overflow-visible whitespace-normal sm:text-[16px];
  }
  .date.full {
    @apply sm:text-[15px];
  }
  .description {
    @apply font-medium mt-2.5 opacity-85 text-[15.5px];
  }
  /* Add event button */
  .add-btn {
    @apply w-full sm:w-[250px] lg:w-[200px] h-[46px] sm:h-[48px] lg:h-[42px] mt-4 mb-2 sm:text-[17px] lg:text-[16px];
  }

</style>