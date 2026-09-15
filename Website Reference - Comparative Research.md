# WEBSITE REFERENCE — COMPARATIVE RESEARCH (Fase 3-5)

Ejecutado con el skill `website-reference` (v2, READY). Tres referencias adicionales a UTV Unlimited (ya cubierto en `Website Reference - Stress Test v2...md`), elegidas por aporte estructural distinto, no por parecido visual. Método: `WebFetch` para inventario estático + navegador real (Edge headless/CDP) en 1440/1024/768/390px con screenshots reales para responsive/interacción. Cada hallazgo lleva su etiqueta de evidencia.

---

## FASE 3 — SELECCIÓN DE REFERENCIAS

### Candidatas probadas y resultado

| Candidata | Categoría | Resultado |
|---|---|---|
| `can-am.brp.com` | A — Automoción/motorsport premium | Accesible, rico en contenido. **Seleccionada.** |
| `aesop.com` | B — Editorial/visual premium | Bloqueado por Cloudflare bot-check (WebFetch 403 y navegador real ambos mostraron el muro de verificación) — descartada. |
| `patagonia.com` | B — Editorial/adventure | Página de mantenimiento/caída al momento del fetch — descartada. |
| `yeti.com` | B — Editorial/adventure commerce | WebFetch 403 — descartada. |
| `pentagram.com` | B — Editorial/creative studio | Accesible, extremadamente rico en storytelling. **Seleccionada.** |
| `rockymountainatvmc.com` | C — Ecommerce/catálogo premium | Accesible vía WebFetch (contenido estático rico); **bloqueado por hCaptcha/Imperva** para el navegador real headless — responsive/interacción reales NO VERIFICABLES esta ronda. **Seleccionada de todas formas** por ser la referencia más directamente relevante de catálogo del mismo rubro (powersports), con la limitación declarada explícitamente, no ocultada.

Esto en sí mismo es un hallazgo honesto: varias marcas premium grandes bloquean tanto `WebFetch` como navegador automatizado — el skill debe seguir tratando esto como `[NOT VERIFIED]`, nunca simular el resultado.

### Scoring (0-10 por criterio, /100 total)

| CRITERIO | A — Can-Am | B — Pentagram | C — Rocky Mountain ATV/MC |
|---|---:|---:|---:|
| Arquitectura | 8 | 8 | 8 |
| Navegación | 7 | 9 | 7 |
| UX | 8 | 8 | 7 |
| Responsive | 7 (verificado, sin overflow en 4 anchos) | 9 (verificado completo) | 5 (bloqueado por CAPTCHA — NOT VERIFIED, puntaje penalizado por falta de evidencia real) |
| Interacciones | 5 (menú móvil NOT VERIFIED — cookie-consent en iframe bloqueó el clic automatizado) | 9 (menú móvil VERIFIED con clic real) | 4 (CAPTCHA bloqueó toda interacción real) |
| Conversión | 8 | 4 (portafolio, no ecommerce) | 8 |
| Catálogo | 7 | 6 (grid de proyectos, no producto) | 10 (buscador de compatibilidad por vehículo, reseñas, rango de precio) |
| Storytelling | 6 | 10 | 3 |
| Calidad visual (evaluación general, nunca para copiar) | 8 | 9 | 6 |
| Relevancia para Jalip | 10 (mismo rubro exacto) | 5 (aporta al Portafolio específicamente) | 10 (mismo rubro exacto — repuestos powersports) |
| **TOTAL** | **74/100** | **77/100** | **68/100** |

Las tres se seleccionan por aportar patrones **distintos y complementarios**, no por ser la "más bonita": A aporta arquitectura de catálogo automotriz + conversión comercial; B aporta storytelling/narrativa/tipografía — justo lo que le falta a Jalip en su sección de Portafolio; C aporta el patrón de catálogo/filtro/compatibilidad más profundo de las tres, directamente aplicable a Accesorios, aunque con evidencia de interacción incompleta por el bloqueo real de CAPTCHA.

---

## FASE 4 — AUDITORÍA COMPLETA

### REFERENCIA A — Can-Am (`can-am.brp.com`)

**A. Site Architecture** — Multi-página por línea de producto (SXS, ATV, 3-Wheel, Motorcycles) + secciones transversales (Accesorios, Build, Promociones, Dealer locator, Discover). `[VERIFIED]` (WebFetch)

