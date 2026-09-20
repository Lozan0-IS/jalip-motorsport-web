# WEBSITE REFERENCE — UTV UNLIMITED, SITIO COMPLETO → JALIP MOTORSPORT

Skill `website-reference`, modo análisis (solo lectura: no se modificó ningún archivo del sitio de Jalip).
Referencia: `https://utvunlimited.com/` · Proyecto destino: Jalip Motorsport · Objetivo: sitio completo · Fecha: 2026-09-20.
Este documento **profundiza y corrige** `UTV Unlimited - Analisis Estructural.md` y `Website Reference - Stress Test v2 (...)`, que solo habían verificado la página de inicio, dos anchos y el menú móvil.

**Regla de este proyecto:** las ideas de abajo son *propuestas*. Nada se implementa hasta que apruebes cuáles (ver "Puerta de aprobación").

## Etiquetas de evidencia

`VERIFIED` observado directamente (navegador real: medido, clicado o capturado) · `INFERRED` conclusión razonable no presenciada · `NOT VERIFIED` se pudo probar y no se probó · `UNKNOWN` no hay información. Las lecturas de contenido con `WebFetch` (que no ejecuta JS) se marcan `FETCH`: sirven para el inventario de texto, no para comportamiento.

## Alcance real de la prueba

- **16 páginas cargadas (14 plantillas distintas)** en Edge real, cada una medida a **1440, 1024, 768 y 390 px** (estructura, títulos con su posición en la página, botones, cuadrículas, desborde horizontal, navegación, encabezado fijo) con capturas: inicio, vehículos, marca (Can-Am y Polaris), ficha de vehículo, tienda (con y sin categoría), storage, servicios, nosotros, blog, contacto, garantías, privacidad, carrito, mi cuenta.
- **Interacción real:** carrusel (3 capturas), hover con el mouse, selector de máquina en cascada, buscar, categoría, ordenar, limpiar filtros, paginación, tarjeta de producto, agregar al carrito, página del carrito, ficha de vehículo.
- **No se envió ningún formulario** del sitio ajeno (es un negocio real); solo se inspeccionaron sus campos.
- **Límites:** no se probó la galería de la ficha de vehículo (13 miniaturas, comportamiento no confirmado), el bloque "Otros modelos" (0 enlaces detectados), ni el flujo de pago (no se avanza de "Envío").

---

# STRUCTURAL DNA

## A. SITE ARCHITECTURE
Multipágina PHP, ~16 plantillas, **una URL real por cosa**: `vehiculos.php` → `marca.php?slug=&tipo=` → `modelo.php?slug=&marca=&tipo=`; `tienda.php` → `producto.php?id=`; `storage.php`, `servicios.php`, `nosotros.php`, `blog.php`, `contacto.php`, `garantias.php`, `privacidad.php`, `carrito.php`, `mi-cuenta.php`. `VERIFIED`
Profundidad máxima 3 clics hasta una ficha (inicio → marca → modelo; inicio → tienda → producto). `VERIFIED`

## B. NAVIGATION
- Encabezado **fijo** al hacer scroll (top = 0 tras bajar el 60 % en las 16 páginas). `VERIFIED`
- Escritorio: 6 enlaces (Vehículos, Tienda, Storage, Servicios, Nosotros, Blog) + cuenta + carrito con contador + botón "Contáctanos"; 10–11 enlaces visibles en el encabezado a 1440 y **también a 1024**; a 768 baja a 3–4 y aparece hamburguesa. El colapso ocurre entre 1024 y 768. `VERIFIED` (medido) / límite exacto `INFERRED`
- Móvil: overlay con enlaces agrupados por categoría (Catálogo / Servicios / Info) y dos CTAs fijos abajo (WhatsApp, Contáctanos). `VERIFIED` (ronda anterior, con clic real)
- Franja superior con **cinta de textos en movimiento** (propuestas de valor: especialistas Can-Am/Polaris, servicio técnico, storage, grúa 24/7). `VERIFIED`
- Migas de pan en 11 de las 16 páginas; **no** las tienen el inicio, nosotros, blog, carrito ni mi cuenta (detección por atributo/clase, `VERIFIED` donde existen, "no detectadas" donde no). `VERIFIED`
- Burbuja flotante de WhatsApp en todas las páginas. `VERIFIED` (capturas)

