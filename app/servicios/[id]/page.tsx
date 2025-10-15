import Link from 'next/link'
import { notFound } from 'next/navigation'
import { services } from '@/lib/data'

export default function ServicioDetalle({ params }: { params: { id: string } }) {
  const service = services.find(s => s.id === params.id)
  if (!service) return notFound()

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <h1 className="mb-2 text-2xl font-bold">{service.title}</h1>
        <p className="mb-4 text-gray-700">{service.description}</p>
        <div className="rounded border p-4 text-sm">
          <p className="mb-1">Proveedor: <span className="font-medium">{service.pro.name}</span></p>
          <p>Calificación: ⭐ {service.pro.rating}</p>
        </div>
      </div>
      <aside className="space-y-4 rounded border p-5">
        <div>
          <p className="text-sm text-gray-600">Precio</p>
          <p className="text-2xl font-bold">{'$' + service.price.toLocaleString("es-CO")}</p>
        </div>
        <Link href={`/checkout?service=${service.id}`} className="block rounded bg-brand px-4 py-2 text-center font-medium text-white hover:bg-brand-dark">Contratar ahora</Link>
      </aside>
    </div>
  )
}
