'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { taskers } from '@/lib/data'

export default function ReservarPage() {
  const params = useParams()
  const router = useRouter()
  const tasker = taskers.find(t => t.id === String(params.taskerId))
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [hours, setHours] = useState(2)
  const [address, setAddress] = useState('')
  if (!tasker) return <div>Profesional no encontrado.</div>

  const total = tasker.hourlyRate * hours + 0 // fee demo = 0 por ahora

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/reservas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskerId: tasker.id, date, startTime: time, hours, address, total })
    })
    const data = await res.json()
    if (data?.ok && data?.reservation?.id) {
      // redirigir al checkout demo con total (o con id de reserva)
      router.push(`/checkout?service=${data.reservation.id}`)
    }
  }

  return (
    <div className="max-w-md space-y-6">
      <h1 className="text-2xl font-bold">Reservar aaaaaaa {tasker.name}</h1>
      <form className="space-y-4" onSubmit={submit}>
        <div>
          <label className="mb-1 block text-sm font-medium">Fecha</label>
          <input type="date" required className="w-full rounded border px-3 py-2" value={date} onChange={e=>setDate(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Hora de inicio</label>
          <input type="time" required className="w-full rounded border px-3 py-2" value={time} onChange={e=>setTime(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Duración (horas)</label>
          <input type="number" min={1} className="w-full rounded border px-3 py-2" value={hours} onChange={e=>setHours(Number(e.target.value)||1)} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Dirección</label>
          <input className="w-full rounded border px-3 py-2" value={address} onChange={e=>setAddress(e.target.value)} placeholder="Calle 123 #45-67" />
        </div>
        <div className="rounded border p-4">
          <p className="mb-2 text-sm text-gray-600">Total estimado</p>
          <p className="text-3xl font-extrabold">{'$' + total.toLocaleString('es-CO')}</p>
        </div>
        <button className="rounded bg-brand px-4 py-2 font-medium text-white hover:bg-brand-dark">Continuar al pago</button>
      </form>
    </div>
  )
}
