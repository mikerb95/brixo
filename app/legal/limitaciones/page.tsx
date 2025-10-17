export const metadata = { title: 'Limitaciones de Responsabilidad - Brixo' }

export default function LiabilityPage() {
  return (
    <div className="prose prose-sm max-w-3xl">
      <h1>Limitaciones de Responsabilidad</h1>
      <p>
        Brixo actúa como intermediario entre clientes y profesionales. No asumimos responsabilidad por la ejecución de los servicios acordados entre las partes.
      </p>
      <h2>Alcance</h2>
      <p>
        En ningún caso seremos responsables por daños indirectos, incidentales o consecuentes derivados del uso de la plataforma.
      </p>
      <h2>Contenido de terceros</h2>
      <p>
        Los perfiles y ofertas son responsabilidad de sus titulares. Realizamos esfuerzos razonables para moderar, sin garantizar exactitud total.
      </p>
      <h2>Fuerza mayor</h2>
      <p>
        No seremos responsables por incumplimientos causados por eventos fuera de nuestro control razonable.
      </p>
      <p className="text-xs text-gray-500">Última actualización: {new Date().toLocaleDateString('es-CO')}</p>
    </div>
  )
}
