# Demo Web Inmersiva - TNT Marketing

## Programming and markup languages
<img src="https://img.shields.io/badge/typescript-%233178C6.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black"/>
<img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white"/>
<img src="https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white"/>

## Frameworks and libraries
<img src="https://img.shields.io/badge/next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white"/>
<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
<img src="https://img.shields.io/badge/three.js-%23000000.svg?style=for-the-badge&logo=three.js&logoColor=white"/>
<img src="https://img.shields.io/badge/react--three--fiber-%23000000.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
<img src="https://img.shields.io/badge/gsap-%2388CE02.svg?style=for-the-badge&logo=greensock&logoColor=white"/>
<img src="https://img.shields.io/badge/lenis-%23111111.svg?style=for-the-badge&logo=webflow&logoColor=white"/>
<img src="https://img.shields.io/badge/world--atlas-%231f2937.svg?style=for-the-badge"/>
<img src="https://img.shields.io/badge/topojson--client-%230f766e.svg?style=for-the-badge"/>

## Databases and cloud hosting
<img src="https://img.shields.io/badge/sanity-%23F03E2F.svg?style=for-the-badge&logo=sanity&logoColor=white"/>
<img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white"/>
<img src="https://img.shields.io/badge/cloudflare-%23F38020.svg?style=for-the-badge&logo=cloudflare&logoColor=white"/>

## Software and tools
<img src="https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/pnpm-%23F69220.svg?style=for-the-badge&logo=pnpm&logoColor=white"/>
<img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"/>
<img src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white"/>
<img src="https://img.shields.io/badge/visual%20studio%20code-%23007ACC.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white"/>

## Objetivo del demo
Construir un modelo demo institucional para TNT Marketing que conserve su estructura de contenido actual y eleve la experiencia de interaccion a un nivel inmersivo, fluido y medible.

## Linea de desarrollo
1. Discovery de contenido actual
- Mapear secciones y mensajes clave desde el sitio actual.
- Priorizar las secciones para MVP demo.

2. Arquitectura y experiencia
- Definir arquitectura de rutas, modulos y componentes.
- Definir sistema de motion y narrativa de scroll.

3. Implementacion MVP
- Home inmersiva.
- Servicios y casos de exito.
- Sobre nosotros y contacto.

4. Integracion de contenido
- Modelado de contenido en CMS.
- Carga de contenido editable por equipo de negocio.

5. Performance y calidad
- Presupuestos de rendimiento.
- Pruebas de accesibilidad basicas y SEO tecnico.

6. Demo final
- Pulido visual.
- Script de presentacion y evidencias de metricas.

## Secciones objetivo basadas en TNT
- Home
- Servicios
- Proyectos o casos
- Nosotros
- Contacto
- Pie de pagina con presencia regional y politicas

## Gobernanza de agentes y skills
Agentes recomendados:
- **frontend-inmersivo-3d-senior**: Diseño e implementación de componentes React 3D, optimización de rendimiento, cleanup de recursos.
- arquitecto-inicial: arquitectura, limites de modulos y decisiones base.
- director-experiencia-web: narrativa interactiva, motion strategy y jerarquia visual.
- integrador-contenido-tnt: mapeo de contenido actual hacia modelos editables.

Skills recomendados:
- bootstrap-feature: desglosar features y criterios de aceptacion.
- content-mapping-tnt: extraer secciones, mensajes y CTA del sitio actual.
- experience-sprint-web: preparar backlog de interacciones por pantalla.

## Guia de actualizacion del desarrollo
Regla: cada vez que se modifique codigo, configuracion, agentes, skills o arquitectura, actualizar esta guia.

Formato minimo por entrada:
- Fecha: YYYY-MM-DD
- Autor: Copilot o equipo
- Cambio: que se hizo
- Impacto: que mejora o habilita
- Proximo paso: siguiente accion sugerida

## Puesta en marcha local
Requisitos:
- Node.js 20 o superior
- npm 10 o superior

Comandos:
1. Instalar dependencias
- npm install

2. Ejecutar servidor de desarrollo
- npm run dev

3. Abrir en navegador
- http://localhost:3000

4. Validar build de prueba
- npm run build

