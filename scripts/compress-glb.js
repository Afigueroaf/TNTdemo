const gltfPipeline = require('gltf-pipeline');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(__dirname, '../public/models/Brain_Model.glb');
const outputPath = path.join(__dirname, '../public/models/Brain_Model.glb');

const options = {
  dracoOptions: {
    compressionLevel: 7,
  },
};

async function compressGLB() {
  try {
    const originalSize = fs.statSync(inputPath).size;
    console.log(`📦 Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);

    const gltf = await gltfPipeline.glbToGltf(fs.readFileSync(inputPath));
    const compressedGltf = await gltfPipeline.processGltf(gltf, options);
    const glbBuffer = await gltfPipeline.gltfToGlb(compressedGltf);
    
    fs.writeFileSync(outputPath, glbBuffer);

    const compressedSize = fs.statSync(outputPath).size;
    const reduction = ((1 - compressedSize / originalSize) * 100).toFixed(1);

    console.log(`✅ Compression complete!`);
    console.log(`📦 Compressed size: ${(compressedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📉 Reduction: ${reduction}%`);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

compressGLB();
