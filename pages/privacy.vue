<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <Breadcrumb :items="[{ label: 'Home', to: '/' }, { label: 'Privacy Policy' }]" />

    <h1 class="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
    <div class="prose prose-lg text-gray-600">
      <p>Last updated: June 2, 2026</p>
      <h2>Information We Collect</h2>
      <p>We collect basic browsing information such as pages visited and referral sources. We do not collect personal information unless you voluntarily provide it.</p>
      <h2>Affiliate Disclosure</h2>
      <p>This site participates in the CJ Affiliate program. When you click on links to merchant websites, cookies may be placed on your browser to track referrals for commission purposes.</p>
      <h2>Cookies</h2>
      <p>We use essential cookies for site functionality and affiliate tracking cookies from CJ Affiliate. You can disable cookies in your browser settings.</p>
      <h2>Contact</h2>
      <p>For privacy inquiries, please contact us at privacy@hotcoupongain.com.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const siteUrl = useRuntimeConfig().public.siteUrl
const pageUrl = `${siteUrl}/privacy`

useSeoMeta({
  title: 'Privacy Policy | HotCouponGain',
  description: 'Privacy policy for HotCouponGain. Learn how we collect, use, and protect your information.',
  ogTitle: 'Privacy Policy | HotCouponGain',
  ogDescription: 'Privacy policy for HotCouponGain.',
  ogUrl: pageUrl,
  ogType: 'website',
  twitterCard: 'summary',
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }]
})
</script>