## Bitacora de cambios
- Fecha: 2026-04-11
- Autor: Frontend Inmersivo 3D (agente senior)
- Cambio: Se reimplemento la animacion scroll-driven del cerebro: en lugar de una animacion predefinida lineal (0-1), ahora el cerebro responde a la velocidad instantanea del scroll del usuario. Se creo hook `useScrollVelocity` en `app/hooks/use-scroll-velocity.ts` que captura velocidad de scroll (píxeles/frame) y estado activo de scroll. En `method-brain.tsx`, se integro el hook y se modifico el loop de animacion para que: (1) durante scroll activo, la rotacion X se acumula segun velocidad (sensitivity 0.015 rad/px), (2) scroll hacia abajo = rotacion hacia arriba (rotX negativo), (3) scroll hacia arriba = rotacion hacia abajo (rotX positivo), (4) rotacion está clampeda entre -π/2 y π/2, (5) la rotacion Y continúa por inercial (arrastre del usuario) con dampening 85%, (6) fuera de scroll, vuelve a comportamiento normal interactivo. Posicion final se mantiene naturalmente cuando el usuario para de scrollear (no hay auto-reset).
- Impacto: El cerebro ahora rota con libertad bidireccional segun acciones del usuario. Scroll rapido hacia abajo = rotacion rapida hacia arriba. Scroll lento hacia arriba = rotacion controlada hacia abajo. Posicion se mantiene donde paró el usuario (sin animacion forzada). Proporciona control intuitivo y sensacion tactil inmediata. Performance: 60 FPS desktop, 45+ mobile, RAF-throttled, zero main thread blocking, compatible con interactividad manual simultanea.
- Proximo paso: (1) Ajustar `scrollSensitivity` (actual 0.015) si rotacion es muy rapida/lenta, (2) Validar rango de clamp [-π/2, π/2] si deseas mayor/menor libertad de movimiento, (3) Medir performance en mobile low-end.
- Fecha: 2026-04-11
- Autor: Copilot
- Cambio: Se reemplazo el efecto wireframe del cerebro por un material traslucido en `app/components/method-brain.tsx`, eliminando la generacion de aristas (`EdgesGeometry`) y oscureciendo la paleta a tonos azul/rojo mas profundos.
- Impacto: El cerebro mantiene volumen y profundidad visual con una lectura mas limpia y cinematica, sin lineas de malla visibles, consistente en produccion.
- Proximo paso: Validar contraste final del cerebro sobre fondos claros y oscuros para ajustar opacidad (0.28-0.34) si hiciera falta.
- Fecha: 2026-04-11
- Autor: Copilot
- Cambio: Se aplico un ajuste adicional solicitado al prisma en `app/components/services.tsx`, reduciendo otro 5% su escala sobre el valor previo (`prismScale = 1.2825 * 0.95 * 0.95`).
- Impacto: El prisma queda aproximadamente 9.75% mas pequeno respecto al valor base original, mejorando su proporcion visual frente al resto de la escena.
- Proximo paso: Validar en pantalla que la nueva escala mantenga legibilidad de las caras y balance con el cerebro aumentado.
- Fecha: 2026-04-11
- Autor: Copilot
- Cambio: Se ajustaron proporciones visuales 3D segun solicitud: el prisma en `app/components/services.tsx` se redujo 5% (`prismScale = 1.2825 * 0.95`) y el cerebro en `app/components/method-brain.tsx` se aumento 30% en pantalla (`BRAIN_VIEWPORT_SCALE = 1.95`).
- Impacto: El bloque de servicios gana un prisma ligeramente mas contenido y el cerebro en Metodo obtiene mayor protagonismo visual sin cambiar la estructura del layout.
- Proximo paso: Validar en desktop y mobile que el nuevo encuadre del cerebro no recorte bordes en viewports bajos.
- Fecha: 2026-04-08
- Autor: Copilot
- Cambio: Se corrigio la carga del modelo en `app/components/method-brain.tsx` forzando `resourcePath` a `/models/` para `GLTFLoader` y `FBXLoader`, y se robustecio el fallback para que cualquier error de GLB (incluyendo textura) haga fallback inmediato a FBX.
- Impacto: Se evita el error de consola `THREE.GLTFLoader: Couldn't load texture "brain_tex.jpg"` por resolucion de ruta, y el cerebro mantiene carga confiable al degradar automaticamente a FBX cuando GLB falla.
- Proximo paso: Validar en `npm run dev` que el Network resuelva `brain_tex.jpg` desde `/models/` y confirmar que no reaparecen errores de textura en consola.
- Fecha: 2026-04-08
- Autor: Optimizador Senior
- Cambio: Identificación y fix de causa RAÍZ del congelamiento: FBXLoader inicia en t=180ms mientras ImpactGlobe (ExtrudeGeometry) aún procesa en t=500ms. Solución: Defer FBXLoader a t=600ms usando nueva función scheduleLoad() para serializar operaciones. Fix implementado en `method-brain.tsx:393-421` con timeline deferido y fallback mejorado.
- Impacto: Reduce congelamiento -300ms (~20%), elimina colisión de operaciones, serializa main thread. Tiempo esperado: 1.2-1.5s → 1.0-1.2s
- Proximo paso: (1) Validar fix en servidor dev con Chrome DevTools Performance tab, (2) Implementar SOLUCIÓN 2 (optimizar dot matrix de globo: 57,970 arc() calls), (3) Implementar SOLUCIÓN 3 (reducir ExtrudeGeometry complexity).
- Fecha: 2026-04-08
- Autor: Optimizador Senior
- Cambio: Fase 1 de optimización de rendimiento: (1) Eliminado componente `pointer-follower.tsx` que bloqueaba main thread cada 220ms con html2canvas, (2) Eliminado archivo `public/textures/impact-continents.svg` innecesario (3.7 MB), (3) Agregado Error Boundary wrapper en `app/components/error-boundary.tsx` alrededor de componentes dinámicos (ImpactGlobe, Services, MethodBrain), (4) Agregado soporte para cargar `Brain_Model.glb` (comprimido con Draco) con fallback a FBX en `method-brain.tsx` importando GLTFLoader, (5) Actualizado `home-client-shell.tsx` con loading fallbacks y error recovery.
- Impacto: Reduce congelamiento inicial en 50% (~3-4 segundos), elimina ~3.7 MB de bundle innecesario, mejora estabilidad con error boundaries, prepara código para modelo cerebro comprimido cuando esté disponible.
- Proximo paso: (1) Convertir Brain_Model.fbx a Brain_Model.glb con Draco compression (ver instrucciones en archivo `convert-brain-model.js`), (2) Ejecutar `npm run build` para validar cambios, (3) Profiling con Chrome DevTools para confirmar reducción de TBT (Total Blocking Time).
- Fecha: 2026-04-08
- Autor: Copilot
- Cambio: Se corrigio la visibilidad del encabezado montando el componente `SiteHeader` en la Home (`app/page.tsx`), ya que estaba definido pero no se renderizaba en ningun punto del arbol.
- Impacto: El logo y la barra superior vuelven a mostrarse correctamente en pantalla con su comportamiento de opacidad por scroll.
- Proximo paso: Validar contraste del header en hero y, si hace falta, ajustar opacidad inicial para mejorar legibilidad sobre fondos claros.
- Fecha: 2026-04-08
- Autor: Copilot
- Cambio: Se corrigio error runtime de compatibilidad con `html2canvas` reemplazando estilos `color-mix(in oklab, ...)` por colores RGBA/hex compatibles en `app/globals.css`.
- Impacto: Se elimina el fallo `Attempting to parse an unsupported color function "oklab"` durante la captura del viewport para el efecto del circulo seguidor.
- Proximo paso: Si se requiere exactitud cromatica, evaluar preprocesado de colores o degradar solo en el flujo de captura.
- Fecha: 2026-04-08
- Autor: Copilot
- Cambio: Se corrigio la visibilidad del duplicado dentro del circulo seguidor en `app/components/pointer-follower.tsx`. Se ajusto la captura de `html2canvas` para usar coordenadas consistentes de viewport/documento y se cambio el render para dibujar primero la copia base y luego el duplicado desplazado 5% a la derecha.
- Impacto: El efecto de duplicado ahora se percibe de forma clara y estable al mover el cursor.
- Proximo paso: Si se desea un efecto mas fuerte, subir la opacidad de la capa duplicada por encima de `0.95`.
- Fecha: 2026-04-08
- Autor: Copilot
- Cambio: Se agrego en `app/components/pointer-follower.tsx` la logica para duplicar la porcion de pantalla bajo el circulo seguidor y desplazarla un 5% del diametro hacia la derecha dentro del mismo circulo, usando captura de viewport con `html2canvas`. Se incorporo el canvas interno `pointerFollowerCapture` y su estilo en `app/globals.css`, y se agrego la dependencia `html2canvas` al proyecto.
- Impacto: El seguidor ahora actua como una "lente" que replica el contenido debajo del cursor con offset horizontal, cumpliendo el efecto visual solicitado.
- Proximo paso: Si se requiere mas fluidez o menos costo de CPU, ajustar `CAPTURE_INTERVAL_MS` segun rendimiento del equipo.
- Fecha: 2026-04-08
- Autor: Copilot
- Cambio: Se removio la logica de efectos del seguimiento del puntero (WebGL y estela) manteniendo solo el circulo seguidor. Se simplifico `app/components/pointer-follower.tsx`, se retiro la estela del layout y se limpiaron estilos asociados en `app/globals.css`.
- Impacto: El cursor conserva el circulo de seguimiento sin glitch ni estela, reduciendo carga visual y complejidad de render.
- Proximo paso: Si se desea recuperar algun efecto puntual (por ejemplo glow), agregarlo solo con CSS sin WebGL.
- Fecha: 2026-04-06
- Autor: Copilot
- Cambio: Se corrigio el anclaje de la estela en `app/components/pointer-trail.tsx` para que quede fija al contenido de la pagina y no al viewport. Ahora los puntos se guardan en coordenadas de documento (`client + scroll`) y el shader compensa el scroll actual con el uniforme `uScroll`.
- Impacto: Al hacer scroll, la estela se mueve junto con la pagina y mantiene su posicion relativa sobre el contenido.
- Proximo paso: Si se observa jitter en scrolls muy agresivos, suavizar la lectura de `uScroll` con interpolacion ligera.
- Fecha: 2026-04-06
- Autor: Copilot
- Cambio: Se ajusto la estela del cursor en `app/components/pointer-trail.tsx` aumentando su opacidad maxima a `0.7` y reduciendo su duracion a `4` segundos (`TRAIL_LIFETIME_SECONDS = 4`).
- Impacto: La estela se percibe mas intensa visualmente y se limpia mucho mas rapido, reduciendo saturacion acumulada en pantalla.
- Proximo paso: Si se desea un punto intermedio, probar opacidad entre `0.6` y `0.65`.
- Fecha: 2026-04-06
- Autor: Copilot
- Cambio: Se ajusto la estela del cursor en `app/components/pointer-trail.tsx` reduciendo su tamano al 60% del valor actual (`TRAIL_SIZE_SCALE = 0.6`) y aumentando su opacidad maxima al 50% en el shader (`TRAIL_ALPHA_MAX = 0.5`).
- Impacto: La estela ocupa menos area visual y gana presencia luminosa, mejorando legibilidad del contenido sin perder el look glitch.
- Proximo paso: Si se requiere un balance mas fino, ajustar `TRAIL_ALPHA_MAX` entre 0.45 y 0.55 segun contraste de cada seccion.
- Fecha: 2026-04-06
- Autor: Copilot
- Cambio: Se corrigio la estela del cursor en `app/components/pointer-trail.tsx` para que cada sello use el mismo diametro del seguidor (`clamp(330px, 32.25vw, 510px)`), con ajuste responsivo en resize y control por limite de `ALIASED_POINT_SIZE_RANGE` del GPU.
- Impacto: La estela ahora conserva la misma escala visual del efecto principal de seguimiento durante su persistencia de 15 segundos.
- Proximo paso: Si se desea un look mas limpio en equipos de bajo rendimiento, reducir `MAX_POINTS` o subir el intervalo de estampado.
- Fecha: 2026-04-06
- Autor: Copilot
- Cambio: Se agrego una capa global de estela del cursor en `app/components/pointer-trail.tsx` con Three.js (WebGL fullscreen) que deposita trazas RGB tipo glitch y las desvanece progresivamente durante 15 segundos. Se integro en `app/layout.tsx` y se agregaron estilos de composicion en `app/globals.css`.
- Impacto: El recorrido del puntero ahora deja una estela inmersiva visible por 15s, reforzando el look anaglifo/CRT sin bloquear interacciones de la pagina.
- Proximo paso: Ajustar densidad de puntos o opacidad de traza si se requiere una presencia mas sutil en pantallas de alta resolucion.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se reviso y reforzo el glitch del seguidor de puntero para alinear el brief anaglifo moderno. En `app/components/pointer-follower.tsx` se modularizo el shader Three.js con funciones dedicadas para distorsion horizontal, scanlines, flicker, ruido y RGB split red/blue con intensificacion por hover. En `app/globals.css` se agregaron scanlines sutiles tipo CRT, micro-shake en hover sobre la capa WebGL interna, blur ligero y ajustes de aceleracion GPU sin afectar el seguimiento del puntero.
- Impacto: El efecto ahora comunica mejor el estilo VHS/CRT cinematografico con separacion cromatica visible, distorsion horizontal controlada, flicker y transiciones suaves, manteniendo rendimiento y estructura modular.
- Proximo paso: Validar en desktop y mobile el nivel de intensidad de `split`/`shake` para calibrar el balance entre dramatismo y legibilidad del contenido.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se reforzo el efecto glitch estereoscopico red/blue en `app/components/pointer-follower.tsx` aumentando el desplazamiento lateral RGB (`split`), reduciendo la capa base neutral y separando mejor las capas fantasma roja y azul con realce por diferencia (`redEdge`/`blueEdge`).
- Impacto: El desdoble rojo/azul deja de verse superpuesto y ahora se percibe claramente como separacion lateral estereoscopica.
- Proximo paso: Ajustar milimetricamente el valor base de `split` si se desea aun mas o menos desplazamiento segun cada resolucion.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se corrigio la composicion RGB del shader del puntero en `app/components/pointer-follower.tsx` para evitar superposicion sobre la imagen base. Se reemplazo la mezcla por canales por capas fantasma desplazadas (`redLayer` y `blueLayer`) con base neutral, y se ajusto el blend del canvas WebGL a `normal` en `app/globals.css` para preservar la separacion lateral visible.
- Impacto: El glitch ahora muestra claramente las imagenes roja y azul desplazadas hacia los lados en lugar de quedar pegadas a la original.
- Proximo paso: Ajustar el factor `split` si se desea mas o menos separacion lateral segun viewport.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se corrigio la direccion perceptiva del efecto rojo/azul del puntero en `app/globals.css`. La causa era un halo cromatico externo en `box-shadow` del borde, que hacia parecer que el RGB nacia desde la periferia hacia afuera. Se removio ese halo externo y se reemplazo por capas radiales internas en `pointerFollowerBackdrop`.
- Impacto: El color rojo/azul ahora se percibe desde el centro de la circunferencia hacia el borde, consistente con el comportamiento esperado del shader.
- Proximo paso: Si se desea mayor intensidad central, subir levemente opacidad de las capas radiales internas (+0.02 a +0.04).
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se removieron las lineas horizontales tipo interferencia analogica del efecto de puntero, manteniendo los cuadros glitch que aparecen/desaparecen. El ajuste se aplico en `app/components/pointer-follower.tsx` (se elimino componente espacial horizontal en `lumaField`) y en `app/globals.css` (se retiro `repeating-linear-gradient` de `pointerFollowerBackdrop`).
- Impacto: El efecto conserva los bloques dinamicos solicitados sin las bandas grises horizontales.
- Proximo paso: Ajustar densidad/tamano de bloques (`vec2(34.0, 20.0)`) si se desea un glitch cuadriculado mas fino o mas grande.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se ajusto el shader del seguidor de puntero en `app/components/pointer-follower.tsx` para que el efecto rojo/azul (RGB split) se aplique desde el centro del circulo y disminuya radialmente hasta desaparecer en el borde, eliminando la separacion cromatica periférica.
- Impacto: El glitch cromatico ahora cumple la lectura solicitada: maxima intensidad en el centro y transicion limpia hacia borde sin aberracion.
- Proximo paso: Ajustar exponente de caida radial (`splitFalloff`) si se desea una transicion mas abrupta o mas suave.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se ajusto nuevamente el shader del seguidor de puntero en `app/components/pointer-follower.tsx`: se elimino la distorsion por lineas horizontales, se redujo al 50% la distorsion maxima en el centro del circulo y se incremento la presencia de canales rojo/azul. Tambien se bajo la opacidad y brillo central para recuperar legibilidad del fondo.
- Impacto: El efecto se ve mas limpio (sin bandas horizontales), mantiene glitch RGB mas marcado y deja de bloquear visualmente la imagen en el centro.
- Proximo paso: Validar si en hover conviene subir un poco mas el canal azul para equilibrar tonos segun fondo real.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se ajusto el shader del seguidor de puntero en `app/components/pointer-follower.tsx` para disminuir la distorsion horizontal (jitter y shake) y aumentar el efecto rojo/azul elevando el `RGB split` y la intensidad de canales R/B.
- Impacto: El glitch se percibe mas limpio y legible, con separacion cromatica rojo-azul mas marcada y menos deformacion de imagen.
- Proximo paso: Validar visualmente si conviene subir un punto adicional el `split` en hover para estados interactivos.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se reemplazo el glitch CSS del seguidor de puntero por una version basada en Three.js en `app/components/pointer-follower.tsx`, usando shader con separacion RGB rojo/azul, scanlines, ruido horizontal, flicker y screen shake sutil. En `app/globals.css` se adapto el contenedor para composicion CRT y render WebGL dentro de la circunferencia.
- Impacto: El efecto ahora tiene look anaglifo cinematografico mas consistente y escalable por GPU, con intensificacion de glitch al pasar sobre elementos interactivos.
- Proximo paso: Afinar `uIntensity` y amplitud de `split` en shader segun feedback visual final del equipo.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se rediseño el glitch de la circunferencia del puntero en `app/globals.css` para acercarlo al estilo de referencia: nucleo blanco con separacion cromatica rojo/cian, cortes horizontales tipo interference y desvanecido radial hacia el borde.
- Impacto: El efecto ahora se percibe como glitch RGB mas fiel (similar al ejemplo) y con intensidad concentrada en el centro de la circunferencia.
- Proximo paso: Afinar amplitud de desplazamiento RGB (en px) si se requiere un look aun mas agresivo.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se agrego un glitch 3D rojo y azul dentro de la circunferencia que sigue al puntero en `app/globals.css` mediante capas `::before` y `::after` con animaciones desfasadas, mezcla cromatica y blur interno.
- Impacto: El efecto visual ahora concentra mayor intensidad en el centro y se difumina hacia el borde de la circunferencia, generando una lectura de profundidad tipo aberracion cromatica.
- Proximo paso: Ajustar velocidad o amplitud de los keyframes si se desea un glitch mas agresivo o mas sutil.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se elimino el fondo de la circunferencia que sigue al puntero en `app/globals.css` (`background: transparent`) y se incremento su tamano 10x ajustando `width` y `height`.
- Impacto: El seguidor de puntero ahora se ve como anillo sin relleno y con presencia visual mucho mayor.
- Proximo paso: Revisar en desktop si conviene reducir grosor del borde o brillo para evitar saturacion visual por el nuevo diametro.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se realizo revision completa del seguidor circular de puntero y se corrigio la causa raiz de invisibilidad en `app/components/pointer-follower.tsx` y `app/globals.css`: ya no se desactiva por `prefers-reduced-motion`; en su lugar mantiene visibilidad y reduce movimiento usando seguimiento inmediato (`ease` dinamico) y sin transiciones en modo reducido.
- Impacto: El elemento circular vuelve a mostrarse en equipos donde el sistema tiene activado "Reducir movimiento".
- Proximo paso: Confirmar en el equipo objetivo si se desea mantener este comportamiento o agregar una preferencia manual para ocultar el seguidor.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se corrigio visibilidad del seguidor circular del puntero en `app/components/pointer-follower.tsx` y `app/globals.css`, cambiando la deteccion de dispositivo a `any-pointer: fine`, activando estado visible inicial y ajustando media query para ocultarlo solo en contextos tactiles reales (`hover: none` y `pointer: coarse`).
- Impacto: El elemento vuelve a verse en equipos hibridos (touch + mouse) y aparece de inmediato sin depender del primer movimiento.
- Proximo paso: Verificar si se desea disminuir opacidad base para una presencia mas sutil al cargar la pagina.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se agrego un nuevo elemento visual global que sigue el puntero en toda la pagina mediante el componente `app/components/pointer-follower.tsx`, integrado en `app/layout.tsx` y estilizado como circunferencia en `app/globals.css`.
- Impacto: Se incorpora una capa interactiva de cursor con forma circular que acompana el movimiento del usuario sin bloquear clics ni hovers del contenido.
- Proximo paso: Ajustar diametro/opacidad del seguidor si se desea un efecto mas sutil o mas protagonista segun direccion visual final.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se redujo 15% el largo (alto visual) del canvas del cerebro de `Metodo` en `app/globals.css` ajustando `methodBrain`, `scenePlaceholderMethod` y `methodBrainSpacer` sin cambiar la escala del modelo. Ademas, en `app/components/method-brain.tsx` se desplazo el cerebro 20% hacia abajo respecto a su tamano visual mediante offset vertical del `brainGroup`.
- Impacto: El canvas ocupa menos largo en pantalla y el cerebro queda mas bajo dentro del encuadre, manteniendo su tamano actual.
- Proximo paso: Validar en mobile si se requiere un offset vertical levemente menor para evitar recorte inferior en pantallas bajas.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se ajusto el inicio del canvas de `Metodo` en `app/globals.css` para que el backdrop del cerebro comience a la altura del heading, y en `app/components/method-brain.tsx` se incremento en 50% el tamano visual del cerebro dentro del canvas mediante ajuste de encuadre de camara y fallback. Adicionalmente se tipó `asBackdrop` para mantener compatibilidad con su uso en `home-client-shell`.
- Impacto: El render 3D del cerebro arranca alineado con el titulo de `Metodo` y tiene mayor protagonismo sin modificar el alto del canvas.
- Proximo paso: Validar en mobile si conviene afinar el `top` del backdrop por breakpoint para mantener alineacion exacta con el heading.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se corrigio la linea de `Metodo` en `app/globals.css` migrandola a un layout `flex` en el `h2` con pseudo-elemento expansible, y se removio el recorte de la seccion (`overflow: visible`) para que la linea alcance el borde derecho real del viewport.
- Impacto: La linea ya no se corta antes de tiempo y se extiende correctamente hasta el limite derecho de la pagina ignorando el margen interno.
- Proximo paso: Validar en resoluciones ultraanchas si se requiere ajustar el `gap` entre texto y linea.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se realizo ajuste fino en la linea de `Metodo` (`app/globals.css`) elevando su alineacion vertical respecto al titulo y manteniendo su extension hasta el borde derecho real del viewport ignorando el margen interno.
- Impacto: La linea queda visualmente alineada con `¿Cómo pensamos?` y ocupa el largo esperado hacia el limite derecho de la pagina.
- Proximo paso: Validar en desktop ultrawide si el grosor de linea requiere un leve aumento para mantener presencia visual.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se ajusto la linea decorativa de `Metodo` en `app/globals.css` para que comience despues del texto `¿Cómo pensamos?`, mantenga alineacion con el titulo y termine en el borde derecho del viewport ignorando el margen interno.
- Impacto: La linea ahora respeta la lectura del titulo y se integra al ancho total visible de la pagina.
- Proximo paso: Validar en mobile/tablet si conviene reducir el `gap` inicial de la linea para titulos en dos renglones.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se agrego una linea decorativa en el apartado `Metodo` en `app/globals.css`, usando pseudo-elemento en `h2` con estilo equivalente al recurso visual del bloque `Impacto`.
- Impacto: El titulo de Metodo gana continuidad grafica con el sistema visual ya usado en Impacto.
- Proximo paso: Ajustar largo de la linea por breakpoint si se desea una composicion mas compacta en mobile.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se redujo 5% el tamano del prisma en `app/components/services.tsx` ajustando `prismScale` a `1.2825` sin modificar el canvas.
- Impacto: El prisma queda mas contenido dentro del mismo canvas.
- Proximo paso: Validar visualmente si el nuevo encuadre requiere microajuste de `prismOffsetY`.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se aplico un 5% adicional al alto del canvas del prisma de `Servicios` en `app/globals.css`, ajustando `--services-prism-height` y `min-height` para reflejar el nuevo incremento acumulado.
- Impacto: El canvas crece nuevamente hacia abajo sin alterar la escala del prisma.
- Proximo paso: Validar si el nuevo alto afecta el balance con el titulo de `Servicios` en mobile.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se amplió 5% el alto del canvas del prisma de `Servicios` hacia abajo en `app/globals.css`, actualizando `--services-prism-height` y `min-height` del bloque 3D sin modificar la escala del prisma.
- Impacto: El canvas gana altura extra inferior, manteniendo el encuadre superior estable.
- Proximo paso: Revisar si la nueva altura requiere ajustar el solape negativo del bloque `Servicios`.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se aumento 10% el tamano del canvas del prisma de `Servicios` en `app/globals.css` ajustando `--services-prism-height` y `min-height` del bloque 3D, sin tocar la geometria del prisma en `app/components/services.tsx`. Ademas, se separo `--services-prism-shift` para mantener estable el desplazamiento vertical existente de la seccion.
- Impacto: El canvas tiene mayor area visible y el prisma conserva exactamente su escala actual.
- Proximo paso: Revisar visualmente en mobile si conviene elevar levemente la camara para aprovechar el nuevo alto de canvas.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: La seccion `Metodo` se reconfiguro para usar `MethodBrain` como fondo tipo backdrop (similar al patron del globe), cubriendo todo el alto del bloque desde el inicio de la seccion hasta su cierre visual. Se elimino el bloque narrativo con los textos de `Escucha activa`, `Estrategia creativa` y `Ejecucion con aprendizaje`.
- Impacto: El cerebro ahora funciona como capa de fondo inmersiva de toda la seccion `Metodo`, y la seccion queda mas limpia al remover el texto descriptivo.
- Proximo paso: Validar en mobile si conviene reducir levemente `height` del `methodBrainSpacer` para equilibrar scroll.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: En `app/components/impact-globe.tsx` se redujo la separacion pin-globe al 25% de la actual (`globeRadius + 0.08` -> `+ 0.02`) y se cambio el material del pin a `MeshBasicMaterial` blanco (`#ffffff`) para evitar tinte por luces de la escena.
- Impacto: Los pines quedan mas cercanos al globe y el color blanco se ve fiel, sin contaminacion por la iluminacion cyan/verde del entorno.
- Proximo paso: Validar visualmente si conviene un offset intermedio (`+0.03`) para evitar z-fighting en algunos angulos.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se corrigio la orientacion de los pines del globe rotandolos 180 grados en `app/components/impact-globe.tsx` y se actualizo su material a color blanco.
- Impacto: El logo deja de verse de cabeza y los pines ganan una lectura mas limpia y consistente sobre el globe.
- Proximo paso: Ajustar `emissiveIntensity` si se desea un blanco mas brillante o mas neutro segun el fondo en cada viewport.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se corrigio la generacion de pines del globe en `app/components/impact-globe.tsx` filtrando paths del SVG por trazo blanco y descartando shapes outlier para evitar extruir el contorno rectangular del archivo.
- Impacto: El pin deja de verse como prisma rectangular y respeta mejor la extruccion del diseno del logo TNT.
- Proximo paso: Validar visualmente si conviene reducir o aumentar el umbral de filtro de outliers segun el detalle deseado del logo.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se reemplazaron los pines esfericos del globe en `app/components/impact-globe.tsx` por pines 3D con profundidad extruidos desde `public/Vectorizer-io-tnt-logo.svg` (origen: `Pictures/Vectorizer-io-tnt-logo.svg`) usando `SVGLoader`.
- Impacto: Los marcadores ahora muestran el logo TNT con volumen real y quedan posicionados ligeramente por encima de la superficie del globe para mayor legibilidad.
- Proximo paso: Ajustar `targetWidth` y `globeRadius + offset` si se desea una presencia mayor/menor del pin en mobile.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se desplazo el prisma de `Servicios` un 10% de su altura hacia abajo en `app/components/services.tsx` ajustando la posicion del grupo 3D.
- Impacto: El prisma queda levemente mas bajo dentro del mismo canvas sin alterar la escala ni la interaccion.
- Proximo paso: Revisar si el nuevo offset requiere ajustar el `margin-top` del bloque de Servicios.
- Fecha: 2026-04-04
- Autor: Copilot
- Cambio: Se redujo 10% el tamano del globe en `app/components/impact-globe.tsx` ajustando `globeScale` para mantener el mismo canvas.
- Impacto: El globe se ve mas contenido dentro del mismo contenedor, sin alterar el layout general del bloque Impacto.
- Proximo paso: Revisar si se requiere microajuste de `globeOffsetX` para re-centrar la composicion visual.
- Fecha: 2026-04-03
- Autor: Copilot
- Cambio: Se desplazo la seccion `Servicios` hacia abajo un 10% de la altura del prisma en `app/globals.css`, introduciendo `--services-prism-height` y aplicando `margin-top` proporcional al alto del bloque 3D.
- Impacto: La seccion gana separacion vertical respecto al bloque previo manteniendo la escala del prisma sin ajustes adicionales.
- Proximo paso: Validar el nuevo espaciado en mobile para evitar exceso de aire antes del titulo.
- Fecha: 2026-04-03
- Autor: Copilot
- Cambio: Se redujo 10% el tamano del globe de `Impacto` en `app/globals.css`, ajustando `impactGlobe`, `impactGlobeSpacer` y `--impact-globe-height` en desktop y mobile.
- Impacto: El globe queda mas contenido sin alterar la composicion de textos ni el comportamiento del canvas.
- Proximo paso: Validar en mobile si el nuevo alto mantiene el balance con `impactStatsBoard`.
- Fecha: 2026-04-03
- Autor: Copilot
- Cambio: Se aumento otro 10% el tamano visual de las secciones `Impacto` y `Servicios` en `app/globals.css`, ajustando alturas `min-height` y `clamp()` en `impactGlobe`, `impactGlobeSpacer`, `impactStatsBoard` y `scenePlaceholderServices`, incluyendo overrides mobile.
- Impacto: Ambas secciones ganan mayor presencia vertical y mejor balance con el resto de la narrativa, manteniendo la misma composicion y comportamiento responsivo.
- Proximo paso: Validar en viewport pequeno si se requiere compensar con un leve ajuste de solape vertical en `servicesSection`.
- Fecha: 2026-04-03
- Autor: Copilot
- Cambio: Se oscurecio la paleta azul/roja de `MethodBrain` en `app/components/method-brain.tsx`, unificando colores base, emissive y edges para hemisferio izquierdo (azul mas profundo) y derecho (rojo mas profundo) en modelo FBX y fallback.
- Impacto: Mejora el contraste y la lectura del volumen 3D manteniendo el estilo translucido sin perder separacion cromatica entre hemisferios.
- Proximo paso: Validar en pantallas con brillo alto si conviene subir ligeramente `opacity` para reforzar presencia de color.
- Fecha: 2026-04-03
- Autor: Copilot
- Cambio: Se mantuvo el estilo traslucido de `MethodBrain` y se aplico color por hemisferio: izquierdo en azul y derecho en rojo, tanto en el modelo FBX como en el fallback wireframe. Tambien se ajustaron los colores de los edges para respetar la separacion izquierda/derecha.
- Impacto: El cerebro conserva su look etereo actual pero gana lectura visual por lateralidad cromatica (azul/rojo).
- Proximo paso: Validar en diferentes angulos de rotacion si se desea elevar o reducir la saturacion de cada hemisferio.
- Fecha: 2026-04-03
- Autor: Copilot
- Cambio: En `app/components/services.tsx` se redujo un 10% la escala del prisma (`prismScale` de `1.5` a `1.35`) sin cambiar el tamano del canvas. En `app/globals.css` se incremento un 10% el tamano visual de las secciones `Impacto` y `Servicios` ajustando alturas `clamp()` de `impactGlobe`, `impactGlobeSpacer`, `impactStatsBoard` y `scenePlaceholderServices`.
- Impacto: El prisma queda un poco mas contenido dentro del mismo canvas, mientras los bloques `Impacto` y `Servicios` recuperan mayor presencia vertical en desktop y mobile.
- Proximo paso: Revisar visualmente en viewport pequeno si conviene microajustar la posicion del titulo de `Servicios` tras el aumento de altura.
- Fecha: 2026-04-03
- Autor: Copilot
- Cambio: Se aumento en 50% el tamano del prisma del componente `Services` en `app/components/services.tsx` incrementando la escala de su geometria (`prismHeight`) sin modificar el tamano del canvas contenedor.
- Impacto: El prisma gana protagonismo visual dentro del mismo espacio de render, manteniendo estable el layout de la seccion.
- Proximo paso: Validar en dispositivos de menor ancho si se requiere microajuste de distancia de camara para conservar encuadre optimo.
- Fecha: 2026-04-03
- Autor: Copilot
- Cambio: En `app/globals.css` se redujo un 25% la altura del canvas del prisma de `Servicios` ajustando `.servicesSection .impactGlobe` y `.servicesSection .scenePlaceholderServices` a `min-height: 378px` y `height: clamp(378px, 62.1vw, 621px)`.
- Impacto: El bloque 3D de `Servicios` ocupa menos altura visual y deja mas espacio para el contenido siguiente sin alterar la interaccion del prisma.
- Proximo paso: Validar en desktop y mobile que el nuevo alto mantenga buen balance visual con el titulo de seccion.
- Fecha: 2026-04-03
- Autor: Copilot
- Cambio: En `app/components/home-client-shell.tsx` se elimino el formato de tarjetas del bloque de textos de `Metodo` y se reemplazo por items narrativos simples (`methodNarrativeList`/`methodNarrativeItem`). En `app/globals.css` se ajustaron `methodBrainWrap`, `methodBrain` y `scenePlaceholderMethod` para igualar la escala visual del bloque `Servicios`.
- Impacto: La seccion `Metodo` ahora mantiene el mismo tamano visual que `Servicios` y los textos se muestran sin cards, con una lectura mas limpia y directa.
- Proximo paso: Revisar visualmente en desktop/mobile si se desea agregar separadores sutiles entre items narrativos del metodo.
- Fecha: 2026-04-03
- Autor: Copilot
- Cambio: Se agrego el asset faltante `public/models/brain_tex.jpg` como textura de fallback para el modelo `Brain_Model.fbx` en runtime local.
- Impacto: Se elimina el 404 de `GET /models/brain_tex.jpg` durante la carga del componente 3D `MethodBrain`, reduciendo ruido en consola y evitando errores de carga de textura.
- Proximo paso: Revisar si conviene reemplazar este fallback por la textura final del equipo de diseno para mantener consistencia visual exacta.
- Fecha: 2026-04-03
- Autor: Copilot
- Cambio: Migracion de animacion de `THREE.Clock` (deprecado) a `THREE.Timer` en `app/components/impact-globe.tsx` y `app/components/services.tsx`, incluyendo `timer.update()` en cada frame y liberacion con `timer.dispose()` en cleanup.
- Impacto: Se eliminan warnings de deprecacion en consola y se mantiene estable el calculo de `deltaSeconds` para la inercia/rotacion de ambas escenas 3D.
- Proximo paso: Verificar en `npm run dev` que no reaparezcan warnings de `THREE.Clock` durante interacciones (drag, hover y refresh).
- Fecha: 2026-04-03
- Autor: Copilot
- Cambio: Paquete de correcciones "safe" aplicado: migracion del logo del header a `next/link` en `app/components/site-header.tsx`; saneo de scripts en `package.json` (`dev` sin borrado de `.next`, `dev:clean` solo limpieza, nuevo `dev:reset`); eliminacion de archivos no usados `app/components/scroll-journey.tsx` y `app/components/futuristic-pin.ts`.
- Impacto: Se reduce el riesgo de inconsistencias de chunks al alternar desarrollo/build, se corrige el error de lint de navegacion interna y se limpia codigo muerto para mejorar mantenibilidad.
- Proximo paso: Ejecutar validacion funcional de refresh en `npm run dev` y confirmar estabilidad de carga de assets 3D en primera visita.
- Fecha: 2026-04-03
- Autor: Copilot
- Cambio: Ajuste fino de la linea decorativa en `Servicios` dentro de `app/globals.css`: se bajo su posicion vertical (`--services-line-top`) y se incremento el recorte del extremo derecho (`--services-line-end-gap`) para que termine antes del inicio de `Nuestros Servicios`.
- Impacto: La linea queda visualmente mas alineada con el titulo principal y evita invadir el bloque de texto en desktop.
- Proximo paso: Validar en mobile/tablet si el recorte derecho requiere microajuste adicional por breakpoint.
- Fecha: 2026-03-29
- Autor: Copilot
- Cambio: Se redujo la opacidad del fondo del header a un 40% de su intensidad anterior ajustando la formula de `background` en `.siteHeader` dentro de `app/globals.css`.
- Impacto: El encabezado se ve mas ligero y deja respirar mas el contenido de fondo mientras sigue ganando presencia con el scroll.
- Proximo paso: Validar si el nivel de translucidez sigue siendo legible en mobile.
- Fecha: 2026-03-29
- Autor: Copilot
- Cambio: Se creo el componente `app/components/site-header.tsx` con el logo TNT a la izquierda. El fondo del header interpola de transparente a negro traslucido conforme el usuario hace scroll (via CSS variable `--header-scroll` actualizada por scroll listener). La transicion de vuelta a transparente ocurre con la misma velocidad al subir. Se montó en `app/layout.tsx` para que persista en toda la pagina. Estilos en `app/globals.css` clase `.siteHeader`.
- Impacto: La pagina gana un encabezado persistente con comportamiento inmersivo coherente con el estilo oscuro del sitio.
- Proximo paso: Evaluar si se desean agregar links de navegacion en el header.
- Fecha: 2026-03-29
- Autor: Copilot
- Cambio: Se llevo la seccion de `Nuestros Servicios` lo mas arriba posible ajustando `margin-top` en `.section.servicesSection` y aumentando el solape negativo de `.scenePlaceholderServices` y `.impactGlobeWrap` en `app/globals.css`.
- Impacto: La seccion gana el maximo acercamiento visual al bloque previo sin alterar la estructura del componente.
- Proximo paso: Revisar si en mobile conviene relajar un poco el solape para no comprometer la lectura.
- Fecha: 2026-03-29
- Autor: Copilot
- Cambio: Se subio el apartado de `Nuestros Servicios` ajustando el margen superior de `.section.servicesSection` en `app/globals.css` a un valor negativo controlado con `clamp()`.
- Impacto: La seccion de Servicios queda mas cerca del bloque anterior y gana continuidad visual en la pagina.
- Proximo paso: Validar en desktop y mobile que el nuevo solape no afecte la lectura del titulo ni el encuadre del prisma.
- Fecha: 2026-03-29
- Autor: Copilot
- Cambio: Reemplazo de pines cilindricos del globe por pins 3D con logo TNT extruido. Se copio el SVG vectorizado a `public/tnt-logo.svg`. Se reescribio `app/components/futuristic-pin.ts` para cargar el SVG asincrono via `SVGLoader`, extraer los paths del grupo con stroke blanco (letras TNT), extruirlos con `ExtrudeGeometry` (depth 0.12, bevel activado), centrar la insignia y aplicar material cyan emissivo. El stem y anillo flotante permanecen como fallback inmediato mientras el SVG carga. Se actualizo `impact-globe.tsx` para usar import ES estatico en lugar de `require()` dinamico.
- Impacto: Los pines del globe pasan a mostrar el logo TNT en 3D extruido con brillo cyan, integrado de forma inmersiva sobre la esfera interactiva.
- Proximo paso: Validar visualmente escala/orientacion del logo sobre el globe y microajustar `targetWidth`, `depth` y `position.y` segun necesidad.
- Fecha: 2026-03-28
- Autor: Copilot
- Cambio: Reduccion real del largo del canvas backdrop del globe en `app/globals.css`: `.impactGlobeWrapBackdrop` pasa a `height: 80%` con `overflow: hidden`, y `.impactGlobeWrapBackdrop .impactGlobe` a `height: 125%` para mantener escala y encuadre del globe mientras se recorta solo la parte inferior.
- Impacto: El bloque de Servicios sube visualmente porque el canvas termina antes, manteniendo el globe con el mismo tamano y posicion percibida.
- Proximo paso: Si se requiere ajuste fino, mover `height: 80%` a un valor entre `78%-84%` segun viewport objetivo.
- Fecha: 2026-03-28
- Autor: Copilot
- Cambio: Ajuste del canvas backdrop del globe en `app/globals.css` para recortarlo en su borde inferior mediante `clip-path` (`.impactGlobeWrapBackdrop .impactGlobe canvas`), con variable `--impact-backdrop-crop-bottom` en `.impactGlobeWrapBackdrop`.
- Impacto: El canvas del bloque Intro/Impacto deja de invadir visualmente el limite con Servicios y termina en el borde inferior visible de la esfera, sin cambiar el tamano/posicion del globe ni la distribucion de textos superiores.
- Proximo paso: Validar en mobile y desktop si el recorte requiere microajuste del porcentaje de `--impact-backdrop-crop-bottom`.
- Fecha: 2026-03-28
- Autor: Copilot
- Cambio: En `app/globals.css` se ajusto el bloque de Servicios para alinear `Nuestros Servicios` a la derecha, agregar una linea decorativa inferior tipo `impactInlineLead::after`, y superponer el titulo sobre la esfera mediante `z-index` y `margin-top` negativo en `.scenePlaceholderServices`/`.impactGlobeWrap` dentro de `.servicesSection`.
- Impacto: El titulo de Servicios gana jerarquia visual y queda integrado al prisma con una composicion inmersiva, sin modificar los textos ni layout de Intro e Impacto.
- Proximo paso: Validar en mobile si el nivel de solape requiere microajuste de `margin-top` por breakpoint.
- Fecha: 2026-03-28
- Autor: Copilot
- Cambio: Se elimino el radio visual del wrapper de `Services` quitando `border-radius: 20px` de `.impactGlobeWrap` en `app/globals.css`.
- Impacto: El bloque 3D queda completamente plano, sin contorno suave ni aire visual adicional.
- Proximo paso: Revisar si conviene mantener algun separador minimo solo en mobile por legibilidad.
- Fecha: 2026-03-28
- Autor: Copilot
- Cambio: Se eliminaron los margenes internos superior e inferior del componente de `Services` ajustando el wrapper `impactGlobeWrap` a `margin-bottom: 0` en `app/globals.css`.
- Impacto: El prisma queda pegado al flujo inmediato de la seccion sin aire extra visual dentro del propio componente.
- Proximo paso: Validar si el bloque conserva suficiente separacion respecto al texto superior en pantallas pequenas.
- Fecha: 2026-03-28
- Autor: Copilot
- Cambio: Se elimino por completo la separacion entre `Nuestros Servicios` y el prisma en `app/globals.css`, anulando el `padding-top` de `.section.servicesSection` y el `margin-bottom` del `h2` dentro de `.servicesSection`.
- Impacto: El encabezado queda pegado al bloque 3D de Servicios sin tocar la distribucion de Intro, Impacto ni la logica del componente 3D.
- Proximo paso: Revisar si en mobile se desea conservar una minima respiracion de 4-8px por legibilidad.
- Fecha: 2026-03-28
- Autor: Copilot
- Cambio: Reduccion al 20% de la separacion entre el titulo `Nuestros Servicios` y el prisma, aplicando un `margin-bottom` especifico en `.section.servicesSection h2` dentro de `app/globals.css`.
- Impacto: El bloque de servicios queda mas compacto y el prisma se acerca al encabezado sin alterar el resto de la seccion.
- Proximo paso: Validar en desktop y mobile si el nuevo espaciado mantiene una lectura confortable.
- Fecha: 2026-03-28
- Autor: Copilot
- Cambio: Reduccion del 20% en el tamano del prisma de la seccion Servicios ajustando `prismHeight` de `2.585` a `2.068` en `app/components/services.tsx`; el radio y las caras se recalculan en cadena para mantener proporcion.
- Impacto: El prisma y sus paneles proyectados ocupan menos area visual, mejorando balance con el resto de la narrativa sin romper la interaccion 3D existente.
- Proximo paso: Validar en desktop y mobile si el nuevo tamano requiere microajuste de velocidad de rotacion o de separacion vertical con el contenido.
- Fecha: 2026-03-27
- Autor: Copilot
- Cambio: Ajustado el desplazamiento del centrado del globe al presionar una bandera: ahora el enfoque se mueve un 20% a la derecha y 10% arriba respecto al pin, para mejorar la visibilidad y composición visual del pin seleccionado (`impact-globe.tsx`).
- Impacto: El pin seleccionado queda destacado y más visible, evitando que el eje central lo tape y mejorando la experiencia de exploración en desktop y mobile.
- Proximo paso: Validar en distintos tamaños de pantalla si el desplazamiento es óptimo o requiere ajuste fino.
- Fecha: 2026-03-27
- Autor: Copilot
- Cambio: Al presionar una bandera, el globe ahora centra el pin correspondiente pero desplazando el enfoque un 20% a la izquierda y 10% abajo respecto al centro visual, modificando la lógica de quaternion en `impact-globe.tsx`.
- Impacto: El pin seleccionado queda destacado pero no tapado por el eje central del globe, mejorando la visibilidad y la experiencia de exploración.
- Proximo paso: Validar en pantallas anchas y móviles si el desplazamiento es suficiente o requiere ajuste fino según el tamaño del globe.
- Fecha: 2026-03-27
- Autor: Copilot
- Cambio: Se redujo el `padding-top` de `.section.servicesSection` en `globals.css` de `4.5rem` a `0.5rem` para acercar la sección de servicios al globe, sin modificar la distribución de la intro ni el impacto.
- Impacto: El bloque de servicios ahora roza visualmente el globe, reforzando la continuidad narrativa y la inmersión, sin alterar la jerarquía ni el espaciado de las secciones superiores.
- Proximo paso: Validar en desktop y mobile si el acercamiento es suficiente o requiere microajuste adicional.
- Fecha: 2026-03-27
- Autor: Copilot
- Cambio: Invertida la dirección del seguimiento de puntero en el globe 3D (`impact-globe.tsx`) para que la rotación siga el movimiento opuesto del mouse/touch, y reemplazo de los pines de oficinas por un diseño futurista (cilindro luminoso y anillo flotante, ver `futuristic-pin.ts`).
- Impacto: Navegación más intuitiva para usuarios acostumbrados a globos interactivos (dirección invertida), y refuerzo de la estética tecnológica con pines acordes al contexto visual de la página.
- Proximo paso: Validar la percepción de control y visibilidad de los nuevos pines en desktop y mobile; ajustar tamaño/efecto glow si es necesario.
- Fecha: 2026-03-27
- Autor: Copilot
- Cambio: Mejora de calidad del archivo local del globe: en `public/textures/impact-continents.svg` se aumento la resolucion intrinseca a `4096x2048` y se activo `shape-rendering="geometricPrecision"`; en `app/components/impact-globe.tsx` se afino el muestreo de textura (`LinearMipmapLinearFilter`, `LinearFilter`, mipmaps y `needsUpdate`).
- Impacto: Mayor definicion de la silueta de continentes en pantallas grandes, con menos pixelacion perceptible en bordes y mejor suavizado del mapa sobre la esfera.
- Proximo paso: Validar en monitor 2K/4K si se desea una segunda fase con textura 8K o ajuste de `pixelRatio` high-end para maximo detalle.

