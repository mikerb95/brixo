export default function ProfesionalesPage() {
  return (
    <div className="max-w-xl">
      <h1 className="mb-2 text-2xl font-bold">Ofrece tus servicios</h1>
      <p className="mb-6 text-gray-700">Completa el formulario para publicar tu perfil y comenzar a recibir solicitudes.</p>

      <form action="/api/profesionales" method="post" className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Nombre o empresa</label>
          <input name="name" required className="w-full rounded border px-3 py-2" placeholder="Ej. Carpintería Los Robles" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Categorías</label>
          <input name="categories" className="w-full rounded border px-3 py-2" placeholder="Ej. carpinteria, pintura" />
          <p className="mt-1 text-xs text-gray-500">Separadas por coma</p>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Descripción</label>
          <textarea name="bio" className="w-full rounded border px-3 py-2" rows={5} placeholder="Cuéntanos sobre tu experiencia"></textarea>
        </div>
        <button className="rounded bg-brand px-4 py-2 font-medium text-white hover:bg-brand-dark">Publicar</button>
      </form>
    </div>
  )
}
