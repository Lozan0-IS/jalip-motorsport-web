# UTV UNLIMITED — ANÁLISIS ESTRUCTURAL

Generado con el skill `website-reference`. Fuente: `https://utvunlimited.com/` (homepage, `/tienda.php`, `/vehiculos.php`), obtenido vía WebFetch con prompts limitados a estructura/comportamiento — nunca a color, tipografía, imágenes o copy exacto. Este documento describe **cómo está organizado y cómo se comporta** el sitio, no cómo se ve.

## 1. Arquitectura de navegación

Nav principal (6 ítems, sin submenús): Vehículos · Tienda · Storage · Servicios · Nosotros · Blog.
Nav secundaria (derecha): Mi Cuenta · Carrito (con contador) · Contáctanos.

Profundidad plana — todo a un clic desde el nav principal, sin mega-menús. Esto tiene sentido para un catálogo de tamaño mediano (curado, no miles de SKUs) donde forzar al usuario a bucear en submenús sería fricción innecesaria.

## 2. Flujo de página (homepage, orden real de arriba a abajo)

1. Hero carrusel (3 slides, ~20% del alto) — cada slide vende una línea de negocio distinta (personalización, marca Polaris, storage) con su propio CTA.
2. Barra de métricas de confianza (~5%) — 4 contadores (años, marcas, soporte, clientes).
3. Grid de productos destacados (~25%) — 16 tarjetas, cada una: imagen, categoría, nombre, precio, badge de compatibilidad con vehículo. Link "Todo el catálogo".
4. Carrusel de vehículos destacados (~20%) — 3 ítems: imagen, año, HP, capacidad de pasajeros, precio desde, link "Ver". Link "Ver todos".
5. Grid de servicios (~15%) — 4 tarjetas numeradas 01-04 (Servicio Técnico, Build & Custom, Grúa 24/7, Financiamiento), cada una linkea a `servicios.php`.
6. Tabla de precios de Storage (~20%) — 3 planes verticales, cada uno con 4-7 bullets de features y un botón de WhatsApp propio; el plan del medio está marcado "Más Vendido".
7. Grid de categorías de tienda (~10%) — 6 categorías con conteo de ítems (Accesorios 25, Protección 18, Eléctrico 5, Motor 2, Suspensión 2, Frenos 1).
8. Sección de ubicación/CTA (~5%) — WhatsApp + Cómo llegar.
9. Footer (~8%).

## 3. Jerarquía de contenido (con el porqué)

El orden prioriza: **vender el catálogo primero (productos destacados), luego el inventario de vehículos, luego los servicios de mayor margen (storage/financiamiento), y cerrar con navegación de catálogo completo.** Esto sugiere que el negocio empuja tráfico hacia accesorios/partes como entrada de bajo compromiso antes de escalar a la venta de vehículo (compra grande) — un patrón razonable para captar tanto al comprador de repuestos como al comprador de UTV completo en la misma visita.

Los servicios recurrentes (storage, financiamiento, grúa 24/7) están deliberadamente después del catálogo de producto, no antes — son upsell/retención, no la puerta de entrada.

## 4. Patrones de layout

- Secciones alternan grid (productos, servicios, categorías) con carrusel (hero, vehículos destacados) — el carrusel se reserva para contenido con pocos ítems curados (3), el grid para catálogos más grandes.
- Tarjetas de producto y de vehículo comparten el mismo lenguaje estructural: imagen → metadatos clave (2-4 datos) → precio → acción.
- La tabla de Storage rompe el patrón de tarjeta-grid y usa comparación vertical de 3 columnas — apropiado porque es una decisión de "elegir un plan", no de "explorar muchos ítems".

## 5. Diseño de interacción

- El selector de vehículo en `/tienda.php` es un flujo de 3 pasos (Marca → Modelo → Año) antes de mostrar resultados — filtra el catálogo por compatibilidad real, evitando que el usuario vea partes que no le sirven.
- Filtros de tienda viven en sidebar izquierdo (categoría, compatibilidad, precio, estado) + barra superior (selector de vehículo, orden, limpiar filtros) — separación entre "filtros de catálogo" (sidebar) y "filtros de intención de compra" (barra superior, más prominente).
- Los CTAs de Storage y de la sección de ubicación abren WhatsApp con texto pre-rellenado — el sitio no tiene checkout de servicios, todo external-handoff a conversación humana.
- Las tarjetas de "Vehículos" en `/vehiculos.php` no llevan directo a una ficha individual sino a una página de inventario ya filtrada por marca+condición (nuevo/usado) — un paso intermedio de categoría antes del detalle.

