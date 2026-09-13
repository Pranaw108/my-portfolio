# Pranaw Gautam — Portfolio

Personal portfolio: data analysis, AI/ML and web & Flutter work.
Live at https://my-portfolio-two-gilt-97.vercel.app

Built with React 19, Vite, Tailwind CSS v4, framer-motion and React Router.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
npm run lint
```

## Editing content

All copy lives in `src/data/` — components only render it.

| File | What it holds |
|---|---|
| `profile.js` | Name, roles, intro, contact links, about text, education, nav items |
| `experience.js` | Jobs and internships (newest first) |
| `projects.js` | Case studies: summary, problem, role, results, approach, features, gallery |
| `skills.js` | Skill groups |
| `credentials.js` | GOER, RMAT and the certification list |

To add a certificate file, drop it in `public/files/` and set `href` on its entry in `credentials.js`.
Project images live in `public/images/` as WebP.

## Structure

```
src/
  sections/    home page sections (Hero, Work, Experience, About, Skills, Credentials, Contact)
  pages/       Home, CaseStudy (/work/:slug, lazy-loaded), NotFound
  components/  shared UI (Navbar, ProjectCard, Reveal, QualityHeatmap, …)
  hooks/       theme, active nav section, document title
  data/        all site content
```

Old URLs from the previous version (`/projects`, `/about`, `/contact`, …) redirect to the matching
section. `vercel.json` rewrites every path to `index.html` so deep links work on refresh.

## Motion & accessibility

Animations use framer-motion's `LazyMotion` with `m` components, and respect
`prefers-reduced-motion` (both via `MotionConfig` and a CSS fallback). The theme follows the OS
until the visitor picks one with the header toggle.
