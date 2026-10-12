import { sectionIndex } from "../data/sections";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import AssistantChat from "../components/AssistantChat";

export default function AskMe() {
  return (
    <section id="ask" aria-labelledby="ask-title" className="border-t border-line py-24 md:py-32">
      <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        <SectionHeading
          index={sectionIndex("ask")}
          eyebrow="Ask me anything"
          title="Skip the scrolling."
          titleId="ask-title"
          className="lg:max-w-none"
        >
          Ask about his skills, projects, experience or rates and get a straight answer. It is built from this
          site's own data rather than a language model, so it will never invent a project he has not built.
        </SectionHeading>

        <Reveal>
          <AssistantChat titleId="ask-panel-title" className="h-[26rem] shadow-lift sm:h-[30rem]" />
        </Reveal>
      </div>
    </section>
  );
}
