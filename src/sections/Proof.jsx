import { projects } from "../data/projects";
import Reveal from "../components/Reveal";
import StatCounter from "../components/StatCounter";
import TechMarquee from "../components/TechMarquee";

/**
 * A thin band of countable facts between the hero and the services.
 *
 * Every figure here can be checked in the repositories below. Deliberately no
 * "happy clients" or "years of experience" — those are the numbers portfolios
 * invent, and one unverifiable stat makes a reader doubt the rest.
 */
const stats = [
  {
    value: projects.length,
    label: "case studies",
    note: "each with the problem, my role and the result",
  },
  {
    value: 71.9,
    decimals: 1,
    suffix: "M",
    label: "readings processed",
    note: "CPCB station data normalised for the Vayu forecasting project",
  },
  {
    value: 4,
    label: "public repositories",
    note: "source you can read, not just screenshots",
  },
];

export default function Proof() {
  return (
    <section aria-label="At a glance" className="border-t border-line">
      <div className="container-page">
        <Reveal>
          <dl className="grid gap-8 py-12 sm:grid-cols-3 md:py-16">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dd className="text-[clamp(2rem,4vw,2.75rem)] leading-none font-semibold tracking-[-0.03em] text-ink">
                  <StatCounter value={stat.value} decimals={stat.decimals ?? 0} suffix={stat.suffix ?? ""} />
                </dd>
                <dt className="eyebrow mt-3">{stat.label}</dt>
                <p className="mt-1.5 text-sm leading-relaxed text-muted text-pretty">{stat.note}</p>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <TechMarquee />
    </section>
  );
}
