<template>
  <p v-if="errorMessage.length > 0" class="error-message">{{errorMessage}}</p>
</template>

<script setup>
  const { errorMessage } = defineProps(['errorMessage'])
</script>

<style scoped>
  .error-message {
    @apply text-[15px] sm:text-[16px] lg:text-[14.5px] font-medium text-red-500;
  }
</style>