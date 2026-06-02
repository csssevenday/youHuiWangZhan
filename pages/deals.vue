<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">All Deals</h1>
      <p class="text-gray-600 mt-1">Exclusive discounts and special offers</p>
    </div>

    <!-- Category Filters -->
    <div class="flex flex-wrap items-center gap-3 mb-6">
      <button
        v-for="cat in ['All', ...categories]"
        :key="cat"
        @click="selectedCategory = cat === 'All' ? null : cat"
        :class="[
          'px-4 py-2 rounded-full text-sm font-medium transition-colors',
          (cat === 'All' && !selectedCategory) || cat === selectedCategory
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]"
      >
        {{ cat }}
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <DealCard
        v-for="deal in filteredDeals"
        :key="deal.id"
        :deal="deal"
      />
    </div>

    <p v-if="filteredDeals.length === 0" class="text-center text-gray-500 py-12">
      No deals found for this category.
    </p>
  </div>
</template>

<script setup lang="ts">
import { CATEGORIES } from '~/utils/config'

definePageMeta({ layout: 'default' })

useHead({ title: 'Deals & Discounts | CouponDealsUS' })

const selectedCategory = ref<string | null>(null)
const categories = CATEGORIES

const { data: allDeals } = await useAsyncData('all-deals', () => useDeals())

const filteredDeals = computed(() => {
  const deals = allDeals.value || []
  if (!selectedCategory.value) return deals
  return deals.filter(d => d.categories.includes(selectedCategory.value))
})
</script>
