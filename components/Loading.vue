<template>
  <div class="loading"><Icon name="eos-icons:loading"/> Loading....</div>
</template>

<script setup>

</script>

<style scoped>
  .loading {
    @apply flex justify-center items-center gap-2 sm:text-lg lg:text-[16px];
  }
  .loading span {
    @apply size-7 sm:size-8 lg:size-7;
  }
</style>