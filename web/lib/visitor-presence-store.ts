import { Redis } from "@upstash/redis"

export type StoredVisitor = {
  id: string
  lat: number
  lng: number
  label: string
  lastSeen: number
}

const ACTIVE_MS = 3 * 60 * 1000
const ZKEY = "2s:visitor_ts"
const HKEY = "2s:visitor_meta"

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  return new Redis({ url, token })
}

declare global {
  // eslint-disable-next-line no-var
  var __2sVisitorMem: Map<string, { lat: number; lng: number; label: string; ts: number }> | undefined
}

function memStore() {
  if (!globalThis.__2sVisitorMem) globalThis.__2sVisitorMem = new Map()
  return globalThis.__2sVisitorMem
}

export async function recordVisitorPresence(
  id: string,
  lat: number,
  lng: number,
  label: string
): Promise<void> {
  const now = Date.now()
  const r = getRedis()
  if (r) {
    await r.zadd(ZKEY, { score: now, member: id })
    await r.hset(HKEY, { [id]: JSON.stringify({ lat, lng, label, lastSeen: now }) })
    await r.zremrangebyscore(ZKEY, 0, now - ACTIVE_MS - 1)
    return
  }
  const m = memStore()
  m.set(id, { lat, lng, label, ts: now })
  for (const [k, v] of m) {
    if (now - v.ts > ACTIVE_MS) m.delete(k)
  }
}

export async function listActiveVisitors(): Promise<StoredVisitor[]> {
  const now = Date.now()
  const cutoff = now - ACTIVE_MS
  const r = getRedis()
  if (r) {
    await r.zremrangebyscore(ZKEY, 0, cutoff - 1)
    const ids = await r.zrange<string[]>(ZKEY, cutoff, "+inf", { byScore: true })
    if (!ids.length) return []
    const raw = await r.hmget<Record<string, string | null>>(HKEY, ...(ids as [string, ...string[]]))
    if (!raw) return []
    const out: StoredVisitor[] = []
    for (const id of ids) {
      const json = raw[id]
      if (!json) continue
      try {
        const p = JSON.parse(json) as { lat: number; lng: number; label: string; lastSeen: number }
        if (Number.isFinite(p.lat) && Number.isFinite(p.lng)) {
          out.push({ id, lat: p.lat, lng: p.lng, label: p.label, lastSeen: p.lastSeen })
        }
      } catch {
        /* skip */
      }
    }
    out.sort((a, b) => b.lastSeen - a.lastSeen)
    return out
  }
  const m = memStore()
  const out: StoredVisitor[] = []
  for (const [id, v] of m) {
    if (now - v.ts <= ACTIVE_MS) {
      out.push({ id, lat: v.lat, lng: v.lng, label: v.label, lastSeen: v.ts })
    } else {
      m.delete(id)
    }
  }
  out.sort((a, b) => b.lastSeen - a.lastSeen)
  return out
}
