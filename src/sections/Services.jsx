import { ArrowRight, BarChart3, Boxes, Building2, Check, Database, Plus, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { processSteps, services } from "../data/services";
import { sectionIndex } from "../data/sections";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import Tag from "../components/Tag";
import { countWord } from "../lib/words";

const ICONS = { Sparkles, Database, BarChart3, Boxes, Building2 };

function ServiceCard({ service }) {
  const Icon = ICONS[service.icon] ?? Sparkles;
  return (
    <article className="card group relative isolate flex h-full flex-col overflow-hidden p-6 shadow-soft transition-[border-color,box-shadow,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:border-line-strong hover:shadow-lift sm:p-7">
      {/* A soft wash that only appears on hover, so the grid stays calm at rest. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -top-24 -right-24 -z-10 size-56 rounded-full bg-gradient-to-br ${service.tint} opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-[0.14]`}
      />

      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className={`grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${service.tint} text-white shadow-soft transition-transform duration-500 ease-out-expo group-hover:scale-105`}
        >
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <h3 className="text-lg leading-snug font-semibold tracking-[-0.02em] sm:text-xl">{service.title}</h3>
          <p className="mt-1 font-serif text-[1.05rem] leading-snug text-accent italic">{service.tagline}</p>
        </div>
      </div>

      <p className="mt-5 text-[0.95rem] leading-relaxed text-muted text-pretty">{service.problem}</p>

      {/* Deliverables fold away so five services stay scannable; still in the DOM for find-in-page. */}
      <details className="group/details mt-5 rounded-2xl border border-line bg-bg/50 open:bg-bg/80">
        <summary className="flex list-none items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-ink-soft transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
          What you get
          <span className="flex items-center gap-2 font-mono text-[0.7rem] text-muted">
            {service.deliverables.length} items
            <Plus
              className="size-4 transition-transform duration-400 ease-out-expo group-open/details:rotate-45"
              aria-hidden="true"
            />
          </span>
        </summary>
        <ul className="space-y-2 px-4 pb-4">
          {service.deliverables.map((item) => (
            <li key={item} className="flex gap-2.5 text-[0.9rem] leading-relaxed text-ink-soft">
              <Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
              <span className="text-pretty">{item}</span>
            </li>
          ))}
        </ul>
      </details>

      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
        {service.stack.map((tech) => (
          <li key={tech}>
            <Tag>{tech}</Tag>
          </li>
        ))}
      </ul>

      {/* Proof sits inside the service, so the claim and the evidence are never apart. */}
      <div className="mt-auto pt-6">
        <div className="border-t border-line pt-5">
          <h4 className="eyebrow">Proof</h4>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft text-pretty">{service.evidence.metric}</p>
          <Link
            to={`/work/${service.evidence.slug}`}
            className="group/link mt-2.5 inline-flex items-center gap-1.5 text-[0.92rem] font-medium text-accent transition-colors hover:text-accent-bright"
          >
            {service.evidence.label}
            <ArrowRight
              className="size-4 transition-transform duration-300 ease-out-expo group-hover/link:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          index={sectionIndex("services")}
          eyebrow="What I can build"
          title="Problems I can take off your plate."
          titleId="services-title"
        >
          {countWord(services.length)} things I have actually shipped. Each one links to the case study behind it, so you can check the
          claim rather than take my word for it.
        </SectionHeading>

        <div className="mt-12 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.06} className="min-w-0">
              <ServiceCard service={service} />
            </Reveal>
          ))}

          {/* How an engagement runs — fills the grid's last cell instead of a separate strip. */}
          <Reveal delay={services.length * 0.06} className="min-w-0">
            <div className="flex h-full flex-col rounded-3xl border border-dashed border-line-strong bg-bg-soft p-6 sm:p-7">
              <h3 className="eyebrow">How we'd work together</h3>
              <ol className="relative mt-6 space-y-5 before:absolute before:top-2 before:bottom-2 before:left-[0.9rem] before:w-px before:bg-line-strong">
                {processSteps.map((step, i) => (
                  <li key={step.title} className="relative grid grid-cols-[1.8rem_minmax(0,1fr)] gap-x-3">
                    <span className="relative grid size-7 place-items-center rounded-full border border-line-strong bg-surface font-mono text-[0.68rem] font-medium text-accent tabular">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className="font-semibold tracking-[-0.015em]">{step.title}</h4>
                      <p className="mt-1 text-[0.9rem] leading-relaxed text-muted text-pretty">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
