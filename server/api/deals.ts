import { fetchCJLinks } from '../utils/cj-api'
import { mapCJLinksToDeals } from '../utils/cj-mappers'
import { readCache, writeCache, isCacheStale } from '../utils/cache'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const cacheKey = 'deals'

  const cached = readCache(cacheKey)
  if (cached && !isCacheStale(cacheKey)) {
    return cached
  }

  try {
    const data = await fetchCJLinks({
      websiteId: config.cjWebsiteId,
      advertiserIds: 'joined',
      recordsPerPage: 100,
    })

    if (data) {
      const deals = mapCJLinksToDeals(data)
      console.log(`[CJ] Loaded ${deals.length} deals from API`)
      writeCache(cacheKey, deals)
      return deals
    } else {
      console.warn('[CJ] Deals API returned no data')
    }
  } catch (e: any) {
    console.error('[CJ] Deals API error:', e.message)
  }

  return cached || []
})
