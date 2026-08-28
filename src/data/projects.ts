export interface Project {
  slug: string;
  title: string;
  year: string;
  summary: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  image?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "aurora",
    title: "Aurora",
    year: "2026",
    summary: "A calm, keyboard-first note-taking app for focused writers.",
    description:
      "Aurora is a minimalist writing environment with local-first storage, granular version history, and an interface that gets out of the way. Built with Rust + Tauri and a Svelte front-end.",
    tags: ["Rust", "Tauri", "Svelte", "Local-first"],
    liveUrl: "https://example.com/aurora",
    repoUrl: "https://github.com/your-handle/aurora",
    image: "/projects/aurora.svg",
    featured: true,
  },
  {
    slug: "helio",
    title: "Helio",
    year: "2025",
    summary: "Solar production analytics for micro-grid operators.",
    description:
      "A dashboard that turns raw inverter telemetry into human-readable insights, complete with anomaly detection and PDF reporting. Deployed to 40+ sites in Southeast Asia.",
    tags: ["TypeScript", "Next.js", "PostgreSQL", "Timeseries"],
    liveUrl: "https://example.com/helio",
    image: "/projects/helio.svg",
    featured: true,
  },
  {
    slug: "granite",
    title: "Granite",
    year: "2024",
    summary: "A typeface pairing tool for design systems teams.",
    description:
      "Granite lets teams audit typography across products, spot mis-matched weights, and generate a token export for Figma and Tailwind. Used internally by two Fortune 500 design systems.",
    tags: ["React", "WebGL", "Design Tokens"],
    liveUrl: "https://example.com/granite",
    repoUrl: "https://github.com/your-handle/granite",
    image: "/projects/granite.svg",
  },
  {
    slug: "loop",
    title: "Loop",
    year: "2024",
    summary: "A tiny CLI for scripting recurring rituals.",
    description:
      "Loop lets you compose small, composable rituals — daily standups, weekly reviews, monthly retros — as YAML files. Open source and shipping as a single-binary distribution.",
    tags: ["Go", "CLI", "Open Source"],
    repoUrl: "https://github.com/your-handle/loop",
    image: "/projects/loop.svg",
  },
];
