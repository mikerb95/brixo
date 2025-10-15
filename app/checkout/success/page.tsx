import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-2xl font-bold text-emerald-700">Pago exitoso</h1>
      <p className="text-gray-700">Hemos recibido tu pago. En breve el profesional se pondrá en contacto contigo.</p>
      <Link href="/servicios" className="text-brand hover:underline">Volver a servicios</Link>
    </div>
  )
}
