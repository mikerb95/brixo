import Link from 'next/link'

export function Navbar() {
  return (
    <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold text-brand">
          Brixo
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/taskers" className="hover:text-brand-dark">Explorar</Link>
          <Link href="/profesionales" className="hover:text-brand-dark">Ser Tasker</Link>
          <Link href="/contratar" className="rounded bg-brand px-3 py-1.5 font-medium text-white hover:bg-brand-dark">Publicar tarea</Link>
        </nav>
      </div>
    </header>
  )
}
