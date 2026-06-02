<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">All Coupons</h1>
      <p class="text-gray-600 mt-1">Verified coupon codes that save you money</p>
    </div>

    <!-- Filters -->
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

    <div class="space-y-4">
      <CouponCard
        v-for="coupon in filteredCoupons"
        :key="coupon.id"
        :coupon="coupon"
      />
      <p v-if="filteredCoupons.length === 0" class="text-center text-gray-500 py-12">
        No coupons found for this category.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CATEGORIES } from '~/utils/config'

definePageMeta({ layout: 'default' })

useHead({ title: 'Coupon Codes | CouponDealsUS' })

const selectedCategory = ref<string | null>(null)
const categories = CATEGORIES

const { data: allCoupons } = await useAsyncData('all-coupons', () => useCoupons())

const filteredCoupons = computed(() => {
  const coupons = allCoupons.value || []
  if (!selectedCategory.value) return coupons
  return coupons.filter(c => c.categories.includes(selectedCategory.value))
})
</script>
