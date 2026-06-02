import { getCJConfig } from './config'

/**
 * Generate CJ on-click tracking link
 * Format: https://www.anrdoezrs.net/click-<advertiserID>-<productID>?SID=<sid>&url=<encodedDestURL>
 * Or simpler: https://www.jdoqocy.com/click-<publisherID>-<websiteID>?SID=<sid>&url=<encodedDestURL>
 */
export function generateCJLink(params: {
  destinationUrl: string
  sid: string
  advertiserId?: string
  productUrl?: string
}): string {
  const { destinationUrl, sid, advertiserId } = params
  const config = getCJConfig()
  const encodedUrl = encodeURIComponent(destinationUrl)
  const encodedSid = encodeURIComponent(sid)

  // CJ on-click tracking URL format
  return `https://${config.trackingDomain}/click-${config.publisherId}-${advertiserId || config.websiteId}?sid=${encodedSid}&url=${encodedUrl}`
}

/**
 * Generate a unique SID for click tracking
 */
export function generateSID(data?: { storeId: number; dealId: string; userId?: string }): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)

  if (data) {
    return `s${data.storeId}_d${data.dealId}_${timestamp}_${random}`
  }

  return `${timestamp}_${random}`
}

/**
 * Track click event and send to server
 */
export async function trackClick(event: {
  storeId: number
  dealId: string
  couponId?: string
  sid: string
}) {
  try {
    await $fetch('/api/track/click', {
      method: 'POST',
      body: {
        sid: event.sid,
        storeId: event.storeId,
        dealId: event.dealId,
        couponId: event.couponId,
        timestamp: Date.now(),
        referrer: typeof window !== 'undefined' ? document.referrer : ''
      }
    })
  } catch {
    // Silently fail - don't block the redirect
  }
}

/**
 * Handle coupon deal click: track then redirect
 */
export async function handleCouponClick(coupon: import('~/types').Coupon) {
  const sid = generateSID({ storeId: coupon.storeId, dealId: coupon.id })

  await trackClick({
    storeId: coupon.storeId,
    dealId: coupon.id,
    sid
  })

  // Open CJ tracking link in new tab
  if (typeof window !== 'undefined') {
    window.open(coupon.cjLink, '_blank', 'noopener,noreferrer')
  }
}

/**
 * Handle deal click: track then redirect
 */
export async function handleDealClick(deal: import('~/types').Deal) {
  const sid = generateSID({ storeId: deal.storeId, dealId: deal.id })

  await trackClick({
    storeId: deal.storeId,
    dealId: deal.id,
    sid
  })

  if (typeof window !== 'undefined') {
    window.open(deal.cjLink, '_blank', 'noopener,noreferrer')
  }
}
