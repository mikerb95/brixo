"use client"

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

function CheckoutClient() {
  const search = useSearchParams()
  const router = useRouter()
  const [sessionId, setSessionId] = useState<string>('')
  const [amount, setAmount] = useState<number>(0)
  const serviceId = search.get('service')

  useEffect(() => {
    const create = async () => {
      if (!serviceId) return
      const res = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId })
      })
      const data = await res.json()
      setSessionId(data.id)
      setAmount(data.amount)
    }
    create()
  }, [serviceId])

  const pay = async () => {
    if (!sessionId) return
    await fetch('/api/checkout/session', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: sessionId, status: 'paid' })
    })
    router.push(`/checkout/success?id=${sessionId}`)
  }

  const cancel = async () => {
    if (!sessionId) return
    await fetch('/api/checkout/session', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: sessionId, status: 'canceled' })
    })
    router.push(`/checkout/cancel?id=${sessionId}`)
  }

  return (
    <div className="max-w-md space-y-6">
      <h1 className="text-2xl font-bold">Checkout demo</h1>
      <p className="text-gray-700">Confirma el pago del servicio seleccionado.</p>
      <div className="rounded border p-4">
        <p className="mb-2 text-sm text-gray-600">Total a pagar</p>
        <p className="text-3xl font-extrabold">{'$' + amount.toLocaleString("es-CO")}</p>
      </div>
      <div className="flex gap-3">
        <button onClick={pay} disabled={!sessionId} className="rounded bg-emerald-600 px-4 py-2 font-medium text-white disabled:opacity-50">Pagar</button>
        <button onClick={cancel} disabled={!sessionId} className="rounded border px-4 py-2 font-medium hover:border-red-500 hover:text-red-600 disabled:opacity-50">Cancelar</button>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="max-w-md">Cargando checkout…</div>}>
      <CheckoutClient />
    </Suspense>
  )
}
