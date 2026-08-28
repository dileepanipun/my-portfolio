import type { AstroComponent } from "@lucide/astro";
import { Code, Palette, Server, Wrench } from "@lucide/astro";

export interface SkillCategory {
  title: string;
  caption: string;
  icon: AstroComponent;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    caption: "Component-first interfaces, pixel-perfect.",
    icon: Code,
    items: [
      "Angular",
      "TypeScript",
      "HTML5 / CSS3",
      "SCSS / SASS",
      "Tailwind CSS",
      "Bootstrap",
      "JavaScript",
      "jQuery",
    ],
  },
  {
    title: "Design",
    caption: "From wireframe to polished prototype.",
    icon: Palette,
    items: [
      "Figma",
      "Adobe XD",
      "Sketch",
      "InVision",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "After Effects",
    ],
  },
  {
    title: "Backend & Data",
    caption: "APIs, databases, and server logic.",
    icon: Server,
    items: [
      "PHP",
      "Laravel",
      "MySQL",
      "MongoDB",
      "Spring Boot",
      "REST APIs",
    ],
  },
  {
    title: "Tooling",
    caption: "The workflow layer that ships products.",
    icon: Wrench,
    items: [
      "Git / GitHub / GitLab",
      "JIRA",
      "Postman",
      "Gulp",
      "Flutter",
      "Android (Java)",
      "WebStorm / VS Code",
    ],
  },
];
