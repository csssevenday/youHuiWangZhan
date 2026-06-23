<template>
  <div v-if="deal" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumb -->
    <Breadcrumb :items="breadcrumbItems" />

    <div class="bg-white rounded-xl shadow-md overflow-hidden">
      <img v-if="deal.image" :src="deal.image" :alt="deal.title" class="w-full h-64 object-cover" />

      <div class="p-6">
        <div class="flex items-center gap-2 mb-2">
          <NuxtLink :to="`/stores/${deal.storeSlug}`" class="text-sm text-blue-600 hover:text-blue-700 font-medium">
            {{ deal.storeName }}
          </NuxtLink>
          <span class="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
            {{ formatDiscount(Number(deal.discount), deal.discountType) }}
          </span>
        </div>

        <h1 class="text-2xl font-bold text-gray-900">{{ deal.title }}</h1>
        <p v-if="deal.description" class="text-gray-600 mt-2">{{ deal.description }}</p>

        <div v-if="deal.originalPrice && deal.salePrice" class="flex items-center gap-3 mt-4">
          <span class="text-2xl text-gray-400 line-through">{{ deal.originalPrice }}</span>
          <span class="text-3xl font-bold text-red-600">{{ deal.salePrice }}</span>
        </div>

        <div class="flex flex-wrap gap-2 mt-4">
          <NuxtLink
            v-for="cat in deal.categories"
            :key="cat"
            :to="`/category/${slugifyCategory(cat)}`"
            class="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            {{ cat }}
          </NuxtLink>
        </div>

        <div class="mt-6 pt-6 border-t">
          <div v-if="deal.endDate" class="text-sm text-gray-500">
            Expires: {{ formatDate(deal.endDate) }}
          </div>
          <button
            @click="handleClick"
            class="mt-4 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Get This Deal
          </button>
        </div>
      </div>
    </div>

    <!-- Related Deals -->
    <section class="mt-8">
      <h2 class="text-xl font-bold text-gray-900 mb-4">More from {{ deal.storeName }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DealCard v-for="related in relatedDeals" :key="related.id" :deal="related" />
      </div>
    </section>
  </div>

  <div v-else class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <p class="text-center text-gray-500">Deal not found.</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const slugOrId = route.params.id as string
const siteUrl = useRuntimeConfig().public.siteUrl

function slugifyCategory(cat: string): string {
  return cat.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const { data: allDeals } = await useAsyncData('all-deals', () => useDeals())

const deal = computed(() => {
  return (allDeals.value || []).find(d => d.slug === slugOrId || d.id === slugOrId)
})

const relatedDeals = computed(() => {
  if (!deal.value) return []
  return (allDeals.value || []).filter(d => d.storeId === deal.value!.storeId && d.id !== deal.value!.id)
})

const breadcrumbItems = computed(() => {
  const items = [{ label: 'Home', to: '/' }, { label: 'Deals', to: '/deals' }]
  if (deal.value) {
    items.push({ label: deal.value.storeName, to: `/stores/${deal.value.storeSlug}` })
    items.push({ label: deal.value.title, to: '' })
  }
  return items
})

const handleClick = () => {
  if (deal.value) handleDealClick(deal.value)
}

// SEO: meta, canonical, OG, structured data
useSeoMeta({
  title: () => deal.value ? `${deal.value.title} | ${deal.value.storeName} | HotCouponGain` : 'Deal Not Found | HotCouponGain',
  description: () => deal.value
    ? `${deal.value.description || deal.value.title} ${deal.value.originalPrice && deal.value.salePrice ? `Save ${deal.value.originalPrice} → ${deal.value.salePrice}.` : ''} Expires ${formatDate(deal.value.endDate)}.`.trim()
    : 'Deal not found.',
  ogTitle: () => deal.value ? `${deal.value.title} | ${deal.value.storeName}` : 'Deal Not Found',
  ogDescription: () => deal.value ? (deal.value.description || deal.value.title).slice(0, 160) : '',
  ogImage: () => deal.value?.image || '',
  ogUrl: () => deal.value ? `${siteUrl}/deals/${deal.value!.slug || deal.value!.id}` : '',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => deal.value ? `${deal.value.title} | ${deal.value.storeName}` : '',
  twitterDescription: () => deal.value ? (deal.value.description || deal.value.title).slice(0, 160) : '',
})

useHead({
  link: () => deal.value ? [
    { rel: 'canonical', href: `${siteUrl}/deals/${deal.value!.slug || deal.value!.id}` }
  ] : []
})

// JSON-LD structured data
useHead({
  script: () => deal.value ? [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Offer',
      name: deal.value!.title,
      description: deal.value!.description || deal.value!.title,
      url: `${siteUrl}/deals/${deal.value!.slug || deal.value!.id}`,
      seller: {
        '@type': 'Organization',
        name: deal.value!.storeName,
        url: `${siteUrl}/stores/${deal.value!.storeSlug}`
      },
      price: deal.value!.salePrice || undefined,
      priceCurrency: 'USD',
      availability: deal.value!.endDate ? 'https://schema.org/LimitedAvailability' : 'https://schema.org/InStock',
      validFrom: deal.value!.endDate || undefined,
      category: deal.value!.categories?.[0] || undefined
    })
  }] : []
})
</script>
