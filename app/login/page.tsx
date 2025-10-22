'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Ingresa tu correo y contraseña para continuar.')
      return
    }

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (email === 'demo@brixo.com' && password === 'demo123') {
      router.push('/taskers')
      return
    }

    setError('Usuario no encontrado o contraseña incorrecta.')
    setLoading(false)
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center px-4 pb-16 pt-20 sm:px-6">
      <section className="space-y-6 rounded-3xl border bg-white p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold text-gray-900">Inicia sesión en Brixo</h1>
          <p className="text-sm text-gray-600">
            Usuarios y Taskers usan la misma cuenta. Accede para gestionar reservas, publicar tareas y más.
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5 flex-shrink-0"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-sm text-gray-900 shadow-sm transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
              placeholder="tu@correo.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-sm text-gray-900 shadow-sm transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <Link href="/recuperar" className="font-medium text-brand hover:text-brand-dark">
              ¿Olvidaste tu contraseña?
            </Link>
            <span>¿Nuevo en Brixo? <Link href="/profesionales" className="font-medium text-brand hover:text-brand-dark">Crea cuenta en minutos</Link></span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:bg-brand/70"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <div className="rounded-2xl border border-brand/20 bg-brand/5 px-4 py-3 text-xs text-brand-dark">
          Consejo: También puedes usar tu cuenta Brixo para alquilar herramientas o coordinar servicios en equipo.
        </div>
      </section>
    </main>
  )
}
