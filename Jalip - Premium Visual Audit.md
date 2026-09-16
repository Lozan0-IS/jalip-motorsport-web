# JALIP MOTORSPORT — PREMIUM VISUAL AUDIT (Fase 9)

Auditoría visual real — navegador headless real (Edge/CDP), servidor local, capturas reales en 1440/1280/1024/768/430/390/375px, más un scroll storyboard en 1440 y 390 sobre Homepage, y capturas de sección en Vehículos y Accesorios. Esta NO es una auditoría funcional (esa ya se hizo en la Fase 3-8, veredicto READY) — es exclusivamente dirección de arte, composición, tipografía, spacing, jerarquía e identidad visual.

## Nota metodológica (evidencia, no atajo)

La primera tanda de capturas "top" salió en blanco (página cargada pero aún sin pintar en el momento exacto del `Page.captureScreenshot`). No se reportó como hallazgo real — se diagnosticó como un problema de timing del script, se aumentó el tiempo de asentamiento antes de capturar, y se repitió la captura. Se documenta aquí porque es exactamente el tipo de falso positivo que este proyecto tiene la norma de nunca dejar pasar sin verificar.

---

## SCORE VISUAL (diagnóstico, no manipulado)

| Área | Score | Nota |
|---|---:|---|
| Art direction | 7/10 | El hero de Homepage es genuinamente bueno — fotografía real dramática, paleta coherente. El resto del sitio no sostiene ese mismo nivel. |
| Typography | 7/10 | Familia (Saira para títulos, sans para cuerpo) con personalidad y buen peso — pero ver hallazgo de wrapping en mobile. |
| Spacing | 7/10 | Consistente dentro de cada página; no se detectaron amontonamientos ni excesos graves. |
| Composition | 6/10 | El hero de Homepage compone bien; la página de Vehículos, con todo el inventario en placeholders vacíos, no tiene mucho con qué componer. |
| Visual hierarchy | 7/10 | Jerarquía clara de headline→CTA en las páginas principales. |
| Image quality/presentation | 4/10 | Un solo asset fotográfico real de calidad (el hero) en las 3 páginas públicas auditadas — todo lo demás son placeholders. Ver hallazgos VIS-001/002/003. |
| Cards | 5/10 | Funcionalmente sólidas, pero **tres tratamientos visuales distintos** para el mismo concepto ("sin foto todavía") en 3 lugares distintos del sitio. |
| Buttons/CTAs | 8/10 | Jerarquía primario/secundario clara y consistente (rojo relleno vs. contorno), wording específico ("Ver UTV disponibles", no "Click aquí"). |
| Navigation | 8/10 | Nav plano, breadcrumbs reales, carrito y agendar accesibles — ya validado en fases anteriores. |
| Mobile visual quality | 7/10 | Sin overflow, jerarquía se mantiene — un problema de wrapping de texto detectado (VIS-004). |
| Motion | N/A | No evaluado a fondo esta ronda — fuera del foco de los hallazgos priorizados; no se detectó motion invasivo durante la navegación. |
| Brand distinctiveness | 6/10 | El acento rojo + tipografía condensada tienen personalidad; la falta de fotografía real en catálogo diluye la distintividad donde más importa (el inventario). |
| Premium perception | 5/10 | El hero solo no sostiene "premium" en todo el sitio — las páginas de catálogo, con placeholders vacíos y una franja blanca fuera de tono, bajan la percepción general. |
| Conversion clarity | 8/10 | CTAs claros, WhatsApp visible sin ser invasivo, sin popups ni banners agresivos. |

**Promedio: 6.5/10** — sitio funcionalmente sólido con un hero fuerte, pero con inconsistencias reales de identidad visual entre secciones que impiden que se sienta como "un mismo producto" de principio a fin.

---

## HALLAZGOS

### VIS-001 — Franja "Accesorios & partes" del Homepage rompe el tema oscuro

**WHAT**: El carrusel horizontal de accesorios destacados en la Homepage (justo debajo de la barra de categorías) usa un fondo blanco/crema con texto negro — el único bloque de toda la página con esa polaridad. El resto del sitio (header, hero, UTV destacados, servicios, portafolio, footer) es consistentemente oscuro.

**WHERE**: `Jalip Motorsport.dc.html` — sección "Accesorios & partes" (carrusel horizontal, ~15% de scroll en 1440px).

