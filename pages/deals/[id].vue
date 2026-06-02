<template>
  <div v-if="deal" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white rounded-xl shadow-md overflow-hidden">
      <img :src="deal.image || '/placeholder.jpg'" :alt="deal.title" class="w-full h-64 object-cover" />

      <div class="p-6">
        <div class="flex items-center gap-2 mb-2">
          <NuxtLink :to="`/stores/${deal.storeSlug}`" class="text-sm text-blue-600 hover:text-blue-700 font-medium">
            {{ deal.storeName }}
          </NuxtLink>
          <span class="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
            {{ formatDiscount(Number(deal.discount), deal.discountType) }}
          </span>
        </div>

        <h1 class="text-2xl font-bold text-gray-900">{{ deal.title }}</h1>
        <p class="text-gray-600 mt-2">{{ deal.description }}</p>

        <div v-if="deal.originalPrice && deal.salePrice" class="flex items-center gap-3 mt-4">
          <span class="text-2xl text-gray-400 line-through">{{ deal.originalPrice }}</span>
          <span class="text-3xl font-bold text-red-600">{{ deal.salePrice }}</span>
        </div>

        <div class="flex flex-wrap gap-2 mt-4">
          <span v-for="cat in deal.categories" :key="cat" class="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
            {{ cat }}
          </span>
        </div>

        <div class="mt-6 pt-6 border-t">
          <div class="text-sm text-gray-500">
            Expires: {{ formatDate(deal.endDate) }}
          </div>
          <button
            @click="handleClick"
            class="mt-4 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Get This Deal
          </button>
        </div>
      </div>
    </div>

    <!-- Related Deals -->
    <section class="mt-8">
      <h2 class="text-xl font-bold text-gray-900 mb-4">More from {{ deal.storeName }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DealCard v-for="related in relatedDeals" :key="related.id" :deal="related" />
      </div>
    </section>
  </div>

  <div v-else class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <p class="text-center text-gray-500">Deal not found.</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const id = route.params.id as string

const { data: allDeals } = await useAsyncData('all-deals', () => useDeals())

const deal = computed(() => {
  return (allDeals.value || []).find(d => d.id === id)
})

const relatedDeals = computed(() => {
  if (!deal.value) return []
  return (allDeals.value || []).filter(d => d.storeId === deal.value.storeId && d.id !== deal.value.id)
})

const handleClick = () => {
  if (deal.value) handleDealClick(deal.value)
}

if (deal.value) {
  useHead({
    title: `${deal.value.title} | ${deal.value.storeName} | CouponDealsUS`
  })
}
</script>