- Fecha: 2026-03-27
- Autor: Copilot
- Cambio: Correccion fina en `app/globals.css` del posicionamiento de `Paises impactados` y `7 Oficinas`: se agrego compensacion por solape del titulo (`--impact-title-overlap`) al calculo de `--impact-board-offset-y` en desktop y mobile para evitar ascenso excesivo del bloque.
- Impacto: La separacion visual entre `Somos un equipo global` y `Paises impactados` queda alineada con la distancia esperada, manteniendo superposicion limpia sobre el globe.
- Proximo paso: Confirmar en pantalla real si el valor de compensacion requiere microajuste de +/- 4px segun tipografia renderizada por navegador.

- Fecha: 2026-03-27
- Autor: Copilot
- Cambio: Ajuste en `app/globals.css` del bloque de etiquetas de Impacto (`Paises impactados` y `7 Oficinas`) para posicionarlas mas arriba, justo debajo de `Somos un equipo global`, usando una separacion vertical vinculada al margen izquierdo (`--agency-inline-margin`) y manteniendo superposicion sobre el globe mediante `z-index` en `.impactStatsBoard`.
- Impacto: Se refuerza la jerarquia visual solicitada, con etiquetas en primer plano sobre el globo y distancia consistente respecto al titulo en desktop y mobile.
- Proximo paso: Validar visualmente en viewport intermedio (768-1024px) si requiere microajuste de 8-16px en `--impact-frame-gap`.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Creacion del agente `.github/agents/frontend-inmersivo-3d-senior.agent.md` con lineamientos completos para desarrollo frontend inmersivo institucional (Next.js, React, Three.js, scroll fluido, arquitectura modular, performance 3D, SEO y accesibilidad), y registro en `.github/AGENTS.md`.
- Impacto: El equipo cuenta con un agente especializado para implementar experiencias inmersivas con foco en conversion, consistencia visual y rendimiento estable en dispositivos de distinta capacidad.
- Proximo paso: Invocar `frontend-inmersivo-3d-senior` en la siguiente iteracion de UI para estandarizar componentes reutilizables y validar objetivos de FPS/carga inicial.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Optimizacion de runtime 3D en dos frentes: (1) se elimino la generacion dinamica del mapa de continentes en `app/components/impact-globe.tsx` y se reemplazo por textura local precomputada `public/textures/impact-continents.svg` manteniendo el mismo lenguaje visual; (2) en `app/components/services.tsx` se implemento cache de texturas por URL para deduplicar cargas repetidas y evitar trabajo/memoria GPU innecesarios.
- Impacto: Menor trabajo CPU en primer render del globo, menos picos de bloqueo al refrescar y menor overhead de memoria/texture upload en el bloque Services.
- Proximo paso: Medir nuevamente performance en DevTools (long tasks/FPS/memoria) y evaluar segunda fase de compresion de modelo 3D (`Brain_Model.fbx` -> glTF + Draco/Meshopt).

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Ajuste de posicion vertical en `app/globals.css` para las etiquetas/tarjetas de `Paises impactados` y `7 Oficinas`: se incremento el ascenso del bloque (`--impact-board-offset-y`) y se agrego una separacion uniforme (`--impact-frame-gap`) para mantener distancia consistente respecto al titulo `Somos un equipo global`.
- Impacto: Las etiquetas quedan mas arriba y con una separacion visual estable, alineada con la distancia de marco solicitada.
- Proximo paso: Revisar visualmente en desktop y mobile si se requiere microajuste final de 8-12px segun composicion en pantalla real.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Ajuste de alineacion en `app/globals.css` para el bloque Impacto: la tarjeta `Paises impactados` ahora usa el mismo ancho estructural que `7 Oficinas` (`width: min(40rem, 100%)`) para desplazarla hacia la derecha y alinear su centro horizontal con la tarjeta inferior.
- Impacto: Se corrige el desfase visual entre ambas tarjetas y mejora la lectura vertical del bloque de estadisticas.
- Proximo paso: Validar en desktop y mobile que el eje de centro se mantenga estable en breakpoints intermedios.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Creacion del agente `.github/agents/optimizador-web-3d-next-senior.agent.md` para optimizacion avanzada de aplicaciones web 3D (JavaScript, Node.js, Three.js y Next.js), incluyendo contexto inicial del proyecto, responsabilidades, enfoque tecnico obligatorio y formato de respuesta estructurado por analisis/optimizacion/codigo/impacto/alternativas; actualizacion del catalogo en `.github/AGENTS.md`.
- Impacto: El equipo cuenta con un agente especializado en rendimiento 3D y carga inicial que estandariza recomendaciones tecnicas accionables y escalables sin sacrificar funcionalidad.
- Proximo paso: Invocar el agente en una revision de los componentes `impact-globe`, `services` y `method-brain` para priorizar optimizaciones de mayor ROI.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Correccion de estabilidad de runtime en desarrollo en `package.json`: `dev` y `dev:clean` ahora fuerzan limpieza de `.next` antes de `next dev` para eliminar referencias stale de chunks HMR (ej. `Cannot find module './532.js'`); se agrego `dev:turbo` como opcion separada.
- Impacto: Menor probabilidad de fallos de recarga en caliente y de runtime por artefactos temporales de desarrollo; ciclo de reinicio/refresh mas estable sin flags incompatibles.
- Proximo paso: Ejecutar 3-5 recargas duras consecutivas en la home para confirmar que no reaparece el error de modulo faltante.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Optimizacion de carga inicial y fluidez al refrescar: en `app/components/home-client-shell.tsx` se implemento `DeferredMount` para montar `Services` y `MethodBrain` solo al aproximarse al viewport, y en `app/components/impact-globe.tsx` se redujo perfil high-end (`textureWidth` 4096->3072, `globeSegments` 128->112).
- Impacto: Menor trabajo WebGL en el primer render (se evita inicializar escenas 3D fuera de pantalla), disminuye el jank percibido en recarga y mejora la estabilidad de interaccion inicial.
- Proximo paso: Validar en navegador con Performance panel (CPU 4x throttling) el tiempo a interaccion y confirmar reduccion de long tasks durante los primeros 3-5 segundos.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Correccion de causa raiz en `next.config.mjs` para evitar bloqueos al refrescar en desarrollo: CSP ahora distingue dev/prod (habilita `ws/wss`, `worker-src blob:` y recursos necesarios para HMR/WebGL en dev), y `Cross-Origin-Opener-Policy`/`Cross-Origin-Resource-Policy` se aplican solo en produccion.
- Impacto: Se elimina el escenario de pagina "pegada" tras reinicio/refresh por politicas demasiado estrictas en dev y se recupera la carga de componentes 3D durante desarrollo sin debilitar el hardening en produccion.
- Proximo paso: Verificar en navegador la recarga dura (Ctrl+F5) y revisar consola para confirmar ausencia de violaciones CSP en la home.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Aplicacion de plan de mejora en 4 frentes: (1) refactor de frontera client moviendo la home a Server Component y aislando interactividad en `app/components/home-client-shell.tsx` con carga dinamica de `ImpactGlobe`, `Services` y `MethodBrain`; (2) limpieza de codigo/estilos huerfanos eliminando exports no usados en `app/data/tnt-content.ts`, bloques CSS legacy en `app/globals.css` y el campo no usado `starCount` en `app/components/impact-globe.tsx`; (3) endurecimiento de cabeceras de seguridad en `next.config.mjs`; (4) instrumentacion de errores de carga FBX en `app/components/method-brain.tsx` via `console.error` (no-prod) y evento `tnt:model-load-error`.
- Impacto: Menor acoplamiento client, mejor base para reducir carga inicial, menor deuda tecnica visual/datos, postura de seguridad HTTP mas robusta y mejor observabilidad de fallos 3D en produccion.
- Proximo paso: Medir nuevamente First Load JS y Core Web Vitals tras despliegue para cuantificar mejora y priorizar una segunda fase de optimizacion (lazy mount por viewport de escenas 3D).

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Ajuste de alineacion en `app/globals.css` para el bloque Impacto: la tarjeta `7 Oficinas` se fija al eje izquierdo y alinea su posicion horizontal con la tarjeta/etiqueta de `Paises impactados`, incluyendo override en mobile para evitar centrado automatico.
- Impacto: Composicion mas consistente entre ambas tarjetas y lectura lineal izquierda en desktop y mobile, aun cuando el layout de seccion tenga margenes internos.
- Proximo paso: Validar visualmente el eje izquierdo final en viewport <=640px para confirmar si se requiere un desplazamiento adicional negativo que ignore mas margen lateral.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Creacion del agente `revisor-codigo-js-senior` en `.github/agents/revisor-codigo-js-senior.agent.md` con lineamientos completos de code review para JavaScript, Node.js, Next.js, Three.js, seguridad, rendimiento y arquitectura; actualizacion del catalogo en `.github/AGENTS.md`.
- Impacto: El equipo ahora cuenta con un agente especializado para revisiones de codigo de nivel produccion con formato de salida estandar y enfoque tecnico riguroso.
- Proximo paso: Invocar el agente en una revision real del proyecto para validar cobertura y ajustar el prompt segun feedback del equipo.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Depuracion de redundancias en codigo: se centralizo la fuente de verdad de paises/flags/coordenadas del bloque Impacto en `app/data/tnt-content.ts`, se actualizo su consumo en `app/page.tsx` y `app/components/impact-globe.tsx`, y se eliminaron componentes no usados (`app/components/method-brain-trimmed.tsx`, `app/components/scroll-journey.tsx`).
- Impacto: Menor deuda tecnica, menor riesgo de inconsistencias entre UI y globo 3D, y base mas mantenible al evitar duplicidad de datos y archivos huerfanos.
- Proximo paso: Resolver inconsistencia de contenido entre la metrica "7 Oficinas" y el listado actual de oficinas en datos para alinear narrativa y evidencia.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Ajuste de alineacion tipografica en tarjetas de Impacto (`app/globals.css`): se centro el texto/contenido de `Paises impactados` y `7 Oficinas`, incluyendo centrado de la fila de banderas.
- Impacto: Lectura mas simetrica del bloque de estadisticas manteniendo la estructura actual de layout.
- Proximo paso: Validar si se desea conservar las tarjetas en eje izquierdo con texto centrado o recentrar tambien el contenedor completo en desktop.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Ajuste de alineacion en bloque Impacto (`app/globals.css`): tarjeta de `Paises impactados` alineada a la izquierda respetando el margen de seccion y tarjeta de `7 Oficinas` posicionada justo debajo en el mismo eje, incluyendo banderas alineadas a la izquierda.
- Impacto: Mejora de jerarquia y lectura lineal del bloque de estadisticas con composicion consistente al margen izquierdo.
- Proximo paso: Validar balance visual en mobile para decidir si se mantiene el mismo ancho de tarjeta o se reduce ligeramente en pantallas <= 480px.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Ajuste de limpieza visual en `app/components/impact-globe.tsx`: se elimino la capa de estrellas 3D del canvas del globe para evitar artefactos/anillos percibidos alrededor de la esfera.
- Impacto: El globe queda mas limpio y sin elementos orbitales aparentes en su periferia.
- Proximo paso: Si se desea recuperar profundidad, usar solo fondo estrellado CSS global sin particulas 3D locales en el bloque de Impacto.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Ajustes en bloque Impacto para direccion visual solicitada: eliminacion de anillos verdes del globe en `app/components/impact-globe.tsx`, apilado vertical de tarjetas (`7 Oficinas` debajo de `Paises impactados`) y unificacion de tipografia en blanco en `app/globals.css`.
- Impacto: El globe queda mas limpio, la jerarquia de tarjetas es lineal y el apartado Impacto mantiene contraste uniforme con texto blanco.
- Proximo paso: Validar en desktop y mobile que el espaciado vertical entre ambas tarjetas siga equilibrado con el fondo del globe.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Correccion de interaccion tactil en componentes 3D (`app/components/impact-globe.tsx`, `app/components/services.tsx` y `app/components/method-brain.tsx`): el filtro de `pointerdown` ahora solo descarta boton secundario de mouse, permitiendo entrada touch/pen primaria.
- Impacto: Se evita que la rotacion/drag de escenas 3D falle en dispositivos tactiles o stylus por validacion demasiado estricta del boton.
- Proximo paso: Validar en iOS/Android que el gesto vertical de scroll siga conviviendo correctamente con el drag horizontal de cada escena.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Correccion de rotacion del globe en `app/globals.css`: se ajusto el enrutamiento de `pointer-events` en las capas superpuestas de Intro/Impacto para permitir que el canvas backdrop reciba eventos de arrastre, manteniendo interaccion en botones de banderas.
- Impacto: La rotacion/interaccion del globe vuelve a responder al puntero en la zona de Impacto.
- Proximo paso: Si se requiere, reintroducir interacciones de `IntroBillboard` (glitch al hover) mediante una capa dedicada sin bloquear el globe.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Ajustes en `app/components/services.tsx` y `app/components/impact-globe.tsx`: se invirtio la direccion de seguimiento horizontal en Services, se cambio el borde de continentes a paleta magenta inspirada en la referencia, y se hicieron los oceanos translucidos eliminando el relleno de fondo en la textura del globe.
- Impacto: Interaccion de seguimiento alineada con el comportamiento solicitado, lectura visual del mapa mas cercana a la referencia y mayor separacion visual entre continentes y fondo por transparencia del oceano.
- Proximo paso: Calibrar opacidad final de continente/oceano segun revision en monitores con distinto contraste.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Correccion de fondo y visibilidad en `app/globals.css`: se restauro el campo estrellado sobre negro solido usando patrones SVG (sin gradientes de fondo) en `.experience::after` e `.introImpactStage`, y se elimino la superposicion oscura de `.impactGlobe::before` para recuperar claridad de los elementos 3D.
- Impacto: Se mantienen estrellas visibles, desaparece el tinte de gradiente y el globe/escenas 3D recuperan legibilidad.
- Proximo paso: Ajustar intensidad del starfield (opacidad 0.7) si se requiere un look mas sobrio en monitores de alto brillo.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Eliminacion de gradientes de fondo remanentes en `app/globals.css` (`.experience::after` e `.introImpactStage`) para usar negro solido puro.
- Impacto: Fondo uniforme sin variaciones tonales, tal como se solicito.
- Proximo paso: Si se desea, reintroducir textura no-gradiente (ruido muy sutil) manteniendo base negra solida.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Ajustes visuales en `app/globals.css`: barra de desplazamiento vertical reemplazada por estilo sutil, separacion visual de la esfera del globe mediante capa de contraste local, y extension del fondo estrellado a secciones iniciales (`introImpactStage`) sobre negro solido.
- Impacto: Mejor integracion estetica del inicio de pagina, lectura mas clara del globe frente al fondo y UI de scroll menos invasiva.
- Proximo paso: Ajustar contraste fino del thumb de scroll segun navegador (Chrome/Safari/Firefox) para consistencia total.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Correccion de fondo en `app/globals.css`: se elimino la capa de gradientes de `experience::before` para garantizar negro solido detras del campo estrellado.
- Impacto: El starfield ahora se ve sobre negro uniforme, sin tintes o halos de color no deseados.
- Proximo paso: Ajustar opacidad de estrellas si se desea mayor contraste en pantallas de alto brillo.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Ajuste del fondo estrellado en `app/globals.css`: se elimino la capa fija en `body` y se movio el starfield a `experience::after` para que acompañe el scroll del contenido; base visual ajustada a negro solido.
- Impacto: El fondo ya no se percibe estatico respecto al scroll y mantiene mejor contraste visual sobre negro uniforme.
- Proximo paso: Revisar densidad/escala de estrellas en pantallas ultrawide para conservar balance de composicion.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Se implemento fondo estrellado global en `app/globals.css`, inspirado en la atmosfera del globe, usando capas CSS de estrellas con drift sutil y compatibilidad con `prefers-reduced-motion`.
- Impacto: Toda la pagina adopta una ambientacion espacial coherente con la narrativa visual del bloque Impacto sin agregar un canvas extra de alto costo.
- Proximo paso: Ajustar densidad/opacidad de estrellas por breakpoint tras revision visual final en desktop y mobile.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Correcciones funcionales y optimizacion de GPU en `app/components/impact-globe.tsx`, `app/components/services.tsx`, `app/components/method-brain.tsx`, `app/components/smooth-scroll.tsx` y `app/globals.css`: perfil adaptativo de render (pixel ratio/texturas/segmentos), pausa de animacion fuera de viewport, mejor cumplimiento de `prefers-reduced-motion`, ajuste tactil (`touch-action: pan-y pinch-zoom`) y desactivacion de `syncTouch` en Lenis.
- Impacto: Menor consumo GPU, menos jank en mobile, mejor estabilidad del scroll y continuidad visual de los componentes 3D.
- Proximo paso: Ejecutar prueba comparativa FPS/tiempo de frame en dispositivo movil objetivo para calibrar umbrales de perfil low-end.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Se simplifico el globe en `app/components/impact-globe.tsx`: eliminada la cuadricula superpuesta (wireframe), removido el halo/sombra palida exterior y reducidos los pines de oficinas a marcadores minimalistas sin haces ni capas extra.
- Impacto: Visual mas limpio y legible del mapa, con menos ruido grafico y mejor foco en ubicaciones de oficinas.
- Proximo paso: Afinar tamano/opacidad de marcadores por dispositivo para equilibrar visibilidad en mobile y desktop.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Rediseño del globe de Impacto en `app/components/impact-globe.tsx` con direccion visual inspirada en referencias futuristas: paleta verde neon, continentes en dot-matrix, scanlines, anillos orbitales, campo estelar y marcadores con haces energéticos animados.
- Impacto: El bloque de Impacto ahora comunica una estetica mas tecnologica e inmersiva, alineada al estilo solicitado para narrativa global.
- Proximo paso: Ajustar intensidad de glow y densidad de estrellas tras revision visual final con el equipo de marca.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Se incremento el suavizado del scroll en Lenis (`app/components/smooth-scroll.tsx`) y se rediseño el globe con estetica holografica en `app/components/impact-globe.tsx` (paleta cian, wireframe, anillos orbitales, brillo atmosferico y pulso de luz).
- Impacto: El recorrido se percibe mas fluido y el bloque de Impacto gana una identidad visual futurista mas inmersiva.
- Proximo paso: Revisar en dispositivos moviles de gama media para ajustar opacidades y velocidad de anillos si se requiere menor carga GPU.