## 6. Arquitectura responsive

No verificable en detalle sin renderizar el sitio en viewport móvil real (esta inspección fue vía fetch de contenido, no vía navegador con emulación de dispositivo) — dato que se marca explícitamente como **no comprobado**, no asumido.

## 7. Arquitectura de conversión

- 27+ CTAs identificados en la homepage; la mayoría son "Ver X" (navegación a catálogo filtrado) o WhatsApp con texto pre-rellenado — casi cero formularios de contacto propios, casi todo el cierre de venta ocurre fuera del sitio, en WhatsApp.
- Un único punto real de "confianza"/prueba social: la barra de métricas (años/marcas/soporte/clientes). **No hay testimonios ni reseñas de clientes en ningún lugar de la homepage.**
- El footer repite la taxonomía de vehículos y servicios como links de salida — doble oportunidad de navegación para quien no convirtió arriba.
- Newsletter signup solo en el footer, discreto, no bloquea ni interrumpe el flujo principal.

## 8. Estructura de catálogo (`/tienda.php`)

Breadcrumb "Inicio > Tienda" presente. Sidebar: categoría, compatibilidad, precio, estado. Barra superior: selector de vehículo + orden + limpiar filtros. **Nota de honestidad**: al momento del fetch la grilla mostraba "0 productos encontrados" (probablemente por filtros de query string en la URL fetcheada, o por renderizado dependiente de JS que WebFetch no ejecuta) — la estructura de tarjeta de producto individual no pudo verificarse directamente en esta página; se infiere del grid de productos destacados de la homepage (imagen, categoría, nombre, precio, badge de compatibilidad), pero esto se marca como **inferencia, no observación directa** en esta página específica.

## 9. Estructura de vehículos (`/vehiculos.php`)

Organizado en dos categorías principales (Nuevos 2025/2026, Certificados Pre-Owned), cada una subdividida por marca (Can-Am, Polaris). Cada tarjeta de categoría muestra marca, año-modelo, nombres de modelos destacados, conteo de modelos disponibles, HP máximo, y un botón que lleva a un listado ya filtrado — **no hay fichas de vehículo individuales enlazadas directamente desde esta página**, es un paso de categorización antes del detalle. Incluye sección de Trade-In (evaluación de vehículo actual) y un CTA de asesoría por WhatsApp.

## 10. Servicios

No inspeccionado en profundidad esta ronda (fuera del goal — el pedido del usuario fue "estructura general + carrito", ya cubierto). Referenciado solo como 4 tarjetas de servicio en homepage (Servicio Técnico, Build & Custom, Grúa 24/7, Financiamiento), cada una linkeando a `/servicios.php`.

## 11. Carrito (`/carrito.php`) — de la investigación previa de esta sesión

Ya investigado en una ronda anterior de este mismo proyecto (antes de crear este skill formalmente, pero con el mismo criterio de "solo estructura/función"): el carrito usa un flujo de pasos visual, desglose de Subtotal/ITBIS/Total, sección "También te puede interesar" con productos relacionados, y selección de método de pago — de los métodos listados, solo uno tiene integración real de pasarela; el resto (incluyendo tarjeta/Apple Pay) aparece marcado como "próximamente" en el sitio real. Este hallazgo ya informó las decisiones honestas tomadas para el carrito de Jalip (PayPal informativo, sin pasarela real).

## 12. Interacción y conversión — resumen de CTAs

Ver tabla completa en la sección 7. Patrón dominante: **navegación a catálogo filtrado** o **WhatsApp con texto pre-rellenado**. Cero checkout de servicios in-site.

## 13. Lo que NO se incluyó (deliberadamente)

Colores, tipografías, el logo, fotografías de producto/vehículo, iconografía, textos de marketing exactos, y nombres de marca/modelo específicos de UTV Unlimited. Nada de esto aparece descrito aquí porque nada de esto debe reutilizarse — ver el documento de adaptación para lo que sí se lleva a Jalip.
