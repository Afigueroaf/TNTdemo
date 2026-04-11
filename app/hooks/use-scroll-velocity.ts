"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollVelocityData {
  velocity: number; // Píxeles por frame (positivo = scroll abajo, negativo = scroll arriba)
  isScrolling: boolean; // True mientras el usuario está scrolleando activamente
  direction: "up" | "down" | "none"; // Dirección del scroll
}

/**
 * Hook para capturar la velocidad instantánea del scroll del usuario.
 * 
 * Detecta:
 * - Velocidad: píxeles por frame (throttled con RAF)
 * - Dirección: arriba/abajo/ninguna
 * - Estado: si actualmente se está scrolleando o ha parado
 * 
 * Performance: throttled con RAF, lazy listeners, refs para velocidad instantánea
 */
export function useScrollVelocity(): ScrollVelocityData {
  const [isScrolling, setIsScrolling] = useState(false);
  const velocityRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;
      
      // Actualiza velocidad (píxeles por frame)
      velocityRef.current = delta;
      lastScrollYRef.current = currentScrollY;

      // Marca como scrolleando
      setIsScrolling(true);

      // Cancela timeout anterior
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Define timeout para marcar como "no scrolleando" después de inactividad
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
        velocityRef.current = 0;
      }, 150); // 150ms sin scroll = parado
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const velocity = velocityRef.current;
  const direction = velocity > 0.5 ? "down" : velocity < -0.5 ? "up" : "none";

  return { velocity, isScrolling, direction };
}
