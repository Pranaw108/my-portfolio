import Hero from "../sections/Hero";
import Services from "../sections/Services";
import Work from "../sections/Work";
import Experience from "../sections/Experience";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Credentials from "../sections/Credentials";
import Faq from "../sections/Faq";
import StartProject from "../sections/StartProject";
import ContactPanel from "../sections/Contact";

/**
 * Order follows what a visitor needs to decide: what I can do for them,
 * proof it works, who I am, the usual objections, then the ask.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Work />
      <Experience />
      <About />
      <Skills />
      <Credentials />
      <Faq />
      <StartProject />
      <ContactPanel />
    </>
  );
}
