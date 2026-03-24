"use client"

import { Globe } from "@/components/ui/cobe-globe"
import { Users, MapPin } from "lucide-react"
import Link from "next/link"

const KOBAPE: [number, number] = [7.2046, 3.4183]

const visitorMarkers = [
  { id: "lagos", location: [6.5244, 3.3792] as [number, number], label: "Lagos, Nigeria" },
  { id: "abuja", location: [9.0765, 7.3986] as [number, number], label: "Abuja, Nigeria" },
  { id: "ibadan", location: [7.3775, 3.9470] as [number, number], label: "Ibadan, Nigeria" },
  { id: "accra", location: [5.6037, -0.1870] as [number, number], label: "Accra, Ghana" },
  { id: "nairobi", location: [-1.2921, 36.8219] as [number, number], label: "Nairobi, Kenya" },
  { id: "johannesburg", location: [-26.2041, 28.0473] as [number, number], label: "Johannesburg, South Africa" },
  { id: "london", location: [51.5074, -0.1278] as [number, number], label: "London, UK" },
  { id: "dubai", location: [25.2048, 55.2708] as [number, number], label: "Dubai, UAE" },
  { id: "newyork", location: [40.7128, -74.006] as [number, number], label: "New York, USA" },
  { id: "houston", location: [29.7604, -95.3698] as [number, number], label: "Houston, USA" },
  { id: "paris", location: [48.8566, 2.3522] as [number, number], label: "Paris, France" },
  { id: "cairo", location: [30.0444, 31.2357] as [number, number], label: "Cairo, Egypt" },
]

const visitorArcs = [
  { id: "kobape-lagos", from: KOBAPE, to: [6.5244, 3.3792] as [number, number], label: "Kobape → Lagos" },
  { id: "kobape-abuja", from: KOBAPE, to: [9.0765, 7.3986] as [number, number], label: "Kobape → Abuja" },
  { id: "kobape-london", from: KOBAPE, to: [51.5074, -0.1278] as [number, number], label: "Kobape → London" },
  { id: "kobape-dubai", from: KOBAPE, to: [25.2048, 55.2708] as [number, number], label: "Kobape → Dubai" },
  { id: "kobape-newyork", from: KOBAPE, to: [40.7128, -74.006] as [number, number], label: "Kobape → New York" },
]

export default function CurrentVisitorsPage() {
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
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#61300D] mb-3">
            Current Visitors
          </h1>
          <p className="text-lg text-[#61300D]/70">
            See where our visitors are connecting from around the world
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          <div className="w-full max-w-md lg:max-w-lg flex-shrink-0">
            <Globe
              markers={visitorMarkers}
              arcs={visitorArcs}
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

          <div className="flex-1 max-w-md">
            <div className="bg-white rounded-2xl shadow-lg border border-[#61300D]/10 p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-[#61300D] mb-4">
                <MapPin className="w-5 h-5" />
                Visitor locations
              </h2>
              <ul className="space-y-3 max-h-64 overflow-y-auto">
                {visitorMarkers.map((m) => (
                  <li
                    key={m.id}
                    className="flex items-center gap-3 text-sm text-[#61300D]/80"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#E68946] shrink-0" />
                    <span>{m.label}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-[#61300D]/50">
                Arcs show connections from 2 Seasons (Kobape) to visitor locations
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-[#61300D]/50 mt-8">
          Real-time visitor data would be connected via analytics (e.g. Vercel Analytics, Plausible)
        </p>
      </main>
    </div>
  )
}
