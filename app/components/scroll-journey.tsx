"use client";

import { useEffect, useMemo, useState } from "react";

type NarrativeMoment = {
  label: string;
  title: string;
  detail: string;
};

type ScrollJourneyProps = {
  moments: NarrativeMoment[];
};

export function ScrollJourney({ moments }: ScrollJourneyProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-journey-step]");
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const index = Number(target.dataset.journeyStepIndex);
            if (!Number.isNaN(index)) {
              setActive(index);
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const progress = useMemo(() => {
    if (!moments.length) return 0;
    return ((active + 1) / moments.length) * 100;
  }, [active, moments.length]);

  const current = moments[active] ?? moments[0];

  return (
    <section className="section journey" aria-label="Narrativa guiada por scroll">
      <p className="eyebrow">Narrativa</p>
      <h2>Recorrido inmersivo por etapas</h2>

      <div className="journeyLayout">
        <aside className="journeyVisual" aria-live="polite">
          <div className="journeyAura" />
          <div className="journeySurface">
            <span>{current.label}</span>
            <h3>{current.title}</h3>
            <p>{current.detail}</p>
          </div>

          <div className="journeyProgress" role="presentation">
            <div className="journeyProgressBar" style={{ width: `${progress}%` }} />
          </div>
        </aside>

        <div className="journeySteps">
          {moments.map((moment, index) => (
            <article
              key={moment.title}
              data-journey-step
              data-journey-step-index={index}
              className={index === active ? "journeyStep active" : "journeyStep"}
            >
              <small>{moment.label}</small>
              <h3>{moment.title}</h3>
              <p>{moment.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}