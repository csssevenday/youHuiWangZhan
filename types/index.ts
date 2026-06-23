export interface Store {
  id: number
  name: string
  slug: string
  description: string
  logoUrl: string
  websiteUrl: string
  categories: string[]
  rating: number
  dealCount: number
  cashback?: string
}

export interface Coupon {
  id: string
  storeId: number
  storeName: string
  storeSlug: string
  title: string
  description: string
  code: string
  discount: string
  type: 'percentage' | 'fixed' | 'free_shipping' | 'bogo'
  categories: string[]
  expiryDate: string
  verified: boolean
  successRate: number
  cjLink: string
}

export interface Deal {
  id: string
  slug: string
  storeId: number
  storeName: string
  storeSlug: string
  title: string
  description: string
  originalPrice?: string
  salePrice?: string
  discount: string
  discountType: 'percentage' | 'fixed'
  categories: string[]
  image?: string
  cjLink: string
  startDate: string
  endDate: string
  featured: boolean
}

export interface ClickEvent {
  sid: string
  storeId: number
  dealId: string
  timestamp: number
}
