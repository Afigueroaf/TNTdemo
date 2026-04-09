/**
 * Sequential 3D Component Loading Coordinator
 * 
 * Ensures components load in order:
 * 1. ImpactGlobe (t=0ms) - Logo pins, canvas dots
 * 2. Services (t=2500ms) - Prisma/geometric shapes
 * 3. MethodBrain (t=5000ms) - Brain model
 * 
 * This prevents main thread contention and provides better perceived performance
 */

type ComponentLoadHandler = () => void;

interface LoadingPhase {
  name: string;
  delayMs: number;
  handler: ComponentLoadHandler | null;
}

class SequentialComponentLoader {
  private phases: LoadingPhase[] = [
    { name: "ImpactGlobe", delayMs: 0, handler: null },
    { name: "Services", delayMs: 2500, handler: null },
    { name: "MethodBrain", delayMs: 5000, handler: null },
  ];

  private loadStartTime = 0;
  private completedPhases = new Set<string>();

  constructor() {
    this.loadStartTime = performance.now();
    this.initializePhases();
  }

  private initializePhases() {
    this.phases.forEach((phase) => {
      window.setTimeout(() => {
        if (phase.handler && !this.completedPhases.has(phase.name)) {
          const elapsed = Math.round(performance.now() - this.loadStartTime);
          console.log(
            `⏱️  [${elapsed}ms] Loading phase: ${phase.name}`,
          );
          phase.handler();
          this.completedPhases.add(phase.name);
        }
      }, phase.delayMs);
    });
  }

  registerPhase(name: string, handler: ComponentLoadHandler): void {
    const phase = this.phases.find((p) => p.name === name);
    if (phase) {
      phase.handler = handler;
      console.log(
        `✅ Registered loader for ${name} (scheduled at t=${phase.delayMs}ms)`,
      );
    } else {
      console.warn(`⚠️  Unknown phase: ${name}`);
    }
  }

  getPhaseDelay(name: string): number {
    const phase = this.phases.find((p) => p.name === name);
    return phase?.delayMs ?? 0;
  }

  isPhaseActive(name: string): boolean {
    const elapsed = performance.now() - this.loadStartTime;
    const phase = this.phases.find((p) => p.name === name);
    return phase ? elapsed >= phase.delayMs : false;
  }
}

// Global singleton instance
let loaderInstance: SequentialComponentLoader | null = null;

export function getSequentialLoader(): SequentialComponentLoader {
  if (!loaderInstance) {
    loaderInstance = new SequentialComponentLoader();
  }
  return loaderInstance;
}

export function registerComponentLoader(
  name: "ImpactGlobe" | "Services" | "MethodBrain",
  handler: ComponentLoadHandler,
): void {
  getSequentialLoader().registerPhase(name, handler);
}
