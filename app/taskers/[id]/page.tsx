import Link from 'next/link'
import { notFound } from 'next/navigation'
import { taskers, categories } from '@/lib/data'

export default function TaskerProfile({ params }: { params: { id: string } }) {
  const t = taskers.find(x => x.id === params.id)
  if (!t) return notFound()
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold">{t.name}</h1>
        <p className="text-gray-700">{t.bio}</p>
        <div className="text-sm text-gray-600">
          <p>Habilidades: {t.skills.map(s => categories.find(c => c.slug===s)?.name || s).join(', ')}</p>
          <p>Ciudad: {t.city || '—'}</p>
        </div>
      </div>
      <aside className="space-y-4 rounded border p-5">
        <div>
          <p className="text-sm text-gray-600">Tarifa</p>
          <p className="text-2xl font-bold">{'$' + t.hourlyRate.toLocaleString("es-CO")}/h</p>
          <p className="text-sm">⭐ {t.rating}</p>
        </div>
        <Link href={`/reservar/${t.id}`} className="block rounded bg-brand px-4 py-2 text-center font-medium text-white hover:bg-brand-dark">Reservar</Link>
      </aside>
    </div>
  )
}
