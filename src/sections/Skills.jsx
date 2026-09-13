import { skillGroups } from "../data/skills";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

export default function Skills() {
  return (
    <section id="skills" className="border-y border-line bg-bg-soft py-24 md:py-32">
      <div className="container-page">
        <SectionHeading index="04" eyebrow="Toolkit" title="The tools I reach for.">
          Grouped by the job they do. No skill bars — the case studies show how I use them.
        </SectionHeading>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={(i % 3) * 0.06} className="bg-surface p-7">
              <h3 className="eyebrow">{group.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-line bg-bg px-3 py-1.5 text-sm text-ink-soft transition-colors duration-300 hover:border-ink hover:text-ink"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
