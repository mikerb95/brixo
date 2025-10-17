export const metadata = { title: 'Términos y Condiciones - Brixo' }

export default function LegalPage() {
  return (
    <div className="prose prose-sm max-w-3xl">
      <h1>Términos y Condiciones</h1>
      <p>
        Bienvenido a Brixo. Estos términos regulan el uso de la plataforma. Al utilizarla, aceptas las condiciones aquí descritas.
      </p>
      <h2>Uso de la plataforma</h2>
      <p>
        Brixo conecta clientes con profesionales (Taskers). Los acuerdos de servicio se celebran directamente entre las partes.
      </p>
      <h2>Pagos</h2>
      <p>
        Para la demo, el proceso de pago es simulado. En producción, se aplicarán las condiciones de la pasarela integrada.
      </p>
      <h2>Conducta y contenido</h2>
      <p>
        No se permite contenido ilícito o que viole derechos de terceros. Nos reservamos el derecho de suspender cuentas por incumplimientos.
      </p>
      <h2>Modificaciones</h2>
      <p>
        Podemos actualizar estos términos en cualquier momento. La versión vigente se publicará en esta página.
      </p>
      <p className="text-xs text-gray-500">Última actualización: {new Date().toLocaleDateString('es-CO')}</p>
    </div>
  )
}
