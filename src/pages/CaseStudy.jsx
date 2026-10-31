import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Lock } from "lucide-react";
import { getCodeLink, getProject, projects } from "../data/projects";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Reveal from "../components/Reveal";
import Tag from "../components/Tag";
import ButtonLink from "../components/Button";
import ProjectVisual from "../components/ProjectVisual";
import { GitHubIcon } from "../components/BrandIcons";
import NotFound from "./NotFound";

function Block({ title, children }) {
  return (
    <Reveal as="section" className="border-t border-line pt-8">
      <h2 className="eyebrow">{title}</h2>
      <div className="mt-5">{children}</div>
    </Reveal>
  );
}

function Gallery({ project }) {
  if (!project.gallery?.length || project.visual === "heatmap") return null;
  const isPhone = project.visual === "phones";
  // Three or more wide screens: lead with one, pair the rest, so the page stays scannable.
  const paired = !isPhone && project.gallery.length > 2;

  return (
    <section className="container-page mt-24 md:mt-32" aria-labelledby="gallery-title">
      <Reveal className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="gallery-title" className="text-2xl font-semibold tracking-[-0.02em]">
          {project.galleryTitle ?? (isPhone ? "Screens" : "Report pages")}
        </h2>
        {project.galleryNote && <p className="font-mono text-xs text-muted">{project.galleryNote}</p>}
      </Reveal>

      <ul
        className={`mt-8 grid gap-6 ${
          isPhone ? "grid-cols-2 sm:grid-cols-3 lg:gap-10" : paired ? "grid-cols-1 md:grid-cols-2 md:gap-8" : "gap-10"
        }`}
      >
        {project.gallery.map((shot, i) => (
          <Reveal
            as="li"
            key={shot.src}
            delay={isPhone ? (i % 3) * 0.06 : paired ? (i % 2) * 0.06 : 0}
            className={`min-w-0 ${paired && i === 0 ? "md:col-span-2" : ""}`}
          >
            <figure>
              <div
                className={`overflow-hidden border border-line bg-bg-soft ${
                  isPhone ? "mx-auto max-w-[260px] rounded-[1.75rem]" : "rounded-2xl sm:rounded-3xl"
                }`}
              >
                {/* Opens the full-size image, so a half-width screenshot can still be read. */}
                <a href={shot.src} target="_blank" rel="noopener noreferrer" className="group/shot block cursor-zoom-in">
                  <img
                    src={shot.src}
                    width={shot.w}
                    height={shot.h}
                    alt={`${project.title}: ${shot.caption}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full transition-transform duration-700 ease-out-expo group-hover/shot:scale-[1.015]"
                  />
                </a>
              </div>
              <figcaption className={`mt-3 text-sm text-muted ${isPhone ? "text-center" : ""}`}>{shot.caption}</figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug);
  useDocumentTitle(project ? `${project.title} — Pranaw Gautam` : "Page not found — Pranaw Gautam");

  if (!project) return <NotFound />;

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const codeLink = getCodeLink(project);

  return (
    <article className="pt-28 pb-8 md:pt-36">
      <header className="container-page">
        <Reveal>
          <Link
            to="/#work"
            className="group inline-flex items-center gap-2 rounded-full text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
            All work
          </Link>
          <p className="eyebrow mt-10 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-accent">0{index + 1}</span>
            {project.kind}
            <span aria-hidden="true">·</span>
            {project.year}
          </p>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.05em] text-balance">
            {project.title}
          </h1>
          <p className="mt-6 max-w-3xl text-[clamp(1.15rem,2vw,1.45rem)] leading-snug text-ink-soft text-pretty">
            {project.summary}
          </p>
          {codeLink && (
            <ButtonLink href={codeLink.href} variant="secondary" size="md" className="mt-8">
              <GitHubIcon /> Code on GitHub
              {codeLink.isRebuild && <span className="text-muted">· open-source rebuild</span>}
            </ButtonLink>
          )}
        </Reveal>
      </header>

      <Reveal delay={0.1} className="container-page mt-12 md:mt-16">
        <div className="group overflow-hidden rounded-4xl border border-line">
          <ProjectVisual project={project} />
        </div>
      </Reveal>

      <div className="container-page mt-16 grid gap-12 md:mt-24 lg:grid-cols-12 lg:gap-8">
        <aside className="lg:col-span-4">
          <Reveal className="card space-y-6 p-6 lg:sticky lg:top-28">
            <div>
              <h2 className="eyebrow">Role</h2>
              <p className="mt-2 leading-relaxed">{project.role}</p>
            </div>
            <div>
              <h2 className="eyebrow">Stack</h2>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow">Code</h2>
              {project.sourceNote && (
                <p className="mt-2 flex gap-2 text-sm leading-relaxed text-muted">
                  <Lock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {project.sourceNote}
                </p>
              )}
              {codeLink ? (
                <ButtonLink href={codeLink.href} variant="secondary" size="sm" className="mt-3">
                  <GitHubIcon /> {codeLink.isRebuild ? "Code · open-source rebuild" : "Code on GitHub"}
                </ButtonLink>
              ) : (
                // Private client work: no repo to show, and nothing that names the client.
                !project.sourceNote && (
                  <p className="mt-2 flex gap-2 text-sm leading-relaxed text-muted">
                    <Lock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    {project.sourceLabel ?? "Private repository"}
                  </p>
                )
              )}
            </div>
          </Reveal>
        </aside>

        <div className="space-y-14 lg:col-span-8">
          <Block title="The problem">
            <p className="text-[clamp(1.15rem,1.9vw,1.4rem)] leading-snug tracking-[-0.01em] text-ink text-pretty">
              {project.problem}
            </p>
          </Block>

          <Block title="Results">
            <ul className="grid gap-4 sm:grid-cols-3">
              {project.results.map((result) => (
                <li key={result.label} className="card p-5">
                  <p className="text-2xl font-semibold tracking-[-0.03em] text-accent tabular">{result.value}</p>
                  <p className="mt-2 text-sm leading-snug text-muted">{result.label}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="How I built it">
            <ol className="relative space-y-7 before:absolute before:top-2 before:bottom-2 before:left-[0.9rem] before:w-px before:bg-line">
              {project.approach.map((step, i) => (
                <li key={step.title} className="relative flex gap-5">
                  <span className="relative z-10 grid size-7 shrink-0 place-items-center rounded-full border border-line-strong bg-bg font-mono text-[0.7rem] text-ink-soft">
                    {i + 1}
                  </span>
                  <div className="pt-0.5">
                    <h3 className="font-medium">{step.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-muted text-pretty">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Block>

          {project.recent?.length > 0 && (
            <Block title={project.recentTitle ?? "Recent work"}>
              <ul className="grid gap-4 sm:grid-cols-2">
                {project.recent.map((item) => (
                  <li key={item.title} className="card relative overflow-hidden p-5">
                    <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] bg-accent/70" />
                    <h3 className="font-medium text-ink">{item.title}</h3>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted text-pretty">{item.body}</p>
                  </li>
                ))}
              </ul>
            </Block>
          )}

          <Block title="Key features">
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex gap-3 leading-relaxed text-ink-soft">
                  <Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </Block>
        </div>
      </div>

      <Gallery project={project} />

      <nav aria-label="Next project" className="container-page mt-24 md:mt-32">
        <Link
          to={`/work/${next.slug}`}
          className="group flex flex-col gap-6 rounded-4xl border border-line bg-surface p-7 transition-[border-color,box-shadow] duration-500 hover:border-line-strong hover:shadow-lift sm:flex-row sm:items-center sm:justify-between sm:p-10"
        >
          <div>
            <p className="eyebrow">Next project</p>
            <p className="mt-3 text-[clamp(1.75rem,4vw,2.75rem)] leading-tight font-semibold tracking-[-0.035em]">
              {next.title}
            </p>
            <p className="mt-2 text-muted">{next.kind}</p>
          </div>
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-ink text-bg transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5">
            <ArrowRight className="size-5" aria-hidden="true" />
          </span>
        </Link>
      </nav>
    </article>
  );
}
