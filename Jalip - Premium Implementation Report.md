# JALIP MOTORSPORT — PREMIUM IMPLEMENTATION REPORT (Fase 9, post-aprobación)

Cobertura: VIS-001, VIS-002, VIS-005 — los únicos 3 ítems aprobados en el approval gate de `Jalip - Premium Visual Audit.md`. VIS-003 (falta de fotografía real) queda `BLOCKED — REAL BUSINESS ASSET REQUIRED`, sin tocar. VIS-004 y VIS-006 (P3) no se implementaron, según el veredicto de la propia auditoría.

## VIS-001 — Franja "Accesorios & partes" del Homepage

**WHAT**: La sección completa (ticker de categorías, encabezado, tarjetas de producto, barra de progreso) pasó de una superficie clara (`#F2F1EC`/`#EAE8E1`/tarjetas blancas) a la misma superficie oscura que usa el resto del Homepage (`#0A0A0C`/`#0D0E10`), con las tarjetas de producto reescritas al mismo lenguaje visual que ya usa `Accesorios.dc.html` (degradado oscuro de tarjeta, borde `#26282E`, precio en rojo, resplandor radial rojo sutil en el estado sin foto).

**WHERE**: `Jalip Motorsport.dc.html`, sección "Accesorios & partes" (antes con el comentario "franja clara deliberada" — ver nota honesta abajo).

**WHY**: Auditoría visual real (capturas de pantalla) mostró un quiebre abrupto de superficie sin ninguna transición que lo enmarcara como decisión de ritmo — se leía como un componente de otra paleta insertado en el sitio.

**HOW VERIFIED**: Captura de pantalla real antes y después (navegador headless real), en 1440px, sobre la sección completa (ticker + tarjetas). Regresión de consola en los 4 archivos.

**RESULT**: La sección ahora fluye del hero oscuro al ticker al grid de tarjetas sin ningún quiebre de superficie — confirmado visualmente comparando las capturas de antes/después.

**CONFIDENCE**: HIGH.

**Nota honesta**: el código original tenía un comentario explícito diciendo que la franja clara era una decisión deliberada ("no todo el sitio es negro"). Esa intención (evitar que el sitio sea monótonamente negro) es legítima, pero la ejecución real — verificada por captura de pantalla, no solo leída en el comentario — no lograba ese objetivo de forma cuidada; se veía como una inconsistencia, no como ritmo. Se revierte esa decisión con la evidencia visual real como justificación, no como un descuido del historial del proyecto.

---

## VIS-002 — Unificación del estado "sin foto todavía"

**WHAT**: Los tres tratamientos distintos para el mismo estado se unificaron al ya usado en `Accesorios.dc.html` (resplandor radial rojo + ícono + "Foto próximamente", en `'JetBrains Mono'` uppercase):
- `Vehiculos.dc.html` — grid de inventario: pasó de un rectángulo gris plano + ícono de imagen genérico + "Foto pendiente — Panel Admin" al tratamiento unificado con ícono de auto.
- `Jalip Motorsport.dc.html` — "UTV destacados": pasó de fondo negro plano + ícono de auto sin resplandor + "Foto pendiente" al tratamiento unificado con el mismo texto que las otras dos ("Foto próximamente").
- `Jalip Motorsport.dc.html` — "Accesorios & partes" (parte del mismo cambio que VIS-001): su propio ícono sin foto ahora también lleva el resplandor radial.

**WHERE**: `Vehiculos.dc.html` (grid principal), `Jalip Motorsport.dc.html` (UTV destacados + franja de accesorios).

**WHY**: Mismo concepto, mismo tratamiento en todo el sitio — antes había tres versiones visualmente distintas del mismo estado.

**HOW VERIFIED**: Captura de pantalla real de `Vehiculos.dc.html` (grid completo) y de `Jalip Motorsport.dc.html` (UTV destacados) tras el cambio, en 1440px y 390px. Regresión de consola.

**RESULT**: Las tres ubicaciones ahora muestran el mismo resplandor rojo, mismo texto, mismo lenguaje — confirmado visualmente.

