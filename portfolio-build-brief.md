# Portfolio Website — Build Brief for AI Coding Agent

## 0. How to use this document
This is a build specification, not code. Hand this entire document to the AI
agent (Claude Code, Cursor, etc.) as the first message in a new session, along
with the font files and image/asset files referenced in Section 5. Ask the
agent to confirm its understanding and propose a file-by-file plan before it
starts writing code. Work through the phases in Section 8 in order — do not
let the agent skip ahead to polish before the structural phases are done.

---

## 1. Project Summary

Build a personal portfolio website that looks and feels like an Apple product
page: generous whitespace, large confident typography, subtle motion,
restrained color, and razor-sharp attention to spacing and alignment. The
site must be fast, accessible, fully static, and deployed automatically to
GitHub Pages.

**One-line brief:** "A calm, minimal, Apple-style single-scroll portfolio —
content-first, motion-light, typography-led."

---

## 2. Tech Stack (fixed — do not substitute)

| Layer | Choice |
|---|---|
| Framework | Astro (latest stable, static output mode) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| Icons | lucide (via `lucide-astro` or inline SVG from lucide) |
| Fonts | Self-hosted, user-supplied Apple-style fonts (see Section 5) |
| Version control | GitHub |
| CI/CD | GitHub Actions |
| Hosting | GitHub Pages |
| Package manager | pnpm (fallback: npm if pnpm unavailable) |

Rules for the agent:
- No React/Vue/Svelte islands unless a specific interaction genuinely
  requires client-side state that plain Astro + a small vanilla TS script
  can't handle. Default to `.astro` components and vanilla TypeScript.
- No CSS-in-JS, no styled-components, no unrelated UI kits (no MUI, no
  Bootstrap, no shadcn). Tailwind utility classes only, with a small set of
  custom design tokens.
- No client-side frameworks for animation. Use CSS transitions/animations
  and IntersectionObserver-based scroll reveals in plain TypeScript.
- No image/font CDNs. Everything self-hosted in `public/` or optimized via
  Astro's asset pipeline.

---

## 3. Design Direction — "Apple-like, clean, professional"

### 3.1 Principles
1. **Whitespace is a feature.** Err on the side of more padding/margin than
   feels necessary.
2. **Typography carries the design.** Large, confident headlines (48–96px
   desktop), tight tracking on headlines, relaxed line-height on body text.
3. **Restrained palette.** Base of near-white / near-black with one accent
   color used sparingly (for links, active states, key CTAs only). No
   gradients unless subtle and monochrome. Support light mode by default;
   optionally dark mode via `prefers-color-scheme` (agent should ask before
   building dark mode — see Section 9).
4. **One idea per section.** Each scroll section should communicate a single
   concept (Hero, About, Skills, Projects, Experience, Contact) — no
   cramming.
5. **Motion is a seasoning, not a meal.** Subtle fade/slide-up on scroll
   (150–400ms, ease-out), gentle hover states (scale 1.02–1.03, opacity,
   or underline reveal), no bouncy/elastic easing, no parallax gimmicks.
6. **Sharp alignment.** Consistent max-width container (e.g. 1200px),
   consistent section vertical rhythm (e.g. 96–160px padding between
   sections on desktop, scaled down responsively).
7. **Icons are functional, not decorative clutter.** Use lucide icons at
   consistent stroke-width (1.5–2px) and consistent size per context.

### 3.2 Reference feel
Describe the target feel explicitly to the agent: think apple.com product
pages, or sites like linear.app / stripe.com's cleaner sections — big
statement headline, short supporting line, then structured content in a
calm grid.

---

## 4. Site Structure / Sections

Single-page scroll site (multi-page optional for a `/projects/[slug]`
detail page if you have case studies). Default recommendation: **one-page**
with anchored nav, plus optional individual project pages.

1. **Navigation bar** — fixed/sticky, transparent over hero → solid on
   scroll, logo/name left, section links + resume/CTA right, mobile
   hamburger menu.
2. **Hero** — name, one-line role/positioning statement, short supporting
   sentence, primary CTA (e.g. "View Work") + secondary CTA (e.g.
   "Contact"), optional subtle background element (no stock photo clutter).
