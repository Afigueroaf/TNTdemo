const fs = require('fs');
const path = require('path');

async function compressWithTransform() {
  try {
    const { Document } = await import('@gltf-transform/core');
    const { draco } = await import('@gltf-transform/extensions');
    
    const inputPath = path.join(__dirname, '../public/models/Brain_Model.glb');
    const outputPath = path.join(__dirname, '../public/models/Brain_Model.glb');
    
    const originalSize = fs.statSync(inputPath).size;
    console.log(`📦 Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
    
    // Read GLB
    const glbBuffer = fs.readFileSync(inputPath);
    const doc = await Document.fromArrayBuffer(glbBuffer);
    
    // Apply Draco compression
    doc.createExtension(draco).encoderOptions({ 
      method: draco.EncoderMethod.EDGEBREAKER,
      encodeNormals: true,
      quantizationBits: 14,
    });
    
    // Write compressed GLB
    const compressed = await doc.toBinary();
    fs.writeFileSync(outputPath, Buffer.from(compressed));
    
    const compressedSize = fs.statSync(outputPath).size;
    const reduction = ((1 - compressedSize / originalSize) * 100).toFixed(1);
    
    console.log(`✅ Draco compression applied!`);
    console.log(`📦 Compressed size: ${(compressedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📉 Reduction: ${reduction}%`);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

compressWithTransform();
