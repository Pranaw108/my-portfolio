export const skills = {
  "Programming & Core Engineering": ["Python", "OOP", "Modular System Design"],
  "Data Manipulation & Logic": ["SQL", "Pandas", "NumPy"],
  "Machine Learning": ["Scikit-learn", "XGBoost", "Predictive Modeling", "Feature Engineering"],
  "Visualization & Storytelling": ["Matplotlib", "Seaborn", "Power BI"],
  "Developer Tools": ["Git/GitHub", "Jupyter", "Command Line"]
};

export const projects = [
  {
    title: "E-Commerce Customer Retention Engine",
    problem: "A fictional e-commerce brand is losing high-value customers after their first 6 months.",
    approach: "Built a custom data processing pipeline using Pandas and NumPy to aggregate user behavior.",
    insights: "Found that customers who don't interact with the platform within 14 days of a purchase have an 80% higher churn rate.",
    impact: "The predictive model provides a highly targeted list that could reduce marketing spend by 15%.",
    tech: ["Python (OOP)", "Pandas", "Scikit-learn", "Matplotlib"]
  },
  {
    title: "Scalable Retail Sales Forecaster",
    problem: "Overstocking leads to capital lock-up, while understocking leads to lost revenue.",
    approach: "Designed a relational database schema using SQL to query historical data efficiently.",
    insights: "Identified specific product categories highly sensitive to local holiday events.",
    impact: "Reduced Mean Absolute Percentage Error (MAPE) to X%, translating to a 12% reduction in holding costs.",
    tech: ["SQL", "Pandas", "statsmodels/Prophet"]
  },
  {
    title: "Anomaly Detection for Financial Transactions",
    problem: "Fraudulent transactions account for millions in lost revenue, but aggressive blocking frustrates users.",
    approach: "Addressed class imbalance using SMOTE. Evaluated models strictly on Precision-Recall AUC.",
    impact: "Prioritized precision to ensure a low false-positive rate, saving an estimated $X in disputes.",
    tech: ["Python", "NumPy", "Scikit-learn", "Seaborn"]
  }
];