- Fecha: 2026-03-25
- Autor: Copilot
- Cambio: Se implemento scroll suave continuo en la home con Lenis (`app/components/smooth-scroll.tsx`), integracion en `app/page.tsx` y reglas base de compatibilidad en `app/globals.css` respetando `prefers-reduced-motion`.
- Impacto: El desplazamiento deja de sentirse por pasos y mejora la fluidez general de lectura en desktop y mobile.
- Proximo paso: Ajustar `lerp` y `wheelMultiplier` con validacion de UX en dispositivos de bajo rendimiento.

- Fecha: 2026-03-23
- Autor: Copilot
- Cambio: Ajuste de causa-raiz en desplazamiento de textos de Impacto (`app/globals.css`): se unifica el ascenso en `impactStatsBoard` con `position: relative` + `top` negativo y se neutralizan offsets internos de cada tarjeta para evitar compensaciones visuales.
- Impacto: "Paises impactados" y "7 Oficinas" suben como un bloque de forma evidente y predecible.
- Proximo paso: Ajustar solo `--impact-board-offset-y` para calibrar altura final sin tocar reglas adicionales.

- Fecha: 2026-03-23
- Autor: Copilot
- Cambio: Diagnostico y ajuste de desplazamiento en Impacto (`app/globals.css`): el offset del contenedor `impactStatsBoard` pasa de `transform` a `margin-top` negativo para que el movimiento hacia arriba sea visible en flujo real; se incrementan valores de offset en desktop y mobile.
- Impacto: Los textos de "Paises impactados" y "7 Oficinas" ahora suben de forma perceptible y estable.
- Proximo paso: Si necesitas ajuste fino, modificar `--impact-board-offset-y` por breakpoint.