## C. HOMEPAGE STRUCTURE (posición real en la página)
| Y | Bloque | Función |
|---|---|---|
| 0–5 % | Hero **carrusel de 3 slides** con flechas y 3 puntos | 3 ofertas: equipamiento Can-Am, línea Polaris, storage |
| ~13 % | Barra de 4 cifras (10+, 3, 24/7, 500+) | prueba de confianza sin fuente |
| 19 % | Accesorios y partes (16 tarjetas) | entrada de bajo compromiso |
| 32 % | Vehículos destacados (3) | inventario |
| 50 % | Servicios (4 tarjetas numeradas) | servicios recurrentes |
| 61 % | Elige tu plan (3 planes de storage) | ingreso recurrente |
| 79 % | Nuestra tienda (6 categorías con conteo) | navegación de catálogo |
| 90 % | Visítanos (ubicación, WhatsApp, cómo llegar) | cierre físico |
`VERIFIED` (posiciones medidas; función `INFERRED`)

## D. PAGE STRUCTURE
- **Vehículos:** dos grupos (Nuevos / Usados certificados) × marca; cada tarjeta lleva a un listado ya filtrado, no a una ficha. Cierra con "¿Tienes un UTV para vender?" y "Asesórate con nuestros expertos". `VERIFIED`
- **Ficha de vehículo:** migas, galería (13 elementos tipo miniatura), pestañas de especificaciones (Motor / Chasis / Dimensiones / Equipamiento), botones "Solicitar cotización", "Consultar por WhatsApp", "Consultar financiamiento", "Ficha técnica", "Otros modelos", "Visítanos y prueba el tuyo". `VERIFIED` (la pestaña "Historial y certificación" que dio `FETCH` **no aparece** en un vehículo nuevo → `NOT VERIFIED`, probablemente solo en usados).
- **Tienda:** título + selector de máquina (Marca → Modelo → Año → Buscar) + rango de precio (Desde/Hasta + Aplicar) + orden (4 opciones) + chips de categoría con conteo ("Todos 57") + cuadrícula de 12 + paginación (Anterior 1 2 … 5 Siguiente) + "Limpiar filtros" + contador "— N productos encontrados". `VERIFIED`
- **Ficha de producto:** solo título, migas, 3 imágenes y 3 botones (Contáctanos, Agregar al carrito, Consultar por WhatsApp). Sin pestañas, sin datos estructurados, sin descripción meta. `VERIFIED`
- **Servicios:** 9 tarjetas (servicio técnico, venta, partes, accesorios, detailing, recogida y entrega, grúa 24/7, financiamiento, storage), sección "Build & personalización" (6 áreas, un solo CTA), proceso de financiamiento en 4 pasos, formulario de pre-aprobación. `FETCH` + estructura (4 títulos de sección) `VERIFIED`
- **Storage:** hero, "más que un garaje", 2 ubicaciones, planes, comparativa en tabla, proceso en 4 pasos, FAQ, cierre con WhatsApp. `FETCH` + 7 secciones `VERIFIED`
- **Contacto:** 4 tarjetas de canal, formulario, dirección, horarios, redes, newsletter. `FETCH`
- **Garantías:** página larga con secciones A–F por tipo de producto y aceptación de la política. `FETCH`
- **Nosotros:** historia, 6 valores, equipo (4 roles), marcas, ubicación. `FETCH`
- **Blog:** 6 categorías y **una sola publicación** (fecha, título; sin extracto, sin buscador). `FETCH`

## E. USER JOURNEY
Atención (hero rotativo) → Interés (accesorios, vehículos) → Exploración (marca → modelo; tienda con selector de máquina) → Confianza (cifras, garantías, equipo) → Conversión: **tres vías**: WhatsApp con texto prellenado (dominante), carrito con envío (solo piezas) y formularios (financiamiento, contacto). `INFERRED` a partir de las posiciones y CTAs medidos.

