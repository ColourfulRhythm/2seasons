"use client"

import { Globe } from "@/components/ui/cobe-globe"
import { MapPin, Users } from "lucide-react"
import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"

const KOBAPE: [number, number] = [7.2046, 3.4183]

const VISITOR_ID_KEY = "2s-visitor-id"

type LiveVisitor = {
  id: string
  location: [number, number]
  label: string
}

type LivePayload = {
  visitors: LiveVisitor[]
  arcLimit: number
  updatedAt: number
}

function useStableVisitorId(): string | null {
  const [id, setId] = useState<string | null>(null)
  useEffect(() => {
    let v = sessionStorage.getItem(VISITOR_ID_KEY)
    if (!v) {
      v = crypto.randomUUID()
      sessionStorage.setItem(VISITOR_ID_KEY, v)
    }
    setId(v)
  }, [])
  return id
}

async function registerPresence(visitorId: string): Promise<boolean> {
  const tryPost = async (extra: Record<string, unknown> = {}) => {
    const res = await fetch("/api/visitors/presence", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitorId, ...extra }),
    })
    return res
  }

  let res = await tryPost()
  if (res.status === 422) {
    try {
      const ipRes = await fetch("https://api.ipify.org?format=json")
      const { ip } = (await ipRes.json()) as { ip?: string }
      if (ip) res = await tryPost({ publicIp: ip })
    } catch {
      /* ignore */
    }
  }
  return res.ok
}

export default function CurrentVisitorsPage() {
  const visitorId = useStableVisitorId()
  const [live, setLive] = useState<LivePayload | null>(null)
  const [presenceOk, setPresenceOk] = useState(false)
  const [presenceChecked, setPresenceChecked] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  const refreshLive = useCallback(async () => {
    try {
      const res = await fetch("/api/visitors/live", { cache: "no-store" })
      if (!res.ok) throw new Error("live_failed")
      const data = (await res.json()) as LivePayload
      setLive(data)
      setLoadError(null)
    } catch {
      setLoadError("Could not load visitor map.")
    }
  }, [])

  useEffect(() => {
    if (!visitorId) return

    let cancelled = false

    const ping = async () => {
      const ok = await registerPresence(visitorId)
      if (!cancelled) {
        setPresenceOk(ok)
        setPresenceChecked(true)
      }
      await refreshLive()
    }

    void ping()
    const presenceIv = setInterval(() => void ping(), 45_000)
    const liveIv = setInterval(() => void refreshLive(), 15_000)

    return () => {
      cancelled = true
      clearInterval(presenceIv)
      clearInterval(liveIv)
    }
  }, [visitorId, refreshLive])

  // Stable empty-array ref when live is null — otherwise `?? []` is a new [] each render and the
  // Globe effect (depends on markers) would tear down WebGL every frame, so the map never appears.
  const markers = useMemo(() => live?.visitors ?? [], [live])

  const arcs = useMemo(() => {
    if (!live?.visitors.length) return []
    const limit = live.arcLimit ?? 10
    return live.visitors.slice(0, limit).map((v, i) => ({
      id: `kobape-${v.id}-${i}`,
      from: KOBAPE,
      to: v.location,
      label: `Kobape → ${v.label.split(",")[0]?.trim() || "visitor"}`,
    }))
  }, [live])

  const activeCount = markers.length

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f4f0] to-white">
      <header className="border-b border-[#61300D]/10 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold text-[#61300D]">
            2 Seasons
          </Link>
          <Link
            href="/"
            className="text-sm text-[#61300D]/80 hover:text-[#61300D] transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#61300D]/10 text-[#61300D] text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            Live visitor map
            {live && (
              <span className="text-[#61300D]/70 font-normal">
                · {activeCount} active{activeCount === 1 ? "" : "s"}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#61300D] mb-3">
            Current Visitors
          </h1>
          <p className="text-lg text-[#61300D]/70">
            See where our visitors are connecting from around the world
          </p>
          {loadError && (
            <p className="mt-3 text-sm text-red-600/90" role="alert">
              {loadError}
            </p>
          )}
          {presenceChecked && !presenceOk && visitorId && !loadError && (
            <p className="mt-3 text-sm text-[#61300D]/60">
              Your location could not be placed on the map (privacy network or missing geo). Others may
              still appear.
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          <div className="w-full max-w-md lg:max-w-lg flex-shrink-0">
            <Globe
              markers={markers}
              arcs={arcs}
              markerColor={[0.38, 0.19, 0.05]}
              baseColor={[0.96, 0.94, 0.93]}
              arcColor={[0.9, 0.53, 0.27]}
              glowColor={[0.38, 0.19, 0.05]}
              dark={0.1}
              mapBrightness={8}
              markerSize={0.03}
              markerElevation={0.015}
              arcWidth={0.6}
              arcHeight={0.2}
              speed={0.002}
            />
          </div>

          <div className="flex-1 max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-lg border border-[#61300D]/10 p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-[#61300D] mb-4">
                <MapPin className="w-5 h-5" />
                Visitor locations
              </h2>
              {markers.length === 0 ? (
                <p className="text-sm text-[#61300D]/60 py-4">
                  {live === null
                    ? "Loading live visitors…"
                    : "No visitors in the last few minutes. Open this page from another device or tab to see the map fill in."}
                </p>
              ) : (
                <ul className="space-y-3 max-h-64 overflow-y-auto">
                  {markers.map((m) => (
                    <li
                      key={m.id}
                      className="flex items-center gap-3 text-sm text-[#61300D]/80"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#E68946] shrink-0" />
                      <span>{m.label}</span>
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-4 text-xs text-[#61300D]/50">
                Arcs show connections from 2 Seasons (Kobape) to recent visitor locations (updates every
                ~15s)
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
