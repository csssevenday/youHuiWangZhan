export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/seo',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
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
    url: process.env.SITE_URL || 'https://hotcoupongain.com',
    name: 'HotCouponGain'
  },

  ogImage: {
    enabled: true,
    defaults: {
      component: 'NuxtSeo',
      color: 'rgb(37,99,235)',
      fontSize: 48
    }
  },

  robots: {
    disallow: ['/search', '/api'],
    allow: '/',
    sitemap: ['/sitemap.xml']
  },

  sitemap: {
    prerender: false,
    sources: [
      '/api/__sitemap__/urls'
    ]
  },

  devtools: { enabled: true },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'en'
      },
      title: 'HotCouponGain - Best Coupons & Deals Online',
      meta: [
        { name: 'description', content: 'Save money with verified coupon codes and exclusive deals from top US brands. Find discounts on electronics, fashion, home goods and more.' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
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
      siteUrl: process.env.SITE_URL || 'https://hotcoupongain.com'
    }
  },

  compatibilityDate: '2024-06-02'
})
