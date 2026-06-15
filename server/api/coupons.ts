import { fetchCJLinks } from '../utils/cj-api'
import { mapCJLinksToCoupons } from '../utils/cj-mappers'
import { readCache, writeCache, isCacheStale } from '../utils/cache'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const cacheKey = 'coupons'

  const cached = readCache(cacheKey)
  if (cached && !isCacheStale(cacheKey)) {
    return cached
  }

  try {
    const data = await fetchCJLinks({
      websiteId: config.cjWebsiteId,
      promotionType: 'coupon',
      advertiserIds: 'joined',
      recordsPerPage: 100,
    })

    if (data) {
      const coupons = mapCJLinksToCoupons(data)
      console.log(`[CJ] Loaded ${coupons.length} coupons from API`)
      writeCache(cacheKey, coupons)
      return coupons
    } else {
      console.warn('[CJ] Coupon API returned no data, check token/permissions')
    }
  } catch (e: any) {
    console.error('[CJ] Coupon API error:', e.message)
  }

  return cached || []
})
