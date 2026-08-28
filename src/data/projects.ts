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
    slug: "feehy-admin",
    title: "FEEHY Admin Panel",
    year: "2023",
    summary: "Feature-rich admin dashboard for a POS platform, handling real-time sales, inventory, and reporting.",
    description:
      "Built the FEEHY Admin Panel — a comprehensive dashboard for a mobile POS product. Handled complex data tables, real-time state, and a clean component system using Ant Design and Next.js.",
    tags: ["React", "Next.js", "Ant Design", "TypeScript"],
    featured: true,
  },
  {
    slug: "wedding-vendor-web",
    title: "Wedding Vendor Web",
    year: "2022",
    summary: "A booking platform connecting couples with curated wedding vendors — designed and built end-to-end.",
    description:
      "Full-stack web platform for wedding vendor discovery and booking. Designed the UI in Figma, then built the Angular 12 frontend with Bootstrap and a custom SCSS design system.",
    tags: ["Angular 12", "Bootstrap", "SCSS", "Figma"],
    featured: true,
  },
  {
    slug: "the-pets-pulse",
    title: "The Pet's Pulse",
    year: "2022",
    summary: "Pet marketplace — prototyped in Figma, then shipped as a full Laravel + SCSS web application.",
    description:
      "Designed the full UX flow in Figma, then developed the frontend using Laravel Blade, custom SCSS, and JavaScript. A complete design-to-code project handled solo.",
    tags: ["Laravel", "Figma", "SCSS", "Bootstrap", "JavaScript"],
  },
  {
    slug: "prime-market-terminal",
    title: "Prime Market Terminal",
    year: "2023",
    summary: "Complete brand identity and UI design for a trading platform — prototype, motion, and social assets.",
    description:
      "End-to-end brand and product design for a trading platform: full UI prototype in Figma, brand identity, social media assets, and motion graphics produced in Illustrator, Photoshop, Premiere Pro, and After Effects.",
    tags: ["Figma", "Illustrator", "Photoshop", "After Effects", "Branding"],
  },
];
