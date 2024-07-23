<template>
  <button @click="router.back()" class="back-btn" aria-label="Back btn"><Icon name="solar:undo-left-round-broken"/></button>
</template>

<script setup>
  const router = useRouter();
</script>

<style scoped>
  .back-btn {
    @apply size-[32px] sm:size-[38px] lg:size-[30px] bg-transparent rounded-[50%] border border-[#b5b5b5] flex justify-center items-center lg:hover:opacity-70 transition-all duration-200 text-black;
  }
  .back-btn span {
    @apply size-[18px] sm:size-5 lg:size-[18px];
  }
</style>