**B. Navigation** — Nav primaria de 10+ ítems incluyendo un "More" expandible + selector de país/región. Header con banner promocional superpuesto arriba del nav. A 390px, el nav de texto colapsa a un ícono hamburguesa visible (confirmado por screenshot) pero el contenido del menú desplegado no pudo verificarse — un widget de consentimiento de cookies (Axeptio, en iframe) bloqueó la interacción automatizada real. `[VERIFIED]` la existencia del ícono; `[NOT VERIFIED]` el contenido del menú abierto.

**C. Homepage Structure** — 9 bloques: banner promocional → showcase de 4 categorías de vehículo → 4 tarjetas de oferta por categoría → destacado de producto nuevo → contenido on-road → promoción de eventos → CTA de dealer locator → tienda de accesorios por categoría → carrusel cross-brand. `[VERIFIED]`

**D. Page Structure** — División Off-Road (SXS/ATV) vs On-Road (3-Wheel/Motorcycles), cada familia de modelo con su propio link. `[VERIFIED]`

**E. User Journey** — Oferta/promoción → exploración de categoría → configurar/cotizar ("Build your Can-Am") → encontrar dealer → compra de accesorios. `[INFERRED]`

**F. Content Hierarchy** — El banner de descuento/promoción va primero, antes incluso del showcase de vehículos — prioriza conversión inmediata (oferta con urgencia) sobre exploración de catálogo. `[INFERRED]`

**G. Layout Patterns** — Grid de categorías (4 tarjetas) repetido varias veces con distinto contenido (showcase, ofertas); tienda de accesorios organizada por sub-categoría funcional (audio, partes, apparel, lubricantes). `[VERIFIED]`

**H. Interaction Patterns**

| ELEMENT | BEHAVIOR | PURPOSE | REUSABLE PATTERN | EVIDENCE |
|---|---|---|---|---|
| Header con banner promocional | banner fijo arriba del nav con CTA propio | urgencia de conversión sin competir con el nav | banner de oferta separado del nav, con su propio cierre (×) | VERIFIED |
| Ícono hamburguesa (≤768px aprox.) | ícono visible, colapsa el nav de texto | ahorrar espacio en mobile | NOT VERIFIED el contenido — bloqueado por cookie-consent en iframe | NOT VERIFIED |
| "Build your Can-Am" en nav primario | entrada directa a configurador desde cualquier página | poner el configurador al mismo nivel que "comprar" | CTA de configurador promovido a nivel de nav, no enterrado | VERIFIED (vía WebFetch) |
| Overflow horizontal | ninguno detectado en 1440/1024/768/390 | — | — | VERIFIED (`scrollWidth - clientWidth = 0` en los 4 anchos) |

**I. Scroll Narrative** — `[NOT VERIFIED]` — no se midió scroll real por falta de tiempo en esta ronda (el fetch estático da orden de secciones, no el ritmo real de scroll).

**J. Responsive Architecture**
```
Desktop (1440): nav completo + banner promocional visible.
Laptop (1024): sin overflow horizontal, estructura de grid se mantiene (VERIFIED por medición, no se inspeccionó visualmente el conteo exacto de columnas).
Tablet (768): sin overflow horizontal (VERIFIED).
Mobile (390): header colapsa a logo + hamburguesa, sin overflow horizontal (VERIFIED). Contenido del menú: NOT VERIFIED.
```

**K. Conversion Architecture** — Múltiples niveles de CTA: promoción con urgencia (banner) → exploración por categoría → configurador → dealer locator, todos accesibles desde nav primario, no solo desde contenido. `[VERIFIED]`

**L. Reusable Patterns** — CTA de configurador promovido a nivel de nav (no enterrado en submenú); banner de oferta separado del nav principal, con cierre propio; grid de categoría reutilizado consistentemente para distintos propósitos (showcase, ofertas, tienda).

**M. Non-Reusable Brand Elements** — Paleta amarillo/negro/rojo de Can-Am, su logo, tipografía, fotografía de producto, nombres de modelo (Defender, Maverick, etc. — no son el inventario de Jalip), el propio ecosistema de marcas BRP en footer.

---

### REFERENCIA B — Pentagram (`pentagram.com`)

**A. Site Architecture** — Sitio de portafolio de una sola gran página de inicio con secciones temáticas intercaladas + páginas de detalle de proyecto. `[VERIFIED]`

**B. Navigation** — 6 ítems (Work, About, News, Contact, Archive, Search), extremadamente plano. A 390px colapsa a un botón hamburguesa real (`button.btn.ham`) que, al hacer clic real, abre un **overlay de pantalla completa** con los mismos 6 ítems en tipografía grande + los links de footer (redes, newsletter, careers, privacidad, copyright) repetidos dentro del mismo overlay. `[VERIFIED]` — clic real ejecutado, confirmado por screenshot.

