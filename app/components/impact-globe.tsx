"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { geoEquirectangular, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import worldLand50m from "world-atlas/land-50m.json";
import { impactCountries } from "../data/tnt-content";

type ImpactGlobeProps = {
  focusCountryKey?: string | null;
  focusUntilMs?: number | null;
  asBackdrop?: boolean;
};

type DevicePerfProfile = {
  lowEndDevice: boolean;
  textureWidth: number;
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
      lowEndDevice: true,
      textureWidth: 1536,
      pixelRatio: Math.min(dpr, 1.3),
      globeSegments: 72,
    };
  }

  return {
    lowEndDevice: false,
    textureWidth: 2048,
    pixelRatio: Math.min(dpr, 1.85),
    globeSegments: 88,
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

async function loadSvgData(url: string) {
  const loader = new SVGLoader();
  return await new Promise<Awaited<ReturnType<SVGLoader["loadAsync"]>>>((resolve, reject) => {
    loader.load(url, resolve, undefined, reject);
  });
}

async function createLogoPinPrototype(lowEndDevice: boolean) {
  const svgData = await loadSvgData("/Vectorizer-io-tnt-logo.svg");
  const pinRoot = new THREE.Group();
  const logoMaterial = new THREE.MeshBasicMaterial({
    color: "#ffffff",
    side: THREE.DoubleSide,
    toneMapped: false,
  });

  const logoGeometries: THREE.ExtrudeGeometry[] = [];
  const extrudeSettings = {
    depth: lowEndDevice ? 10 : 13,
    bevelEnabled: true,
    bevelThickness: lowEndDevice ? 1.2 : 1.6,
    bevelSize: lowEndDevice ? 0.8 : 1,
    bevelSegments: lowEndDevice ? 1 : 2,
    curveSegments: lowEndDevice ? 8 : 12,
  } as const;

  const whiteStrokePaths = svgData.paths.filter((path) => {
    const style = (path.userData as { style?: { stroke?: string } } | undefined)?.style;
    const stroke = style?.stroke?.trim().toLowerCase();
    return stroke === "#ffffff" || stroke === "white" || stroke === "rgb(255,255,255)";
  });

  const candidatePaths = whiteStrokePaths.length > 0 ? whiteStrokePaths : svgData.paths;
  const shapeRecords: Array<{ shape: THREE.Shape; area: number }> = [];

  candidatePaths.forEach((path) => {
    const shapes = SVGLoader.createShapes(path);
    shapes.forEach((shape) => {
      const points = shape.extractPoints(lowEndDevice ? 8 : 12).shape;
      const bounds2D = new THREE.Box2().setFromPoints(points);
      const area = Math.max(
        (bounds2D.max.x - bounds2D.min.x) * (bounds2D.max.y - bounds2D.min.y),
        0,
      );
      if (Number.isFinite(area) && area > 0) {
        shapeRecords.push({ shape, area });
      }
    });
  });

  const sortedAreas = shapeRecords.map((record) => record.area).sort((a, b) => a - b);
  const medianArea = sortedAreas.length > 0 ? sortedAreas[Math.floor(sortedAreas.length / 2)] : 0;
  const filteredRecords = medianArea > 0
    ? shapeRecords.filter((record) => record.area <= medianArea * 35)
    : shapeRecords;
  const shapesToExtrude = filteredRecords.length > 0
    ? filteredRecords.map((record) => record.shape)
    : shapeRecords.map((record) => record.shape);

  shapesToExtrude.forEach((shape) => {
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.computeVertexNormals();
    const mesh = new THREE.Mesh(geometry, logoMaterial);
    pinRoot.add(mesh);
    logoGeometries.push(geometry);
  });

  if (logoGeometries.length === 0) {
    throw new Error("No se encontraron shapes validos para extruir el pin del logo.");
  }

  const bounds = new THREE.Box3().setFromObject(pinRoot);
  const center = new THREE.Vector3();
  const size = new THREE.Vector3();
  bounds.getCenter(center);
  bounds.getSize(size);

  // Move geometry pivot to center and align back face to z=0 so depth projects outward.
  pinRoot.position.set(-center.x, -center.y, -bounds.min.z);

  const targetWidth = lowEndDevice ? 0.2 : 0.24;
  const normalizedScale = targetWidth / Math.max(size.x, 1);
  pinRoot.scale.setScalar(normalizedScale);

  return {
    createInstance: () => pinRoot.clone(true),
    dispose: () => {
      logoGeometries.forEach((geometry) => geometry.dispose());
      logoMaterial.dispose();
    },
  };
}

function createContinentsTexture(textureWidth: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = textureWidth;
  canvas.height = Math.floor(textureWidth / 2);

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

  // Keep oceans transparent: only draw land masses and their contour treatment.
  context.clearRect(0, 0, width, height);

  context.fillStyle = "rgba(101, 10, 128, 0.52)";
  context.beginPath();
  path(landFeature as never);
  context.fill("evenodd");

  const landGlow = context.createLinearGradient(0, 0, 0, height);
  landGlow.addColorStop(0, "rgba(255, 92, 228, 0.34)");
  landGlow.addColorStop(0.5, "rgba(238, 48, 212, 0.18)");
  landGlow.addColorStop(1, "rgba(112, 8, 139, 0.24)");

  context.save();
  context.beginPath();
  path(landFeature as never);
  context.clip("evenodd");
  context.fillStyle = landGlow;
  context.fillRect(0, 0, width, height);
  context.restore();

  context.strokeStyle = "rgba(255, 76, 242, 0.92)";
  context.lineWidth = 1.2;
  context.beginPath();
  path(landFeature as never);
  context.stroke();

  context.strokeStyle = "rgba(255, 154, 247, 0.54)";
  context.lineWidth = 0.7;
  context.beginPath();
  path(landFeature as never);
  context.stroke();

  // Dot matrix clipped to land masses for a data-driven look.
  context.save();
  context.beginPath();
  path(landFeature as never);
  context.clip("evenodd");
  context.fillStyle = "rgba(255, 112, 238, 0.52)";

  const dotGap = Math.max(7, Math.floor(width / 330));
  const dotRadius = Math.max(1.1, dotGap * 0.19);
  for (let y = 0; y < height; y += dotGap) {
    const offset = (Math.floor(y / dotGap) % 2) * (dotGap * 0.5);
    for (let x = offset; x < width; x += dotGap) {
      context.beginPath();
      context.arc(x, y, dotRadius, 0, Math.PI * 2);
      context.fill();
    }
  }
  context.restore();

  // Soft edge only inside land areas to keep oceans transparent.
  const landVignette = context.createRadialGradient(
    width / 2,
    height / 2,
    width * 0.1,
    width / 2,
    height / 2,
    width * 0.68,
  );
  landVignette.addColorStop(0, "rgba(255, 255, 255, 0)");
  landVignette.addColorStop(1, "rgba(56, 0, 66, 0.24)");
  context.save();
  context.beginPath();
  path(landFeature as never);
  context.clip("evenodd");
  context.fillStyle = landVignette;
  context.fillRect(0, 0, width, height);
  context.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
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

    const renderer = new THREE.WebGLRenderer({
      antialias: !perfProfile.lowEndDevice,
      alpha: true,
      powerPreference: perfProfile.lowEndDevice ? "low-power" : "high-performance",
    });
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
    const globeScale = 0.729;
    const globeOffsetX = 0.9;
    const globeOffsetY = 0.0;
    const effectiveGlobeRadius = globeRadius * globeScale;
    const globeGeometry = new THREE.SphereGeometry(
      globeRadius,
      perfProfile.globeSegments,
      perfProfile.globeSegments,
    );
    const globeTexture = createContinentsTexture(perfProfile.textureWidth);
    globeTexture.anisotropy = Math.min(
      renderer.capabilities.getMaxAnisotropy(),
      perfProfile.lowEndDevice ? 2 : 4,
    );

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

    const pinsGroup = new THREE.Group();
    globeGroup.add(pinsGroup);
    let disposePinPrototype = () => {};
    let isUnmounted = false;

    createLogoPinPrototype(perfProfile.lowEndDevice)
      .then((prototype) => {
        if (isUnmounted) {
          prototype.dispose();
          return;
        }

        disposePinPrototype = prototype.dispose;
        const outAxis = new THREE.Vector3(0, 0, 1);

        impactCountries.forEach((country) => {
          const normal = latLonToSpherePosition(country.lat, country.lon, 1).normalize();
          const position = normal.clone().multiplyScalar(globeRadius + 0.02);
          const pin = prototype.createInstance();
          pin.position.copy(position);
          pin.quaternion.setFromUnitVectors(outAxis, normal);
          pin.rotateZ(Math.PI);
          pin.name = `marker-${country.key}`;
          pinsGroup.add(pin);
        });
      })
      .catch((error) => {
        if (process.env.NODE_ENV !== "production") {
          console.error("[ImpactGlobe] No se pudo cargar el SVG de pins", error);
        }
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
    const timer = new THREE.Timer();
    timer.connect(document);
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

      angularVelocityY += deltaX * dragSensitivityY * dragBoost;
      angularVelocityX += deltaY * dragSensitivityX * dragBoost;
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
      const now = Date.now();
      if (!isVisible) {
        scheduleNextFrame(true);
        return;
      }
      const activeFocusCountry = focusCountryKeyRef.current;
      const activeFocusUntil = focusUntilMsRef.current;
      const isFocusMode =
        Boolean(activeFocusCountry) &&
        typeof activeFocusUntil === "number" &&
        now < activeFocusUntil;
      timer.update();
      const deltaSeconds = timer.getDelta();
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
        scheduleNextFrame();
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
      scheduleNextFrame();
    }

    animate();

    return () => {
      isUnmounted = true;
      window.cancelAnimationFrame(raf);
      window.clearTimeout(hiddenFrameTimeout);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      host.removeEventListener("pointerenter", onPointerEnter);
      host.removeEventListener("pointerdown", onPointerDown);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerup", onPointerUp);
      host.removeEventListener("pointerleave", onPointerLeave);
      host.removeEventListener("pointercancel", onPointerCancel);
      timer.dispose();
      renderer.dispose();
      globeGeometry.dispose();
      globeMaterial.dispose();
      disposePinPrototype();
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
