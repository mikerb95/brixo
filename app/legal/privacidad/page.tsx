export const metadata = { title: 'Política de Privacidad - Brixo' }

export default function PrivacyPage() {
  return (
    <div className="prose prose-sm max-w-3xl">
      <h1>Política de Privacidad</h1>
      <p>
        En Brixo cuidamos tu información personal. Esta política describe qué datos recopilamos y cómo los usamos.
      </p>
      <h2>Datos que recopilamos</h2>
      <ul>
        <li>Datos de cuenta y contacto (nombre, correo, teléfono)</li>
        <li>Datos de uso de la plataforma</li>
        <li>Datos de pago (a través de terceros en producción)</li>
      </ul>
      <h2>Finalidades</h2>
      <p>
        Prestación del servicio, comunicación con usuarios, seguridad y mejora de la plataforma.
      </p>
      <h2>Terceros</h2>
      <p>
        Podremos compartir datos con proveedores de pago y analítica bajo términos de confidencialidad.
      </p>
      <h2>Derechos</h2>
      <p>
        Puedes solicitar acceso, rectificación o eliminación de tus datos escribiéndonos a soporte.
      </p>
      <p className="text-xs text-gray-500">Última actualización: {new Date().toLocaleDateString('es-CO')}</p>
    </div>
  )
}
