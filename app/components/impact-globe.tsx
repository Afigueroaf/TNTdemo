"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { geoEquirectangular, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import worldLand50m from "world-atlas/land-50m.json";

function createContinentsTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;

  const context = canvas.getContext("2d");
  if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  const width = canvas.width;
  const height = canvas.height;
  const source = worldLand50m as unknown as {
    type: "Topology";
    objects: { land: unknown };
  };
  const landFeature = feature(source as never, source.objects.land as never);

  const projection = geoEquirectangular()
    .translate([width / 2, height / 2])
    .scale(width / (2 * Math.PI));
  const path = geoPath(projection, context);

  // Ocean background
  const ocean = context.createLinearGradient(0, 0, 0, height);
  ocean.addColorStop(0, "#13081f");
  ocean.addColorStop(0.5, "#100818");
  ocean.addColorStop(1, "#080710");
  context.fillStyle = ocean;
  context.fillRect(0, 0, width, height);

  context.fillStyle = "rgba(80, 27, 120, 0.97)";
  context.beginPath();
  path(landFeature as never);
  context.fill("evenodd");

  const landGlow = context.createLinearGradient(0, 0, 0, height);
  landGlow.addColorStop(0, "rgba(255, 162, 230, 0.22)");
  landGlow.addColorStop(0.5, "rgba(227, 92, 255, 0.06)");
  landGlow.addColorStop(1, "rgba(54, 11, 92, 0.2)");

  context.save();
  context.beginPath();
  path(landFeature as never);
  context.clip("evenodd");
  context.fillStyle = landGlow;
  context.fillRect(0, 0, width, height);
  context.restore();

  context.strokeStyle = "rgba(255, 198, 255, 0.48)";
  context.lineWidth = 1.2;
  context.beginPath();
  path(landFeature as never);
  context.stroke();

  context.strokeStyle = "rgba(255, 242, 255, 0.28)";
  context.lineWidth = 0.6;
  context.beginPath();
  path(landFeature as never);
  context.stroke();

  const vignette = context.createRadialGradient(
    width / 2,
    height / 2,
    width * 0.12,
    width / 2,
    height / 2,
    width * 0.64,
  );
  vignette.addColorStop(0, "rgba(255, 255, 255, 0)");
  vignette.addColorStop(1, "rgba(0, 0, 0, 0.26)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);

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
    const globeTexture = createContinentsTexture();
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

    const atmosphereGeometry = new THREE.SphereGeometry(1.75, 44, 44);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: "#8cecff",
      transparent: true,
      opacity: 0.11,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    globeGroup.add(atmosphere);

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
    let pointerInside = false;
    let hoverDirection = 1;
    let hoverIntensity = 0;

    function onPointerDown(event: PointerEvent) {
      pointerDown = true;
      lastX = event.clientX;
      host.setPointerCapture(event.pointerId);
    }

    function onPointerMove(event: PointerEvent) {
      const bounds = host.getBoundingClientRect();
      const relativeX = (event.clientX - bounds.left) / Math.max(bounds.width, 1);
      const centeredX = (relativeX - 0.5) * 2;
      hoverDirection = centeredX >= 0 ? 1 : -1;
      hoverIntensity = Math.min(Math.abs(centeredX), 1);

      if (!pointerDown) return;

      const deltaX = event.clientX - lastX;
      targetRotY += deltaX * 0.0045;
      lastX = event.clientX;
    }

    function onPointerEnter() {
      pointerInside = true;
    }

    function onPointerUp(event: PointerEvent) {
      if (pointerDown && host.hasPointerCapture(event.pointerId)) {
        host.releasePointerCapture(event.pointerId);
      }
      pointerDown = false;
    }

    function onPointerLeave(event: PointerEvent) {
      pointerInside = false;
      hoverIntensity = 0;
      onPointerUp(event);
    }

    host.addEventListener("pointerdown", onPointerDown);
    host.addEventListener("pointerenter", onPointerEnter);
    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerup", onPointerUp);
    host.addEventListener("pointerleave", onPointerLeave);

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
      const cursorAutoRotation = pointerInside ? hoverDirection * (0.0005 + hoverIntensity * 0.003) : 0;
      const autoRotation = reduceMotion ? 0 : pointerInside ? cursorAutoRotation : 0.0018;
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
      host.removeEventListener("pointerenter", onPointerEnter);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerup", onPointerUp);
      host.removeEventListener("pointerleave", onPointerLeave);
      renderer.dispose();
      globeGeometry.dispose();
      atmosphereGeometry.dispose();
      globeMaterial.dispose();
      atmosphereMaterial.dispose();
      globeTexture.dispose();
      host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="impactGlobeWrap">
      <div className="impactGlobe" ref={mountRef} aria-label="Globo 3D interactivo de paises impactados" />
    </div>
  );
}
