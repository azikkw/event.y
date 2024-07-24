<template>
  <div class="page">
    <p class="title">Search</p>
    <div class="search">
      <input ref="searchInput" v-model="searchQuery" @keyup="searchKeyup" type="text" placeholder="Title, location...." class="search-input"/>
      <Icon class="search-icon" name="solar:minimalistic-magnifer-linear"/>
      <button class="search-button" @click="search" aria-label="Search btn">Search</button>
    </div>
    <Loading v-if="loading" class="mt-20 sm:mt-[110px]" />
    <div v-if="foundEvents" class="result">
      <p v-if="!foundEvents._embedded" class="w-full text-start ml-5">- Nothing was found for your query.</p>
      <ul>
        <li v-for="(event, index) in foundEvents?._embedded?.events">
          <SearchCard v-if="!eventsList.includes(event.id)" :event="event" :key="event.id" :isOpen="openCardIndex === index" @moreInfo="handleMoreInfo(index)" />
        </li>
      </ul>
      <div v-if="foundEvents.page.totalPages > 1" class="result-nav">
        <button @click="prevPage" :disabled="page === 0"><Icon name="solar:arrow-left-linear"/></button>
        <p>{{page + 1}} of {{foundEvents.page.totalPages}}</p>
        <button @click="nextPage" :disabled="page === foundEvents.page.totalPages - 1"><Icon name="solar:arrow-right-linear"/></button>
      </div>
    </div>
  </div>
</template>

<script setup>

  useHead({
    title: 'Search | event.y',
  });

  const searchInput = ref(null);
  const searchQuery = ref('');
  const foundEvents = ref(null);
  const loading = ref(false);
  const page = ref(0);

  const openCardIndex = ref(null);

  const eventsList = ref([]);

  onMounted(async () => {
    eventsList.value = await getEventsForSearch();
  });

  // Open more info only for clicked event and close other events
  const handleMoreInfo = (index) => {
    openCardIndex.value = openCardIndex.value === index ? null : index;
  }

  // Search events function
  const search = async () => {
    foundEvents.value = null;
    loading.value = true;
    try {
      const query = searchQuery.value.trim().toLowerCase();
      if(searchQuery.value.length > 0) {
        const { data: searchResult } = await useFetch(`/api/search?query=${query}&page=${page.value}`);
        loading.value = false;
        foundEvents.value = searchResult.value;
      }
    } catch(error) {
      console.error('Fetch error:', error);
    } finally {
      loading.value = false;
    }
  }
  // Search func. if user pressed Enter
  const searchKeyup = (event) => {
    // checking for Enter key
    if(event.key === 'Enter') {
      search();
    }
  }

  // Go to result next page
  const nextPage = () => {
    page.value++;
    search();
  }
  // Go to result previous page
  const prevPage = () => {
    if(page.value > 0) {
      page.value--;
      search();
    }
  }

</script>

<style scoped>

  /* Search block */
  .search {
    @apply relative w-full md:w-[90%] lg:w-[490px] flex items-center gap-2 mt-2.5;
  }
  .search-input {
    @apply w-full h-[38px] sm:h-[45px] lg:h-[36px] rounded-lg border border-[#b5b5b5] bg-transparent px-[43px] sm:px-[46px] lg:px-[43px] text-[15px] sm:text-lg lg:text-[15px] focus:outline-none focus:border-[#2e2e2e];
  }
  .search-icon {
    @apply text-gray-500 size-[18px] sm:size-5 lg:size-[17px] absolute left-[18px] top-1/2 -translate-y-1/2 pointer-events-none;
  }
  .search-input:focus + span {
    @apply text-[#2e2e2e];
  }
  .search-button {
    @apply h-[38px] sm:h-[45px] lg:h-[36px] px-6 sm:px-12 lg:px-10 bg-custom-1 rounded-lg text-[16px] sm:text-lg lg:text-[15.5px] text-white hover:bg-custom-4 transition-all duration-200;
  }
  /* Results of search */
  .result {
    @apply w-full flex flex-col items-center mt-6 sm:mt-8;
  }
  .result ul {
    @apply w-full;
  }
  .result-nav {
    @apply flex items-center gap-3.5 mt-7 font-medium sm:text-lg lg:text-[16px];
  }
  .result-nav button {
    @apply size-[32px] sm:size-[38px] lg:size-[32px] rounded-[50%] flex justify-center items-center bg-custom-1 disabled:opacity-50 disabled:hover:bg-custom-1 hover:bg-custom-4;
  }
  .result-nav button span {
    @apply size-5 sm:size-6 lg:size-5 text-white;
  }

</style>