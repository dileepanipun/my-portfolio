/**
 * Central site metadata.
 * Update the placeholders here — every layout/page pulls from this file.
 */
export const site = {
  name: "Your Name",
  role: "Designer & Developer",
  tagline: "Building calm, considered interfaces on the web.",
  description:
    "Portfolio of Your Name — a designer and developer crafting minimal, typography-led interfaces and thoughtful digital products.",
  email: "hello@example.com",
  location: "Earth",
  resumeUrl: "/resume.pdf",
  ogImage: "/og.png",
  socials: {
    github: "https://github.com/your-handle",
    linkedin: "https://www.linkedin.com/in/your-handle/",
    x: "https://x.com/your-handle",
  },
  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export type SiteConfig = typeof site;
