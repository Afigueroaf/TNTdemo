"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { impactCountries, impactStats } from "../data/tnt-content";
import { ExperienceMotion } from "./experience-motion";
import { SmoothScroll } from "./smooth-scroll";
import { IntroBillboard } from "./intro-billboard";

const ImpactGlobe = dynamic(
  () => import("./impact-globe").then((module) => module.ImpactGlobe),
  { ssr: false },
);
const Services = dynamic(
  () => import("./services").then((module) => module.Services),
  { ssr: false },
);
const MethodBrain = dynamic(
  () => import("./method-brain").then((module) => module.MethodBrain),
  { ssr: false },
);

function DeferredMount({
  children,
  placeholderClassName,
  rootMargin = "360px 0px",
}: {
  children: ReactNode;
  placeholderClassName: string;
  rootMargin?: string;
}) {
  const [shouldRender, setShouldRender] = useState(false);
  const placeholderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldRender) return;
    const node = placeholderRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        setShouldRender(true);
        observer.disconnect();
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  if (shouldRender) {
    return <>{children}</>;
  }

  return <div ref={placeholderRef} className={placeholderClassName} aria-hidden />;
}

export function HomeClientShell() {
  const [focusedCountryKey, setFocusedCountryKey] = useState<string | null>(null);
  const [focusUntilMs, setFocusUntilMs] = useState<number | null>(null);
  const officesStat = impactStats.find((item) => item.label === "7 Oficinas");
  const trajectoryStat = impactStats.find((item) => item.label === "Trayectoria");
  const teamStat = impactStats.find((item) => item.label === "Equipo");

  // Tracks whether the current focus was triggered by hover (vs. click)
  const focusSourceRef = useRef<"hover" | "click" | null>(null);

  function focusCountryOnGlobe(countryKey: string) {
    focusSourceRef.current = "click";
    setFocusedCountryKey(countryKey);
    setFocusUntilMs(Date.now() + 24_000);
  }

  function hoverFocusCountry(countryKey: string) {
    focusSourceRef.current = "hover";
    setFocusedCountryKey(countryKey);
    // Large value keeps the globe centered as long as the cursor stays on the flag
    setFocusUntilMs(Date.now() + 600_000);
  }

  function hoverBlurCountry() {
    // Only cancel if the focus was triggered by hover, not by a click
    if (focusSourceRef.current === "hover") {
      focusSourceRef.current = null;
      setFocusedCountryKey(null);
      setFocusUntilMs(null);
    }
  }

  return (
    <>
      <SmoothScroll />
      <ExperienceMotion />

      <div className="introImpactStage">
        <ImpactGlobe
          focusCountryKey={focusedCountryKey}
          focusUntilMs={focusUntilMs}
          asBackdrop
        />
        <IntroBillboard />

        <section className="section impactSection" data-reveal>
          <p className="eyebrow">Impacto</p>
          <div className="impactTitleSplit">
            <h2>Somos un equipo global</h2>
            <p className="impactInlineLead">
              de creativos y estrategas que entiende el poder transformador de una #PowerfulIdea
            </p>
          </div>
          <div className="impactGlobeSpacer" aria-hidden />
          <div className="impactStatsBoard">
            <article className="statCard statCardNarrative">
              <p className="impactCardKicker">Paises</p>
              <h3 className="impactCardHeadline">impactados</h3>
              <p className="impactCardFact">{trajectoryStat?.value}</p>
              <p className="impactCardFact">{teamStat?.value}</p>
            </article>

            <article className="statCard statCardOffices">
              <h3 className="impactOfficeCount">{officesStat?.label}</h3>
              <div className="impactFlagsInline" aria-label="7 Oficinas: Colombia, Mexico, Estados Unidos, Panama, Peru, Espana y China">
                {impactCountries.map((flag) => (
                  <button
                    key={flag.key}
                    type="button"
                    className="impactFlagButton"
                    onClick={() => focusCountryOnGlobe(flag.key)}
                    onMouseEnter={() => hoverFocusCountry(flag.key)}
                    onMouseLeave={() => hoverBlurCountry()}
                    aria-label={`Centrar globo en ${flag.country} durante 24 segundos`}
                  >
                    <Image
                      src={flag.flagSrc}
                      alt={`Bandera de ${flag.country}`}
                      width={30}
                      height={20}
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </article>
          </div>
        </section>
      </div>

      <section className="section servicesSection" data-reveal>
        <p className="eyebrow">Servicios</p>
        <h2><span>Nuestros Servicios</span></h2>
        <DeferredMount placeholderClassName="scenePlaceholder scenePlaceholderServices">
          <Services />
        </DeferredMount>
      </section>

      <section className="section methodSection" data-reveal>
        <DeferredMount placeholderClassName="scenePlaceholderMethodBackdrop">
          <MethodBrain asBackdrop />
        </DeferredMount>
        <p className="eyebrow">Metodo</p>
        <h2>¿Cómo pensamos?</h2>
        <div className="methodBrainSpacer" aria-hidden />
      </section>
    </>
  );
}
