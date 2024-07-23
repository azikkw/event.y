<template>
  <div class="auth-back">
    <p class="auth-title">Log In to</p>
    <img class="welcome" src="/logo.png" alt="logo" />
    <form @submit.prevent="logIn" class="auth-form">
      <input class="form-input" v-model="email" type="email" placeholder="Enter email...." required />
      <input class="form-input" v-model="password" type="password" placeholder="Enter password...." required />
      <p v-if="errorMessage.length > 0" class="error-message">{{errorMessage}}</p>
      <button class="btn" type="submit" aria-label="Submit btn">Log In</button>
    </form>
    <NuxtLink class="link-to" to="/sign-up">Don't have an account? <p class="font-medium">Sign Up</p></NuxtLink>
  </div>
</template>

<script setup>

  const email = ref('');
  const password = ref('');

  const errorMessage = ref('');

  const router = useRouter();

  definePageMeta({
    layout: 'auth'
  });
  useHead({
    title: 'Log In | event.y',
  });

  const logIn = async () => {
    try {
      await logInUser(email.value, password.value)
        .then(() => router.replace('/'));
    } catch(error) {
      errorMessage.value = defineError(error.code);
    }
  };

</script>

<style scoped>

</style>