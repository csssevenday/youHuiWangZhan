import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const CACHE_TTL_MS = 4 * 60 * 60 * 1000 // 4 hours

const memoryCache = new Map<string, { data: any; timestamp: number }>()

function getCacheFilePath(key: string): string {
  const dataDir = join(process.cwd(), 'server', 'data')
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true })
  }
  return join(dataDir, `${key}.json`)
}

interface CacheEntry {
  data: any
  timestamp: number
}

export function readCache(key: string): any | null {
  const mem = memoryCache.get(key)
  if (mem && Date.now() - mem.timestamp < CACHE_TTL_MS) {
    return mem.data
  }

  try {
    const filePath = getCacheFilePath(key)
    if (!existsSync(filePath)) return null
    const raw = readFileSync(filePath, 'utf-8')
    const entry: CacheEntry = JSON.parse(raw)
    if (Date.now() - entry.timestamp < CACHE_TTL_MS) {
      memoryCache.set(key, entry)
      return entry.data
    }
    return null
  } catch {
    return null
  }
}

export function writeCache(key: string, data: any): void {
  const entry: CacheEntry = { data, timestamp: Date.now() }
  memoryCache.set(key, entry)

  try {
    const filePath = getCacheFilePath(key)
    writeFileSync(filePath, JSON.stringify(entry, null, 2), 'utf-8')
  } catch (e) {
    console.warn('[Cache] Failed to write to disk:', e)
  }
}

export function isCacheStale(key: string): boolean {
  const mem = memoryCache.get(key)
  if (!mem) return true
  return Date.now() - mem.timestamp >= CACHE_TTL_MS
}
