import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl py-24 sm:py-32 text-center">
      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-8 w-8 text-emerald-600"
          aria-hidden="true"
        >
          <path d="M11.47 3.84a.75.75 0 0 1 1.06 0l7.63 7.63a2.25 2.25 0 0 1 0 3.18l-4.75 4.75a2.25 2.25 0 0 1-3.18 0l-7.63-7.63a.75.75 0 0 1 0-1.06l6.87-6.87Zm3.53 6.72a.75.75 0 0 0-1.06-1.06l-1.47 1.47-1.47-1.47a.75.75 0 1 0-1.06 1.06l1.47 1.47-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 1 0 1.06-1.06l-1.47-1.47 1.47-1.47Z" />
        </svg>
      </div>
      <p className="text-sm font-semibold text-emerald-600">Error 404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Página no encontrada
      </h1>
      <p className="mt-4 text-base leading-7 text-gray-600">
        La página que estás buscando no existe o fue movida. Quizás quieras volver al inicio, explorar Taskers o publicar una nueva tarea.
      </p>
      <div className="mt-10 flex items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          Volver al inicio
        </Link>
        <Link
          href="/taskers"
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
        >
          Explorar Taskers
        </Link>
        <Link
          href="/contratar"
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
        >
          Publicar tarea
        </Link>
      </div>
      <p className="mt-6 text-xs text-gray-500">Brixo · servicios confiables y cercanos</p>
    </div>
  )
}