**WHY**: No hay transición ni justificación visual — pasa de negro a blanco a negro sin ningún elemento que lo enmarque como una decisión (no es una alternancia de ritmo tipo Pentagram, es un cambio de superficie abrupto). Se lee como un componente insertado de otra paleta, no como parte del mismo sistema.

**SEVERIDAD**: P1 — es el quiebre de identidad visual más visible de todo el sitio.

**PROPUESTA**: Llevar esa sección a la misma superficie oscura que usa el resto del Homepage (fondo `#0D0E10`/`#08080A` de la paleta ya establecida), manteniendo las tarjetas de producto con el mismo lenguaje que ya usa `Accesorios.dc.html` (fondo oscuro, badge de categoría, precio en rojo).

**IMPACTO**: Alto — es la sección más visible tras el hero y actualmente es la que más rompe la coherencia del sitio.

**RIESGO**: Bajo — cambio de color/superficie, no de estructura ni de datos.

---

### VIS-002 — Tres tratamientos visuales distintos para "sin foto todavía"

**WHAT**: El mismo concepto (un producto/vehículo sin foto real cargada) se muestra de tres formas visualmente distintas en tres lugares:
1. `Vehiculos.dc.html` (catálogo real): rectángulo gris plano + ícono de imagen genérico + badge "DEMO".
2. `Accesorios.dc.html` (catálogo real): fondo con resplandor radial rojo sutil + ícono circular + "FOTO PRÓXIMAMENTE" — más cuidado, más de la identidad de marca.
3. Homepage → "UTV destacados": fondo negro plano + ícono de auto + "FOTO PENDIENTE" — un tercer estilo, con un tercer texto.

**WHERE**: `Vehiculos.dc.html` (grid de inventario), `Accesorios.dc.html` (grid de catálogo, ya bien resuelto), `Jalip Motorsport.dc.html` (sección "UTV destacados").

**WHY**: Un sistema de diseño coherente trata el mismo estado de la misma forma en todas partes. Ahora mismo, el estado vacío de Accesorios (el mejor resuelto de los tres) no se reutiliza donde más falta — en Vehículos, que es 100% placeholders en este momento.

**SEVERIDAD**: P1 — afecta la percepción premium precisamente donde el sitio más depende de placeholders (todo el inventario de vehículos).

**PROPUESTA**: Unificar los tres bajo el tratamiento ya usado en Accesorios (resplandor radial + ícono circular + texto), incluyendo el mismo texto ("Foto próximamente") en los tres lugares.

**IMPACTO**: Alto — el catálogo de vehículos es hoy 100% placeholder; mejorar ese único componente mejora la percepción de toda la página de Vehículos de un solo golpe.

**RIESGO**: Bajo — es reutilizar un patrón que ya existe y ya funciona en el propio proyecto, no inventar uno nuevo.

---

### VIS-003 — Falta de fotografía real en catálogo (bloqueado por datos)

**WHAT**: Fuera del hero, no existe fotografía real de vehículos o accesorios en ninguna de las 3 páginas públicas auditadas.

**WHERE**: `Vehiculos.dc.html`, `Accesorios.dc.html`, sección "UTV destacados" del Homepage.

**SEVERIDAD**: P2 en términos de diseño — el diseño de los placeholders se puede mejorar (VIS-002), pero el problema de fondo no es de diseño.

**PROPUESTA**: `ASSET BLOCKED — REAL BUSINESS ASSET REQUIRED`. No se debe generar ni inventar fotografía de producto — eso violaría la regla de nunca fabricar contenido que aparente ser real. Esto queda documentado, no resuelto en esta fase.

**IMPACTO**: Es, con diferencia, el mayor techo de percepción premium del sitio — pero está fuera del alcance de un cambio de diseño.

**RIESGO**: N/A — no se va a tocar.

---

### VIS-004 — Wrapping torpe del eyebrow del hero en mobile

**WHAT**: El texto "TAMBORIL · SANTIAGO · REP. DOMINICANA" en el hero de Homepage, a 390px, rompe la línea exactamente entre "REP." y "DOMINICANA", separando dos palabras que deberían leerse juntas.

**WHERE**: `Jalip Motorsport.dc.html`, hero, eyebrow sobre el titular principal, visible a 390/375px.

**WHY**: Es un salto de línea que el navegador decide automáticamente porque el texto es más largo que el contenedor a ese ancho — no fue una decisión de diseño.

**SEVERIDAD**: P3 — puramente cosmético, no afecta comprensión ni uso.

**PROPUESTA**: Forzar el salto de línea en un punto más natural (ej. después de "TAMBORIL" o usar `white-space:nowrap` con un tamaño de fuente ligeramente menor en ese breakpoint específico) — cambio mínimo y acotado.