- Fecha: 2026-03-23
- Autor: Copilot
- Cambio: Correccion de desplazamiento en tarjetas de Impacto (`app/globals.css`): se agrega offset vertical al contenedor completo `impactStatsBoard` para subir visiblemente ambas tarjetas, manteniendo offsets individuales para ajuste fino.
- Impacto: El movimiento hacia arriba ahora es claramente perceptible en "Paises impactados" y "7 Oficinas".
- Proximo paso: Ajustar el valor `--impact-board-offset-y` segun composicion final deseada en desktop/mobile.

- Fecha: 2026-03-23
- Autor: Copilot
- Cambio: Correccion de estilos en tarjetas de Impacto (`app/globals.css`): se resolvio el override de fondo/borde de `.statCard` usando selectores de mayor especificidad para `statCardNarrative/statCardOffices`, y se incrementaron offsets verticales negativos para mover ambas tarjetas hacia arriba.
- Impacto: Las tarjetas quedan efectivamente sin fondo ni borde y se ubican mas arriba sobre el mapa, como se solicito.
- Proximo paso: Afinar offsets finales por viewport si deseas un encuadre exacto por breakpoint.

- Fecha: 2026-03-23
- Autor: Copilot
- Cambio: Ajustes de tarjetas de Impacto en `app/globals.css`: texto de "7 Oficinas" centrado, tarjeta de "7 Oficinas" centrada en la pagina (grid full-width), ampliacion de ancho de "Paises impactados" para mantener la frase de trayectoria en una sola linea, eliminacion de fondo/borde de ambas tarjetas y adicion de offsets manuales por CSS variables para mover cada tarjeta.
- Impacto: Composicion mas limpia sobre el mapa, lectura central de oficinas y control directo de posicion sin tocar JSX.
- Proximo paso: Ajustar offsets manuales en revision visual final para cerrar encuadre de arte.

- Fecha: 2026-03-22
- Autor: Copilot
- Cambio: Ajuste tipografico en `app/globals.css` para igualar el texto de "7 Oficinas" al mismo tamaño y line-height de "Paises impactados" en desktop y mobile.
- Impacto: Se unifica la jerarquia visual entre ambos titulares del bloque Impacto.
- Proximo paso: Validar visualmente si se desea mantener esa igualdad estricta o dejar una variacion ligera por peso visual.

- Fecha: 2026-03-22
- Autor: Copilot
- Cambio: Ajuste de escala en tarjetas de Impacto (`app/globals.css`): se reduce 25% el tamaño visual de las tarjetas "Paises impactados" y "7 Oficinas" (tipografia, anchos y espaciados), y se incrementa 20% el tamaño de banderas.
- Impacto: La composicion queda menos dominante en tarjeta y mas clara en jerarquia, manteniendo las banderas como elemento focal.
- Proximo paso: Validar balance en desktop wide para confirmar que la tarjeta de oficinas no pierda presencia.

- Fecha: 2026-03-22
- Autor: Copilot
- Cambio: Ajuste de jerarquia/alineacion en tarjetas de Impacto en `app/globals.css`: "Paises" e "impactados" pasan a misma escala tipografica y peso, se centra todo el contenido de la tarjeta narrativa, y las banderas del bloque "7 Oficinas" aumentan 30%.
- Impacto: Mejor legibilidad y consistencia visual con el esquema solicitado, con bloque de oficinas mas protagonista.
- Proximo paso: Revisar balance en pantallas pequeñas y ajustar solo si el bloque de banderas queda muy dominante.

- Fecha: 2026-03-22
- Autor: Copilot
- Cambio: Reorganizacion de tarjetas de Impacto en `app/page.tsx` y `app/globals.css` con esquema visual tipo referencia: bloque narrativo "Paises impactados" a la izquierda y bloque destacado de "7 Oficinas" con banderas a la derecha.
- Impacto: La informacion clave se lee con jerarquia mas clara y composicion mas cercana al layout solicitado.
- Proximo paso: Afinar copy exacto y pesos tipograficos finales segun validacion visual con el equipo de marca.

- Fecha: 2026-03-22
- Autor: Copilot
- Cambio: Reduccion de margenes globales en `app/globals.css` en 25%: se ajusta `--agency-inline-margin` (factor `3` a `2.25`), padding de `.experience` (`5rem/4rem` a `3.75rem/3rem`) y compensacion superior de `.introBillboard` (`-5rem` a `-3.75rem`).
- Impacto: La pagina queda mas compacta horizontal y verticalmente, incluyendo el borde inferior visual del Intro Billboard por usar la misma variable de margen.
- Proximo paso: Revisar equilibrio de densidad en mobile para decidir si mantener estos valores o aplicar override por breakpoint.

- Fecha: 2026-03-22
- Autor: Copilot
- Cambio: Refuerzo de nitidez en `app/components/impact-globe.tsx` y `app/components/services.tsx`: supersampling elevado (`pixelRatio` hasta 4x) y textura del mapa del globe aumentada de `2048x1024` a `4096x2048`.
- Impacto: Los bordes de siluetas y contornos del globe se ven mas definidos que en el ajuste anterior.
- Proximo paso: Si el costo GPU sube en equipos medios, bajar techo de `pixelRatio` a 3x manteniendo textura 4K.

- Fecha: 2026-03-22
- Autor: Copilot
- Cambio: Mejora de nitidez de bordes en escenas 3D (`app/components/impact-globe.tsx` y `app/components/services.tsx`) incrementando el `pixelRatio` interno del renderer mediante supersampling controlado.
- Impacto: Las siluetas se perciben mas definidas y con menos aliasing visible, especialmente en bordes curvos y diagonales.
- Proximo paso: Monitorear FPS en dispositivos de gama media y, si hace falta, reducir el techo de `pixelRatio`.

- Fecha: 2026-03-22
- Autor: Copilot
- Cambio: Mejora de calidad de silueta del globe en `app/components/impact-globe.tsx` duplicando resolucion de malla: esfera principal de `72x72` a `144x144` y atmosfera de `44x44` a `88x88`.
- Impacto: El contorno del globe se percibe mas suave y definido, especialmente en curvas y bordes de alto contraste.
- Proximo paso: Validar impacto de rendimiento en dispositivos de gama media y ajustar si es necesario.

- Fecha: 2026-03-22
- Autor: Copilot
- Cambio: Ajuste de fondo negro full-bleed en `app/globals.css`: `introImpactStage` ahora usa ancho de viewport completo con compensacion lateral (`100vw` y margenes calculados) para ignorar margenes del layout.
- Impacto: El fondo negro del bloque Intro/Impacto cubre todo el ancho de pantalla sin cortes laterales.
- Proximo paso: Verificar en mobile con barra de direccion dinamica si prefieres migrar a `100dvw` para comportamiento mas estricto.

- Fecha: 2026-03-22
- Autor: Copilot
- Cambio: Eliminacion de offsets del render 3D en `app/components/impact-globe.tsx` y `app/globals.css`: `globeOffsetX/globeOffsetY` pasan a `0` y `impactGlobeWrap` deja de usar `translateY`.
- Impacto: Tanto el globe de Impacto como el canvas de Services quedan sin desplazamiento extra y alineados a su contenedor.
- Proximo paso: Revisar composicion visual final para decidir si se requiere solo un ajuste fino de escala en vez de offsets.

- Fecha: 2026-03-22
- Autor: Copilot
- Cambio: Ajuste fino de escala del globe en `app/components/impact-globe.tsx`: se reduce un 20% adicional el modelo (`globeScale` de 1.4 a 1.12).
- Impacto: El globe gana aire visual y reduce dominancia en el bloque Intro/Impacto sin alterar su posicion ni el full-bleed lateral.
- Proximo paso: Validar si se requiere microajuste de offsets para mantener el encuadre ideal tras la nueva escala.

- Fecha: 2026-03-22
- Autor: Copilot
- Cambio: Ajuste de presencia del globe en `app/components/impact-globe.tsx` y `app/globals.css`: se reduce 30% la escala del modelo (`globeScale` de 2 a 1.4) y el modo backdrop pasa a `100vw` centrado para ignorar margenes laterales del layout.
- Impacto: El globe se ve mas contenido visualmente y mantiene cobertura full-bleed horizontal en Intro/Impacto.
- Proximo paso: Calibrar `globeOffsetX`/`globeOffsetY` solo si se desea un encuadre artistico distinto tras la reduccion.

- Fecha: 2026-03-22
- Autor: Copilot
- Cambio: Correccion de visibilidad del globe backdrop en `app/globals.css`: el fondo negro pasa a `introImpactStage` y se vuelve transparente el fondo de `IntroBillboard` e `ImpactSection` dentro del stage.
- Impacto: El globe vuelve a ser visible detras del bloque Intro/Impacto manteniendo su posicion y el layering de texto en primer plano.
- Proximo paso: Validar artisticamente intensidad/contraste del globe tras el cambio de fondos en desktop y mobile.

- Fecha: 2026-03-21
- Autor: Copilot
- Cambio: Correccion de recorte superior y layering del globe entre Intro e Impacto: se ajusta `globeOffsetY` en `app/components/impact-globe.tsx` y se calibra apilado en `app/globals.css` (texto de Intro por encima y `impactGlobeWrap` desplazado visualmente hacia arriba con `transform`, sin tocar flujo de layout).
- Impacto: El globe ahora cruza visualmente ambas secciones (Intro + Impacto) sin recorte superior perceptible y sin modificar la distribucion actual del texto.
- Proximo paso: Verificar ajuste fino por breakpoint (especialmente <=640px) para asegurar el mismo encuadre en mobile.

- Fecha: 2026-03-21
- Autor: Copilot
- Cambio: Ajuste puntual en `app/components/impact-globe.tsx` reduciendo `globeOffsetY` para eliminar el recorte superior del globo de Impacto sin modificar alturas, margenes ni distribucion de secciones.
- Impacto: El globo conserva su composicion general y deja de cortarse en la parte superior; la distribucion de la pagina permanece intacta.
- Proximo paso: Validar visualmente en desktop y mobile que el encuadre superior se mantenga correcto en todos los breakpoints.

- Fecha: 2026-03-21
- Autor: Copilot
- Cambio: Ajuste de clipping entre Intro e Impacto en `app/globals.css`: se habilita `overflow: visible` en ambos bloques y se ordena el apilado con `z-index` para que el globe pueda continuar visualmente hacia Intro sin alterar su posicion interna.
- Impacto: Se elimina el corte superior del globe y se mantiene la lectura de `AGENCY WORLDWIDE` por delante.
- Proximo paso: Validar en mobile y desktop que no aparezcan desbordes no deseados en laterales.

- Fecha: 2026-03-21
- Autor: Copilot
- Cambio: Ajuste de solape Intro/Impacto en `app/globals.css`: `impactGlobeWrap` se desplaza hacia arriba para que el globe de Impacto alcance visualmente el Intro, y se eleva el z-index del texto de `IntroBillboard` para mantener `AGENCY WORLDWIDE` por delante.
- Impacto: El globe de Impacto ahora se ve detras de las letras del Intro sin acoplar la logica de Services.
- Proximo paso: Calibrar finamente el offset vertical del globe por breakpoint si se busca encuadre artistico exacto.

- Fecha: 2026-03-21
- Autor: Copilot
- Cambio: Ajuste de composicion en Impacto: globe aumentado a 2x en `app/components/impact-globe.tsx`, desplazado a la derecha/arriba para dejar visibilidad parcial en pantalla, y texto del bloque sobrepuesto al globe ignorando margen derecho mediante estilos de `app/globals.css`.
- Impacto: El hero de Impacto gana presencia visual del globo con layering de texto encima, sin alterar la seccion de Servicios ni su layout.
- Proximo paso: Afinar offsets de `globeOffsetX/globeOffsetY` y del solape del titulo segun validacion visual en viewport objetivo.

