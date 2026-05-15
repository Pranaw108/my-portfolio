import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Layout from "./components/Layout";

/* ===== Pages ===== */
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Certificates from "./pages/Certificates";
import Contact from "./pages/Contact";
import Achievement from "./pages/Achievements";

/* ===== 404 Page ===== */
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow py-20 text-center px-4">
      <h1 className="text-7xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* ===== Main Pages ===== */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/achievements" element={<Achievement />} />

          {/* ===== 404 ===== */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}