## F. CONTENT HIERARCHY
Lo comercial va antes que lo institucional: catálogo de piezas (bajo compromiso) → vehículos → servicios recurrentes → planes → tienda → ubicación. Institucional (nosotros, garantías, privacidad) solo en pie de página. `INFERRED`

## G. LAYOUT PATTERNS
Cuadrículas que bajan de columnas por ancho: inicio 4 cols (1440) → 2 (1024) → 1–2 (390); tienda 3 → 2 → 2; servicios 3 → 2 → 1; ficha de vehículo 12 cols → 6 cols. Tarjeta de producto: imagen → categoría → nombre → precio → botón "Agregar". `VERIFIED` (medido con `gridTemplateColumns`)

## H. INTERACTION PATTERNS
| ELEMENT | BEHAVIOR | PURPOSE | REUSABLE PATTERN | EVIDENCE |
|---|---|---|---|---|
| Carrusel del hero | avanza solo (~4-5 s por slide; a los 9 s ya estaba en el slide 3), flechas prev/next, 3 puntos, la flecha desde el último regresa al primero; **sin botón de pausa** | mostrar 3 ofertas en un solo espacio | (no recomendable, ver "Patrones a evitar") | VERIFIED (3 capturas) |
| Botón principal (CTA) | al pasar el mouse cambia transformación y fondo | dar feedback | estado hover claro en el CTA | VERIFIED |
| Enlace del menú | al pasar el mouse **no cambia nada visible** | — | — | VERIFIED |
| Selector de máquina | Marca habilita Modelo (Maverick R, X3, Defender…) y este habilita Año (2026/2025/2024); "Buscar" → "35 productos encontrados" | filtrar por compatibilidad real | selector progresivo con opciones dependientes | VERIFIED |
| Filtros combinados | compatibilidad + categoría se **intersectan**: "Motor" tras Can-Am Maverick R dio **0 productos** | acotar | filtros acumulables con contador de resultados | VERIFIED |
| Estado de filtros | tras filtrar, ordenar y paginar la **URL no cambia** (`location.search` vacío) | — | (anti-patrón: resultado no compartible) | VERIFIED |
| Orden | 4 opciones (relevancia, precio ↑, precio ↓, nombre A-Z) | ordenar | orden simple y claro | VERIFIED |
| Tarjeta de producto | clic en la imagen navega a `producto.php?id=49` | detalle indexable | una URL por producto | VERIFIED |
| "Agregar" | aviso no bloqueante ("… agregado al carrito") y el contador del carrito pasa de 0 a 1; el visitante sigue en la lista | permitir agregar varios sin interrupciones | aviso + contador en lugar de abrir el carrito | VERIFIED |
| Carrito | pasos (Carrito · Envío · Pago · Confirmación), cantidad −/+, "Vaciar", "Eliminar", tipo de cliente (Persona/Empresa), país con prefijo telefónico, dirección, notas, **cupón** | checkout completo | (no aplica a Jalip, ver decisiones) | VERIFIED (hasta "Envío"; no se paga) |
| Mi cuenta | Entrar / Crear cuenta (correo + contraseña) | cuentas de cliente | — | VERIFIED (solo campos) |
| Menú móvil | overlay agrupado con CTAs fijos | acceso completo en poco espacio | menú móvil agrupado + CTAs | VERIFIED (ronda anterior) |
| Galería de la ficha de vehículo | 13 elementos; el clic en la 3.ª miniatura no produjo un contador visible | — | — | NOT VERIFIED |
| "Otros modelos" | 0 enlaces a `modelo.php` detectados | — | — | NOT VERIFIED |

## I. SCROLL NARRATIVE (inicio, 6 259 px de alto a 1440)
0 %: hero rotativo y cinta de valor · ~13 %: cifras · 19 %: piezas · 32 %: vehículos · 50 %: servicios · 61 %: planes · 79 %: tienda por categoría · 90 %: ubicación · pie. El ritmo alterna catálogo (rejilla) con bloques de servicio (tarjetas numeradas) y cierra con lo físico. `VERIFIED` (posiciones) / interpretación `INFERRED`

