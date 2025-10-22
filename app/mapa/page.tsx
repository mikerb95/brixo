import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const MapView = dynamic(() => import('@/components/map/MapView'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[calc(100vh-160px)] items-center justify-center">
      <p className="text-sm text-gray-500">Cargando mapa de servicios…</p>
    </div>
  ),
})

export const metadata: Metadata = {
  title: 'Mapa de servicios - Brixo',
  description: 'Explora taskers y servicios disponibles en Bogotá directamente en el mapa.',
}

export default function MapPage() {
  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      <div className="h-[calc(100vh-160px)] min-h-[520px] w-full">
        <MapView />
      </div>
    </div>
  )
}
