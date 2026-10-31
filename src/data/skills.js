// Each group has its own icon and colour tone (defined in index.css), so the
// six read apart at a glance. Orange stays the brand accent, not a category.
export const skillGroups = [
  {
    title: "Machine learning",
    icon: "BrainCircuit",
    tone: "violet",
    items: ["scikit-learn", "LightGBM", "TensorFlow", "Recommender systems", "Collaborative filtering", "Feature engineering", "Time-series forecasting", "Model evaluation", "Significance testing"],
  },
  {
    title: "Data",
    icon: "ChartScatter",
    tone: "teal",
    items: ["Python", "Pandas", "NumPy", "SQL", "DuckDB", "Parquet", "EDA", "Statistical analysis", "ETL pipelines", "SQLAlchemy", "Matplotlib", "Seaborn"],
  },
  {
    title: "Apps & APIs",
    icon: "Braces",
    tone: "blue",
    items: ["TypeScript", "NestJS", "Next.js", "React", "FastAPI", "REST APIs", "zod", "Flutter", "Dart", "Tailwind CSS"],
  },
  {
    title: "BI",
    icon: "ChartPie",
    tone: "rose",
    items: ["Power BI", "DAX", "Dashboard design"],
  },
  {
    title: "Databases",
    icon: "Database",
    tone: "green",
    items: ["PostgreSQL", "Row-level security", "Drizzle ORM", "MySQL", "Redis"],
  },
  {
    title: "Tools & cloud",
    icon: "Wrench",
    tone: "slate",
    items: ["Git", "GitHub Actions", "pytest", "Vitest", "Playwright", "Docker", "BullMQ", "AWS (EC2, S3)", "Databricks"],
  },
];
