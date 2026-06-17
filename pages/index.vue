<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Save Money on Every Purchase</h1>
        <p class="text-xl text-blue-100 mb-8">Find verified coupons and exclusive deals from 5,000+ top brands</p>
        <div class="max-w-xl mx-auto">
          <div class="flex gap-2">
            <input
              v-model="heroSearch"
              @keyup.enter="handleSearch"
              type="search"
              placeholder="Search your favorite stores..."
              class="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              @click="handleSearch"
              class="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Deals -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold text-gray-900">Featured Deals</h2>
        <NuxtLink to="/deals" class="text-blue-600 hover:text-blue-700 font-medium">View All →</NuxtLink>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DealCard v-for="deal in (featuredDeals || []).slice(0, 6)" :key="deal.id" :deal="deal" />
      </div>
    </section>

    <!-- Latest Coupons -->
    <section class="bg-gray-50 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-bold text-gray-900">Latest Coupons</h2>
          <NuxtLink to="/coupons" class="text-blue-600 hover:text-blue-700 font-medium">View All →</NuxtLink>
        </div>
        <div class="space-y-4">
          <CouponCard v-for="coupon in (latestCoupons || []).slice(0, 5)" :key="coupon.id" :coupon="coupon" />
        </div>
      </div>
    </section>

    <!-- Top Stores -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold text-gray-900">Popular Stores</h2>
        <NuxtLink to="/stores" class="text-blue-600 hover:text-blue-700 font-medium">View All →</NuxtLink>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <StoreCard v-for="store in (topStores || []).slice(0, 6)" :key="store.id" :store="store" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

useHead({
  title: 'Best Coupons & Deals Online | CouponDealsUS',
  meta: [
    { name: 'description', content: 'Save money with verified coupon codes and exclusive deals from top US brands.' }
  ]
})

const heroSearch = ref('')

const handleSearch = () => {
  if (heroSearch.value) {
    navigateTo(`/search?q=${encodeURIComponent(heroSearch.value)}`)
  }
}

const { data: featuredDeals } = await useAsyncData('featured-deals', () => useDeals())
const { data: latestCoupons } = await useAsyncData('latest-coupons', () => useCoupons())
const { data: topStores } = await useAsyncData('top-stores', () => useStores())
</script>
