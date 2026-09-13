import { experience } from "../data/experience";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import Tag from "../components/Tag";

export default function Experience() {
  return (
    <section id="experience" className="border-t border-line py-24 md:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading index="02" eyebrow="Experience" title="Where I've been building." />
          </div>
        </div>

        <ol className="lg:col-span-8">
          {experience.map((job, i) => (
            <Reveal
              as="li"
              key={job.company}
              delay={i * 0.06}
              className="grid gap-3 border-b border-line py-9 first:pt-0 last:border-b-0 sm:grid-cols-[11rem_1fr] sm:gap-8"
            >
              <div className="flex items-start gap-2 pt-1 sm:flex-col">
                <p className="font-mono text-xs text-muted tabular">{job.period}</p>
                {job.current && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[0.68rem] font-medium text-accent">
                    <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" /> Current
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-[1.35rem] font-semibold tracking-[-0.02em]">{job.company}</h3>
                <p className="mt-0.5 text-ink-soft">
                  {job.role}
                  {job.location && <span className="text-muted"> · {job.location}</span>}
                </p>
                {job.summary && <p className="mt-4 leading-relaxed text-muted">{job.summary}</p>}

                {job.points.length > 0 && (
                  <ul className="mt-4 space-y-3">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-3 leading-relaxed text-muted">
                        <span className="mt-[0.72rem] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}

                {job.stack && (
                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                    {job.stack.map((tech) => (
                      <li key={tech}>
                        <Tag>{tech}</Tag>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
