import Link from 'next/link'
import Image from 'next/image'
import { taskers, categories } from '@/lib/data'
import workers from '../../src/images/workers.jpg'

export default function TaskersPage({ searchParams }: { searchParams: { cat?: string } }) {
  const active = searchParams?.cat
  const filtered = active ? taskers.filter(t => t.skills.includes(active)) : taskers

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-2xl font-bold">Explora profesionales</h1>
        <p className="text-gray-600">Filtra por categoría para encontrar el profesional ideal.</p>
      </div>

      <div className="relative hidden overflow-hidden rounded-2xl border border-white/20 bg-gray-900 lg:block">
        <div className="relative h-60">
          <Image
            src={workers}
            alt="Equipo de profesionales trabajando"
            fill
            sizes="100vw"
            className="object-cover"
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
          <div className="relative z-10 flex h-full items-center px-10 py-8">
            <div className="max-w-xl text-white">
              <h2 className="text-2xl font-semibold">Necesitas un equipo completo para tu obra</h2>
              <p className="mt-2 text-white/90">Conecta con cuadrillas especializadas y alquila herramientas de gran formato en una sola gestión.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link href="/taskers" className={`rounded border px-3 py-1.5 ${!active ? 'bg-brand text-white border-brand' : 'hover:border-brand hover:text-brand'}`}>Todas</Link>
        {categories.map(c => (
          <Link key={c.slug} href={`/taskers?cat=${c.slug}`} className={`rounded border px-3 py-1.5 ${active===c.slug ? 'bg-brand text-white border-brand' : 'hover:border-brand hover:text-brand'}`}>
            {c.name}
          </Link>
        ))}
      </div>

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(t => (
          <li key={t.id} className="rounded-lg border p-5 shadow-sm">
            <h3 className="mb-1 text-lg font-semibold">{t.name}</h3>
            <p className="mb-2 text-sm text-gray-600">{t.bio}</p>
            <p className="mb-4 text-sm text-gray-700">Tarifa: <span className="font-medium">{'$' + t.hourlyRate.toLocaleString("es-CO")}/h</span> · ⭐ {t.rating}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{t.city}</span>
              <Link href={`/taskers/${t.id}`} className="rounded bg-brand px-3 py-1.5 text-white hover:bg-brand-dark">Ver perfil</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
