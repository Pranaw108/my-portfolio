import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Users, Code2, Database, Brain,
  MessageCircle, Search, Link2Icon, Layers
} from "lucide-react";
import Footer from "../components/Footer";
import useDisableInspect from "../hooks/useDisableInspect";
import { NavLink } from "react-router-dom";

export default function Projects() {
  useDisableInspect();
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = [

    {
      id: 0,
      title: "Space Launch Analytics",
      description: "End-to-end data analytics project for global space launch operations and mission performance analysis.",
      image: "/Launch Sites.png",
      technologies: [
        "Python",
        "Pandas",
        "NumPy",
        "MySQL",
        "SQL",
        "Power BI"
      ],
      category: "data",
      status: "completed",
      githubUrl: "https://github.com/Pranaw108/Space_Launch_Analysis.git",
      linkUrl: null,
      year: "2026",
      team: "Solo Project",
      icon: Database,
      fallbackColor: "from-indigo-500 to-blue-600",
    },
    
    {
      id: 1,
      title: "E-commerce Sales & Segmentation Platform",
      description: "Django backend and ML clustering for retail analytics.",
      image: "/project-img/ecommerce-dash.png",
      placeholderImage: "https://placehold.co/800x400/3B82F6/FFFFFF?text=E-Commerce+Analytics",
      technologies: ["Django", "Python", "DRF", "Scikit-Learn", "Pandas", "K-Means"],
      category: "data",
      status: "completed",
      githubUrl: "https://github.com/Pranaw108",
      linkUrl: null,
      year: "2026",
      team: "Solo Project",
      icon: Database,
      fallbackColor: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Real-Time Sentiment Analysis API",
      description: "NLP sentiment classification deployed via Django.",
      fullDescription: "Designed a scalable Django web application that ingests product reviews and social media comments. Built an NLP pipeline to perform sentiment analysis and topic modeling, and packaged the classification model as a REST API endpoint using Django REST Framework.",
      image: "/project-img/sentiment-api.png",
      placeholderImage: "https://placehold.co/800x400/10B981/FFFFFF?text=Sentiment+Analysis",
      technologies: ["Django", "Python", "NLP", "Pandas", "Matplotlib"],
      category: "ai",
      status: "completed",
      githubUrl: "https://github.com/Pranaw108",
      linkUrl: null,
      year: "2026",
      team: "Solo Project",
      icon: Brain,
      fallbackColor: "from-purple-500 to-pink-500"
    },

    {
      id: 4,
      title: "Air Quality Analysis",
      description: "Data analytics and visualization project.",
      fullDescription: "Air Quality Analysis project focuses on analyzing air pollution data using Python libraries. The project involves cleaning datasets, visualizing trends, and deriving insights to understand air quality patterns.",
      image: "/project-img/data-dashboard.png",
      placeholderImage: "https://placehold.co/800x400/EF4444/FFFFFF?text=Air+Quality+Analysis",
      technologies: ["Python", "NumPy", "Pandas", "Matplotlib"],
      category: "data",
      status: "in-progress",
      githubUrl: null,
      liveUrl: null,
      year: "2025",
      team: "Solo",
      icon: Database,
      fallbackColor: "from-emerald-400 to-teal-600"
    },

    {
      id: 5,
      title: "Travel & Tourism UI",
      description: "Modern Travel and tourism UI design.",
      image: "/bhakti1.png",
      technologies: ["React", "Tailwind CSS", "JavaScript"],
      category: "web",
      status: "in-progress",
      githubUrl: "https://github.com/15shivamgit/BhaktiYatra",
      linkUrl: "https://bhakti-yatra-one.vercel.app/",
      year: "2025",
      team: "Solo & Github",
      icon: Code2,
      fallbackColor: "from-yellow-400 to-orange-500",
    },
    {
      id: 6,
      title: "LMS-Student Module",
      description: "Interactive data visualization dashboard.",
      image: "/lmsfrontend.png",
      technologies: ["Python", "Tailwind CSS", "Django"],
      category: "web",
      status: "in-progress",
      githubUrl: "https://github.com/15shivamgit/LMS-Student--Module-Backend-",
      linkUrl: "https://lms-student-module-frontend.vercel.app/",
      year: "2025",
      team: "Team Project",
      icon: Database,
      fallbackColor: "from-indigo-500 to-purple-500",
    },

  ];

  const categories = [
    { id: "all", label: "All Projects", icon: Layers },
    { id: "web", label: "Web", icon: Code2 },
    { id: "ai", label: "AI / ML", icon: Brain },
    { id: "data", label: "Data Analytics", icon: Database },
  ];

  const statusColors = {
    completed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800",
    "in-progress": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-800",
    planned: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800",
  };

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const filteredProjects = projects.filter((p) => {
    const matchCategory = filter === "all" || p.category === filter;
    const matchSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin h-16 w-16 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Projects</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Explore my portfolio of projects ranging from web development to AI/ML and data analytics. Each project represents a practical application of scalable architecture and data insights.
            </p>
          </motion.div>

          {/* Filters and Search */}
          <div className="mb-10 space-y-6">
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">

              {/* Category Filters */}
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setFilter(c.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${filter === c.id
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-105"
                        : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105 border border-gray-200 dark:border-gray-700"
                      }`}
                  >
                    <c.icon className="w-4 h-4" />
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full lg:w-80 group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center lg:text-left">
              Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
            </div>
          </div>

          {/* Projects Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col group hover:ring-2 hover:ring-blue-500/50"
                >
                  {/* Project Header Image */}
                  <div className="relative h-52 overflow-hidden bg-gray-100 dark:bg-gray-900">
                    {!imageErrors[project.id] ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        onError={() => handleImageError(project.id)}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${project.fallbackColor} flex flex-col items-center justify-center p-6 text-center`}>
                        <project.icon className="w-12 h-12 text-white/90 mb-3 drop-shadow-md" />
                        <h3 className="text-xl font-bold text-white drop-shadow-md">{project.title}</h3>
                      </div>
                    )}

                    <div className="absolute top-4 right-4 z-10">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm ${statusColors[project.status]}`}>
                        {project.status.replace("-", " ")}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 flex-grow">
                      {project.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                      <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-700/50 px-2.5 py-1 rounded-md">
                        <Calendar className="w-4 h-4" />
                        <span>{project.year}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-700/50 px-2.5 py-1 rounded-md">
                        <Users className="w-4 h-4" />
                        <span>{project.team}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span key={index} className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md text-xs font-semibold">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md text-xs font-medium">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                      <NavLink
                        to={`/projects/${project.id}`}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-xl transition-colors duration-200 font-medium flex items-center justify-center gap-2 shadow-sm"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Details
                      </NavLink>

                      {project.linkUrl && (
                        <a
                          href={project.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl transition-colors flex items-center justify-center tooltip-trigger"
                          title="Live Link"
                        >
                          <Link2Icon className="w-5 h-5" />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl transition-colors flex items-center justify-center"
                          title="Source Code"
                        >
                          <Code2 className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-sm max-w-md mx-auto border border-gray-100 dark:border-gray-700">
                <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">No projects found</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Try adjusting your search or filter criteria to find what you&apos;re looking for.
                </p>
                <button onClick={() => { setFilter('all'); setSearchTerm(''); }} className="mt-6 text-blue-600 hover:text-blue-700 font-medium">
                  Clear all filters
                </button>
              </div>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-10 sm:p-12 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">Interested in Collaboration?</h2>
              <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto relative z-10">
                I&apos;m always open to discussing new projects, data architecture challenges, and opportunities.
              </p>
              <NavLink
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-3.5 rounded-xl font-bold hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-lg relative z-10"
              >
                <MessageCircle className="w-5 h-5" />
                Get In Touch
              </NavLink>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}