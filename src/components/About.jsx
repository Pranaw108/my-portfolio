import { motion } from 'framer-motion';

export default function About() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="about" className="py-24 px-6 bg-[#0f213a]">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.2 }} 
        variants={fadeUp}
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-4 text-white">
          <span className="w-8 h-1 bg-[#10B981] block"></span> About Me
        </h2>
        <div className="bg-[#0B192C] p-8 rounded-2xl border border-gray-800">
          <p className="text-gray-300 text-lg leading-relaxed border-l-4 border-[#10B981] pl-6 italic">
            "I am a Data Scientist with a strong foundation in scalable programming and statistical analysis. My journey into data is driven by a desire to build robust systems—moving beyond messy notebooks into production-ready, object-oriented code. I specialize in extracting signals from noise and translating predictive models into measurable business outcomes. When I'm not optimizing queries or tuning models, I'm constantly refining my software engineering fundamentals to ensure my data pipelines are as reliable as they are insightful."
          </p>
        </div>
      </motion.div>
    </section>
  );
}