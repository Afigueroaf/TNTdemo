# Instrucciones del proyecto

Objetivo:
- Construir un proyecto mantenible, probado y facil de evolucionar.

Reglas de trabajo:
- Antes de editar codigo: inspeccionar estructura y dependencias.
- Para cambios no triviales: proponer un plan corto de pasos.
- Mantener cambios pequenos y enfocados por commit.
- Evitar refactors amplios si no son parte del objetivo.
- Agregar pruebas en cambios de logica cuando sea viable.

Estilo:
- Nombres claros y consistentes.
- Comentarios solo donde haya complejidad real.
- No duplicar logica: extraer funciones reutilizables.

Validacion:
- Ejecutar build/lint/tests antes de cerrar una tarea (si existen en el repo).
- Reportar riesgos o supuestos cuando no se pueda validar.

Documentacion obligatoria:
- En cada modificacion de codigo, configuracion, arquitectura, agentes o skills, actualizar README.md en la seccion "Bitacora de cambios".
- Cada entrada en README.md debe incluir: Fecha, Autor, Cambio, Impacto y Proximo paso.
- Al inicio de README.md mantener siempre actualizado el stack en 4 secciones:
	- Programming and markup languages
	- Frameworks and libraries
	- Databases and cloud hosting
	- Software and tools
- Las tecnologias del stack deben estar en formato de badges HTML con img de shields.io.

Cuando pedir confirmacion:
- Cambios destructivos de datos.
- Migraciones de estructura grande.
- Modificaciones de seguridad/autenticacion.
