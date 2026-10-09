import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { processSteps, services } from "../data/services";
import { sectionIndex } from "../data/sections";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import Tag from "../components/Tag";

function ServiceCard({ service }) {
  return (
    <article className="card group relative flex flex-col p-6 shadow-soft transition-[border-color,box-shadow,transform] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift sm:p-8">
      <h3 className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">{service.title}</h3>
      <p className="mt-2 font-serif text-lg italic text-accent">{service.tagline}</p>

      <p className="mt-5 leading-relaxed text-muted text-pretty">{service.problem}</p>

      <h4 className="eyebrow mt-7">What you get</h4>
      <ul className="mt-3 space-y-2.5">
        {service.deliverables.map((item) => (
          <li key={item} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
            <Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
            <span className="text-pretty">{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7 flex flex-wrap gap-1.5">
        {service.stack.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>

      {/* Proof sits inside the service, so the claim and the evidence are never apart. */}
      <div className="mt-7 border-t border-line pt-5">
        <h4 className="eyebrow">Proof</h4>
        <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft text-pretty">{service.evidence.metric}</p>
        <Link
          to={`/work/${service.evidence.slug}`}
          className="group/link mt-3 inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-accent transition-colors hover:text-accent-bright"
        >
          {service.evidence.label}
          <ArrowRight
            className="size-4 transition-transform duration-300 ease-out-expo group-hover/link:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
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
          Four things I have actually shipped. Each one links to the case study behind it, so you can check the
          claim rather than take my word for it.
        </SectionHeading>

        <div className="mt-14 grid gap-5 md:mt-16 lg:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.06}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>

        {/* How an engagement runs — kept as a strip rather than its own section. */}
        <Reveal className="mt-16 md:mt-20">
          <div className="card overflow-hidden p-6 shadow-soft sm:p-8 md:p-10">
            <h3 className="eyebrow">How we'd work together</h3>
            <ol className="mt-7 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, i) => (
                <li key={step.title} className="relative">
                  <span className="font-mono text-[0.72rem] font-medium tracking-[0.14em] text-accent tabular">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mt-2.5 text-lg font-semibold tracking-[-0.015em]">{step.title}</h4>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted text-pretty">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
