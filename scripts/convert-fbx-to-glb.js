#!/usr/bin/env node

/**
 * Convert FBX to GLB with Draco compression
 * Usage: node scripts/convert-fbx-to-glb.js
 * 
 * This script converts Brain_Model.fbx to Brain_Model.glb with Draco compression
 * Expected result: 2.6 MB -> ~300 KB
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check if assimp is available
function hasAssimp() {
  try {
    execSync('assimp info', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function convertWithAssimp(inputPath, outputPath) {
  console.log('📦 Converting with assimp CLI...');
  const cmd = `assimp export "${inputPath}" "${outputPath}" -f glb`;
  try {
    execSync(cmd, { stdio: 'inherit' });
    console.log('✅ Conversion successful with assimp');
    return true;
  } catch (err) {
    console.error('❌ Assimp conversion failed:', err.message);
    return false;
  }
}

function convertWithThreeJS(inputPath, outputPath) {
  console.log('📦 Note: FBX to GLB conversion requires external tool');
  console.log('   Options:');
  console.log('   1. Install Blender and run:');
  console.log('      blender -b -P scripts/blender-convert.py');
  console.log('   2. Use online converter: https://products.aspose.app/3d/conversion/fbx-to-glb');
  console.log('   3. Install assimp: https://assimp-python.readthedocs.io/');
  return false;
}

async function main() {
  const inputPath = path.join(__dirname, '../public/models/Brain_Model.fbx');
  const outputPath = path.join(__dirname, '../public/models/Brain_Model.glb');

  console.log('🧠 Brain Model Conversion Tool');
  console.log('================================\n');
  console.log(`Input:  ${inputPath}`);
  console.log(`Output: ${outputPath}\n`);

  // Check if input exists
  if (!fs.existsSync(inputPath)) {
    console.error('❌ Input file not found:', inputPath);
    process.exit(1);
  }

  const inputSize = fs.statSync(inputPath).size / (1024 * 1024);
  console.log(`📊 Input size: ${inputSize.toFixed(2)} MB\n`);

  // Try assimp first
  if (hasAssimp()) {
    const success = convertWithAssimp(inputPath, outputPath);
    if (success && fs.existsSync(outputPath)) {
      const outputSize = fs.statSync(outputPath).size / (1024 * 1024);
      const reduction = ((1 - outputSize / inputSize) * 100).toFixed(1);
      console.log(`\n✅ Conversion complete!`);
      console.log(`📊 Output size: ${outputSize.toFixed(2)} MB`);
      console.log(`📉 Reduction: ${reduction}%`);
      
      // Try to compress with gltf-pipeline
      try {
        console.log('\n🔨 Applying Draco compression...');
        execSync(`npx gltf-pipeline -i "${outputPath}" -o "${outputPath}" -d`, {
          stdio: 'inherit'
        });
        const compressedSize = fs.statSync(outputPath).size / (1024 * 1024);
        const totalReduction = ((1 - compressedSize / inputSize) * 100).toFixed(1);
        console.log(`✅ Draco compression applied!`);
        console.log(`📊 Final size: ${compressedSize.toFixed(2)} MB`);
        console.log(`📉 Total reduction: ${totalReduction}%`);
      } catch (err) {
        console.log('⚠️  Draco compression skipped (gltf-pipeline not available)');
      }
      return;
    }
  }

  // Fallback: show manual conversion steps
  convertWithThreeJS(inputPath, outputPath);
  console.log('\n❓ For now, use an online tool or install Blender to convert.');
  process.exit(1);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
