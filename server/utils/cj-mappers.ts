import type { Coupon, Deal, Store } from '../../types'
import { generateSID } from '../../utils/cj-tracking'
import { getStoreLogo } from './logos'

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function mapCJDiscountType(cjType: string): 'percentage' | 'fixed' | 'free_shipping' | 'bogo' {
  const t = (cjType || '').toLowerCase()
  if (t.includes('shipping')) return 'free_shipping'
  if (t.includes('bogo') || t.includes('buy one')) return 'bogo'
  if (t.includes('fixed') || t.includes('dollar') || t.includes('amount')) return 'fixed'
  return 'percentage'
}

function extractDiscount(link: any): string {
  const pct = link.discountPercentage || link.percentOff
  if (pct) return String(pct)
  const amt = link.discountAmount || link.dollarOff
  if (amt) return String(amt)
  return ''
}

export function mapCJLinksToCoupons(data: any): Coupon[] {
  const links = data?.['cj-api']?.links?.link || []
  const linkArray = Array.isArray(links) ? links : [links]
  return linkArray
    .filter((link: any) => link['coupon-code'])
    .map((link: any) => {
      const clickUrl = link['clickUrl'] || ''
      const separator = clickUrl.includes('?') ? '&' : '?'
      return {
        id: `cj-${link['link-id'] || link['link-code']}`,
        storeId: Number(link['advertiser-id']) || 0,
        storeName: link['advertiser-name'] || '',
        storeSlug: slugify(link['advertiser-name'] || ''),
        title: link['link-name'] || link['promotion-type'] || 'Coupon',
        description: link.description || '',
        code: link['coupon-code'] || '',
        discount: extractDiscount(link),
        type: mapCJDiscountType(link['link-promotion-type'] || link['promotion-type'] || ''),
        categories: [link.category].filter(Boolean),
        expiryDate: link['promotion-end-date'] || '',
        verified: true,
        successRate: 0,
        cjLink: `${clickUrl}${separator}sid=${encodeURIComponent(generateSID({ storeId: Number(link['advertiser-id']) || 0, dealId: String(link['link-id'] || '') }))}`,
      }
    })
}

export function mapCJLinksToDeals(data: any): Deal[] {
  const links = data?.['cj-api']?.links?.link || []
  const linkArray = Array.isArray(links) ? links : [links]
  return linkArray
    .filter((link: any) => !link['coupon-code'])
    .map((link: any) => {
      const clickUrl = link['clickUrl'] || ''
      const separator = clickUrl.includes('?') ? '&' : '?'
      return {
        id: `cj-${link['link-id'] || link['link-code']}`,
        storeId: Number(link['advertiser-id']) || 0,
        storeName: link['advertiser-name'] || '',
        storeSlug: slugify(link['advertiser-name'] || ''),
        title: link['link-name'] || link['promotion-type'] || 'Deal',
        description: link.description || '',
        originalPrice: link['original-price'] || undefined,
        salePrice: link['sale-price'] || undefined,
        discount: extractDiscount(link),
        discountType: 'percentage',
        categories: [link.category].filter(Boolean),
        image: link['banner-url'] || link['image-url'] || undefined,
        cjLink: `${clickUrl}${separator}sid=${encodeURIComponent(generateSID({ storeId: Number(link['advertiser-id']) || 0, dealId: String(link['link-id'] || '') }))}`,
        startDate: link['promotion-start-date'] || '',
        endDate: link['promotion-end-date'] || '',
        featured: link.featured === 'yes' || link.featured === true,
      }
    })
}

export function mapCJAdvertisersToStores(data: any, existingCoupons: Coupon[], existingDeals: Deal[]): Store[] {
  const advertisers = data?.['cj-api']?.advertisers?.advertiser || []
  const advArray = Array.isArray(advertisers) ? advertisers : [advertisers]
  const couponMap = new Map<string, number>()
  const dealMap = new Map<string, number>()

  for (const c of existingCoupons) {
    couponMap.set(c.storeName, (couponMap.get(c.storeName) || 0) + 1)
  }
  for (const d of existingDeals) {
    dealMap.set(d.storeName, (dealMap.get(d.storeName) || 0) + 1)
  }

  return advArray.map((adv: any) => {
    const categories = adv['primary-category']
      ? [adv['primary-category'].parent, adv['primary-category'].child].filter(Boolean)
      : (adv.category || '').split(',').map((c: string) => c.trim()).filter(Boolean)
    return {
      id: Number(adv['advertiser-id']) || 0,
      name: adv['advertiser-name'] || '',
      slug: slugify(adv['advertiser-name'] || ''),
      description: adv['advertiser-description'] || `${adv['advertiser-name']} deals and coupons`,
      logoUrl: getStoreLogo(adv['advertiser-id'], adv['program-url'] || ''),
      websiteUrl: adv['program-url'] || '',
      categories,
      rating: 4.0,
      dealCount: (couponMap.get(adv['advertiser-name']) || 0) + (dealMap.get(adv['advertiser-name']) || 0),
    }
  })
}
