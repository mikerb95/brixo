import Link from 'next/link'
import Image from 'next/image'
import { categories, taskers } from '@/lib/data'
import hero2 from '../src/images/hero2.jpg'

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="relative isolate min-h-[70vh] md:min-h-[80vh] overflow-hidden rounded-2xl">
        {/* Fondo: imagen hero2 + overlay */}
        <Image
          src={hero2}
          alt="Profesionales de construcción, carpintería y plomería"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

        {/* Contenido superpuesto */}
        <div className="relative z-10 p-8 sm:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="max-w-2xl text-white">
              <h1 className="mb-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Profesionales confiables, cuando los necesitas</h1>
              <p className="mb-6 text-lg text-white/90">Reserva por horas a expertos en obra, carpintería, plomería y más. Publica tu necesidad o reserva de inmediato.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/taskers" className="rounded bg-brand px-5 py-2.5 font-medium text-white shadow-md hover:bg-brand-dark">Explorar Taskers</Link>
                <Link href="/contratar" className="rounded border border-white/30 px-5 py-2.5 font-medium text-white hover:bg-white/10">Publicar tarea</Link>
                <Link href="/profesionales" className="rounded px-5 py-2.5 font-medium text-white hover:bg-white/10">Ser Tasker</Link>
              </div>
            </div>

            <div className="rounded-xl border border-white/20 bg-white/10 p-6 text-white shadow-sm backdrop-blur">
              <h2 className="mb-4 font-semibold">Categorías populares</h2>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link className="block rounded border border-white/30 px-3 py-2 hover:border-white hover:bg-white/10" href={`/taskers?cat=${c.slug}`}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="grid gap-6 rounded-2xl border bg-white p-8 shadow-sm md:grid-cols-3">
        {[{
          title: '1. Cuéntanos qué necesitas',
          desc: 'Elige una categoría o publica tu tarea con los detalles, ubicación y horario.',
        }, {
          title: '2. Elige a tu profesional',
          desc: 'Compara perfiles, tarifas por hora y calificaciones para tomar la mejor decisión.',
        }, {
          title: '3. Reserva y paga seguro',
          desc: 'Confirma la fecha y duración; completa el pago en nuestro checkout demo.',
        }].map((s, i) => (
          <div key={i} className="rounded-lg border p-5">
            <h3 className="mb-1 text-lg font-semibold">{s.title}</h3>
            <p className="text-sm text-gray-600">{s.desc}</p>
          </div>
        ))}
      </section>

      {/* Categorías destacadas */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold">Categorías destacadas</h2>
          <Link className="text-sm text-brand hover:underline" href="/taskers">Ver todas</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {categories.slice(0, 6).map((c) => (
            <div key={c.slug} className="rounded-xl border p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">{c.name}</h3>
              <p className="mb-4 text-sm text-gray-600">{c.description}</p>
              <Link href={`/taskers?cat=${c.slug}`} className="text-brand hover:underline">Ver profesionales</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Taskers destacados */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold">Taskers destacados</h2>
          <Link className="text-sm text-brand hover:underline" href="/taskers">Explorar</Link>
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {taskers.slice(0,3).map(t => (
            <li key={t.id} className="rounded-xl border p-6 shadow-sm">
              <h3 className="mb-1 text-lg font-semibold">{t.name}</h3>
              <p className="mb-2 text-sm text-gray-600">{t.bio}</p>
              <p className="mb-4 text-sm text-gray-700">Tarifa: <span className="font-medium">{'$' + t.hourlyRate.toLocaleString('es-CO')}/h</span> · ⭐ {t.rating}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{t.city}</span>
                <Link href={`/taskers/${t.id}`} className="rounded bg-brand px-3 py-1.5 text-white hover:bg-brand-dark">Ver perfil</Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Testimonios */}
      <section className="rounded-2xl border bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold">Lo que dicen nuestros clientes</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[{
            quote: 'Encontré un carpintero excelente y rápido. Todo quedó perfecto.',
            author: 'Laura M.'
          }, {
            quote: 'Reservé una pintora y en un día mi sala quedó como nueva.',
            author: 'Carlos R.'
          }, {
            quote: 'Súper práctico poder ver tarifas y calificaciones antes de reservar.',
            author: 'Ana P.'
          }].map((t, i) => (
            <figure key={i} className="rounded-lg border p-5">
              <blockquote className="mb-2 text-sm text-gray-700">“{t.quote}”</blockquote>
              <figcaption className="text-xs text-gray-500">— {t.author}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ / CTA final */}
      <section className="grid gap-8 md:grid-cols-3">
        <div className="rounded-2xl border p-6 shadow-sm md:col-span-2">
          <h2 className="mb-4 text-2xl font-bold">Preguntas frecuentes</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <p className="font-medium">¿Cómo se calcula el precio?</p>
              <p className="text-gray-600">Según la tarifa por hora del profesional y la duración estimada de la tarea.</p>
            </li>
            <li>
              <p className="font-medium">¿Puedo cancelar?</p>
              <p className="text-gray-600">Sí, desde la página de pago demo puedes simular cancelación y volver a reservar.</p>
            </li>
            <li>
              <p className="font-medium">¿Cómo se valida a los profesionales?</p>
              <p className="text-gray-600">Revisamos perfiles y calificaciones; próximamente verificaciones adicionales.</p>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border p-6 text-center shadow-sm">
          <h3 className="mb-2 text-lg font-semibold">¿Listo para empezar?</h3>
          <p className="mb-4 text-sm text-gray-600">Publica tu tarea en minutos o explora profesionales disponibles.</p>
          <div className="flex flex-col gap-3">
            <Link href="/contratar" className="rounded bg-brand px-4 py-2 font-medium text-white hover:bg-brand-dark">Publicar tarea</Link>
            <Link href="/taskers" className="rounded border px-4 py-2 font-medium hover:border-brand hover:text-brand">Explorar Taskers</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
