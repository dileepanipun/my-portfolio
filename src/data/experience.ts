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
    role: "Senior Product Engineer",
    company: "Northwind Labs",
    location: "Remote",
    start: "2023",
    end: "Present",
    summary:
      "Leading the design-engineering effort on Northwind's flagship analytics product. Shipping features end-to-end, from architectural design to interface polish.",
    highlights: [
      "Rebuilt the reporting engine, cutting p95 render time from 4.1s to 380ms.",
      "Introduced a design token pipeline shared across web and mobile clients.",
    ],
  },
  {
    role: "Frontend Engineer",
    company: "Meridian",
    location: "Singapore",
    start: "2021",
    end: "2023",
    summary:
      "Owned the design system and public marketing surface for Meridian's fintech platform. Set the bar for accessibility and motion craft across the org.",
    highlights: [
      "Shipped the v2 marketing site with a 41% lift in demo bookings.",
      "Trained 12 engineers on modern CSS + accessible interaction patterns.",
    ],
  },
  {
    role: "Design Technologist",
    company: "Independent",
    location: "Remote",
    start: "2019",
    end: "2021",
    summary:
      "Contract work with early-stage startups on brand systems, product design, and shippable front-end prototypes.",
  },
];
