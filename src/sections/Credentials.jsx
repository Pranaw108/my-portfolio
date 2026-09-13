import { ArrowUpRight, Trophy } from "lucide-react";
import { certifications, goer, rmat } from "../data/credentials";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

export default function Credentials() {
  return (
    <section id="credentials" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading index="05" eyebrow="Achievements & credentials" title="Recognition and certifications." />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          <Reveal className="card relative overflow-hidden p-7 sm:p-9 lg:col-span-2">
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-24 size-72 rounded-full bg-[radial-gradient(closest-side,var(--accent-soft),transparent)]"
            />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-ink text-bg">
                  <Trophy className="size-5" aria-hidden="true" />
                </span>
                <span className="rounded-full border border-accent/30 bg-accent-soft px-3 py-1 font-mono text-[0.72rem] font-medium text-accent">
                  {goer.badge}
                </span>
              </div>
              <h3 className="mt-6 text-[clamp(1.6rem,3vw,2.2rem)] leading-tight font-semibold tracking-[-0.03em]">{goer.title}</h3>
              <p className="mt-2 text-sm text-muted">{goer.subtitle}</p>
              <p className="mt-5 max-w-2xl leading-relaxed text-ink-soft text-pretty">{goer.description}</p>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-muted">
                {goer.meta.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-line-strong" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="card flex flex-col p-7 sm:p-9">
            <p className="eyebrow">{rmat.issuer}</p>
            <p className="mt-6 text-7xl font-semibold tracking-tighter text-accent tabular">{rmat.score}</p>
            <h3 className="mt-3 font-medium">{rmat.title}</h3>
            <p className="mt-1 font-mono text-xs text-muted">{rmat.detail}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Business logic, decision-making, risk thinking and analytical reasoning.
            </p>
            <a
              href={rmat.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-ink hover:text-accent"
            >
              View certificate
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="card mt-5 overflow-hidden">
          <h3 className="sr-only">Certifications</h3>
          <ul className="divide-y divide-line">
            {certifications.map((cert) => (
              <li
                key={cert.title}
                className="grid gap-x-6 gap-y-2 px-6 py-5 transition-colors hover:bg-bg/60 sm:grid-cols-[1fr_5rem_5rem] sm:items-center sm:px-8"
              >
                <div>
                  <p className="font-medium">{cert.title}</p>
                  <p className="mt-0.5 text-sm text-muted">
                    {cert.issuer}
                    {cert.note && <span className="text-muted/80"> · {cert.note}</span>}
                  </p>
                </div>
                <p className="font-mono text-xs text-muted tabular">{cert.date}</p>
                {cert.href ? (
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${cert.action} ${cert.title} certificate`}
                    className="group inline-flex items-center gap-1 justify-self-start text-sm font-medium text-ink hover:text-accent sm:justify-self-end"
                  >
                    {cert.action}
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : (
                  <span className="hidden sm:block" />
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
