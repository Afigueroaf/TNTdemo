"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useSequentialLoad } from "../hooks/use-sequential-load";

const ENABLE_REGION_TRIM = false;
const BRAIN_VIEWPORT_SCALE = 1.5;
const BRAIN_TARGET_SIZE = 2.6;
const BRAIN_VERTICAL_SHIFT_RATIO = 0.2;

const BRAIN_COLORS = {
  left: {
    base: "#3f7fc3",
    emissive: "#0f2747",
    edge: "#5d93d1",
  },
  right: {
    base: "#c34762",
    emissive: "#3f0c1a",
    edge: "#d16680",
  },
} as const;

function disposeObjectResources(object: THREE.Object3D) {
  object.traverse((node) => {
    if (node instanceof THREE.Mesh || node instanceof THREE.LineSegments) {
      node.geometry.dispose();
      if (Array.isArray(node.material)) {
        node.material.forEach((mat) => mat.dispose());
      } else {
        node.material.dispose();
      }
    }
  });
}

function pruneTrianglesInRegion(
  mesh: THREE.Mesh,
  shouldRemove: (centroid: THREE.Vector3) => boolean,
) {
  const source = mesh.geometry;
  const nonIndexed = source.index ? source.toNonIndexed() : source.clone();
  const positions = nonIndexed.getAttribute("position");
  if (!positions) {
    nonIndexed.dispose();
    return;
  }

  const normals = nonIndexed.getAttribute("normal");
  const uvs = nonIndexed.getAttribute("uv");

  const keptPositions: number[] = [];
  const keptNormals: number[] = [];
  const keptUvs: number[] = [];

  const v1 = new THREE.Vector3();
  const v2 = new THREE.Vector3();
  const v3 = new THREE.Vector3();
  const centroid = new THREE.Vector3();

  for (let i = 0; i < positions.count; i += 3) {
    v1.fromBufferAttribute(positions, i).applyMatrix4(mesh.matrixWorld);
    v2.fromBufferAttribute(positions, i + 1).applyMatrix4(mesh.matrixWorld);
    v3.fromBufferAttribute(positions, i + 2).applyMatrix4(mesh.matrixWorld);

    centroid.copy(v1).add(v2).add(v3).multiplyScalar(1 / 3);
    if (shouldRemove(centroid)) {
      continue;
    }

    for (let j = 0; j < 3; j += 1) {
      const idx = i + j;
      keptPositions.push(positions.getX(idx), positions.getY(idx), positions.getZ(idx));
      if (normals) {
        keptNormals.push(normals.getX(idx), normals.getY(idx), normals.getZ(idx));
      }
      if (uvs) {
        keptUvs.push(uvs.getX(idx), uvs.getY(idx));
      }
    }
  }

  const keptTriangles = keptPositions.length / 9;
  const originalTriangles = positions.count / 3;
  if (keptTriangles < Math.max(8, originalTriangles * 0.25)) {
    nonIndexed.dispose();
    return;
  }

  const nextGeometry = new THREE.BufferGeometry();
  nextGeometry.setAttribute("position", new THREE.Float32BufferAttribute(keptPositions, 3));
  if (normals && keptNormals.length > 0) {
    nextGeometry.setAttribute("normal", new THREE.Float32BufferAttribute(keptNormals, 3));
  } else {
    nextGeometry.computeVertexNormals();
  }
  if (uvs && keptUvs.length > 0) {
    nextGeometry.setAttribute("uv", new THREE.Float32BufferAttribute(keptUvs, 2));
  }

  source.dispose();
  nonIndexed.dispose();
  mesh.geometry = nextGeometry;
}

function removeCerebellumAndStemRegion(model: THREE.Object3D) {
  model.updateMatrixWorld(true);
  const bounds = new THREE.Box3().setFromObject(model);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  bounds.getSize(size);
  bounds.getCenter(center);

  const halfX = Math.max(size.x * 0.5, 0.0001);
  const halfY = Math.max(size.y * 0.5, 0.0001);
  const halfZ = Math.max(size.z * 0.5, 0.0001);

  const shouldRemove = (centroid: THREE.Vector3) => {
    const nx = (centroid.x - center.x) / halfX;
    const ny = (centroid.y - center.y) / halfY;
    const nz = (centroid.z - center.z) / halfZ;

    // Remove lower central bulge (cerebellum) and vertical lower tube (brain stem).
    const removeCerebellum = ny < -0.1 && Math.abs(nx) < 0.62 && Math.abs(nz) > 0.12;
    const removeStem = ny < -0.3 && Math.abs(nx) < 0.32 && Math.abs(nz) < 0.5;

    return removeCerebellum || removeStem;
  };

  model.traverse((node) => {
    if (!(node instanceof THREE.Mesh)) return;
    pruneTrianglesInRegion(node, shouldRemove);
  });
}

