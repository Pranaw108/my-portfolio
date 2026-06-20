import { useState, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, ExternalLink, Calendar, Users,
  Code2, Brain, CheckCircle, Clock, Play, Database,
} from "lucide-react";
import Footer from "../components/Footer";
import useDisableInspect from "../hooks/useDisableInspect";

/* ================= PROJECT DATA ================= */

const projectsData = {

  0: {
    id: 0,
    title: "Space Launch Analytics",
    description: "Data analytics and business intelligence project.",
    fullDescription:
      "Space Launch Analytics is an end-to-end Data Analytics project designed to analyze global space launch operations, rocket performance, mission success rates, launch costs, payload efficiency, and orbital deployment trends. The project combines Python, SQL, MySQL, Pandas, NumPy, and Power BI to transform raw launch datasets into actionable business insights for strategic decision-making.",
    image: "/Overview.png",
    placeholderImage:
      "https://placehold.co/800x400/2563EB/FFFFFF?text=Space+Launch+Analytics",
    technologies: [
      "Python",
      "Pandas",
      "NumPy",
      "MySQL",
      "SQL",
      "SQLAlchemy",
      "Power BI"
    ],
    category: "data",
    status: "completed",
    githubUrl: "https://github.com/Pranaw108/Space_Launch_Analysis.git",
    liveUrl: null,
    year: "2026",
    team: "Solo Project",
    duration: "2 Months",
    features: [
      "Launch Success Rate Analysis",
      "Rocket Performance Evaluation",
      "Payload Efficiency Metrics",
      "Cost Per Kilogram Analysis",
      "Mission Reliability Ranking",
      "Trend Analysis Dashboard",
      "ISRO Mission Analytics",
      "Power BI Executive Dashboard"
    ],
    challenges: [
      "Cleaning and validating large launch datasets",
      "Feature engineering for business KPIs",
      "Building analytical data warehouse",
      "Designing meaningful business dashboards",
      "Handling mission outcome classification"
    ],
    learnings: [
      "Advanced Data Analysis using Pandas",
      "Business KPI Development",
      "SQL Analytics and Query Optimization",
      "Data Warehousing Concepts",
      "Power BI Dashboard Design",
      "ETL Pipeline Development",
      "Data Quality Assessment",
      "Business Intelligence Reporting"
    ],
    icon: Database,
  },

  1: {
    id: 1,
    title: "E-commerce Sales & Segmentation Platform",
    description: "Django backend and ML clustering for retail analytics.",
    fullDescription: "Developed a comprehensive backend using Django and DRF to process large-scale retail sales data. Implemented K-Means clustering to segment customers into high-value, at-risk, and loyal tiers, integrating the ML model directly into the Django backend to serve dynamic data via REST APIs.",
    image: "/project-img/ecommerce-dash.png",
    placeholderImage: "https://placehold.co/800x400/3B82F6/FFFFFF?text=E-Commerce+Analytics",
    technologies: ["Django", "Python", "DRF", "Scikit-Learn", "Pandas", "K-Means"],
    category: "data",
    status: "completed",

    features: [
      "Django REST API backend",
      "K-Means Customer Clustering",
      "RFM Metric Engineering",
      "Real-time data endpoints"
    ],
    challenges: ["Integrating Scikit-learn models into Django views", "Handling large dataset processing efficiently"],
    learnings: ["Django REST Framework architecture", "End-to-end ML model deployment", "Advanced Pandas data manipulation"],
  },

  2: {
    id: 2,
    title: "Real-Time Sentiment Analysis API",
    description: "NLP sentiment classification deployed via Django.",
    fullDescription: "Designed a scalable Django web application that ingests product reviews and social media comments. Built an NLP pipeline to perform sentiment analysis and topic modeling, and packaged the classification model as a REST API endpoint using Django REST Framework.",
    image: "/project-img/sentiment-api.png",
    placeholderImage: "https://placehold.co/800x400/10B981/FFFFFF?text=Sentiment+Analysis",
    technologies: ["Django", "Python", "NLP", "Pandas", "Matplotlib"],
    category: "ai",
    status: "completed",

    features: [
      "Scalable Django Web App",
      "NLP text preprocessing",
      "Sentiment classification API",
      "Automated topic modeling"
    ],
    challenges: ["Cleaning unstructured social media text", "Optimizing API response times for model inference"],
    learnings: ["Deploying ML models via APIs", "Natural Language Processing (NLP) techniques", "Django routing and serializers"],
  },

  3: {
    id: 3,
    title: "Space Missions Analysis Dashboard",
    description: "Space Missions analytics dashboard using Power BI.",
    fullDescription: "This project is a Power BI dashboard designed to analyze Space Missions data. It helps track KPIs such as Batter, Bowler and indivisual team performance. The dashboard includes interactive charts and filters to explore Space Missions performance across coutry, Launce-site, Operator.",
    image: "/ipl_dash2.png",
    placeholderImage: "https://placehold.co/800x400/10B981/FFFFFF?text=Space+Dashboard",
    technologies: ["Power BI", "DAX", "Data Analysis", "Excel", "Jupyter"],
    category: "data",
    status: "completed",
    githubUrl: "https://github.com/15shivamgit/Data-Analysis.git",
    liveUrl: "https://app.powerbi.com/view?r=eyJrIjoiNjU0NTg5YTMtNzRmNi00N2NhLWI2OTktN2VjZWM3YTQyMzFmIiwidCI6IjdkYTQ0YzBhLWM1ZDMtNDY5My05M2YzLWI3MDg5ZDcyNzY3NCJ9",
    year: "2026",
    team: "Solo",
    duration: "2 weeks",
    features: ["KPIs tracking", "performance analysis", "category insights", "Interactive charts and filters"],
    challenges: ["Data cleaning and transformation", "Building efficient data models", "Creating meaningful visual insights"],
    learnings: ["Space Missions data analysis", "Dashboard storytelling", "Advanced Power BI visualization"],
    icon: Database,
  },

  4: {
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
    team: "Team Project",
    duration: "Ongoing",
    features: ["Data visualization", "Trend analysis", "Cleaned and structured datasets"],
    challenges: ["Handling large datasets", "Data preprocessing"],
    learnings: ["Data analysis techniques", "Visualization using Matplotlib", "Working with real-world datasets"],
    icon: Database,
  },

  5: {
    id: 5,
    title: "Travel & Tourism UI",
    description: "Modern travel and tourism website UI.",
    fullDescription: "Travel & Tourism UI is a frontend-focused project created using React and Tailwind CSS. The goal of this project was to design a clean, modern, and fully responsive travel website UI with smooth layouts and reusable components.",
    image: "/bhakti1.png",
    placeholderImage: "https://placehold.co/800x400/FACC15/000000?text=Travel+UI",
    technologies: ["React", "Tailwind CSS", "JavaScript"],
    category: "web",
    status: "in-progress",
    githubUrl: "https://github.com/15shivamgit/BhaktiYatra",
    liveUrl: "https://bhakti-yatra-one.vercel.app/",
    year: "2025",
    team: "Team Project",
    duration: "Ongoing",
    features: ["Modern UI design", "Responsive layout", "Reusable components", "Tailwind CSS styling"],
    challenges: ["UI consistency", "Responsive design across devices"],
    learnings: ["Tailwind CSS mastery", "Component-based UI design", "Frontend best practices"],
    icon: Code2,
  },
  6: {
    id: 6,
    title: "LMS – Student Module",
    description: "Frontend module of Learning Management System.",
    fullDescription: "LMS Student Module is a frontend dashboard designed for students to manage courses, view learning content, and interact with the learning management system. This project was developed as part of a team project and focuses on UI, usability, and frontend-backend communication.",
    image: "/lmsfrontend.png",
    placeholderImage: "https://placehold.co/800x400/6366F1/FFFFFF?text=LMS+Student+Module",
    technologies: ["Tailwind CSS", "Python", "Django"],
    category: "web",
    status: "in-progress",
    githubUrl: "https://github.com/15shivamgit/LMS-Student--Module-Backend-",
    liveUrl: "https://lms-student-module-frontend.vercel.app/",
    year: "2025",
    team: "Team Project",
    duration: "Ongoing",
    features: ["Student dashboard", "Course tracking", "Clean and responsive UI"],
    challenges: ["Backend connectivity", "Team coordination"],
    learnings: ["Team collaboration", "Frontend-backend integration"],
    icon: Database,
  },

};

