import { fetchCJLinks, fetchCJAdvertisers } from '../../utils/cj-api'
import { mapCJLinksToCoupons, mapCJLinksToDeals, mapCJAdvertisersToStores } from '../../utils/cj-mappers'
import { writeCache } from '../../utils/cache'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  const results: Record<string, number | string> = {}

  const [couponData, dealData] = await Promise.all([
    fetchCJLinks({
      websiteId: config.cjWebsiteId,
      promotionType: 'coupon',
      advertiserIds: 'joined',
      recordsPerPage: 100,
    }),
    fetchCJLinks({
      websiteId: config.cjWebsiteId,
      promotionType: 'deal',
      advertiserIds: 'joined',
      recordsPerPage: 100,
    }),
  ])

  const coupons = couponData ? mapCJLinksToCoupons(couponData) : []
  const deals = dealData ? mapCJLinksToDeals(dealData) : []

  writeCache('coupons', coupons)
  writeCache('deals', deals)
  results.coupons = coupons.length
  results.deals = deals.length

  const advertiserData = await fetchCJAdvertisers({
    advertiserIds: 'joined',
    relationshipStatus: 'joined',
  })

  if (advertiserData) {
    const stores = mapCJAdvertisersToStores(advertiserData, coupons, deals)
    writeCache('stores', stores)
    results.stores = stores.length
  }

  results.syncedAt = new Date().toISOString()
  return results
})
