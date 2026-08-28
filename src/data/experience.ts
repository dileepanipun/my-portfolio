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
    role: "Senior UI/UX Designer & Frontend Engineer",
    company: "Soft Gallery Pvt. Ltd.",
    location: "Ja-Ela, Sri Lanka",
    start: "Jan 2024",
    end: "Present",
    summary:
      "Leading a team of designers and developers, overseeing the UI/UX and frontend engineering of the company's HR solution and other key products. Responsible for quality standards, team growth, and timely delivery.",
    highlights: [
      "Managing and mentoring a group of designers and frontend engineers across multiple concurrent projects.",
      "Driving continuous improvement of the HR solution's user experience using Angular, SCSS, and modern design patterns.",
    ],
  },
  {
    role: "Junior UI/UX Designer & Frontend Engineer",
    company: "Soft Gallery Pvt. Ltd.",
    location: "Ja-Ela, Sri Lanka",
    start: "Jan 2021",
    end: "Dec 2023",
    summary:
      "Played a central role in the design and frontend engineering of enterprise products. Spearheaded the UI creation of the Gallery Invoice project from scratch, handling complex data visualizations and charting.",
    highlights: [
      "Built the Gallery Invoice product from zero — complex data tables, charts, and multi-source integrations.",
      "Provided guidance and mentorship to interns on frontend best practices and Angular patterns.",
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
