# Brixo

Marketplace de servicios profesionales

## Tecnologías
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS

- `npm run dev` – entorno de desarrollo
- `npm run build` – build de producción
- `npm start` – servidor de producción local

## Desarrollo local

1. Instala dependencias
2. Ejecuta el servidor de desarrollo

```powershell
npm install
npm run dev
```
 http://localhost:3000

## Estructura de rutas
- `/` – landing y categorías
- `/servicios` – listado de servicios con filtro
- `/servicios/[id]` – detalle de servicio con CTA de contratación
- `/profesionales` – formulario para publicar perfil profesional (demo)
- `/contratar` – formulario para publicar una necesidad (demo)
- `/checkout` – checkout demo con éxito/cancelación

## Pasarela de pago demo
- API: `POST /api/checkout/session` crea sesión con monto del servicio
- `PATCH /api/checkout/session` actualiza estado (`paid` o `canceled`)
- UI: `/checkout?service=<id>` simula el proceso y redirige a `success` o `cancel`

Nota: todo almacenamiento es in-memory solo para demo; al desplegar se reinicia en cada cold start.
