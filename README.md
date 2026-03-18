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
- Fecha: 2026-03-17
- Autor: Copilot
- Cambio: Implementación de auto-rotación dirigida por cursor en el globo: mientras el puntero está dentro del recuadro, la esfera gira automáticamente hacia izquierda/derecha según la posición horizontal del mouse.
- Impacto: La interacción se vuelve más intuitiva y reactiva, reforzando la sensación inmersiva sin requerir click o drag.
- Proximo paso: Ajustar sensibilidad de velocidad por zona central/bordes según feedback de UX.

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
