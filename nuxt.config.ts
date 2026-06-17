export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxt/image'
  ],

  // Vercel deployment preset
  nitro: {
    preset: 'vercel',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      ignore: ['/api', '/sitemap.xml', '/sitemap_index.xml']
    }
  },

  site: {
    url: process.env.SITE_URL || 'https://coupondealsus.com',
    name: 'CouponDealsUS'
  },

  robots: {
    allow: '/'
  },

  sitemap: {
    prerender: false
  },

  image: {
    domains: ['logo.clearbit.com', 'picsum.photos'],
    formats: ['webp', 'avif', 'jpg'],
    quality: 80
  },

  devtools: { enabled: true },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Top Deals & Coupons - Save Money Today',
      meta: [
        { name: 'description', content: 'Find the best deals, coupons, and discounts from top brands. Save money on your favorite products.' }
      ]
    }
  },

  runtimeConfig: {
    // Server-only
    cjPublisherId: process.env.CJ_PUBLISHER_ID || '',
    cjWebsiteId: process.env.CJ_WEBSITE_ID || '',
    cjApiToken: process.env.CJ_API_TOKEN || '',

    // Public (exposed to client)
    public: {
      cjTrackingDomain: process.env.CJ_TRACKING_DOMAIN || 'www.anrdoezrs.net',
      siteUrl: process.env.SITE_URL || 'https://coupondealsus.com'
    }
  },

  // Fix Windows path issue with component imports
  vite: {
    resolve: {
      alias: {
        'vite/modulepreload-polyfill': 'vite/modulepreload-polyfill'
      }
    }
  },

  compatibilityDate: '2024-06-02'
})
