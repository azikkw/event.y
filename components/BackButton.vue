<template>
  <button @click="router.back()" class="back-btn" aria-label="Back btn"><Icon name="solar:undo-left-round-broken"/></button>
</template>

<script setup>
  const router = useRouter();
</script>

<style scoped>

</style>