// Prints resume/resume.html to public/files/Pranaw-Gautam-Resume.pdf, the path
// every "Résumé" link on the site already uses.
//
// Playwright is deliberately not a project dependency (it is large and only
// needed here). Point PLAYWRIGHT_FROM at any folder whose node_modules has it:
//   PLAYWRIGHT_FROM=<folder> node resume/build-pdf.mjs
// It uses the Edge that ships with Windows; set BROWSER_CHANNEL=chrome to change.

import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const from = process.env.PLAYWRIGHT_FROM;
const { chromium } = from
  ? await import(pathToFileURL(path.join(from, "node_modules", "playwright", "index.mjs")).href)
  : await import("playwright");

const here = path.dirname(fileURLToPath(import.meta.url));
const source = pathToFileURL(path.join(here, "resume.html")).href;
const target = path.join(here, "..", "public", "files", "Pranaw-Gautam-Resume.pdf");

const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL ?? "msedge", headless: true });
try {
  const page = await browser.newPage();
  await page.goto(source, { waitUntil: "load" });
  await page.pdf({ path: target, format: "A4", preferCSSPageSize: true, printBackground: true });
  console.log(`wrote ${target}`);
} finally {
  await browser.close();
}
