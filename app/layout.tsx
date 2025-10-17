import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Brixo',
  description: 'Servicios profesionales de construcción, reparaciones y refacciones',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="h-full bg-white">
      <body className={`${inter.variable} min-h-full font-sans text-gray-900 antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="container mx-auto flex-1 px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
