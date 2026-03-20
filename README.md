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
