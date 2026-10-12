// Smoke test: render the home page server-side and assert the key sections and
// copy are actually in the output.
//
// This catches what `vite build` cannot — a bundle compiles fine while the page
// throws at render time (bad hook order, a missing export, an undefined component).
//
// Run: npm run check:render

import { createServer } from "vite";
import { renderToString } from "react-dom/server";
import React from "react";
// Must come from this one import: loading react-router through ssrLoadModule too
// would create a second module instance, and the router context would not match.
import { Route, Routes, StaticRouter } from "react-router";

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "warn",
});

try {
  const { default: Home } = await server.ssrLoadModule("/src/pages/Home.jsx");
  const html = renderToString(React.createElement(StaticRouter, { location: "/" }, React.createElement(Home)));

  // Apostrophes come back HTML-escaped, so check both forms.
  const has = (needle) => html.includes(needle) || html.includes(needle.replace(/'/g, "&#x27;"));

  const checks = {
    "services section present": html.includes('id="services"'),
    "faq section present": html.includes('id="faq"'),
    "contact section present": html.includes('id="contact"'),
    "all four services rendered": [
      "Recommendation &amp; personalization",
      "Data pipelines &amp; analysis",
      "Dashboards &amp; reporting",
      "ML-backed APIs &amp; app features",
    ].every((title) => html.includes(title)),
    "process strip rendered": has("How we'd work together"),
    "faq answers rendered": has("Are you available for freelance work?"),
    "faq states what he does not do": has("What do you not do?"),
    "form submit button rendered": html.includes("Send message"),
    "form has honeypot": html.includes('name="company"'),
    "case study links wired": html.includes('href="/work/audio-recommender"'),
    "services numbered 01": /01<\/span>[\s\S]{0,160}What I can build/.test(html),
    "contact numbered 08": /08<\/span>[\s\S]{0,160}Start a project/.test(html),
    "every section has an accessible name": [
      "services-title",
      "work-title",
      "experience-title",
      "about-title",
      "skills-title",
      "credentials-title",
      "faq-title",
      "contact-title",
    ].every((id) => html.includes(id)),
  };

  // Case-study routes: every project page must render, which also exercises
  // each project's `visual` component.
  const { projects } = await server.ssrLoadModule("/src/data/projects.js");
  const { default: CaseStudy } = await server.ssrLoadModule("/src/pages/CaseStudy.jsx");

  const caseStudyHtml = {};
  for (const project of projects) {
    const path = `/work/${project.slug}`;
    caseStudyHtml[project.slug] = renderToString(
      React.createElement(
        StaticRouter,
        { location: path },
        React.createElement(Routes, null, React.createElement(Route, { path: "/work/:slug", element: React.createElement(CaseStudy) })),
      ),
    );
    // React escapes &, < and > in text, so compare against the escaped title.
    const escapedTitle = project.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    checks[`case study renders: ${project.slug}`] = caseStudyHtml[project.slug].includes(escapedTitle);
  }

  // The newest project and its chart.
  checks["kisanshield card on home"] = html.includes("KisanShield-FL");
  // The Work lede states a count; it must match how many projects exist.
  // React puts a <!-- --> marker between adjacent text nodes, so allow it.
  const countWord = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"][projects.length];
  checks["work lede count matches project count"] = new RegExp(`${countWord}(<!-- -->)? case studies`).test(html);
  checks["kisanshield source link is the real repo"] = html.includes("https://github.com/Pranaw108/kisanshield-fl");
  checks["source-bias chart rendered"] = (caseStudyHtml["kisanshield-fl"] ?? "").includes(
    "Test accuracy by source dataset",
  );
  checks["chart shows the 35% outlier"] = (caseStudyHtml["kisanshield-fl"] ?? "").includes("35.0%");
  checks["chart has a screen-reader caption"] = (caseStudyHtml["kisanshield-fl"] ?? "").includes(
    "learning the source rather than the disease",
  );

  // Borrowed from the reference portfolio: category filter, toolkit marquee,
  // countable stats band.
  checks["work category filter rendered"] = html.includes('aria-label="Filter work by category"');
  checks["filter offers every category"] = ["Machine learning", "Data engineering", "Analytics", "Apps"]
    .every((name) => html.includes(`>${name}`));
  checks["filter announces changes to screen readers"] = html.includes('aria-live="polite"');
  checks["toolkit marquee rendered"] = html.includes("animate-marquee");
  checks["marquee hidden from screen readers"] = /animate-marquee[\s\S]{0,400}/.test(html)
    && html.includes('aria-hidden="true"');
  checks["stats band rendered"] = html.includes("case studies") && html.includes("public repositories");
  checks["stats avoid unverifiable vanity metrics"] =
    !/happy clients|years of experience/i.test(html);

  // Vayu replaced a stale entry, so its real figures must be the ones shown.
  checks["vayu shows the verified skill figure"] = html.includes("+35.0%") || html.includes("+35%");
  checks["vayu links its public repo"] = html.includes("https://github.com/Pranaw108/vayu-aqi");
  checks["stale air-quality numbers are gone"] = !html.includes("141,752");

  const failures = Object.entries(checks).filter(([, ok]) => !ok);
  for (const [name, ok] of Object.entries(checks)) {
    console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
  }
  console.log(`\nrendered ${html.length.toLocaleString()} chars · ${failures.length} failed`);
  process.exitCode = failures.length ? 1 : 0;
} catch (error) {
  console.error("RENDER FAILED\n", error);
  process.exitCode = 1;
} finally {
  await server.close();
}
