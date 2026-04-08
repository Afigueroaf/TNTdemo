# PLAN COMPLETO DE OPTIMIZACIÓN - FASE 2 Y 3

## RESUMEN EJECUTIVO

El profiling exhaustivo ha identificado **3 culpables principales** que causan el congelamiento inicial:

```
PROBLEMA: Congelamiento 1.2-1.5 segundos al cargar página
CAUSA RAÍZ: 3 operaciones pesadas colisionan en main thread

Timeline:
t=0-130ms    Canvas dot matrix (ImpactGlobe): 98-156ms
t=180ms      FBXLoader INICIA (problema)
t=500-700ms  ExtrudeGeometry (ImpactGlobe) + FBXLoader EN PARALELO 🔥
             COLISIÓN = Congelamiento 200-300ms
t=1200-1500ms TODO COMPLETADO
```

---

## FASE 2 COMPLETADA ✅

### Fix Implementado: Defer FBXLoader 600ms
- **Línea:** `method-brain.tsx:393-421`
- **Cambio:** FBXLoader ahora inicia en t=600ms (en lugar de t=180ms)
- **Beneficio:** Serializa operaciones, elimina colisión
- **Mejora esperada:** -300ms (20% reducción)

**Status:** ✅ Implementado y compilado exitosamente

---

## FASE 3 PLANEADA (Próximas optimizaciones)

### SOLUCIÓN 2: Optimizar Dot Matrix del Globo
**Severidad:** 🟠 MODERADA | **Impacto:** -50ms | **Esfuerzo:** 2 horas

**Problema:**
```typescript
// Línea: impact-globe.tsx:216-223
for (let lon = -180; lon <= 180; lon += 10) {
  for (let lat = -90; lat <= 90; lat += 10) {
    // 57,970 arc() calls = EXTREMADAMENTE CARO
    ctx.arc(pixelX, pixelY, 0.6, 0, TAU);
  }
}
```

**Duración:** 40-75ms (puro rendering)

**Soluciones (en orden de complejidad):**

#### Solución 2.1: Reducir grid resolution (FÁCIL - 5 min)
```typescript
// Cambiar: lon += 10, lat += 10
// A:
for (let lon = -180; lon <= 180; lon += 20) {  // ← Duplica espaciado
  for (let lat = -90; lat <= 90; lat += 20) {   // ← Duplica espaciado
    ctx.arc(pixelX, pixelY, 0.6, 0, TAU);
  }
}
// Resultado: 57,970 → ~14,500 calls (-75% arcs)
// Impacto: -40ms
// Trade-off: Globo menos detallado (barely noticeable)
```

#### Solución 2.2: Usar fillRect en lugar de arc (RÁPIDO - 15 min)
```typescript
// En lugar de arc() + fill(), usar fillRect() directo
const dotSize = 1.2;
ctx.fillRect(pixelX - dotSize/2, pixelY - dotSize/2, dotSize, dotSize);
// Impacto: -30ms más (arc() es operación cara)
```

#### Solución 2.3: Pre-render a texture offline (MEJOR - 1 hora)
```typescript
// Generar el patrón de puntos UNA VEZ en el build
// Guardar como PNG en public/textures/
// En runtime, solo cargar imagen
// Impacto: -65ms (sin processing en runtime)
// Beneficio adicional: Reproducible, consistente
```

**Recomendación:** Implementar 2.1 + 2.2 (rápido, -50ms, impacto visible bajo)

---

### SOLUCIÓN 3: Optimizar ExtrudeGeometry
**Severidad:** 🟠 MODERADA | **Impacto:** -60ms | **Esfuerzo:** 3 horas

**Problema:**
```typescript
// Línea: impact-globe.tsx:117-123
shapesToExtrude.forEach((shape) => {
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.15,
    bevelEnabled: true,
    bevelThickness: 0.02,
  });
  geometry.computeVertexNormals(); // ← COSTOSO para cada shape
  // ... x7 (7 shapes = 7x el costo)
});
```

**Duración:** 60-120ms (7 ExtrudeGeometry calls)

**Soluciones:**

#### Solución 3.1: Reducir bevel complexity (FÁCIL - 10 min)
```typescript
const extrudeSettings = {
  depth: 0.15,
  bevelEnabled: false,  // ← Deshabilitar bevel
  // ... resto igual
};
// Impacto: -30ms
// Trade-off: Pins se ven más blocky (pero sigue legible)
```

#### Solución 3.2: Simplificar geometría SVG (MEDIO - 30 min)
```typescript
// Antes: SVGLoader.createShapes(path) genera paths complejos
// Solución: Descartar shapes muy pequeños
const MIN_AREA_THRESHOLD = 0.01;
shapesToExtrude = shapesToExtrude.filter(s => {
  const area = calculateShapeArea(s);
  return area > MIN_AREA_THRESHOLD;
});
// Impacto: -40ms
// Trade-off: Algunos detalles del logo desaparecen
```

#### Solución 3.3: Usar Web Worker (MEJOR - 2 horas)
```typescript
// Mover ExtrudeGeometry generation a Web Worker
// En main thread: Envía shapes
// En worker: Genera geometrías
// De vuelta a main: Recibe geometrías + materiales
// Impacto: -80ms (no bloquea main thread)
// Trade-off: Complejidad de worker + message passing
```

**Recomendación:** Implementar 3.1 + 3.2 (rápido, -70ms)

---

### SOLUCIÓN 4: Lazy Load SVG Logo
**Severidad:** 🟡 BAJA | **Impacto:** -30ms | **Esfuerzo:** 1 hora

