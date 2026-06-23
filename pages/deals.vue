<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumb -->
    <Breadcrumb :items="[{ label: 'Home', to: '/' }, { label: 'All Deals' }]" />

    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">All Deals</h1>
      <p class="text-gray-600 mt-1">Exclusive discounts and special offers from top brands</p>
    </div>

    <section>
      <h2 class="sr-only">Current Deals and Discounts</h2>
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
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const siteUrl = useRuntimeConfig().public.siteUrl
const pageUrl = `${siteUrl}/deals`

useSeoMeta({
  title: 'Deals & Discounts | HotCouponGain',
  description: 'Browse exclusive deals and special offers from top brands. Save money on electronics, fashion, home goods and more.',
  ogTitle: 'Deals & Discounts | HotCouponGain',
  ogDescription: 'Browse exclusive deals and special offers from top brands. Save money on electronics, fashion, home goods and more.',
  ogUrl: pageUrl,
  ogType: 'website',
  twitterCard: 'summary',
  twitterTitle: 'Deals & Discounts | HotCouponGain',
  twitterDescription: 'Browse exclusive deals and special offers from top brands.',
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }]
})

const { data: allDeals } = await useAsyncData('all-deals', () => useDeals())
</script>
