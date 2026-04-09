/**
 * Sequential loading coordinator for 3D components.
 *
 * Strategy: event-driven adaptive delays.
 *
 * Instead of fixed wall-clock timers (0 / 2500 / 5000ms), each component
 * fires a "ready" event when its THREE.js scene is fully initialised, and
 * the next component waits for that event PLUS a minimum breathing gap.
 * This prevents a slow device from stacking two heavy initialisations on
 * top of each other if the first one takes longer than the hard-coded delay.
 *
 * Load order:
 *   ImpactGlobe  → fires "tnt:globe-ready"
 *   Services     → waits for "tnt:globe-ready" + MIN_GAP_MS, then fires "tnt:services-ready"
 *   MethodBrain  → waits for "tnt:services-ready" + MIN_GAP_MS
 *
 * Fallback: if a predecessor never fires (e.g. hidden behind a DeferredMount
 * that hasn't triggered yet), a MAX_WAIT_MS ceiling guarantees the component
 * eventually loads anyway.
 */

import { useCallback, useEffect, useState } from "react";

type Component = "ImpactGlobe" | "Services" | "MethodBrain";

/** Minimum idle gap between one component finishing init and the next starting. */
const MIN_GAP_MS = 600;

/**
 * Maximum time to wait for a predecessor's "ready" event before loading anyway.
 * Prevents indefinite stalls when a component is off-screen / never mounts.
 */
const MAX_WAIT_MS: Record<Component, number> = {
  ImpactGlobe: 0,    // no predecessor
  Services:    4000, // fallback: load at most 4s after mount
  MethodBrain: 7000, // fallback: load at most 7s after mount
};

/** Events emitted when a component's THREE.js scene is ready to render. */
const READY_EVENT: Record<Component, string | null> = {
  ImpactGlobe: null,               // no predecessor to wait for
  Services:    "tnt:globe-ready",
  MethodBrain: "tnt:services-ready",
};

/** Event this component fires when its scene is ready. */
const EMITS_EVENT: Record<Component, string | null> = {
  ImpactGlobe: "tnt:globe-ready",
  Services:    "tnt:services-ready",
  MethodBrain: null,
};

export function useSequentialLoad(component: Component): {
  canLoad: boolean;
  signalReady: () => void;
} {
  const [canLoad, setCanLoad] = useState(component === "ImpactGlobe");

  useEffect(() => {
    if (component === "ImpactGlobe") return; // loads immediately, no waiting needed

    const predecessorEvent = READY_EVENT[component];
    const maxWait = MAX_WAIT_MS[component];

    let gapTimer: ReturnType<typeof setTimeout> | null = null;

    const start = () => {
      // Wait for the breathing gap, then allow this component to initialise.
      gapTimer = setTimeout(() => {
        console.log(`⏱️  Loading ${component} (adaptive)`);
        setCanLoad(true);
      }, MIN_GAP_MS);
    };

    // Fallback ceiling: load even if the predecessor never fires.
    const fallbackTimer = setTimeout(() => {
      if (gapTimer) clearTimeout(gapTimer);
      console.log(`⏱️  Loading ${component} (fallback ceiling)`);
      setCanLoad(true);
    }, maxWait);

    const onPredecessorReady = () => {
      clearTimeout(fallbackTimer);
      start();
    };

    if (predecessorEvent) {
      window.addEventListener(predecessorEvent, onPredecessorReady, { once: true });
    }

    return () => {
      if (predecessorEvent) {
        window.removeEventListener(predecessorEvent, onPredecessorReady);
      }
      clearTimeout(fallbackTimer);
      if (gapTimer) clearTimeout(gapTimer);
    };
  }, [component]);

  /** Call this once the THREE.js scene has rendered its first frame. */
  const signalReady = useCallback(() => {
    const event = EMITS_EVENT[component];
    if (event) {
      window.dispatchEvent(new CustomEvent(event));
    }
  }, [component]);

  return { canLoad, signalReady };
}
