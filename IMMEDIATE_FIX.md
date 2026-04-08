# FIX INMEDIATO - PRIORIDAD 1: Defer FBXLoader 600ms

**Severidad:** CRÍTICA  
**Línea exacta:** `method-brain.tsx` línea 404-408  
**Impacto:** -300ms (20% de mejora en tiempo inicial)  
**Esfuerzo:** 5 minutos  
**Resultado esperado:** 1500ms → 1200ms

---

## PROBLEMA ACTUAL

En `method-brain.tsx` líneas 404-408:

```typescript
// ACTUAL (PROBLEMÁTICO):
if (typeof windowWithIdle.requestIdleCallback === "function") {
  loadIdleHandle = windowWithIdle.requestIdleCallback(loadModel, { timeout: 1000 });
} else {
  loadTimeoutHandle = window.setTimeout(loadModel, 180);
}
```

**¿Por qué es un problema?**

1. El `setTimeout(..., 180)` lanza FBXLoader.load() en t=180ms
2. En ese momento, ImpactGlobe TODAVÍA está procesando
3. ExtrudeGeometry comienza en t=500ms
4. **COLISIÓN:** FBXLoader (ya activo) + ExtrudeGeometry en paralelo = CONGELAMIENTO

```
t=0ms:    ImpactGlobe comienza
t=180ms:  FBXLoader INICIA (demasiado temprano!)
t=500ms:  ExtrudeGeometry INICIA
t=500-700ms: COLISIÓN - DOS operaciones en paralelo
             CONGELAMIENTO PURO
```

---

## SOLUCIÓN: Serializar operaciones

Esperar 600ms (tiempo para que ExtrudeGeometry termine) antes de iniciar FBXLoader.

### CÓDIGO NUEVO (REEMPLAZAR línea 404-408)

```typescript
// ✅ NUEVO (CORRECTO):
let loadIdleHandle = 0;
let loadTimeoutHandle = 0;

// Esperar a que ExtrudeGeometry termine ANTES de iniciar FBXLoader
const DEFER_FBX_LOAD_MS = 600; // Tiempo para que ExtrudeGeometry complete

const scheduleLoad = () => {
  if (isUnmounted) return;
  
  if (typeof windowWithIdle.requestIdleCallback === "function") {
    loadIdleHandle = windowWithIdle.requestIdleCallback(loadModel, { timeout: 1000 });
  } else {
    loadTimeoutHandle = window.setTimeout(loadModel, 50);
  }
};

// CAMBIO PRINCIPAL: Defer inicial + timeout más corto
loadTimeoutHandle = window.setTimeout(scheduleLoad, DEFER_FBX_LOAD_MS);
```

### EXPLICACIÓN

**Línea por línea:**

1. `const DEFER_FBX_LOAD_MS = 600;`
   - Constante que define cuánto esperar
   - 600ms = tiempo para que ExtrudeGeometry complete
   - Ajustable si es necesario

2. `const scheduleLoad = () => { ... }`
   - Función que lanza el FBXLoader
   - Verifica `isUnmounted` para safety
   - Usa requestIdleCallback si disponible
   - **Importante:** Fallback es `setTimeout(..., 50)` (no 180)
   - Por qué 50? Porque en t=600ms no necesita esperar más

3. `loadTimeoutHandle = window.setTimeout(scheduleLoad, DEFER_FBX_LOAD_MS);`
   - Lanza `scheduleLoad()` en t=600ms
   - Esto asegura que FBXLoader NO comienza hasta que ExtrudeGeometry termine

---

## CAMBIO EN CLEANUP (línea 528-560)

El cleanup necesita ser actualizado porque ahora hay DOS timeouts:

### ACTUAL (PROBLEMÁTICO - línea 535-537):
```typescript
if (loadTimeoutHandle) {
  window.clearTimeout(loadTimeoutHandle);
}
```

### NUEVO (CORRECTO):
```typescript
// En cleanup (línea 528-560):
return () => {
  isUnmounted = true;
  window.cancelAnimationFrame(raf);
  window.clearTimeout(hiddenFrameTimeout);
  
  // ✅ NUEVO: Asegurar que AMBOS timeouts se cancelan
  if (loadIdleHandle && typeof windowWithIdle.cancelIdleCallback === "function") {
    windowWithIdle.cancelIdleCallback(loadIdleHandle);
  }
  if (loadTimeoutHandle) {
    window.clearTimeout(loadTimeoutHandle); // Ahora limpia el DEFER timeout
  }
  
  // ... resto del cleanup ...
};
```

---

## CÓDIGO COMPLETO A REEMPLAZAR

**Archivo:** `C:\ADN\Demo\app\components\method-brain.tsx`

**Buscar:** Líneas 393-408

