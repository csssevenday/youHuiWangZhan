export function getCJConfig() {
  const config = useRuntimeConfig()
  return {
    publisherId: config.cjPublisherId,
    websiteId: config.cjWebsiteId,
    trackingDomain: config.public.cjTrackingDomain
  }
}

export const SITE_NAME = 'HotCouponGain'
export const SITE_DESCRIPTION = 'Find the best deals, coupons, and discounts from top brands in the US'

export const CATEGORIES = [
  'Fashion',
  'Electronics',
  'Home & Garden',
  'Health & Beauty',
  'Food & Dining',
  'Travel',
  'Sports',
  'Toys',
  'Automotive',
  'Pet Supplies'
] as const

export const DEAL_TYPES = [
  { value: 'percentage', label: 'Percentage Off' },
  { value: 'fixed', label: 'Fixed Amount Off' },
  { value: 'free_shipping', label: 'Free Shipping' },
  { value: 'bogo', label: 'Buy One Get One' }
] as const
