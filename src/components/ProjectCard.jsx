import { Link } from "react-router-dom";
import { ArrowRight, Lock } from "lucide-react";
import { loadCaseStudy } from "../lib/routes";
import Reveal from "./Reveal";
import Tag from "./Tag";
import ProjectVisual from "./ProjectVisual";
import { GitHubIcon } from "./BrandIcons";

const MAX_TAGS = 5;

export default function ProjectCard({ project, index }) {
  const reversed = index % 2 === 1;
  const extraTags = project.stack.length - MAX_TAGS;
  const codeLink = project.source ? { href: project.source, label: "Source" } : project.openSource;

  return (
    <Reveal
      as="article"
      className="group relative grid overflow-hidden rounded-4xl border border-line bg-surface transition-[border-color,box-shadow] duration-500 hover:border-line-strong hover:shadow-lift has-[h3_a:focus-visible]:ring-2 has-[h3_a:focus-visible]:ring-accent lg:grid-cols-12"
    >
      <div className={`relative lg:col-span-7 ${reversed ? "lg:order-last" : ""}`}>
        <ProjectVisual project={project} />
      </div>

      <div className="flex flex-col p-7 sm:p-9 lg:col-span-5 lg:p-10">
        <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-accent">0{index + 1}</span>
          <span>{project.kind}</span>
        </p>

        <h3 className="mt-4 text-[1.85rem] leading-[1.1] font-semibold tracking-[-0.03em] text-balance">
          <Link
            to={`/work/${project.slug}`}
            onPointerEnter={loadCaseStudy}
            onFocus={loadCaseStudy}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 leading-relaxed text-muted text-pretty">{project.summary}</p>

        <div className="mt-6 border-l-2 border-accent pl-4">
          <p className="text-2xl font-semibold tracking-tight tabular">{project.highlight.value}</p>
          <p className="mt-1 text-sm leading-snug text-muted">{project.highlight.label}</p>
        </div>

        <p className="mt-6 text-sm leading-relaxed">
          <span className="text-muted">Role · </span>
          {project.role}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.stack.slice(0, MAX_TAGS).map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
          {extraTags > 0 && (
            <li>
              <Tag className="text-muted">+{extraTags}</Tag>
            </li>
          )}
        </ul>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-8">
          <span aria-hidden="true" className="inline-flex items-center gap-2 text-sm font-medium">
            Read case study
            <span className="grid size-8 place-items-center rounded-full bg-ink text-bg transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
              <ArrowRight className="size-4" />
            </span>
          </span>

          {codeLink ? (
            <a
              href={codeLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-sm text-ink-soft transition-colors hover:border-ink hover:text-ink"
            >
              <GitHubIcon /> {codeLink.label}
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] text-muted">
              <Lock className="size-3.5" aria-hidden="true" /> {project.sourceLabel}
            </span>
          )}
        </div>
      </div>
    </Reveal>
  );
}
