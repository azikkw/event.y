<template>
  <p v-if="errorMessage.length > 0" class="error-message">{{errorMessage}}</p>
</template>

<script setup>
  const { errorMessage } = defineProps(['errorMessage'])
</script>

<style scoped>

</style>