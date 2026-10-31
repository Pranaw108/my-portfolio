import Hero from "../sections/Hero";
import Proof from "../sections/Proof";
import Services from "../sections/Services";
import Work from "../sections/Work";
import AskMe from "../sections/AskMe";
import Experience from "../sections/Experience";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Credentials from "../sections/Credentials";
import Faq from "../sections/Faq";
import StartProject from "../sections/StartProject";

/**
 * Order follows what a visitor needs to decide: the work itself first (recruiters
 * and clients both look for it), then what I can do for them, who I am, the
 * usual objections, then the ask. Keep in step with data/sections.js.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Proof />
      <Work />
      <Services />
      <AskMe />
      <Experience />
      <About />
      <Skills />
      <Credentials />
      <Faq />
      <StartProject />
    </>
  );
}
