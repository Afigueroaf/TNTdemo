import {
  cta,
  featuredCases,
  legalLinks,
  offices,
  socialLinks,
} from "./data/tnt-content";
import { HomeClientShell } from "./components/home-client-shell";
import { SiteHeader } from "./components/site-header";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="experience">
        <HomeClientShell />

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
    </>
  );
}
