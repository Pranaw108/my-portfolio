import { useState, useEffect } from "react";
import {
  Award, Calendar, MapPin, Download, Users, Code, 
  FileText, CheckCircle, Target, Zap, Trophy, Brain
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import useDisableInspect from "../hooks/useDisableInspect";

// Extracted static data for cleaner component logic
const rmatSkills = ["Business Logic", "Analytical Reasoning", "Decision Making", "Risk Thinking"];

const highlights = [
  { icon: Zap, title: "National Exposure", desc: "Competed against India's top management institutes" },
  { icon: Brain, title: "Risk Strategy", desc: "Hands-on experience in enterprise risk scenarios" },
  { icon: Target, title: "Team Excellence", desc: "Strong collaboration & leadership under pressure" },
];

const teamMembers = [
  "Yukti Singh", "Pranaw Gautam", "Shivam Kumar", "Sana Khan", 
  "Smriti Nigam", "Rahul Dwivedi", "Sahendra Singh", "Ankush Gupta", "Akanksha Garg"
];

export default function Achievement() {
  useDisableInspect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-5 py-2.5 rounded-full mb-6 border border-blue-200 dark:border-blue-800">
            <Trophy className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm text-blue-700 dark:text-blue-300 font-bold tracking-wide uppercase">
              National Level Achievement
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            GOER 2025 – National Finalist
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Selected among the <span className="text-blue-600 dark:text-blue-400 font-bold">Top 10 Universities in India</span> at the prestigious Game of Enterprise Risk (GOER 2025) organized by Institute of Risk Management (IRM), India Affiliate.
          </p>
        </div>

        {/* Main Event Card */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl shadow-sm hover:shadow-xl transition-all p-8 md:p-10 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 border-b border-gray-100 dark:border-gray-700 pb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">AKS University, Satna (M.P.)</h2>
              <div className="flex flex-wrap gap-5 text-sm font-medium text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-500" /> 5 July 2025</span>
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-500" /> Mumbai (SDA Bocconi)</span>
                <span className="flex items-center gap-2"><Users className="w-4 h-4 text-purple-500" /> Team: Intrepid Explorers</span>
              </div>
            </div>
            <span className="px-5 py-2.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-800">
              Top 10 Finalist
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-10 text-lg">
            The MCA team of AKS University delivered an exceptional performance through multiple competitive stages, qualifying for the final national round alongside premier institutes like IIMs, Symbiosis, and Welingkar. Demonstrated strong analytical thinking, teamwork, and risk-based decision-making.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button onClick={() => window.open("/ibm_certificate.jpg", "_blank")} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-xl transition-all font-bold shadow-md shadow-blue-500/20">
              <FileText className="w-5 h-5" /> View Certificate
            </button>
            <a href="/ibm_certificate.jpg" download="GOER_Achievement.jpg" className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-xl transition-all font-bold">
              <Download className="w-5 h-5" /> Download
            </a>
          </div>
        </div>

        {/* Two Column Section: RMAT & Team */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          
          {/* RMAT Achievement */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 relative z-10">
              <Award className="w-8 h-8 text-yellow-400" /> RMAT Score
            </h3>
            <p className="text-lg text-blue-100 mb-8 relative z-10">
              Scored an outstanding <span className="text-white font-extrabold bg-white/20 px-3 py-1 rounded-lg ml-1">96% (240/250)</span> in the Risk Management Aptitude Test by IRM.
            </p>
            <div className="grid grid-cols-2 gap-3 relative z-10">
              {rmatSkills.map((skill, i) => (
                <div key={i} className="bg-black/20 backdrop-blur-sm rounded-xl p-3 flex items-center gap-2 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-8 md:p-10 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Team & Mentorship</h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
                <span className="text-xl">🎯</span>
                <p>Mentor: <span className="font-bold text-gray-900 dark:text-white">Prof. Akhilesh A. Waoo</span></p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
                <span className="text-xl">👩‍🎓</span>
                <p>Leader: <span className="font-bold text-gray-900 dark:text-white">Aditi Singh</span></p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 mt-6">Team Members</p>
                <div className="flex flex-wrap gap-2">
                  {teamMembers.map((member, i) => (
                    <span key={i} className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${
                      member === "Pranaw Gautam" 
                      ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800" 
                      : "bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600"
                    }`}>
                      {member}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Key Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {highlights.map((item, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 text-center hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <item.icon className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">{item.title}</h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gray-100 dark:bg-gray-800/50 rounded-3xl p-10 text-center border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Want to see more?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Explore my technical projects and other professional credentials.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/certificates" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md">
              <Award className="w-5 h-5" /> All Certificates
            </Link>
            <Link to="/projects" className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 px-8 py-3.5 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
              <Code className="w-5 h-5" /> View Projects
            </Link>
          </div>
        </div>

      </div>
      <Footer />
      <style>{`.animate-fade-in { animation: fadeIn 0.4s ease-out; } @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}