**IMPACTO**: Bajo.

**RIESGO**: Bajo.

---

### VIS-005 — "UNIDAD DEMO 03 — MODELO EDITABLE" como nombre visible de producto

**WHAT**: En el carrusel "UTV destacados" del Homepage, una de las unidades demo muestra literalmente "UNIDAD DEMO 03 — MODELO EDITABLE" como si fuera el nombre del vehículo, en la misma tipografía y peso que "MAVERICK R X RS" (un nombre real).

**WHERE**: `Jalip Motorsport.dc.html`, sección "UTV destacados".

**WHY**: Es honesto (no pretende ser un vehículo real), pero un texto de placeholder administrativo filtrándose como si fuera contenido de producto real se lee como un sitio sin terminar, no como transparencia intencional — el catálogo demostrativo ya se declara explícitamente en el aviso de la página, no hace falta repetirlo en cada nombre de tarjeta.

**SEVERIDAD**: P2.

**PROPUESTA**: Cuando una unidad demo no tenga nombre de marca/modelo real cargado, mostrar un texto genérico y neutro (ej. "Unidad disponible — próximamente") en vez del identificador interno del Panel Admin.

**IMPACTO**: Medio — es un detalle puntual, pero exactamente el tipo de detalle que delata "esto no está terminado" a un visitante real.

**RIESGO**: Bajo — es un cambio de fallback de texto, no de lógica de datos.

---

### VIS-006 — Filtros de Vehículos con tratamiento visual genérico

**WHAT**: Los 4 controles de filtro (Marca/Estado/Disponibilidad/Año) en `Vehiculos.dc.html` son rectángulos idénticos sin jerarquía entre sí — funcionalmente correctos (ya verificados en la Fase 3-8), pero visualmente indistinguibles de un panel de administración.

**WHERE**: `Vehiculos.dc.html`, barra de filtros sobre el grid de inventario.

**SEVERIDAD**: P3 — es una mejora cosmética, no un problema.

**PROPUESTA**: Si se aborda, alinear su tratamiento con el sidebar de filtros ya más cuidado de `Accesorios.dc.html` (íconos por categoría, agrupación visual). No es urgente.

**IMPACTO**: Bajo.

**RIESGO**: Bajo.

---

## ANTI-AI-DESIGN CHECK

Revisado explícitamente contra la lista de patrones genéricos (Sección 23 de la misión):

- ❌ No hay gradients decorativos injustificados — el único gradiente real es el overlay natural de la foto del hero.
- ❌ No hay glassmorphism.
- ❌ No hay "card soup" de bordes redondeados uniformes — las tarjetas de producto usan esquinas mayormente rectas, consistente con la estética industrial/motorsport.
- ✅ **Sí hay** un patrón de "icono + título + párrafo + botón × 4" en la sección de Servicios del Homepage (mencionado explícitamente como riesgo en la Sección 11 de la misión) — no se auditó a fondo esta ronda (fuera de las capturas revisadas en detalle); queda anotado como **pendiente de revisión visual específica**, no confirmado como problema todavía.
- ❌ No hay CTAs repetidos compitiendo entre sí — jerarquía primario/secundario clara.
- ❌ No hay "premium" artificial vía negro + dorado — la paleta es negro + rojo de marca, consistente con la identidad ya establecida del proyecto.
- ❌ No se detectó texto gigante sin propósito ni exceso de uppercase más allá de lo ya usado consistentemente en labels/eyebrows (patrón de marca, no genérico).

**Conclusión del check**: el sitio no cae en los clichés visuales típicos de "generado por IA" — los problemas reales encontrados (VIS-001 a VIS-006) son de **consistencia interna**, no de originalidad.

---

## LIMITACIONES DE ESTA RONDA

- No se auditó a fondo Servicios, Portafolio (más allá de su estado vacío ya revisado en la Fase 3-8), Mantenimiento, Contacto, ni el Panel Admin visualmente esta ronda — el foco se puso en Homepage/Vehículos/Accesorios por ser las páginas de mayor tráfico/conversión. Si se aprueban los hallazgos de esta ronda, una siguiente pasada debería cubrir esas páginas.
- No se probaron microinteracciones/hover/motion de forma sistemática — se navegó y se observó, pero no se aisló cada estado de hover uno por uno.
- El check de "icono+título+párrafo+botón×4" en Servicios queda marcado como pendiente, no como confirmado.
