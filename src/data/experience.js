export const experience = [
  {
    company: "Vibe6 Digital LLP",
    role: "AI/ML Engineer",
    period: "Aug 2026 — Present",
    location: "Indore",
    current: true,
    summary: "Building the recommendation system for a client's audio-storytelling app: data, models, evaluation and a Flutter prototype.",
    points: [
      "Benchmarked 8 approaches, from popularity baselines to collaborative filtering and a hybrid, on time-based held-out data; weighted popularity won on this sparse data and shaped the design.",
      "Designed a shelf-based home screen that reached 87.4% of held-out users with a title they went on to play, vs 82.6% for a single list of the same length (p = 0.0018).",
      "Trained a logistic-regression ranker that lifted top-10 hit rate from 77.9% to 80.1% across 562 held-out users (p = 0.02).",
      "Found an 18+ title being recommended to 99% of users who had not confirmed their age, and enforced age gating to bring that to zero.",
      "Built the Flutter prototype that ranks titles on-device and explains every card, kept identical to the Python engine by parity tests.",
    ],
    stack: ["Python", "pandas", "scikit-learn", "Flutter", "Dart"],
  },
  {
    company: "Shanti Infosoft LLP",
    role: "Data Science Intern",
    period: "Jan 2026 — Jun 2026",
    points: [
      "Built reusable preprocessing pipelines in Python (pandas, NumPy) as modular cleaning and transformation components.",
      "Ran exploratory data analysis to surface patterns and data-quality issues; presented findings with Matplotlib and Seaborn.",
      "Debugged and optimized pipeline scripts for reliability; took part in code reviews, updates and testing across full development cycles.",
    ],
    stack: ["Python", "pandas", "NumPy", "Matplotlib", "Seaborn"],
  },
];
