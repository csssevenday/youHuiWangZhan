<template>
  <div class="deal-card bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
    <NuxtLink :to="`/deals/${deal.id}`" class="block">
      <div class="relative">
        <img
          :src="deal.image || '/placeholder.jpg'"
          :alt="deal.title"
          class="w-full h-48 object-cover"
          loading="lazy"
        />
        <span class="absolute top-2 left-2 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
          {{ formatDiscount(Number(deal.discount), deal.discountType) }}
        </span>
        <span v-if="deal.featured" class="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-1 rounded-full">
          Featured
        </span>
      </div>
    </NuxtLink>

    <div class="p-4">
      <div class="flex items-center gap-2 mb-2">
        <img :src="store?.logoUrl" :alt="deal.storeName" class="w-6 h-6 rounded-full" />
        <NuxtLink :to="`/stores/${deal.storeSlug}`" class="text-sm text-gray-500 hover:text-blue-600">
          {{ deal.storeName }}
        </NuxtLink>
      </div>

      <NuxtLink :to="`/deals/${deal.id}`" class="text-lg font-semibold text-gray-900 hover:text-blue-600">
        {{ deal.title }}
      </NuxtLink>

      <p class="text-sm text-gray-600 mt-1 line-clamp-2">{{ deal.description }}</p>

      <div v-if="deal.originalPrice && deal.salePrice" class="flex items-center gap-2 mt-3">
        <span class="text-gray-400 line-through">{{ deal.originalPrice }}</span>
        <span class="text-xl font-bold text-red-600">{{ deal.salePrice }}</span>
      </div>

      <div class="flex items-center justify-between mt-4">
        <span class="text-xs text-gray-400">
          Expires {{ formatDate(deal.endDate) }}
        </span>
        <button
          @click="handleClick"
          class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Get Deal
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Deal, Store } from '~/types'

const props = defineProps<{
  deal: Deal
  store?: Store
}>()

const handleClick = () => {
  handleDealClick(props.deal)
}
</script>
