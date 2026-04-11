"use client";

import { useEffect, useState } from "react";

interface ScrollAnimationProgress {
  progress: number; // 0 a 1: donde 0 es inicio, 1 es fin
  isActive: boolean; // true si el usuario está en rango de animación
}

/**
 * Hook para detectar progress de scroll respecto a un elemento de referencia.
 * 
 * Usa IntersectionObserver + scroll listener para calcular:
 * - Cuándo comienza la animación (elemento enter)
 * - Cuánto ha avanzado (0-1) basado en posición del elemento vs encabezado
 * 
 * Performance: throttled con requestAnimationFrame, lazy listeners
 */
export function useScrollAnimationProgress(
  elementRef: React.RefObject<HTMLElement | null>,
  options?: {
    /** Header height offset para calcular intersección (default 80px) */
    headerOffset?: number;
    /** Margen para iniciar animación antes de que toque el header (default 200px) */
    triggerMargin?: number;
  },
): ScrollAnimationProgress {
  const headerOffset = options?.headerOffset ?? 80;
  const triggerMargin = options?.triggerMargin ?? 200;
  
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let animationFrameId = 0;

    // Calcula el progreso basado en la posición actual del elemento
    const updateProgress = () => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      // Posición del elemento relativa al viewport
      const elementTopInViewport = rect.top;
      
      // Punto donde la animación comienza (cuando el elemento está a triggerMargin del header)
      const triggerPoint = headerOffset + triggerMargin;
      
      // Punto donde la animación termina (cuando "¿Cómo pensamos?" toca el header)
      const endPoint = headerOffset;
      
      // Rango total de píxeles para la animación
      const range = triggerPoint - endPoint;
      
      // Calcula progreso de 0 a 1
      let currentProgress = 0;
      let active = false;

      if (elementTopInViewport <= triggerPoint && elementTopInViewport >= endPoint) {
        // Dentro del rango: calcula progreso
        active = true;
        currentProgress = 1 - (elementTopInViewport - endPoint) / range;
        currentProgress = Math.max(0, Math.min(1, currentProgress));
      } else if (elementTopInViewport < endPoint) {
        // Pasó completamente: animación terminada
        active = false;
        currentProgress = 1;
      } else {
        // No ha llegado aún
        active = false;
        currentProgress = 0;
      }

      setProgress(currentProgress);
      setIsActive(active);
    };

    // Throttle con RAF para no bloquear el main thread
    const handleScroll = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(updateProgress);
    };

    // Cálculo inicial
    updateProgress();

    // Listener de scroll
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [elementRef, headerOffset, triggerMargin]);

  return { progress, isActive };
}
