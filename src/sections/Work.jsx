import { projects } from "../data/projects";
import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";

export default function Work() {
  return (
    <section id="work" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading index="01" eyebrow="Selected work" title="From raw data to something people can use.">
          Three case studies across machine learning, analytics engineering and business intelligence — each with the
          problem, my role and what came out of it.
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
