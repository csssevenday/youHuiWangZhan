<template>
  <div class="deal-card bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col sm:flex-row gap-4">
    <div class="flex-shrink-0">
      <div class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xl font-bold">
        {{ deal.storeName.charAt(0) }}
      </div>
    </div>

    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-1">
        <NuxtLink :to="`/stores/${deal.storeSlug}`" class="text-sm text-blue-600 hover:text-blue-700 font-medium">
          {{ deal.storeName }}
        </NuxtLink>
      </div>

      <NuxtLink :to="`/deals/${deal.slug || deal.id}`">
        <h3 class="text-lg font-semibold text-gray-900 hover:text-blue-700 transition-colors">{{ deal.title }}</h3>
      </NuxtLink>
      <p v-if="deal.description" class="text-sm text-gray-600 mt-1 line-clamp-2">{{ deal.description }}</p>

      <div v-if="deal.originalPrice && deal.salePrice" class="flex items-center gap-2 mt-3">
        <span class="text-gray-400 line-through">{{ deal.originalPrice }}</span>
        <span class="text-xl font-bold text-red-600">{{ deal.salePrice }}</span>
      </div>

      <div class="flex items-center gap-3 mt-3">
        <span v-if="deal.endDate" class="text-xs text-gray-400">
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
import type { Deal } from '~/types'

const props = defineProps<{
  deal: Deal
}>()

const handleClick = () => {
  handleDealClick(props.deal)
}
</script>
