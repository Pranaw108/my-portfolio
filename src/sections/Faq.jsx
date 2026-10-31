import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CalendarClock, CircleHelp, Handshake, KeyRound, Link2, MessagesSquare, Plus, Target, Wallet } from "lucide-react";
import { faqs } from "../data/faqs";
import { sectionIndex } from "../data/sections";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

const TOPIC_ICONS = {
  Availability: Handshake,
  Fit: Target,
  Pricing: Wallet,
  Timeline: CalendarClock,
  Ownership: KeyRound,
  Process: MessagesSquare,
};

function FaqItem({ faq, isOpen, onToggle }) {
  const Icon = TOPIC_ICONS[faq.topic] ?? CircleHelp;
  const buttonId = `faq-q-${faq.slug}`;
  const panelId = `faq-a-${faq.slug}`;

  return (
    <div
      id={`faq-${faq.slug}`}
      data-open={isOpen || undefined}
      className="group/item relative scroll-mt-24 overflow-hidden rounded-2xl border border-line bg-surface transition-[background-color,border-color,box-shadow] duration-300 data-open:border-accent/35 data-open:bg-[color-mix(in_oklab,var(--accent)_6%,var(--surface))] data-open:shadow-soft"
    >
      {/* Accent rail marks the open answer. */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-accent transition-transform duration-300 ease-out-expo group-data-open/item:scale-y-100"
      />
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-start gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
        >
          <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-bg-soft text-muted transition-colors duration-300 group-data-open/item:bg-accent-soft group-data-open/item:text-accent">
            <Icon className="size-4" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-mono text-[0.68rem] tracking-[0.12em] text-muted uppercase">{faq.topic}</span>
            <span className="mt-1 block text-[1.05rem] font-medium tracking-[-0.015em] text-ink text-pretty transition-colors group-hover/item:text-accent sm:text-lg">
              {faq.q}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-line text-muted transition-[transform,background-color,color,border-color] duration-300 ease-out-expo group-data-open/item:rotate-45 group-data-open/item:border-transparent group-data-open/item:bg-accent group-data-open/item:text-bg"
          >
            <Plus className="size-4" />
          </span>
        </button>
      </h3>

      {/* Animates height with grid rows (0fr → 1fr). Closed panels are inert, so
          they are skipped by keyboard and screen readers. */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!isOpen}
        className={`grid transition-[grid-template-rows] duration-300 ease-out-expo ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pr-5 pb-5 pl-[4.25rem] sm:pr-6 sm:pl-[4.5rem]">
            <p className="max-w-2xl leading-relaxed text-muted text-pretty">{faq.a}</p>
            <Link
              to={`/#faq-${faq.slug}`}
              className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.72rem] text-muted transition-colors hover:text-accent"
            >
              <Link2 className="size-3.5" aria-hidden="true" />
              Link to this answer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Several answers can be open at once. With one-at-a-time, opening a question
 * collapses the one above it and yanks the new one away from the pointer; it
 * also stops a visitor comparing, say, pricing and timeline side by side.
 */
export default function Faq() {
  const { hash } = useLocation();
  const linked = hash.startsWith("#faq-") ? hash.slice(5) : null;
  // Visitor toggles override the default (the deep-linked answer, else the first).
  const [toggled, setToggled] = useState({});

  const isOpen = (faq, i) => toggled[faq.slug] ?? (linked ? faq.slug === linked : i === 0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="py-24 md:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading index={sectionIndex("faq")} eyebrow="Before you ask" title="The questions I usually get first." titleId="faq-title">
              Including what I don't do — it saves us both a call.
            </SectionHeading>
            <Reveal delay={0.1} className="mt-8 hidden text-sm leading-relaxed text-muted lg:block">
              Something missing?{" "}
              <Link to="/#contact" className="font-medium text-accent underline-offset-4 hover:underline">
                Ask me in the form
              </Link>
              .
            </Reveal>
          </div>
        </div>

        <Reveal className="space-y-3 lg:col-span-8">
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.slug}
              faq={faq}
              isOpen={isOpen(faq, i)}
              onToggle={() => setToggled((previous) => ({ ...previous, [faq.slug]: !isOpen(faq, i) }))}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
