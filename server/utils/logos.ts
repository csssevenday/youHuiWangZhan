// Custom logo mapping: advertiser-id → local logo filename
// Place logo images in /public/logos/ directory
// If no mapping exists, falls back to Clearbit logo

export const CUSTOM_LOGOS: Record<string, string> = {
  // Example:
  // '6404897': 'aiper.png',
  // '4839834': 'modlily.png',
}

export function getStoreLogo(advertiserId: string | number, websiteUrl: string): string {
  const id = String(advertiserId)
  const filename = CUSTOM_LOGOS[id]
  if (filename) {
    return `/logos/${filename}`
  }
  const domain = websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
  return `https://logo.clearbit.com/${domain}`
}
