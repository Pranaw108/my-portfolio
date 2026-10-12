import { about, education, profile } from "../data/profile";
import { projects } from "../data/projects";
import { skillGroups } from "../data/skills";
import { experience } from "../data/experience";
import { services } from "../data/services";
import { faqs } from "../data/faqs";
import { certifications, goer, rmat } from "../data/credentials";

/**
 * Answers questions about Pranaw from the site's own data.
 *
 * Deliberately not a language model. Every reply is assembled from the same
 * files that render the page, so the assistant cannot invent a project, a skill
 * or an employer — which is the one failure a portfolio cannot afford. It also
 * needs no API key, no backend and no per-message cost.
 *
 * The trade-off is that it only answers what it has been taught to recognise,
 * so anything unmatched hands the visitor straight to email.
 */

/** Lowercase, strip punctuation, drop filler words. */
function normalise(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s+#.]/g, " ")
    .split(/\s+/)
    .filter((word) => word && !STOP_WORDS.has(word));
}

const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "do", "does", "did", "can", "could",
  "you", "your", "he", "his", "him", "me", "my", "i", "we", "us", "to", "of", "in",
  "on", "for", "with", "about", "please", "tell", "show", "give", "what", "whats",
  "any", "some", "and", "or", "it", "that", "this", "has", "have", "had", "much",
]);

/** Edit distance, capped — enough to forgive a typo, not to match a different word. */
function closeEnough(a, b) {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 2 || a.length < 4) return false;

  const rows = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) rows[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      rows[i][j] = Math.min(rows[i - 1][j] + 1, rows[i][j - 1] + 1, rows[i - 1][j - 1] + cost);
    }
  }
  return rows[a.length][b.length] <= (a.length > 6 ? 2 : 1);
}

/** How well a question matches an intent's keywords, allowing for typos. */
function scoreIntent(words, keywords) {
  let score = 0;
  for (const keyword of keywords) {
    if (keyword.includes(" ")) {
      // A phrase counts double when every part of it is present.
      const parts = keyword.split(" ");
      if (parts.every((part) => words.some((word) => closeEnough(word, part)))) score += 2;
      continue;
    }
    if (words.some((word) => closeEnough(word, keyword))) score += 1;
  }
  return score;
}

const listSkills = () => skillGroups.map((g) => `**${g.title}** — ${g.items.join(", ")}`).join("\n\n");

const currentRole = experience.find((job) => job.current) ?? experience[0];

/** Each intent: what it matches, and the answer built from real data. */
const INTENTS = [
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "good morning", "good evening", "namaste"],
    answer: () => ({
      text: `Hello. I answer questions about ${profile.name} using the same data this site is built from — his skills, projects, experience and how to reach him. What would you like to know?`,
      chips: ["Who is Pranaw?", "Tech stack", "Show projects", "Contact details"],
    }),
  },
  {
    id: "who",
    keywords: ["who", "about", "yourself", "background", "introduce", "bio", "summary"],
    answer: () => ({
      text: `${profile.name} is an **${profile.currentRole}** at ${profile.currentCompany}, based in ${profile.location}.\n\n${profile.intro}\n\n${about[0]}`,
      chips: ["What has he built?", "Experience", "Education"],
    }),
  },
  {
    id: "skills",
    keywords: ["skill", "skills", "tech", "stack", "technology", "technologies", "tools", "languages", "know"],
    answer: () => ({
      text: `Here is the toolkit, grouped the way he uses it:\n\n${listSkills()}`,
      chips: ["Show projects", "Services", "Experience"],
    }),
  },
  {
    id: "projects",
    keywords: ["project", "projects", "work", "portfolio", "built", "case study", "case studies"],
    answer: () => ({
      text: `${projects.length} case studies, each with the problem, his role and the result:\n\n${projects
        .map((p) => `**${p.title}** — ${p.kind}\n${p.summary}\n_${p.highlight.value}: ${p.highlight.label}_`)
        .join("\n\n")}`,
      chips: projects.map((p) => p.title.split("—")[0].trim()).slice(0, 4),
      links: projects.map((p) => ({ label: p.title, to: `/work/${p.slug}` })),
    }),
  },
  {
    id: "experience",
    keywords: ["experience", "job", "jobs", "worked", "employer", "company", "career", "role", "roles"],
    answer: () => ({
      text: experience
        .map((job) => `**${job.role}** at ${job.company}\n${job.period} · ${job.location}\n${job.summary}`)
        .join("\n\n"),
      chips: ["What did he achieve?", "Skills", "Education"],
    }),
  },
  {
    id: "achievements",
    keywords: ["achieve", "achievement", "achievements", "result", "results", "impact", "accomplish", "award", "awards"],
    answer: () => ({
      text: `A few measured results:\n\n${currentRole.points
        .slice(0, 3)
        .map((point) => `• ${point}`)
        .join("\n\n")}\n\nHe also reached **${goer.badge}** in ${goer.title}.`,
      chips: ["Show projects", "Credentials"],
    }),
  },
  {
    id: "education",
    keywords: ["education", "degree", "study", "studied", "college", "university", "qualification", "mca", "bca"],
    answer: () => ({
      text: education
        .map((item) => `**${item.degree}**\n${item.school}, ${item.place}${item.detail ? ` · ${item.detail}` : ""}`)
        .join("\n\n"),
      chips: ["Credentials", "Experience"],
    }),
  },
  {
    id: "credentials",
    keywords: ["credential", "credentials", "certificate", "certificates", "certification", "certifications", "goer", "rmat"],
    answer: () => ({
      text: `**${goer.title}** — ${goer.badge}\n${goer.subtitle}\n\n**${rmat.title}** — ${rmat.issuer}\n\nPlus ${certifications.length} further certifications listed on the site.`,
      chips: ["Education", "Experience"],
    }),
  },
  {
    id: "services",
    keywords: ["service", "services", "hire", "offer", "help", "build for", "freelance", "available", "availability", "work together"],
    answer: () => ({
      text: `Four things he builds, each backed by a case study:\n\n${services
        .map((s) => `**${s.title}** — ${s.tagline}`)
        .join("\n")}\n\n${faqs[0].a}`,
      chips: ["Start a project", "Show projects", "Pricing"],
    }),
  },
  {
    id: "pricing",
    keywords: ["price", "pricing", "cost", "rate", "rates", "budget", "charge", "fee", "how long", "timeline"],
    answer: () => {
      const pricing = faqs.find((f) => f.q.toLowerCase().includes("price"));
      const timeline = faqs.find((f) => f.q.toLowerCase().includes("how long"));
      return {
        text: `**${pricing.q}**\n${pricing.a}\n\n**${timeline.q}**\n${timeline.a}`,
        chips: ["Start a project", "Services"],
      };
    },
  },
  {
    id: "contact",
    keywords: ["contact", "email", "reach", "touch", "phone", "call", "linkedin", "github", "hire him", "message"],
    answer: () => ({
      text: `**Email** ${profile.email}\n**Phone** ${profile.phone}\n**Location** ${profile.location}\n\nThe form at the bottom of this page reaches him directly, and he replies within a couple of days.`,
      chips: ["Start a project", "Resume"],
      links: [
        { label: "LinkedIn", href: profile.links.linkedin },
        { label: "GitHub", href: profile.links.github },
      ],
    }),
  },
  {
    id: "resume",
    keywords: ["resume", "cv", "download"],
    answer: () => ({
      text: "His résumé is a PDF you can open or download from the button below.",
      chips: ["Experience", "Skills"],
      links: [{ label: "Open résumé (PDF)", href: profile.resume }],
    }),
  },
  {
    id: "location",
    keywords: ["where", "location", "based", "remote", "city", "country", "relocate"],
    answer: () => ({
      text: `He is based in ${profile.location}, and works remotely with clients elsewhere.`,
      chips: ["Contact details", "Services"],
    }),
  },
];

