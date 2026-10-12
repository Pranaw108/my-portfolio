import { skillGroups } from "../data/skills";

// Drawn from the real toolkit, so the strip can never advertise something the
// Toolkit section does not list.
const items = skillGroups.flatMap((group) => group.items);

/**
 * A slow scrolling strip of the toolkit, for breadth at a glance.
 *
 * The list is rendered twice and the track moves exactly half its width, so the
 * loop has no visible seam. Hidden from screen readers because the Toolkit
 * section already lists all of it properly, and paused for anyone who asked for
 * reduced motion.
 */
export default function TechMarquee() {
  return (
    <div
      aria-hidden="true"
      className="relative flex overflow-hidden border-y border-line bg-bg-soft py-4 select-none"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-mono text-[0.78rem] tracking-[0.06em] whitespace-nowrap text-muted uppercase"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
