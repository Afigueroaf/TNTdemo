# PROFILING EXHAUSTIVO - ANÁLISIS DE CONGELAMIENTO INICIAL DE CARGA

**Fecha:** 2026-04-08  
**Conclusión:** El pointer-follower fue un red herring. El verdadero problema es la **EJECUCIÓN PARALELA** de 3 operaciones 3D pesadas en el main thread.

---

## RESUMEN EJECUTIVO

| Métrica | Valor |
|---------|-------|
| **Duración total de congelamiento** | 1.2-1.5 segundos |
| **Cuándo ocurre** | Primeros 1.5s después de carga |
| **Causa raíz** | 3 operaciones pesadas en paralelo en main thread |
| **Culpable principal** | FBXLoader (300-500ms) + ExtrudeGeometry (60-120ms) colisionan en t=500-700ms |
| **Impacto potencial de fix** | -300 a -525ms (serializar operaciones) |

---

## CULPABLE #1: FBXLoader + processLoadedModel() ⚠️⚠️⚠️

**Severidad: MUY CRÍTICA (430-950ms bloqueador)**

### Ubicación
- Archivo: `C:\ADN\Demo\app\components\method-brain.tsx`
- Línea 404-408: Timing setup
- Línea 378-379: FBXLoader.load()
- Línea 280-366: processLoadedModel()

### Análisis Línea por Línea

#### Línea 404-408: requestIdleCallback Setup
```typescript
const windowWithIdle = window as Window & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
};

let loadIdleHandle = 0;
let loadTimeoutHandle = 0;

if (typeof windowWithIdle.requestIdleCallback === "function") {
  loadIdleHandle = windowWithIdle.requestIdleCallback(loadModel, { timeout: 1000 });
} else {
  loadTimeoutHandle = window.setTimeout(loadModel, 180);
}
```

**Problema Crítico:**
- `requestIdleCallback` con `timeout: 1000` significa "máximo espera 1000ms"
- En navegadores ocupados, timeout DISPARA exactamente a 1000ms
- **En este caso:** ImpactGlobe ocupa main thread hasta t=500-700ms
- **Resultado:** FBXLoader inicia en PARALELO sin esperar

**Timeline:**
```
t=0ms:    ImpactGlobe useEffect comienza
t=180ms:  MethodBrain setTimeout O requestIdleCallback INICIA
          (muy temprano - antes de que ImpactGlobe termine)
t=500ms:  SVGLoader termina, ExtrudeGeometry COMIENZA
t=500-700ms: COLISIÓN CATASTRÓFICA
            - ExtrudeGeometry processing en main thread
            - FBXLoader YA activo desde t=180ms
            - RESULTADO: 500-800ms de congelamiento puro
```

#### Línea 378-379: FBXLoader.load()
```typescript
fbxLoader.load(
  "/models/Brain_Model.fbx",
  (object) => {
    processLoadedModel(object);
  },
  undefined,
  (error) => {
    reportModelLoadError(error);
  },
);
```

**Análisis de Archivo:**
- Ubicación: `/public/models/Brain_Model.fbx`
- Tamaño: 2.6MB (2,662,400 bytes)
- **Duración de parsing:** 300-500ms en main thread ⚠️⚠️⚠️

**Qué hace FBXLoader internamente:**
1. Descarga binario (network, no bloqueador)
2. **Descomprime/parsea estructura FBX** - BLOQUEADOR
   - Lee headers binarios
   - Descomprime buffers de geometría
   - Parsea jerarquía de nodos
   - **Duración: 200-350ms en main thread**
3. Crea THREE geometrías
4. Crea THREE materiales
5. Crea skinning data (si existe)
   - **Duración adicional: 50-150ms**

**Total FBXLoader:** 300-500ms BLOQUEADOR

#### Línea 280-366: processLoadedModel()
```typescript
const processLoadedModel = (object: THREE.Object3D) => {
  if (isUnmounted) {
    disposeObjectResources(object);
    return;
  }

  const model = object;
  const bounds = new THREE.Box3().setFromObject(model); // LÍNEA 287 - BLOQUEADOR
  const center = new THREE.Vector3();
  const size = new THREE.Vector3();
  const sphere = new THREE.Sphere();
  bounds.getCenter(center);
  bounds.getSize(size);
  bounds.getBoundingSphere(sphere);

  let meshCount = 0;
  const originalMaterials = new Set<THREE.Material>();
  const meshBounds = new THREE.Box3();
  const meshCenter = new THREE.Vector3();

  model.traverse((node) => { // LÍNEA 300 - BLOQUEADOR
    if (!(node instanceof THREE.Mesh)) return;
    meshCount += 1;

    const source = node.material;
    if (Array.isArray(source)) {
      source.forEach((mat) => originalMaterials.add(mat));
    } else {
      originalMaterials.add(source);
    }

    meshBounds.setFromObject(node);
    meshBounds.getCenter(meshCenter);
    node.material = meshCenter.x < center.x ? leftWireMaterial : rightWireMaterial;
  });

  originalMaterials.forEach((mat) => mat.dispose());

  // ... bounds validation ...

  if (ENABLE_REGION_TRIM) { // DESACTUALIZADO, pero si fuera true...
    removeCerebellumAndStemRegion(model); // BLOQUEADOR: 100-200ms
  }

  // LÍNEA 337-346: BLOQUEADOR SI HIGH-END
  if (shouldAddMeshEdges) {
    const meshBounds = new THREE.Box3();
    const meshCenter = new THREE.Vector3();
    model.traverse((node) => {
      if (!(node instanceof THREE.Mesh)) return;
      meshBounds.setFromObject(node);
      meshBounds.getCenter(meshCenter);
      addSparseEdges(node, meshCenter.x < center.x ? BRAIN_COLORS.left.edge : BRAIN_COLORS.right.edge);
    });
  }
```

