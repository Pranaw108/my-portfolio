import { m } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { profile } from "../data/profile";
import { experience } from "../data/experience";
import { education } from "../data/profile";
import { EASE } from "../lib/motion";
import ButtonLink from "../components/Button";
import HeroChart from "../components/HeroChart";

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
});

const previous = experience.find((job) => !job.current);
const facts = [
  { label: "Now", value: profile.currentCompany },
  { label: "Previously", value: `${previous.role}, ${previous.company.replace(" LLP", "")}` },
  { label: "Education", value: `MCA · ${education[0].detail}` },
  { label: "Based in", value: profile.locationShort },
];

export default function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative isolate overflow-hidden">
      {/* Backdrop: dot grid, warm glow, trend line */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(var(--line-strong)_1px,transparent_1px)] mask-[radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)] bg-size-[26px_26px] opacity-70" />
        <div className="absolute -top-48 -right-40 size-176 rounded-full bg-[radial-gradient(closest-side,var(--accent-soft),transparent)]" />
        {/* Sits above the facts strip and fades in from the middle, so it never runs under text */}
        <HeroChart className="absolute inset-x-0 bottom-36 hidden h-[34%] w-full mask-[linear-gradient(to_right,transparent_42%,black_78%)] md:block" />
      </div>

      <div className="container-page pt-28 pb-12 md:pt-40 md:pb-16">
        <div className="grid items-end gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-14">
          <div>
            <m.p {...fadeUp(0.05)} className="eyebrow flex items-center gap-2.5">
              <span className="relative flex size-2">
                <span className="animate-ping-soft absolute inline-flex size-full rounded-full bg-accent-bright" />
                <span className="relative inline-flex size-2 rounded-full bg-accent-bright" />
              </span>
              Currently at {profile.currentCompany}
            </m.p>

            <h1 className="mt-6 text-[clamp(3.5rem,11vw,8rem)] leading-[0.88] font-semibold tracking-[-0.055em]">
              {["Pranaw", "Gautam"].map((word, i) => (
                <span key={word} className="block overflow-hidden pb-[0.06em]">
                  <m.span
                    className="block"
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: EASE, delay: 0.12 + i * 0.09 }}
                  >
                    {word}
                    {/* keeps "Pranaw Gautam" two words for screen readers and copy-paste */}
                    {i === 0 && " "}
                  </m.span>
                </span>
              ))}
            </h1>

            <m.p
              {...fadeUp(0.4)}
              className="mt-6 max-w-2xl text-[clamp(1.2rem,2.3vw,1.65rem)] leading-snug tracking-[-0.015em] text-ink-soft text-balance"
            >
              Data Analyst, AI/ML Engineer <span className="font-serif text-[1.12em] text-accent italic">and</span>{" "}
              Web&nbsp;&amp;&nbsp;Flutter Developer
            </m.p>

            <m.p {...fadeUp(0.5)} className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-muted text-pretty">
              {profile.intro}
            </m.p>

            <m.div {...fadeUp(0.6)} className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink to="/#work" size="lg">
                See my work
                <ArrowDown className="size-4 transition-transform duration-300 group-hover/btn:translate-y-0.5" />
              </ButtonLink>
              <ButtonLink href={profile.resume} external variant="secondary" size="lg">
                Résumé
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </ButtonLink>
            </m.div>
          </div>

          <m.figure
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
            className="group relative order-first w-20 md:order-none md:w-64 lg:w-76"
          >
            <div className="aspect-square overflow-hidden rounded-2xl border border-line bg-bg-soft shadow-lift md:aspect-4/5 md:rounded-[2rem]">
              <img
                src={profile.photo.src}
                srcSet={profile.photo.srcSet}
                sizes="(min-width: 1024px) 304px, (min-width: 768px) 256px, 80px"
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.85 }}
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
