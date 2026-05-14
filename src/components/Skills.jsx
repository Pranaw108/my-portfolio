import { motion } from 'framer-motion';
import { skills } from '../data';

export default function Skills() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="skills" className="py-24 px-6 bg-[#0B192C]">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.2 }} 
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeUp} className="text-3xl font-bold mb-12 flex items-center gap-4 text-white">
          <span className="w-8 h-1 bg-[#10B981] block"></span> Core Competencies
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, skillList], idx) => (
            <motion.div 
              key={idx} 
              variants={fadeUp} 
              whileHover={{ y: -5 }}
              className="bg-[#0f213a] p-6 rounded-xl border border-gray-800 hover:border-[#10B981]/50 transition-all shadow-lg"
            >
              <h3 className="text-[#10B981] font-semibold mb-4 text-lg">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillList.map((skill, i) => (
                  <span key={i} className="bg-[#0B192C] text-gray-300 text-sm px-3 py-1 rounded-full border border-gray-700 hover:border-[#10B981] transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}