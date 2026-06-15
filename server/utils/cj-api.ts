import { XMLParser } from 'fast-xml-parser'
import { $fetch } from 'ofetch'

const CJ_LINK_SEARCH_BASE = 'https://link-search.api.cj.com/v2'
const CJ_ADVERTISER_LOOKUP_BASE = 'https://advertiser-lookup.api.cj.com/v2'

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  removeNSPrefix: true,
})

export interface CJLinkSearchParams {
  websiteId: string
  promotionType?: string
  advertiserIds?: string
  keywords?: string
  category?: string
  recordsPerPage?: number
  pageNumber?: number
}

export interface CJAdvertiserLookupParams {
  advertiserIds?: string
  relationshipStatus?: string
}

function cjHeaders(token: string) {
  return {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/xml',
  }
}

export async function fetchCJLinks(params: CJLinkSearchParams) {
  const config = useRuntimeConfig()
  const token = config.cjApiToken

  if (!token) {
    console.warn('[CJ] API token not configured')
    return null
  }

  const query = new URLSearchParams({
    'website-id': params.websiteId,
    'advertiser-ids': params.advertiserIds || 'joined',
    'records-per-page': String(Math.min(params.recordsPerPage || 100, 100)),
    'page-number': String(params.pageNumber || 1),
  })

  if (params.promotionType) query.set('promotion-type', params.promotionType)
  if (params.keywords) query.set('keywords', params.keywords)
  if (params.category) query.set('category', params.category)

  try {
    const raw: string = await $fetch(`${CJ_LINK_SEARCH_BASE}/link-search?${query}`, {
      headers: cjHeaders(token),
      responseType: 'text',
    })
    const parsed = xmlParser.parse(raw)
    console.log('[CJ] Link Search response:', JSON.stringify(parsed).slice(0, 200))
    return parsed
  } catch (e: any) {
    console.error('[CJ] Link Search API error:', e.statusCode, e.message)
    return null
  }
}

export async function fetchCJAdvertisers(params: CJAdvertiserLookupParams = {}) {
  const config = useRuntimeConfig()
  const token = config.cjApiToken

  if (!token) {
    console.warn('[CJ] API token not configured')
    return null
  }

  const query = new URLSearchParams({
    'requestor-cid': config.cjPublisherId,
  })
  if (params.advertiserIds) query.set('advertiser-ids', params.advertiserIds)
  if (params.relationshipStatus) query.set('relationship-status', params.relationshipStatus)

  try {
    const raw: string = await $fetch(`${CJ_ADVERTISER_LOOKUP_BASE}/advertiser-lookup?${query}`, {
      headers: cjHeaders(token),
      responseType: 'text',
    })
    const parsed = xmlParser.parse(raw)
    console.log('[CJ] Advertiser Lookup response:', JSON.stringify(parsed).slice(0, 200))
    return parsed
  } catch (e: any) {
    console.error('[CJ] Advertiser Lookup API error:', e.statusCode, e.message)
    return null
  }
}
