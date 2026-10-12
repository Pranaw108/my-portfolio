// What I can build for a client. Every service here is backed by work that
// exists in the Work section — nothing speculative, nothing I haven't shipped.

export const services = [
  {
    id: "recommendations",
    icon: "Sparkles",
    tint: "from-[#c4400f] to-[#e2552a]",
    title: "Recommendation & personalization",
    tagline: "Make an app feel personal from the first session.",
    problem:
      "You have users and a catalogue, but everyone sees the same home screen — and the usual recommenders need more history than your users have.",
    deliverables: [
      "A ranking model trained on your own data",
      "Honest benchmarks against popularity and content baselines",
      "An explainable home screen built from shelves, not one long list",
      "Exported rankings that can score on-device, with no user data leaving the phone",
    ],
    stack: ["Python", "scikit-learn", "pandas", "Flutter"],
    evidence: {
      slug: "audio-recommender",
      label: "Personalized Audio Recommender",
      metric: "87.4% of test users were shown a title they went on to play",
    },
  },
  {
    id: "data-pipelines",
    icon: "Database",
    tint: "from-[#1f6f7a] to-[#2b9ec9]",
    title: "Data pipelines & analysis",
    tagline: "Turn a messy export into something you can query.",
    problem:
      "Your data sits in exports, spreadsheets and a production database that was never designed to be analysed, so every question takes a week to answer.",
    deliverables: [
      "A repeatable cleaning and loading pipeline, not a one-off script",
      "A documented schema you can query directly",
      "Data-hygiene checks that run automatically and fail loudly",
      "An exploratory analysis write-up of what the data actually supports",
    ],
    stack: ["Python", "pandas", "SQL", "SQLAlchemy", "pytest"],
    evidence: {
      slug: "space-launch-analytics",
      label: "Space Launch Analytics",
      metric: "7,500 launches cleaned, modelled and loaded into MySQL",
    },
  },
  {
    id: "dashboards",
    icon: "BarChart3",
    tint: "from-[#7a4b1f] to-[#c08a3e]",
    title: "Dashboards & reporting",
    tagline: "One place to see how the business is doing.",
    problem:
      "Decisions are being made from screenshots pasted into chat, and nobody agrees on which number is correct.",
    deliverables: [
      "A multi-page interactive report, from executive overview to detail",
      "Measures defined once in DAX so every page agrees",
      "A refresh path so the report stays current without manual work",
      "A short handover doc covering each page and its definitions",
    ],
    stack: ["Power BI", "DAX", "SQL", "MySQL"],
    evidence: {
      slug: "space-launch-analytics",
      label: "Space Launch Analytics",
      metric: "6 pages of Power BI reporting on reliability, cost and payload",
    },
  },
  {
    id: "ml-apis",
    icon: "Boxes",
    tint: "from-[#4a3a7a] to-[#7a5cc4]",
    title: "ML-backed APIs & app features",
    tagline: "Get a model out of the notebook and into the product.",
    problem:
      "A model works on your laptop but nothing consumes it, and the path from notebook to a running feature is unclear.",
    deliverables: [
      "A REST API around the model, with validation and error handling",
      "Matching behaviour between training and inference, verified by tests",
      "The front-end or app feature that consumes it",
      "Notes on how to run it, test it and hand it over",
    ],
    stack: ["FastAPI", "REST", "Docker", "React", "Flutter"],
    evidence: {
      slug: "audio-recommender",
      label: "Personalized Audio Recommender",
      metric: "Python ranker ported to Dart, verified against golden fixtures",
    },
  },
];

// How an engagement actually runs. Deliberately four steps — a longer list
// reads as process theatre rather than something I can promise.
export const processSteps = [
  {
    title: "Understand",
    body: "A call to pin down the problem, who it is for and what 'better' would mean in numbers. I say up front if I think the idea needs something I do not do.",
  },
  {
    title: "Look at the data",
    body: "Before any modelling, I check what your data actually supports. This is usually where a plan changes, and it is cheaper to change it here.",
  },
  {
    title: "Build and measure",
    body: "Short iterations with something you can look at. Every result is compared against a baseline on held-out data, so improvements are real and not noise.",
  },
  {
    title: "Hand over",
    body: "Documented, tested code, the reasoning behind the choices, and a walkthrough. You should be able to run and change it without me.",
  },
];
