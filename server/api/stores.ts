import { fetchCJAdvertisers, fetchCJLinks } from '../utils/cj-api'
import { mapCJAdvertisersToStores, mapCJLinksToCoupons, mapCJLinksToDeals } from '../utils/cj-mappers'
import { readCache, writeCache, isCacheStale } from '../utils/cache'
import { getStoreLogo } from '../utils/logos'

function recalculateDealCount(stores: any[]): any[] {
  const coupons = (readCache('coupons') || []) as any[]
  const deals = (readCache('deals') || []) as any[]

  const couponCount = new Map<number, number>()
  const dealCount = new Map<number, number>()

  for (const c of coupons) {
    couponCount.set(c.storeId, (couponCount.get(c.storeId) || 0) + 1)
  }
  for (const d of deals) {
    dealCount.set(d.storeId, (dealCount.get(d.storeId) || 0) + 1)
  }

  return stores.map((s: any) => ({
    ...s,
    logoUrl: getStoreLogo(s.id, s.websiteUrl || ''),
    dealCount: (couponCount.get(s.id) || 0) + (dealCount.get(s.id) || 0),
  }))
}

async function ensureCouponsAndDealsCached(config: any) {
  const couponsCache = readCache('coupons')
  const dealsCache = readCache('deals')

  if (!couponsCache || isCacheStale('coupons')) {
    try {
      const data = await fetchCJLinks({
        websiteId: config.cjWebsiteId,
        promotionType: 'coupon',
        advertiserIds: 'joined',
        recordsPerPage: 100,
      })
      if (data) {
        const coupons = mapCJLinksToCoupons(data)
        writeCache('coupons', coupons)
      }
    } catch (e: any) {
      console.error('[CJ] Failed to fetch coupons:', e.message)
    }
  }

  if (!dealsCache || isCacheStale('deals')) {
    try {
      const data = await fetchCJLinks({
        websiteId: config.cjWebsiteId,
        advertiserIds: 'joined',
        recordsPerPage: 100,
      })
      if (data) {
        const deals = mapCJLinksToDeals(data)
        writeCache('deals', deals)
      }
    } catch (e: any) {
      console.error('[CJ] Failed to fetch deals:', e.message)
    }
  }
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const cacheKey = 'stores'

  await ensureCouponsAndDealsCached(config)

  const cached = readCache(cacheKey)
  if (cached && !isCacheStale(cacheKey)) {
    return recalculateDealCount(cached)
  }

  try {
    const data = await fetchCJAdvertisers({
      advertiserIds: 'joined',
    })

    const advertisers = data?.['cj-api']?.advertisers?.advertiser
    const advArray = Array.isArray(advertisers) ? advertisers : (advertisers ? [advertisers] : [])

    if (advArray.length) {
      console.log(`[CJ] Loaded ${advArray.length} stores from API`)
      const coupons = (readCache('coupons') || []) as any[]
      const deals = (readCache('deals') || []) as any[]
      const stores = mapCJAdvertisersToStores(data, coupons, deals)
      writeCache(cacheKey, stores)
      return recalculateDealCount(stores)
    } else {
      console.warn('[CJ] Store API returned no data, check token/permissions')
    }
  } catch (e: any) {
    console.error('[CJ] Store API error:', e.message)
  }

  return recalculateDealCount(cached || [])
})
