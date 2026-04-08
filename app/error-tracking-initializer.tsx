"use client";

import { useEffect } from "react";
import { initializeErrorTracking } from "./error-tracking";

export function ErrorTrackingInitializer() {
  useEffect(() => {
    initializeErrorTracking();
  }, []);

  return null;
}
