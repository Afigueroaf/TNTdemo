# 🧠 Conversión de Brain_Model.fbx a GLB - Guía Completa con Blender

## Paso 1: Instalar Blender (Si no lo tienes)

### Opción A: Descargar desde sitio oficial

1. **Abre tu navegador y ve a:**
   - https://www.blender.org/download/

2. **Descarga la versión estable más reciente**
   - Windows: `blender-X.X.X-windows-x64.zip` o `.msi` (instalador)
   - macOS: `blender-X.X.X-macos-x64.dmg`
   - Linux: `blender-X.X.X-linux-x64.tar.xz`

3. **Instala Blender**
   - Windows: Ejecuta el instalador `.msi` o descomprime el `.zip`
   - macOS: Abre el `.dmg` y arrastra Blender a Applications
   - Linux: Descomprime el `.tar.xz` en una carpeta

4. **Verifica la instalación**
   ```bash
   # Abre terminal/cmd y escribe:
   blender --version
   
   # Debería mostrar algo como:
   # Blender 4.1.0
   # Build: Windows, Version 4.1.0
   ```

---

## Paso 2: Preparar la Conversión

### Opción A: Usar el Script Automático (RECOMENDADO)

Si tienes Blender instalado, ejecuta este comando desde la carpeta del proyecto:

```bash
# En Windows (PowerShell o CMD)
blender -b -P scripts/blender-convert.py

# En macOS/Linux (Terminal)
blender -b -P scripts/blender-convert.py
```

**Explicación del comando:**
- `blender` - Ejecuta Blender
- `-b` - Modo "batch" (sin interfaz gráfica)
- `-P scripts/blender-convert.py` - Ejecuta el script de conversión

**Resultado esperado:**
```
🧠 Blender FBX to GLB Converter
================================

Input:  C:\ADN\Demo\public\models\Brain_Model.fbx
Output: C:\ADN\Demo\public\models\Brain_Model.glb

📊 Input size: 2.56 MB

📥 Importing FBX...
📤 Exporting as GLB with Draco compression...

✅ Conversion complete!
📊 Output size: 0.30 MB
📉 Reduction: 88.3%

🚀 Performance improvement expected: -750ms on page load
```

---

### Opción B: Conversión Manual en Blender (Interfaz Gráfica)

Si prefieres hacer el control manual:

#### Paso 1: Abre Blender
- Windows: Haz click en el icono de Blender en el Desktop o Inicio
- macOS: Applications → Blender
- Linux: Ejecuta `blender` en terminal

#### Paso 2: Elimina la escena por defecto
1. La primera vez que abres Blender, ves un cubo, cámara y luz
2. Selecciona el cubo: Click izquierdo sobre él
3. Elimina: Presiona `X` → Confirma con `Delete`

#### Paso 3: Importa el FBX
1. Menú superior: `File` → `Import` → `FBX (.fbx)`
2. Navega a: `public/models/Brain_Model.fbx`
3. Haz click en `Import FBX` (botón abajo derecha)
4. Espera a que cargue (~10-20 segundos)

#### Paso 4: Verifica que se cargó
- Deberías ver el modelo del cerebro en la viewport (pantalla central)
- Presiona `Numpad . (punto)` o usa la rueda del mouse para ajustar la vista

#### Paso 5: Exporta como GLB
1. Menú superior: `File` → `Export As` → `glTF 2.0 (.glb/.gltf)`
2. En el nombre del archivo, asegúrate que dice: `Brain_Model`
3. En la ruta, navega a: `public/models/`
4. **Importante:** En el panel derecho de opciones, configura:
   - ✅ Check: `Use Draco Compression` (IMPORTANTE)
   - ✅ Check: `Include All Bone Influences`
   - ✅ Check: `Keep Materials`
5. Haz click en `Export glTF 2.0` (abajo derecha)
6. Espera a que termine la exportación (~5-10 segundos)

#### Paso 6: Verifica el archivo
Abre terminal/cmd y escribe:
```bash
# Windows
dir public\models\Brain_Model.glb

# macOS/Linux
ls -lh public/models/Brain_Model.glb
```

Debería mostrar algo como:
```
-rw-r--r-- 1 usuario grupo  300K Apr 8 21:30 Brain_Model.glb
```

**El archivo debería ser ~300 KB, NO 2.6 MB.**

---

## Paso 3: Verifica la Conversión

### Opción A: Revisar el archivo
```bash
# Desde la carpeta del proyecto
ls -lh public/models/Brain*

# Debería mostrar:
# Brain_Model.fbx (2.6 MB)  ← Original
# Brain_Model.glb (300 KB)  ← Nuevo convertido
```

### Opción B: Test en el navegador

1. **Abre terminal y navega al proyecto:**
   ```bash
   cd C:\ADN\Demo
   npm run dev
   ```

