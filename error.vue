<template>
  <div class="w-full h-screen flex flex-col items-center pt-28 px-9">
    <p class="font-bold text-4xl mb-2">{{error.statusCode}}</p>
    <p class="text-[17px] opacity-80">{{error.message}}</p>
    <button @click="router.replace('/')" class="to-home-btn" aria-label="back to home page">Back to home</button>
  </div>
</template>

<script setup>
  defineProps(['error']);
  const router = useRouter();
</script>

<style scoped>
  .to-home-btn {
    @apply w-[170px] h-[44px] mt-10 text-[17px];
  }
</style>