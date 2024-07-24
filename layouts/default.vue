<template>
  <div class="w-full h-screen">
    <header>
      <picture>
        <source :srcset="'/logo.png'" media="(min-width: 640px)">
        <source :srcset="'/favicon.png'" media="(max-width: 639px)">
        <img class="logo" src="/favicon.png" alt="event.y" />
      </picture>
      <button class="user" @click="logOut" aria-label="User acc button">
        <span class="avatar">{{userInfo?.name.slice(0, 1)}}{{userInfo?.surname.slice(0, 1)}}</span>
        <span class="name">{{userInfo?.name}} {{userInfo?.surname}}</span>
        <Icon class="logout" name="solar:logout-2-broken"/>
      </button>
    </header>
    <nav>
      <ul>
        <li><NuxtLink to="/" class="events-link"><Icon name="solar:calendar-minimalistic-bold"/><p>{{day}}</p></NuxtLink></li>
        <li><NuxtLink to="/search" class="search-link"><Icon name="solar:minimalistic-magnifer-linear"/></NuxtLink></li>
      </ul>
    </nav>
    <slot/>
  </div>
</template>

<script setup>

  import moment from "moment-timezone";

  const userInfo = ref(null);
  const currentDate = ref(moment());
  const router = useRouter();

  onMounted(async () => {
    if(!localStorage.getItem('eventy-user')) {
      await router.replace('/login');
    }
    userInfo.value = await getUserInfo();
  });

  // Get current day
  const day = computed(() => {
    return currentDate.value.format('DD');
  });

  // Log out from account
  const logOut = async () => {
    await logOutUser()
      .then(() => router.replace('/login'));
  }

</script>

<style scoped>

  /* Header */
  header {
    @apply w-full h-[60px] fixed top-0 left-0 z-[2] flex justify-between items-center bg-white border-b border-[#EEEDF2] px-[15px] md:px-5;
  }
  .logo {
    @apply h-[30px] lg:h-[26px];
  }
  .user {
    @apply h-[40px] flex items-center gap-1.5 bg-[#eaeaea] font-medium pl-1 pr-3 rounded-[20px] text-[14px] lg:hover:bg-[#dddddd] text-black;
  }
  .avatar {
    @apply size-[32px] rounded-[50%] bg-custom-3 flex justify-center items-center text-white text-[12px];
  }
  .name {
    @apply hidden sm:block;
  }
  .logout {
    @apply size-[17px] mt-[1px] ml-0.5 lg:ml-1.5;
  }
  /* Navigation bar */
  nav {
    @apply md:w-[56px] h-[60px] md:h-screen fixed top-0 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 z-[3] md:z-[1] flex justify-center md:bg-[#F8F7FA] md:border-r md:border-[#EEEDF2] pt-2.5 md:pt-[110px] lg:pt-[100px];
  }
  nav ul {
    @apply flex flex-row md:flex-col;
  }
  nav ul li {
    @apply flex md:mb-3;
  }
  nav ul li a {
    @apply size-[40px] flex justify-center items-center rounded-[5px];
  }
  nav ul li a span {
    @apply text-[#6F7287];
  }
  .events-link {
    @apply relative;
  }
  .events-link span {
    @apply size-[30px] md:size-6;
  }
  /* Today date at event link */
  .events-link p {
    @apply absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 mt-[4px] text-[10px] md:text-[8.5px] text-white font-medium;
  }
  .search-link span {
    @apply size-[26px] md:size-5;
  }
  /* Active route style */
  .router-link-exact-active {
    @apply md:bg-custom-3;
  }
  .router-link-exact-active.events-link p {
    @apply text-white md:text-black md:font-black;
  }
  .router-link-exact-active span {
    @apply text-black md:text-white;
  }

</style>