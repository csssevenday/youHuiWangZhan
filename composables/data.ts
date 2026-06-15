import type { Coupon, Deal, Store } from '~/types'

// Mock data for development - replace with real CJ Product Catalog API
const mockStores: Store[] = [
  {
    id: 1,
    name: 'Amazon',
    slug: 'amazon',
    description: 'Everything from A to Z. Shop millions of products.',
    logoUrl: 'https://logo.clearbit.com/amazon.com',
    websiteUrl: 'https://www.amazon.com',
    categories: ['Electronics', 'Fashion', 'Home & Garden', 'Toys'],
    rating: 4.8,
    dealCount: 156
  },
  {
    id: 2,
    name: 'Nike',
    slug: 'nike',
    description: 'Premium athletic shoes, apparel, and equipment.',
    logoUrl: 'https://logo.clearbit.com/nike.com',
    websiteUrl: 'https://www.nike.com',
    categories: ['Fashion', 'Sports'],
    rating: 4.7,
    dealCount: 89
  },
  {
    id: 3,
    name: 'Sephora',
    slug: 'sephora',
    description: 'Beauty products, makeup, skincare and fragrance.',
    logoUrl: 'https://logo.clearbit.com/sephora.com',
    websiteUrl: 'https://www.sephora.com',
    categories: ['Health & Beauty'],
    rating: 4.6,
    dealCount: 67
  },
  {
    id: 4,
    name: 'Target',
    slug: 'target',
    description: 'Expect More. Pay Less. Everyday essentials and more.',
    logoUrl: 'https://logo.clearbit.com/target.com',
    websiteUrl: 'https://www.target.com',
    categories: ['Home & Garden', 'Electronics', 'Food & Dining', 'Toys'],
    rating: 4.5,
    dealCount: 124
  },
  {
    id: 5,
    name: 'Booking.com',
    slug: 'booking-com',
    description: 'Hotels, flights, car rentals and vacation rentals.',
    logoUrl: 'https://logo.clearbit.com/booking.com',
    websiteUrl: 'https://www.booking.com',
    categories: ['Travel'],
    rating: 4.4,
    dealCount: 45
  },
  {
    id: 6,
    name: 'Macy\'s',
    slug: 'macys',
    description: 'Department store for fashion, home, beauty and more.',
    logoUrl: 'https://logo.clearbit.com/macys.com',
    websiteUrl: 'https://www.macys.com',
    categories: ['Fashion', 'Home & Garden', 'Health & Beauty'],
    rating: 4.3,
    dealCount: 98
  }
]

const mockDeals: Deal[] = [
  {
    id: 'deal-1',
    storeId: 1,
    storeName: 'Amazon',
    storeSlug: 'amazon',
    title: 'Up to 50% Off Electronics',
    description: 'Save big on laptops, tablets, headphones and more tech essentials.',
    originalPrice: '$999.99',
    salePrice: '$499.99',
    discount: '50',
    discountType: 'percentage',
    categories: ['Electronics'],
    image: 'https://picsum.photos/seed/deal1/400/300',
    cjLink: '',
    startDate: '2024-06-01',
    endDate: '2024-12-31',
    featured: true
  },
  {
    id: 'deal-2',
    storeId: 2,
    storeName: 'Nike',
    storeSlug: 'nike',
    title: '25% Off Running Shoes',
    description: 'Get the latest Nike running shoes at a discount.',
    originalPrice: '$180',
    salePrice: '$135',
    discount: '25',
    discountType: 'percentage',
    categories: ['Fashion', 'Sports'],
    image: 'https://picsum.photos/seed/deal2/400/300',
    cjLink: '',
    startDate: '2024-06-15',
    endDate: '2024-09-30',
    featured: true
  },
  {
    id: 'deal-3',
    storeId: 3,
    storeName: 'Sephora',
    storeSlug: 'sephora',
    title: '$30 Off Orders Over $100',
    description: 'Save on premium beauty products and skincare.',
    originalPrice: '$100',
    salePrice: '$70',
    discount: '30',
    discountType: 'fixed',
    categories: ['Health & Beauty'],
    image: 'https://picsum.photos/seed/deal3/400/300',
    cjLink: '',
    startDate: '2024-07-01',
    endDate: '2024-08-31',
    featured: false
  },
  {
    id: 'deal-4',
    storeId: 4,
    storeName: 'Target',
    storeSlug: 'target',
    title: '40% Off Home Decor',
    description: 'Refresh your living space with discounted home essentials.',
    discount: '40',
    discountType: 'percentage',
    categories: ['Home & Garden'],
    image: 'https://picsum.photos/seed/deal4/400/300',
    cjLink: '',
    startDate: '2024-06-01',
    endDate: '2024-07-31',
    featured: true
  },
  {
    id: 'deal-5',
    storeId: 5,
    storeName: 'Booking.com',
    storeSlug: 'booking-com',
    title: 'Up to 30% Off Hotels',
    description: 'Book your next vacation at discounted rates worldwide.',
    discount: '30',
    discountType: 'percentage',
    categories: ['Travel'],
    image: 'https://picsum.photos/seed/deal5/400/300',
    cjLink: '',
    startDate: '2024-06-01',
    endDate: '2024-12-31',
    featured: false
  },
  {
    id: 'deal-6',
    storeId: 6,
    storeName: 'Macy\'s',
    storeSlug: 'macys',
    title: 'Extra 20% Off Sale Items',
    description: 'Stack savings on already reduced fashion and home goods.',
    discount: '20',
    discountType: 'percentage',
    categories: ['Fashion', 'Home & Garden'],
    image: 'https://picsum.photos/seed/deal6/400/300',
    cjLink: '',
    startDate: '2024-07-01',
    endDate: '2024-07-15',
    featured: true
  }
]

