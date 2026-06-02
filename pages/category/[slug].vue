<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ categoryDisplay }}</h1>
    <p class="text-gray-600 mb-6">Best deals in {{ categoryDisplay }}</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <DealCard v-for="deal in categoryDeals" :key="deal.id" :deal="deal" />
    </div>

    <p v-if="categoryDeals.length === 0" class="text-center text-gray-500 py-12">
      No deals available in this category yet.
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const slug = route.params.slug as string
const category = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

useHead({
  title: `${category} Deals & Coupons | CouponDealsUS`
})

const categoryDisplay = category

const { data: allDeals } = await useAsyncData(`deals-${slug}`, () => useDeals())

const categoryDeals = computed(() => {
  return (allDeals.value || []).filter(d => d.categories.includes(category))
})
</script>
