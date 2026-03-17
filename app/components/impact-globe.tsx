"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { feature } from "topojson-client";
import worldLand110m from "world-atlas/land-110m.json";

type Marker = {
  lat: number;
  lon: number;
};

type LonLat = [number, number];
type XYPoint = { x: number; y: number };

const markers: Marker[] = [
  { lat: 4.71, lon: -74.07 },
  { lat: 19.43, lon: -99.13 },
  { lat: 40.42, lon: -3.7 },
  { lat: -12.05, lon: -77.04 },
  { lat: 26.12, lon: -80.14 },
  { lat: 8.98, lon: -79.52 },
  { lat: 39.9, lon: 116.4 },
  { lat: -34.6, lon: -58.38 },
  { lat: -23.55, lon: -46.63 },
  { lat: 14.6, lon: -90.52 },
  { lat: 6.25, lon: -75.57 },
  { lat: 18.49, lon: -69.99 },
  { lat: 3.45, lon: -76.53 },
];

function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function getContinentsCoordinates(): LonLat[][][] {
  const source = worldLand110m as unknown as {
    type: "Topology";
    objects: { land: unknown };
    arcs: unknown[];
    bbox?: number[];
    transform?: unknown;
  };

  const landFeature = feature(source as never, source.objects.land as never) as unknown as {
    geometry?: {
      type?: string;
      coordinates?: unknown;
    };
  };
  const geometry = landFeature?.geometry;

  if (!geometry?.type || !geometry?.coordinates) {
    return [];
  }

  if (geometry.type === "Polygon") {
    return [geometry.coordinates as LonLat[][]];
  }

  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates as LonLat[][][];
  }

  return [];
}

function createStripedContinentsTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1536;
  canvas.height = 768;

  const context = canvas.getContext("2d");
  if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  const width = canvas.width;
  const height = canvas.height;
  const polygons = getContinentsCoordinates();

  const toCanvasPoint = (lonLat: LonLat): XYPoint => {
    const lon = lonLat[0];
    const lat = lonLat[1];
    return {
      x: ((lon + 180) / 360) * width,
      y: ((90 - lat) / 180) * height,
    };
  };

  const unwrapRing = (ring: LonLat[]): XYPoint[] => {
    const projected = ring.map(toCanvasPoint);
    if (projected.length === 0) return projected;

    const unwrapped: XYPoint[] = [projected[0]];
    for (let index = 1; index < projected.length; index += 1) {
      const previous = unwrapped[unwrapped.length - 1];
      let currentX = projected[index].x;
      const delta = currentX - previous.x;

      if (delta > width / 2) {
        currentX -= width;
      } else if (delta < -width / 2) {
        currentX += width;
      }

      unwrapped.push({ x: currentX, y: projected[index].y });
    }

    return unwrapped;
  };

  const traceRing = (points: XYPoint[], shift = 0) => {
    if (points.length < 3) return;
    context.moveTo(points[0].x + shift, points[0].y);
    for (let index = 1; index < points.length; index += 1) {
      context.lineTo(points[index].x + shift, points[index].y);
    }
    context.closePath();
  };

  const drawWrappedRing = (points: XYPoint[]) => {
    traceRing(points, -width);
    traceRing(points, 0);
    traceRing(points, width);
  };

  const projectedRingArea = (points: XYPoint[]) => {
    if (points.length < 3) return 0;

    let area = 0;
    for (let index = 0; index < points.length; index += 1) {
      const current = points[index];
      const next = points[(index + 1) % points.length];
      area += current.x * next.y - next.x * current.y;
    }

    return Math.abs(area / 2);
  };

  const ocean = context.createLinearGradient(0, 0, 0, height);
  ocean.addColorStop(0, "#13081f");
  ocean.addColorStop(0.5, "#100818");
  ocean.addColorStop(1, "#080710");
  context.fillStyle = ocean;
  context.fillRect(0, 0, width, height);

  context.strokeStyle = "rgba(194, 97, 255, 0.14)";
  context.lineWidth = 1;
  for (let y = 10; y < height; y += 28) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }

  const minArea = width * height * 0.00042;

  for (const polygon of polygons) {
    const exterior = polygon[0];
    if (!exterior) continue;

    const unwrapped = unwrapRing(exterior);
    if (projectedRingArea(unwrapped) < minArea) continue;

    context.save();
    context.beginPath();
    drawWrappedRing(unwrapped);
    context.clip("evenodd");

    context.fillStyle = "rgba(61, 12, 96, 0.92)";
    context.fillRect(0, 0, width, height);

    context.strokeStyle = "rgba(238, 73, 255, 0.96)";
    context.lineWidth = 3;
    context.lineCap = "round";
    for (let y = -height; y < height * 2; y += 13) {
      context.beginPath();
      context.moveTo(-width, y);
      context.lineTo(width * 2, y - 122);
      context.stroke();
    }

    context.restore();

    context.beginPath();
    drawWrappedRing(unwrapped);
    context.strokeStyle = "rgba(255, 184, 255, 0.34)";
    context.lineWidth = 1.1;
    context.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export function ImpactGlobe() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const host = mount;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const globeGeometry = new THREE.SphereGeometry(1.56, 72, 72);
    const globeTexture = createStripedContinentsTexture();
    globeTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const globeMaterial = new THREE.MeshStandardMaterial({
      map: globeTexture,
      color: "#ffffff",
      emissive: "#13011b",
      emissiveIntensity: 0.28,
      roughness: 0.72,
      metalness: 0.12,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    globeGroup.add(globe);

    const wireMaterial = new THREE.MeshBasicMaterial({
      color: "#df00ff",
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const wire = new THREE.Mesh(globeGeometry, wireMaterial);
    globeGroup.add(wire);

    const atmosphereGeometry = new THREE.SphereGeometry(1.75, 44, 44);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: "#8cecff",
      transparent: true,
      opacity: 0.11,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    globeGroup.add(atmosphere);

    const markerGeometry = new THREE.SphereGeometry(0.06, 18, 18);
    const markerMaterial = new THREE.MeshStandardMaterial({
      color: "#b8f2ff",
      emissive: "#6de8ff",
      emissiveIntensity: 1,
      roughness: 0.3,
      metalness: 0.05,
    });

    for (const marker of markers) {
      const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);
      markerMesh.position.copy(latLonToVector3(marker.lat, marker.lon, 1.64));
      globeGroup.add(markerMesh);
    }

    const ambient = new THREE.AmbientLight("#82b4ff", 0.8);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight("#7ef6ff", 1.25);
    keyLight.position.set(2, 1.4, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight("#ca53ff", 1.6);
    rimLight.position.set(-3, -2, -2);
    scene.add(rimLight);

    let pointerDown = false;
    let lastX = 0;
    let targetRotY = 0.2;
    const targetRotX = -0.18;

    function onPointerDown(event: PointerEvent) {
      pointerDown = true;
      lastX = event.clientX;
      host.setPointerCapture(event.pointerId);
    }

    function onPointerMove(event: PointerEvent) {
      if (!pointerDown) return;

      const deltaX = event.clientX - lastX;
      targetRotY += deltaX * 0.0045;
      lastX = event.clientX;
    }

    function onPointerUp(event: PointerEvent) {
      pointerDown = false;
      host.releasePointerCapture(event.pointerId);
    }

    host.addEventListener("pointerdown", onPointerDown);
    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerup", onPointerUp);
    host.addEventListener("pointerleave", onPointerUp);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const width = entry.contentRect.width;
      const height = entry.contentRect.height;
      if (width === 0 || height === 0) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(host);

    let raf = 0;

    function animate() {
      const autoRotation = reduceMotion ? 0 : 0.0018;
      targetRotY += autoRotation;

      globeGroup.rotation.y += (targetRotY - globeGroup.rotation.y) * 0.08;
      globeGroup.rotation.x += (targetRotX - globeGroup.rotation.x) * 0.08;

      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      host.removeEventListener("pointerdown", onPointerDown);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerup", onPointerUp);
      host.removeEventListener("pointerleave", onPointerUp);
      renderer.dispose();
      globeGeometry.dispose();
      atmosphereGeometry.dispose();
      markerGeometry.dispose();
      globeMaterial.dispose();
      wireMaterial.dispose();
      atmosphereMaterial.dispose();
      markerMaterial.dispose();
      globeTexture.dispose();
      host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="impactGlobeWrap">
      <div className="impactGlobe" ref={mountRef} aria-label="Globo 3D interactivo de paises impactados" />
      <div className="impactFlags" aria-hidden="true">
        <span>🇨🇴</span>
        <span>🇲🇽</span>
        <span>🇺🇸</span>
        <span>🇵🇦</span>
        <span>🇵🇪</span>
        <span>🇪🇸</span>
        <span>🇨🇳</span>
      </div>
    </div>
  );
}
