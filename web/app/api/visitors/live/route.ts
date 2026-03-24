import { NextResponse } from "next/server"
import { listActiveVisitors } from "@/lib/visitor-presence-store"

export const dynamic = "force-dynamic"

const MAX_MARKERS = 40
const MAX_ARCS = 10

export async function GET() {
  const visitors = await listActiveVisitors()
  const sliced = visitors.slice(0, MAX_MARKERS)

  return NextResponse.json({
    visitors: sliced.map((v) => ({
      id: v.id.replace(/[^a-zA-Z0-9_-]/g, ""),
      location: [v.lat, v.lng] as [number, number],
      label: v.label,
    })),
    arcLimit: MAX_ARCS,
    updatedAt: Date.now(),
  })
}
