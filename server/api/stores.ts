import { fetchCJAdvertisers } from '../utils/cj-api'
import { mapCJAdvertisersToStores, mapCJLinksToCoupons, mapCJLinksToDeals } from '../utils/cj-mappers'
import { readCache, writeCache, isCacheStale } from '../utils/cache'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const cacheKey = 'stores'

  const cached = readCache(cacheKey)
  if (cached && !isCacheStale(cacheKey)) {
    return cached
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
      return stores
    } else {
      console.warn('[CJ] Store API returned no data, check token/permissions')
    }
  } catch (e: any) {
    console.error('[CJ] Store API error:', e.message)
  }

  return cached || []
})
