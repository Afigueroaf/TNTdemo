/**
 * Global Error Tracking - Captura errores síncronos y promesas rechazadas
 * Sin este, los errores en 3D fallan silenciosamente en producción
 */

export function initializeErrorTracking() {
  if (typeof window === "undefined") return;

  // Capturar errores síncronos no capturados
  window.addEventListener("error", (event) => {
    const message = event.message || String(event.error);
    const source = event.filename || "unknown";
    const line = event.lineno || 0;

    const errorDetail = {
      type: "sync_error",
      component: "unknown",
      message,
      source,
      line,
      timestamp: Date.now(),
    };

    console.error("[Global Sync Error]", errorDetail);

    // Dispatch custom event para que componentes se enteren
    window.dispatchEvent(
      new CustomEvent("tnt:error", { detail: errorDetail })
    );
  });

  // Capturar promesas rechazadas sin .catch()
  window.addEventListener("unhandledrejection", (event) => {
    const message = event.reason instanceof Error
      ? event.reason.message
      : String(event.reason);

    const errorDetail = {
      type: "unhandled_promise_rejection",
      component: "unknown",
      message,
      reason: event.reason,
      timestamp: Date.now(),
    };

    console.error("[Unhandled Promise Rejection]", errorDetail);

    // Dispatch custom event para que componentes se enteren
    window.dispatchEvent(
      new CustomEvent("tnt:error", { detail: errorDetail })
    );

    // Prevenir que el navegador lo maneje por defecto en algunos casos
    // (permite que la app siga funcionando)
  });
}
