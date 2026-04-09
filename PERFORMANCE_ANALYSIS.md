# Performance Analysis - Phase 3.6 Sequential Loading

## Current Configuration
```
Component          | Load Time  | Delay from start | Gap to next
ImpactGlobe        | 0ms        | 0ms              | 2500ms
Services (Prisma)  | 2500ms     | 2500ms           | 2500ms
MethodBrain        | 5000ms     | 5000ms           | N/A
```

## Asset Sizes
- Brain_Model.glb: 2.5 MB (uncompressed)
- Total public/models: 2.5 MB

## Loading Bottlenecks Addressed
1. ✅ Canvas dot matrix: Reduced grid density (dotGap 7→14)
2. ✅ ExtrudeGeometry: Disabled bevel calculation
3. ✅ Light disposal: Fixed memory leaks in all 3 components
4. ✅ Sequential loading: Distributed across 5-second window
5. ✅ GLB format: 2.5 MB (from 2.6 MB FBX)

## Expected Performance Impact
- Before: ~60 second page freeze
- After: Distributed loading across 5 seconds with no single blocking operation
- Improvement: Load is serialized, each component gets dedicated thread time

## Next Steps (Optional)
1. Draco compression: Currently 2.5 MB uncompressed
   - Expected reduction: 30-50% (to ~1.2-1.75 MB)
   - Requires manual re-compression due to Node.js library issues
2. Texture optimization: brain_tex.jpg removed (was non-critical)
3. Model decimation: Could reduce vertices by 20-30%

## How to Measure Performance
1. Open DevTools → Performance tab
2. Record a full page load (reload)
3. Look for main thread blocking:
   - 0-2500ms: ImpactGlobe (dot matrix + three.js setup)
   - 2500-5000ms: Services component (prisma + geometry)
   - 5000-7500ms: MethodBrain (2.5MB GLB parse + render)
4. Compare timeline with previous baseline

## Console Logging (Phase 3.6)
The app logs timing information:
```
⏱️  Loading ImpactGlobe at t=0ms
⏱️  Loading Services at t=2500ms
⏱️  Loading MethodBrain at t=5000ms
```

These logs confirm sequential loading is active.
