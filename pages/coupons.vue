<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumb -->
    <Breadcrumb :items="[{ label: 'Home', to: '/' }, { label: 'All Coupons' }]" />

    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">All Coupons</h1>
      <p class="text-gray-600 mt-1">Verified coupon codes that save you money</p>
    </div>

    <section>
      <h2 class="sr-only">Verified Coupon Codes</h2>
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
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const siteUrl = useRuntimeConfig().public.siteUrl
const pageUrl = `${siteUrl}/coupons`

useSeoMeta({
  title: 'Coupon Codes | HotCouponGain',
  description: 'Find verified coupon codes and promo discounts from your favorite stores. Copy and apply at checkout to save instantly.',
  ogTitle: 'Coupon Codes | HotCouponGain',
  ogDescription: 'Find verified coupon codes and promo discounts from your favorite stores.',
  ogUrl: pageUrl,
  ogType: 'website',
  twitterCard: 'summary',
  twitterTitle: 'Coupon Codes | HotCouponGain',
  twitterDescription: 'Find verified coupon codes and promo discounts from your favorite stores.',
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }]
})

const { data: allCoupons } = await useAsyncData('all-coupons', () => useCoupons())
</script>
