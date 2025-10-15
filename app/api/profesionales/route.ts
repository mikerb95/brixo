import { NextRequest, NextResponse } from 'next/server'

type Pro = {
  id: string
  name: string
  categories: string[]
  bio: string
  createdAt: string
}

// In-memory store for demo only
const pros: Pro[] = []

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const payload = {
    id: `pro-${Date.now()}`,
    name: (form.get('name') || '').toString(),
    categories: (form.get('categories') || '').toString().split(',').map(s => s.trim()).filter(Boolean),
    bio: (form.get('bio') || '').toString(),
    createdAt: new Date().toISOString(),
  }
  pros.push(payload)
  return NextResponse.json({ ok: true, pro: payload })
}

export async function GET() {
  return NextResponse.json({ ok: true, data: pros })
}
