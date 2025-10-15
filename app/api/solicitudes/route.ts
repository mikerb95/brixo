import { NextRequest, NextResponse } from 'next/server'

type ClientRequest = {
  id: string
  title: string
  description: string
  budget: number
  createdAt: string
}

// In-memory store for demo only
const requests: ClientRequest[] = []

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const payload = {
    id: `req-${Date.now()}`,
    title: (form.get('title') || '').toString(),
    description: (form.get('description') || '').toString(),
    budget: Number(form.get('budget') || 0),
    createdAt: new Date().toISOString(),
  }
  requests.push(payload)
  return NextResponse.json({ ok: true, request: payload })
}

export async function GET() {
  return NextResponse.json({ ok: true, data: requests })
}
