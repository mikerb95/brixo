export default function ContratarPage() {
  return (
    <div className="max-w-xl">
      <h1 className="mb-2 text-2xl font-bold">Publica tu necesidad</h1>
      <p className="mb-6 text-gray-700">Describe tu proyecto y recibe propuestas de profesionales.</p>

      <form action="/api/solicitudes" method="post" className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Título</label>
          <input name="title" required className="w-full rounded border px-3 py-2" placeholder="Ej. Reparación de fuga de agua" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Descripción</label>
          <textarea name="description" className="w-full rounded border px-3 py-2" rows={5} placeholder="Cuéntanos los detalles"></textarea>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Presupuesto estimado (COP)</label>
          <input name="budget" type="number" min="0" className="w-full rounded border px-3 py-2" />
        </div>
        <button className="rounded bg-brand px-4 py-2 font-medium text-white hover:bg-brand-dark">Publicar</button>
      </form>
    </div>
  )
}
