#!/usr/bin/env node

/**
 * Script para convertir Brain_Model.fbx a GLB con compresión Draco
 * 
 * Uso: node convert-brain-model.js
 * 
 * NOTA: Este script requiere que Blender esté instalado en el sistema
 * ya que usamos Blender CLI para conversión FBX->GLB
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const FBX_INPUT = path.join(__dirname, "public/models/Brain_Model.fbx");
const GLB_OUTPUT = path.join(__dirname, "public/models/Brain_Model.glb");
const TEMP_GLTF = path.join(__dirname, "public/models/Brain_Model.gltf");

console.log("🧠 Iniciando conversión de Brain_Model.fbx a GLB con Draco...\n");

// Verificar que el archivo FBX existe
if (!fs.existsSync(FBX_INPUT)) {
  console.error(`❌ Archivo no encontrado: ${FBX_INPUT}`);
  process.exit(1);
}

const inputSizeMb = (fs.statSync(FBX_INPUT).size / 1024 / 1024).toFixed(2);
console.log(`📦 Tamaño original: ${inputSizeMb} MB`);

// Opción 1: Intentar usar Blender si está disponible
try {
  console.log("\n🔄 Método 1: Usando Blender (si está disponible)...");
  
  // Comando Blender para convertir FBX a GLB
  const blenderCmd = `blender --background --python - << EOF
import bpy
import sys

bpy.ops.import_scene.fbx(filepath="${FBX_INPUT}")
bpy.ops.export_scene.gltf(filepath="${GLB_OUTPUT}", export_draco_mesh_compression_level=7)
EOF`;

  execSync(blenderCmd, { stdio: "inherit" });
  
  if (fs.existsSync(GLB_OUTPUT)) {
    const outputSizeMb = (fs.statSync(GLB_OUTPUT).size / 1024 / 1024).toFixed(2);
    const reduction = ((1 - parseFloat(outputSizeMb) / parseFloat(inputSizeMb)) * 100).toFixed(1);
    console.log(`\n✅ Conversión exitosa con Blender!`);
    console.log(`📦 Tamaño comprimido: ${outputSizeMb} MB`);
    console.log(`📊 Reducción: ${reduction}%`);
    process.exit(0);
  }
} catch (error) {
  console.log("⚠️  Blender no disponible o error en conversión\n");
}

// Opción 2: Usar FBX2glTF si está disponible
try {
  console.log("🔄 Método 2: Usando FBX2glTF...");
  
  // Intenta ejecutar FBX2glTF directamente
  execSync(`fbx2gltf.exe --draco-compression-level 7 "${FBX_INPUT}" "${GLB_OUTPUT}"`, {
    stdio: "inherit"
  });
  
  if (fs.existsSync(GLB_OUTPUT)) {
    const outputSizeMb = (fs.statSync(GLB_OUTPUT).size / 1024 / 1024).toFixed(2);
    const reduction = ((1 - parseFloat(outputSizeMb) / parseFloat(inputSizeMb)) * 100).toFixed(1);
    console.log(`\n✅ Conversión exitosa con FBX2glTF!`);
    console.log(`📦 Tamaño comprimido: ${outputSizeMb} MB`);
    console.log(`📊 Reducción: ${reduction}%`);
    process.exit(0);
  }
} catch (error) {
  console.log("⚠️  FBX2glTF no disponible o error en conversión\n");
}

// Opción 3: Instrucciones para conversión manual
console.log("❌ No se pudo automatizar la conversión.\n");
console.log("📋 INSTRUCCIONES DE CONVERSIÓN MANUAL:\n");
console.log("Opción A - Usar Blender GUI:");
console.log("1. Abre Blender");
console.log("2. File → Import → FBX → selecciona Brain_Model.fbx");
console.log("3. File → Export → glTF 2.0 (.glb/.gltf)");
console.log("4. En opciones de exportación, activa 'Draco mesh compression' (nivel 7)");
console.log("5. Guarda como public/models/Brain_Model.glb\n");

console.log("Opción B - Usar Online Converter:");
console.log("1. Ve a https://products.aspose.app/3d/conversion/fbx-to-gltf");
console.log("2. Sube Brain_Model.fbx");
console.log("3. Descarga el .glb resultante");
console.log("4. Reemplaza public/models/Brain_Model.fbx con el archivo descargado\n");

console.log("Opción C - Usar Three.js Editor:");
console.log("1. Ve a https://threejs.org/editor/");
console.log("2. File → Import → selecciona Brain_Model.fbx");
console.log("3. File → Export → Export glTF (binary)");
console.log("4. Guarda como Brain_Model.glb\n");

process.exit(1);
