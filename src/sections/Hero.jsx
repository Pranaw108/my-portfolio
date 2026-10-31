import { useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Mail, MapPin } from "lucide-react";
import { profile } from "../data/profile";
import { experience } from "../data/experience";
import { education } from "../data/profile";
import { EASE } from "../lib/motion";
import ButtonLink from "../components/Button";
import HeroChart from "../components/HeroChart";
import WordRotator from "../components/WordRotator";
import { GitHubIcon, LinkedInIcon } from "../components/BrandIcons";

// Load-time entrance order: pill, name, role, focus, paragraph, buttons, links, portrait.
const DELAY = { pill: 0.05, name: 0.12, role: 0.3, focus: 0.38, intro: 0.55, ctas: 0.63, links: 0.71, portrait: 0.8, facts: 0.95 };

/** Props for a load-time fade-and-rise. Reduced motion renders the final state at once. */
function entrance(reduce, delay, from = { opacity: 0, y: 12 }) {
  if (reduce) return { initial: false };
  return {
    initial: from,
    animate: { opacity: 1, y: 0, x: 0, scale: 1 },
    transition: { duration: 0.6, ease: EASE, delay },
  };
}

const socials = [
  { label: "GitHub", href: profile.links.github, icon: GitHubIcon, external: true },
  { label: "LinkedIn", href: profile.links.linkedin, icon: LinkedInIcon, external: true },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

const previous = experience.find((job) => !job.current);
const facts = [
  { label: "Now", value: `${profile.currentRole}, ${profile.currentCompany}` },
  { label: "Previously", value: `${previous.role}, ${previous.company.replace(" LLP", "")}` },
  { label: "Education", value: `MCA · ${education[0].detail}` },
  { label: "Based in", value: profile.locationShort },
];

export default function Hero() {
  const reduce = useReducedMotion();
  // The role rotator holds still while the pointer is on it or focus is in the hero.
  const [hovering, setHovering] = useState(false);
  const [focusInside, setFocusInside] = useState(false);
  const fadeUp = (delay) => entrance(reduce, delay);

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative isolate overflow-hidden"
      onFocus={() => setFocusInside(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocusInside(false);
      }}
    >
      {/* Backdrop: dot grid, warm glow, trend line */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(var(--line-strong)_1px,transparent_1px)] mask-[radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)] bg-size-[26px_26px] opacity-70" />
        <div className="absolute -top-48 -right-40 size-176 rounded-full bg-[radial-gradient(closest-side,var(--accent-soft),transparent)]" />
        {/* Sits above the facts strip and fades in from the middle, so it never runs under text */}
        <HeroChart className="absolute inset-x-0 bottom-36 hidden h-[34%] w-full mask-[linear-gradient(to_right,transparent_55%,black_82%)] md:block" />
      </div>

      <div className="container-page pt-24 pb-12 md:pt-36 md:pb-16">
        <div className="grid items-end gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-14">
          <div>
            {/* Status pill: green is the "available" signal, kept apart from the brand accent. */}
            <m.p
              {...fadeUp(DELAY.pill)}
              className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pr-4 pl-3 text-[0.82rem] text-ink-soft shadow-soft backdrop-blur-sm select-none"
            >
              <span className="relative flex size-2 shrink-0">
                <span className="animate-ping-soft absolute inline-flex size-full rounded-full bg-emerald-500" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {/* Current job sits in the facts strip below; the pill is about what's next. */}
              <span className="sm:hidden">{profile.availabilityShort}</span>
              <span className="hidden sm:inline">{profile.availability}</span>
            </m.p>

            <h1 className="mt-6 text-[clamp(3.5rem,11vw,8rem)] leading-[0.88] font-semibold tracking-[-0.055em]">
              {["Pranaw", "Gautam"].map((word, i) => (
                <span key={word} className="block overflow-hidden pb-[0.06em]">
                  <m.span
                    className="block"
                    initial={reduce ? false : { y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: DELAY.name + i * 0.08 }}
                  >
                    {word}
                    {/* keeps "Pranaw Gautam" two words for screen readers and copy-paste */}
                    {i === 0 && " "}
                  </m.span>
                </span>
              ))}
            </h1>

            <m.p
              {...fadeUp(DELAY.role)}
              className="mt-6 max-w-2xl text-[clamp(1.2rem,2.3vw,1.65rem)] leading-snug tracking-[-0.015em] text-ink-soft text-balance"
            >
              <span className="sr-only">{profile.roles.join(" and ")}</span>
              <span
                className="inline-flex items-baseline gap-2.5"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              >
                <span aria-hidden="true" className="h-[0.9em] w-[3px] self-center rounded-full bg-accent" />
                <WordRotator words={profile.roles} paused={hovering || focusInside} className="text-ink" />
              </span>
            </m.p>

            <ul className="mt-3 flex max-w-2xl flex-wrap gap-x-4 gap-y-1 text-[clamp(0.9rem,1.6vw,1.15rem)] text-muted" aria-label="Focus areas">
              {profile.focus.map((item, i) => (
                <m.li key={item} {...entrance(reduce, DELAY.focus + i * 0.05, { opacity: 0, y: 8 })} className="inline-flex items-center gap-2 whitespace-nowrap">
                  <span className="size-1.5 rounded-full bg-accent/70" aria-hidden="true" />
                  {item}
                </m.li>
              ))}
            </ul>

            <m.p {...fadeUp(DELAY.intro)} className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-muted text-pretty">
              {profile.intro}
            </m.p>

            {/* Three paths on purpose: a client starting a project, anyone
                checking the work, and a recruiter who wants the résumé. */}
            <m.div {...fadeUp(DELAY.ctas)} className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink to="/#contact" size="lg">
                Start a project
                <ArrowDown className="size-4 transition-transform duration-300 group-hover/btn:translate-y-0.5" />
              </ButtonLink>
              <ButtonLink to="/#work" variant="secondary" size="lg">
                See my work
                <ArrowDown className="size-4 transition-transform duration-300 group-hover/btn:translate-y-0.5" />
              </ButtonLink>
              <ButtonLink href={profile.resume} external variant="ghost" size="lg">
                Résumé
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </ButtonLink>
            </m.div>

            <ul className="mt-6 flex items-center gap-2" aria-label="Profiles">
              {socials.map(({ label, href, icon: Icon, external }, i) => (
                <m.li key={label} {...entrance(reduce, DELAY.links + i * 0.05, { opacity: 0, scale: 0.85 })}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="grid size-11 place-items-center rounded-full border border-line bg-surface/60 text-muted transition-[color,border-color,transform] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-ink hover:text-ink"
                  >
                    <Icon className="size-[18px]" aria-hidden="true" />
                  </a>
                </m.li>
              ))}
            </ul>
          </div>

          <m.figure
            {...entrance(reduce, DELAY.portrait, { opacity: 0, scale: 0.96 })}
            className="group relative order-first w-28 md:order-none md:w-64 lg:w-76"
          >
            <div className="aspect-square overflow-hidden rounded-3xl border border-line bg-bg-soft shadow-lift md:aspect-4/5 md:rounded-[2rem]">
              <img
                src={profile.photo.src}
                srcSet={profile.photo.srcSet}
                sizes="(min-width: 1024px) 304px, (min-width: 768px) 256px, 112px"
                width="960"
                height="960"
                alt="Portrait of Pranaw Gautam"
                fetchPriority="high"
                className="size-full object-cover object-top transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]"
              />
            </div>
            <figcaption className="absolute -bottom-4 -left-5 hidden items-center gap-1.5 rounded-full border border-line bg-bg/80 px-3.5 py-2 text-xs font-medium text-ink-soft shadow-soft backdrop-blur-md md:inline-flex">
              <MapPin className="size-3.5 text-accent" aria-hidden="true" />
              {profile.locationShort}
            </figcaption>
          </m.figure>
        </div>

        <m.dl
          {...entrance(reduce, DELAY.facts, { opacity: 0 })}
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 md:mt-24 md:grid-cols-4"
        >
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="eyebrow">{fact.label}</dt>
              <dd className="mt-1.5 text-[0.95rem] font-medium text-ink">{fact.value}</dd>
            </div>
          ))}
        </m.dl>
      </div>
    </section>
  );
}
