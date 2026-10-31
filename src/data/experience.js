export const experience = [
  {
    company: "Vibe6 Digital LLP",
    role: "AI/ML Engineer",
    period: "Aug 2026 — Present",
    location: "Indore",
    current: true,
    summary: "Built the recommendation system for a client's audio-storytelling app, then moved to full-stack work on a multi-tenant school management SaaS — payments, assessment, integrations and data tooling.",
    points: [
      "Benchmarked 8 approaches, from popularity baselines to collaborative filtering and a hybrid, on time-based held-out data; weighted popularity won on this sparse data and shaped the design.",
      "Designed a shelf-based home screen that reached 87.4% of held-out users with a title they went on to play, vs 82.6% for a single list of the same length (p = 0.0018).",
      "Trained a logistic-regression ranker that lifted top-10 hit rate from 77.9% to 80.1% across 562 held-out users (p = 0.02).",
      "Found an 18+ title being recommended to 99% of users who had not confirmed their age, and enforced age gating to bring that to zero.",
      "Built the Flutter prototype that ranks titles on-device and explains every card, kept identical to the Python engine by parity tests.",
      "On a multi-tenant school ERP, the top contributor to main (251 of 582 commits in four weeks): fees and online payments, an integrations hub, transport tracking, attendance, exam marking and role dashboards.",
      "Built an integrations hub where each school connects its own payment gateway, GPS provider, APIs and signed webhooks — credentials encrypted, outbound calls guarded against internal addresses.",
      "Shipped online fee payments through Razorpay, Cashfree, PayU and Stripe, each school on its own account, with part payments and admin control over which gateways schools may use; proved Cashfree and PayU end to end on their real sandboxes.",
      "Built assessment features from exam defaults to results: papers for chosen students under one shared candidate rule, re-evaluation requests with a moderators' queue, per-question analytics and an optional, consent-first webcam identity check for online tests.",
      "Scaled student import from 2,000 to 20,000 rows as a staged, all-or-nothing import, and backed new work with integration tests on real PostgreSQL and object storage, deliberately broken guards and cross-tenant isolation checks.",
    ],
    stack: ["Python", "pandas", "scikit-learn", "Flutter", "TypeScript", "NestJS", "Next.js", "PostgreSQL"],
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
