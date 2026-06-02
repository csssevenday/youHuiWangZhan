<template>
  <div class="coupon-card bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col sm:flex-row gap-4">
    <div class="flex-shrink-0">
      <div class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xl font-bold">
        {{ coupon.storeName.charAt(0) }}
      </div>
    </div>

    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-1">
        <span class="text-sm text-gray-500">{{ coupon.storeName }}</span>
        <span v-if="coupon.verified" class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
          Verified
        </span>
      </div>

      <h3 class="text-lg font-semibold text-gray-900">{{ coupon.title }}</h3>
      <p class="text-sm text-gray-600 mt-1 line-clamp-2">{{ coupon.description }}</p>

      <div class="flex items-center gap-3 mt-3">
        <div class="flex items-center gap-1">
          <span class="text-xs text-gray-500">{{ coupon.successRate }}% success</span>
        </div>
        <span class="text-xs text-gray-400">
          Expires {{ formatDate(coupon.expiryDate) }}
        </span>
      </div>

      <div class="flex items-center gap-3 mt-3">
        <div class="relative">
          <input
            :value="coupon.code"
            readonly
            class="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg px-4 py-2 pr-12 font-mono text-lg font-bold text-gray-800 w-40"
          />
          <button
            @click="copyCode"
            class="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-700 transition-colors"
          >
            {{ copied ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <button
          @click="handleClick"
          class="flex-1 max-w-[160px] bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Shop Now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Coupon } from '~/types'

const props = defineProps<{
  coupon: Coupon
}>()

const copied = ref(false)

const copyCode = () => {
  navigator.clipboard.writeText(props.coupon.code)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

const handleClick = () => {
  handleCouponClick(props.coupon)
}
</script>
