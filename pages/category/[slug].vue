<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumb -->
    <Breadcrumb :items="[{ label: 'Home', to: '/' }, { label: 'Deals', to: '/deals' }, { label: categoryDisplay }]" />

    <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ categoryDisplay }}</h1>
    <p class="text-gray-600 mb-6">Best deals, coupons and discounts in {{ categoryDisplay }}</p>

    <!-- Related categories -->
    <section v-if="relatedCategories.length" class="mb-6">
      <h2 class="text-sm font-semibold text-gray-700 mb-2">Related Categories</h2>
      <div class="flex flex-wrap gap-2">
        <NuxtLink
          v-for="cat in relatedCategories"
          :key="cat"
          :to="`/category/${slugifyCategory(cat)}`"
          class="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
        >
          {{ cat }}
        </NuxtLink>
      </div>
    </section>

    <section>
      <h2 class="sr-only">{{ categoryDisplay }} Deals and Coupons</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DealCard v-for="deal in categoryDeals" :key="deal.id" :deal="deal" />
      </div>
    </section>

    <p v-if="categoryDeals.length === 0" class="text-center text-gray-500 py-12">
      No deals available in this category yet.
    </p>
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

const category = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
const categoryDisplay = category
const pageUrl = `${siteUrl}/category/${slug}`

useSeoMeta({
  title: `${category} Deals & Coupons | HotCouponGain`,
  description: `Find the best ${category} deals, coupons, and discounts. Save money on ${category.toLowerCase()} products from top brands.`,
  ogTitle: `${category} Deals & Coupons | HotCouponGain`,
  ogDescription: `Find the best ${category} deals, coupons, and discounts. Save money on ${category.toLowerCase()} products from top brands.`,
  ogUrl: pageUrl,
  ogType: 'website',
  twitterCard: 'summary',
  twitterTitle: `${category} Deals & Coupons | HotCouponGain`,
  twitterDescription: `Find the best ${category} deals, coupons, and discounts.`,
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }]
})

const { data: allDeals } = await useAsyncData(`deals-${slug}`, () => useDeals())

const categoryDeals = computed(() => {
  return (allDeals.value || []).filter(d => d.categories.includes(category))
})

const relatedCategories = computed(() => {
  const allCats = new Set<string>()
  for (const deal of allDeals.value || []) {
    for (const cat of deal.categories) {
      if (cat !== category) allCats.add(cat)
    }
  }
  return Array.from(allCats).slice(0, 6)
})

// JSON-LD: CollectionPage
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${category} Deals & Coupons`,
      description: `Best ${category} deals, coupons, and discounts from top brands.`,
      url: pageUrl,
      numberOfItems: categoryDeals.value.length,
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Deals', item: `${siteUrl}/deals` },
          { '@type': 'ListItem', position: 3, name: category, item: pageUrl }
        ]
      }
    })
  }]
})
</script>