3. **About** — short bio, portrait or abstract visual, key facts (location,
   focus areas).
4. **Skills / Stack** — grid of skill categories with lucide icons (e.g.
   Frontend, Backend, Mobile, Tools) — icon + label + optional short
   caption, not a wall of logos.
5. **Projects** — card grid, each card: image/screenshot, title, one-line
   description, tag chips (tech used), link out (GitHub/live). Hover state:
   subtle lift + shadow. Clicking opens live site, GitHub repo, or an
   internal case-study page.
6. **Experience** (optional) — vertical timeline: role, company, dates,
   1–2 line impact summary.
7. **Contact / Footer** — short call to action, email (mailto), social
   links as lucide icons (GitHub, LinkedIn, X/Twitter, etc.), copyright.

---

## 5. Assets the user will provide (agent should treat as inputs, not generate)

- Font files (weights/formats — specify which, e.g. WOFF2 preferred) for
  the Apple-style typeface(s) being used (e.g. SF Pro Display / SF Pro Text
  or equivalents). **Agent must not substitute a different font without
  asking**, and must respect licensing — self-host, don't call Apple's own
  CDN.
- Profile photo / portrait.
- Project screenshots/mockups.
- Resume/CV file (PDF) if a download link is wanted.
- Favicon / logo mark.
- Any brand color reference, if the user has one; otherwise agent proposes
  a palette per Section 3.

Agent should place fonts in `public/fonts/`, define `@font-face` rules (or
Tailwind v4 `@theme` font tokens) once in a global stylesheet, and reference
them via Tailwind font-family tokens — never per-component inline font
declarations.

---

## 6. Technical Requirements

### 6.1 Astro / TypeScript
- `astro.config.mjs` configured for **static output**, with `site` and
  `base` correctly set for GitHub Pages (see Section 7).
- `tsconfig.json` extending Astro's strict config.
- Content (projects, skills, experience) modeled as typed data — either
  Astro Content Collections (with a Zod schema) or a typed `src/data/*.ts`
  file — so adding a new project later is a matter of editing structured
  data, not markup.
- Component structure: `src/components/`, `src/layouts/`, `src/pages/`,
  `src/data/`, `src/styles/`, `src/lib/` (for small utilities like the
  scroll-reveal observer).

### 6.2 Tailwind CSS
- Set up via the official Astro Tailwind integration for the Tailwind
  version in use.
- Define design tokens (colors, font families, spacing scale, container
  width, border radius) in one place rather than repeating arbitrary
  values throughout components.
- Class lists in components should stay readable — extract repeated
  utility combinations into Astro component props/variants rather than
  copy-pasting long class strings everywhere.

### 6.3 Icons
- Use `lucide-astro` (or equivalent lucide package for Astro) so icons are
  tree-shaken and typed, rather than pasting raw SVGs.
- Establish one icon size/stroke convention and reuse it.

### 6.4 Performance & Quality Bar
- Lighthouse targets: Performance ≥ 95, Accessibility ≥ 95, Best Practices
  ≥ 95, SEO ≥ 95 (desktop).
- Images: served via Astro's `<Image />`/`astro:assets` for optimization,
  correct `width`/`height` to avoid layout shift, `loading="lazy"` below
  the fold.
- Fonts: preloaded for the primary heading/body weights, `font-display:
  swap`.
