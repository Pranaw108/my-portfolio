import Reveal from "./Reveal";

export default function SectionHeading({ index, eyebrow, title, children, className = "" }) {
  return (
    <Reveal className={`max-w-2xl ${className}`}>
      <p className="eyebrow flex items-center gap-3">
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance">
        {title}
      </h2>
      {children && <p className="mt-4 text-lg leading-relaxed text-muted text-pretty">{children}</p>}
    </Reveal>
  );
}