## J. RESPONSIVE ARCHITECTURE
```
1440: menú completo, cuadrículas de 3–4 columnas.
1024: menú completo (11 enlaces); cuadrículas a 2 columnas.
 768: menú colapsa a hamburguesa (entre 1024 y 768).
 390: 1 columna en servicios y planes; 2 en tienda.
```
**Desbordes horizontales medidos en la propia referencia:** vehículos 91 px (1024) y 219 px (768) · tienda 54 px (1024) · ficha de vehículo 18 px (390) · contacto 53 px (390). `VERIFIED` (`scrollWidth − clientWidth`).

## K. CONVERSION ARCHITECTURE
- CTA dominante: **WhatsApp con texto prellenado** (por servicio y por plan: "Hola, me interesa el Storage Black"). `VERIFIED`
- Cada ficha de vehículo ofrece tres acciones a la vez (cotizar, WhatsApp, financiamiento) junto al precio "con ITBIS incluido". `FETCH`
- Prueba de confianza: barra de cifras, garantías con página propia, equipo con roles. **Sin testimonios ni reseñas.** `VERIFIED`/`FETCH`
- Promesa explícita "respondemos en menos de 24 horas" (dos veces en contacto). `FETCH` — es un compromiso del negocio de la referencia, no de Jalip.
- Carrito con envío internacional y cupón. `VERIFIED`

## L. REUSABLE PATTERNS
1. Una **URL propia y compartible** por vehículo y por producto (e idealmente por resultado filtrado).
2. **Aviso no bloqueante + contador** al agregar al carrito, sin interrumpir la navegación.
3. Selector de compatibilidad progresivo (Marca → Modelo → Año) con contador de resultados.
4. WhatsApp con **texto prellenado por servicio/producto** como cierre principal.
5. Páginas de política (garantía por tipo de producto, privacidad) enlazadas desde el pie.
6. Proceso explicado en pasos numerados (financiamiento, storage) y FAQ en el servicio que lo necesita.
7. Precio "con impuestos incluidos" declarado junto al precio.
8. Encabezado fijo + migas de pan + menú móvil agrupado.

## M. NON-REUSABLE BRAND ELEMENTS
Paleta negro y verde lima, logotipo y wordmark, fotografías de vehículos y de taller, tipografía condensada de titulares, textos exactos ("Potencia americana sin límites", etc.), nombres Can-Am/Polaris/BRP como línea de negocio, el servicio de storage y sus planes, el blog, la dirección de Los Prados, los nombres del equipo, las cifras 10+/3/24-7/500+.

---

# DO NOT COPY
Colores y verde lima de la marca · logo · fotografías (vehículos, taller, equipo) · tipografía y jerarquía de titulares · textos y eslóganes exactos · composición del hero y de las tarjetas · cinta animada de texto · nombres de marcas y modelos como si fueran inventario de Jalip · precios, planes y cifras · cualquier código, HTML o CSS.

# BORROW THE STRUCTURE
Una URL por elemento compartible · aviso no bloqueante con contador al agregar · selector de compatibilidad progresivo · WhatsApp con texto prellenado por servicio · páginas de política enlazadas desde el pie · explicación en pasos donde el servicio es complejo · precio con impuestos aclarado · encabezado fijo con migas y menú móvil agrupado.

---