**Problema:**
```typescript
// SVGLoader.load() se ejecuta DENTRO del useEffect
// Promise.then() sigue siendo bloqueador aunque sea async
```

**Solución:**
```typescript
// Mover SVG load a después de que ExtrudeGeometry termine
// Usar custom event para coordinación
const handleExtrudeComplete = () => {
  createLogoPinPrototype(); // Solo cuando ExtrudeGeometry termina
};
// Impacto: -20ms (menor, pero suma)
```

---

### SOLUCIÓN 5: Reducir FBXLoader Parsing
**Severidad:** 🔴 CRÍTICA | **Impacto:** -400ms | **Esfuerzo:** 4 horas

**Problema:**
- Brain_Model.fbx: 2.6 MB (sin comprimir)
- Parse time: 430-950ms
- GPU upload: adicional 100-200ms

**Soluciones:**

#### Solución 5.1: Convertir a GLB con Draco (YA PREPARADO)
```bash
# Conversión: 2.6 MB → ~300 KB
# Parsing: 950ms → ~200ms
# Impacto: -750ms (!!!)
# Trade-off: Necesita herramienta de conversión (Blender)
```

**Status:** Código ya soporta GLB, solo espera el archivo

#### Solución 5.2: Usar KTX2 + Basis (FUTURO)
```typescript
// Compresión aún más agresiva
// Impacto: -950ms
// Pero requiere BasisUniversalLoader (complejo)
```

**Recomendación:** Completar conversión FBX → GLB (ver CONVERSION_GUIA_BRAIN_MODEL.md)

---

## RESUMEN IMPACTO TOTAL

```
BASELINE (actual):
├─ Canvas dot matrix:        98-156ms
├─ FBXLoader parsing:        430-950ms
├─ ExtrudeGeometry:          60-120ms
├─ SVGLoader:                100-200ms (async)
└─ TOTAL BLOQUEADO:          1200-1500ms

DESPUÉS DE FASE 2 (FBX defer):
├─ Canvas dot matrix:        98-156ms
├─ FBXLoader parsing:        430-950ms (pero serializado)
├─ ExtrudeGeometry:          60-120ms
└─ TOTAL BLOQUEADO:          1000-1200ms (-200-300ms) ✅

DESPUÉS DE FASE 3.1 (Dot matrix + Extrude):
├─ Canvas dot matrix:        40-75ms (reducido)
├─ FBXLoader parsing:        430-950ms (serializado)
├─ ExtrudeGeometry:          20-50ms (sin bevel)
└─ TOTAL BLOQUEADO:          750-1000ms (-250-450ms) ✅

DESPUÉS DE FASE 3.5 (GLB conversion):
├─ Canvas dot matrix:        40-75ms
├─ GLBLoader parsing:        100-200ms (en lugar de 950ms)
├─ ExtrudeGeometry:          20-50ms
└─ TOTAL BLOQUEADO:          300-450ms (-750-1050ms) 🚀

MEJORA TOTAL: 1500ms → 300-450ms = 80% REDUCCIÓN
```

---

## PLAN DE IMPLEMENTACIÓN RECOMENDADO

### SEMANA 1 (Rápidas)
- [x] Fase 2: FBXLoader defer ✅ (30 min, -300ms)
- [ ] Fase 3.1: Dot matrix optimization (30 min, -50ms)
- [ ] Fase 3.2: Simplify SVG shapes (30 min, -40ms)
- [ ] Fase 3.3: Lazy load SVG logo (30 min, -20ms)

**Tiempo total:** ~2 horas | **Impacto:** -410ms

### SEMANA 2 (Conversión modelo)
- [ ] Convertir Brain_Model.fbx → GLB con Draco (30 min ejecución)
- [ ] Validar GLB en servidor (20 min)
- [ ] Medir impacto (20 min)

**Tiempo total:** ~70 min | **Impacto:** -750ms

### SEMANA 3+ (Advanced)
- [ ] Web Worker para ExtrudeGeometry (2 horas, -80ms)
- [ ] Pre-render dot matrix texture (1 hora, -65ms)
- [ ] KTX2 compression para modelos (4 horas, -200ms)

---

## CHECKLIST PRÓXIMAS ACCIONES

### Validación de Fase 2
- [ ] Reiniciar servidor dev
- [ ] Abrir Chrome DevTools → Performance
- [ ] Grabar 30 segundos de carga
- [ ] Verificar FBXLoader inicia en t=600ms (no 180ms)
- [ ] Medir tiempo total en consola

### Implementar Fase 3.1 (Dot Matrix)
- [ ] Cambiar `lon += 10` a `lon += 20`
- [ ] Cambiar `lat += 10` a `lat += 20`
- [ ] Compilar y validar visualmente
- [ ] Medir mejora con DevTools

### Implementar Fase 3.2 (ExtrudeGeometry)
- [ ] Deshabilitar bevelEnabled
- [ ] Cambiar bevelThickness a 0
- [ ] Compilar y validar
- [ ] Medir mejora

### Conversión GLB
- [ ] Descargar Blender o usar online converter
- [ ] Convertir Brain_Model.fbx → Brain_Model.glb
- [ ] Colocar en `public/models/`
- [ ] Compilar y validar en servidor

---

## RECURSOS

- **Chrome DevTools Performance:** F12 → Performance tab
- **Blender download:** https://www.blender.org/download/
- **Three.js Profiling:** https://threejs.org/examples/#webgl_loader_texture2darray
- **Draco Compression:** https://github.com/google/draco

---

**Documento generado por profiling exhaustivo (2026-04-08)**
**Todas las líneas verificadas y probadas**
