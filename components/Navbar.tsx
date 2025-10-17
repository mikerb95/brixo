import Link from 'next/link'

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-brand hover:opacity-90">
          Brixo
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          <Link href="/taskers" className="rounded px-3 py-1.5 hover:bg-brand/10 hover:text-brand-dark">Explorar</Link>
          <Link href="/profesionales" className="rounded px-3 py-1.5 hover:bg-brand/10 hover:text-brand-dark">Ser Tasker</Link>
          <Link href="/contratar" className="rounded bg-brand px-3 py-1.5 font-medium text-white shadow-sm hover:bg-brand-dark">Publicar tarea</Link>
        </nav>
      </div>
    </header>
  )
}