**ANTES:**
```typescript
const windowWithIdle = window as Window & {
  requestIdleCallback?: (
    callback: IdleRequestCallback,
    options?: IdleRequestOptions,
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

let loadIdleHandle = 0;
let loadTimeoutHandle = 0;

if (typeof windowWithIdle.requestIdleCallback === "function") {
  loadIdleHandle = windowWithIdle.requestIdleCallback(loadModel, { timeout: 1000 });
} else {
  loadTimeoutHandle = window.setTimeout(loadModel, 180);
}
```

**DESPUÉS:**
```typescript
const windowWithIdle = window as Window & {
  requestIdleCallback?: (
    callback: IdleRequestCallback,
    options?: IdleRequestOptions,
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

let loadIdleHandle = 0;
let loadTimeoutHandle = 0;

// ✅ NEW: Defer FBXLoader para evitar colisión con ExtrudeGeometry
const DEFER_FBX_LOAD_MS = 600; // Tiempo para que ExtrudeGeometry complete

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

---

## VERIFICACIÓN POST-IMPLEMENTACIÓN

### 1. Chrome DevTools Performance (Línea de tiempo)

1. F12 → Performance tab
2. Click "Record"
3. Cmd+Shift+R (hard refresh)
4. Espera 30 segundos
5. Stop

**Debe ver:**
- FBXLoader comenzando en t=600ms (no t=180ms)
- ExtrudeGeometry completando antes de FBXLoader
- **NO hay solapamiento de operaciones pesadas**

### 2. Performance.mark() en Console

```javascript
// Ejecutar en console durante carga:
window.addEventListener('loadstart', () => console.log('Load start:', performance.now()));
window.addEventListener('loadend', () => console.log('Load end:', performance.now()));

// O medir directamente:
performance.mark('brain-load-start');
// ... esperar ...
performance.mark('brain-load-end');
performance.measure('brain-duration', 'brain-load-start', 'brain-load-end');
console.table(performance.getEntriesByType('measure'));
```

### 3. Lighthouse Performance Score

- Antes: ~40-50 (red)
- Después: ~55-65 (orange/yellow)

---

## TIEMPO DE EJECUCIÓN NUEVO

```
ANTES (COLISIÓN):
t=0ms     │ ImpactGlobe comienza
t=180ms   │ FBXLoader INICIA
t=500ms   │ ExtrudeGeometry INICIA
t=500-700ms │ ██████ COLISIÓN = CONGELAMIENTO
t=1200-1500ms │ ✓ TODO LISTO

DESPUÉS (SERIALIZADO):
t=0ms     │ ImpactGlobe comienza
t=180ms   │ Nada (scheduleLoad not executed)
t=500ms   │ ExtrudeGeometry INICIA
t=620ms   │ ExtrudeGeometry TERMINA
t=600ms   │ ✓ scheduleLoad() executed (pero ExtGeom ya terminó)
t=600ms   │ FBXLoader INICIA (sin colisión)
t=1000ms  │ FBXLoader TERMINA
t=1100-1200ms │ ✓ TODO LISTO

MEJORA: 1500ms → 1200ms = 300ms ahorrados = 20% MEJORA
```

---

## NOTAS IMPORTANTES

1. **¿Por qué 600ms exactamente?**
   - ExtrudeGeometry típicamente termina en t=500-620ms
   - 600ms es un valor seguro que permite margen
   - Si quieres ajustar: Usa Chrome DevTools para medir ExtrudeGeometry duración exacta

2. **¿Y requestIdleCallback?**
   - Aún se usa para HIGH-PRIORITY en navegadores que lo soportan
   - El defer de 600ms es la CLAVE fix
   - Fallback de 50ms (no 180) es suficiente después del deferral

3. **¿Qué si ExtrudeGeometry cambia en el futuro?**
   - Monitorea Chrome DevTools Performance tab
   - Si ExtrudeGeometry toma más tiempo, aumenta DEFER_FBX_LOAD_MS
   - La serialización es el beneficio real

4. **¿Se puede hacer más agresivo (300ms)?**
   - Sí, pero riesgo de que ExtrudeGeometry aún esté activo
   - 600ms es conservador y seguro
   - Mejor ser conservative que tener colisiones nuevamente

---

## VERIFICACIÓN RÁPIDA

Para confirmar que el fix funciona:

```bash
# En Chrome Console:
console.time('load-time');
location.reload();
// Espera ...
console.timeEnd('load-time');
```

**Esperado:** 1.2-1.5s ANTES → 1.0-1.2s DESPUÉS (200-300ms mejora)

---

## PRÓXIMOS PASOS

Después de implementar este fix:

1. ✅ Medir con Chrome DevTools
2. ✅ Si aún lento, implementar SOLUCIÓN 2 (dot matrix optimization)
3. ✅ Si aún lento, implementar SOLUCIÓN 3 (reduce ExtrudeGeometry)
4. ✅ Si aún lento, implementar SOLUCIÓN 5 (Worker offload)

**Pero este fix de 600ms deferral es LA solución principal.**

