"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { geoEquirectangular, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import worldLand50m from "world-atlas/land-50m.json";

const COUNTRY_MARKERS = [
  { key: "colombia", name: "Colombia", lat: 4.5709, lon: -74.2973 },
  { key: "mexico", name: "Mexico", lat: 23.6345, lon: -102.5528 },
  { key: "usa", name: "USA", lat: 39.8283, lon: -98.5795 },
  { key: "panama", name: "Panama", lat: 8.538, lon: -80.7821 },
  { key: "peru", name: "Peru", lat: -9.19, lon: -75.0152 },
  { key: "espana", name: "Espana", lat: 40.4637, lon: -3.7492 },
  { key: "china", name: "China", lat: 35.8617, lon: 104.1954 },
] as const;

type ImpactGlobeProps = {
  focusCountryKey?: string | null;
  focusUntilMs?: number | null;
};

function latLonToSpherePosition(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}

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

export function ImpactGlobe({ focusCountryKey = null, focusUntilMs = null }: ImpactGlobeProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const focusCountryKeyRef = useRef<string | null>(focusCountryKey);
  const focusUntilMsRef = useRef<number | null>(focusUntilMs);

  useEffect(() => {
    focusCountryKeyRef.current = focusCountryKey;
    focusUntilMsRef.current = focusUntilMs;
  }, [focusCountryKey, focusUntilMs]);

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

    const globeRadius = 1.56;
    const globeGeometry = new THREE.SphereGeometry(globeRadius, 72, 72);
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

    const markerGeometry = new THREE.SphereGeometry(0.038, 16, 16);
    const markerMaterial = new THREE.MeshStandardMaterial({
      color: "#e7f7ff",
      emissive: "#7ef6ff",
      emissiveIntensity: 1.2,
      roughness: 0.25,
      metalness: 0.1,
    });
    const markerGlowGeometry = new THREE.SphereGeometry(0.08, 12, 12);
    const markerGlowMaterial = new THREE.MeshBasicMaterial({
      color: "#a9f2ff",
      transparent: true,
      opacity: 0.32,
    });

    COUNTRY_MARKERS.forEach((country) => {
      const position = latLonToSpherePosition(country.lat, country.lon, globeRadius + 0.03);

      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.copy(position);
      marker.name = `marker-${country.key}`;

      const glow = new THREE.Mesh(markerGlowGeometry, markerGlowMaterial);
      glow.position.copy(position);

      globeGroup.add(marker);
      globeGroup.add(glow);
    });

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
    let lastY = 0;
    let pointerInside = false;
    let pointerNormX = 0;
    let pointerNormY = 0;
    let angularVelocityY = 0;
    let angularVelocityX = 0;
    const baseAutoRotation = 0.00036;
    const followRotationMax = 0.00076;
    const centerDeadZone = 0.04;
    const dragSensitivityY = 0.0009;
    const dragSensitivityX = 0.00064;
    const maxAngularVelocity = 0.016;
    const inertia = 0.94;
    const outsideRotationPerSecond = (Math.PI * 2) / 24;
    const returnToNorthLerp = 0.002;
    const clock = new THREE.Clock();
    const globeCenterWorld = new THREE.Vector3();
    const globeCenterNdc = new THREE.Vector3();
    const globeEdgeWorld = new THREE.Vector3();
    const globeEdgeNdc = new THREE.Vector3();
    const cameraRightWorld = new THREE.Vector3();
    const returnEuler = new THREE.Euler(0, 0, 0, "YXZ");
    const frontAxis = new THREE.Vector3(0, 0, 1);
    const markerDirectionMap = new Map<string, THREE.Vector3>(
      COUNTRY_MARKERS.map((country) => [
        country.key,
        latLonToSpherePosition(country.lat, country.lon, 1).normalize(),
      ]),
    );
    const focusQuaternion = new THREE.Quaternion();

    function updatePointerState(event: PointerEvent) {
      const rect = host.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      globe.updateWorldMatrix(true, false);
      camera.updateWorldMatrix(true, false);

      globe.getWorldPosition(globeCenterWorld);
      globeCenterNdc.copy(globeCenterWorld).project(camera);

      cameraRightWorld.set(1, 0, 0).applyQuaternion(camera.quaternion).normalize();
      globeEdgeWorld.copy(globeCenterWorld).addScaledVector(cameraRightWorld, globeRadius);
      globeEdgeNdc.copy(globeEdgeWorld).project(camera);

      const centerX = (globeCenterNdc.x * 0.5 + 0.5) * rect.width;
      const centerY = (-globeCenterNdc.y * 0.5 + 0.5) * rect.height;
      const edgeX = (globeEdgeNdc.x * 0.5 + 0.5) * rect.width;
      const edgeY = (-globeEdgeNdc.y * 0.5 + 0.5) * rect.height;

      const radiusPx = Math.max(1, Math.hypot(edgeX - centerX, edgeY - centerY));
      const pointerX = event.clientX - rect.left;
      const pointerY = event.clientY - rect.top;

      pointerNormX = THREE.MathUtils.clamp((pointerX - centerX) / radiusPx, -1, 1);
      pointerNormY = THREE.MathUtils.clamp((pointerY - centerY) / radiusPx, -1, 1);
    }

    function onPointerDown(event: PointerEvent) {
      pointerDown = true;
      lastX = event.clientX;
      lastY = event.clientY;
      host.setPointerCapture(event.pointerId);
    }

    function onPointerMove(event: PointerEvent) {
      updatePointerState(event);
      pointerInside = true;

      if (!pointerDown) return;

      const deltaX = event.clientX - lastX;
      const deltaY = event.clientY - lastY;

      angularVelocityY += deltaX * dragSensitivityY;
      angularVelocityX += deltaY * dragSensitivityX;
      angularVelocityY = THREE.MathUtils.clamp(angularVelocityY, -maxAngularVelocity, maxAngularVelocity);
      angularVelocityX = THREE.MathUtils.clamp(angularVelocityX, -maxAngularVelocity, maxAngularVelocity);

      lastX = event.clientX;
      lastY = event.clientY;
    }

    function onPointerEnter(event: PointerEvent) {
      pointerInside = true;
      updatePointerState(event);
    }

    function onPointerUp(event: PointerEvent) {
      pointerDown = false;
      if (host.hasPointerCapture(event.pointerId)) {
        host.releasePointerCapture(event.pointerId);
      }
    }

    function onPointerLeave(event: PointerEvent) {
      pointerInside = false;
      pointerNormX = 0;
      pointerNormY = 0;
      if (pointerDown && host.hasPointerCapture(event.pointerId)) {
        host.releasePointerCapture(event.pointerId);
      }
      pointerDown = false;
    }

    function onPointerCancel(event: PointerEvent) {
      pointerInside = false;
      pointerNormX = 0;
      pointerNormY = 0;
      if (host.hasPointerCapture(event.pointerId)) {
        host.releasePointerCapture(event.pointerId);
      }
      pointerDown = false;
    }

    host.addEventListener("pointerenter", onPointerEnter);
    host.addEventListener("pointerdown", onPointerDown);
    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerup", onPointerUp);
    host.addEventListener("pointerleave", onPointerLeave);
    host.addEventListener("pointercancel", onPointerCancel);

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
      const now = Date.now();
      const activeFocusCountry = focusCountryKeyRef.current;
      const activeFocusUntil = focusUntilMsRef.current;
      const isFocusMode =
        Boolean(activeFocusCountry) &&
        typeof activeFocusUntil === "number" &&
        now < activeFocusUntil;
      const deltaSeconds = clock.getDelta();
      const frameScale = THREE.MathUtils.clamp(deltaSeconds * 60, 0.2, 2.5);
      const damping = Math.pow(inertia, frameScale);
      let autoRotationY = 0;
      let autoRotationX = 0;

      if (isFocusMode && activeFocusCountry) {
        const markerDirection = markerDirectionMap.get(activeFocusCountry);

        if (markerDirection) {
          focusQuaternion.setFromUnitVectors(markerDirection, frontAxis);
          globeGroup.quaternion.slerp(focusQuaternion, THREE.MathUtils.clamp(0.08 * frameScale, 0, 1));
        }

        angularVelocityY = THREE.MathUtils.lerp(angularVelocityY, 0, 0.2 * frameScale);
        angularVelocityX = THREE.MathUtils.lerp(angularVelocityX, 0, 0.2 * frameScale);

        renderer.render(scene, camera);
        raf = window.requestAnimationFrame(animate);
        return;
      }

      if (pointerInside) {
        if (!reduceMotion) {
          autoRotationY += baseAutoRotation;
        }

        const distance = THREE.MathUtils.clamp(Math.hypot(pointerNormX, pointerNormY), 0, 1);
        const followSpeedFactor = reduceMotion ? 0.55 : 1;
        const speed = followRotationMax * followSpeedFactor * Math.max(distance, centerDeadZone);

        autoRotationY += pointerNormX * speed;
        autoRotationX += -pointerNormY * speed;
      } else {
        // Outside the globe area, maintain constant orbital speed: 1 turn / 24s.
        const outsideStep = outsideRotationPerSecond * deltaSeconds;
        angularVelocityY = THREE.MathUtils.lerp(angularVelocityY, outsideStep, 0.14 * frameScale);
        angularVelocityX *= damping;
      }

      if (pointerInside) {
        angularVelocityY += autoRotationY;
        angularVelocityX += autoRotationX;
      }

      angularVelocityY = THREE.MathUtils.clamp(angularVelocityY, -maxAngularVelocity, maxAngularVelocity);
      angularVelocityX = THREE.MathUtils.clamp(angularVelocityX, -maxAngularVelocity, maxAngularVelocity);

      globeGroup.rotateY(angularVelocityY);
      globeGroup.rotateX(angularVelocityX);

      if (!pointerInside) {
        returnEuler.setFromQuaternion(globeGroup.quaternion, "YXZ");
        returnEuler.x = THREE.MathUtils.lerp(returnEuler.x, 0, THREE.MathUtils.clamp(returnToNorthLerp * frameScale, 0, 1));
        returnEuler.z = THREE.MathUtils.lerp(returnEuler.z, 0, THREE.MathUtils.clamp(returnToNorthLerp * frameScale, 0, 1));
        globeGroup.quaternion.setFromEuler(returnEuler);
      }

      angularVelocityY *= damping;
      angularVelocityX *= damping;

      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      host.removeEventListener("pointerenter", onPointerEnter);
      host.removeEventListener("pointerdown", onPointerDown);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerup", onPointerUp);
      host.removeEventListener("pointerleave", onPointerLeave);
      host.removeEventListener("pointercancel", onPointerCancel);
      renderer.dispose();
      globeGeometry.dispose();
      atmosphereGeometry.dispose();
      markerGeometry.dispose();
      markerGlowGeometry.dispose();
      globeMaterial.dispose();
      atmosphereMaterial.dispose();
      markerMaterial.dispose();
      markerGlowMaterial.dispose();
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