function addSparseEdges(mesh: THREE.Mesh, color: string) {
  const edgeGeometry = new THREE.EdgesGeometry(mesh.geometry, 26);
  const edgeMaterial = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.86,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
  });
  const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
  edges.renderOrder = 10;
  mesh.add(edges);
}

function createBrainWireMaterial(color: string, emissive: string) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive,
    emissiveIntensity: 0.2,
    roughness: 0.6,
    metalness: 0.05,
    transparent: true,
    opacity: 0.05,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  });
}

function createFallbackWireframeBrain() {
  const group = new THREE.Group();
  const leftMaterial = createBrainWireMaterial(BRAIN_COLORS.left.base, BRAIN_COLORS.left.emissive);
  const rightMaterial = createBrainWireMaterial(BRAIN_COLORS.right.base, BRAIN_COLORS.right.emissive);
  leftMaterial.opacity = 0.08;
  leftMaterial.emissiveIntensity = 0.22;
  leftMaterial.roughness = 0.56;
  leftMaterial.metalness = 0.04;
  rightMaterial.opacity = 0.08;
  rightMaterial.emissiveIntensity = 0.22;
  rightMaterial.roughness = 0.56;
  rightMaterial.metalness = 0.04;

  const left = new THREE.Mesh(new THREE.SphereGeometry(0.95, 14, 12), leftMaterial);
  left.scale.set(0.95, 1, 1.08);
  left.position.set(-0.52, 0.05, 0);
  addSparseEdges(left, BRAIN_COLORS.left.edge);

  const right = new THREE.Mesh(new THREE.SphereGeometry(0.95, 14, 12), rightMaterial);
  right.scale.set(0.95, 1, 1.08);
  right.position.set(0.52, 0.05, 0);
  addSparseEdges(right, BRAIN_COLORS.right.edge);

  group.add(left, right);
  group.scale.setScalar(BRAIN_VIEWPORT_SCALE);

  return {
    object: group,
    dispose: () => {
      disposeObjectResources(group);
      leftMaterial.dispose();
      rightMaterial.dispose();
    },
  };
}