2. **Abre el navegador en el puerto que indica** (usualmente http://localhost:3000)

3. **Abre DevTools:**
   - Windows/Linux: `F12` o `Ctrl+Shift+I`
   - macOS: `Cmd+Option+I`

4. **Ve a la pestaña "Console"**

5. **Hard reload de la página:**
   - Windows/Linux: `Ctrl+Shift+R`
   - macOS: `Cmd+Shift+R`

6. **Busca este mensaje en la Console:**
   ```
   ✅ Brain Model loaded from GLB (compressed)
   ```

   **Si ves este mensaje = ÉXITO! ✅**

   Si ves:
   ```
   ⚠️ Brain Model GLB not found, using FBX fallback
   ```
   Significa que el archivo GLB no se encontró en la ubicación correcta.

---

## 🔍 Resolución de Problemas

### Problema 1: "Blender no está en el PATH"

**Síntomas:**
```
'blender' is not recognized as an internal or external command
```

**Solución:**

#### Windows:
1. Instala Blender desde el `.msi` (instalador)
2. Cierra completamente la terminal/PowerShell
3. Abre una terminal nueva y intenta de nuevo

#### macOS:
```bash
# Si instalaste en Applications, crea un symlink
sudo ln -s /Applications/Blender.app/Contents/MacOS/Blender /usr/local/bin/blender

# Luego verifica
blender --version
```

#### Linux:
```bash
# Si descargaste el .tar.xz
tar -xf blender-X.X.X-linux-x64.tar.xz
# Luego ejecuta desde la carpeta
./blender-X.X.X-linux-x64/blender
```

---

### Problema 2: El archivo GLB sigue siendo muy grande (> 1.5 MB)

**Síntomas:**
```
ls -lh public/models/Brain_Model.glb
# Muestra: 2.5 MB (cuando debería ser 300 KB)
```

**Solución:**

La compresión Draco no se aplicó. Intenta nuevamente:

**Con el script:**
```bash
# Elimina el GLB anterior
rm public/models/Brain_Model.glb

# Ejecuta el script de nuevo
blender -b -P scripts/blender-convert.py
```

**Manualmente en Blender:**
1. File → Export As → glTF 2.0
2. **Importante:** Asegúrate que `Use Draco Compression` esté HABILITADO (✅)
3. Click en `Export glTF 2.0`

---

### Problema 3: El modelo se ve diferente después de convertir

**Síntomas:**
- Colores diferentes
- Materiales no se ven igual
- Texturas desaparecieron

**Solución:**

En Blender, al exportar, asegúrate que estas opciones estén **habilitadas**:
- ✅ `Keep Materials`
- ✅ `Export Materials`
- ✅ `Keep Original`

Si aún hay problemas, es posible que el FBX tenga materiales que Blender no entiende. En ese caso, el modelo debería verse similar en gris/blanco en Blender mismo.

---

### Problema 4: Script dice "Draco compression failed"

**Solución:**

A veces gltf-pipeline no está disponible. No es crítico:
- El GLB sin Draco seguirá siendo más pequeño que el FBX
- Pero probablemente será ~800 KB en lugar de 300 KB
- La mejora será menor (-400ms en lugar de -750ms)

Para instalar Draco manualmente:
```bash
# En la carpeta del proyecto
npm install --save-dev draco3d
```

---

## ✅ Checklist de Verificación

Después de convertir, verifica estos puntos:

- [ ] El archivo `public/models/Brain_Model.glb` existe
- [ ] El archivo es ~300 KB (máximo 500 KB)
- [ ] `npm run dev` compila sin errores
- [ ] Abre el navegador en http://localhost:3000
- [ ] Abre DevTools (F12)
- [ ] Hard reload (Ctrl+Shift+R)
- [ ] En Console ves: `✅ Brain Model loaded from GLB (compressed)`
- [ ] La página se congela menos (~10-15 segundos en lugar de ~60)

---

## 📊 Resultado Esperado

**Antes de la conversión:**
```
Console: ⚠️ Brain Model GLB not found, using FBX fallback
Congelación: ~60 segundos
Tamaño: 2.6 MB se está cargando
```

**Después de la conversión:**
```
Console: ✅ Brain Model loaded from GLB (compressed)
Congelación: ~10-15 segundos
Tamaño: ~300 KB se está cargando
```

---

## 🎯 Próximos Pasos

1. ✅ Instala Blender (si no lo tienes)
2. ✅ Ejecuta el script o haz la conversión manual
3. ✅ Verifica que el archivo GLB existe en `public/models/`
4. ✅ Hard reload en el navegador
5. ✅ Comprueba el log en DevTools Console
6. ✅ Disfruta de la página mucho más rápida! 🚀

---

## 💡 Tips & Trucos

**Para trabajar más rápido en Blender:**
- Scroll del mouse = zoom
- Botón central del mouse + mover = rotar vista
- Shift + botón central + mover = desplazar
- Numpad 7 = vista superior
- Numpad 1 = vista frontal
- Numpad 3 = vista lateral

**Si quieres ver el GLB después de convertir:**
- Abre el mismo archivo con: File → Open → `Brain_Model.glb`
- Debería verse idéntico al FBX

---

**¿Necesitas ayuda?** Los pasos están diseñados para ser simples. Si algo no funciona, verifica:

1. ¿Blender está correctamente instalado? (`blender --version`)
2. ¿Estás en la carpeta correcta del proyecto? (`C:\ADN\Demo`)
3. ¿El archivo de entrada existe? (`ls public/models/Brain_Model.fbx`)
4. ¿El archivo de salida fue creado? (`ls public/models/Brain_Model.glb`)

