<template>
  <div v-if="store" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Store Header -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-8 flex flex-col sm:flex-row items-center gap-6">
      <img :src="store.logoUrl" :alt="store.name" class="w-[115px] h-10 object-contain" @error="$el.style.display = 'none'" />
      <div class="text-center sm:text-left">
        <h1 class="text-3xl font-bold text-gray-900">{{ store.name }}</h1>
        <p class="text-gray-600 mt-2">{{ store.description }}</p>
        <div class="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
          <span v-for="cat in store.categories" :key="cat" class="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            {{ cat }}
          </span>
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

const { data: store } = await useAsyncData(`store-${slug}`, () => useStoreBySlug(slug))

if (store.value) {
  useHead({
    title: `${store.value.name} Coupons & Deals | CouponDealsUS`
  })
}

const { data: allDeals } = await useAsyncData('store-deals', () => useDeals())
const { data: allCoupons } = await useAsyncData('store-coupons', () => useCoupons())

const storeDeals = computed(() => {
  if (!store.value) return []
  return (allDeals.value || []).filter(d => d.storeId === store.value.id)
})

const storeCoupons = computed(() => {
  if (!store.value) return []
  return (allCoupons.value || []).filter(c => c.storeId === store.value.id)
})
</script>
