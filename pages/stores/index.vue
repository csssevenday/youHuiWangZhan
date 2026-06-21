<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">All Stores</h1>
      <p class="text-gray-600 mt-1">Shop from your favorite brands with extra savings</p>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      <StoreCard
        v-for="store in (allStores || [])"
        :key="store.id"
        :store="store"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

useHead({ title: 'Stores | CouponDealsUS' })

const { data: allStores } = await useAsyncData('all-stores', () => useStores())
</script>