/** Words that appear in exactly one project title, so one of them identifies it. */
const DISTINCTIVE_TITLE_WORDS = (() => {
  const counts = new Map();
  for (const project of projects) {
    for (const word of new Set(normalise(project.title))) {
      counts.set(word, (counts.get(word) ?? 0) + 1);
    }
  }
  return new Set([...counts].filter(([word, n]) => n === 1 && word.length >= 4).map(([word]) => word));
})();

/** A project asked about by name.
 *
 * Two title words normally, but one is enough when it is distinctive — "vayu"
 * or "kisanshield" can only mean one project.
 */
function findProject(words) {
  for (const project of projects) {
    const title = normalise(project.title);
    const matched = title.filter((part) => words.some((word) => closeEnough(word, part)));
    if (matched.length >= Math.min(2, title.length)) return project;
    if (matched.some((word) => DISTINCTIVE_TITLE_WORDS.has(word))) return project;
  }
  return null;
}

function projectAnswer(project) {
  return {
    text: `**${project.title}** — ${project.kind}, ${project.year}\n\n${project.problem}\n\n**My role:** ${project.role}\n\n**Result:** ${project.highlight.value} — ${project.highlight.label}`,
    chips: ["Show projects", "Tech stack"],
    links: [
      { label: "Read the case study", to: `/work/${project.slug}` },
      ...(project.source ? [{ label: "Source code", href: project.source }] : []),
    ],
  };
}

const FALLBACK = {
  text: `I only answer from what this site actually records, so I would rather not guess at that one.\n\nI can cover his skills, projects, experience, education, services, pricing and contact details. For anything else, ${profile.email} reaches him directly.`,
  chips: ["Who is Pranaw?", "Show projects", "Services", "Contact details"],
};

/** Minimum score before an intent is trusted over the fallback. */
const CONFIDENCE_FLOOR = 1;

export function ask(question) {
  const words = normalise(question ?? "");
  if (!words.length) return FALLBACK;

  const project = findProject(words);
  if (project) return projectAnswer(project);

  let best = null;
  let bestScore = 0;
  for (const intent of INTENTS) {
    const score = scoreIntent(words, intent.keywords);
    if (score > bestScore) {
      best = intent;
      bestScore = score;
    }
  }
  return bestScore >= CONFIDENCE_FLOOR ? best.answer() : FALLBACK;
}

export const OPENING = {
  text: `Hello. I am a small assistant built from this site's own data — I can tell you about ${profile.name}'s **skills**, **projects**, **experience**, or how to **get in touch**.\n\nI am not a language model, so I will never invent an answer. Ask away.`,
  chips: ["Who is Pranaw?", "Tech stack", "Show projects", "Contact details"],
};
