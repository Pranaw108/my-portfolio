import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="bg-[#0B192C] text-[#F8F9FA] min-h-screen font-sans selection:bg-[#10B981] selection:text-[#0B192C]">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
 
    </div>
  );
}