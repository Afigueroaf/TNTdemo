# Conversión de Brain_Model.fbx a GLB Comprimido

## Estado Actual
- Archivo FBX: `public/models/Brain_Model.fbx` (2.6 MB)
- Tamaño esperado después de compresión: 200-350 KB (reducción ~90%)
- Impacto: Reduce LCP en ~2.3 MB, mejora tiempo de carga inicial en 3-5 segundos

## Instrucciones de Conversión

### Opción 1: Usar Blender (Recomendado)
```bash
# 1. Descargar Blender desde https://www.blender.org/download/
# 2. Instalar Blender
# 3. Ejecutar Blender
# 4. File → Import → FBX
# 5. Seleccionar: public/models/Brain_Model.fbx
# 6. File → Export → glTF 2.0 (.glb/.gltf)
# 7. En opciones de exportación:
#    - Activar "Draco mesh compression"
#    - Nivel de compresión: 7 (máximo)
#    - Otras opciones mantener por defecto
# 8. Guardar como: public/models/Brain_Model.glb
# 9. Eliminar: public/models/Brain_Model.fbx (opcional)
```

### Opción 2: Usar Three.js Editor Online
1. Ir a: https://threejs.org/editor/
2. File → Import → seleccionar `Brain_Model.fbx`
3. Esperar carga del modelo (puede tardar 30-60 segundos)
4. File → Export → Export glTF (binary)
5. Guardar con nombre: `Brain_Model.glb`
6. Reemplazar archivo en `public/models/`

### Opción 3: Usar Online Converter
1. Ir a: https://products.aspose.app/3d/conversion/fbx-to-gltf
2. Upload: Seleccionar `Brain_Model.fbx` (2.6 MB)
3. Convertir a: glTF (GLB)
4. Download resultado
5. Reemplazar archivo en `public/models/`

**NOTA:** Este sitio puede no aplicar compresión Draco automáticamente. Verificar tamaño del archivo resultante.

### Opción 4: Usar Babylon.js Sandbox
1. Ir a: https://www.babylonjs-playground.com
2. Crear nuevo proyecto
3. Importar FBX
4. Exportar como glTF con compresión
5. Descargar GLB

## Validación Después de Conversión

```bash
# 1. Verificar que el archivo existe
ls -lh public/models/Brain_Model.glb

# 2. Verificar tamaño (debe ser ~250-350 KB)
# Si es > 1 MB, revisitar opciones de compresión

# 3. Ejecutar build de Next.js
npm run build

# 4. Verificar que no hay errores de import
npm run dev

# 5. En navegador, ir a http://localhost:3000
# 6. Desplazarse a sección "¿Cómo pensamos?" (Método)
# 7. Verificar que el cerebro carga correctamente
# 8. Abrir Chrome DevTools → Network
# 9. Confirmar que Brain_Model.glb carga (no Brain_Model.fbx)
```

## Verificación de Performance

### Antes de la optimización:
```
FBX (sin comprimir):    2.6 MB
LCP (Largest Contentful Paint): ~5-8 segundos
TBT (Total Blocking Time): 150-500ms en mobile
```

### Después de la optimización:
```
GLB (Draco comprimido):  ~300 KB
LCP esperado:            ~2-3 segundos (mejora de 60%)
TBT esperado:            50-150ms en mobile
```

## Fallback Automático

El código en `method-brain.tsx` ya implementa fallback automático:

```typescript
// Si existe GLB comprimido, lo carga
// Si no existe, fallback automático a FBX
gltfLoader.load(
  "/models/Brain_Model.glb",
  (gltf) => processLoadedModel(gltf.scene),
  undefined,
  () => {
    // Fallback si GLB no existe
    fbxLoader.load("/models/Brain_Model.fbx", ...)
  }
);
```

**No hay necesidad de cambiar código** - El sistema funciona con ambos formatos.

## Checklist Final

- [ ] Archivo Brain_Model.glb creado (tamaño verificado)
- [ ] Archivo copiado a `public/models/Brain_Model.glb`
- [ ] `npm run build` ejecutado sin errores
- [ ] App inicia con `npm run dev` sin errors en console
- [ ] Cerebro 3D carga en sección "Método"
- [ ] DevTools confirma que `.glb` se carga (no `.fbx`)
- [ ] Performance mejorado (LCP < 3 segundos)
- [ ] Brain_Model.fbx eliminado (opcional pero recomendado)

## Recursos

- Blender Docs: https://docs.blender.org/manual/
- Three.js glTF Compression: https://threejs.org/examples/?q=gltf
- Draco Compression: https://github.com/google/draco
- Babylon.js Export: https://doc.babylonjs.com/features/featuresDeepDive/Exporters/glTF

## Soporte

Si tienes problemas:
1. Verifica que Brain_Model.fbx no está corrupto (abre en Blender)
2. Intenta con otra herramienta de conversión
3. Asegúrate que el GLB resultante tiene meshes válidos
4. Revisa console.log en DevTools para errores de loader