# PATRONES A EVITAR (la referencia los hace mal)
| Problema | Evidencia | Por qué importa a Jalip |
|---|---|---|
| **Sin meta descripción en ninguna de las 16 páginas cargadas** y sin canónica en ninguna; sin datos estructurados en la ficha de producto | medido: descripción de 0 caracteres en 16 de 16; canónica en 0 de 16; 0 JSON-LD en la ficha de producto | Jalip **ya** tiene descripción y JSON-LD en las 3 páginas públicas: es una ventaja a conservar |
| **3 títulos H1 en el inicio** (uno por slide del carrusel) y **ningún H1** en la ficha de vehículo, el carrito ni mi cuenta | medido: inicio 3; ficha de vehículo, carrito y mi cuenta 0; el resto 1 | una página, un H1: Jalip tiene 1 por página |
| **Carrusel automático sin pausa** | avanza solo, sin control | accesibilidad (movimiento que el usuario no puede detener) y dilución del mensaje |
| **Desbordes horizontales** en vehículos, tienda, ficha y contacto | 91/219/54/18/53 px medidos | Jalip tiene 0 px en 21 combinaciones ancho × página |
| **Filtros que no cambian la URL** | `location.search` vacío | un resultado filtrado no se puede mandar por WhatsApp |
| **Precios que se contradicen** | hero: "planes desde $150/mes"; página de storage: Gold $125, Platinum $200, Black $300 | una sola fuente de datos de precios (Jalip ya la tiene: Firestore) |
| Blog con **una sola publicación** | 1 entrada en 6 categorías | un blog vacío resta confianza |
| Enlace del menú sin estado hover | sin cambio visible | feedback inconsistente |

---

# BASELINE VERIFICADO DE JALIP (hoy, leyendo el código real)
| Tema | Estado | Evidencia |
|---|---|---|
| Encabezado fijo, migas de pan en Vehículos y Accesorios, menú móvil con overlay | ALREADY EXISTS | sesiones anteriores + capturas |
| Filtros (marca/estado/disponibilidad/año en vehículos; categoría, compatibilidad, precio, búsqueda, orden en accesorios) | ALREADY EXISTS | pruebas de esta sesión |
| Ficha en **modal** (vehículo y producto) | ALREADY EXISTS, pero **sin URL propia**: abrir el modal no cambia la URL (0 `pushState`/`replaceState`); solo `Vehiculos.dc.html#<clave>` abre un vehículo al cargar y `Accesorios.dc.html#<categoría>` elige categoría | `location.hash` leído en el arranque de cada página |
| Estado de filtros en la URL | MISSING | ninguno lo escribe |
| Al pulsar "Agregar al carrito" | **abre el carrito a pantalla completa** (`cartOpen: true`); no hay aviso no bloqueante (0 apariciones de "toast") | `addToCart` en Accesorios/Vehículos/Inicio |
| Carrito con pasos, ITBIS, recogida en taller, método de pago informativo | ALREADY EXISTS y más simple/honesto que el de la referencia (sin envío, cupón ni pago) | sesiones anteriores |
| WhatsApp con texto prellenado (servicios, cotizaciones, citas, carrito) | ALREADY EXISTS | código |
| Meta descripción, JSON-LD, un H1 por página | ALREADY EXISTS (ventaja sobre la referencia) | 3/3 páginas |
| Canónica, sitemap, 404, páginas de privacidad y garantía | MISSING | `website-state.md` F-001…F-005 + 0 páginas de política; hay una casilla "acepto la política de privacidad" en el formulario de citas sin página de política a la cual enlazar |
| Prueba social (cifras, reseñas, equipo) | MISSING y **BLOCKED** — requiere datos reales | regla del proyecto |
| Blog, storage, financiamiento, cuentas de cliente | NOT NEEDED / UNKNOWN (líneas de negocio no confirmadas) | — |

---

