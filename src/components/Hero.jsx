import { motion } from 'framer-motion';
import { FileText, ChevronRight } from 'lucide-react';

// Custom SVG to replace the removed Lucide Github icon
const GithubIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export default function Hero() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative">
      <motion.div 
        className="max-w-4xl mx-auto text-center"
        initial="hidden" animate="visible" 
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
          Building Data Systems That <br className="hidden md:block"/> 
          <span className="text-[#10B981]">Drive Strategic Decisions.</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          I transform raw, complex data into scalable solutions and actionable business intelligence, bridging the gap between technical execution and business strategy.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
          <a href="#projects" className="bg-[#10B981] text-[#0B192C] font-semibold px-8 py-3 rounded-lg hover:bg-[#0da070] hover:scale-105 transition-all flex items-center gap-2">
            View My Work <ChevronRight size={20} />
          </a>
          <a href="#contact" className="bg-transparent border border-gray-600 text-white px-6 py-3 rounded-lg hover:border-[#10B981] hover:text-[#10B981] transition-colors flex items-center gap-2">
            <GithubIcon size={20} /> GitHub
          </a>
          <a href="#contact" className="bg-transparent border border-gray-600 text-white px-6 py-3 rounded-lg hover:border-[#10B981] hover:text-[#10B981] transition-colors flex items-center gap-2">
            <FileText size={20} /> Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}