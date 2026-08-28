/**
 * Central site metadata.
 * Update this file to change any global content — every layout/page pulls from here.
 */
export const site = {
  name: "Dileepa Nipun",
  role: "UI/UX Designer & Frontend Engineer",
  tagline: "Designing and engineering interfaces where craft meets clarity.",
  description:
    "Portfolio of Dileepa Nipun — a UI/UX Designer and Frontend Engineer based in Galle, Sri Lanka, with 5+ years of experience building considered web interfaces end-to-end.",
  email: "dileepa9646@gmail.com",
  location: "Galle, Sri Lanka",
  resumeUrl: "/resume.pdf",
  ogImage: "/og.png",
  socials: {
    github: "https://github.com/dileepanipun",
    linkedin: "https://www.linkedin.com/in/dileepa-nipun-salinda-270013169/",
    x: "https://x.com/dileepanipun",
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
