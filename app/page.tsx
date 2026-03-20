"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  cta,
  featuredCases,
  impactStats,
  legalLinks,
  offices,
  socialLinks,
} from "./data/tnt-content";
import { ExperienceMotion } from "./components/experience-motion";
import { ImpactGlobe } from "./components/impact-globe";
import { Services } from "./components/services";

const IMPACT_FLAG_IMAGES = [
  { key: "colombia", country: "Colombia", src: "https://flagcdn.com/w160/co.png" },
  { key: "mexico", country: "Mexico", src: "https://flagcdn.com/w160/mx.png" },
  { key: "usa", country: "Estados Unidos", src: "https://flagcdn.com/w160/us.png" },
  { key: "panama", country: "Panama", src: "https://flagcdn.com/w160/pa.png" },
  { key: "peru", country: "Peru", src: "https://flagcdn.com/w160/pe.png" },
  { key: "espana", country: "Espana", src: "https://flagcdn.com/w160/es.png" },
  { key: "china", country: "China", src: "https://flagcdn.com/w160/cn.png" },
] as const;

const INTRO_LINE_ONE = "AGENCY";
const INTRO_LINE_TWO = "WORLDWIDE";
const GLITCH_EFFECTS = ["glyphWarpA", "glyphWarpB", "glyphWarpC"] as const;

