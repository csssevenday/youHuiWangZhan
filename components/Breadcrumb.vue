<template>
  <nav aria-label="Breadcrumb" class="mb-4">
    <ol class="flex items-center gap-2 text-sm text-gray-500" itemscope itemtype="https://schema.org/BreadcrumbList">
      <li v-for="(item, index) in items" :key="index" class="flex items-center gap-2" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <span v-if="index > 0" class="text-gray-300">/</span>
        <meta itemprop="position" :content="String(index + 1)" />
        <NuxtLink
          v-if="item.to && index < items.length - 1"
          :to="item.to"
          class="hover:text-blue-600 transition-colors"
          itemprop="item"
        >
          <span itemprop="name">{{ item.label }}</span>
        </NuxtLink>
        <span v-else class="text-gray-900 font-medium" itemprop="item">
          <span itemprop="name">{{ item.label }}</span>
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  items: { label: string; to?: string }[]
}>()
</script>
