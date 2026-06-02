# CouponDealsUS

A coupon and deal discovery website built with Nuxt 3, integrated with CJ Affiliate (Commission Junction) on-click tracking.

## Features

- **CJ Affiliate Tracking**: On-click tracking with SID parameters for commission attribution
- **Coupon Codes**: Verified coupon codes with copy-to-clipboard functionality
- **Deal Listings**: Curated deals with discount percentages and prices
- **Store Directory**: Browse deals by merchant
- **Category Filtering**: Filter by Fashion, Electronics, Home & Garden, etc.
- **Search**: Full-text search across deals, stores, and categories
- **SEO Optimized**: Robots.txt, sitemap, and dynamic meta tags
- **Responsive**: Mobile-first Tailwind CSS design

## Tech Stack

- **Framework**: Nuxt 3 (Vue 3)
- **Styling**: Tailwind CSS
- **State**: Pinia
- **Language**: TypeScript
- **SEO**: @nuxtjs/robots, @nuxtjs/sitemap

## Setup

1. Copy `.env.example` to `.env` and fill in your CJ Affiliate credentials:
```bash
cp .env.example .env
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
node .output/server/index.mjs
```

## CJ Affiliate Integration

The tracking system is implemented in `utils/cj-tracking.ts`:

- **`generateCJLink()`**: Creates CJ on-click tracking URLs in the format `https://www.anrdoezrs.net/click-{publisherId}-{advertiserId}?sid={sid}&url={encodedUrl}`
- **`generateSID()`**: Generates unique tracking SIDs combining store ID, deal ID, timestamp, and random string
- **`trackClick()`**: Logs click events to the server-side `/api/track/click` endpoint
- **`handleCouponClick()` / `handleDealClick()`**: Combines tracking + redirect in one action

## Project Structure

```
├── components/          # Vue components
│   ├── Navbar.vue       # Navigation bar with search
│   ├── AppFooter.vue    # Site footer
│   ├── DealCard.vue     # Deal display card
│   ├── CouponCard.vue   # Coupon with copy code
│   └── StoreCard.vue    # Store logo card
├── pages/               # Nuxt pages
│   ├── index.vue        # Homepage
│   ├── coupons.vue      # All coupons
│   ├── deals.vue        # All deals
│   ├── stores.vue       # Store directory
│   ├── stores/[slug].vue  # Store detail page
│   ├── deals/[id].vue     # Deal detail page
│   ├── category/[slug].vue  # Category page
│   ├── search.vue       # Search results
│   ├── about.vue        # About page
│   ├── privacy.vue      # Privacy policy
│   └── terms.vue        # Terms of service
├── composables/data.ts  # Data fetching (mock data + CJ link generation)
├── stores/app.ts        # Pinia state store
├── utils/
│   ├── cj-tracking.ts   # CJ Affiliate tracking
│   ├── config.ts        # Site configuration
│   └── helpers.ts       # Utility functions
├── server/api/          # API routes
│   ├── coupons.ts       # Get all coupons
│   ├── deals.ts         # Get all deals
│   ├── stores.ts        # Get all stores
│   └── track/click.ts   # Click tracking endpoint
└── types/index.ts       # TypeScript type definitions
```

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `CJ_PUBLISHER_ID` | Your CJ publisher/advertiser ID | - |
| `CJ_WEBSITE_ID` | Your CJ website ID | - |
| `CJ_TRACKING_DOMAIN` | CJ tracking domain | `www.anrdoezrs.net` |
| `SITE_URL` | Your site URL | `http://localhost:3000` |

## Next Steps (To Production)

1. **Replace mock data** in `composables/data.ts` with CJ Product Catalog API
2. **Add your real CJ credentials** in `.env`
3. **Add `app.vue`** root component if needed
4. **Deploy** to Vercel, Netlify, or Node.js host
