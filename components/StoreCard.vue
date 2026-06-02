<template>
  <NuxtLink :to="`/stores/${store.slug}`" class="store-card bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-center text-center">
    <img
      :src="store.logoUrl"
      :alt="store.name"
      class="w-20 h-20 rounded-full object-cover mb-3"
      loading="lazy"
    />
    <h3 class="text-lg font-semibold text-gray-900">{{ store.name }}</h3>
    <p class="text-sm text-gray-500 mt-1 line-clamp-2">{{ store.description }}</p>
    <div class="flex items-center gap-3 mt-3">
      <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{{ store.dealCount }} deals</span>
      <span v-if="store.cashback" class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{{ store.cashback }} cashback</span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Store } from '~/types'

defineProps<{
  store: Store
}>()
</script>
