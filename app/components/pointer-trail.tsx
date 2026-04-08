"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const TRAIL_LIFETIME_SECONDS = 4;
const MAX_POINTS = 900;
const TRAIL_SIZE_SCALE = 0.6;
const TRAIL_ALPHA_MAX = 0.7;

function getFollowerDiameterPx(viewportWidth: number) {
  return Math.max(330, Math.min(viewportWidth * 0.3225, 510));
}

const vertexShader = `
precision highp float;

attribute float aBirth;
attribute float aSize;
attribute float aSeed;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uScroll;

varying float vLife;
varying float vSeed;

void main() {
  float age = uTime - aBirth;
  float life = clamp(1.0 - age / ${TRAIL_LIFETIME_SECONDS.toFixed(1)}, 0.0, 1.0);
  vLife = life;
  vSeed = aSeed;

  if (life <= 0.0) {
    gl_Position = vec4(-2.0, -2.0, 0.0, 1.0);
    gl_PointSize = 0.0;
    return;
  }

  vec2 ndc = vec2(
    ((position.x - uScroll.x) / uResolution.x) * 2.0 - 1.0,
    1.0 - ((position.y - uScroll.y) / uResolution.y) * 2.0
  );

  gl_Position = vec4(ndc, 0.0, 1.0);
  gl_PointSize = aSize * (0.7 + life * 0.9);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;

varying float vLife;
varying float vSeed;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  if (vLife <= 0.0) discard;

  vec2 p = gl_PointCoord - 0.5;

  float split = 0.12 + 0.03 * sin(uTime * 2.6 + vSeed * 6.2831);
  float dR = length(p + vec2(split, 0.0));
  float dB = length(p - vec2(split, 0.0));
  float dC = length(p);

  float red = smoothstep(0.5, 0.0, dR);
  float blue = smoothstep(0.5, 0.0, dB);
  float core = smoothstep(0.46, 0.0, dC);

  float scan = 0.93 + 0.07 * sin((gl_FragCoord.y + vSeed * 37.0) * 1.2 + uTime * 36.0);
  float grain = hash(gl_FragCoord.xy * 0.05 + vec2(uTime * 21.0, vSeed * 91.0));
  float flicker = 0.95 + 0.1 * (grain - 0.5);

  vec3 color = vec3(red * 1.5 + core * 0.08, core * 0.05, blue * 1.5 + core * 0.08);
  color *= scan * flicker;

  float edge = smoothstep(0.52, 0.0, dC);
  float alpha = edge * vLife * ${TRAIL_ALPHA_MAX.toFixed(2)};

  gl_FragColor = vec4(color, alpha);
}
`;

export function PointerTrail() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const hasFinePointer = window.matchMedia("(any-pointer: fine)").matches;
    if (!hasFinePointer) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    const gl = renderer.getContext();
    const pointSizeRange = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE) as [number, number];
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.4));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const positions = new Float32Array(MAX_POINTS * 3);
    const births = new Float32Array(MAX_POINTS);
    const sizes = new Float32Array(MAX_POINTS);
    const seeds = new Float32Array(MAX_POINTS);

    for (let i = 0; i < MAX_POINTS; i += 1) {
      births[i] = -9999;
      sizes[i] = 20;
      seeds[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aBirth", new THREE.BufferAttribute(births, 1));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uScroll: { value: new THREE.Vector2(window.scrollX, window.scrollY) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const clock = new THREE.Clock();
    let writeIndex = 0;
    let raf = 0;
    let lastStampMs = 0;
    let lastDocX = window.scrollX + window.innerWidth * 0.5;
    let lastDocY = window.scrollY + window.innerHeight * 0.5;
    let trailBaseSize = Math.min(getFollowerDiameterPx(window.innerWidth) * TRAIL_SIZE_SCALE, pointSizeRange[1]);

    const positionAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const birthAttr = geometry.getAttribute("aBirth") as THREE.BufferAttribute;
    const sizeAttr = geometry.getAttribute("aSize") as THREE.BufferAttribute;

    const spawnTrailPoint = (x: number, y: number, nowSec: number) => {
      const i = writeIndex;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = 0;
      births[i] = nowSec;
      sizes[i] = trailBaseSize * (0.96 + Math.random() * 0.08);

      writeIndex = (writeIndex + 1) % MAX_POINTS;
    };

    const onPointerMove = (event: PointerEvent) => {
      const nowMs = performance.now();
      const nowSec = clock.getElapsedTime();
      const x = event.clientX + window.scrollX;
      const y = event.clientY + window.scrollY;

      const dx = x - lastDocX;
      const dy = y - lastDocY;
      const distance = Math.hypot(dx, dy);
      const shouldStamp = nowMs - lastStampMs > 72 || distance > trailBaseSize * 0.18;
      if (!shouldStamp) return;

      // Interpolate points on fast moves to keep a continuous 15s trail.
      const steps = Math.min(6, Math.max(1, Math.floor(distance / Math.max(26, trailBaseSize * 0.16))));
      for (let s = 1; s <= steps; s += 1) {
        const t = s / steps;
        const px = lastDocX + dx * t;
        const py = lastDocY + dy * t;
        spawnTrailPoint(px, py, nowSec);
      }

      positionAttr.needsUpdate = true;
      birthAttr.needsUpdate = true;
      sizeAttr.needsUpdate = true;

      lastStampMs = nowMs;
      lastDocX = x;
      lastDocY = y;
    };

    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width, height);
      trailBaseSize = Math.min(getFollowerDiameterPx(width) * TRAIL_SIZE_SCALE, pointSizeRange[1]);
    };

    const render = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uScroll.value.set(window.scrollX, window.scrollY);
      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    raf = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);

      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="pointerTrail" ref={mountRef} aria-hidden />;
}
