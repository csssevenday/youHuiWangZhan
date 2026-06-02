<template>
  <nav class="bg-white shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <NuxtLink to="/" class="flex items-center gap-2">
          <span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CouponDealsUS
          </span>
        </NuxtLink>

        <div class="hidden md:flex items-center gap-6">
          <NuxtLink to="/" class="text-gray-600 hover:text-blue-600 font-medium">Home</NuxtLink>
          <NuxtLink to="/coupons" class="text-gray-600 hover:text-blue-600 font-medium">Coupons</NuxtLink>
          <NuxtLink to="/deals" class="text-gray-600 hover:text-blue-600 font-medium">Deals</NuxtLink>
          <NuxtLink to="/stores" class="text-gray-600 hover:text-blue-600 font-medium">Stores</NuxtLink>
        </div>

        <div class="flex items-center gap-3">
          <div class="relative">
            <input
              v-model="searchInput"
              @keyup.enter="handleSearch"
              type="search"
              placeholder="Search deals..."
              class="w-48 sm:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const searchInput = ref('')

const handleSearch = () => {
  navigateTo(`/search?q=${encodeURIComponent(searchInput.value)}`)
}
</script>
