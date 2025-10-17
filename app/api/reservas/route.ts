import { NextRequest, NextResponse } from 'next/server'
import { taskers, type Reservation } from '@/lib/data'

// in-memory reservations
const reservations: Reservation[] = []

export async function POST(req: NextRequest) {
  const body = await req.json()
  const tasker = taskers.find(t => t.id === body.taskerId)
  if (!tasker) return NextResponse.json({ error: 'Tasker no encontrado' }, { status: 404 })

  const reservation: Reservation = {
    id: `res-${Date.now()}`,
    taskerId: body.taskerId as string,
    date: body.date as string,
    startTime: body.startTime as string,
    hours: Number(body.hours || 1),
    address: (body.address || '').toString(),
    total: Number(body.total || 0),
    status: 'created' as const,
  }
  reservations.push(reservation)
  return NextResponse.json({ ok: true, reservation })
}

export async function GET() {
  return NextResponse.json({ ok: true, data: reservations })
}
