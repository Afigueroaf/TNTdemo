"use client";

import React, { type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[ErrorBoundary]", error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "400px",
              padding: "2rem",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "8px",
              color: "rgba(255, 255, 255, 0.8)",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            <div>
              <p style={{ marginBottom: "0.5rem" }}>
                Ocurrió un error cargando este componente
              </p>
              {process.env.NODE_ENV !== "production" && this.state.error && (
                <p style={{ fontSize: "12px", opacity: 0.6 }}>
                  {this.state.error.message}
                </p>
              )}
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
