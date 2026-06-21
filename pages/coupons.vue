<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">All Coupons</h1>
      <p class="text-gray-600 mt-1">Verified coupon codes that save you money</p>
    </div>

    <div class="space-y-4">
      <CouponCard
        v-for="coupon in (allCoupons || [])"
        :key="coupon.id"
        :coupon="coupon"
      />
      <p v-if="allCoupons.length === 0" class="text-center text-gray-500 py-12">
        No coupons available.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

useHead({ title: 'Coupon Codes | CouponDealsUS' })

const { data: allCoupons } = await useAsyncData('all-coupons', () => useCoupons())
</script>
