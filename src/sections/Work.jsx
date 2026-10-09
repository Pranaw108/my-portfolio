import { projects } from "../data/projects";
import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import { sectionIndex } from "../data/sections";

const NUMBER_WORDS = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];

/** Spell the count, so the heading copy can never disagree with the data. */
const countWord = (n) => NUMBER_WORDS[n] ?? String(n);

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading index={sectionIndex("work")} titleId="work-title" eyebrow="Selected work" title="From raw data to something people can use.">
          {countWord(projects.length)} case studies across machine learning, analytics engineering and business
          intelligence — each with the problem, my role and what came out of it.
        </SectionHeading>

        <div className="mt-14 space-y-8 md:mt-20 md:space-y-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
