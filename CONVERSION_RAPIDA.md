# 🚀 Guía Rápida: Convertir FBX a GLB (5 Pasos)

## ⚡ La Manera Más Rápida

### Paso 1: Descargar Blender
- Ve a: https://www.blender.org/download/
- Descarga la versión **estable** para tu sistema (Windows/macOS/Linux)
- Instala siguiendo el instalador

### Paso 2: Verifica que funciona
Abre terminal/PowerShell/cmd y escribe:
```bash
blender --version
```
Debería mostrar: `Blender 4.1.0` (o versión similar)

### Paso 3: Ejecuta el script de conversión
En la carpeta del proyecto (`C:\ADN\Demo`), abre terminal y escribe:

```bash
# Windows (PowerShell o CMD)
blender -b -P scripts/blender-convert.py

# macOS/Linux (Terminal)
blender -b -P scripts/blender-convert.py
```

**Espera 1-2 minutos.** Deberías ver:
```
✅ Conversion complete!
📊 Output size: 0.30 MB
📉 Reduction: 88.3%
```

### Paso 4: Verifica el archivo
```bash
# Ver los archivos
ls public/models/Brain*

# Debería mostrar:
# Brain_Model.fbx    (2.6 MB)  ← Original
# Brain_Model.glb    (300 KB)  ← Nuevo!
```

### Paso 5: Test en el navegador
1. Abre terminal y ejecuta:
   ```bash
   npm run dev
   ```

2. Abre navegador en: http://localhost:3000

3. Abre DevTools: F12 → Console

4. Hard reload: Ctrl+Shift+R

5. Deberías ver:
   ```
   ✅ Brain Model loaded from GLB (compressed)
   ```

## ✨ ¡Listo! 

La página debería cargar mucho más rápido ahora.

---

## 🆘 ¿Si hay problemas?

Lee el archivo: **GUIA_BLENDER_CONVERSION.md** (guía completa con solución de problemas)

