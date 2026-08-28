# Portfolio

A typography-first, dark-mode-only personal portfolio built with Astro, Tailwind CSS v4, and GSAP.
Content-driven, statically generated, and deployed to GitHub Pages via GitHub Actions.

---

## Stack

| Layer            | Choice                                           |
| ---------------- | ------------------------------------------------ |
| Framework        | Astro 7 (static output)                          |
| Language         | TypeScript (strict)                              |
| Styling          | Tailwind CSS v4 (via `@tailwindcss/vite`)        |
| Icons            | `@lucide/astro` + inline brand SVGs              |
| Fonts            | Self-hosted Inter + JetBrains Mono (`@fontsource-variable/*`) |
| Animation        | GSAP + ScrollTrigger + `split-type`              |
| Hosting          | GitHub Pages via GitHub Actions                  |
| Package manager  | npm (pnpm-compatible)                            |

---

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build → dist/
npm run preview    # preview the production build locally
npm run typecheck  # astro check (TypeScript)
```

Node 22 or newer is required (see `engines` in `package.json`).

---

## Editing content

Everything content-shaped lives in typed data files under `src/data/` — you
should almost never need to touch component markup to change copy.

| Data                              | File                            |
| --------------------------------- | ------------------------------- |
| Name, tagline, socials, nav links | `src/data/site.ts`              |
| Projects                          | `src/data/projects.ts`          |
| Skill categories                  | `src/data/skills.ts`            |
| Work experience                   | `src/data/experience.ts`        |

### Adding a project

Append a new entry to the `projects` array in `src/data/projects.ts`:

```ts
{
  slug: "new-thing",
  title: "New Thing",
  year: "2026",
  summary: "One sentence about the project.",
  description: "A longer paragraph if you need a case-study surface later.",
  tags: ["TypeScript", "React"],
  liveUrl: "https://example.com",
  repoUrl: "https://github.com/you/new-thing",
  image: "/projects/new-thing.svg",
}
```

That's it — the Projects section reads from this array and re-renders.

---

## Design system

Design tokens live at the top of `src/styles/global.css` inside an `@theme` block.
Change a token there and it propagates everywhere via Tailwind classes:

- `--color-bg`, `--color-surface`, `--color-primary`, `--color-secondary`,
  `--color-muted`, `--color-accent` — palette
- `--font-sans`, `--font-display`, `--font-mono` — font families
- `--text-display-xs` … `--text-display-2xl` — display type scale
- `--container-page` — max content width

The site is dark-mode-only by design (no light-mode toggle).
`color-scheme: dark` is set on `:root` so form controls and scrollbars match.

### Swapping fonts

Two options:

1. **Keep Inter + JetBrains Mono** (default). Nothing to do.
2. **Use your own Apple-style fonts** (e.g. SF Pro):
   - Drop WOFF2 files into `public/fonts/`.
   - Replace the two `@import "@fontsource-variable/…"` lines at the top of
     `src/styles/global.css` with your own `@font-face` declarations.
   - Update `--font-sans`, `--font-display`, `--font-mono` in the `@theme` block
     to reference your new family names.
   - Update the font preload `href` in `src/layouts/Layout.astro` (currently
     imports `@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url`).

---

## Animation

Scroll-driven reveals are declarative — add `data-reveal` and an optional
`data-reveal-kind` attribute to any element:

```astro
<h2 data-reveal data-reveal-kind="lines">Big headline reveals line-by-line.</h2>
<p  data-reveal data-reveal-kind="chars">Character-by-character reveal.</p>
<p  data-reveal data-reveal-kind="words">Word-by-word reveal.</p>
<p  data-reveal>Plain fade + slide-up (default).</p>
```

Optional tuning attributes:

- `data-reveal-delay="0.2"` — start delay in seconds
- `data-reveal-stagger="0.05"` — per-unit stagger for chars/words/lines

Under the hood, `src/lib/splitReveal.ts` uses `split-type` to break text into
spans, then hands them to GSAP + ScrollTrigger. Animations fire once and don't
reverse on scroll-up (Apple-style). `prefers-reduced-motion` shows everything
instantly with no animation.

---

## Assets you should replace before shipping

Everything in this list is a placeholder you own — swap them in before deploy.

| File                                          | What it is                              |
| --------------------------------------------- | --------------------------------------- |
| `src/data/site.ts`                            | Name, email, socials, role, tagline     |
| `src/data/projects.ts`                        | Project entries                         |
| `src/data/skills.ts`                          | Skill categories                        |
| `src/data/experience.ts`                      | Career history                          |
| `public/favicon.svg`                          | Site favicon                            |
| `public/favicon.ico`                          | Fallback favicon                        |
| `public/og.png`                               | 1200x630 social share image (add this)  |
| `public/resume.pdf`                           | Optional résumé download (add this)     |
| `public/projects/*`                           | Project screenshots (add these)         |
| `public/robots.txt`                           | Update sitemap URL if using project base |

---

## Deployment (GitHub Pages)

The included GitHub Actions workflow (`.github/workflows/deploy.yml`) builds
the site on every push to `main` and publishes it to GitHub Pages.

### One-time setup

1. **Push the repo to GitHub.**
2. **Repo Settings → Pages → Source:** set to **"GitHub Actions"** (not
   "Deploy from a branch").
3. **Choose your URL shape.** The workflow reads two optional GitHub
   Repository Variables (Settings → Secrets and variables → Actions →
   Variables):

   | Variable    | Value for a user site                     | Value for a project site        |
   | ----------- | ----------------------------------------- | ------------------------------- |
   | `SITE_URL`  | `https://<username>.github.io`            | `https://<username>.github.io`  |
   | `BASE_PATH` | `/`                                       | `/<repo-name>/`                 |

   If unset, the workflow defaults to project-site behavior with the current
   repo name. **User site (`<username>.github.io`) must set `BASE_PATH=/`.**
4. **Push to `main`** — the workflow runs, builds, and deploys.

### Verifying

After the first successful deploy, open the live URL from the Actions run and
verify:

- Fonts load (Inter should render, not a system fallback).
- Nav, hero, and section reveals fire on scroll.
- All asset paths resolve (favicon, sitemap, `robots.txt`).

If a project-site deploy renders unstyled or with broken asset paths, that's
almost always the `BASE_PATH` env var not being set correctly. Set it to
`/<repo-name>/` (with both leading and trailing slashes) and re-run.

---

## Project structure

```
.
├── .github/workflows/deploy.yml   # Pages CI/CD
├── astro.config.mjs               # site/base/sitemap/tailwind config
├── public/                        # static assets (favicon, og.png, resume, etc.)
├── src/
│   ├── components/
│   │   ├── Container.astro        # max-width wrapper
│   │   ├── Footer.astro
│   │   ├── Nav.astro              # sticky nav + mobile menu
│   │   ├── SectionHeader.astro
│   │   ├── SocialIcon.astro       # inline brand SVGs
│   │   └── sections/              # Hero, About, Skills, Projects, Experience, Contact
│   ├── data/
│   │   ├── site.ts                # global site metadata
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   └── experience.ts
│   ├── layouts/
│   │   └── Layout.astro           # <head>, nav, footer, script wiring
│   ├── lib/
│   │   ├── gsap.ts                # single GSAP+ScrollTrigger import surface
│   │   ├── nav.ts                 # sticky-nav + mobile-menu controller
│   │   └── splitReveal.ts         # scroll-reveal engine
│   ├── pages/
│   │   ├── 404.astro
│   │   └── index.astro
│   └── styles/
│       └── global.css             # design tokens (@theme) + base + utilities
└── tsconfig.json                  # extends astro/tsconfigs/strict
```

---

## Quality bar

- Lighthouse: aim for 95+ on Performance, Accessibility, Best Practices, SEO.
- Semantic HTML: single `<h1>`, real `<nav>` / `<main>` / `<footer>` / `<section>`.
- Keyboard-navigable: skip link, visible focus rings, `aria-label`s on
  icon-only controls, `Escape` closes the mobile menu.
- Reduced motion: `[data-reveal]` elements resolve to their final state with
  no animation when `prefers-reduced-motion: reduce`.
- No client-side framework hydration cost — all interactivity is a single
  small vanilla-TS bundle.