export default function HomePage() {
  const [focusedCountryKey, setFocusedCountryKey] = useState<string | null>(null);
  const [focusUntilMs, setFocusUntilMs] = useState<number | null>(null);
  const [glitchMap, setGlitchMap] = useState<Record<string, string>>({});
  const glitchIntervalRef = useRef<number | null>(null);
  const lastPointerBurstAtRef = useRef<number>(0);

  function focusCountryOnGlobe(countryKey: string) {
    setFocusedCountryKey(countryKey);
    setFocusUntilMs(Date.now() + 24_000);
  }

  function clearGlitchLoop() {
    if (glitchIntervalRef.current !== null) {
      window.clearInterval(glitchIntervalRef.current);
      glitchIntervalRef.current = null;
    }
    setGlitchMap({});
  }

  function triggerGlitchBurst() {
    const allGlyphIds = [
      ...Array.from({ length: INTRO_LINE_ONE.length }, (_, i) => `l1-${i}`),
      ...Array.from({ length: INTRO_LINE_TWO.length }, (_, i) => `l2-${i}`),
    ];
    const burstCount = Math.max(1, Math.floor(Math.random() * 3));

    for (let i = 0; i < burstCount; i += 1) {
      const glyphId = allGlyphIds[Math.floor(Math.random() * allGlyphIds.length)];
      const effectClass = GLITCH_EFFECTS[Math.floor(Math.random() * GLITCH_EFFECTS.length)];

      // Remove and re-apply in next frame to force animation restart on same glyph.
      setGlitchMap((prev) => {
        const next = { ...prev };
        delete next[glyphId];
        return next;
      });

      window.requestAnimationFrame(() => {
        setGlitchMap((prev) => ({ ...prev, [glyphId]: effectClass }));
      });

      window.setTimeout(() => {
        setGlitchMap((prev) => {
          if (!prev[glyphId]) return prev;
          const next = { ...prev };
          delete next[glyphId];
          return next;
        });
      }, 110 + Math.floor(Math.random() * 130));
    }
  }

  function startGlitchLoop() {
    clearGlitchLoop();
    triggerGlitchBurst();
    glitchIntervalRef.current = window.setInterval(triggerGlitchBurst, 120 + Math.floor(Math.random() * 110));
  }

  function handleTitlePointerMove() {
    const now = performance.now();
    if (now - lastPointerBurstAtRef.current < 70) return;

    lastPointerBurstAtRef.current = now;
    triggerGlitchBurst();
  }

  useEffect(() => {
    return () => clearGlitchLoop();
  }, []);


  return (
    <main className="experience">
      <ExperienceMotion />

      <section className="introBillboard" aria-label="Agency Worldwide">
        <div className="introBillboardInner">
          <p className="introKicker">Global Creative Network</p>
          <h1
            className="introTitle"
            onPointerEnter={startGlitchLoop}
            onPointerLeave={clearGlitchLoop}
            onPointerMove={handleTitlePointerMove}
          >
            <span className="introWord introWordRed" aria-label="Agency">
              {Array.from(INTRO_LINE_ONE).map((char, index) => {
                const glyphId = `l1-${index}`;
                const glitchClass = glitchMap[glyphId] ?? "";

                return (
                  <span key={glyphId} className={`introGlyph ${glitchClass}`}>
                    {char}
                  </span>
                );
              })}
            </span>
            <span className="introWord introWordWhite" aria-label="Worldwide">
              {Array.from(INTRO_LINE_TWO).map((char, index) => {
                const glyphId = `l2-${index}`;
                const glitchClass = glitchMap[glyphId] ?? "";

                return (
                  <span key={glyphId} className={`introGlyph ${glitchClass}`}>
                    {char}
                  </span>
                );
              })}
            </span>
          </h1>
        </div>
      </section>

      <section className="section" data-reveal>
        <p className="eyebrow">Impacto</p>
        <div className="impactTitleSplit">
          <h2>Somos un equipo global</h2>
          <p className="impactInlineLead">
            de creativos y estrategas que entiende el poder transformador de una #PowerfulIdea
          </p>
        </div>
        <ImpactGlobe focusCountryKey={focusedCountryKey} focusUntilMs={focusUntilMs} />
        <div className="statsGrid">
          {impactStats.map((item) => (
            <article className="statCard" key={item.label}>
              <h3>{item.label}</h3>
              {item.label === "7 Oficinas" ? (
                <div className="impactFlagsInline" aria-label="7 Oficinas: Colombia, Mexico, Estados Unidos, Panama, Peru, Espana y China">
                  {IMPACT_FLAG_IMAGES.map((flag) => (
                    <button
                      key={flag.key}
                      type="button"
                      className="impactFlagButton"
                      onClick={() => focusCountryOnGlobe(flag.key)}
                      aria-label={`Centrar globo en ${flag.country} durante 24 segundos`}
                    >
                      <Image
                        src={flag.src}
                        alt={`Bandera de ${flag.country}`}
                        width={30}
                        height={20}
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <p>{item.value}</p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="section" data-reveal>
        <p className="eyebrow">Servicios</p>
        <h2>Nuestros Servicios</h2>
        <Services />
      </section>

      <section className="section" data-reveal>
        <p className="eyebrow">Casos</p>
        <h2>Casos de exito</h2>
        <div className="cardsGrid">
          {featuredCases.map((item) => (
            <article className="card case" key={item.name}>
              <h3>{item.name}</h3>
              <p>{item.outcome}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section cta" data-reveal>
        <p className="eyebrow">Contacto</p>
        <h2>{cta.title}</h2>
        <p>{cta.subtitle}</p>
        <a className="primaryButton" href={cta.actionHref}>
          {cta.actionLabel}
        </a>
      </section>

      <section className="section regional" data-reveal>
        <p className="eyebrow">Equipo global</p>
        <h2>Somos un equipo global</h2>
        <div className="officeGrid">
          {offices.map((office) => (
            <article className="officeCard" key={office.country}>
              <h3>{office.country}</h3>
              <p>{office.leader}</p>
              <p>{office.address}</p>
              {office.phone && <p>{office.phone}</p>}
              <p>{office.mobile}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section footerLinks" data-reveal>
        <p className="eyebrow">Comunidad y legal</p>
        <h2>Canales oficiales</h2>
        <div className="linkRows">
          <div>
            <h3>Social</h3>
            <ul>
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Legal y atencion</h3>
            <ul>
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="copyright">© TNT Marketing 2026. Todos los derechos reservados.</p>
      </section>
    </main>
  );
}
