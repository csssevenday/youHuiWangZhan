<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">All Stores</h1>
      <p class="text-gray-600 mt-1">Shop from your favorite brands with extra savings</p>
    </div>

    <!-- Category Filter -->
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

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      <StoreCard
        v-for="store in filteredStores"
        :key="store.id"
        :store="store"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CATEGORIES } from '~/utils/config'

definePageMeta({ layout: 'default' })

useHead({ title: 'Stores | CouponDealsUS' })

const selectedCategory = ref<string | null>(null)
const categories = CATEGORIES

const { data: allStores } = await useAsyncData('all-stores', () => useStores())

const filteredStores = computed(() => {
  const stores = allStores.value || []
  if (!selectedCategory.value) return stores
  return stores.filter(s => s.categories.includes(selectedCategory.value))
})
</script>
