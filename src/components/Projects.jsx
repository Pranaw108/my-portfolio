import { motion } from 'framer-motion';
import { projects } from '../data';

export default function Projects() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="projects" className="py-24 px-6 bg-[#0f213a]">
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}
          className="text-3xl font-bold mb-12 flex items-center gap-4 text-white"
        >
          <span className="w-8 h-1 bg-[#10B981] block"></span> Featured Projects
        </motion.h2>
        
        <div className="space-y-12">
          {projects.map((project, idx) => (
            <motion.div 
              key={idx} 
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}
              whileHover={{ scale: 1.01 }} /* Adds a subtle interaction on hover */
              className="bg-[#0B192C] rounded-2xl p-8 border border-gray-800 hover:border-[#10B981] transition-all group"
            >
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#10B981] transition-colors">{project.title}</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4 text-gray-300">
                  <div><strong className="text-white block mb-1">Problem Statement:</strong>{project.problem}</div>
                  <div><strong className="text-white block mb-1">Approach:</strong>{project.approach}</div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#10B981]/10 p-4 rounded-lg border border-[#10B981]/20">
                    <strong className="text-[#10B981] block mb-1">Business Impact:</strong>
                    <span className="text-gray-200">{project.impact}</span>
                  </div>
                  <div>
                    <strong className="text-white block mb-2">Tech Stack:</strong>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, i) => (
                        <span key={i} className="text-xs font-mono bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}