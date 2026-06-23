<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumb -->
    <Breadcrumb :items="[{ label: 'Home', to: '/' }, { label: 'All Stores' }]" />

    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">All Stores</h1>
      <p class="text-gray-600 mt-1">Shop from your favorite brands with extra savings</p>
    </div>

    <section>
      <h2 class="sr-only">Browse Stores by Category</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <StoreCard
          v-for="store in (allStores || [])"
          :key="store.id"
          :store="store"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const siteUrl = useRuntimeConfig().public.siteUrl
const pageUrl = `${siteUrl}/stores`

useSeoMeta({
  title: 'Stores | HotCouponGain',
  description: 'Shop from thousands of top brands with exclusive coupons and deals. Find discounts on fashion, electronics, home goods and more.',
  ogTitle: 'Stores | HotCouponGain',
  ogDescription: 'Shop from thousands of top brands with exclusive coupons and deals.',
  ogUrl: pageUrl,
  ogType: 'website',
  twitterCard: 'summary',
  twitterTitle: 'Stores | HotCouponGain',
  twitterDescription: 'Shop from thousands of top brands with exclusive coupons and deals.',
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }]
})

const { data: allStores } = await useAsyncData('all-stores', () => useStores())
</script>
