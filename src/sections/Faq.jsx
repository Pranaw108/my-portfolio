import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "../data/faqs";
import { sectionIndex } from "../data/sections";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

function FaqItem({ faq, isOpen, onToggle, panelId, buttonId }) {
  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full cursor-pointer items-start justify-between gap-6 py-5 text-left transition-colors hover:text-accent"
        >
          <span className="text-lg font-medium tracking-[-0.015em] text-pretty">{faq.q}</span>
          <Plus
            className={`mt-1 size-5 shrink-0 text-muted transition-transform duration-400 ease-out-expo group-hover:text-accent ${
              isOpen ? "rotate-45" : ""
            }`}
            aria-hidden="true"
          />
        </button>
      </h3>
      {/* Kept in the DOM and hidden, so in-page search can still find the answer. */}
      <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
        <p className="max-w-2xl pb-6 leading-relaxed text-muted text-pretty">{faq.a}</p>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          index={sectionIndex("faq")}
          eyebrow="Before you ask"
          title="The questions I usually get first."
          titleId="faq-title"
        >
          Including what I don't do — it saves us both a call.
        </SectionHeading>

        <Reveal className="mt-14 border-t border-line md:mt-16">
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.q}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              buttonId={`faq-q-${i}`}
              panelId={`faq-a-${i}`}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
