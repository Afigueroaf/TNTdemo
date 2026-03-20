"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import brandingHome from "../../Pictures/branding-home.png";
import creatividadHome from "../../Pictures/creatividad-home.png";
import marketingExperiencialHome from "../../Pictures/markenting-experiencial.png";
import marketingDigitalHome from "../../Pictures/marketing-digital-home.png";
export function Services() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const host = mount;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 6.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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

    const prismGroup = new THREE.Group();
    scene.add(prismGroup);

    // Prisma octagonal vertical (8 caras, eje Y).
    const prismSides = 8;
    // Face ratio target based on source art: 416 / 630.
    const imageAspectRatio = 416 / 630;
    const prismHeight = 2.585;
    const prismRadius = (prismHeight * imageAspectRatio) / (2 * Math.sin(Math.PI / prismSides));
    const prismGeometry = new THREE.CylinderGeometry(prismRadius, prismRadius, prismHeight, prismSides, 1, false);
    const sideLength = 2 * prismRadius * Math.sin(Math.PI / prismSides);
    const prismApothem = prismRadius * Math.cos(Math.PI / prismSides);
    const sideMaterial = new THREE.MeshStandardMaterial({
      color: "#f7f2ff",
      emissive: "#13011b",
      emissiveIntensity: 0.18,
      roughness: 0.62,
      metalness: 0.08,
      transparent: true,
      opacity: 0.18,
    });
    const capMaterial = new THREE.MeshStandardMaterial({
      color: "#6b3da2",
      emissive: "#12081b",
      emissiveIntensity: 0.24,
      roughness: 0.52,
      metalness: 0.18,
      transparent: true,
      opacity: 0.14,
    });
    const prism = new THREE.Mesh(prismGeometry, [sideMaterial, capMaterial, capMaterial]);
    prism.visible = false;
    prism.renderOrder = 1;
    prismGroup.add(prism);

    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(prismGeometry),
      new THREE.LineBasicMaterial({ color: "#d7b0ff", transparent: true, opacity: 0.45 }),
    );
    edges.visible = false;
    edges.renderOrder = 2;
    prismGroup.add(edges);

    const imageOrder = [
      brandingHome.src,
      creatividadHome.src,
      marketingExperiencialHome.src,
      marketingDigitalHome.src,
      brandingHome.src,
      creatividadHome.src,
      marketingExperiencialHome.src,
      marketingDigitalHome.src,
    ];

    const textureLoader = new THREE.TextureLoader();
    const projectedFaces: Array<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>> = [];
    const outwardOffset = sideLength / 3;
    const baseTheta = Math.PI / prismSides;

    imageOrder.forEach((url, index) => {
      const texture = textureLoader.load(url);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;

      const panelGeometry = new THREE.PlaneGeometry(sideLength, prismHeight);
      const panelMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
      });
      const panel = new THREE.Mesh(panelGeometry, panelMaterial);

      const theta = baseTheta + (index * Math.PI * 2) / prismSides;
      const radialDistance = prismApothem + outwardOffset;
      panel.position.set(
        Math.cos(theta) * radialDistance,
        0,
        Math.sin(theta) * radialDistance,
      );
      // Keep each panel parallel to its prism face normal.
      panel.rotation.y = Math.PI / 2 - theta;
      panel.renderOrder = 3;

      prismGroup.add(panel);
      projectedFaces.push(panel);
    });

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
    let pointerInside = false;
    let pointerNormX = 0;
    let angularVelocityY = 0;
    const baseAutoRotation = 0.00036;
    const followRotationMax = 0.00076;
    const centerDeadZone = 0.04;
    const dragSensitivityY = 0.0012;
    const dragBoost = 1.25;
    const maxAngularVelocity = 0.016;
    const inertia = 0.94;
    const outsideRotationPerSecond = (Math.PI * 2) / 24;
    const clock = new THREE.Clock();
    const prismCenterWorld = new THREE.Vector3();
    const prismCenterNdc = new THREE.Vector3();
    const prismEdgeWorld = new THREE.Vector3();
    const prismEdgeNdc = new THREE.Vector3();
    const cameraRightWorld = new THREE.Vector3();
    const prismRadiusForPointer = prismRadius;

    function updatePointerState(event: PointerEvent) {
      const rect = host.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      prism.updateWorldMatrix(true, false);
      camera.updateWorldMatrix(true, false);

      prism.getWorldPosition(prismCenterWorld);
      prismCenterNdc.copy(prismCenterWorld).project(camera);

      cameraRightWorld.set(1, 0, 0).applyQuaternion(camera.quaternion).normalize();
      prismEdgeWorld.copy(prismCenterWorld).addScaledVector(cameraRightWorld, prismRadiusForPointer);
      prismEdgeNdc.copy(prismEdgeWorld).project(camera);

      const centerX = (prismCenterNdc.x * 0.5 + 0.5) * rect.width;
      const centerY = (-prismCenterNdc.y * 0.5 + 0.5) * rect.height;
      const edgeX = (prismEdgeNdc.x * 0.5 + 0.5) * rect.width;
      const edgeY = (-prismEdgeNdc.y * 0.5 + 0.5) * rect.height;

      const radiusPx = Math.max(1, Math.hypot(edgeX - centerX, edgeY - centerY));
      const pointerX = event.clientX - rect.left;

      pointerNormX = THREE.MathUtils.clamp((pointerX - centerX) / radiusPx, -1, 1);
    }

    function onPointerDown(event: PointerEvent) {
      pointerDown = true;
      lastX = event.clientX;
      host.setPointerCapture(event.pointerId);
    }

    function onPointerMove(event: PointerEvent) {
      updatePointerState(event);
      pointerInside = true;

      if (!pointerDown) return;

      const deltaX = event.clientX - lastX;

      angularVelocityY += deltaX * dragSensitivityY * dragBoost;
      angularVelocityY = THREE.MathUtils.clamp(angularVelocityY, -maxAngularVelocity, maxAngularVelocity);

      lastX = event.clientX;
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
      if (pointerDown && host.hasPointerCapture(event.pointerId)) {
        host.releasePointerCapture(event.pointerId);
      }
      pointerDown = false;
    }

    function onPointerCancel(event: PointerEvent) {
      pointerInside = false;
      pointerNormX = 0;
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
      const deltaSeconds = clock.getDelta();
      const frameScale = THREE.MathUtils.clamp(deltaSeconds * 60, 0.2, 2.5);
      const damping = Math.pow(inertia, frameScale);
      let autoRotationY = 0;

      if (pointerInside) {
        if (!reduceMotion) {
          autoRotationY += baseAutoRotation;
        }

        const distance = Math.abs(pointerNormX);
        const followSpeedFactor = reduceMotion ? 0.55 : 1;
        const speed = followRotationMax * followSpeedFactor * Math.max(distance, centerDeadZone);

        autoRotationY += pointerNormX * speed;
      } else {
        // Outside the globe area, maintain constant orbital speed: 1 turn / 24s.
        const outsideStep = outsideRotationPerSecond * deltaSeconds;
        angularVelocityY = THREE.MathUtils.lerp(angularVelocityY, outsideStep, 0.14 * frameScale);
      }

      if (pointerInside) {
        angularVelocityY += autoRotationY;
      }

      angularVelocityY = THREE.MathUtils.clamp(angularVelocityY, -maxAngularVelocity, maxAngularVelocity);

      prismGroup.rotateY(angularVelocityY);

      angularVelocityY *= damping;

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
      prismGeometry.dispose();
      projectedFaces.forEach((panel) => {
        panel.geometry.dispose();
        if (panel.material.map) {
          panel.material.map.dispose();
        }
        panel.material.dispose();
      });
      sideMaterial.dispose();
      capMaterial.dispose();
      (edges.material as THREE.Material).dispose();
      edges.geometry.dispose();
      host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="impactGlobeWrap">
      <div className="impactGlobe" ref={mountRef} aria-label="Globo 3D interactivo para servicios" />
    </div>
  );
}
