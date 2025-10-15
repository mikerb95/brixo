export type Category = {
  slug: string
  name: string
  description: string
}

export type Service = {
  id: string
  title: string
  description: string
  price: number
  category: string // slug
  pro: {
    id: string
    name: string
    rating: number
  }
}

export const categories: Category[] = [
  { slug: 'obra', name: 'Obra', description: 'Construcción, acabados y remodelaciones.' },
  { slug: 'carpinteria', name: 'Carpintería', description: 'Muebles, puertas, armarios y más.' },
  { slug: 'plomeria', name: 'Plomería', description: 'Instalaciones y reparaciones de agua y gas.' },
  { slug: 'electricidad', name: 'Electricidad', description: 'Instalaciones eléctricas y mantenimiento.' },
  { slug: 'pintura', name: 'Pintura', description: 'Pintura interior y exterior.' },
  { slug: 'otros', name: 'Otros', description: 'Otros servicios para el hogar y negocio.' },
]

export const services: Service[] = [
  {
    id: 'srv-001',
    title: 'Instalación de lavamanos',
    description: 'Incluye instalación y materiales básicos. Tiempo estimado: 2 horas.',
    price: 120000,
    category: 'plomeria',
    pro: { id: 'pro-001', name: 'Juan Pérez', rating: 4.8 },
  },
  {
    id: 'srv-002',
    title: 'Fabricación de mueble a medida',
    description: 'Mueble en MDF con acabados en melamina. Entrega en 7 días.',
    price: 850000,
    category: 'carpinteria',
    pro: { id: 'pro-002', name: 'Carpintería Los Robles', rating: 4.6 },
  },
  {
    id: 'srv-003',
    title: 'Pintura de habitación 12m²',
    description: 'Incluye preparación, 2 manos de pintura y limpieza.',
    price: 200000,
    category: 'pintura',
    pro: { id: 'pro-003', name: 'María Gómez', rating: 4.9 },
  },
]
