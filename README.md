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
npm run check    # lint + build + render smoke test + API smoke test
```

### Contact form setup (required for the form to work)

The enquiry form posts to `api/inquiry.js`, a Vercel serverless function that emails via
[Resend](https://resend.com). Set these in **Vercel → Project → Settings → Environment Variables**:

| Variable | Required | What it is |
|---|---|---|
| `RESEND_API_KEY` | yes | API key from resend.com (free tier is plenty) |
| `INQUIRY_TO` | yes | Address enquiries are delivered to |
| `INQUIRY_FROM` | no | Sender. Defaults to Resend's sandbox address, which needs no domain setup |

Copy `.env.example` for the list. **Until these are set the form does not pretend to work** — it
returns a clear error and offers the visitor a prefilled email instead.

## Editing content

All copy lives in `src/data/` — components only render it.

| File | What it holds |
|---|---|
| `profile.js` | Name, roles, intro, contact links, about text, education |
| `sections.js` | Section order, numbering and which appear in the nav — one source for all three |
| `services.js` | The four services and the "how we'd work together" steps |
| `faqs.js` | Client FAQ, including what I don't take on |
| `experience.js` | Jobs and internships (newest first) |
| `projects.js` | Case studies: summary, problem, role, results, approach, features, gallery |
| `skills.js` | Skill groups |
| `credentials.js` | GOER, RMAT and the certification list |

To add a certificate file, drop it in `public/files/` and set `href` on its entry in `credentials.js`.
Project images live in `public/images/` as WebP.

## Structure

```
src/
  sections/    home page sections, in order: Hero, Services, Work, Experience,
               About, Skills, Credentials, Faq, StartProject, Contact
  api/         Vercel serverless functions (inquiry form)
  scripts/     render + API smoke tests, run by `npm run check`
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

## Section numbering

Section numbers (`01`, `02`, …) and the nav both come from `src/data/sections.js`. Add or reorder a
section there and the numbering and nav follow. Don't hardcode a number in a section file — that is
exactly how they drifted out of step before.

## Verification

`npm run check` runs four things:

1. `eslint .`
2. `vite build`
3. `scripts/render-check.mjs` — server-renders the home page and asserts every section, all four
   services, the FAQ, the form and the section numbering are actually in the output. A bundle can
   build fine and still throw at render time; this catches that.
4. `scripts/api-check.mjs` — drives `api/inquiry.js` through every guard (wrong method, missing
   config, each validation rule) without sending email, and asserts a rejection never returns
   `ok: true`.
