export const profile = {
  name: "Pranaw Gautam",
  roles: ["AI/ML Engineer", "Full-stack Developer"],
  currentRole: "AI/ML Engineer",
  currentCompany: "Vibe6 Digital",
  intro:
    "I build machine-learning features and the products around them — recommenders proven on held-out data, and a multi-tenant SaaS platform in TypeScript, NestJS and Postgres that real schools run on.",
  // Mirrors the FAQ answer on freelance work. TODO(Pranaw): change if you are also open to full-time roles.
  availability: "Taking on a few freelance projects",
  focus: ["Recommender systems", "Multi-tenant SaaS", "Python", "TypeScript"],
  location: "Indore, Madhya Pradesh, India",
  locationShort: "Indore, India",
  email: "pranawgautam@gmail.com",
  phone: "+91 81092 60602",
  phoneHref: "tel:+918109260602",
  resume: "/files/Pranaw-Gautam-Resume.pdf",
  links: {
    github: "https://github.com/Pranaw108",
    linkedin: "https://www.linkedin.com/in/pranaw-gautam/",
  },
  photo: {
    src: "/images/profile-960.webp",
    srcSet: "/images/profile-480.webp 480w, /images/profile-960.webp 960w",
  },
};

export const about = [
  "Most of what I build starts with messy data — cleaning it, modeling it and turning it into something a person can act on: a dashboard, a REST API, or a ranked row on a phone screen.",
  "I'm an AI/ML Engineer at Vibe6 Digital in Indore. I built the recommendation system for a client's audio-storytelling app, and I'm now one of the main engineers on a multi-tenant school management platform — fees and payments, integrations, transport and the dashboards each role sees. Before that I spent six months as a Data Science Intern at Shanti Infosoft, building preprocessing pipelines, running exploratory analysis and hardening the Python code the team relied on.",
  "I care about honest evaluation — baselines, held-out test data and significance tests before calling something better — and about software that is secure by default, tested until the tests can fail, and easy to hand over.",
];

export const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    school: "AKS University",
    place: "Satna",
    detail: "GPA 8.65 / 10",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "APS University",
    place: "Rewa",
  },
];

// Nav and section numbering now live in data/sections.js, so inserting a
// section cannot leave the two out of step.
