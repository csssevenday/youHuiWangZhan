// Custom logo mapping: advertiser-id → local logo filename
// Place logo images in /public/logos/ directory
// If no mapping exists, falls back to Clearbit logo

export const CUSTOM_LOGOS: Record<string, string> = {
  '4839834': 'Modlily.png',
  '6404897': 'aiper.png',
  '6536042': 'chow-sang-sang.png',
  '7804601': 'GearUP.png',
  '7711902': 'AliExpress.png',
  '7636568': 'Coofandy.png',
  '7582444': 'bc-babycare.png',
  '7686542': 'ksp-performance.png',
}

export function getStoreLogo(advertiserId: string | number, websiteUrl: string): string {
  const id = String(advertiserId)
  const filename = CUSTOM_LOGOS[id]
  if (filename) {
    return `/logos/${filename}`
  }
  const domain = websiteUrl
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '')
  return `https://logo.clearbit.com/${domain}`
}