/* ================= COMPONENT ================= */

export default function ProjectDetail() {
  useDisableInspect();
  const { id } = useParams();
  const project = projectsData[id];
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false); // Fixed: Changed from object to simple boolean

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0); // Scroll to top on load
  }, [id]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Project Not Found</h1>
        <NavLink to="/projects" className="text-blue-600 hover:underline">Return to Projects</NavLink>
      </div>
    );
  }

  // Animation variants
  const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back Button */}
          <NavLink
            to="/projects"
            className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors duration-200 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </NavLink>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden mb-12 border border-gray-100 dark:border-gray-700"
          >
            {/* Project Image Header */}
            <motion.div variants={fadeIn} className="relative h-[400px] overflow-hidden bg-gray-900 group">
              <img
                src={imgError ? project.placeholderImage : project.image}
                alt={project.title}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>

              {/* Project Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <div className="flex items-center gap-5 mb-4">
                  <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                    <project.icon className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
                      {project.title}
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl font-medium drop-shadow-md">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-6 left-6">
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider backdrop-blur-md border ${project.status === "completed" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                    : project.status === "in-progress" ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                      : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                  }`}
                >
                  {project.status.replace("-", " ")}
                </span>
              </div>
            </motion.div>

            <div className="p-8 md:p-10">

              {/* Project Meta Grid */}
              <motion.div variants={fadeIn} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[
                  { icon: Calendar, label: "Year", value: project.year, color: "text-blue-500" },
                  { icon: Users, label: "Team", value: project.team, color: "text-emerald-500" },
                  { icon: Clock, label: "Duration", value: project.duration, color: "text-purple-500" },
                  { icon: Code2, label: "Category", value: project.category, color: "text-orange-500", class: "capitalize" },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col gap-2 p-5 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      {stat.label}
                    </div>
                    <div className={`font-bold text-gray-900 dark:text-white text-lg ${stat.class || ""}`}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={fadeIn} className="flex flex-wrap gap-4 mb-12">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-1 shadow-lg shadow-blue-500/30"
                  >
                    <ExternalLink className="w-5 h-5" /> Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-1 shadow-lg"
                  >
                    <Code2 className="w-4 h-4" /> View Source
                  </a>
                )}
              </motion.div>

              {/* Full Description & Tech Stack */}
              <div className="grid md:grid-cols-3 gap-10 mb-12">
                <motion.div variants={fadeIn} className="md:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Project Overview</h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                      {project.fullDescription}
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn}>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Tech Stack</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="px-3.5 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium border border-blue-100 dark:border-blue-800/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Features, Challenges, Learnings */}
              <motion.div variants={fadeIn} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">Key Features</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-200 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="grid md:grid-cols-2 gap-6">
                <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-2xl p-6 md:p-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-orange-500" /> Challenges
                  </h3>
                  <ul className="space-y-3">
                    {project.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <span className="text-orange-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl p-6 md:p-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-emerald-500" /> Key Learnings
                  </h3>
                  <ul className="space-y-3">
                    {project.learnings.map((learning, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <span className="text-emerald-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                        {learning}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

            </div>
          </motion.div>

          {/* Bottom Navigation */}
          <div className="text-center pb-8">
            <NavLink to="/projects" className="inline-flex items-center gap-2 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-1 font-bold shadow-lg">
              <Play className="w-5 h-5 rotate-180" />
              View All Projects
            </NavLink>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}