**C. Homepage Structure** — 16 bloques alternando: hero de proyecto destacado → grid de proyectos → sistema de filtro por categoría/disciplina → **secciones narrativas temáticas** (ej. "The Secret Life of Things", "Type Has Spirit") intercaladas entre grids de proyecto → galerías retrospectivas cronológicas (ej. "Shakespeare in the Park", 28 años) → bloques de cita de diseñador → secciones por sede (Londres, Nueva York). `[VERIFIED]`

**D. Page Structure** — Cada proyecto es una tarjeta (imagen + título + descripción corta + tags de categoría/sector clicables) que lleva a una página de detalle. `[VERIFIED]`

**E. User Journey** — Impacto visual inmediato (hero) → exploración de trabajo reciente → inmersión narrativa (las secciones temáticas cuentan una historia, no solo listan trabajo) → prueba de trayectoria (retrospectivas de décadas) → contacto. `[INFERRED]`

**F. Content Hierarchy** — Las secciones narrativas NO están agrupadas al final como "sobre nosotros" — están **intercaladas entre los grids de proyecto**, rompiendo la monotonía de "grid tras grid" y dando ritmo a la página. `[VERIFIED]` por el orden real observado.

**G. Layout Patterns** — Grid de tarjetas como base, roto deliberadamente por: bloques de cita (ancho completo, tipografía grande), galerías retrospectivas (carrusel cronológico con años como eje), y secciones narrativas (texto + pocas imágenes, no grid denso). `[VERIFIED]`

**H. Interaction Patterns**

| ELEMENT | BEHAVIOR | PURPOSE | REUSABLE PATTERN | EVIDENCE |
|---|---|---|---|---|
| Botón hamburguesa | clic real abre overlay de pantalla completa con nav + footer combinados | consolidar toda la navegación de salida en un solo lugar en mobile | menú móvil que dobla como mini-footer (nav + redes + legal en un mismo overlay) | VERIFIED |
| Tags de categoría/disciplina en tarjetas | clicables, filtran/navegan | permitir explorar por tipo de trabajo sin un menú de filtro separado | filtro incrustado en la tarjeta misma, no en una barra aparte | INFERRED (visto en estructura, no se completó un clic de filtro real esta ronda) |
| Overflow horizontal | ninguno detectado en 1440/1024/768/390 | — | — | VERIFIED |

**I. Scroll Narrative** — 0%: hero de proyecto. ~10-30%: grid + filtro. ~30-45%: primera sección narrativa ("Secret Life of Things"). ~45-60%: retrospectiva + cita. ~60-100%: alternancia de grids nuevos y secciones narrativas hasta el footer. `[INFERRED]` a partir del orden de 16 bloques listados, no de una medición real de scroll-por-porcentaje.

**J. Responsive Architecture**
```
Desktop (1440): nav de texto completo, grids multi-columna.
Laptop (1024): sin overflow horizontal (VERIFIED).
Tablet (768): sin overflow horizontal (VERIFIED).
Mobile (390): nav colapsa a hamburguesa; overlay de pantalla completa con tipografía grande de un solo link por línea; sin overflow horizontal (VERIFIED).
```

**K. Conversion Architecture** — Casi no hay conversión comercial — es un sitio de portafolio, el "CTA" dominante es "ver proyecto" o "contactar". Relevante para Jalip solo en su sección de Portafolio, no como modelo de conversión comercial general. `[VERIFIED]`

**L. Reusable Patterns** — Secciones narrativas intercaladas entre grids de contenido (ritmo, no monotonía); menú móvil que combina nav + footer en un solo overlay; galería retrospectiva cronológica como forma de mostrar trayectoria/historial de trabajo real.

**M. Non-Reusable Brand Elements** — Tipografía serif de marca, paleta blanco/negro editorial, el nombre y logo "Pentagram", las citas de diseñadores específicos, los proyectos mostrados (son de sus clientes, no aplican a Jalip).

---

### REFERENCIA C — Rocky Mountain ATV/MC (`rockymountainatvmc.com`)

**A. Site Architecture** — Ecommerce profundo, taxonomía por marca OEM (12 fabricantes) × tipo de vehículo (Dirt Bike/ATV/UTV/ADV/Street/E-Bike) × categoría de producto. `[VERIFIED]` (WebFetch)

**B. Navigation** — Múltiples niveles de menú (marca, tipo de vehículo, categoría de gear con 24+ subcategorías). Responsive/interacción real: **bloqueado por hCaptcha (Imperva)** — el navegador headless recibió una página de verificación de seguridad en vez del sitio real. `[NOT VERIFIED]`

