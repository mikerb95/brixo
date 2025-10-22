import Link from 'next/link'

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex w-full max-w-[100rem] items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-brand hover:opacity-90">
          Brixo
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          <Link href="/taskers" className="rounded px-3 py-1.5 hover:bg-brand/10 hover:text-brand-dark">Explorar</Link>
          <Link href="/mapa" className="rounded border border-brand px-3 py-1.5 font-medium text-brand hover:bg-brand/10">Explorar mapa</Link>
          <Link href="/profesionales" className="rounded px-3 py-1.5 hover:bg-brand/10 hover:text-brand-dark">Ser Tasker</Link>
          <Link href="/login" className="flex items-center gap-2 rounded-full border border-gray-300 px-3 py-1.5 font-medium text-gray-700 hover:border-brand hover:text-brand">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-3.314 0-6 1.79-6 4v1h12v-1c0-2.21-2.686-4-6-4Z"
              />
            </svg>
            Iniciar sesión
          </Link>
          <Link href="/contratar" className="rounded bg-brand px-3 py-1.5 font-medium text-white shadow-sm hover:bg-brand-dark">Publicar tarea</Link>
        </nav>
      </div>
    </header>
  )
}
