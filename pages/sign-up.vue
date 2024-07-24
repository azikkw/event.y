<template>
  <div class="auth-back">
    <p class="auth-title">Sign Up to</p>
    <img class="welcome" src="/logo.png" alt="logo" />
    <form @submit.prevent="signUp" class="auth-form">
      <input class="form-input" v-model="formData.name" type="text" placeholder="Enter name...." required />
      <input class="form-input" v-model="formData.surname" type="text" placeholder="Enter surname...." required />
      <input class="form-input" v-model="formData.email" type="email" placeholder="Enter email...." required />
      <input class="form-input" v-model="formData.password" type="password" placeholder="Enter password...." required />
      <ErrorMessage :errorMessage="errorMessage" />
      <button class="btn" type="submit" aria-label="Submit btn">Sign Up</button>
    </form>
    <NuxtLink class="link-to" to="/login">Already have an account? <p class="font-medium">Log In</p></NuxtLink>
  </div>
</template>

<script setup>

  const formData = ref({
    name: '',
    surname: '',
    email: '',
    password: ''
  });

  const errorMessage = ref('');

  const router = useRouter();

  definePageMeta({
    layout: 'auth'
  });
  useHead({
    title: 'Sign Up | event.y',
  });

  const signUp = async () => {
    try {
      await createUser(formData.value)
        .then(() => router.replace('/login'));
    } catch(error) {
      errorMessage.value = defineError(error.code);
    }
  }

</script>

<style scoped>

</style>