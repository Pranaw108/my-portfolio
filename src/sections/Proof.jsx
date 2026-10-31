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
    value: 251,
    label: "commits to a live SaaS",
    note: "top contributor on a multi-tenant school platform, in four weeks",
  },
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
          <dl className="grid grid-cols-2 gap-x-5 gap-y-9 py-12 md:py-16 lg:grid-cols-4 lg:gap-x-8">
            {stats.map((stat) => (
              // dt must lead its group, so the number is lifted above it with order.
              <div key={stat.label} className="flex min-w-0 flex-col">
                <dt className="eyebrow order-2 mt-3">{stat.label}</dt>
                <dd className="order-1 text-[clamp(1.85rem,4vw,2.75rem)] leading-none font-semibold tracking-[-0.03em] text-ink">
                  <StatCounter value={stat.value} decimals={stat.decimals ?? 0} suffix={stat.suffix ?? ""} />
                </dd>
                <dd className="order-3 mt-1.5 text-sm leading-relaxed text-muted text-pretty">{stat.note}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <TechMarquee />
    </section>
  );
}
