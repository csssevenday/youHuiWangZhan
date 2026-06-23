<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <Breadcrumb :items="[{ label: 'Home', to: '/' }, { label: 'Terms of Service' }]" />

    <h1 class="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
    <div class="prose prose-lg text-gray-600">
      <p>Last updated: June 2, 2026</p>
      <h2>Use of Site</h2>
      <p>HotCouponGain provides coupon codes and deal information for personal, non-commercial use. We do not guarantee that any coupon code or deal will be valid at the time of use.</p>
      <h2>Affiliate Links</h2>
      <p>This site contains affiliate links. We may earn a commission when you make a purchase through our links. This does not affect the price you pay.</p>
      <h2>Accuracy of Information</h2>
      <p>While we strive to keep information accurate and up-to-date, we make no warranties about the completeness or accuracy of coupon codes, deal details, or pricing information.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const siteUrl = useRuntimeConfig().public.siteUrl
const pageUrl = `${siteUrl}/terms`

useSeoMeta({
  title: 'Terms of Service | HotCouponGain',
  description: 'Terms of service for HotCouponGain. Read about site usage, affiliate links, and information accuracy policies.',
  ogTitle: 'Terms of Service | HotCouponGain',
  ogDescription: 'Terms of service for HotCouponGain.',
  ogUrl: pageUrl,
  ogType: 'website',
  twitterCard: 'summary',
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }]
})
</script>
