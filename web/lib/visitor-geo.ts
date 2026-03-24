/** Rough centroids when only a country code is available (Vercel often sends this without lat/lng). */
const COUNTRY_CENTROIDS: Record<string, [number, number]> = {
  NG: [9.082, 8.6753],
  US: [39.8283, -98.5795],
  GB: [55.3781, -3.436],
  FR: [46.2276, 2.2137],
  DE: [51.1657, 10.4515],
  IN: [20.5937, 78.9629],
  CN: [35.8617, 104.1954],
  BR: [-14.235, -51.9253],
  ZA: [-30.5595, 22.9375],
  KE: [-0.0236, 37.9062],
  GH: [7.9465, -1.0232],
  AE: [23.4241, 53.8478],
  EG: [26.8206, 30.8025],
  CA: [56.1304, -106.3468],
  AU: [-25.2744, 133.7751],
  JP: [36.2048, 138.2529],
}

export function getClientIp(get: (name: string) => string | null): string | null {
  const forwarded = get("x-forwarded-for")
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim()
    if (first && first !== "::1" && !first.startsWith("127.")) return first
  }
  const realIp = get("x-real-ip")
  if (realIp && realIp !== "::1" && !realIp.startsWith("127.")) return realIp.trim()
  return null
}

export function geoFromVercelHeaders(get: (name: string) => string | null): {
  lat: number
  lng: number
  city: string
  country: string
} | null {
  const lat = parseFloat(get("x-vercel-ip-latitude") || "")
  const lng = parseFloat(get("x-vercel-ip-longitude") || "")
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null
  return {
    lat,
    lng,
    city: get("x-vercel-ip-city") || "",
    country: get("x-vercel-ip-country") || "",
  }
}

export async function geoFromIpLookup(ip: string | null): Promise<{
  lat: number
  lng: number
  city: string
  country: string
} | null> {
  if (!ip) return null
  try {
    const res = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,lat,lon,city,countryCode`,
      { cache: "no-store" }
    )
    const data = (await res.json()) as {
      status?: string
      lat?: number
      lon?: number
      city?: string
      countryCode?: string
    }
    const lat = data.lat
    const lon = data.lon
    if (
      data.status !== "success" ||
      lat === undefined ||
      lon === undefined ||
      !Number.isFinite(lat) ||
      !Number.isFinite(lon)
    ) {
      return null
    }
    return {
      lat,
      lng: lon,
      city: data.city || "",
      country: data.countryCode || "",
    }
  } catch {
    return null
  }
}

export function labelFromGeo(city: string, country: string): string {
  if (city && country) return `${city}, ${country}`
  if (city) return city
  if (country) return country
  return "Visitor"
}

export function geoFromCountryCode(code: string): [number, number] | null {
  const upper = code.toUpperCase()
  return COUNTRY_CENTROIDS[upper] ?? null
}
