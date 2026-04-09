/**
 * Hook para deferral secuencial de componentes 3D
 * 
 * Asegura que los componentes carguen en orden:
 * 1. ImpactGlobe (t=0ms)
 * 2. Services (t=2500ms)
 * 3. MethodBrain (t=5000ms)
 */

import { useEffect, useState } from "react";

type Component = "ImpactGlobe" | "Services" | "MethodBrain";

const LOAD_DELAYS: Record<Component, number> = {
  ImpactGlobe: 0,
  Services: 2500,
  MethodBrain: 5000,
};

export function useSequentialLoad(component: Component): boolean {
  const [canLoad, setCanLoad] = useState(LOAD_DELAYS[component] === 0);

  useEffect(() => {
    if (canLoad) return; // Already loaded

    const delay = LOAD_DELAYS[component];
    const timer = window.setTimeout(() => {
      console.log(`⏱️  Loading ${component} at t=${delay}ms`);
      setCanLoad(true);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [component, canLoad]);

  return canLoad;
}