**C. Homepage Structure** — 12 bloques: header con teléfono de servicio → banner promocional → carrusel hero → **"Machine finder"** (selector Tipo/Año/Marca/Modelo + "Saved Machines") → grid de mantenimiento (32 productos con precio y rating) → grids promocionales → "Top Sellers" → cierre de temporada/paquetes → grids por tipo de vehículo → "Why Choose Us" → banner de reseñas de cliente → footer. `[VERIFIED]` (WebFetch)

**D. Page Structure** — `[NOT VERIFIED]` — no se pudo navegar a una página de categoría/producto real por el bloqueo de CAPTCHA.

**E. User Journey** — Encontrar mi vehículo (machine finder) → mantenimiento recurrente → ofertas → exploración por tipo. `[INFERRED]`

**F. Content Hierarchy** — El "machine finder" aparece **antes** que cualquier grid de producto — el sitio asume que el usuario no sabe qué necesita hasta identificar su vehículo exacto, así que resuelve eso primero. `[INFERRED]`

**G. Layout Patterns** — Tarjeta de producto con imagen + nombre + precio + **rating con estrellas y texto exacto** ("Rated 4.45 out of five stars") — un elemento de prueba social a nivel de producto individual que ninguna de las otras 3 referencias tiene. `[VERIFIED]` (WebFetch)

**H. Interaction Patterns**

| ELEMENT | BEHAVIOR | PURPOSE | REUSABLE PATTERN | EVIDENCE |
|---|---|---|---|---|
| Machine finder (Tipo/Año/Marca/Modelo + guardar máquinas) | selector progresivo + memoria de vehículos guardados | resolver compatibilidad de una vez, reutilizable en visitas futuras | selector de compatibilidad con "guardar mi vehículo" para no repetirlo cada visita | INFERRED (visto en contenido, no se completó el flujo con clics reales) |
| Todo lo demás (filtros, menú móvil, CTAs) | — | — | — | NOT VERIFIED — CAPTCHA bloqueó toda interacción real del navegador |

**I. Scroll Narrative** — `[NOT VERIFIED]`

**J. Responsive Architecture** — `[NOT VERIFIED]` — el navegador real recibió la página de CAPTCHA en todos los anchos probados, no el sitio real.

**K. Conversion Architecture** — Múltiples CTAs de conversión (Shop, Chat, Track Order, filtros de precio como CTA) + banner de reseñas de cliente cerca del final — refuerza confianza justo antes del footer. `[VERIFIED]` (WebFetch)

**L. Reusable Patterns** — Selector de compatibilidad con memoria ("guardar mi vehículo"); rating con estrellas + texto exacto a nivel de tarjeta de producto individual (prueba social granular, no solo una barra de métricas genérica); banner de reseñas de cliente posicionado cerca del footer.

**M. Non-Reusable Brand Elements** — Paleta e identidad de marca de Rocky Mountain ATV/MC, su logo, sus insignias de confianza (BBB, Comodo, PCI — esas son certificaciones de ELLOS, Jalip no puede mostrarlas sin tenerlas realmente), su catálogo de productos y marcas que vende.

---

## FASE 5 — DO NOT COPY / BORROW (consolidado de las 3 referencias)

### DO NOT COPY
Paletas y tipografías de marca de las 3 (amarillo/negro de Can-Am, blanco/negro editorial de Pentagram, la identidad de Rocky Mountain ATV/MC). Logos, fotografía de producto, nombres de modelo/marca que no son de Jalip. Los proyectos/clientes mostrados por Pentagram. Las insignias de certificación de terceros (BBB, Comodo, PCI) que pertenecen a Rocky Mountain, no a Jalip. Composición visual exacta de cualquiera de los 3 heroes/grids/menús.

### BORROW THE STRUCTURE
- CTA de configurador/build promovido a nivel de nav primario (Can-Am).
- Banner de oferta separado del nav, con cierre propio (Can-Am).
- Secciones narrativas intercaladas entre grids de contenido, para dar ritmo (Pentagram) — **aplicable directamente al Portafolio de Jalip**.
- Menú móvil que combina nav + info de contacto/redes en un solo overlay (Pentagram, y ya parcialmente en UTV Unlimited).
- Selector de compatibilidad con memoria de vehículo guardado (Rocky Mountain, inferido).
- Rating por producto individual como prueba social granular, si алgún día hay reseñas reales (Rocky Mountain) — **bloqueado por falta de reseñas reales, ver Gap Analysis**.
- Banner de reseñas de cliente cerca del footer, como refuerzo de confianza antes de la salida (Rocky Mountain) — mismo bloqueo de datos reales.

