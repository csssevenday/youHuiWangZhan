<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Search Results for "{{ query }}"</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <DealCard v-for="deal in searchResults" :key="deal.id" :deal="deal" />
    </div>

    <p v-if="searchResults.length === 0" class="text-center text-gray-500 py-12">
      No deals found matching "{{ query }}".
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const query = (route.query.q as string) || ''

useHead({
  title: `Search: ${query} | CouponDealsUS`
})

const { data: allDeals } = await useAsyncData('search-deals', () => useDeals())

const searchResults = computed(() => {
  if (!query) return []
  const q = query.toLowerCase()
  return (allDeals.value || []).filter(d =>
    d.title.toLowerCase().includes(q) ||
    d.storeName.toLowerCase().includes(q) ||
    d.description.toLowerCase().includes(q) ||
    d.categories.some(c => c.toLowerCase().includes(q))
  )
})
</script>
