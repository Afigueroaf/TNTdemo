"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.045,
      duration: 1.35,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
      wheelMultiplier: 0.68,
    });

    let rafId = 0;

    const animate = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(animate);
    };

    rafId = window.requestAnimationFrame(animate);

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
      lenis.destroy();
    };
  }, []);

  return null;
}
