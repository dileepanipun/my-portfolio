export interface ExperienceEntry {
  role: string;
  company: string;
  location?: string;
  start: string;
  end: string;
  summary: string;
  highlights?: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "Senior Software Engineer",
    company: "We Make Platforms",
    location: "Puerto Rico (Remote)",
    start: "Dec 2023",
    end: "Present",
    summary:
      "Working as a Senior Software Engineer at an international product company, contributing to platform-level engineering across the full stack.",
    highlights: [
      "Joined as a senior engineer bringing design systems and frontend architecture expertise to the team.",
      "Working remotely across time zones on platform products at scale.",
    ],
  },
  {
    role: "UI/UX Designer & Frontend Engineer",
    company: "Soft Gallery Pvt. Ltd.",
    location: "Ja-Ela, Sri Lanka",
    start: "Jan 2021",
    end: "Dec 2023",
    summary:
      "Led design and frontend engineering of enterprise HR and invoicing products. Grew from individual contributor to team lead, overseeing a group of designers and frontend engineers.",
    highlights: [
      "Built the Gallery Invoice product from zero — complex data tables, charts, and multi-source integrations.",
      "Mentored interns and junior engineers on Angular patterns, SCSS architecture, and best practices.",
    ],
  },
  {
    role: "Frontend Engineer",
    company: "Pixzel Technologies",
    location: "Galle, Sri Lanka",
    start: "Aug 2019",
    end: "May 2020",
    summary:
      "Designed and developed user interfaces for client web applications. Gained deep experience with Angular and expanded into Android development, delivering a doctor channeling queue management system.",
    highlights: [
      "Built a doctor channeling system with Bluetooth data transfer — local environment web and Android app.",
      "Expanded the stack with Angular for frontend and Spring Boot for API integration.",
    ],
  },
];