**CONFIDENCE**: HIGH.

**Nota técnica de seguridad (no cosmética)**: el ícono de auto en `Vehiculos.dc.html` se implementó como `<i data-lucide="car">` dinámico dentro de un `sc-for` cuya lista SÍ cambia de tamaño en tiempo real (los filtros de marca/condición/disponibilidad/año). Este proyecto tiene un historial documentado de una clase de bug real (`lucide.createIcons()` mutando nodos fuera del tracking del framework, causando un crash de `removeChild` cuando la lista se reordena/filtra). Antes de dar esto por bueno se verificó explícitamente con una prueba real: filtrar de 6 a 3 unidades y de vuelta a 6, con captura de excepciones de consola — resultado `JS_EXCEPTIONS: []`. Además, se confirmó que `Accesorios.dc.html` ya usa exactamente este mismo patrón (ícono dinámico dentro de una lista filtrable) en producción sin haber fallado nunca en las pruebas de esta sesión — evidencia adicional, no solo la prueba puntual. Se documenta esto explícitamente porque es precisamente el tipo de riesgo que este proyecto no debe dejar pasar sin comprobar.

---

## VIS-005 — Nombre de placeholder administrativo visible como producto real

**WHAT**: Los nombres base de las 3 unidades demo del catálogo compartido (`VEHICLES`, duplicado en `Accesorios.dc.html`, `Jalip Motorsport.dc.html` y `Vehiculos.dc.html`) pasaron de `'Unidad demo 03 — modelo editable'` / `'Unidad demo 04 — modelo editable'` / `'Unidad demo 05 — marca editable'` a simplemente `'Unidad demo 03'` / `'Unidad demo 04'` / `'Unidad demo 05'`.

**WHERE**: `Accesorios.dc.html`, `Jalip Motorsport.dc.html`, `Vehiculos.dc.html` — las 3 copias del array `VEHICLES` (líneas correspondientes a `v3`/`v4`/`v5`).

**WHY**: No era un texto de "fallback" dinámico como se asumió al momento de la auditoría — es el nombre literal del dato semilla, ya duplicado en 4 archivos. El sufijo "— modelo editable"/"— marca editable" es lenguaje de scaffolding de CMS filtrándose como si fuera el nombre real del vehículo. La naturaleza demo ya se comunica por otros medios (badge "DEMO" en la tarjeta, aviso "Inventario demostrativo" en la página) — no hace falta repetirla dentro del propio nombre.

**HOW VERIFIED**: Grep de las 4 copias del dato (incluyendo `Panel Admin.dc.html`, que ya usaba internamente `'Unidad demo 03'` sin el sufijo — el cambio alinea la copia pública con lo que el propio panel ya llamaba internamente, no inventa una convención nueva). Captura de pantalla real confirmando "UNIDAD DEMO 03" limpio junto a "MAVERICK R X RS" en el carrusel de destacados.

**RESULT**: Confirmado visualmente — el nombre ya no compite en longitud/ruido con los nombres reales de vehículo.

**CONFIDENCE**: HIGH.

**Nota de alcance**: `Panel Admin.dc.html` no se tocó — sus propias listas internas (`v_v3`/`v_v4`/`v_v5` → `'Unidad demo 03'`, etc.) ya usaban el nombre corto, así que no había nada que alinear ahí.

---

## Qué NO se tocó

- VIS-003 (fotografía real) — `BLOCKED`, no accionable en código, no se generó ni inventó ninguna imagen.
- VIS-004 (wrapping del eyebrow en mobile) — P3, no incluido en la aprobación.
- VIS-006 (filtros de Vehículos con tratamiento genérico) — P3, no incluido en la aprobación.
- Servicios, Portafolio, Mantenimiento, Contacto, Panel Admin — fuera del alcance de esta ronda de auditoría (declarado explícitamente como limitación en `Jalip - Premium Visual Audit.md`).
- `Panel Admin.dc.html` — cero cambios de código (solo se usó como referencia de nomenclatura para VIS-005).
