import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-white-100 text-sm text-gray-700 backdrop-blur supports-[backdrop-filter]:bg-gray/50 supports-[backdrop-filter]:backdrop-blur">
      <div className="container mx-auto grid gap-10 px-4 py-12 sm:grid-cols-2 md:grid-cols-4 sm:px-6 lg:px-8">
        <div>
          <h4 className="mb-3 text-base font-semibold text-gray-900">Categorías</h4>
          <ul className="space-y-2">
            <li><Link className="hover:text-brand-dark" href="/taskers?cat=obra">Obra</Link></li>
            <li><Link className="hover:text-brand-dark" href="/taskers?cat=carpinteria">Carpintería</Link></li>
            <li><Link className="hover:text-brand-dark" href="/taskers?cat=plomeria">Plomería</Link></li>
            <li><Link className="hover:text-brand-dark" href="/taskers?cat=electricidad">Electricidad</Link></li>
            <li><Link className="hover:text-brand-dark" href="/taskers?cat=pintura">Pintura</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-base font-semibold text-gray-900">Descubrir</h4>
          <ul className="space-y-2">
            <li><Link className="hover:text-brand-dark" href="/taskers">Explorar profesionales</Link></li>
            <li><Link className="hover:text-brand-dark" href="/contratar">Publicar tarea</Link></li>
            <li><Link className="hover:text-brand-dark" href="/profesionales">Ser Tasker</Link></li>
            <li><Link className="hover:text-brand-dark" href="/servicios">Servicios predefinidos</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-base font-semibold text-gray-900">Soporte</h4>
          <ul className="space-y-2">
            <li><Link className="hover:text-brand-dark" href="/faq">Preguntas frecuentes</Link></li>
            <li><Link className="hover:text-brand-dark" href="/contacto">Contacto</Link></li>
            <li><Link className="hover:text-brand-dark" href="/checkout">Pagos (demo)</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-base font-semibold text-gray-900">Empresa</h4>
          <ul className="space-y-2">
            <li><Link className="hover:text-brand-dark" href="/about">Acerca de</Link></li>
            <li><Link className="hover:text-brand-dark" href="/legal">Términos</Link></li>
            <li><Link className="hover:text-brand-dark" href="/legal/privacidad">Privacidad</Link></li>
            <li><Link className="hover:text-brand-dark" href="/legal/limitaciones">Limitaciones de responsabilidad</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-6">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-center text-xs text-gray-500 sm:text-left">© {new Date().getFullYear()} Brixo</p>
          <div className="flex items-center gap-4 text-xs">
            <Link className="hover:text-brand-dark" href="/legal">Términos</Link>
            <Link className="hover:text-brand-dark" href="/legal/privacidad">Privacidad</Link>
            <Link className="hover:text-brand-dark" href="/legal/limitaciones">Limitaciones</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
