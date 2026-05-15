import { useState, useEffect } from "react";
import {
  Shield, Database, Award, Calendar, MapPin, Building,
  ExternalLink, Download, Star, Code, Brain, Trophy, Search, FileText
} from "lucide-react";
import Footer from "../components/Footer";
import useDisableInspect from "../hooks/useDisableInspect";
import { NavLink } from "react-router-dom";

// 1. Extract static data outside the component to boost performance
const experiences = []; // Add work experiences here later

const certificates = [
  {
    id: 1, type: "certificate", title: "Advanced Program on Amazon Web Services",
    issuer: "Anudip Foundation (Supported by Accenture)", period: "March 2025", location: "Indore, MP",
    description: "Completed 332 hours of intensive training on Amazon Web Services covering cloud fundamentals, compute, storage, and security concepts.",
    skills: ["AWS", "Cloud Computing", "EC2", "S3", "IAM"],
    certificateUrl: "/certificates/aws.jpg", icon: Database, category: "certificate", status: "completed", color: "from-orange-500 to-yellow-500",
  },
  {
    id: 2, type: "certificate", title: "Cybersecurity Analyst Job Simulation",
    issuer: "TATA (Forage)", period: "July 2025", location: "Remote",
    description: "Completed hands-on cybersecurity job simulation focusing on IAM fundamentals, security assessment, and platform integration.",
    skills: ["Cybersecurity", "IAM", "Risk Assessment", "Security Analysis"],
    certificateUrl: "/certificates/cybersecurity_certificate.pdf", icon: Shield, category: "certificate", status: "completed", color: "from-blue-600 to-indigo-600",
  },
  {
    id: 3, type: "certificate", title: "Frontend Web Development",
    issuer: "Online Learning Platform", period: "2024", location: "Remote",
    description: "Frontend development training covering HTML, CSS, JavaScript, responsive design, and UI best practices.",
    skills: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    certificateUrl: "/certificates/frontend.pdf", icon: Code, category: "certificate", status: "completed", color: "from-pink-500 to-rose-500",
  },
  {
    id: 4, type: "certificate", title: "Python Programming",
    issuer: "GeeksforGeeks", period: "2024", location: "Remote",
    description: "Completed Python programming course focusing on fundamentals, data structures, and algorithmic thinking.",
    skills: ["Python", "Data Structures", "Problem Solving"],
    certificateUrl: "/certificates/greek.pdf", icon: Brain, category: "certificate", status: "completed", color: "from-green-500 to-lime-500",
  },
];

const allItems = [...experiences, ...certificates];

const categories = [
  { id: "all", label: "All", icon: Award, count: allItems.length },
  { id: "work", label: "Work Experience", icon: Building, count: experiences.length },
  { id: "certificate", label: "Certificates", icon: Trophy, count: certificates.length },
];

export default function Certificates() {
  useDisableInspect();
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => setMounted(true), []);

  if (!mounted) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="animate-spin h-16 w-16 border-4 border-blue-600 border-t-transparent rounded-full" />
    </div>
  );

  // 2. Streamlined filter logic
  const filteredItems = allItems.filter(item => {
    const search = searchTerm.toLowerCase();
    const matchCategory = filter === "all" || item.category === filter;
    const matchSearch = item.title.toLowerCase().includes(search) || 
                        (item.issuer || item.company || "").toLowerCase().includes(search) || 
                        item.skills.some(s => s.toLowerCase().includes(search));
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            Experience & <span className="text-blue-500">Credentials</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Validating expertise in Data Science, Backend Architecture, and modern technologies through professional certifications and hands-on experience.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Building, val: experiences.length, label: "Work Experiences", color: "text-blue-500 bg-blue-100 dark:bg-blue-900/30" },
            { icon: Trophy, val: certificates.length, label: "Certificates", color: "text-green-500 bg-green-100 dark:bg-green-900/30" },
            { icon: Star, val: "2+", label: "Years Learning", color: "text-purple-500 bg-purple-100 dark:bg-purple-900/30" },
            { icon: Award, val: "10+", label: "Skills Mastered", color: "text-orange-500 bg-orange-100 dark:bg-orange-900/30" },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-3xl p-6 text-center shadow-sm border border-gray-100 dark:border-gray-700">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.val}</div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c.id} onClick={() => setFilter(c.id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all ${
                  filter === c.id ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                } border border-gray-100 dark:border-gray-700`}>
                <c.icon className="w-4 h-4" /> {c.label} <span className="opacity-60 text-xs">({c.count})</span>
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
            <input type="text" placeholder="Search skills or titles..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Timeline/Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:ring-2 hover:ring-blue-500/20 flex flex-col">
              
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg text-white`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">{item.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">{item.issuer || item.company}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-6 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-blue-500" /> {item.period}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-emerald-500" /> {item.location}</span>
                {item.credentialId && <span className="flex items-center gap-1.5 text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md">ID: {item.credentialId}</span>}
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow leading-relaxed">
                {item.description}
              </p>

              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-bold border border-blue-100 dark:border-blue-800/30">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Actions */}
              <div className="flex gap-3 mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
                <button onClick={() => window.open(item.certificateUrl, "_blank")} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-xl transition-all font-bold shadow-sm">
                  <FileText className="w-4 h-4" /> View {item.type === 'certificate' ? 'Certificate' : 'Details'}
                </button>
                {item.certificateUrl && (
                  <a href={item.certificateUrl} download={`${item.title}.pdf`} className="flex items-center justify-center p-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-all">
                    <Download className="w-5 h-5" />
                  </a>
                )}
                {item.verificationUrl && (
                  <a href={item.verificationUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center p-2.5 bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 text-emerald-700 dark:text-emerald-400 rounded-xl transition-all">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
             <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 max-w-md mx-auto shadow-sm border border-gray-100 dark:border-gray-700">
                <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No credentials found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try adjusting your search filters.</p>
                <button onClick={() => {setFilter('all'); setSearchTerm('');}} className="mt-4 text-blue-600 font-bold hover:underline">Clear Filters</button>
             </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl p-10 text-center text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <h2 className="text-3xl font-bold mb-4 relative z-10">Data-Driven Solutions Await</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto relative z-10">
            Let's leverage these skills to build scalable Django architectures and extract actionable insights through advanced data science.
          </p>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <NavLink to="/contact" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2">
              <Award className="w-5 h-5" /> Hire Me
            </NavLink>
            <NavLink to="/projects" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3.5 rounded-xl font-bold transition-all flex items-center gap-2">
              <Code className="w-5 h-5" /> View Projects
            </NavLink>
          </div>
        </div>

      </div>
      <style>{`.animate-fade-in { animation: fadeIn 0.4s ease-out; } @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}