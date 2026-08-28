import type { AstroComponent } from "@lucide/astro";
import { Code, Server, Smartphone, Wrench } from "@lucide/astro";

export interface SkillCategory {
  title: string;
  caption: string;
  icon: AstroComponent;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    caption: "Interface, motion, systems.",
    icon: Code,
    items: [
      "TypeScript",
      "React",
      "Astro",
      "Svelte",
      "Tailwind CSS",
      "GSAP",
      "Design Tokens",
    ],
  },
  {
    title: "Backend",
    caption: "APIs, data, infrastructure.",
    icon: Server,
    items: [
      "Node.js",
      "Rust",
      "Go",
      "PostgreSQL",
      "Redis",
      "REST & GraphQL",
      "Docker",
    ],
  },
  {
    title: "Mobile",
    caption: "Cross-platform native craft.",
    icon: Smartphone,
    items: ["React Native", "Swift", "Kotlin", "Expo", "Fastlane"],
  },
  {
    title: "Tooling",
    caption: "Build, ship, iterate.",
    icon: Wrench,
    items: [
      "Figma",
      "Git & GitHub Actions",
      "Vercel & Cloudflare",
      "Playwright",
      "Vitest",
      "pnpm",
    ],
  },
];
