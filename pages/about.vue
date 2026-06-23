<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <Breadcrumb :items="[{ label: 'Home', to: '/' }, { label: 'About Us' }]" />

    <h1 class="text-3xl font-bold text-gray-900 mb-6">About Us</h1>
    <div class="prose prose-lg">
      <p class="text-gray-600">
        HotCouponGain is a free coupon and deal discovery platform helping consumers save money on their favorite brands.
        We partner with thousands of retailers through CJ Affiliate (Commission Junction) to bring you verified coupon codes
        and exclusive deals.
      </p>
      <!-- <h2>How It Works</h2>
      <p class="text-gray-600">
        When you click on a deal or use a coupon code from our site, we may earn a commission at no extra cost to you.
        This affiliate relationship allows us to maintain this platform for free while helping you discover savings.
      </p> -->
      <p> </p>
      <h2>Our Mission</h2>
      <p class="text-gray-600">
        We believe everyone deserves access to the best deals without spending hours searching. Our team verifies
        coupon codes regularly and curates the most valuable deals so you can shop with confidence.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const siteUrl = useRuntimeConfig().public.siteUrl
const pageUrl = `${siteUrl}/about`

useSeoMeta({
  title: 'About Us | HotCouponGain',
  description: 'HotCouponGain is a free coupon and deal discovery platform. Find verified coupon codes and exclusive deals from thousands of top brands.',
  ogTitle: 'About Us | HotCouponGain',
  ogDescription: 'Learn about HotCouponGain - your free coupon and deal discovery platform.',
  ogUrl: pageUrl,
  ogType: 'website',
  twitterCard: 'summary',
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }]
})

// JSON-LD: AboutPage
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About HotCouponGain',
      description: 'HotCouponGain is a free coupon and deal discovery platform helping consumers save money.',
      url: pageUrl
    })
  }]
})
</script>
