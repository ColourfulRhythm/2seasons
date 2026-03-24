import { headers } from "next/headers"
import { NextResponse } from "next/server"
import {
  geoFromCountryCode,
  geoFromIpLookup,
  geoFromVercelHeaders,
  getClientIp,
  labelFromGeo,
} from "@/lib/visitor-geo"
import { recordVisitorPresence } from "@/lib/visitor-presence-store"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    visitorId?: string
    publicIp?: string
    lat?: number
    lng?: number
  }

  const visitorId =
    typeof body.visitorId === "string" && body.visitorId.length > 0
      ? body.visitorId
      : crypto.randomUUID()

  const h = await headers()
  const get = (name: string) => h.get(name)

  let lat: number | undefined
  let lng: number | undefined
  let city = ""
  let country = ""

  const vGeo = geoFromVercelHeaders(get)
  if (vGeo) {
    lat = vGeo.lat
    lng = vGeo.lng
    city = vGeo.city
    country = vGeo.country
  }

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    if (Number.isFinite(body.lat) && Number.isFinite(body.lng)) {
      lat = body.lat
      lng = body.lng
    }
  }

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    const ip = body.publicIp || getClientIp(get)
    const ipGeo = await geoFromIpLookup(ip)
    if (ipGeo) {
      lat = ipGeo.lat
      lng = ipGeo.lng
      city = ipGeo.city
      country = ipGeo.country
    }
  }

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    const cc = get("x-vercel-ip-country") || ""
    if (cc) {
      const centroid = geoFromCountryCode(cc)
      if (centroid) {
        lat = centroid[0]
        lng = centroid[1]
        country = cc
      }
    }
  }

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return NextResponse.json({ ok: false, visitorId, error: "no_geo" }, { status: 422 })
  }

  const label = labelFromGeo(city, country)
  await recordVisitorPresence(visitorId, lat!, lng!, label)

  return NextResponse.json({ ok: true, visitorId })
}
