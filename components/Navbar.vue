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
      </div>
    </div>
  </nav>
</template>
