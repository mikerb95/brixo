import { NextRequest, NextResponse } from 'next/server'
import { services } from '@/lib/data'

// Demo payment sessions stored in-memory
const sessions = new Map<string, { id: string; serviceId: string; amount: number; status: 'created' | 'paid' | 'canceled' }>()

export async function POST(req: NextRequest) {
  const body = await req.json()
  const serviceId: string = body.serviceId
  const service = services.find(s => s.id === serviceId)
  if (!service) return NextResponse.json({ error: 'Servicio no encontrado' }, { status: 404 })

  const id = `sess_${Math.random().toString(36).slice(2)}`
  const session = { id, serviceId, amount: service.price, status: 'created' as const }
  sessions.set(id, session)

  return NextResponse.json({ id, amount: session.amount })
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id') || ''
  const session = sessions.get(id)
  if (!session) return NextResponse.json({ error: 'Sesión no encontrada' }, { status: 404 })
  return NextResponse.json(session)
}

export async function PATCH(req: NextRequest) {
  const body = await req.json()
  const id: string = body.id
  const status: 'paid' | 'canceled' = body.status
  const sess = sessions.get(id)
  if (!sess) return NextResponse.json({ error: 'Sesión no encontrada' }, { status: 404 })
  sess.status = status
  sessions.set(id, sess)
  return NextResponse.json(sess)
}
