import Link from 'next/link'

export default function CancelPage() {
  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-2xl font-bold text-red-700">Pago cancelado</h1>
      <p className="text-gray-700">Tu pago fue cancelado. Puedes intentar nuevamente cuando estés listo.</p>
      <Link href="/servicios" className="text-brand hover:underline">Volver a servicios</Link>
    </div>
  )
}
