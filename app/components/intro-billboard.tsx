"use client";

import { useEffect, useRef, useState } from "react";

const INTRO_LINE_ONE = "AGENCY";
const INTRO_LINE_TWO = "WORLDWIDE";
const GLITCH_EFFECTS = ["glyphWarpA", "glyphWarpB", "glyphWarpC"] as const;

export function IntroBillboard() {
  const [glitchMap, setGlitchMap] = useState<Record<string, string>>({});
  const [introSlideX, setIntroSlideX] = useState<number>(0);
  const [motionScale, setMotionScale] = useState<number>(1);
  const glitchIntervalRef = useRef<number | null>(null);
  const lastPointerBurstAtRef = useRef<number>(0);

  function clearGlitchLoop() {
    if (glitchIntervalRef.current !== null) {
      window.clearInterval(glitchIntervalRef.current);
      glitchIntervalRef.current = null;
    }
    setGlitchMap({});
  }

  function triggerGlitchBurst() {
    const allGlyphIds = [
      ...Array.from({ length: INTRO_LINE_ONE.length }, (_, i) => `l1-${i}`),
      ...Array.from({ length: INTRO_LINE_TWO.length }, (_, i) => `l2-${i}`),
    ];
    const maxBursts = motionScale < 1 ? 2 : 3;
    const burstCount = Math.max(1, Math.floor(Math.random() * maxBursts));

    for (let i = 0; i < burstCount; i += 1) {
      const glyphId = allGlyphIds[Math.floor(Math.random() * allGlyphIds.length)];
      const effectClass = GLITCH_EFFECTS[Math.floor(Math.random() * GLITCH_EFFECTS.length)];

      setGlitchMap((prev) => {
        const next = { ...prev };
        delete next[glyphId];
        return next;
      });

      window.requestAnimationFrame(() => {
        setGlitchMap((prev) => ({ ...prev, [glyphId]: effectClass }));
      });

      window.setTimeout(() => {
        setGlitchMap((prev) => {
          if (!prev[glyphId]) return prev;
          const next = { ...prev };
          delete next[glyphId];
          return next;
        });
      }, 110 + Math.floor(Math.random() * 130));
    }
  }

  function startGlitchLoop() {
    clearGlitchLoop();
    triggerGlitchBurst();
    const baseInterval = motionScale < 1 ? 190 : 120;
    const jitter = motionScale < 1 ? 80 : 110;
    glitchIntervalRef.current = window.setInterval(triggerGlitchBurst, baseInterval + Math.floor(Math.random() * jitter));
  }

  function handleTitlePointerMove() {
    const now = performance.now();
    if (now - lastPointerBurstAtRef.current < 70) return;

    lastPointerBurstAtRef.current = now;
    triggerGlitchBurst();
  }

  useEffect(() => {
    return () => clearGlitchLoop();
  }, []);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const computeMotionScale = () => setMotionScale(reducedMotionQuery.matches ? 0.45 : 1);
    computeMotionScale();

    let raf = 0;

    const handleScroll = () => {
      if (raf !== 0) return;

      raf = window.requestAnimationFrame(() => {
        const scale = reducedMotionQuery.matches ? 0.45 : 1;
        const maxShift = window.innerWidth * 1.2 * scale;
        const travelScroll = window.innerHeight * (1.35 / Math.max(scale, 0.2));
        const progress = Math.min(window.scrollY / travelScroll, 1);
        const shift = progress * maxShift;
        setIntroSlideX(shift);
        raf = 0;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    if (typeof reducedMotionQuery.addEventListener === "function") {
      reducedMotionQuery.addEventListener("change", computeMotionScale);
    } else if (typeof reducedMotionQuery.addListener === "function") {
      reducedMotionQuery.addListener(computeMotionScale);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (typeof reducedMotionQuery.removeEventListener === "function") {
        reducedMotionQuery.removeEventListener("change", computeMotionScale);
      } else if (typeof reducedMotionQuery.removeListener === "function") {
        reducedMotionQuery.removeListener(computeMotionScale);
      }
      if (raf !== 0) {
        window.cancelAnimationFrame(raf);
      }
    };
  }, []);

  return (
    <section
      className="introBillboard"
      aria-label="Agency Worldwide"
      onPointerEnter={startGlitchLoop}
      onPointerLeave={clearGlitchLoop}
      onPointerMove={handleTitlePointerMove}
    >
      <div className="introBillboardInner">
        <p className="introKicker">Global Creative Network</p>
        <h1
          className="introTitle"
          style={{ transform: `translate3d(-${introSlideX}px, 0, 0)` }}
        >
          <span className="introWord introWordRed" aria-label="Agency">
            {Array.from(INTRO_LINE_ONE).map((char, index) => {
              const glyphId = `l1-${index}`;
              const glitchClass = glitchMap[glyphId] ?? "";

              return (
                <span key={glyphId} className={`introGlyph ${glitchClass}`}>
                  {char}
                </span>
              );
            })}
          </span>
          <span className="introWord introWordWhite" aria-label="Worldwide">
            {Array.from(INTRO_LINE_TWO).map((char, index) => {
              const glyphId = `l2-${index}`;
              const glitchClass = glitchMap[glyphId] ?? "";

              return (
                <span key={glyphId} className={`introGlyph ${glitchClass}`}>
                  {char}
                </span>
              );
            })}
          </span>
        </h1>
      </div>
    </section>
  );
}