# TABLA DE DECISIONES
| PATTERN | SOURCE | PURPOSE | TARGET APPLICATION | DECISION |
|---|---|---|---|---|
| Aviso no bloqueante + contador al agregar | tienda de la referencia | agregar varios sin perder el hilo | toast breve con "Ver carrito"; el carrito solo se abre desde el ícono | **ADAPT** |
| URL compartible por elemento | `producto.php?id`, `modelo.php?slug` | mandar un enlace por WhatsApp | mantener modales pero escribir `#v=…`/`#p=…` al abrirlos y leerlos al cargar; opcionalmente reflejar filtros | **ADAPT** |
| Selector Marca → Modelo → Año | tienda | compatibilidad real | Jalip solo tiene texto libre de compatibilidad por producto; requiere datos estructurados que hoy no existen | **ADAPT** (bloqueado por datos, ver P2) |
| WhatsApp con texto prellenado por servicio | servicios/storage | conversión directa | ya existe | **ALREADY ADOPTED** |
| Páginas de garantía y privacidad | garantías, privacidad | confianza y cumplimiento | páginas propias con los términos reales del taller | **ADOPT** la estructura; **contenido BLOCKED** (términos reales + revisión legal) |
| Proceso en pasos numerados por servicio | financiamiento, storage | reducir dudas | solo donde el taller confirme cómo trabaja (p. ej. cómo funciona una modificación o una cita) | **ADAPT** (contenido pendiente del dueño) |
| Promesa "respondemos en < 24 h" | contacto | expectativa | no publicar sin confirmación del dueño | **BLOCKED** |
| Barra de cifras, equipo, testimonios | inicio, nosotros | confianza | requiere datos reales | **BLOCKED** |
| Formulario de financiamiento | servicios | captar leads | no se sabe si Jalip financia | **BLOCKED — UNKNOWN** |
| Carrusel automático del hero | inicio | varias ofertas | el hero de Jalip es una sola propuesta clara | **REJECT** |
| Cinta de textos en movimiento | franja superior | propuestas de valor | movimiento continuo sin control | **REJECT** |
| Carrito con envío internacional, cupón, tipo de cliente | carrito | vender piezas por internet | Jalip: recogida en taller, sin pagos en línea | **REJECT** (contradice los hechos del negocio) |
| Cuentas de cliente (Mi cuenta) | mi cuenta | recompra | no hay pedidos en línea | **REJECT** |
| Blog | blog | contenido | requiere producción constante; la referencia tiene 1 entrada | **REJECT** |
| Storage / planes mensuales | storage | ingreso recurrente | no es un servicio confirmado de Jalip | **REJECT** |
| Paginación de 12 por página | tienda | catálogos grandes | el catálogo de Jalip es más chico y ya se organiza por categorías | **NOT NEEDED** |
| Encabezado fijo, migas, menú móvil | todo el sitio | orientación | ya existe | **ALREADY ADOPTED** |
| Colores, tipografía, logo, fotografías, textos | todo el sitio | identidad | identidad propia de Jalip | **REJECT** |

---

# GAP ANALYSIS (Jalip)
| REFERENCE PATTERN | JALIP CURRENT STATE | GAP | RECOMMENDATION | PRIORITY |
|---|---|---|---|---|
| Agregar sin interrupción | **abre el carrito a pantalla completa** cada vez | quien cotiza varias piezas debe cerrar el carrito tras cada una | toast breve ("X agregado · Ver carrito") + contador ya existente; el carrito se abre solo con el ícono | **P1** |
| Enlace directo por elemento | modal sin URL | no se puede mandar por WhatsApp "esta unidad" o "esta pieza" desde la página | escribir/leer un hash al abrir/cerrar el modal (sin `pushState` múltiple: `replaceState`) en Vehículos y Accesorios | **P1** |
| Filtros en URL | no | resultado filtrado no compartible | reflejar categoría/compatibilidad/orden en el hash | **P2** |
| Páginas de privacidad y garantía | no existen; el formulario de citas pide aceptar una política **sin enlace** | fricción legal y de confianza | crear las páginas cuando el dueño entregue los términos reales; enlazar desde el pie y desde la casilla | **P1** — bloqueado por contenido (revisión legal recomendada) |
| Selector de compatibilidad por modelo | radio Todas/Can-Am/Polaris/Universal | filtro grueso | solo si el dueño carga compatibilidad estructurada por producto | **P2** — bloqueado por datos |
| Proceso en pasos | ya existe en Portafolio ("Nos escribes / Te cotizamos / Se publica") | no en Servicios | replicar el patrón por servicio con pasos confirmados | **P2** |
| Prueba social | ninguna | — | recopilar datos reales | **BLOCKED** |
| Canónica, sitemap, 404 | ausentes | SEO técnico (no viene de esta referencia) | ver hallazgos F-001…F-004 en `website-state.md` | ya registrado; **al comprar el dominio** |