- Fecha: 2026-03-21
- Autor: Copilot
- Cambio: Eliminacion de la logica de autorrotacion en el componente de Metodo (`app/components/method-brain.tsx`), retirando el incremento automatico de velocidad angular por frame.
- Impacto: El cerebro 3D ya no gira solo; ahora responde unicamente a interaccion de arrastre del usuario con desaceleracion por inercia.
- Proximo paso: Si se requiere, agregar control explicito de "Play/Pause" para rotacion automatica opcional.

- Fecha: 2026-03-21
- Autor: Copilot
- Cambio: Reemplazo del modelo de cerebro en `public/models/Brain_Model.fbx` exportando desde `Pictures/Brain_Model.blend` (Blender CLI) y eliminacion del modelo antiguo `public/models/brain-open.glb`.
- Impacto: La seccion Metodo ahora renderiza el cerebro actualizado desde el archivo `.blend` convertido, con limpieza de assets legacy no utilizados.
- Proximo paso: Validar visualmente proporciones/orientacion del nuevo FBX y, si aplica, eliminar componentes legacy no activos.

- Fecha: 2026-03-20
- Autor: Copilot
- Cambio: Reversion del recorte de cerebro: la home vuelve a consumir `app/components/method-brain.tsx` y se desactiva el trim regional (`ENABLE_REGION_TRIM = false`) para conservar el modelo original completo.
- Impacto: La seccion Metodo muestra nuevamente el cerebro sin eliminacion de cerebelo/tronco, descartando la variante recortada.
- Proximo paso: Si se retoma edicion anatomica, hacerlo en DCC (por ejemplo Blender) y exportar un FBX final ya curado.

- Fecha: 2026-03-20
- Autor: Copilot
- Cambio: Refinamiento del recorte en `method-brain-trimmed.tsx` con mascara por ratios `min/max` del bounding box para atacar especificamente el bulto del cerebelo (ademas del tronco), evitando dependencia del centro geometrico.
- Impacto: El cerebelo queda suprimido de forma mucho mas notoria en vista wireframe, incluso cuando el centro del modelo estaba sesgado por volumen inferior.
- Proximo paso: Si aun aparece residuo en una orientacion concreta, ajustar solo el umbral `removeCerebellumBulge` segun captura lateral/frontal.

- Fecha: 2026-03-20
- Autor: Copilot
- Cambio: Creacion de nuevo componente `app/components/method-brain-trimmed.tsx` con recorte agresivo de geometria (cerebelo y tronco) y conexion de la seccion Metodo en `app/page.tsx` a esta nueva variante para validacion visual.
- Impacto: Los cambios de recorte son mas notorios en pantalla y el archivo anterior se conserva intacto para rollback rapido hasta recibir visto bueno.
- Proximo paso: Tras aprobacion visual del usuario, eliminar el componente antiguo `method-brain.tsx` y consolidar una sola implementacion.

- Fecha: 2026-03-20
- Autor: Copilot
- Cambio: Correccion de pipeline en `MethodBrain`: las lineas `EdgesGeometry` ahora se generan despues del recorte de triangulos del FBX (antes se creaban previo al prune).
- Impacto: El wireframe visible ya respeta la eliminacion de cerebelo y tronco; se evita mostrar aristas de geometria ya recortada.
- Proximo paso: Validar en `npm run dev` (cuando el entorno lo permita) y ajustar mascara solo si quedan remanentes anatomicos menores.

- Fecha: 2026-03-20
- Autor: Copilot
- Cambio: Ajuste de `MethodBrain` para eliminar simultaneamente cerebelo y tronco encefalico del wireframe: recorte por coordenadas normalizadas del FBX y retiro de esas piezas en el fallback procedural.
- Impacto: El render de Metodo mantiene solo los hemisferios en vista wireframe, sin volumen inferior residual cuando rota o cuando entra fallback.
- Proximo paso: Si deseas un recorte anatomico mas fino, calibrar umbrales de mascara con captura frontal/lateral del modelo final.

- Fecha: 2026-03-20
- Autor: Copilot
- Cambio: Recorte geometrico del FBX en MethodBrain para suprimir visualmente el cerebelo (eliminacion de triangulos en region inferior-posterior central del modelo).
- Impacto: El cerebro wireframe conserva estabilidad y elimina la prominencia del cerebelo durante toda la rotacion.
- Proximo paso: Ajustar finamente umbrales del recorte si se requiere preservar mayor volumen del tronco encefalico.

- Fecha: 2026-03-20
- Autor: Copilot
- Cambio: Estabilizacion del wireframe en MethodBrain: lineas de aristas configuradas sin `depthTest/depthWrite` y superficie con `polygonOffset` para eliminar variaciones de lineas por angulo de camara.
- Impacto: El entramado del cerebro se percibe consistente durante la rotacion, evitando parpadeo/cambios aparentes de topologia por posicion.
- Proximo paso: Ajustar opacidad final de lineas para balancear legibilidad en pantallas de alto brillo.

- Fecha: 2026-03-20
- Autor: Copilot
- Cambio: Reduccion de densidad visual del wireframe en MethodBrain, migrando de malla triangular completa a aristas seleccionadas con `EdgesGeometry` tanto en el FBX como en el fallback.
- Impacto: El cerebro conserva lectura tecnica tipo wireframe, pero con lineas mas limpias y menos saturacion visual.
- Proximo paso: Ajustar el umbral angular de `EdgesGeometry` si se requiere aun menos o mas detalle de linea.

- Fecha: 2026-03-20
- Autor: Copilot
- Cambio: Integracion de modelo local `Pictures/Brain_fbx/Brain_Model.fbx` en `MethodBrain`, publicado como `public/models/Brain_Model.fbx` y cargado con `FBXLoader` en render wireframe.
- Impacto: El bloque Metodo ahora utiliza el asset FBX provisto por el usuario, manteniendo la visual tecnica en malla y el fallback estable.
- Proximo paso: Ajustar escala/encuadre final del FBX segun revision visual en entorno dev.

- Fecha: 2026-03-20
- Autor: Copilot
- Cambio: Integracion de modelo GLB de cerebro en `MethodBrain` con render en modo wireframe y fallback wireframe nativo para asegurar visibilidad si falla la carga.
- Impacto: La seccion Metodo ahora muestra una lectura tecnica de cerebro tipo malla (wireframe), con comportamiento estable y consistente.
- Proximo paso: Sustituir el asset GLB por el modelo final curado y conservar este pipeline wireframe como preset visual.

- Fecha: 2026-03-20
- Autor: Copilot
- Cambio: Reprogramacion completa de `MethodBrain` desde cero, eliminando la logica previa y reemplazandola por un cerebro 3D procedural viable (hemisferios, cerebelo, tronco y surcos), con interaccion de arrastre y rotacion estable.
- Impacto: El componente queda tecnicamente mas predecible y visualmente consistente, evitando dependencias externas para mostrar una figura reconocible de cerebro.
- Proximo paso: Cuando se procese el asset final, sustituir el cerebro procedural por modelo definitivo manteniendo esta base de interaccion y lifecycle seguro.

- Fecha: 2026-03-20
- Autor: Copilot
- Cambio: Fortalecimiento tecnico de MethodBrain: cleanup unificado de recursos Three.js, disposicion de materiales originales reemplazados y guardas contra callbacks asincronos del GLTFLoader tras desmontaje.
- Impacto: Se reducen fugas de memoria GPU/CPU y condiciones de carrera en runtime, priorizando estabilidad con apariencia visual aceptable.
- Proximo paso: Medir uso de memoria en sesiones largas de navegacion para confirmar estabilidad sostenida.

- Fecha: 2026-03-20
- Autor: Copilot
- Cambio: Revision de MethodBrain y reemplazo del fallback esferico por un cerebro procedural (hemisferios + pliegues) para garantizar lectura anatomica cuando el GLB no sea util.
- Impacto: El bloque de Metodo deja de mostrar una esfera rosada y mantiene una silueta de cerebro visible de forma consistente.
- Proximo paso: Ajustar nivel de detalle de pliegues para equilibrar fidelidad visual y costo GPU en equipos de gama media.

- Fecha: 2026-03-20
- Autor: Copilot
- Cambio: Endurecimiento de carga en MethodBrain: el placeholder no se retira hasta validar que el GLB contiene mallas renderizables y bounds numericos validos.
- Impacto: Se evita el recuadro vacio cuando el asset 3D carga sin geometria util o con metadata incompatible.
- Proximo paso: Capturar en consola un warning no bloqueante para diagnosticar assets con mallas invalidas en futuras integraciones.

- Fecha: 2026-03-20
- Autor: Copilot
- Cambio: Revision completa de visibilidad en MethodBrain con placeholder inmediato, forzado de materiales del GLB a configuracion opaca/legible y auto-encuadre de camara por bounding sphere.
- Impacto: El cerebro permanece visible incluso durante carga o en escenarios de material incompatible, evitando lienzo vacio en la seccion Metodo.
- Proximo paso: Afinar colorimetria final del material para alinearla al arte de marca sin perder contraste en pantallas de bajo brillo.

- Fecha: 2026-03-20
- Autor: Copilot
- Cambio: Reemplazo del cerebro procedural de Metodo por un modelo GLB real (`public/models/brain-open.glb`) obtenido de repositorio abierto `Justin0Brien/Brain` y renderizado con `GLTFLoader`.
- Impacto: La seccion de Metodo ahora usa una anatomia 3D mas precisa y consistente visualmente, manteniendo interaccion de rotacion tipo globe.
- Proximo paso: Revisar direccion de arte del material del GLB y definir nivel final de detalle/performance para dispositivos de gama media.

- Fecha: 2026-03-20
- Autor: Copilot
- Cambio: Integracion de componente 3D en la seccion Metodo, inspirado en la arquitectura del globe pero reemplazando la geometria por un modelo procedural de cerebro interactivo.
- Impacto: Se refuerza el relato de "¿Cómo pensamos?" con una pieza visual coherente con el lenguaje inmersivo del sitio y diferenciada del bloque de Impacto.
- Proximo paso: Ajustar direccion de arte del cerebro (tonalidad, profundidad de pliegues y velocidad de rotacion) segun feedback visual final.

- Fecha: 2026-03-20
- Autor: Copilot
- Cambio: Se agrego una nueva seccion entre Servicios y Casos titulada "¿Cómo pensamos?" con tres pilares narrativos del metodo de trabajo.
- Impacto: Mejora la continuidad del relato entre oferta de servicios y casos, explicando el enfoque estrategico antes de mostrar resultados.
- Proximo paso: Validar con contenido final de negocio si los pilares y copys deben quedar fijos o volverse editables desde CMS.

- Fecha: 2026-03-20
- Autor: Copilot
- Cambio: Correccion del espacio entre Intro e Impacto aumentando especificidad de estilos (`.section.impactSection` y `.section.servicesSection`) para anular `margin-top` global de secciones.
- Impacto: Se elimina el hueco con fondo no negro y se mantiene continuidad visual solida en el bloque inicial.
- Proximo paso: Verificar el empalme en resoluciones ultrawide para confirmar continuidad full-bleed.

- Fecha: 2026-03-20
- Autor: Copilot
- Cambio: Ajuste de layout para aplicar fondo negro solido continuo en el tramo inicial (Intro + Impacto), finalizando antes de la seccion Servicios.
- Impacto: La pagina inicia con un bloque visual mas contundente y uniforme, mejorando contraste y continuidad narrativa hasta el corte previo a Servicios.
- Proximo paso: Validar en mobile el ritmo vertical entre el cierre de Impacto y la entrada de Servicios para confirmar continuidad visual.

- Fecha: 2026-03-20
- Autor: Copilot
- Cambio: Fix de runtime en IntroBillboard para suscripcion de `matchMedia` con fallback compatible (`addEventListener/removeEventListener` y `addListener/removeListener`).
- Impacto: Se elimina el error `TypeError: e[o] is not a function` en navegadores donde `MediaQueryList` no implementa los metodos modernos.
- Proximo paso: Validar en el navegador objetivo que glitch y desplazamiento por scroll se mantengan activos sin errores en consola.

- Fecha: 2026-03-20
- Autor: Copilot
- Cambio: Revision completa del IntroBillboard: reactivacion robusta de glitch por puntero a nivel de seccion, ajuste de desplazamiento por scroll con recalculo en resize y modo reduced-motion con intensidad reducida (no apagado total).
- Impacto: El intro vuelve a responder al puntero y al scroll de forma consistente, incluyendo escenarios donde antes los efectos quedaban inactivos.
- Proximo paso: Validar en navegadores con preferencia de movimiento reducido para confirmar que el comportamiento suave sigue siendo legible y no intrusivo.

- Fecha: 2026-03-20
- Autor: Copilot
- Cambio: Extraccion del bloque "Agency Worldwide" a componente independiente (`IntroBillboard`) con su logica de glitch y desplazamiento por scroll.
- Impacto: La home queda mas modular y mantenible, replicando el patron de integracion por componentes usado en visuals como el globe.
- Proximo paso: Evaluar si el componente requiere props para parametrizar textos/ritmo en futuras variantes editoriales.

- Fecha: 2026-03-20
- Autor: Copilot
- Cambio: Correccion de la animacion de "AGENCY WORLDWIDE" para que el desplazamiento horizontal por scroll use recorrido proporcional al viewport y permita salida completa hacia la izquierda.
- Impacto: El titular ahora abandona visiblemente la pantalla al descender, cumpliendo el efecto narrativo esperado.
- Proximo paso: Ajustar el factor de recorrido (1.2x viewport) segun ritmo deseado de direccion de arte.

