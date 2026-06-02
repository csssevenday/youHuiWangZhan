<template>
  <footer class="bg-gray-900 text-gray-300 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-xl font-bold text-white mb-4">CouponDealsUS</h3>
          <p class="text-sm text-gray-400">Find the best deals, coupons, and discounts from top brands in the US.</p>
        </div>
        <div>
          <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Browse</h4>
          <ul class="space-y-2">
            <li><NuxtLink to="/coupons" class="text-gray-400 hover:text-white">Coupons</NuxtLink></li>
            <li><NuxtLink to="/deals" class="text-gray-400 hover:text-white">Deals</NuxtLink></li>
            <li><NuxtLink to="/stores" class="text-gray-400 hover:text-white">Stores</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Top Categories</h4>
          <ul class="space-y-2">
            <li v-for="cat in topCategories" :key="cat">
              <NuxtLink :to="`/category/${cat.toLowerCase().replace(/ /g, '-')}`" class="text-gray-400 hover:text-white">
                {{ cat }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h4>
          <ul class="space-y-2">
            <li><NuxtLink to="/privacy" class="text-gray-400 hover:text-white">Privacy Policy</NuxtLink></li>
            <li><NuxtLink to="/terms" class="text-gray-400 hover:text-white">Terms of Service</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-gray-400 hover:text-white">About Us</NuxtLink></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
        <p>&copy; {{ new Date().getFullYear() }} CouponDealsUS. All rights reserved.</p>
        <p class="mt-2 text-xs">Disclosure: We may earn commissions when you shop through our links.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { CATEGORIES } from '~/utils/config'
const topCategories = CATEGORIES.slice(0, 6)
</script>
