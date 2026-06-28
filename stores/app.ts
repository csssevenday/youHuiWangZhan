import { defineStore } from 'pinia'
import type { Coupon, Deal, Store } from '~/types'
// 1
interface AppState {
  coupons: Coupon[]
  deals: Deal[]
  stores: Store[]
  loading: boolean
  searchQuery: string
  selectedCategory: string | null
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    coupons: [],
    deals: [],
    stores: [],
    loading: false,
    searchQuery: '',
    selectedCategory: null
  }),

  getters: {
    featuredDeals: (state) => state.deals.filter(d => d.featured),
    verifiedCoupons: (state) => state.coupons.filter(c => c.verified),
    filteredByCategory: (state) => {
      if (!state.selectedCategory) return state.deals
      return state.deals.filter(d => d.categories.includes(state.selectedCategory))
    },
    filteredBySearch: (state) => {
      if (!state.searchQuery) return state.deals
      const query = state.searchQuery.toLowerCase()
      return state.deals.filter(d =>
        d.title.toLowerCase().includes(query) ||
        d.storeName.toLowerCase().includes(query) ||
        d.description.toLowerCase().includes(query)
      )
    },
    getStoreById: (state) => (id: number) => {
      return state.stores.find(s => s.id === id)
    },
    getDealsByStoreId: (state) => (storeId: number) => {
      return state.deals.filter(d => d.storeId === storeId)
    },
    getCouponsByStoreId: (state) => (storeId: number) => {
      return state.coupons.filter(c => c.storeId === storeId)
    }
  },

  actions: {
    async fetchAll() {
      this.loading = true
      try {
        const [couponsRes, dealsRes, storesRes] = await Promise.all([
          $fetch('/api/coupons'),
          $fetch('/api/deals'),
          $fetch('/api/stores')
        ])
        this.coupons = couponsRes
        this.deals = dealsRes
        this.stores = storesRes
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        this.loading = false
      }
    },

    setSearchQuery(query: string) {
      this.searchQuery = query
    },

    setCategory(category: string | null) {
      this.selectedCategory = category
    }
  }
})