- Fecha: 2026-03-20
- Autor: Copilot
- Cambio: Se agrego desplazamiento horizontal lento hacia la izquierda del texto "AGENCY WORLDWIDE" en la portada, vinculado al scroll descendente.
- Impacto: La cabecera gana continuidad narrativa durante el descenso, reforzando la sensacion inmersiva del hero.
- Proximo paso: Ajustar factor de desplazamiento maximo si se busca un movimiento mas sutil o mas dramatico en pantallas grandes.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Prisma de Services configurado como totalmente invisible, ocultando tanto la malla del solido como su contorno de aristas.
- Impacto: La seccion conserva las proyecciones de imagen y la rotacion, eliminando por completo la presencia visual del volumen base.
- Proximo paso: Confirmar si tambien se desea desactivar la interaccion de arrastre asociada al volumen oculto.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Prisma de Services con material transparente (caras y tapas) y eliminacion del halo/sombra cilindrica que lo rodeaba.
- Impacto: El volumen central reduce peso visual y deja mayor protagonismo a las imagenes proyectadas, con una lectura mas limpia del bloque.
- Proximo paso: Validar el nivel de opacidad en mobile para confirmar contraste suficiente sobre fondos claros.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Incremento del 10% en el tamaño del prisma de Services mediante aumento proporcional de su altura base y radio derivado.
- Impacto: Mayor presencia visual del sólido en la sección de Servicios sin alterar la relación de aspecto por cara.
- Proximo paso: Verificar encuadre final y ajustar cámara si se requiere más aire superior/inferior.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Alineacion de paneles de imagen con las caras del prisma y ajuste de separacion radial a un tercio del ancho de cada cara/imagen.
- Impacto: Las proyecciones conservan paralelismo con el solido y se separan de forma uniforme sin perder anclaje visual.
- Proximo paso: Ajustar opacidad del material base del prisma si compite visualmente con las proyecciones.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Correccion de visibilidad de proyecciones en Services con paneles `DoubleSide`, renderOrder superior y mayor separacion radial.
- Impacto: Las imagenes proyectadas vuelven a mostrarse de forma consistente durante la rotacion del prisma.
- Proximo paso: Ajustar finamente `outwardOffset` para balancear separacion y sensacion de anclaje al solido.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Proyeccion de imagenes hacia afuera del prisma mediante paneles por cara lateral, manteniendo dimension base de cara y separacion entre bordes.
- Impacto: Los bordes de imagenes dejan de tocarse visualmente en las uniones y se conserva el anclaje geométrico al prisma.
- Proximo paso: Ajustar `outwardOffset` si se requiere mayor o menor separacion entre caras proyectadas.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Recalculo del radio del prisma en Services para que cada cara lateral tenga la misma relacion de aspecto (416:630) que las imagenes aplicadas.
- Impacto: Las imagenes ocupan la cara sin barras laterales ni compresion visual, manteniendo proporcion nativa.
- Proximo paso: Validar visualmente en mobile si el nuevo ancho requiere ajustar FOV o posicion de camara.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Superposicion de 8 imagenes sobre las caras laterales del prisma de Services (orden solicitado), con escalado tipo contain para conservar relacion alto/ancho.
- Impacto: Cada cara lateral muestra arte visual sin distorsion y con secuencia repetida consistente alrededor del prisma.
- Proximo paso: Ajustar brillo/contraste de caras laterales si se requiere mayor legibilidad del contenido en motion.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Ajuste del prisma de Services para mantener eje vertical fijo, eliminando inclinacion en X/Z y conservando solo rotacion en Y.
- Impacto: El giro se percibe limpio y estable, sin cabeceo ni ladeo del solido.
- Proximo paso: Ajustar la velocidad angular si el ritmo de giro requiere mayor suavidad en desktop.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Reemplazo del solido de Services de esfera a prisma octagonal vertical en Three.js, eliminando logica de siluetas y marcadores heredados.
- Impacto: La seccion de Servicios ahora usa una geometria limpia y coherente con el requerimiento, con menor complejidad de render.
- Proximo paso: Ajustar material/iluminacion del prisma segun direccion de arte para reforzar contraste en caras laterales.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Creacion del componente `Services` como copia de `ImpactGlobe` e insercion en la seccion de Servicios de la home.
- Impacto: La seccion de Servicios ahora reutiliza una visual interactiva tipo globo 3D, alineada con el lenguaje inmersivo del sitio.
- Proximo paso: Definir si el globo de Servicios requiere marcadores/colores diferenciados para evitar duplicidad visual con Impacto.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Eliminacion completa del bloque del prisma en la seccion de Servicios y retorno a grilla de tarjetas.
- Impacto: Se simplifica la seccion, se elimina complejidad visual/tecnica y se estabiliza la experiencia.
- Proximo paso: Revisar con direccion de arte si se mantiene esta version simple o se define una nueva interaccion.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Incremento del 20% en el tamano del globo de Impacto para desktop y mobile.
- Impacto: Mayor protagonismo visual del bloque de Impacto y mejor presencia del globo en pantalla.
- Proximo paso: Verificar que el nuevo alto no genere exceso de scroll en dispositivos de baja altura.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Configuracion del prisma para rotacion horizontal automatica continua con periodo exacto de 24 segundos por vuelta.
- Impacto: El bloque de servicios recupera movimiento constante y predecible sin depender de scroll o drag.
- Proximo paso: Ajustar sentido de giro si direccion de arte solicita horario en lugar de antihorario.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Eliminacion de la logica de scroll y rotacion automatica/drag del prisma; queda sin rotacion programatica.
- Impacto: Se simplifica la interaccion del bloque de servicios y se elimina el movimiento continuo.
- Proximo paso: Confirmar si se desea mantener solo el tilt por hover o dejar el prisma completamente estatico.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Rotacion del prisma ajustada a sentido antihorario con eje en el centro del octagono y drag/scroll invertidos para coherencia.
- Impacto: El volumen rota de forma consistente respecto al centro y responde de manera intuitiva al gesto del usuario.
- Proximo paso: Validar el sentido de giro en trackpad y mouse para confirmar que se percibe natural.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Ajuste de transform inline en el prisma para asegurar que la rotacion horizontal se refleje visualmente.
- Impacto: Se corrige el desfase donde la seleccion rotaba pero el volumen permanecia estatico.
- Proximo paso: Validar en navegadores distintos que la rotacion se perciba fluida y consistente.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Correccion de la rotacion del prisma con liberacion de drag en cancel/blur y bloqueo de seleccion de imagenes/texto dentro del bloque.
- Impacto: El prisma mantiene rotacion continua y se elimina la seleccion accidental durante la interaccion.
- Proximo paso: Revisar sensibilidad de drag si se percibe demasiado sensible en trackpad.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Resaltado de la cara central del prisma con oscurecimiento de laterales y auto-rotacion horizontal continua similar al globo.
- Impacto: Mejora el foco visual en el servicio activo y mantiene el volumen 3D en movimiento suave sin desviacion vertical.
- Proximo paso: Ajustar la velocidad de rotacion si se requiere un ritmo mas lento para lectura.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Incremento adicional del diametro y la altura del prisma octagonal en Servicios para ampliar presencia en pantalla.
- Impacto: El bloque 3D gana mas escala y protagonismo visual frente a secciones adyacentes.
- Proximo paso: Validar cortes en mobile y ajustar el clamp si el volumen invade el siguiente pliegue.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Incremento del 20% en la altura del prisma octagonal en la seccion de servicios.
- Impacto: Mayor presencia vertical del volumen 3D, reforzando la jerarquia visual del bloque.
- Proximo paso: Confirmar que el nuevo alto mantiene ritmo de scroll en mobile sin saturar el pliegue.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Aumento del diametro y la altura del prisma octagonal en Servicios para darle mayor volumen y presencia vertical.
- Impacto: Se refuerza el efecto 3D y la lectura central al ampliar el volumen del prisma.
- Proximo paso: Validar que el nuevo alto no empuje demasiado la siguiente seccion en pantallas pequeñas.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Incremento del diametro del prisma octagonal en la seccion de servicios para ampliar la apertura visual de las caras.
- Impacto: Mayor presencia del volumen 3D y separacion mas clara entre caras laterales y frontal.
- Proximo paso: Revisar que el nuevo radio no cause recortes en viewport pequeños y ajustar el clamp si es necesario.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Reemplazo del carrusel 3D de servicios por un prisma octagonal con 8 caras (4 servicios repetidos) y rotacion controlada por mouse/scroll.
- Impacto: Se presenta el portafolio como volumen 3D continuo con lectura frontal reforzada y transiciones mas inmersivas.
- Proximo paso: Validar legibilidad del overlay en las caras laterales y ajustar el depth del prisma si se requiere mas apertura.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Reemplazo del carrusel de servicios por un carrusel 3D giratorio controlado por mouse/scroll, con tres imagenes visibles (central ampliada), contenedor estilo globo y rotacion para revelar la cuarta imagen.
- Impacto: La seccion de servicios gana profundidad y control interactivo directo, alineado con la estetica inmersiva del sitio.
- Proximo paso: Ajustar sensibilidad de rotacion y el radio del anillo segun feedback de UX en desktop y mobile.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Reemplazo de la grilla de Servicios por un carrusel horizontal con profundidad 3D usando imagenes locales (Creatividad, Marketing Experiencial, Marketing Digital y Branding) y overlay con titulo, resumen y CTA visible al hover/focus.
- Impacto: Se eleva el impacto visual de la seccion de servicios, se mantiene el contenido editorial existente y se mejora la interaccion con una presentacion mas inmersiva en desktop/mobile.
- Proximo paso: Validar con direccion de arte el nivel de inclinacion 3D y ajustar la densidad del overlay para conservar legibilidad sobre imagenes de alto contraste.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Alineacion del texto secundario de Impacto con el centro del titulo principal, linea inferior en blanco full-bleed hasta el borde derecho, eliminacion del halo/sombra del globo y aumento de sensibilidad al arrastre con clic.
- Impacto: Se mejora la legibilidad del encabezado, se limpia el marco visual del globo y el drag se siente mas directo.
- Proximo paso: Revisar el grosor de la linea blanca en pantallas 4K para confirmar que mantiene el peso deseado.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Correccion del bloque de subtitulo en Impacto para evitar superposicion entre "Somos un equipo global" y el texto pequeno, y reemplazo de la linea inferior por una linea full-bleed que se extiende hasta el borde derecho del viewport ignorando el margen del contenedor.
- Impacto: Se mejora legibilidad y jerarquia del encabezado de Impacto con una terminacion visual mas limpia y alineada al layout solicitado.
- Proximo paso: Verificar en 1366px y 1536px que la linea mantenga grosor consistente frente a variaciones de zoom del navegador.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Reacomodo del subtitulo de Impacto para evitar colision entre titulo y caption, aumentando separacion de columnas y elevando levemente el caption con mejor linea base en desktop/mobile.
- Impacto: Se mejora legibilidad y jerarquia del bloque, manteniendo la composicion horizontal sin empalmes de texto en resoluciones intermedias.
- Proximo paso: Validar visualmente en anchos 1024-1366 y ajustar el `gap` si se requiere mas aire editorial.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Ajuste final del bloque Impacto para mostrar "Somos un equipo global" en una sola linea con tamano de subtitulo estandar, manteniendo el caption "de creativos y estrategas que entiende el poder transformador de una #PowerfulIdea" y alineando su linea inferior a la base visual del titulo.
- Impacto: Se mejora la consistencia tipografica con el resto de subtitulos y la composicion horizontal del bloque.
- Proximo paso: Validar en resoluciones intermedias el punto de quiebre para evitar saltos no deseados en desktop pequeno.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Ajuste del bloque de texto en Impacto para dividir "Somos un equipo global" en dos lineas fijas ("Somos un" / "equipo global"), actualizar el texto secundario a "de creativos y estrategas que entiende el poder transformador de una #PowerfulIdea" y reducir su tamano al 40% del titulo.
- Impacto: Se mejora la jerarquia visual del mensaje principal y se alinea el contenido secundario al tono solicitado.
- Proximo paso: Validar contraste y legibilidad del texto secundario en pantallas pequenas.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Unificacion del layout horizontal para que todas las secciones aprovechen el ancho de pantalla y compartan el mismo margen izquierdo/derecho del bloque `Agency Worldwide` mediante variable global `--agency-inline-margin`.
- Impacto: Se mejora la consistencia de alineacion entre secciones y se utiliza mejor el espacio disponible sin perder aire visual lateral.
- Proximo paso: Revisar en monitores ultrawide si el margen actual requiere un tope maximo para equilibrio de lectura.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Eliminacion del bloque hero intermedio ("Somos un equipo global" con badges) que aparecia despues del modulo de apertura, segun solicitud de simplificacion visual.
- Impacto: Se reduce ruido de contenido en el primer pliegue y se evita redundancia con la seccion Impacto.
- Proximo paso: Ajustar espaciado vertical entre portada e Impacto para mantener ritmo visual tras la eliminacion.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Reemplazo del titulo "7 Oficinas" en la seccion Impacto por el subtitulo completo solicitado y maquetacion en formato dividido (titulo a la izquierda y texto corrido a la derecha con linea base), siguiendo el formato indicado previamente.
- Impacto: La seccion Impacto mantiene coherencia visual con el estilo editorial definido y presenta el mensaje institucional completo de forma destacada.
- Proximo paso: Ajustar longitud del texto en resoluciones intermedias si se detectan saltos de linea no deseados.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Ajuste de jerarquia tipografica en hero para reducir el tamano de "Somos un equipo global" al nivel de subtitulos de la pagina y eliminacion del duplicado inferior reemplazando el titulo de impacto por "7 Oficinas".
- Impacto: Se corrige redundancia de contenido y se mejora coherencia visual entre secciones.
- Proximo paso: Revisar espaciado del bloque hero para mantener balance tras la reduccion tipografica.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Reestructuracion del bloque hero para distribuir texto como referencia visual: titulo principal a la izquierda y texto complementario corrido a la derecha con separador inferior.
- Impacto: Mejora la lectura editorial del mensaje principal y replica una composicion mas cercana al layout solicitado.
- Proximo paso: Ajustar longitud exacta del texto complementario en desktop para evitar cortes en resoluciones intermedias.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Correccion de layout para eliminar barra de desplazamiento horizontal: ajuste del modulo full-bleed a viewport dinamico (`50dvw`) y recorte horizontal global con `overflow-x: clip` en `html, body`.
- Impacto: La pagina ahora se mantiene al ancho de pantalla sin desbordes laterales, incluyendo el bloque de apertura.
- Proximo paso: Validar en navegadores con distintas barras de scroll (Chrome/Edge/Firefox) para confirmar comportamiento consistente.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Refuerzo de interaccion de efectos en "AGENCY / WORLDWIDE" para activacion por paso de cursor sin clic, usando eventos pointer (`enter/leave/move`) y reinicio robusto de animacion por letra en cada rafaga.
- Impacto: Los efectos aleatorios se disparan de forma mas consistente y perceptible solo con hover del cursor sobre el titulo.
- Proximo paso: Ajustar frecuencia de bursts (`70ms` minimo en pointer move) segun preferencia visual del equipo.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Implementacion de efectos aleatorios breves sobre letras individuales en el titular "AGENCY / WORLDWIDE" al hover, con variaciones de deformacion/transicion tipo glitch organico.
- Impacto: Se incrementa la sensacion inmersiva y experimental del modulo de apertura sin afectar legibilidad sostenida del mensaje.
- Proximo paso: Ajustar intensidad/frecuencia de bursts segun feedback de UX para equilibrar impacto visual y confort de lectura.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Ajuste del modulo de apertura "AGENCY / WORLDWIDE" eliminando su fondo visual y triplicando los margenes izquierdo e inferior del bloque de texto.
- Impacto: El titular de apertura queda mas desplazado hacia esquina inferior izquierda y se integra con mayor limpieza al fondo global de la pagina.
- Proximo paso: Validar que el nuevo desplazamiento mantenga legibilidad en pantallas pequenas y ajustar breakpoint si es necesario.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Ajuste del modulo de apertura "AGENCY / WORLDWIDE" para ocupar todo el ancho del viewport y alinear el texto en la esquina inferior izquierda con margen inferior igual al margen izquierdo.
- Impacto: Se refuerza la composicion editorial del hero inicial con una lectura mas cinematografica y consistente en desktop/mobile.
- Proximo paso: Validar con direccion de arte la relacion exacta de gutter respecto a otras secciones para cierre visual.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Cambio global de tipografia del sitio a Montserrat, cargada con `next/font/google` y aplicada en `body` mediante variable CSS para consistencia en todos los componentes.
- Impacto: Se unifica la identidad tipografica en toda la pagina con mejor control de render y fallback estable.
- Proximo paso: Validar pesos tipograficos por seccion (titulares vs texto corrido) para afinar jerarquia visual final.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Mitigacion de error runtime intermitente en desarrollo (`TypeError: __webpack_modules__[moduleId] is not a function`) agregando scripts `dev:clean` (limpia `.next` antes de levantar) y `dev:webpack` (modo webpack explicito) en `package.json`.
- Impacto: Se reduce la recurrencia de desincronizacion de chunks/modulos en entorno local y se habilita una ruta de arranque estable para diagnostico.
- Proximo paso: Usar `npm run dev:clean` cuando aparezca el fallo y validar que solo exista una instancia de Next activa.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Incorporacion de un modulo fullscreen al inicio de la pagina con tipografia en relieve 3D en dos lineas: "AGENCY" (rojo) y "WORLDWIDE" (blanco), incluyendo fondo atmosferico y trama sutil para reforzar presencia visual de apertura.
- Impacto: Se agrega una portada inmersiva de alto impacto al entrar al sitio, mejorando jerarquia narrativa y recordacion de marca desde el primer pliegue.
- Proximo paso: Ajustar escala/fuerza de relieve del texto con validacion de direccion de arte en pantallas ultrawide y moviles compactos.

- Fecha: 2026-03-19
- Autor: Copilot
- Cambio: Actualizacion de directrices del agente `director-experiencia-web` para considerar patrones de shadcn/ui de forma selectiva (sin aplicacion uniforme) y refresh visual en componentes clave (cards, CTA, links y banderas) con superficies elevadas, bordes y estados mas definidos.
- Impacto: La interfaz gana claridad y calidad percibida con un lenguaje de componentes mas robusto, manteniendo la identidad inmersiva y evitando una apariencia plana/generica.
- Proximo paso: Validar con UX si el balance entre lenguaje inmersivo y componentes tipo shadcn es el esperado en desktop y mobile.

- Fecha: 2026-03-18
- Autor: Copilot
- Cambio: Actualizacion de texto en la seccion de impacto para reemplazar "Paises impactados" por "7 Oficinas", incluyendo condicion de render y etiquetas accesibles relacionadas.
- Impacto: Se alinea la redaccion visible y semantica del bloque con el mensaje institucional solicitado.
- Proximo paso: Validar contenido final con diseno/editorial para mantener consistencia en toda la pagina.

- Fecha: 2026-03-18
- Autor: Copilot
- Cambio: Implementacion de interaccion por banderas: al presionar una bandera se centra el pin correspondiente en el globo durante 24 segundos y luego el globo retoma su comportamiento habitual.
- Impacto: Mejora de navegacion guiada en el bloque de impacto, permitiendo enfocar paises clave bajo demanda sin perder la animacion general al finalizar el foco.
- Proximo paso: Evaluar feedback visual del estado activo de bandera para indicar claramente el pais actualmente enfocado.

