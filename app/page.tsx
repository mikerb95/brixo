import Link from 'next/link'
import { categories } from '@/lib/data'

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="rounded-lg bg-gradient-to-r from-brand/10 to-brand-light/20 p-8">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Encuentra profesionales para tus proyectos</h1>
            <p className="mb-6 text-lg text-gray-700">Obra, carpintería, plomería y más. Publica tu necesidad o contrata a un profesional verificado.</p>
            <div className="flex gap-3">
              <Link href="/contratar" className="rounded bg-brand px-4 py-2 font-medium text-white hover:bg-brand-dark">Contratar</Link>
              <Link href="/profesionales" className="rounded border border-brand px-4 py-2 font-medium text-brand hover:bg-brand/10">Ser profesional</Link>
            </div>
          </div>
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-semibold">Categorías populares</h2>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {categories.map((c) => (
                <li key={c.slug} className="">
                  <Link className="block rounded border px-3 py-2 hover:border-brand hover:text-brand" href={`/servicios?cat=${c.slug}`}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {categories.slice(0,3).map((c) => (
          <div key={c.slug} className="rounded-lg border p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold">{c.name}</h3>
            <p className="mb-4 text-sm text-gray-600">{c.description}</p>
            <Link href={`/servicios?cat=${c.slug}`} className="text-brand hover:underline">Ver servicios</Link>
          </div>
        ))}
      </section>
    </div>
  )
}
