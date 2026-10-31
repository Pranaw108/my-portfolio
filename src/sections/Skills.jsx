import { m, useReducedMotion } from "framer-motion";
import { BrainCircuit, Braces, ChartPie, ChartScatter, Database, Wrench } from "lucide-react";
import { skillGroups } from "../data/skills";
import SectionHeading from "../components/SectionHeading";
import BentoItem from "../components/BentoItem";
import { sectionIndex } from "../data/sections";
import { EASE } from "../lib/motion";

const ICONS = { BrainCircuit, ChartScatter, Braces, ChartPie, Database, Wrench };

// Chips rest readable; the entrance only lifts them and lightens a slight fade.
const chipVariants = {
  hidden: { opacity: 0.5, y: 6 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};

function SkillGroup({ group, index }) {
  const reduce = useReducedMotion();
  const Icon = ICONS[group.icon] ?? Wrench;

  return (
    <BentoItem
      index={index}
      style={{ "--tone": `var(--tone-${group.tone})` }}
      className="group/card h-full rounded-3xl border border-line bg-surface p-6 transition-[border-color,box-shadow] duration-500 hover:border-[color-mix(in_oklab,var(--tone)_45%,var(--line))] hover:shadow-[0_18px_40px_-24px_color-mix(in_oklab,var(--tone)_60%,transparent)] sm:p-7"
    >
      <div className="flex items-center gap-3">
        <span className="tone-chip grid size-10 shrink-0 place-items-center rounded-xl text-(--tone) transition-transform duration-500 ease-out-expo group-hover/card:-rotate-6">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h3 className="font-mono text-[0.75rem] font-medium tracking-[0.14em] text-(--tone) uppercase">{group.title}</h3>
        <span className="ml-auto font-mono text-[0.7rem] text-muted tabular">
          <span aria-hidden="true">{String(group.items.length).padStart(2, "0")}</span>
          <span className="sr-only">{group.items.length} tools</span>
        </span>
      </div>

      <m.ul
        className="mt-5 flex flex-wrap gap-2"
        initial={reduce ? false : "hidden"}
        whileInView="shown"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.035, delayChildren: 0.15 } } }}
      >
        {group.items.map((skill) => (
          <m.li key={skill} variants={chipVariants} className="tone-chip rounded-full px-3 py-1.5 text-sm text-ink-soft">
            {skill}
          </m.li>
        ))}
      </m.ul>
    </BentoItem>
  );
}

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="border-y border-line bg-bg-soft py-24 md:py-32">
      <div className="container-page">
        <SectionHeading index={sectionIndex("skills")} titleId="skills-title" eyebrow="Toolkit" title="The tools I reach for.">
          Grouped by the job they do. No skill bars — the case studies show how I use them.
        </SectionHeading>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <SkillGroup key={group.title} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
