import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

// Custom SVGs to replace the removed Lucide brand icons
const GithubIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export default function Contact() {
  const fadeUp = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-[#0f213a] border-t border-gray-800 text-center relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-[#10B981]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div 
        className="max-w-2xl mx-auto relative z-10"
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.5 }} 
        variants={fadeUp}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Ready to build solutions?</h2>
        <p className="text-xl text-gray-400 mb-12 max-w-lg mx-auto">
          Let's connect and discuss how my engineering rigor can bring measurable value to your team.
        </p>
        
        <div className="flex justify-center gap-6">
          <a 
            href="mailto:pranawgautam.com" 
            className="p-4 bg-[#0B192C] text-gray-300 rounded-2xl hover:text-white hover:bg-[#10B981] hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(16,185,129,0.2)] border border-gray-700 hover:border-[#10B981] transition-all duration-300 group"
            aria-label="Email Me"
          >
            <Mail size={28} className="group-hover:scale-110 transition-transform" />
          </a>
          <a 
            href="https://linkedin.com/in/pranaw-gautam9" 
            target="_blank" 
            rel="noreferrer" 
            className="p-4 bg-[#0B192C] text-gray-300 rounded-2xl hover:text-white hover:bg-[#10B981] hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(16,185,129,0.2)] border border-gray-700 hover:border-[#10B981] transition-all duration-300 group"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon size={28} className="group-hover:scale-110 transition-transform" />
          </a>
          <a 
            href="https://github.com/Pranaw108" 
            target="_blank" 
            rel="noreferrer" 
            className="p-4 bg-[#0B192C] text-gray-300 rounded-2xl hover:text-white hover:bg-[#10B981] hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(16,185,129,0.2)] border border-gray-700 hover:border-[#10B981] transition-all duration-300 group"
            aria-label="GitHub Profile"
          >
            <GithubIcon size={28} className="group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}