const mockCoupons: Coupon[] = [
  {
    id: 'coupon-1',
    storeId: 1,
    storeName: 'Amazon',
    storeSlug: 'amazon',
    title: 'Extra 10% Off with Code',
    description: 'Apply code at checkout for additional savings.',
    code: 'SAVE10',
    discount: '10',
    type: 'percentage',
    categories: ['Electronics'],
    expiryDate: '2024-12-31',
    verified: true,
    successRate: 92,
    cjLink: ''
  },
  {
    id: 'coupon-2',
    storeId: 2,
    storeName: 'Nike',
    storeSlug: 'nike',
    title: 'Free Shipping on Orders $50+',
    description: 'No code needed, discount applied automatically.',
    code: 'FREESHIP',
    discount: '',
    type: 'free_shipping',
    categories: ['Fashion', 'Sports'],
    expiryDate: '2024-09-30',
    verified: true,
    successRate: 98,
    cjLink: ''
  },
  {
    id: 'coupon-3',
    storeId: 3,
    storeName: 'Sephora',
    storeSlug: 'sephora',
    title: '15% Off First Order',
    description: 'New customers save 15% on their first purchase.',
    code: 'WELCOME15',
    discount: '15',
    type: 'percentage',
    categories: ['Health & Beauty'],
    expiryDate: '2024-12-31',
    verified: true,
    successRate: 85,
    cjLink: ''
  },
  {
    id: 'coupon-4',
    storeId: 4,
    storeName: 'Target',
    storeSlug: 'target',
    title: '$20 Off $75+ Purchase',
    description: 'Save $20 when you spend $75 or more.',
    code: 'SAVE20',
    discount: '20',
    type: 'fixed',
    categories: ['Home & Garden', 'Electronics'],
    expiryDate: '2024-08-15',
    verified: false,
    successRate: 67,
    cjLink: ''
  },
  {
    id: 'coupon-5',
    storeId: 5,
    storeName: 'Booking.com',
    storeSlug: 'booking-com',
    title: '20% Off First Booking',
    description: 'Sign up and get 20% off your first reservation.',
    code: 'BOOK20',
    discount: '20',
    type: 'percentage',
    categories: ['Travel'],
    expiryDate: '2024-12-31',
    verified: true,
    successRate: 90,
    cjLink: ''
  },
  {
    id: 'coupon-6',
    storeId: 6,
    storeName: 'Macy\'s',
    storeSlug: 'macys',
    title: 'Buy One Get One 50% Off',
    description: 'Mix and match - get second item at half price.',
    code: 'BOGO50',
    discount: '',
    type: 'bogo',
    categories: ['Fashion', 'Health & Beauty'],
    expiryDate: '2024-07-31',
    verified: true,
    successRate: 78,
    cjLink: ''
  }
]

// Generate CJ links for all items
function generateCJLinksForItems(items: (Deal | Coupon)[], stores: Store[]) {
  const storeMap = new Map(stores.map(s => [s.id, s]))
  for (const item of items) {
    const store = storeMap.get(item.storeId)
    if (store) {
      item.cjLink = generateCJLink({
        destinationUrl: store.websiteUrl,
        sid: generateSID({ storeId: item.storeId, dealId: item.id })
      })
    }
  }
}

export async function useStores(): Promise<Store[]> {
  try {
    const stores = await $fetch<Store[]>('/api/stores')
    if (stores.length > 0) return stores
  } catch {
    // fall through to mock
  }
  return mockStores
}

export async function useDeals(): Promise<Deal[]> {
  try {
    const deals = await $fetch<Deal[]>('/api/deals')
    if (deals.length > 0) return deals
  } catch {
    // fall through to mock
  }
  generateCJLinksForItems(mockDeals, mockStores)
  return mockDeals
}

export async function useCoupons(): Promise<Coupon[]> {
  try {
    const coupons = await $fetch<Coupon[]>('/api/coupons')
    if (coupons.length > 0) return coupons
  } catch {
    // fall through to mock
  }
  generateCJLinksForItems(mockCoupons, mockStores)
  return mockCoupons
}

export async function useStoreBySlug(slug: string): Promise<Store | undefined> {
  const stores = await useStores()
  return stores.find(s => s.slug === slug)
}

export async function useDealsByCategory(category: string): Promise<Deal[]> {
  const deals = await useDeals()
  return deals.filter(d => d.categories.includes(category))
}
