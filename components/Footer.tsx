export function Footer() {
  return (
    <footer className="border-t bg-white py-10 text-sm text-gray-600">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-center sm:text-left">© {new Date().getFullYear()} Brixo. Todos los derechos reservados.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-brand-dark">Términos</a>
          <a href="#" className="hover:text-brand-dark">Privacidad</a>
          <a href="#" className="hover:text-brand-dark">Contacto</a>
        </div>
      </div>
    </footer>
  )
}
