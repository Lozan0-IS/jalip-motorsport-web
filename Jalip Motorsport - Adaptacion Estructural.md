# JALIP MOTORSPORT — ADAPTACIÓN ESTRUCTURAL

> **Superseded**: este documento tenía un error real — decía que Jalip "no tiene breadcrumbs en ningún archivo" cuando eso solo era cierto para el homepage (Vehículos y Accesorios sí los tienen). Ver `Website Reference - Stress Test v2 (UTV Unlimited to Jalip).md` para la versión corregida y con niveles de evidencia formales — es la fuente de verdad actual. Este archivo se conserva como historial, no como referencia vigente.

Basado en `UTV Unlimited - Analisis Estructural.md`. Este documento dice qué de esa estructura conviene a Jalip, qué no, y por qué — nunca copia visual, solo lógica de organización. Comparado contra el estado real actual de `Jalip Motorsport.dc.html`, `Vehiculos.dc.html`, `Accesorios.dc.html` (verificado leyendo/grepeando los archivos reales, no asumido).

## Nota honesta de partida

Buena parte de esta adaptación **ya ocurrió orgánicamente** en rondas anteriores de esta sesión, antes de que este skill existiera formalmente — el carrito con vehículos + método de pago, la ficha de producto con detalle, el carrito de pantalla completa con pasos/ITBIS/relacionados, y el copy honesto de "Retiro en el taller" ya están implementados y en producción. Este documento formaliza esas decisiones retroactivamente y señala qué del análisis de UTV Unlimited **todavía no se ha adoptado**, con la razón de por qué sí o no.

## MANTENER (ya adoptado, confirmar que sigue vigente)

| Patrón de UTV Unlimited | Estado en Jalip | Por qué aplica |
|---|---|---|
| CTA de WhatsApp con texto pre-rellenado como cierre de cotización | Ya implementado en las 3 páginas públicas (`cartWaText`, `apptWa`, etc.) | Jalip no tiene backend de pago/checkout real — WhatsApp como handoff humano es honesto y es exactamente el modelo real del negocio, no una imitación. |
| Carrito con desglose Subtotal/ITBIS/Total + pasos visuales + "también te puede interesar" | Implementado (commits `ac7ead3`, `7b431de`) | El usuario lo pidió explícitamente con referencia directa a `carrito.php`; ya se adaptó con el copy y disclaimers propios de Jalip, no el texto de UTV Unlimited. |
| Selección de método de pago como información para coordinar, no checkout real | Implementado, con disclaimer explícito ("Esto no procesa ningún pago...") | Coherente con que ni Jalip ni (según la propia UTV Unlimited) el método "tarjeta" tiene pasarela real todavía — honestidad sobre honestidad, no fabricación. |
| Tarjeta de producto: imagen → metadatos clave → precio → acción | Ya es el patrón en `parts`/`vehiclesAll` de los 3 archivos | Es un patrón genérico de catálogo, no una firma visual de UTV Unlimited — aplicable a cualquier tienda. |

## ADOPTAR (recomendado, no implementado todavía)

| Patrón de UTV Unlimited | Qué sería en Jalip | Por qué mejora, y qué falta para hacerlo bien |
|---|---|---|
| Breadcrumbs en páginas de catálogo/detalle ("Inicio > Tienda") | "Inicio > Accesorios" / "Inicio > Vehículos" en las páginas correspondientes | Jalip hoy no tiene breadcrumbs en ningún archivo (confirmado, cero coincidencias al buscar). Es barato de agregar y ayuda a orientar en un sitio con 3 páginas + secciones internas largas. No depende de ningún dato de negocio — se puede implementar directo. |
| Barra de métricas de confianza (años, marcas, soporte, clientes) | Una franja corta cerca del hero con 3-4 cifras reales de Jalip | **No implementable sin datos reales confirmados por el usuario** (años operando, cantidad de clientes, etc.) — exactamente el tipo de fabricación de cifras que las reglas del proyecto prohíben. Queda como propuesta pendiente de que el usuario confirme las cifras reales antes de construir nada. |
| Footer con las mismas taxonomías del sitio como links de salida (vehículos, servicios, info) | Reforzar el footer de Jalip con sub-links de categorías de Accesorios y modelos de UTV, no solo links de página | Jalip ya tiene footer (`Jalip Motorsport.dc.html:1363`) pero vale auditar si repite taxonomía de catálogo o solo son links de sección — mejora de navegación de salida, bajo riesgo, no depende de datos nuevos. |
| Selector de vehículo (Marca → Modelo → Año) para filtrar accesorios por compatibilidad | Filtro de compatibilidad en `Accesorios.dc.html` si el catálogo real de Jalip ya registra compatibilidad por parte | Depende de si el Panel Admin ya captura compatibilidad estructurada por producto (a confirmar leyendo el modelo de datos real de Accesorios) antes de prometer un filtro que no tendría con qué funcionar. |

## NO ADOPTAR (deliberadamente, con razón)

| Patrón de UTV Unlimited | Por qué NO aplica a Jalip |
|---|---|
| Tabla de precios de planes de Storage (almacenaje mensual) | Jalip no ofrece ese servicio — no hay línea de negocio equivalente confirmada. Copiar la sección sin el negocio real detrás sería fabricar un servicio que no existe. |
| Carrusel de "vehículos destacados" con HP/capacidad de pasajeros como badges | Aplicable en concepto, pero solo si Jalip ya tiene esos datos por vehículo cargados y correctos — no crear campos con placeholders solo para imitar la tarjeta. |
| Mega-catálogo con conteos de categoría (Accesorios 25, Protección 18…) | El catálogo real de Jalip es más chico; mostrar conteos falsos o desactualizados es peor que no mostrarlos. Si se adopta, los conteos deben calcularse en vivo del catálogo real (ya hay datos en `allProducts` para hacerlo sin fabricar nada). |
| Colores, tipografía, logo, fotografía, iconografía, copy exacto de UTV Unlimited | Regla dura del proyecto — Jalip mantiene su propio acento rojo (`#E11623`/`#C81120`) y nunca el verde lima ni ningún otro elemento visual de la competencia. |

## Journey de usuario — comparación

UTV Unlimited: Atención (hero multi-oferta) → Interés (productos destacados) → Exploración (vehículos + servicios) → Confianza (métricas + storage) → Conversión (WhatsApp / tienda).

Jalip hoy: ya sigue una forma similar en la homepage (hero → catálogo destacado → por qué Jalip → agenda de servicio → contacto), **sin** la etapa de "confianza cuantificada" (sin métricas, sin testimonios — igual que UTV Unlimited, que tampoco tiene testimonios). La única brecha real de journey es la ausencia de breadcrumbs para reforzar "dónde estoy" en sitios de 3 páginas — resto del journey ya está cubierto de forma propia y honesta.

## Siguientes pasos si el usuario quiere avanzar con "ADOPTAR"

1. Breadcrumbs — se puede implementar ya, sin pedir nada al usuario.
2. Footer con taxonomía — se puede auditar y mejorar ya.
3. Barra de métricas de confianza — **requiere que el usuario confirme cifras reales primero** (años operando, clientes, lo que sea cierto) antes de escribir una sola línea de código.
4. Filtro de compatibilidad — requiere confirmar primero si el modelo de datos de Accesorios en Panel Admin ya soporta compatibilidad estructurada.

Nada de esto se implementó en esta ronda — este documento es el resultado de Fase 15 (probar el skill), no una autorización para construir. Si el usuario quiere avanzar con algún ítem de "ADOPTAR", es una tarea aparte.
