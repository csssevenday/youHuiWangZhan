<template>
  <div v-if="store" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumb -->
    <Breadcrumb :items="[{ label: 'Home', to: '/' }, { label: 'Stores', to: '/stores' }, { label: store.name }]" />

    <!-- Store Header -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-8 flex flex-col sm:flex-row items-center gap-6">
      <img :src="store.logoUrl" :alt="store.name" class="w-[115px] h-10 object-contain" @error="$el.style.display = 'none'" />
      <div class="text-center sm:text-left">
        <h1 class="text-3xl font-bold text-gray-900">{{ store.name }}</h1>
        <p class="text-gray-600 mt-2">{{ store.description }}</p>
        <div class="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
          <NuxtLink
            v-for="cat in store.categories"
            :key="cat"
            :to="`/category/${slugifyCategory(cat)}`"
            class="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
          >
            {{ cat }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Store Deals -->
    <section class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Active Deals</h2>
      <div v-if="storeDeals.length" class="space-y-4">
        <DealCard v-for="deal in storeDeals" :key="deal.id" :deal="deal" />
      </div>
      <p v-else class="text-gray-500">No active deals for this store.</p>
    </section>

    <!-- Store Coupons -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Coupon Codes</h2>
      <div v-if="storeCoupons.length" class="space-y-4">
        <CouponCard v-for="coupon in storeCoupons" :key="coupon.id" :coupon="coupon" />
      </div>
      <p v-else class="text-gray-500">No coupon codes for this store.</p>
    </section>
  </div>

  <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <p class="text-center text-gray-500">Store not found.</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const slug = route.params.slug as string
const siteUrl = useRuntimeConfig().public.siteUrl

function slugifyCategory(cat: string): string {
  return cat.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const { data: store } = await useAsyncData(`store-${slug}`, () => useStoreBySlug(slug))

const { data: allDeals } = await useAsyncData('store-deals', () => useDeals())
const { data: allCoupons } = await useAsyncData('store-coupons', () => useCoupons())

const storeDeals = computed(() => {
  if (!store.value) return []
  return (allDeals.value || []).filter(d => d.storeId === store.value!.id)
})

const storeCoupons = computed(() => {
  if (!store.value) return []
  return (allCoupons.value || []).filter(c => c.storeId === store.value!.id)
})

const pageUrl = computed(() => `${siteUrl}/stores/${slug}`)

useSeoMeta({
  title: () => store.value ? `${store.value.name} Coupons & Deals | HotCouponGain` : 'Store Not Found | HotCouponGain',
  description: () => store.value
    ? `${store.value.description} Find ${storeDeals.value.length} active deals and ${storeCoupons.value.length} coupon codes for ${store.value.name}.`
    : 'Store not found.',
  ogTitle: () => store.value ? `${store.value.name} Coupons & Deals | HotCouponGain` : 'Store Not Found',
  ogDescription: () => store.value ? store.value.description.slice(0, 160) : '',
  ogUrl: () => pageUrl.value,
  ogType: 'website',
  twitterCard: 'summary',
  twitterTitle: () => store.value ? `${store.value.name} Coupons & Deals` : '',
  twitterDescription: () => store.value ? store.value.description.slice(0, 160) : '',
})

useHead({
  link: () => [{ rel: 'canonical', href: pageUrl.value }]
})

// JSON-LD structured data for Store
useHead({
  script: () => store.value ? [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Store',
      name: store.value!.name,
      description: store.value!.description,
      url: pageUrl.value,
      logo: store.value!.logoUrl,
      image: store.value!.logoUrl,
      category: store.value!.categories?.[0] || undefined,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: store.value!.rating,
        bestRating: 5
      }
    })
  }] : []
})
</script>
