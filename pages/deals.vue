<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">All Deals</h1>
      <p class="text-gray-600 mt-1">Exclusive discounts and special offers</p>
    </div>

    <div class="space-y-4">
      <DealCard
        v-for="deal in (allDeals || [])"
        :key="deal.id"
        :deal="deal"
      />
      <p v-if="allDeals.length === 0" class="text-center text-gray-500 py-12">
        No deals available.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

useHead({ title: 'Deals & Discounts | CouponDealsUS' })

const { data: allDeals } = await useAsyncData('all-deals', () => useDeals())
</script>
