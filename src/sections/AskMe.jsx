import { Database, Link2, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { sectionIndex } from "../data/sections";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import AssistantChat from "../components/AssistantChat";

const promises = [
  { icon: Database, title: "Built from this page", body: "Every answer is assembled from the same data that renders the site." },
  { icon: ShieldCheck, title: "Never guesses", body: "Not a language model. If it doesn't know, it says so and points you to him." },
  { icon: Link2, title: "Shows its source", body: "Answers link to the case study or section they came from." },
];

export default function AskMe() {
  return (
    <section id="ask" aria-labelledby="ask-title" className="border-t border-line py-24 md:py-32">
      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            index={sectionIndex("ask")}
            eyebrow="Ask me anything"
            title="Skip the scrolling."
            titleId="ask-title"
            className="lg:max-w-none"
          >
            Ask about his skills, projects, experience or rates and get a straight answer, with a link to where it
            came from.
          </SectionHeading>

          <Reveal delay={0.08}>
            <ul className="mt-8 space-y-4">
              {promises.map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex gap-3.5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-medium text-ink">{title}</p>
                    <p className="mt-0.5 text-[0.95rem] leading-relaxed text-muted text-pretty">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted">
              Rather talk to a person?{" "}
              <Link to="/#contact" className="font-medium text-accent underline-offset-4 hover:underline">
                Write to him directly
              </Link>
              .
            </p>
          </Reveal>
        </div>

        <Reveal className="min-w-0">
          <AssistantChat titleId="ask-panel-title" className="h-[34rem] shadow-lift sm:h-[36rem]" />
        </Reveal>
      </div>
    </section>
  );
}
