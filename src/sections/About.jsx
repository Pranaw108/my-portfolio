import { GraduationCap } from "lucide-react";
import { about, education } from "../data/profile";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

export default function About() {
  const [lead, ...rest] = about;

  return (
    <section id="about" className="border-t border-line py-24 md:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <SectionHeading index="03" eyebrow="About" title="Where data meets product." />
        </div>

        <div className="lg:col-span-8">
          <Reveal>
            <p className="text-[clamp(1.25rem,2.2vw,1.6rem)] leading-snug tracking-[-0.015em] text-ink text-pretty">{lead}</p>
            {rest.map((paragraph) => (
              <p key={paragraph} className="mt-5 text-lg leading-relaxed text-muted text-pretty">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <h3 className="eyebrow">Education</h3>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {education.map((item) => (
                <li key={item.degree} className="card flex gap-4 p-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                    <GraduationCap className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-medium leading-snug">{item.degree}</p>
                    <p className="mt-1 text-sm text-muted">
                      {item.school}, {item.place}
                    </p>
                    {item.detail && <p className="mt-2 font-mono text-xs text-ink-soft">{item.detail}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
