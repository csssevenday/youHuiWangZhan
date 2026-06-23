import type { Coupon, Deal, Store } from '../../types'
import { generateSID } from '../../utils/cj-tracking'
import { getStoreLogo } from './logos'

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Patterns that indicate a description is actually a banner dimension or other non-content
const BANNER_DIMENSION_RE = /^\d+\s*[\*xX×]\s*\d+$/
const MEANINGLESS_TITLE_PATTERNS = [
  /^evergreen\s+link/i,
  /^test\s+link/i,
  /^generic\s+link/i,
  /^deep\s+link/i,
  /^home\s+page\s+link/i,
  /^landing\s+page/i,
]

function isValidDescription(desc: string): boolean {
  if (!desc || !desc.trim()) return false
  const trimmed = desc.trim()
  // Filter out banner dimensions like "160*600", "300x250"
  if (BANNER_DIMENSION_RE.test(trimmed)) return false
  // Filter out very short descriptions (less than 10 chars)
  if (trimmed.length < 10) return false
  return true
}

function isValidTitle(title: string): boolean {
  if (!title || !title.trim()) return false
  const trimmed = title.trim()
  // Filter out titles matching meaningless patterns
  for (const pattern of MEANINGLESS_TITLE_PATTERNS) {
    if (pattern.test(trimmed)) return false
  }
  // Filter out very short titles
  if (trimmed.length < 5) return false
  return true
}

/**
 * Parse CJ date formats robustly. CJ returns dates like:
 * - "2024-12-31"
 * - "12/31/2024"
 * - "2024-12-31 00:00:00"
 * - "N/A" or empty string (meaning no expiry)
 * - Various other formats
 */
function parseCJDate(dateStr: string): string {
  if (!dateStr || !dateStr.trim()) return ''
  const trimmed = dateStr.trim()

  // CJ sometimes returns "N/A" or other non-date strings
  if (/^(n\/a|none|undefined|null|tbd)$/i.test(trimmed)) return ''

  // Try ISO format first: YYYY-MM-DD
  const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (isoMatch) {
    const d = new Date(Number(isoMatch[1]), Number(isoMatch[2]) - 1, Number(isoMatch[3]))
    if (!isNaN(d.getTime())) return d.toISOString().split('T')[0]
  }

  // Try US format: MM/DD/YYYY
  const usMatch = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/)
  if (usMatch) {
    const d = new Date(Number(usMatch[3]), Number(usMatch[1]) - 1, Number(usMatch[2]))
    if (!isNaN(d.getTime())) return d.toISOString().split('T')[0]
  }

  // Fallback: try native Date parsing
  const d = new Date(trimmed)
  if (!isNaN(d.getTime())) return d.toISOString().split('T')[0]

  return ''
}

function generateDealSlug(title: string, storeName: string, linkId: string): string {
  const base = slugify(`${title}-${storeName}`)
  // Append short link ID suffix to ensure uniqueness
  const suffix = String(linkId).slice(-4)
  return `${base}-${suffix}`
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
    .filter((link: any) => isValidTitle(link['link-name'] || ''))
    .map((link: any) => {
      const clickUrl = link['clickUrl'] || ''
      const separator = clickUrl.includes('?') ? '&' : '?'
      return {
        id: `cj-${link['link-id'] || link['link-code']}`,
        storeId: Number(link['advertiser-id']) || 0,
        storeName: link['advertiser-name'] || '',
        storeSlug: slugify(link['advertiser-name'] || ''),
        title: link['link-name'] || link['promotion-type'] || 'Coupon',
        description: isValidDescription(link.description) ? link.description : '',
        code: link['coupon-code'] || '',
        discount: extractDiscount(link),
        type: mapCJDiscountType(link['link-promotion-type'] || link['promotion-type'] || ''),
        categories: [link.category].filter(Boolean),
        expiryDate: parseCJDate(link['promotion-end-date'] || ''),
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
    .filter((link: any) => isValidTitle(link['link-name'] || ''))
    .map((link: any) => {
      const clickUrl = link['clickUrl'] || ''
      const separator = clickUrl.includes('?') ? '&' : '?'
      const linkId = link['link-id'] || link['link-code'] || ''
      const title = link['link-name'] || link['promotion-type'] || 'Deal'
      const storeName = link['advertiser-name'] || ''
      return {
        id: `cj-${linkId}`,
        slug: generateDealSlug(title, storeName, String(linkId)),
        storeId: Number(link['advertiser-id']) || 0,
        storeName,
        storeSlug: slugify(storeName),
        title,
        description: isValidDescription(link.description) ? link.description : '',
        originalPrice: link['original-price'] || undefined,
        salePrice: link['sale-price'] || undefined,
        discount: extractDiscount(link),
        discountType: 'percentage',
        categories: [link.category].filter(Boolean),
        image: link['banner-url'] || link['image-url'] || undefined,
        cjLink: `${clickUrl}${separator}sid=${encodeURIComponent(generateSID({ storeId: Number(link['advertiser-id']) || 0, dealId: String(linkId) }))}`,
        startDate: parseCJDate(link['promotion-start-date'] || ''),
        endDate: parseCJDate(link['promotion-end-date'] || ''),
        featured: link.featured === 'yes' || link.featured === true,
      }
    })
}

export function mapCJAdvertisersToStores(data: any, existingCoupons: Coupon[], existingDeals: Deal[]): Store[] {
  const advertisers = data?.['cj-api']?.advertisers?.advertiser || []
  const advArray = Array.isArray(advertisers) ? advertisers : [advertisers]
  const couponMap = new Map<number, number>()
  const dealMap = new Map<number, number>()

  for (const c of existingCoupons) {
    couponMap.set(c.storeId, (couponMap.get(c.storeId) || 0) + 1)
  }
  for (const d of existingDeals) {
    dealMap.set(d.storeId, (dealMap.get(d.storeId) || 0) + 1)
  }

  return advArray
    .filter((adv: any) => isValidTitle(adv['advertiser-name'] || ''))
    .map((adv: any) => {
      const categories = adv['primary-category']
        ? [adv['primary-category'].parent, adv['primary-category'].child].filter(Boolean)
        : (adv.category || '').split(',').map((c: string) => c.trim()).filter(Boolean)
      const advId = Number(adv['advertiser-id']) || 0
      const name = adv['advertiser-name'] || ''
      return {
        id: advId,
        name,
        slug: slugify(name),
        description: adv['advertiser-description'] || `${name} deals and coupons - Save money with verified discounts and promo codes.`,
        logoUrl: getStoreLogo(adv['advertiser-id'], adv['program-url'] || ''),
        websiteUrl: adv['program-url'] || '',
        categories,
        rating: 4.0,
        dealCount: (couponMap.get(advId) || 0) + (dealMap.get(advId) || 0),
      }
    })
}
