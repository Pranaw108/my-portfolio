import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import Layout from "./components/Layout";
import PageSkeleton from "./components/PageSkeleton";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { loadCaseStudy } from "./lib/routes";

const CaseStudy = lazy(loadCaseStudy);

// The previous site used numeric ids; only project 0 still exists.
function LegacyProjectRedirect() {
  const { id } = useParams();
  return <Navigate replace to={id === "0" ? "/work/space-launch-analytics" : "/#work"} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work/:slug" element={<CaseStudy />} />

            {/* Keep links to the old multi-page site working */}
            <Route path="/about" element={<Navigate replace to="/#about" />} />
            <Route path="/projects" element={<Navigate replace to="/#work" />} />
            <Route path="/projects/:id" element={<LegacyProjectRedirect />} />
            <Route path="/certificates" element={<Navigate replace to="/#credentials" />} />
            <Route path="/achievements" element={<Navigate replace to="/#credentials" />} />
            <Route path="/contact" element={<Navigate replace to="/#contact" />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
