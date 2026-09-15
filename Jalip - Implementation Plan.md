# JALIP MOTORSPORT — IMPLEMENTATION PLAN (Fase 8)

Solo P0 / P1 / P2 de alto valor, según `Jalip - Final Gap Analysis.md`. P0 = 0 ítems. P3 excluido explícitamente (nav móvil agrupado, narrativa de portafolio sin contenido real aún). Todo lo `BLOCKED` (reseñas, métricas de confianza, banner de oferta) queda fuera de este plan por diseño — no se implementa nada que requiera datos de negocio no confirmados.

Este documento es el que se somete al **APPROVAL GATE** — nada de esto se implementa hasta que el usuario lo confirme.

---

## JALIP-001 (P1)

| Campo | Detalle |
|---|---|
| **Archivo** | `Vehiculos.dc.html` |
| **Sección** | Trade-in / "Tú decides" — tarjeta dentro de `.jm-trade-steps` (paso "03") |
| **Problema** | Overflow horizontal real de 4px a 375px de ancho de viewport |
| **Evidencia** | Medido en vivo: `document.documentElement.scrollWidth - clientWidth = 4` a 375px, en los demás anchos probados (1440/1024/768/430/390) = 0. Elemento identificado por `getBoundingClientRect()`: `<div style="padding:24px 22px">` dentro de `.jm-trade-steps`, contenido "03 — Tú decides" |
| **Solución** | Ajustar el padding horizontal o el `gap` del grid de `.jm-trade-steps` para que la tarjeta no exceda el ancho del viewport a 375px — cambio acotado de CSS inline en esa tarjeta/grid, sin tocar su contenido ni comportamiento |
| **Riesgo** | Bajo — cambio de espaciado puramente visual, no toca lógica ni datos |
| **Dependencias** | Ninguna |
| **Test** | Re-medir `scrollWidth - clientWidth` a 375px tras el cambio (debe dar 0); re-confirmar 0 en los otros 5 anchos para no introducir una regresión; captura de pantalla de la tarjeta a 375px |

---

## JALIP-002 (P2, alto valor)

| Campo | Detalle |
|---|---|
| **Archivo** | `Accesorios.dc.html` (y posiblemente `Vehiculos.dc.html` si el usuario quiere el mismo comportamiento en ambos filtros) |
| **Sección** | Sidebar de filtros — filtro de compatibilidad |
| **Problema** | El filtro de compatibilidad existe pero no recuerda la selección entre visitas — el usuario debe volver a filtrar por su vehículo cada vez que entra |
| **Evidencia** | Confirmado leyendo el código: el filtro de compatibilidad usa estado en memoria (`this.state`), sin lectura/escritura a `localStorage`; patrón inspirado en el "Machine finder" con "Saved Machines" de Rocky Mountain ATV/MC (`[INFERRED]`, referencia bloqueada por CAPTCHA para verificación completa, pero el patrón en sí — guardar la última selección — es independiente de cómo se ve o de qué tan lejos llega su versión real) |
| **Solución** | Al cambiar el filtro de compatibilidad, guardar el valor en `localStorage` (mismo patrón `getX`/`setX` ya usado en todo el proyecto); al cargar la página, pre-rellenar el filtro con el valor guardado si existe, sin bloquear ni forzar nada si no hay valor guardado |
| **Riesgo** | Bajo — aditivo puro; si `localStorage` no tiene el valor (primera visita, o navegador distinto), el comportamiento es idéntico al actual |
| **Dependencias** | Ninguna — reutiliza el patrón de persistencia ya existente en el proyecto |
| **Test** | Filtrar por una marca/compatibilidad, recargar la página, confirmar que el filtro sigue aplicado; probar en una sesión de navegador limpia (sin `localStorage` previo) y confirmar que el comportamiento por defecto (sin filtro) no cambia |

---

## Explícitamente NO incluido en este plan (y por qué)

- **Nav móvil agrupado por categoría** (UTV Unlimited, Pentagram) — P3, el nav de Jalip ya es corto (5 ítems), agrupar no resuelve un problema de escala real.
- **Secciones narrativas en Portafolio** (Pentagram) — no hay proyectos reales publicados todavía; no hay contenido que narrar sin inventarlo.
- **Rating de producto / reseñas, banner de reseñas, barra de métricas de confianza, banner de oferta** — los cuatro `BLOCKED — REAL BUSINESS DATA REQUIRED`. Ninguno se implementa con datos inventados.

## Orden de implementación

JALIP-001 primero (P1, bug real medido) → JALIP-002 después (P2, mejora aditiva). Tras cada uno: `git diff --stat` + `git diff` para revisar exactamente qué cambió antes de continuar al siguiente.