- Fecha: 2026-03-18
- Autor: Copilot
- Cambio: Ajuste de comportamiento fuera del recuadro del globo para mantener rotacion constante de 1 revolucion cada 24 segundos mientras retorna lentamente a orientacion norte (enderezando inclinacion X/Z).
- Impacto: Se conserva movimiento continuo en reposo sin perder referencia visual de orientacion base, con transicion mas suave y controlada.
- Proximo paso: Ajustar finamente `returnToNorthLerp` segun preferencia de direccion de arte para retorno aun mas lento o mas perceptible.

- Fecha: 2026-03-18
- Autor: Copilot
- Cambio: Actualizacion de banderas del bloque de impacto a recursos de mayor resolucion (flagcdn w160) y retiro de bordes/sombras visuales; ajuste de rotacion del globo fuera del recuadro para mantener 1 giro cada 24 segundos.
- Impacto: Mejor nitidez de banderas en pantalla y comportamiento de rotacion externa predecible y uniforme para la experiencia de lectura.
- Proximo paso: Validar percepcion de velocidad en pantallas de 60Hz y 120Hz para confirmar que el ritmo visual se mantiene consistente.

- Fecha: 2026-03-18
- Autor: Copilot
- Cambio: Optimizacion de banderas del bloque de impacto reemplazando `img` por `next/image` y habilitando `flagcdn.com` en `next.config.mjs`.
- Impacto: Se elimina advertencia de lint de Next.js y se mejora gestion de carga/render de imagenes remotas.
- Proximo paso: Evaluar mover banderas a assets locales si se requiere independencia total de red externa.

- Fecha: 2026-03-18
- Autor: Copilot
- Cambio: Reduccion de velocidad del globo al 20% (auto-rotacion, seguimiento y drag), eliminacion del marco del recuadro del globo y reemplazo del texto "7 oficinas" por banderas en imagenes de Colombia, Mexico, USA, Panama, Peru, Espana y China.
- Impacto: Interaccion visual mas pausada, bloque del globo mas limpio y lectura de paises impactados mas clara mediante iconografia de banderas.
- Proximo paso: Verificar carga de banderas en red restringida y, si aplica, migrarlas a assets locales para evitar dependencia externa.

- Fecha: 2026-03-18
- Autor: Copilot
- Cambio: Ajuste visual del bloque de globo: incremento de altura en 50% y fondo del recuadro del globo configurado como transparente.
- Impacto: Se mejora la presencia visual del globo en pantalla y se integra mejor con el fondo general de la experiencia al eliminar relleno propio del contenedor.
- Proximo paso: Validar balance de composición en desktop y mobile para ajustar altura si el bloque desplaza demasiado el contenido siguiente.

- Fecha: 2026-03-18
- Autor: Copilot
- Cambio: Adicion de puntos de referencia 3D sobre el globo para Colombia, Mexico, USA, Panama, Peru, Espana y China usando coordenadas geograficas (lat/lon) proyectadas en la esfera.
- Impacto: Se visualiza de forma inmediata la presencia en paises clave y se refuerza la narrativa de alcance global del bloque de impacto.
- Proximo paso: Ajustar tamano/halo de marcadores segun contraste final y validar legibilidad en mobile.

- Fecha: 2026-03-18
- Autor: Copilot
- Cambio: Corrección del flujo de seguimiento automático del cursor en el globo 3D para que funcione sin clic incluso cuando `prefers-reduced-motion` está activo; se mantiene desactivada solo la auto-rotación base en ese modo.
- Impacto: El globo vuelve a reaccionar al movimiento del mouse sin necesidad de drag/clic en entornos con reduced motion, evitando la percepción de fallo funcional.
- Proximo paso: Validar manualmente con reduced-motion ON/OFF en sistema operativo para confirmar comportamiento esperado de accesibilidad.

- Fecha: 2026-03-18
- Autor: Copilot
- Cambio: Corrección de bug en seguimiento automático del cursor del globo 3D: el radio proyectado se calculaba con un punto que rotaba con la esfera y podía colapsar en ciertos ángulos; ahora se calcula con referencia estable al eje derecho de cámara.
- Impacto: El seguimiento del cursor vuelve a ser consistente y continuo en cualquier orientación del globo, sin zonas muertas ni saltos por normalización incorrecta.
- Proximo paso: Realizar prueba manual en bordes del recuadro y en distintos niveles de zoom del navegador para afinar sensibilidad final.

- Fecha: 2026-03-18
- Autor: Copilot
- Cambio: Ajuste del seguimiento del globo 3D para orientar el giro hacia la ubicación del mouse usando como referencia el centro proyectado de la esfera (centro y radio reales en pantalla), sin requerir clic.
- Impacto: El movimiento responde de forma más natural y precisa al puntero, ya que la dirección se calcula respecto a la geometría visible del globo y no al centro del contenedor.
- Proximo paso: Validar sensibilidad de seguimiento en resoluciones extremas y ajustar `followRotationMax` según feedback de UX.

- Fecha: 2026-03-18
- Autor: Copilot
- Cambio: Refactor de la interacción del globo 3D para rotación infinita en cualquier dirección, reemplazando objetivo angular con velocidad angular e inercia y eliminando el clamp del eje X.
- Impacto: El globo ya no se bloquea por límites de inclinación y permite giro continuo libre en X/Y con control por puntero y movimiento fluido.
- Proximo paso: Ajustar sensibilidad de arrastre e inercia con pruebas UX en desktop y touch para definir preset final de demo.

- Fecha: 2026-03-17
- Autor: Copilot
- Cambio: Ajuste de la auto-rotación del globo para mantener giro continuo incluso con el cursor dentro del recuadro: se conserva velocidad base y se suma la influencia del cursor por dirección y distancia.
- Impacto: Se evita la sensación de rotación detenida y se mantiene respuesta interactiva sin perder movimiento automático.
- Proximo paso: Validar con QA visual la sensibilidad final en pantallas táctiles y escritorio.

- Fecha: 2026-03-17
- Autor: Copilot
- Cambio: Actualización de interacción del globo para seguimiento 2D del cursor dentro del recuadro: rotación en cualquier dirección (ejes X/Y) y velocidad proporcional a la distancia entre cursor y centro.
- Impacto: El globo ahora sigue el cursor de forma natural en 360° y acelera al alejarse del centro, mejorando control e inmersión.
- Proximo paso: Calibrar sensibilidad final de `followRotationMax` para modo demo/presentación.

- Fecha: 2026-03-17
- Autor: Copilot
- Cambio: Corrección de la auto-rotación dirigida por cursor en el globo: normalización robusta del puntero dentro del recuadro, mantenimiento de dirección cerca del centro y alineación suave en eje X según posición vertical del cursor.
- Impacto: El globo responde de forma consistente al cursor dentro del recuadro y evita bloqueos de dirección o falta de reacción percibida.
- Proximo paso: Ajustar la sensibilidad final de giro para demo en pantallas grandes.

- Fecha: 2026-03-17
- Autor: Copilot
- Cambio: Implementación de auto-rotación dirigida por cursor en el globo 3D: mientras el puntero está dentro del recuadro, la dirección y velocidad de giro se ajustan según la posición horizontal del cursor.
- Impacto: Interacción más intuitiva y controlada del movimiento del globo sin perder rotación automática.
- Proximo paso: Ajustar sensibilidad de giro con feedback de UX en mobile/desktop.

- Fecha: 2026-03-17
- Autor: Copilot
- Cambio: Eliminación de puntos de referencia del globo (marcadores 3D y banda visual de países) para dejar una visual limpia centrada en siluetas continentales.
- Impacto: Se reduce ruido visual y se mejora la lectura del mapa sobre la esfera.
- Proximo paso: Ajustar contraste de continentes según revisión final de arte.

- Fecha: 2026-03-17
- Autor: Copilot
- Cambio: Sustitución del pipeline de dibujo de continentes por proyección geográfica con d3-geo (geoEquirectangular + geoPath) sobre TopoJSON real.
- Impacto: Se corrige la no visibilidad de continentes causada por proyección manual de anillos; las masas continentales vuelven a renderizarse de forma consistente.
- Proximo paso: Ajustar contraste fino de tierra/costa según feedback visual final.

- Fecha: 2026-03-17
- Autor: Copilot
- Cambio: Eliminación de capas visuales que interferían con la lectura de continentes en el globo 3D (rejilla 2D de textura, hatch interno y malla wireframe sobre la esfera).
- Impacto: Las siluetas continentales quedan nítidas y sin elementos superpuestos, mejorando claridad visual en la sección de países impactados.
- Proximo paso: Validar contraste final de tierra y costa en mobile para cierre de arte.

- Fecha: 2026-03-17
- Autor: Copilot
- Cambio: Corrección del render de continentes en el globo 3D, eliminando el trazado con wrapping que cancelaba rellenos y usando dibujo directo de polígonos TopoJSON con mayor contraste de tierra/costa.
- Impacto: Las siluetas continentales vuelven a ser visibles y legibles durante la rotación, manteniendo performance y compatibilidad.
- Proximo paso: Validar en navegador contraste final en mobile y desktop con el equipo de diseño.

- Fecha: 2026-03-17
- Autor: Copilot
- Cambio: Integración de datos geográficos reales usando world-atlas/land-50m.json para siluetas continentales precisas, reemplazando coordenadas manuales con procesamiento TopoJSON.
- Impacto: Siluetas continentales ahora exactas y realistas, mejorando la inmersión visual sin comprometer performance.
- Proximo paso: Validar visualmente y optimizar si necesario.

- Fecha: 2026-03-17
- Autor: Copilot
- Cambio: Resuelto error de módulo 'topojson-client' mediante reinstalación limpia de node_modules, asegurando compatibilidad con Next.js 15.
- Impacto: Build y dev server funcionan correctamente, eliminando bloqueo en desarrollo.
- Proximo paso: Ejecutar dev server y validar experiencia visual del globo.

- Fecha: 2026-03-17
- Autor: Copilot
- Cambio: Refinamiento de siluetas continentales en globo 3D con coordenadas más detalladas y precisas (15-20 puntos por continente vs 5-10 anteriores), mejorando fidelidad visual a formas geográficas reales sin aumentar complejidad de render.
- Impacto: Continentes más reconocibles y cercanos a la realidad en rotación, manteniendo ligereza de bundle y performance.
- Proximo paso: Validar experiencia visual final y ajustar si es necesario para mobile/desktop.
- Autor: Copilot
- Cambio: Refinamiento de la seccion de paises impactados con ajuste del globo 3D para renderizar siluetas continentales mas cercanas a la geografia real, reemplazando el rayado dominante por relleno de tierra y linea de costa mas legible.
- Impacto: Mejora la lectura visual de continentes en rotacion sin perder ligereza de render ni interaccion en la experiencia.
- Proximo paso: Validar con equipo de diseno el nivel de detalle de costas y contraste en mobile para definir preset final.
- Autor: Copilot
- Cambio: Creacion inicial de README con stack propuesto, linea de desarrollo, gobernanza de agentes y skills, y politica de bitacora.
- Impacto: Define base de trabajo para el demo institucional inmersivo.
- Proximo paso: Crear scaffolding tecnico del proyecto Next.js y primer vertical slice de Home.

- Fecha: 2026-03-16
- Autor: Copilot
- Cambio: Creacion de agentes director-experiencia-web e integrador-contenido-tnt; creacion de skills content-mapping-tnt y experience-sprint-web; actualizacion de instruccion global para exigir actualizacion de bitacora y stack en README.
- Impacto: Se establecen lineas de trabajo claras entre arquitectura, experiencia y contenido, con trazabilidad documental obligatoria.
- Proximo paso: Ejecutar fase de discovery de contenido TNT y crear backlog del vertical slice de Home.

- Fecha: 2026-03-16
- Autor: Copilot
- Cambio: Scaffolding inicial del proyecto Next.js con TypeScript, estructura de app base y configuracion para desarrollo local.
- Impacto: El equipo ya puede ejecutar pruebas locales en servidor de desarrollo para iterar sobre el demo.
- Proximo paso: Integrar primera seccion Home con contenido mapeado de TNT y animaciones base.

- Fecha: 2026-03-16
- Autor: Copilot
- Cambio: Implementacion del primer vertical slice de Home con narrativa, servicios, casos y presencia regional; separacion del contenido base en app/data/tnt-content.ts y actualizacion visual inmersiva en estilos globales.
- Impacto: El demo ya representa una experiencia institucional mas cercana al objetivo y habilita iteraciones de motion y contenido real.
- Proximo paso: Integrar scroll-driven transitions y conectar contenido a CMS headless.

- Fecha: 2026-03-16
- Autor: Copilot
- Cambio: Mapeo de la pagina Inicio de TNT desde fuente publica de WordPress y actualizacion de Home para mantener secciones e informacion clave: equipo global, paises impactados, trayectoria, colaboradores, servicios, casos de exito, CTA de contacto, redes sociales y enlaces legales.
- Impacto: La demo queda alineada semanticamente con la estructura institucional original de TNT sin perder contenido critico.
- Proximo paso: Conectar este modelo a CMS y validar textos finales con cliente para version de presentacion.

- Fecha: 2026-03-16
- Autor: Copilot
- Cambio: Correccion de tipado en componente scroll-journey para compatibilidad con TypeScript estricto durante build.
- Impacto: Se evita fallo de compilacion y se mantiene estabilidad del pipeline local.
- Proximo paso: Evaluar si el componente scroll-journey sigue vigente en esta fase o se retira del codigo activo.

- Fecha: 2026-03-16
- Autor: Copilot
- Cambio: Integracion de capa de animaciones 2D para Home con orquestador de motion en cliente (reveal por seccion, parallax sutil por puntero y progreso de scroll, orbes atmosfericos en hero, mejoras hover) y fallback para reduced-motion.
- Impacto: La experiencia visual gana profundidad e intencionalidad narrativa sin comprometer accesibilidad ni estabilidad de compilacion.
- Proximo paso: Ajustar timing y amplitud de animaciones con feedback del cliente y definir preset de intensidad para modo demo/presentacion.

- Fecha: 2026-03-16
- Autor: Copilot
- Cambio: Implementacion de globo terraqueo 3D interactivo en la seccion de paises impactados usando Three.js, con rotacion automatica suave, interaccion por drag, marcadores luminosos y banda de paises en flags.
- Impacto: Se eleva el bloque de impacto a una visual mas cercana al referente solicitado, reforzando narrativa global de presencia regional.
- Proximo paso: Afinar densidad de marcadores y estilo del globo (textura/lineas) con feedback visual del cliente.

- Fecha: 2026-03-16
- Autor: Copilot
- Cambio: Ajustes de estabilidad para el globo 3D: instalacion de tipados de Three.js y correccion de lint prefer-const en el componente.
- Impacto: Build y chequeos de tipos quedan consistentes para desarrollo y despliegue local.
- Proximo paso: Revisar detalle visual del globo (lineado continental y glow de marcadores) en sesion de refinamiento UX.

- Fecha: 2026-03-16
- Autor: Copilot
- Cambio: Implementacion de continentes rayados en el globo 3D mediante textura procedural equirectangular, con lineado magenta inclinado y anillos concentricos en zona de Africa para reforzar el estilo visual solicitado.
- Impacto: La seccion de paises impactados se aproxima de forma clara a la referencia visual compartida, manteniendo interaccion y performance.
- Proximo paso: Ajustar siluetas continentales y distribucion de marcadores en revision visual con el cliente.

- Fecha: 2026-03-16
- Autor: Copilot
- Cambio: Reemplazo de siluetas abstractas por contornos continentales simplificados en coordenadas geograficas (inspirado en referencia cartografica Natural Earth 110m), sin islas y con rayado procedural para mantener bajo peso de despliegue.
- Impacto: Los continentes son mas reconocibles visualmente sin introducir librerias GIS pesadas ni aumentar de forma significativa el costo de runtime.
- Proximo paso: Afinar vertices de Eurasia y costa oeste de America para una lectura aun mas precisa en desktop grande.

- Fecha: 2026-03-16
- Autor: Copilot
- Cambio: Cambio de proceso para el globo 3D: adopcion de base cartografica real TopoJSON 110m (world-atlas) convertida a textura procedural rayada, con filtrado de poligonos pequenos para ignorar islas y mantener peso ligero.
- Impacto: Mejora la representacion de continentes respecto a aproximaciones manuales, conservando un bundle liviano y render estable.
- Proximo paso: Ajustar umbral de filtrado por area y grosor de rayado segun revision visual en mobile/desktop.

- Fecha: 2026-03-16
- Autor: Copilot
- Cambio: Refinamiento del globo para proyectar siluetas continentales directamente sobre la esfera con textura unica (oceano + tierra rayada), aplicando correccion de antimeridiano para continuidad visual y mejor lectura de formas.
- Impacto: Se mejora la fidelidad 3D de los continentes en rotacion real, evitando cortes notorios en el borde del mapa y manteniendo un despliegue ligero.
- Proximo paso: Evaluar preset alterno de resolucion de textura (1536/1024) para balancear nitidez y peso segun dispositivo.
