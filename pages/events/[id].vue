<template>
  <div v-if="event" class="page">
    <Head>
      <Title>{{event.title}} | Moviesta</Title>
      <Meta name="description" :content="event.description" />
    </Head>
    <p class="title flex items-center gap-2.5">
      <button @click="toggleEventPageBtn" class="back-btn" aria-label="Back btn"><Icon name="solar:undo-left-round-broken"/></button>
      {{eventTitleText}}
    </p>
    <div v-if="!editEvent" class="event-container">
      <div class="event-calendar">
        <p>{{event.calendar.month}}</p>
        <p>{{event.calendar.day}}</p>
      </div>
      <p class="event-title">{{event.title}}</p>
      <p class="divider">Event details:</p>
      <div class="event-info">
        <Icon name="solar:point-on-map-linear"/><p>{{event.location}}</p>
      </div>
      <div class="event-info">
        <Icon name="solar:calendar-linear"/><p>{{event.fullDate}}</p>
      </div>
      <p class="divider !mt-5">Description:</p>
      <p class="event-description">{{event.description}}</p>
      <div class="event-actions">
        <button @click="toggleEditEvent" class="edit-btn" aria-label="Edit event btn">Edit event</button>
        <button @click="removeEvent" class="remove-btn" aria-label="Remove event btn"><Icon name="solar:trash-bin-minimalistic-bold"/></button>
      </div>
    </div>
    <div v-else class="edit-event">
      <form @submit.prevent="submitUpdatedEvent" class="event-form">
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
        <button class="btn" type="submit" aria-label="Submit btn">Edit</button>
      </form>
    </div>
  </div>
</template>

<script setup>

  const { id } = useRoute().params;
  const event = ref(null);

  const editEvent = ref(false);
  const eventTitleText = ref('Event');
  const onlineEvent = ref(false);
  const uploadStatus = ref('');

  const formData = ref({
    title: '',
    description: '',
    location: '',
    date: '',
    time: ''
  });

  const router = useRouter();

  onMounted(async () => {
    event.value = await getEvent(id);
  });

  // Open and close edit window
  const toggleEditEvent = () => {
    if(!editEvent.value) {
      editEvent.value = true;
      eventTitleText.value = 'Edit Event';
      formData.value = deepCopy(event.value);
      if(formData.value.location === 'Online Event') {
        onlineEvent.value = true;
      }
    } else {
      editEvent.value = false;
      eventTitleText.value = 'Event';
    }
  }

  // Back button settings for event page
  const toggleEventPageBtn = () => {
    if(!editEvent.value) router.back();
    else toggleEditEvent();
  }

  // Edit type settings
  const toggleEventType = () => {
    if(onlineEvent.value) {
      onlineEvent.value = false;
      formData.value.location = event?.value.location;
    } else {
      onlineEvent.value = true;
      formData.value.location = 'Online Event';
    }
  }

  const removeEvent = async () => {
    await removeFromEvents(id)
      .then(() => router.replace('/'));
  }

  const submitUpdatedEvent = async () => {
    const updatedData = {
      ...formData.value,
      calendar: {
        month: getMonthForCreateEvent(formData.value.date),
        day: getDayForCreateEvent(formData.value.date),
      },
      fullDate: getFullDateForCreateEvent(formData.value.date, formData.value.time)
    }

    try {
      uploadStatus.value = 'Updating your event....';
      await updateEvent(id, updatedData)
        .then(() => event.value = deepCopy(updatedData));
      uploadStatus.value = '';
      toggleEditEvent();
    } catch(error) {
      console.log(error.code);
    }
  }

  // Deep copy function
  const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

</script>

<style scoped>

  /* Divider */
  .divider {
    @apply text-lg sm:text-xl lg:text-lg font-medium mt-3 sm:mt-4 lg:mt-3 mb-1 sm:mb-2 lg:mb-1 opacity-85;
  }
  /* Calendar item */
  .event-calendar {
    @apply size-[80px] bg-[#f3f3f3] rounded-lg flex flex-col justify-center items-center mb-3 sm:mb-4;
  }
  .event-calendar p:first-child {
    @apply font-medium text-[17px] text-custom-1 mt-1.5;
  }
  .event-calendar p:last-child {
    @apply text-[28px] font-medium -mt-1.5;
  }
  /* Event details */
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
  /* Event actions styles */
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
  /* Edit event window */
  .edit-event {
    @apply w-full flex justify-center items-center bg-white rounded-[10px] p-[15px] sm:px-10 sm:py-6 mt-5 border border-[#EEEDF2];
  }

</style>