- No layout shift from web fonts or images.
- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<footer>`, correct
  heading hierarchy — one `<h1>`).
- Keyboard navigable, visible focus states, sufficient color contrast
  (WCAG AA minimum), `alt` text on all images, `aria-label`s on icon-only
  buttons/links.
- Responsive from 320px to large desktop; test at mobile, tablet, and
  desktop breakpoints explicitly.
- Meta tags: title, description, Open Graph + Twitter card tags, favicon,
  `robots.txt`, `sitemap.xml` (via `@astrojs/sitemap`).
- No console errors/warnings; no unused dependencies.

---

## 7. Deployment — GitHub Actions → GitHub Pages

### 7.1 Astro config
- Set `site: 'https://<username>.github.io'` in `astro.config.mjs`.
- If deploying to a **project** repo (not `<username>.github.io`), also set
  `base: '/<repo-name>/'` and make sure all internal links/asset paths
  respect the base (use Astro's `base`-aware helpers, not hardcoded root
  paths).

### 7.2 Repository settings
- In GitHub repo **Settings → Pages**, set Source to **"GitHub Actions"**
  (not "Deploy from a branch").

### 7.3 Workflow
- Create `.github/workflows/deploy.yml` using the official Astro GitHub
  Actions flow: `actions/checkout` → `withastro/action` (or manual
  `pnpm install` + `pnpm build` + `actions/upload-pages-artifact`) →
  `actions/deploy-pages`.
- Trigger on push to `main` (and optionally `workflow_dispatch` for manual
  re-runs).
- Correct `permissions` block (`contents: read`, `pages: write`,
  `id-token: write`) and `concurrency` group to avoid overlapping
  deployments.
- Node version pinned explicitly (LTS) in the workflow.

### 7.4 Verification checklist for the agent
- Build succeeds locally (`pnpm build`) with zero errors before pushing.
- Preview the production build locally (`pnpm preview`) and confirm
  asset/base paths resolve correctly.
- After first deploy, confirm the live GitHub Pages URL renders correctly,
  including all asset/font/image paths (this is the most common failure
  point with project-page `base` config).

---

## 8. Build Phases (agent should work through these in order)

1. **Scaffold** — Initialize Astro + TypeScript + Tailwind project,
   commit a clean baseline, confirm `pnpm dev` runs.
2. **Design tokens & fonts** — Wire up the provided fonts, set color/
   spacing/typography tokens, build a bare-bones style guide page (or just
   confirm via the layout) before touching real content.
3. **Layout shell** — Base `Layout.astro` with `<head>` meta, global nav,
   footer, container/grid conventions.
4. **Content data model** — Define typed data for projects/skills/
   experience.
5. **Sections** — Build Hero → About → Skills → Projects → Experience →
   Contact, one at a time, checking responsiveness after each.
6. **Motion & interactivity** — Scroll-reveal, hover states, mobile nav
   toggle, sticky nav behavior.
7. **Polish pass** — Spacing audit, contrast/accessibility audit, favicon/
   OG tags, sitemap, 404 page.
8. **Performance pass** — Image optimization, font preloading, Lighthouse
   run, fix regressions.
9. **CI/CD** — Add the GitHub Actions workflow, configure repo Pages
   settings, do a real deploy, verify the live URL.
10. **Handoff notes** — Agent writes a short `README.md` covering: how to
    run locally, how to add a new project entry, how deployment works, and
    any manual GitHub settings the user still needs to click through.

---

## 9. Questions the agent should ask before/while starting

- Domain: `<username>.github.io` (user site, root deploy, no `base`) or a
  project repo with a custom name (needs `base` set)? Custom domain via
  CNAME?
- Exact font family name(s) and weights being supplied, and their license
  terms for self-hosting.
- Dark mode: required, optional/toggle, or skip entirely?
- One-page scroll site vs. multi-page with dedicated project detail pages?
- Content: how many projects/skills/experience entries to seed initially,
  and does the user want to supply real copy or should the agent draft
  placeholder copy clearly marked as such?
- Contact method: mailto link only, or a working contact form (note: a
  real contact form needs a third-party form backend since GitHub Pages is
  static-only — Formspree, etc. — confirm if wanted before building it).

---

## 10. Definition of Done

- [ ] Site matches the design principles in Section 3 on mobile, tablet,
      and desktop.
- [ ] All content is data-driven and easy to update without touching
      layout code.
- [ ] Lighthouse scores meet the targets in 6.4.
- [ ] Fully keyboard-navigable and screen-reader sane.
- [ ] Builds with zero errors/warnings; TypeScript strict mode passes.
- [ ] GitHub Actions workflow deploys successfully on push to `main`.
- [ ] Live GitHub Pages URL confirmed working with correct asset paths.
- [ ] `README.md` handoff notes written.
