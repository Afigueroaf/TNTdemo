"use client";

import { useEffect } from "react";

export function ExperienceMotion() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    if (prefersReducedMotion) {
      root.classList.add("reduced-motion");
      return;
    }

    const revealNodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );

    revealNodes.forEach((node) => observer.observe(node));

    const onPointerMove = (event: PointerEvent) => {
      const px = (event.clientX / window.innerWidth - 0.5) * 2;
      const py = (event.clientY / window.innerHeight - 0.5) * 2;
      root.style.setProperty("--pointer-x", px.toFixed(3));
      root.style.setProperty("--pointer-y", py.toFixed(3));
    };

    const onScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight || 1;
      const progress = Math.min(scrollY / (vh * 2.2), 1);
      root.style.setProperty("--scroll-progress", progress.toFixed(3));
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