---

## FASE 5 — MATRIZ MAESTRA DE PATRONES (combinada, incluye UTV Unlimited)

| PATTERN | SOURCE | PURPOSE | EVIDENCE | JALIP CURRENT STATE | DECISION |
|---|---|---|---|---|---|
| Header persistente al hacer scroll | UTV Unlimited | mantener nav/carrito accesibles | VERIFIED | ALREADY EXISTS | ALREADY ADOPTED |
| Nav móvil agrupado por categoría + CTAs fijos al fondo | UTV Unlimited, Pentagram (variante: nav+footer combinados) | acceso completo al nav sin perder jerarquía | VERIFIED (ambas) | nav móvil de Jalip es lista plana, sin agrupar | ADAPT — bajo valor real dado que el nav de Jalip ya es corto (5 ítems) |
| CTA de configurador/build a nivel de nav primario | Can-Am | poner la herramienta más valiosa al mismo nivel que "comprar" | VERIFIED | Jalip no tiene configurador propio activo en nav (existe `#configurador` como sección, no como entrada de nav destacada) | NOT NEEDED — el "configurador" de Jalip es una sección de showcase, no una herramienta interactiva de build; promoverlo en nav no cambia su función |
| Banner de oferta separado del nav con cierre propio | Can-Am | urgencia de conversión | VERIFIED | Jalip no tiene banner de oferta (no hay ofertas/promociones reales confirmadas) | BLOCKED — REAL BUSINESS DATA REQUIRED |
| Secciones narrativas intercaladas entre grids | Pentagram | dar ritmo, contar historia real de trabajo | VERIFIED | Portafolio de Jalip ya maneja bien el estado vacío, pero cuando SÍ haya proyectos reales, hoy sería solo grid — sin narrativa intercalada | ADAPT — aplicar cuando existan proyectos reales publicados (no antes; no hay contenido narrativo que inventar todavía) |
| Menú móvil combinando nav + contacto/redes en un solo overlay | Pentagram, UTV Unlimited | consolidar toda la salida de navegación en mobile | VERIFIED (ambas) | nav móvil de Jalip es plano, sin agrupar ni combinar con footer | ADAPT — mismo razonamiento que arriba, valor bajo con solo 5 ítems |
| Selector de compatibilidad con memoria ("guardar mi vehículo") | Rocky Mountain ATV/MC | evitar repetir el filtro en cada visita | INFERRED (no verificado por CAPTCHA) | Accesorios de Jalip ya tiene filtro de compatibilidad, sin memoria entre visitas | ADOPT (parcial) — la memoria es una mejora real y barata (localStorage), el resto ya existe |
| Rating por producto individual | Rocky Mountain ATV/MC | prueba social granular | VERIFIED (WebFetch) | Jalip no tiene reseñas de clientes en ningún producto | BLOCKED — REAL BUSINESS DATA REQUIRED (no inventar reseñas) |
| Banner de reseñas de cliente cerca del footer | Rocky Mountain ATV/MC | reforzar confianza antes de salir | VERIFIED (WebFetch) | no existe | BLOCKED — REAL BUSINESS DATA REQUIRED |
| Barra de métricas de confianza | UTV Unlimited | prueba social cuantificada | VERIFIED | no existe | BLOCKED — REAL BUSINESS DATA REQUIRED (ya documentado en la ronda anterior) |
| Breadcrumbs en catálogo | UTV Unlimited, implícito en todas | orientación | VERIFIED | ALREADY EXISTS (Vehículos, Accesorios) | ALREADY ADOPTED |
| Filtros de catálogo (categoría/compatibilidad/precio) | UTV Unlimited, Rocky Mountain | filtrar catálogo | VERIFIED | ALREADY EXISTS | ALREADY ADOPTED |
| Desglose de impuestos + pasos visuales en carrito | UTV Unlimited (carrito.php) | transparencia de costo | VERIFIED | ALREADY EXISTS y más completo que lo visto en las 3 nuevas referencias | ALREADY ADOPTED |
| Memoria de vehículo guardado ("saved machines") aplicado al carrito de Jalip | Rocky Mountain ATV/MC (inferido) | reducir fricción de filtro repetido | INFERRED | no existe | ADOPT — ver Plan de Implementación, P2 |

**No se registra ningún "maybe"** — cada fila tiene una decisión concreta, incluyendo `BLOCKED` explícito donde la mejora real depende de datos de negocio que el usuario no ha confirmado.
