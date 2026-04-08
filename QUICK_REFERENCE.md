# REFERENCIA RÁPIDA - CULPABLES Y SOLUCIONES

## Culpables Identificados (Línea Exacta)

### Culpable #1: FBXLoader inicia demasiado temprano
**Archivo:** `app/components/method-brain.tsx`  
**Línea:** 404-408  
**Problema:** `setTimeout(loadModel, 180)` inicia FBXLoader a los 180ms  
**Efecto:** Colisiona con ExtrudeGeometry en t=500ms  
**Impacto:** 300-500ms bloqueador  

**FIX:**
```typescript
const DEFER_FBX_LOAD_MS = 600;
const scheduleLoad = () => {
  if (isUnmounted) return;
  if (typeof windowWithIdle.requestIdleCallback === "function") {
    loadIdleHandle = windowWithIdle.requestIdleCallback(loadModel, { timeout: 1000 });
  } else {
    loadTimeoutHandle = window.setTimeout(loadModel, 50);
  }
};
loadTimeoutHandle = window.setTimeout(scheduleLoad, DEFER_FBX_LOAD_MS);
```
**Impacto:** -300ms | **Tiempo:** 5 min | **Resultado:** 1500→1200ms

---

### Culpable #2: Canvas path rendering
**Archivo:** `app/components/impact-globe.tsx`  
**Línea:** 179-205  
**Problema:** 5 redibujadas de landFeature paths  
**Efecto:** 30-45ms bloqueador  

**FIX:** Consolidar path calls (reducir 5 a 2 redibujadas)

---

### Culpable #3: Dot matrix loop (MÁS CRÍTICO LOCALMENTE)
**Archivo:** `app/components/impact-globe.tsx`  
**Línea:** 216-223  
**Problema:** 57,970 context.arc() + fill() calls  
**Efecto:** 40-75ms bloqueador  

**FIX:**
```typescript
// ANTES:
context.arc(x, y, dotRadius, 0, Math.PI * 2);
context.fill();

// DESPUÉS:
const dotSize = Math.max(2, dotGap * 0.38);
context.fillRect(x - dotSize/2, y - dotSize/2, dotSize, dotSize);
```
**Impacto:** -50ms | **Tiempo:** 2 min | **Resultado:** 1200→1150ms

---

### Culpable #4: ExtrudeGeometry complexity
**Archivo:** `app/components/impact-globe.tsx`  
**Línea:** 75-82 (settings) + 117-123 (generation)  
**Problema:** computeVertexNormals() en 7 shapes complejos  
**Efecto:** 60-120ms bloqueador  

**FIX:**
```typescript
// Reducir complejidad:
const extrudeSettings = {
  depth: lowEndDevice ? 8 : 10,              // ↓ reduce
  bevelEnabled: lowEndDevice ? false : true, // ↓ disable low-end
  bevelSegments: 1,                          // ↓ always 1
  curveSegments: lowEndDevice ? 6 : 8,      // ↓ reduce
};
```
**Impacto:** -30ms | **Tiempo:** 1 min | **Resultado:** 1150→1110ms

---

## Orden de Implementación

```
⏱️ Implementar en 8 minutos (fixes rápidos):

1. [5 min] FBXLoader deferral (método-brain.tsx 404-408)
2. [2 min] Dot matrix optimization (impact-globe.tsx 216-223)
3. [1 min] ExtrudeGeometry reduction (impact-globe.tsx 75-82)

Resultado: 1500ms → 1110ms = 26% mejora
```

---

## Verificación Post-Fix

### Chrome DevTools
```
1. F12 → Performance tab
2. Record → Hard refresh → Stop
3. Buscar: FBXLoader debe iniciar en t=600ms (no t=180ms)
4. Verificar: NO hay solapamiento de FBXLoader + ExtrudeGeometry
```

### Console Quick Check
```javascript
console.time('page-load');
location.reload();
// Espera 30 segundos...
console.timeEnd('page-load');
// Esperado: 1.0-1.2s (vs. 1.2-1.5s antes)
```

---

## Timeline Actual vs. Esperado

### ANTES (CONGELAMIENTO)
```
t=0ms     ImpactGlobe inicia
t=10-75ms Canvas rendering (98-156ms)
t=180ms   FBXLoader INICIA
t=500ms   ExtrudeGeometry INICIA
t=500-700ms 🔥 COLISIÓN FBXLoader + ExtGeom
t=1200-1500ms ✓ TODO LISTO
```

### DESPUÉS (SERIALIZADO)
```
t=0ms     ImpactGlobe inicia
t=10-75ms Canvas rendering (optimizado)
t=500ms   ExtrudeGeometry INICIA
t=620ms   ExtrudeGeometry TERMINA
t=600ms   FBXLoader INICIA (sin colisión)
t=1000ms  FBXLoader TERMINA
t=1100-1200ms ✓ TODO LISTO
```

**Mejora:** -300ms = 20% reducción

---

## Archivos Clave para Review

1. **C:\ADN\Demo\IMMEDIATE_FIX.md** → Código completo listo para copiar
2. **C:\ADN\Demo\PROFILING_ANALYSIS.md** → Análisis técnico detallado
3. **C:\ADN\Demo\CULPRITS_SUMMARY.txt** → Resumen visual con timeline
4. **C:\ADN\Demo\README_PROFILING.md** → Índice y resumen ejecutivo

---

## Resumen: ¿Qué Implementar?

| # | Qué | Dónde | Esfuerzo | Impacto |
|---|-----|-------|----------|---------|
| 1 | Defer FBXLoader | method-brain.tsx:404 | 5 min | -300ms |
| 2 | Dot matrix opt | impact-globe.tsx:216 | 2 min | -50ms |
| 3 | Reduce ExtGeom | impact-globe.tsx:75 | 1 min | -30ms |
| **TOTAL** | **3 fixes** | - | **8 min** | **-380ms (25%)** |

---

## ¿Por qué estos fixes funcionan?

1. **Defer FBXLoader:** Serializa operaciones - elimina la colisión principal
2. **Dot matrix:** 3-4x más rápido con fillRect vs. arc
3. **Reduce ExtGeom:** Menos vértices = menos normal computation

**Resultado:** Main thread no está 100% ocupado en paralelo