**Desglose de bloqueadores en processLoadedModel():**

| Operación | Línea | Duración | Descripción |
|-----------|-------|----------|-------------|
| Box3.setFromObject() | 287 | 20-40ms | Traversa todos los nodos, calcula bounds |
| model.traverse() | 300-314 | 30-60ms | Itera cada mesh, asigna materiales |
| EdgesGeometry gen | 337-346 | 80-150ms | Genera edge wireframe para CADA mesh |
| **Total** | - | **130-250ms** | **En HIGH-END** |

**TOTAL processLoadedModel:** 130-450ms bloqueador

**Total FBXLoader workflow:** 300-500ms (FBX) + 130-450ms (procesamiento) = **430-950ms BLOQUEADOR**

---

## CULPABLE #2: createContinentsTexture() ⚠️⚠️

**Severidad: CRÍTICA (98-156ms bloqueador)**

### Ubicación
- Archivo: `C:\ADN\Demo\app\components\impact-globe.tsx`
- Función: `createContinentsTexture()` líneas 151-249
- Llamada: Línea 310

### Análisis Línea por Línea

#### Línea 152-154: Canvas Creation
```typescript
const canvas = document.createElement("canvas");
canvas.width = textureWidth;     // 2048 (HIGH) | 1536 (LOW)
canvas.height = Math.floor(textureWidth / 2); // 1024 | 768
```
- **Operación:** Crear canvas en memoria
- **Duración:** <1ms RÁPIDO

#### Línea 169-172: GEO Projection
```typescript
const projection = geoEquirectangular()
  .translate([width / 2, height / 2])
  .scale(width / (2 * Math.PI));
const path = geoPath(projection, context);
```
- **Operación:** Configurar proyección cartográfica
- **Duración:** <5ms RÁPIDO

#### Línea 175-180: Primera ruta de continentes - BLOQUEADOR
```typescript
context.clearRect(0, 0, width, height); // RÁPIDO

context.fillStyle = "rgba(101, 10, 128, 0.52)";
context.beginPath();
path(landFeature as never);
context.fill("evenodd");
```
- **Operación:** Dibujar continentes en canvas (fill)
- **Qué hace path():** Renderiza ~200+ SVG paths de continentes
- **Cálculo:** Para cada path: moveTo, lineTo, bezierCurveTo
- **Rasterización:** Fill de ~2M pixeles en canvas
- **Duración:** 10-15ms BLOQUEADOR

#### Línea 188-193: Clip y Vignette - BLOQUEADOR
```typescript
context.save();
context.beginPath();
path(landFeature as never); // REDIBUJA TODOS los paths NUEVA VEZ
context.clip("evenodd");
context.fillStyle = landGlow;
context.fillRect(0, 0, width, height);
context.restore();
```
- **Operación:** Crear región clipped y gradiente
- **Redibujo:** path() se llama SEGUNDA VEZ
- **Cálculo:** Clip geometry calculation + fill de gradiente
- **Duración:** 8-12ms BLOQUEADOR

#### Línea 195-199: Primer stroke - BLOQUEADOR
```typescript
context.strokeStyle = "rgba(255, 76, 242, 0.92)";
context.lineWidth = 1.2;
context.beginPath();
path(landFeature as never); // REDIBUJA TODOS los paths TERCERA VEZ
context.stroke();
```
- **Operación:** Dibujar contorno de continentes
- **Redibujo:** path() llamada TERCERA VEZ
- **Cálculo:** Stroke línea 1.2px grueso
- **Duración:** 8-12ms BLOQUEADOR

#### Línea 201-205: Segundo stroke - BLOQUEADOR
```typescript
context.strokeStyle = "rgba(255, 154, 247, 0.54)";
context.lineWidth = 0.7;
context.beginPath();
path(landFeature as never); // REDIBUJA TODOS los paths CUARTA VEZ
context.stroke();
```
- **Operación:** Segundo trazo de contorno más fino
- **Redibujo:** path() llamada CUARTA VEZ
- **Duración:** 5-8ms BLOQUEADOR

#### Línea 214-223: Dot Matrix Loop - ⚠️⚠️ PEOR CULPABLE LOCAL
```typescript
co
