"use client";

import { useState } from "react";
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
import { IntroBillboard } from "./components/intro-billboard";
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

export default function HomePage() {
  const [focusedCountryKey, setFocusedCountryKey] = useState<string | null>(null);
  const [focusUntilMs, setFocusUntilMs] = useState<number | null>(null);

  function focusCountryOnGlobe(countryKey: string) {
    setFocusedCountryKey(countryKey);
    setFocusUntilMs(Date.now() + 24_000);
  }


  return (
    <main className="experience">
      <ExperienceMotion />
      <IntroBillboard />

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
