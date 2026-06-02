export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  site: {
    url: 'https://coupondealsus.com',
    name: 'CouponDealsUS'
  },

  robots: {
    allow: '/'
  },

  sitemap: {
    sources: [
      '/api/__sitemap__/urls'
    ]
  },

  // @nuxt/image disabled due to Windows Vite compatibility issue
  // image: {
  //   provider: 'none'
  // },

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

    // Public (exposed to client)
    public: {
      cjTrackingDomain: process.env.CJ_TRACKING_DOMAIN || 'www.anrdoezrs.net',
      siteUrl: process.env.SITE_URL || 'http://localhost:3000'
    }
  },

  compatibilityDate: '2024-06-02'
})
