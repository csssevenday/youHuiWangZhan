import { readCache } from '../../utils/cache'

function slugifyCategory(cat: string): string {
  return cat
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default defineEventHandler(async () => {
  const stores = (readCache('stores') || []) as any[]
  const deals = (readCache('deals') || []) as any[]

  const now = new Date().toISOString().split('T')[0]
  const urls: { loc: string; lastmod?: string; changefreq?: string; priority?: number }[] = []

  // Static pages
  urls.push({ loc: '/', lastmod: now, changefreq: 'daily', priority: 1.0 })
  urls.push({ loc: '/coupons', lastmod: now, changefreq: 'daily', priority: 0.9 })
  urls.push({ loc: '/deals', lastmod: now, changefreq: 'daily', priority: 0.9 })
  urls.push({ loc: '/stores', lastmod: now, changefreq: 'daily', priority: 0.9 })
  urls.push({ loc: '/about', lastmod: now, changefreq: 'monthly', priority: 0.3 })
  urls.push({ loc: '/privacy', lastmod: now, changefreq: 'yearly', priority: 0.1 })
  urls.push({ loc: '/terms', lastmod: now, changefreq: 'yearly', priority: 0.1 })

  // Dynamic store pages
  for (const store of stores) {
    if (store.slug) {
      urls.push({ loc: `/stores/${store.slug}`, lastmod: now, changefreq: 'weekly', priority: 0.7 })
    }
  }

  // Dynamic deal pages (use slug instead of id)
  for (const deal of deals) {
    const path = deal.slug || deal.id
    if (path) {
      urls.push({ loc: `/deals/${path}`, lastmod: now, changefreq: 'weekly', priority: 0.6 })
    }
  }

  // Category pages
  const categories = new Set<string>()
  for (const deal of deals) {
    for (const cat of deal.categories || []) {
      categories.add(cat)
    }
  }
  for (const cat of categories) {
    urls.push({ loc: `/category/${slugifyCategory(cat)}`, lastmod: now, changefreq: 'weekly', priority: 0.7 })
  }

  return urls
})
