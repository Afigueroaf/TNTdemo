"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

varying vec2 vUv;

uniform float uTime;
uniform float uIntensity;
uniform float uHover;
uniform vec2 uResolution;

// ─── Noise primitives ─────────────────────────────────────────────────────────

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// Fractal Brownian Motion — 3 octaves for performance
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p *= 2.1;
    a *= 0.5;
  }
  return v;
}

// ─── Abstract content field ────────────────────────────────────────────────────
// Generates a procedural luminance pattern whose edges become visible
// as red / blue fringes when the RGB channels are sampled at offset UVs.

float field(vec2 uv, float t) {
  float n = fbm(uv * 2.5 + vec2(t * 0.12, -t * 0.09));

  // Concentric rings perturbed by noise
  float r = length(uv - 0.5);
  float rings = 0.5 + 0.5 * sin(r * 14.0 - t * 2.2 + n * 3.8);

  // Cross-hatch grid — creates sharp transitions that amplify the anaglyph split
  float grid = (0.5 + 0.5 * sin(uv.x * 16.0 + n * 2.0 + t * 0.7))
             * (0.5 + 0.5 * cos(uv.y * 16.0 - n * 1.8 - t * 0.5));

  return mix(mix(n, rings, 0.45), grid, 0.28);
}

// ─── Main ──────────────────────────────────────────────────────────────────────

void main() {
  vec2 uv = vUv;
  vec2 centered = uv - 0.5;
  float dist = length(centered) * 2.0;       // 0 at center, 1 at full radius

  // ── Circular mask with soft edges ──────────────────────────────────────────
  float circleMask = 1.0 - smoothstep(0.84, 1.0, dist);
  if (circleMask < 0.002) discard;           // early discard for performance

  // ── Center weight (1 at center → 0 at edge) ────────────────────────────────
  float centerW = 1.0 - smoothstep(0.0, 1.0, dist);
  float cBoost  = pow(centerW, 0.6);         // moderate falloff curve

  float t         = uTime;
  float intensity = uIntensity + uHover * 0.6;

  // ── Glitch timing signal ───────────────────────────────────────────────────
  float gPhase    = noise(vec2(floor(t * 7.0), 23.5));
  float gActive   = step(0.78, gPhase);
  float gStrength = noise(vec2(t * 14.0, 8.3)) * gActive;

  // ── Wave displacement (sinusoidal ripple, center-amplified) ────────────────
  float wX = sin(uv.y * 20.0 + t * 4.8) * 0.006;
  float wY = cos(uv.x * 16.0 + t * 3.6) * 0.004;

  // ── Noise displacement ─────────────────────────────────────────────────────
  float nX = (fbm(uv * 3.5 + vec2(t * 0.65, 0.0)) - 0.5) * 0.024;
  float nY = (fbm(uv * 3.5 + vec2(0.0, t * 0.55)) - 0.5) * 0.018;

  // ── Glitch horizontal jump (random, frame-quantised) ──────────────────────
  float gJump = (hash(vec2(floor(t * 22.0), 7.2)) - 0.5) * 0.05 * gStrength;

  // ── Combined displacement — stronger at center, fades toward edge ──────────
  vec2 disp = vec2(wX + nX + gJump, wY + nY) * cBoost * intensity;

  // ── Anaglyph RGB split ─────────────────────────────────────────────────────
  // Mostly horizontal (classic anaglyph), with a slow drift and noise jitter.
  float splitAmount = (0.024 + 0.038 * intensity + 0.044 * uHover) * cBoost;
  float splitAngle  = 0.12 * sin(t * 0.3) + noise(vec2(t * 0.8, 5.0)) * 0.15;
  vec2  splitVec    = vec2(cos(splitAngle), sin(splitAngle) * 0.25) * splitAmount;

  // Per-channel UV offsets
  vec2 uvR = uv + disp + splitVec;    // Red: shifted +
  vec2 uvG = uv + disp * 0.65;        // Green: minimal shift (nearly stationary)
  vec2 uvB = uv + disp - splitVec;    // Blue: shifted −

  // ── Sample content at each channel UV ─────────────────────────────────────
  float fR = field(uvR, t);
  float fG = field(uvG, t);
  float fB = field(uvB, t);

  // ── Compose anaglyph colour ────────────────────────────────────────────────
  // R and B are pushed up; G is suppressed to enforce the red-blue split.
  vec3 col;
  col.r = fR * 1.55;
  col.g = fG * 0.06 + fR * 0.03 + fB * 0.03;
  col.b = fB * 1.55;

  // Subtract shared luminance to sharpen chromatic separation
  float minLuma = min(fR, fB) * 0.22;
  col = max(col - minLuma, 0.0);

  // Soft centre glow (purple — red + blue blend)
  col += vec3(0.16, 0.02, 0.16) * cBoost * cBoost * intensity;

  // Glitch flashes — occasional R/B brightness spikes
  col.r += gStrength * 0.14 * intensity;
  col.b += gStrength * 0.11 * intensity;

  // ── Alpha: smooth radial gradient → opacity fades toward border ────────────
  float edgeFade = smoothstep(1.0, 0.10, dist);
  float alpha    = circleMask * edgeFade * (0.42 + cBoost * 0.38);

  gl_FragColor = vec4(col, alpha);
}
`;

export function PointerFollower() {
  const followerRef = useRef<HTMLDivElement | null>(null);
  const webglRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const follower = followerRef.current;
    const webglMount = webglRef.current;
    if (!follower || !webglMount) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFinePointer = window.matchMedia("(any-pointer: fine)").matches;

    if (!hasFinePointer) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    webglMount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      uTime: { value: 0 },
      uIntensity: { value: 0.42 },
      uHover: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(plane);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const width = Math.max(1, Math.round(entry.contentRect.width));
      const height = Math.max(1, Math.round(entry.contentRect.height));
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width, height);
    });
    resizeObserver.observe(follower);

    let raf = 0;
    let currentX = window.innerWidth * 0.5;
    let currentY = window.innerHeight * 0.5;
    let targetX = currentX;
    let targetY = currentY;
    let hoverTarget = 0;
    let hoverCurrent = 0;
    const clock = new THREE.Clock();

    const ease = prefersReducedMotion ? 1 : 0.2;

    follower.classList.add("is-active");
    follower.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate3d(-50%, -50%, 0)`;

    const updatePosition = () => {
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      hoverCurrent += (hoverTarget - hoverCurrent) * (prefersReducedMotion ? 0.25 : 0.12);
      follower.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate3d(-50%, -50%, 0)`;
      follower.classList.toggle("is-hover", hoverCurrent > 0.45);

      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uHover.value = hoverCurrent;
      renderer.render(scene, camera);

      raf = window.requestAnimationFrame(updatePosition);
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      follower.classList.add("is-active");

      const target = event.target as Element | null;
      hoverTarget = target?.closest(
        "a, button, input, textarea, select, [role='button'], [data-reveal]",
      )
        ? 1
        : 0;
    };

    const onPointerDown = () => {
      follower.classList.add("is-pressed");
    };

    const onPointerUp = () => {
      follower.classList.remove("is-pressed");
    };

    const onWindowLeave = () => {
      follower.classList.remove("is-active");
      hoverTarget = 0;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("blur", onWindowLeave);

    raf = window.requestAnimationFrame(updatePosition);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("blur", onWindowLeave);

      resizeObserver.disconnect();
      plane.geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === webglMount) {
        webglMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="pointerFollower" ref={followerRef} aria-hidden>
      <div className="pointerFollowerBackdrop" />
      <div className="pointerFollowerWebgl" ref={webglRef} />
    </div>
  );
}
