import { useEffect, useState } from "react";
// 👉 FIX: Added 'Award' to the imports below
import { Code, Database, Server, BookOpen, GraduationCap, Calendar, Terminal, Award } from "lucide-react";
import Footer from "../components/Footer";
import useDisableInspect from "../hooks/useDisableInspect";

const technicalSkills = [
  { category: "Languages", skills: ["Python", "JavaScript", "SQL"], icon: Code, color: "text-blue-500 bg-blue-100 dark:bg-blue-900/30" },
  { category: "Backend & Web", skills: ["Django", "REST APIs", "React"], icon: Server, color: "text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30" },
  { category: "Data Science", skills: ["Pandas", "NumPy", "Machine Learning"], icon: Database, color: "text-purple-500 bg-purple-100 dark:bg-purple-900/30" },
  { category: "Tools", skills: ["Git", "Docker", "Jupyter"], icon: Terminal, color: "text-orange-500 bg-orange-100 dark:bg-orange-900/30" },
];

export default function About() {
  useDisableInspect();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("skills");

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors py-16">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">About Me</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A dedicated <span className="text-blue-600 dark:text-blue-400 font-bold">Data Scientist</span> and <span className="text-emerald-600 dark:text-emerald-400 font-bold">Django Developer</span> turning raw data into strategic assets.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-10">
          {[
            { id: "skills", label: "Skills & Tech Stack", icon: Code },
            { id: "education", label: "Education", icon: GraduationCap }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === tab.id ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-5 h-5" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700 min-h-[400px]">
          {activeTab === 'skills' && (
            <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
              {technicalSkills.map((group, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-xl ${group.color}`}>
                      <group.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{group.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium shadow-sm border border-gray-200 dark:border-gray-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
              {[
                { degree: "MCA", school: "AKS University, Satna", year: "2024 - 2026", status: "Current" },
                { degree: "BCA", school: "Shri RamaKrishna College, Satna", year: "2015 - 2018", status: "Completed", grade: "72%" }
              ].map((edu, i) => (
                <div key={i} className="flex gap-6 p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                  <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex-shrink-0">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                      {edu.degree}
                      <span className={`text-xs px-2.5 py-1 rounded-full ${edu.status === 'Current' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'} dark:bg-opacity-20`}>{edu.status}</span>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{edu.school}</p>
                    <div className="flex gap-4 mt-3 text-sm text-gray-500 font-medium">
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4"/> {edu.year}</span>
                      {edu.grade && <span className="flex items-center gap-1"><Award className="w-4 h-4"/> {edu.grade}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
      <Footer />
    </div>
  );
}