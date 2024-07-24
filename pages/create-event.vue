<template>
  <div class="page">
    <p class="title flex items-center gap-2.5">
      <BackButton/> Create Event
    </p>
    <div class="event-container">
      <form @submit.prevent="submitEvent" class="event-form">
        <input class="form-input" v-model="formData.title" type="text" placeholder="Enter title...." required />
        <textarea class="form-textarea" v-model="formData.description" placeholder="Enter description...." required />
        <div class="event-type">
          <div @click="toggleEventType" class="type" :class="{'active': !onlineEvent}"><Icon name="solar:point-on-map-linear"/>Offline</div>
          <div @click="toggleEventType" class="type" :class="{'active': onlineEvent}"><Icon name="solar:monitor-smartphone-linear"/>Online</div>
        </div>
        <input class="form-input" v-model="formData.location" type="text" placeholder="Enter location...." :disabled="onlineEvent" required />
        <input class="form-input" v-model="formData.date" type="date" :min="getNextDay()" placeholder="Enter date...." required />
        <input class="form-input" v-model="formData.time" type="time" placeholder="Enter date...." required />
        <p v-if="uploadStatus.length > 0" class="text-center text-[15px] sm:text-[16px] lg:text-[14.5px] font-medium">{{uploadStatus}}</p>
        <button class="btn" type="submit" aria-label="Submit btn">Create</button>
      </form>
    </div>
  </div>
</template>

<script setup>

  useHead({
    title: 'Create Event | event.y',
  });

  const onlineEvent = ref(false);
  const uploadStatus = ref('');
  const router = useRouter();

  const formData = ref({
    id: Math.random().toString(36).substr(2, 10),
    title: '',
    description: '',
    location: '',
    date: getNextDay(),
    time: '00:00'
  });

  // Edit type settings
  const toggleEventType = () => {
    if(onlineEvent.value) {
      onlineEvent.value = false;
      formData.value.location = '';
    } else {
      onlineEvent.value = true;
      formData.value.location = 'Online Event';
    }
  }

  const submitEvent = async () => {
    uploadStatus.value = 'Uploading your event....';
    await createEvent(formData.value)
      .then(() => router.replace('/'));
  }

</script>

<style scoped>

  .event-container {
    @apply flex justify-center;
  }

</style>