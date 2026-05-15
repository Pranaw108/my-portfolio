import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Briefcase, Code, Download, MessageCircle, Award, Calendar, Users, Target } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import useDisableInspect from "../hooks/useDisableInspect";

// Extracted static data to prevent re-creation on every render
const stats = [
  { number: "1+ Year", label: "Experience", icon: Award },
  { number: "5+", label: "Projects", icon: Target },
  { number: "5+", label: "Technologies", icon: Users },
];

const contactLinks = [
  { icon: Phone, text: "+91 8109260602", link: "tel:+918109260602" },
  { icon: Mail, text: "pranawgautam@gmail.com", link: "mailto:pranawgautam@gmail.com" },
  { icon: Briefcase, text: "LinkedIn", link: "https://www.linkedin.com/in/pranaw-gautam9" },
  { icon: Code, text: "GitHub", link: "https://github.com/Pranaw108" },
];

const skillsMarquee = ["Data Scientist", "Django Developer", "Python Expert", "Machine Learning", "Backend Architecture"];

export default function Home() {
  useDisableInspect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="animate-spin h-16 w-16 border-4 border-blue-600 border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="relative max-w-5xl mx-auto px-4 text-center animate-fade-in">
          
          {/* --- NEW PROFILE IMAGE SECTION --- */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 group">
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
            
            {/* Profile Image */}
            <img
              src="/profile.jpeg" 
              alt="Pranaw Gautam"
              className="relative w-full h-full object-cover rounded-full border-4 border-white/20 shadow-2xl group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
            Pranaw <span className="text-blue-400">Gautam</span>
          </h1>

          {/* Optimized Marquee */}
          <div className="mb-8 relative overflow-hidden h-10 max-w-3xl mx-auto">
            <div className="animate-slow-marquee whitespace-nowrap flex gap-12">
              {[...skillsMarquee, ...skillsMarquee].map((skill, i) => (
                <span key={i} className="text-xl md:text-2xl font-medium text-gray-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span> {skill}
                </span>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-900 to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-900 to-transparent"></div>
          </div>

          <p className="text-lg md:text-xl mb-10 text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Building scalable backend architectures and extracting actionable insights through advanced data science.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/pranaw_resume.pdf" download className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2">
              <Download size={20} /> Download Resume
            </a>
            <button onClick={() => document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" })} className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3.5 rounded-xl transition-all flex items-center gap-2 backdrop-blur-sm">
              <MessageCircle size={20} /> Let's Talk
            </button>
          </div>
        </div>
      </section>

      {/* Stats & Quick Contact */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Impact & Focus</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Leveraging robust Django backend systems and machine learning models to solve complex problems and deliver data-driven business solutions.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => stat.label === "Projects" ? (
                <Link 
                  key={i} 
                  to="/projects" 
                  className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl hover:ring-2 hover:ring-blue-500 hover:-translate-y-1 transition-all cursor-pointer shadow-sm group"
                >
                  <stat.icon className="w-6 h-6 text-blue-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">{stat.number}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </Link>
              ) : (
                <div key={i} className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                  <stat.icon className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <div className="font-bold text-gray-900 dark:text-white">{stat.number}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div id="contact-section" className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-3xl p-8 shadow-sm border border-blue-100 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Connect</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900/50 rounded-2xl">
                <MapPin className="text-blue-500 w-5 h-5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Jawahar Nagar, Satna (M.P.)</span>
              </div>
              {contactLinks.map((item, i) => (
                <a key={i} href={item.link} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900/50 hover:ring-2 ring-blue-500/50 rounded-2xl transition-all group">
                  <item.icon className="text-blue-500 w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{item.text}</span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>
      <Footer />
      <style>{`
        .animate-slow-marquee { animation: slow-marquee 30s linear infinite; }
        @keyframes slow-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}