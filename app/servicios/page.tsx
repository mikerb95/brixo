import Link from 'next/link'
import { services, categories } from '@/lib/data'

export default function ServiciosPage({ searchParams }: { searchParams: { cat?: string } }) {
  const filtered = searchParams?.cat ? services.filter(s => s.category === searchParams.cat) : services
  const active = searchParams?.cat

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-2xl font-bold">Servicios</h1>
        <p className="text-gray-600">Explora ofertas de profesionales por categoría.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link href="/servicios" className={`rounded border px-3 py-1.5 ${!active ? 'bg-brand text-white border-brand' : 'hover:border-brand hover:text-brand'}`}>Todas</Link>
        {categories.map(c => (
          <Link key={c.slug} href={`/servicios?cat=${c.slug}`} className={`rounded border px-3 py-1.5 ${active===c.slug ? 'bg-brand text-white border-brand' : 'hover:border-brand hover:text-brand'}`}>
            {c.name}
          </Link>
        ))}
      </div>

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(s => (
          <li key={s.id} className="rounded-lg border p-5 shadow-sm">
            <h3 className="mb-1 text-lg font-semibold">{s.title}</h3>
            <p className="mb-2 text-sm text-gray-600">{s.description}</p>
            <p className="mb-4 text-sm text-gray-700">Proveedor: <span className="font-medium">{s.pro.name}</span> · ⭐ {s.pro.rating}</p>
            <div className="flex items-center justify-between">
              <span className="text-base font-bold">{'$' + s.price.toLocaleString("es-CO")}</span>
              <Link href={`/servicios/${s.id}`} className="rounded bg-brand px-3 py-1.5 text-white hover:bg-brand-dark">Ver</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