**P0: ninguno.** Jalip ya supera a la referencia en SEO básico, responsive (0 px de desborde), accesibilidad del hero y coherencia de precios.

## Nota para la fase de lanzamiento (cuando compres dominio y hosting)
La referencia tiene páginas reales por producto y por vehículo; Jalip usa modales dentro de un solo archivo, y esas fichas **no se pueden indexar una por una** en buscadores. Un hash compartible (P1 de arriba) resuelve el compartir por WhatsApp, **no** el posicionamiento. Si el SEO del catálogo importa al lanzar, hay que decidir entonces si conviene generar páginas estáticas por producto. Queda anotado para esa fase.

---

# PUERTA DE APROBACIÓN
Nada de lo anterior está implementado. Para avanzar dime qué aprobar; propongo este orden, de menor a mayor riesgo:

1. **P1 · Aviso no bloqueante al agregar al carrito** (cambia el comportamiento del botón "Agregar" en las 3 páginas). Riesgo bajo; se verifica con clic real y sin romper el carrito compartido.
2. **P1 · Enlace directo por vehículo y por producto** (hash al abrir el modal). Riesgo bajo-medio: hay que respetar los hashes que ya existen (`#trade-in`, `#<categoría>`, `#<clave de vehículo>`).
3. **P2 · Filtros reflejados en el hash.**
4. **Bloqueados por ti:** términos de garantía y privacidad, compatibilidad por modelo, cifras reales, promesa de respuesta, si Jalip ofrece financiamiento.

Todas las verificaciones futuras se harán con el mismo método (Edge real, dos perfiles aislados para Firebase, comparación contra el sitio anterior).

---

# RESULTADO DE LA IMPLEMENTACIÓN (2026-09-20, aprobado por el usuario)

Aprobadas e implementadas las tres propuestas que no dependían de datos del negocio. Las demás siguen **bloqueadas** (garantía y privacidad, compatibilidad por modelo, cifras, promesa de respuesta, financiamiento).

| # | Cambio | Dónde | Verificado con navegador real |
|---|---|---|---|
| 1 | **Aviso no bloqueante al agregar al carrito**: aparece "X agregado al carrito" con botón "Ver carrito", se cierra solo a los 6 s o con la ×, se sigue navegando; el carrito ya no se abre a pantalla completa en cada "Agregar". Región `role=status` para lectores de pantalla; sube sobre la burbuja de WhatsApp en móvil. | Inicio, Vehículos, Accesorios | contador 0→1, carrito no se abre, "Ver carrito" lo abre, cierre automático, el aviso queda por encima de una ficha abierta, sin desborde a 390 px |
| 2 | **Enlace directo por vehículo y por producto**: al abrir una ficha la dirección pasa a `#<unidad>` / `#p-<producto>` (sin agregar entradas al historial), se limpia al cerrarla, y ese enlace abre la misma ficha en un navegador nuevo. | Vehículos, Accesorios | ficha `#v2` y `#p-roof-4` abiertas desde un navegador limpio; `#v1`, `#trade-in`, `#susp` siguen funcionando |
| 3 | **Filtros reflejados en la dirección**: `?marca=&estado=&disp=&anio=` en Vehículos y `?cat=&compat=&orden=&disp=&q=` en Accesorios; solo se aceptan valores conocidos (`?marca=XXX` se ignora). | Vehículos, Accesorios | un enlace filtrado muestra las mismas tarjetas en el mismo orden en un navegador nuevo; "Limpiar" vacía la dirección |

**Defecto propio corregido de paso:** la ficha de producto de Accesorios (hecha en una ronda anterior) no se cerraba con la tecla Escape; ahora sí.

Regresión: 4 páginas sin errores JS, 0 px de desborde en 21 combinaciones ancho × página, y con los datos reales el texto, las imágenes y las 11 categorías de accesorios son idénticos a la versión anterior.
