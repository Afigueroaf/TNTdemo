#!/usr/bin/env blender -b -P
# -*- coding: utf-8 -*-
"""
Convert FBX to GLB with Draco compression using Blender
Usage: blender -b -P scripts/blender-convert.py

This script:
1. Imports Brain_Model.fbx
2. Exports as GLB with Draco compression
3. Result: ~2.6 MB -> ~300 KB (expected 88% reduction)
"""

import bpy
import sys
import os

def convert_fbx_to_glb():
    # Get the Blender file path
    blend_dir = os.path.dirname(bpy.data.filepath) or os.getcwd()
    
    input_path = os.path.join(blend_dir, 'public/models/Brain_Model.fbx')
    output_path = os.path.join(blend_dir, 'public/models/Brain_Model.glb')
    
    print(f"\n🧠 Blender FBX to GLB Converter")
    print(f"================================\n")
    print(f"Input:  {input_path}")
    print(f"Output: {output_path}\n")
    
    # Check if input exists
    if not os.path.exists(input_path):
        print(f"❌ Input file not found: {input_path}")
        sys.exit(1)
    
    input_size = os.path.getsize(input_path) / (1024 * 1024)
    print(f"📊 Input size: {input_size:.2f} MB")
    
    # Clear existing data
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    
    # Import FBX
    print("\n📥 Importing FBX...")
    bpy.ops.import_scene.fbx(filepath=input_path)
    
    # Export as GLB with Draco compression
    print("📤 Exporting as GLB with Draco compression...")
    bpy.ops.export_scene.gltf(
        filepath=output_path,
        use_draco_mesh_compression=True,
        export_keep_materials=True,
        export_materials='EXPORT',
        use_animations=False,
        export_cameras=False,
        export_lights=False
    )
    
    # Check output
    if os.path.exists(output_path):
        output_size = os.path.getsize(output_path) / (1024 * 1024)
        reduction = ((1 - output_size / input_size) * 100)
        
        print(f"\n✅ Conversion complete!")
        print(f"📊 Output size: {output_size:.2f} MB")
        print(f"📉 Reduction: {reduction:.1f}%")
        print(f"\n🚀 Performance improvement expected: -750ms on page load")
    else:
        print(f"❌ Output file not created")
        sys.exit(1)

if __name__ == '__main__':
    try:
        convert_fbx_to_glb()
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
