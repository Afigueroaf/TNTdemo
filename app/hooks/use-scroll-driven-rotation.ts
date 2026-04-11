/**
 * Hook para animar la rotacion de un elemento 3D basada en scroll.
 *
 * Calcula:
 * 1. El elemento raíz (sección) que contiene el componente 3D
 * 2. La posición del elemento dentro del viewport (0 = top, 1 = bottom)
 * 3. El progreso del scroll desde que entra hasta llegar al centro
 *
 * Retorna un valor normalizado [0, 1] que indica cuánto debe rotar el objeto.
 *
 * Uso:
 * - 0: posición inicial (sin rotación)
 * - 1: en el centro del viewport (rotación final = Math.PI / 2 en eje X para vista superior)
 */

import { useEffect, useRef, useState } from "react";

interface ScrollProgressResult {
  progress: number; // [0, 1] normalized scroll progress
  isVisible: boolean;
}

/**
 * Hook que calcula el progreso del scroll para animar rotaciones.
 *
 * @param elementRef - Ref al elemento contenedor (sección de Método)
 * @returns objeto con progreso [0, 1] e indicador de visibilidad
 */
export function useScrollDrivenRotation(
  elementRef: React.RefObject<HTMLElement | null>,
): ScrollProgressResult {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastProgressRef = useRef(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    /**
     * Calcula el progreso del scroll basado en la posición del elemento.
     *
     * Entrada: sección comienza a entrar en viewport
     * Progreso 0 → sección toca top del viewport
     * Progreso 1 → sección está centrada en viewport
     * Progreso >1 → sección pasa de viewport
     */
    const updateProgress = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Progreso: 0 cuando la sección entra, 1 cuando su centro toca el centro del viewport
      // Rango útil: desde que top toca viewport (-viewportHeight) hasta que está centrada (0)
      const rawProgress = (viewportHeight * 0.5 - rect.top) / viewportHeight;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));
      
      // Solo actualizar si el progreso cambió significativamente (evitar thrashing)
      if (Math.abs(clampedProgress - lastProgressRef.current) > 0.001) {
        setProgress(clampedProgress);
        lastProgressRef.current = clampedProgress;
      }
      
      setIsVisible(rect.top < viewportHeight && rect.bottom > 0);
    };

    // Escuchar scroll con RAF para mejor rendimiento
    const handleScroll = () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = window.requestAnimationFrame(updateProgress);
    };

    // Actualizar posición inicial
    updateProgress();

    // Usar evento nativo de scroll (Lenis usa window.scroll internamente)
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    window.addEventListener("wheel", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      window.removeEventListener("wheel", handleScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [elementRef]);

  return { progress, isVisible };
}
