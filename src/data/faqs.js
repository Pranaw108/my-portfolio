// Questions a prospective client actually asks before the first call.
// Answers stay honest about availability and what I don't do.
// `slug` makes each answer deep-linkable as #faq-<slug>; `topic` is the scan label.

export const faqs = [
  {
    slug: "availability",
    topic: "Availability",
    q: "Are you open to new roles or freelance work?",
    a: "Both. I work full-time as an AI/ML Engineer at Vibe6 Digital and I'm open to full-time AI/ML and full-stack roles — email or my résumé is the quickest route for that. Alongside my job I take on a small number of freelance projects; tell me your timeline in the form and I'll be straight with you about whether I can fit it.",
  },
  {
    slug: "good-fit",
    topic: "Fit",
    q: "What kind of projects are a good fit?",
    a: "Anything where the hard part is the data or the model: a recommender, a pipeline that has to be reliable, a dashboard people will actually trust, or getting a model out of a notebook and into an API or app. A plain marketing website is not the best use of me.",
  },
  {
    slug: "not-a-fit",
    topic: "Fit",
    q: "What do you not do?",
    a: "I don't build large language model products, chatbots or AI agents — I haven't shipped those, and I'd rather point you to someone who has. I also don't take on full native iOS or Android apps; my app work is Flutter, and usually the ML feature inside someone else's app.",
  },
  {
    slug: "pricing",
    topic: "Pricing",
    q: "How do you price work?",
    a: "After the first call, once the scope is clear. Small, well-defined pieces of work are fixed-price. Anything exploratory — where we don't yet know what the data supports — is better hourly, because a fixed price on an unknown just means padding it.",
  },
  {
    slug: "timeline",
    topic: "Timeline",
    q: "How long does a project take?",
    a: "A dashboard or a contained analysis is usually a couple of weeks. A recommender or a pipeline that has to run in production takes longer, because the honest evaluation is most of the work. I'd rather give you a real estimate after seeing the data than a confident one now.",
  },
  {
    slug: "ownership",
    topic: "Ownership",
    q: "Who owns the code?",
    a: "You do. You get the repository, the documentation and a walkthrough. I'll ask whether I can describe the work in general terms in my portfolio — if the answer is no, that's fine, and the client project in my Work section is already anonymised for exactly that reason.",
  },
  {
    slug: "communication",
    topic: "Process",
    q: "How do we communicate?",
    a: "Email for anything that needs a record, and a call when something needs discussing. I send a short written update at the end of each iteration so you can see progress without having to ask for it.",
  },
  {
    slug: "getting-started",
    topic: "Process",
    q: "What do you need from me to start?",
    a: "A description of the problem, a sample of the data if it exists, and who the result is for. If the data is sensitive, we sort out an NDA and an access path before I look at anything.",
  },
];
