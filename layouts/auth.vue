<template>
  <div class="w-full h-screen">
    <slot/>
  </div>
</template>

<script setup>

  const router = useRouter();

  onMounted(async () => {
    if(localStorage.getItem('user')) {
      await router.replace('/');
    }
  });

</script>

<style scoped>

</style>