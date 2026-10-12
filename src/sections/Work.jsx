import { useMemo, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { projectCategories, projects } from "../data/projects";
import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import { sectionIndex } from "../data/sections";
import { EASE } from "../lib/motion";

const NUMBER_WORDS = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];

/** Spell the count, so the heading copy can never disagree with the data. */
const countWord = (n) => NUMBER_WORDS[n] ?? String(n);

const ALL = "All";

export default function Work() {
  const [active, setActive] = useState(ALL);

  const filters = useMemo(() => [ALL, ...projectCategories], []);
  const shown = useMemo(
    () => (active === ALL ? projects : projects.filter((p) => p.categories?.includes(active))),
    [active],
  );

  // A filter with one or two options is just clutter.
  const showFilters = projectCategories.length > 2;

  return (
    <section id="work" aria-labelledby="work-title" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading index={sectionIndex("work")} titleId="work-title" eyebrow="Selected work" title="From raw data to something people can use.">
          {countWord(projects.length)} case studies across machine learning, analytics engineering and business
          intelligence — each with the problem, my role and what came out of it.
        </SectionHeading>

        {showFilters && (
          <div
            role="group"
            aria-label="Filter work by category"
            className="mt-10 flex flex-wrap gap-2 md:mt-12"
          >
            {filters.map((name) => {
              const isActive = name === active;
              const count = name === ALL
                ? projects.length
                : projects.filter((p) => p.categories?.includes(name)).length;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setActive(name)}
                  aria-pressed={isActive}
                  className={`group/filter relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-[background-color,border-color,color] duration-300 ease-out-expo ${
                    isActive
                      ? "border-transparent bg-ink text-bg"
                      : "border-line-strong text-ink-soft hover:border-ink hover:text-ink"
                  }`}
                >
                  {name}
                  <span
                    className={`font-mono text-[0.7rem] tabular ${isActive ? "text-bg/60" : "text-muted"}`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-14 space-y-8 md:mt-20 md:space-y-10">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((project, index) => (
              <m.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <ProjectCard project={project} index={index} />
              </m.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Screen readers get told what changed; sighted users see the cards move. */}
        <p aria-live="polite" className="sr-only">
          Showing {shown.length} of {projects.length} case studies
          {active === ALL ? "" : ` in ${active}`}.
        </p>
      </div>
    </section>
  );
}
