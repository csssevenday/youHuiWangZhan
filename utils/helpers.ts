export function formatDiscount(amount: number, type: string): string {
  if (type === 'percentage') return `${amount}% OFF`
  if (type === 'fixed') return `$${amount} OFF`
  if (type === 'free_shipping') return 'Free Shipping'
  if (type === 'bogo') return 'BOGO'
  return `${amount}% OFF`
}

export function formatDate(dateString: string): string {
  if (!dateString || !dateString.trim()) return 'No expiry'
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return 'No expiry'
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function isExpired(dateString: string): boolean {
  return new Date(dateString) < new Date()
}

export function daysUntilExpiry(dateString: string): number {
  const now = new Date()
  const expiry = new Date(dateString)
  const diff = expiry.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
