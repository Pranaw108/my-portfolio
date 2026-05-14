import { motion } from 'framer-motion';

export default function Experience() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="experience" className="py-24 px-6 bg-[#0B192C]">
      <motion.div
        className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >

        
        {/* Experience Section */}
        <motion.div variants={fadeUp}>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-4 text-white">
            <span className="w-6 h-1 bg-[#10B981] block"></span> Experience
          </h2>
          <div className="border-l-2 border-gray-800 pl-8 relative ml-3">
            <div className="absolute w-4 h-4 bg-[#10B981] rounded-full -left-[9px] top-1.5 ring-4 ring-[#0B192C]"></div>
            <div className="bg-[#0f213a] p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
              <h3 className="text-xl font-bold text-white mb-1">Independent Data Science Developer</h3>
              <p className="text-[#10B981] text-sm font-medium mb-4">April 2026 – Present</p>
              <ul className="list-disc list-outside ml-4 text-gray-300 space-y-3 text-sm leading-relaxed">
                <li>Engineered an end-to-end customer churn pipeline in Python, utilizing object-oriented principles to create reusable data-cleaning modules, reducing data prep time by 40%.</li>
                <li>Optimized complex SQL queries on relational databases to extract multi-table features for over 100k+ mock user records.</li>
                <li>Authored comprehensive technical documentation and deployed predictive models that emphasized business KPIs (ROI, CLV) over purely academic metrics.</li>
              </ul>
            </div>
          </div>
        </motion.div>



        {/* Education Section */}
        <motion.div variants={fadeUp}>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-4 text-white">
            <span className="w-6 h-1 bg-[#10B981] block"></span> Education
          </h2>
          <div className="bg-[#0f213a] p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
            <h3 className="text-xl font-bold text-white mb-1">MCA</h3>
            <p className="text-[#10B981] font-medium mb-6">AKS University</p>
            <div className="bg-[#0B192C] p-4 rounded-lg border border-gray-800">
              <strong className="text-white block mb-2 text-sm uppercase tracking-wider">Relevant Coursework</strong>
              <div className="flex flex-wrap gap-2">
                {["Python Programming with libraries (NumPy, Pandas, MatplotLib, Seaborn)", "Statistical Analysis", "Database Management"].map((course, i) => (
                  <span key={i} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}