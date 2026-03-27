"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { impactCountries } from "../data/tnt-content";

type ImpactGlobeProps = {
  focusCountryKey?: string | null;
  focusUntilMs?: number | null;
  asBackdrop?: boolean;
};

type DevicePerfProfile = {
  pixelRatio: number;
  globeSegments: number;
};

function getDevicePerfProfile(): DevicePerfProfile {
  const dpr = window.devicePixelRatio || 1;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const memory = nav.deviceMemory ?? 4;
  const lowEndDevice = memory <= 4 || dpr >= 2.5;

  if (lowEndDevice) {
    return {
      pixelRatio: Math.min(dpr, 1.6),
      globeSegments: 96,
    };
  }

  return {
    pixelRatio: Math.min(dpr, 2.25),
    globeSegments: 112,
  };
}

function latLonToSpherePosition(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}

export function ImpactGlobe({
  focusCountryKey = null,
  focusUntilMs = null,
  asBackdrop = false,
}: ImpactGlobeProps) {
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
    const perfProfile = getDevicePerfProfile();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(perfProfile.pixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    function updateRendererSize(width: number, height: number) {
      if (width <= 0 || height <= 0) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    }

    const initialRect = host.getBoundingClientRect();
    updateRendererSize(initialRect.width, initialRect.height);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const globeRadius = 1.56;
    const globeScale = 0.90;
    const globeOffsetX = 0.9;
    const globeOffsetY = -0.1;
    const effectiveGlobeRadius = globeRadius * globeScale;
    const globeGeometry = new THREE.SphereGeometry(
      globeRadius,
      perfProfile.globeSegments,
      perfProfile.globeSegments,
    );
    const globeTexture = new THREE.TextureLoader().load("/textures/impact-continents.svg");
    globeTexture.colorSpace = THREE.SRGBColorSpace;
    globeTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    globeTexture.minFilter = THREE.LinearMipmapLinearFilter;
    globeTexture.magFilter = THREE.LinearFilter;
    globeTexture.generateMipmaps = true;
    globeTexture.needsUpdate = true;

    const globeMaterial = new THREE.MeshStandardMaterial({
      map: globeTexture,
      color: "#ffffff",
      emissive: "#5f0f7f",
      emissiveIntensity: 0.36,
      roughness: 0.5,
      metalness: 0.2,
      transparent: true,
      opacity: 0.88,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    globeGroup.add(globe);

    globeGroup.scale.setScalar(globeScale);
    globeGroup.position.set(globeOffsetX, globeOffsetY, 0);

    // Importar el pin futurista
    // @ts-ignore
    const { createFuturisticPinGroup } = require("./futuristic-pin");

    impactCountries.forEach((country) => {
      const position = latLonToSpherePosition(country.lat, country.lon, globeRadius + 0.03);
      const pin = createFuturisticPinGroup();
      pin.position.copy(position);
      pin.lookAt(0, 0, 0); // Que apunte hacia el centro del globo
      pin.name = `marker-${country.key}`;
      globeGroup.add(pin);
    });

    const ambient = new THREE.AmbientLight("#76ffca", 0.85);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight("#8dffd8", 1.55);
    keyLight.position.set(2, 1.4, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight("#39e9ab", 1.2);
    rimLight.position.set(-3, -1.4, -2);
    scene.add(rimLight);

    const backLight = new THREE.PointLight("#73ffcb", 1.45, 10, 2);
    backLight.position.set(-1.2, 0.8, -3.8);
    scene.add(backLight);

    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry?.isIntersecting ?? true;
      },
      { threshold: 0.01 },
    );
    visibilityObserver.observe(host);

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
    const dragSensitivityY = 0.0012;
    const dragSensitivityX = 0.0009;
    const dragBoost = 1.25;
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
      impactCountries.map((country) => [
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
      globeEdgeWorld.copy(globeCenterWorld).addScaledVector(cameraRightWorld, effectiveGlobeRadius);
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
      const isMouseSecondaryButton = event.pointerType === "mouse" && event.button !== 0;
      if (!event.isPrimary || isMouseSecondaryButton) return;
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

      // Invertir la dirección del seguimiento de puntero
      angularVelocityY -= deltaX * dragSensitivityY * dragBoost;
      angularVelocityX -= deltaY * dragSensitivityX * dragBoost;
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
      updateRendererSize(width, height);
    });
    resizeObserver.observe(host);

    let raf = 0;

    function animate() {
      const now = Date.now();
      if (!isVisible) {
        raf = window.requestAnimationFrame(animate);
        return;
      }
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
          // Desplazamiento: 20% a la derecha (eje X positivo), 10% arriba (eje Y positivo)
          const offset = new THREE.Vector3(0.2, 0.1, 0);
          const targetDirection = markerDirection.clone().add(offset).normalize();
          focusQuaternion.setFromUnitVectors(targetDirection, frontAxis);
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

        // Invertir la dirección del seguimiento de puntero (hover)
        autoRotationY -= pointerNormX * speed;
        autoRotationX -= -pointerNormY * speed;
      } else if (!reduceMotion) {
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
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      host.removeEventListener("pointerenter", onPointerEnter);
      host.removeEventListener("pointerdown", onPointerDown);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerup", onPointerUp);
      host.removeEventListener("pointerleave", onPointerLeave);
      host.removeEventListener("pointercancel", onPointerCancel);
      renderer.dispose();
      globeGeometry.dispose();
      globeMaterial.dispose();
      backLight.dispose();
      globeTexture.dispose();
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`impactGlobeWrap${asBackdrop ? " impactGlobeWrapBackdrop" : ""}`}>
      <div className="impactGlobe" ref={mountRef} aria-label="Globo 3D interactivo de 7 oficinas" />
    </div>
  );
}