export function MethodBrain({ asBackdrop = false }: { asBackdrop?: boolean }) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  
  // Phase 3.6: Sequential loading - MethodBrain loads at t=5000ms
  const canLoad = useSequentialLoad("MethodBrain");

  useEffect(() => {
    if (!canLoad) return; // Don't start loading until scheduled
    
    const mount = mountRef.current;
    if (!mount) return;
    const host = mount;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 3.5);

    const nav = navigator as Navigator & { deviceMemory?: number };
    const deviceMemory = nav.deviceMemory ?? 4;
    const isLowEndDevice = deviceMemory <= 4 || window.devicePixelRatio >= 2.5;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isLowEndDevice,
      alpha: true,
      powerPreference: isLowEndDevice ? "low-power" : "high-performance",
    });
    renderer.setPixelRatio(
      isLowEndDevice
        ? Math.min(window.devicePixelRatio || 1, 1.35)
        : Math.min(window.devicePixelRatio || 1, 1.8),
    );
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    function updateRendererSize(width: number, height: number) {
      if (width <= 0 || height <= 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    }

    const rect = host.getBoundingClientRect();
    updateRendererSize(rect.width, rect.height);

    const brainGroup = new THREE.Group();
    brainGroup.position.y = -(BRAIN_TARGET_SIZE * BRAIN_VERTICAL_SHIFT_RATIO);
    scene.add(brainGroup);

    const fallback = createFallbackWireframeBrain();
    brainGroup.add(fallback.object);

    let loadedModel: THREE.Object3D | null = null;
    let fallbackDisposed = false;
    let isUnmounted = false;

    function reportModelLoadError(error: unknown) {
      const message = error instanceof Error ? error.message : String(error);

      if (process.env.NODE_ENV !== "production") {
        console.error("[MethodBrain] Error al cargar /models/Brain_Model.glb", error);
      }

      window.dispatchEvent(new CustomEvent("tnt:model-load-error", {
        detail: {
          component: "MethodBrain",
          model: "/models/Brain_Model.glb",
          message,
          timestamp: Date.now(),
        },
      }));
    }

    const leftWireMaterial = createBrainWireMaterial(BRAIN_COLORS.left.base, BRAIN_COLORS.left.emissive);
    const rightWireMaterial = createBrainWireMaterial(BRAIN_COLORS.right.base, BRAIN_COLORS.right.emissive);

    const shouldAddMeshEdges = !isLowEndDevice;

    // Función compartida para procesar el modelo cargado
    const processLoadedModel = (object: THREE.Object3D) => {
      if (isUnmounted) {
        disposeObjectResources(object);
        return;
      }

      const model = object;
      const bounds = new THREE.Box3().setFromObject(model);
      const center = new THREE.Vector3();
      const size = new THREE.Vector3();
      const sphere = new THREE.Sphere();
      bounds.getCenter(center);
      bounds.getSize(size);
      bounds.getBoundingSphere(sphere);

      let meshCount = 0;
      const originalMaterials = new Set<THREE.Material>();
      const meshBounds = new THREE.Box3();
      const meshCenter = new THREE.Vector3();

      model.traverse((node) => {
        if (!(node instanceof THREE.Mesh)) return;
        meshCount += 1;

        const source = node.material;
        if (Array.isArray(source)) {
          source.forEach((mat) => originalMaterials.add(mat));
        } else {
          originalMaterials.add(source);
        }

        meshBounds.setFromObject(node);
        meshBounds.getCenter(meshCenter);
        node.material = meshCenter.x < center.x ? leftWireMaterial : rightWireMaterial;
      });

      originalMaterials.forEach((mat) => mat.dispose());

      const hasValidBounds = Number.isFinite(size.x)
        && Number.isFinite(size.y)
        && Number.isFinite(size.z)
        && Math.max(size.x, size.y, size.z) > 0.0001;

      if (meshCount === 0 || !hasValidBounds) {
        disposeObjectResources(model);
        return;
      }

      model.position.sub(center);

      if (ENABLE_REGION_TRIM) {
        // Optional trim hook disabled to keep original brain geometry.
        removeCerebellumAndStemRegion(model);
        model.updateMatrixWorld(true);
      }

      // Generate edge lines after pruning so removed regions are not still drawn.
      if (shouldAddMeshEdges) {
        const meshBounds = new THREE.Box3();
        const meshCenter = new THREE.Vector3();
        model.traverse((node) => {
          if (!(node instanceof THREE.Mesh)) return;
          meshBounds.setFromObject(node);
          meshBounds.getCenter(meshCenter);
          addSparseEdges(node, meshCenter.x < center.x ? BRAIN_COLORS.left.edge : BRAIN_COLORS.right.edge);
        });
      }

      const largest = Math.max(size.x, size.y, size.z, 0.001);
      const scale = BRAIN_TARGET_SIZE / largest;
      model.scale.setScalar(scale);

      const fittedRadius = Math.max(sphere.radius * scale, 0.8);
      brainGroup.position.y = -((fittedRadius * 2) * BRAIN_VERTICAL_SHIFT_RATIO);
      camera.position.z = THREE.MathUtils.clamp(
        (fittedRadius * 3.1) / BRAIN_VIEWPORT_SCALE,
        2.6,
        5.2,
      );

      brainGroup.remove(fallback.object);
      fallback.dispose();
      fallbackDisposed = true;

      brainGroup.add(model);
      loadedModel = model;
    };

    const loadModel = () => {
      const gltfLoader = new GLTFLoader();

      // Phase 3.5: Load GLB exclusively (compressed, ~2.5MB after conversion)
      // brain_tex.jpg is embedded in the GLB, textures errors are non-critical
      gltfLoader.setResourcePath("/models/");

      gltfLoader.load(
        "/models/Brain_Model.glb",
        (gltf) => {
          if (isUnmounted) return;
          console.log("✅ Brain Model loaded from GLB");
          processLoadedModel(gltf.scene);
        },
        undefined,
        (error) => {
          if (isUnmounted) return;

          const errorMsg = error instanceof Error ? error.message : String(error);
          
          // Texture warnings are not critical - model still loaded
          if (errorMsg.includes("texture") || errorMsg.includes("Couldn't load")) {
            console.warn(`⚠️  Brain Model: Texture warning (non-critical): ${errorMsg}`);
            return; // Don't report error, texture is optional
          }
          
          // Actual error - report it
          console.error(`❌ Brain Model failed to load: ${errorMsg}`);
          reportModelLoadError(error);
        },
      );
    };

    const windowWithIdle = window as Window & {
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions,
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    let loadIdleHandle = 0;
    let loadTimeoutHandle = 0;

    // Phase 3.6: Sequential component loading
    // Ensures loading order: ImpactGlobe (0ms) → Services (2500ms) → MethodBrain (5000ms)
    // Prevents main thread contention and improves perceived performance
    const scheduleLoad = () => {
      if (isUnmounted) return;

      if (typeof windowWithIdle.requestIdleCallback === "function") {
        loadIdleHandle = windowWithIdle.requestIdleCallback(loadModel, { timeout: 1000 });
      } else {
        loadTimeoutHandle = window.setTimeout(loadModel, 50);
      }
    };

    // Begin loading immediately when this effect runs
    scheduleLoad();

    const ambient = new THREE.AmbientLight("#d8d8ff", 1.02);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight("#ffd4f6", 1.18);
    keyLight.position.set(2.1, 1.5, 3.7);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight("#95f0ff", 1.05);
    rimLight.position.set(-2.4, -1.6, -2.3);
    scene.add(rimLight);

    let pointerDown = false;
    let lastX = 0;
    let lastY = 0;
    let angularVelocityY = 0;
    let angularVelocityX = 0;

    const dragSensitivityY = 0.00105;
    const dragSensitivityX = 0.00082;
    const inertia = 0.93;
    const maxVelocity = 0.016;
    const maxTilt = 0.35;

    function onPointerDown(event: PointerEvent) {
      const isMouseSecondaryButton = event.pointerType === "mouse" && event.button !== 0;
      if (!event.isPrimary || isMouseSecondaryButton) return;
      pointerDown = true;
      lastX = event.clientX;
      lastY = event.clientY;
      host.setPointerCapture(event.pointerId);
    }

    function onPointerMove(event: PointerEvent) {
      if (!pointerDown) return;

      const deltaX = event.clientX - lastX;
      const deltaY = event.clientY - lastY;

      angularVelocityY += deltaX * dragSensitivityY;
      angularVelocityX += deltaY * dragSensitivityX;
      angularVelocityY = THREE.MathUtils.clamp(angularVelocityY, -maxVelocity, maxVelocity);
      angularVelocityX = THREE.MathUtils.clamp(angularVelocityX, -maxVelocity, maxVelocity);

      lastX = event.clientX;
      lastY = event.clientY;
    }

    function onPointerUp(event: PointerEvent) {
      pointerDown = false;
      if (host.hasPointerCapture(event.pointerId)) {
        host.releasePointerCapture(event.pointerId);
      }
    }

    function onPointerCancel(event: PointerEvent) {
      pointerDown = false;
      if (host.hasPointerCapture(event.pointerId)) {
        host.releasePointerCapture(event.pointerId);
      }
    }

    host.addEventListener("pointerdown", onPointerDown);
    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerup", onPointerUp);
    host.addEventListener("pointerleave", onPointerUp);
    host.addEventListener("pointercancel", onPointerCancel);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      updateRendererSize(entry.contentRect.width, entry.contentRect.height);
    });
    resizeObserver.observe(host);

    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry?.isIntersecting ?? true;
      },
      { threshold: 0.01 },
    );
    visibilityObserver.observe(host);

    let raf = 0;
    let hiddenFrameTimeout = 0;

    function scheduleNextFrame(hidden = false) {
      if (hidden) {
        hiddenFrameTimeout = window.setTimeout(() => {
          raf = window.requestAnimationFrame(animate);
        }, 160);
        return;
      }
      raf = window.requestAnimationFrame(animate);
    }

    function animate() {
      if (!isVisible) {
        scheduleNextFrame(true);
        return;
      }
      angularVelocityY = THREE.MathUtils.clamp(angularVelocityY, -maxVelocity, maxVelocity);
      angularVelocityX = THREE.MathUtils.clamp(angularVelocityX, -maxVelocity, maxVelocity);

      brainGroup.rotation.y += angularVelocityY;
      brainGroup.rotation.x = THREE.MathUtils.clamp(brainGroup.rotation.x + angularVelocityX, -maxTilt, maxTilt);
      brainGroup.rotation.x = THREE.MathUtils.lerp(brainGroup.rotation.x, 0, 0.015);

      angularVelocityY *= inertia;
      angularVelocityX *= inertia;

      renderer.render(scene, camera);
      scheduleNextFrame();
    }

    animate();

    return () => {
      isUnmounted = true;
      window.cancelAnimationFrame(raf);
      window.clearTimeout(hiddenFrameTimeout);
      if (loadIdleHandle && typeof windowWithIdle.cancelIdleCallback === "function") {
        windowWithIdle.cancelIdleCallback(loadIdleHandle);
      }
      if (loadTimeoutHandle) {
        window.clearTimeout(loadTimeoutHandle);
      }
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      host.removeEventListener("pointerdown", onPointerDown);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerup", onPointerUp);
      host.removeEventListener("pointerleave", onPointerUp);
      host.removeEventListener("pointercancel", onPointerCancel);

      if (loadedModel) {
        disposeObjectResources(loadedModel);
      }

      if (!fallbackDisposed) {
        fallback.dispose();
      }

      leftWireMaterial.dispose();
      rightWireMaterial.dispose();
      // Dispose all lights (FIX: evitar memory leak)
      ambient.dispose();
      keyLight.dispose();
      rimLight.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === host) {
         host.removeChild(renderer.domElement);
       }
     };
   }, [canLoad]);

  return (
    <div className={asBackdrop ? "methodBrainWrap methodBrainWrapBackdrop" : "methodBrainWrap"}>
      <div className="methodBrain" ref={mountRef} aria-label="Modelo 3D de cerebro interactivo" />
    </div>
  );
}
