'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import L, { type LatLngBounds } from 'leaflet'
import 'leaflet/dist/leaflet.css'

const bogotaCenter: [number, number] = [4.711, -74.0721]

const servicePoints = [
  {
    id: 'map-srv-001',
    title: 'Cuadrilla para remodelación liviana',
    category: 'obra',
    hourlyRate: 85000,
    rating: 4.8,
    lat: 4.7195,
    lng: -74.0361,
    address: 'Chapinero, Bogotá',
  },
  {
    id: 'map-srv-002',
    title: 'Electricista de emergencia 24/7',
    category: 'electricidad',
    hourlyRate: 95000,
    rating: 4.9,
    lat: 4.6765,
    lng: -74.0486,
    address: 'Teusaquillo, Bogotá',
  },
  {
    id: 'map-srv-003',
    title: 'Carpintero para closets a medida',
    category: 'carpinteria',
    hourlyRate: 78000,
    rating: 4.7,
    lat: 4.7421,
    lng: -74.1,
    address: 'Suba, Bogotá',
  },
  {
    id: 'map-srv-004',
    title: 'Plomero certificado gas natural',
    category: 'plomeria',
    hourlyRate: 70000,
    rating: 4.6,
    lat: 4.5924,
    lng: -74.1079,
    address: 'Kennedy, Bogotá',
  },
  {
    id: 'map-srv-005',
    title: 'Pintura express apartamentos',
    category: 'pintura',
    hourlyRate: 68000,
    rating: 4.8,
    lat: 4.6594,
    lng: -74.0628,
    address: 'Barrios Unidos, Bogotá',
  },
]

const defaultIcon = L.icon({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
})

function MapView() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<L.Map | null>(null)
  const [visibleServices, setVisibleServices] = useState(servicePoints)

  const updateVisible = (bounds: LatLngBounds) => {
    setVisibleServices(
      servicePoints.filter((service) => bounds.contains([service.lat, service.lng]))
    )
  }

  const servicesMemo = useMemo(() => servicePoints, [])

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const mapInstance = L.map(containerRef.current, {
      center: bogotaCenter,
      zoom: 12,
      zoomControl: false,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(mapInstance)

    L.control.zoom({ position: 'bottomright' }).addTo(mapInstance)

    const markersGroup = L.layerGroup().addTo(mapInstance)
    servicesMemo.forEach((service) => {
      const marker = L.marker([service.lat, service.lng], { icon: defaultIcon })
        .bindPopup(
          `<div style="font-size: 0.9rem;">
            <strong>${service.title}</strong><br/>
            <span style="color:#555;">${service.address}</span><br/>
            <span style="color:#0ea5e9; font-weight:600;">$${service.hourlyRate.toLocaleString('es-CO')} / h</span><br/>
            <span style="font-size:0.75rem;color:#6b7280;">⭐ ${service.rating}</span>
          </div>`
        )
      marker.addTo(markersGroup)
    })

    const handleViewportChange = () => {
      updateVisible(mapInstance.getBounds())
    }

    mapInstance.whenReady(handleViewportChange)
    mapInstance.on('moveend', handleViewportChange)
    mapInstance.on('zoomend', handleViewportChange)

    mapRef.current = mapInstance
    return () => {
      mapInstance.off('moveend', handleViewportChange)
      mapInstance.off('zoomend', handleViewportChange)
      markersGroup.remove()
      mapInstance.remove()
      mapRef.current = null
    }
  }, [servicesMemo])

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full" />

      <div className="pointer-events-none absolute left-1/2 top-6 w-full max-w-md -translate-x-1/2 px-4">
        <div className="pointer-events-auto space-y-4 rounded-3xl bg-white/95 p-5 shadow-xl ring-1 ring-black/5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Servicios en esta zona</h2>
            <p className="text-xs text-gray-500">Se actualizan según el área visible del mapa.</p>
          </div>
          <div className="max-h-60 space-y-3 overflow-y-auto">
            {visibleServices.length > 0 ? (
              visibleServices.map((service) => (
                <div key={service.id} className="rounded-2xl border border-gray-100 bg-white/90 p-3 shadow-sm">
                  <p className="text-sm font-medium text-gray-900">{service.title}</p>
                  <p className="text-xs text-gray-500">{service.address}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
                    <span className="capitalize">{service.category}</span>
                    <span className="font-semibold text-brand">${service.hourlyRate.toLocaleString('es-CO')} / h</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-4 text-center text-xs text-gray-500">
                No hay taskers en el área visible. Ajusta el zoom o desplázate para explorar más.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export { MapView }
export default MapView
