# Jalip Motorsport Web

Primera fase de la experiencia web premium de Jalip Motorsport. Construida con Next.js App Router, React, TypeScript estricto, Tailwind CSS y React Three Fiber.

## Dirección visual vigente

La interfaz utiliza tokens centralizados en `src/app/globals.css`: negro profundo `#080B0E`, superficie `#101419`, grafito `#242A30`, metal `#AEB3B7`, blanco frío `#F4F4F1` y acentos Jalip `#E31B23`/`#FF2028`. El verde tropical aparece únicamente dentro de fotografías. No se incorporó código ni recursos de los configuradores de referencia sin licencia explícita.

El logotipo oficial todavía no está en el repositorio. La cabecera usa un wordmark tipográfico temporal, sin crear un isotipo alternativo. Sustituirlo por `public/assets/brand/jalip-logo.svg` cuando el cliente suministre el archivo original.

## Funciones incluidas

- Home responsive con hero cinematográfico original y navegación móvil.
- Vehículos, proyectos, piezas filtrables y paquetes con contenido demostrativo identificado.
- Configurador 3D procedural: órbita 360°, zoom, color, luces, accesorios, reinicio, guardado local y resumen por WhatsApp.
- Formulario de taller validado en navegador, actualmente simulado.
- WhatsApp contextual centralizado para el número 829-765-3173.
- Metadata, Open Graph, sitemap, robots, 404 y encabezados básicos de seguridad.
- Tipos de dominio y esquema de referencia para Supabase sin secretos.

## Desarrollo

```bash
npm install
npm run dev
```

Validación:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Configuración

Copiar `.env.example` a `.env.local` cuando exista un proyecto Supabase. Nunca se deben versionar credenciales. El esquema inicial está en `supabase/schema.sql`; debe revisarse y completar sus políticas RLS antes de aplicarlo.

## Recursos que debe proporcionar Jalip

Todo el contenido actual marcado como “demo” debe reemplazarse. Se requiere:

1. Logotipo oficial en SVG y variantes clara/oscura.
2. Hero oficial horizontal, idealmente 2400×1400 px, y video MP4/WebM opcional.
3. Para cada vehículo: 6–12 fotos WebP/AVIF, ficha, condición, modificaciones, estado y video opcional.
4. Para cada proyecto: fotos antes/después, galería, historia y lista técnica.
5. Para cada pieza: fotos transparentes o de catálogo, categoría, compatibilidad e inventario.
6. Fotografías del taller, equipo y proceso.
7. Modelo UTV `.glb` con licencia, mallas optimizadas, pivotes y accesorios separados; texturas KTX2 y Draco recomendados.
8. Dirección, mapa, horarios, Instagram, garantía, marcas, testimonios autorizados y métricas verificadas.

Ubicar recursos web en `public/assets/`. El hero actual (`jalip-hero-demo.png`) fue generado específicamente como demostración, no representa un modelo oficial.

## Arquitectura siguiente

- Conectar formularios mediante Server Actions y validación de servidor.
- Añadir Supabase Auth/Storage y un panel `/admin` protegido.
- Sustituir datos de `src/data/site.ts` por consultas tipadas con caché.
- Cargar el `.glb` definitivo en lazy loading con Draco/KTX2 y LOD móvil.
- Añadir pruebas unitarias, E2E y analítica con consentimiento.
