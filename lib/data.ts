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

// TaskRabbit-like entities
export type Tasker = {
  id: string
  name: string
  bio: string
  skills: string[] // category slugs
  hourlyRate: number // COP per hour
  rating: number // 0-5
  city?: string
}

export type Reservation = {
  id: string
  taskerId: string
  date: string // ISO date YYYY-MM-DD
  startTime: string // HH:mm
  hours: number
  address: string
  total: number
  status: 'created' | 'paid' | 'canceled'
}

export type ClientTask = {
  id: string
  category: string
  description: string
  estimatedHours: number
  address: string
  createdAt: string
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

export const taskers: Tasker[] = [
  {
    id: 'tsk-001',
    name: 'Juan Pérez',
    bio: 'Especialista en plomería residencial y comercial con 10 años de experiencia.',
    skills: ['plomeria'],
    hourlyRate: 60000,
    rating: 4.8,
    city: 'Bogotá',
  },
  {
    id: 'tsk-002',
    name: 'Carpintería Los Robles',
    bio: 'Fabricación e instalación de muebles a medida y restauración de madera.',
    skills: ['carpinteria'],
    hourlyRate: 75000,
    rating: 4.6,
    city: 'Medellín',
  },
  {
    id: 'tsk-003',
    name: 'María Gómez',
    bio: 'Pintura interior/exterior con acabados finos y asesoría de color.',
    skills: ['pintura', 'obra'],
    hourlyRate: 65000,
    rating: 4.9,
    city: 'Cali',
  },
]
