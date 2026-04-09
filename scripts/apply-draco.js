const fs = require('fs');
const path = require('path');
const { Document } = require('@gltf-transform/core');
const { draco } = require('@gltf-transform/extensions');

async function applyDracoCompression() {
  const inputPath = path.join(__dirname, '../public/models/Brain_Model.glb');
  const outputPath = path.join(__dirname, '../public/models/Brain_Model-draco.glb');

  try {
    // Read the GLB file
    const glbBuffer = fs.readFileSync(inputPath);
    console.log(`📦 Original file size: ${(glbBuffer.length / 1024 / 1024).toFixed(2)} MB`);

    // Parse GLB
    const doc = await Document.fromArrayBuffer(glbBuffer);

    // Get the root node
    const root = doc.getRoot();

    // Apply Draco compression to all meshes
    doc.createExtension(draco)
      .setRequired(true)
      .encoderOptions({
        method: draco.EncoderMethod.EDGEBREAKER,
        encodeNormals: true,
        encodedNormals: false,
        quantizationBits: 14,
        quantizationOrigin: draco.QuantizationOrigin.CENTER,
      });

    // Write compressed GLB
    const glbArrayBuffer = await doc.toBinary();
    const compressedBuffer = Buffer.from(glbArrayBuffer);
    fs.writeFileSync(outputPath, compressedBuffer);

    const compressedSize = compressedBuffer.length;
    const originalSize = glbBuffer.length;
    const reduction = ((1 - compressedSize / originalSize) * 100).toFixed(1);

    console.log(`✅ Draco compression applied!`);
    console.log(`📦 Compressed file size: ${(compressedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📉 Size reduction: ${reduction}%`);
    console.log(`💾 Output: ${outputPath}`);

  } catch (error) {
    console.error('❌ Error applying Draco compression:', error.message);
    process.exit(1);
  }
}

applyDracoCompression();
