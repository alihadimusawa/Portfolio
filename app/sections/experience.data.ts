export type ExperienceDate = Readonly<{
  /** Machine-readable value used by the HTML `time` element. */
  dateTime: string;
  /** Human-readable month or date shown in the timeline. */
  label: string;
}>;

export type Experience = Readonly<{
  /** Keep this unique and unchanged so React can preserve the card correctly. */
  id: string;
  role: string;
  organization: string;
  /** Explicitly controls the label at the top of the card. */
  category: string;
  period: Readonly<{
    start: ExperienceDate;
    /** Omit `end` and set `current` to true for an ongoing role. */
    end?: ExperienceDate;
    current?: boolean;
    currentLabel?: string;
  }>;
  logo?: Readonly<{
    src: string;
    alt?: string;
  }>;
  highlights?: readonly string[];
  technologies?: readonly string[];
}>;

export const experienceSectionContent = {
  eyebrow: "Career signal / online",
  heading: {
    lead: "Where ideas became",
    accent: "impact.",
  },
  description:
    "Real-world projects built to solve problems, improve workflows, and create measurable impact.",
  summaryLabels: {
    chapters: "Selected chapters",
    technologies: "Tools & platforms",
  },
  traceLabel: "Trace the journey",
  nextChapter: {
    eyebrow: "Next signal",
    title: "The story is still compiling.",
  },
} as const;

/*
 * EXPERIENCE TEMPLATE
 *
 * Copy one object, give it a unique `id`, and update the fields. The timeline
 * alternates sides and its counters update automatically. For a current role,
 * omit `period.end` and set `period.current` to true. `logo`, `highlights`, and
 * `technologies` are optional, so leaving any of them out will not leave an
 * empty block in the card.
 */
export const experiences = [
  {
    id: "subaga-2026",
    role: "Programmer",
    organization: "Subaga Mitra Solusi",
    category: "Engineering log",
    period: {
      start: { dateTime: "2026-07", label: "July 2026" },
      current: true,
    },
    highlights: [
      "Converted POS transactions into government-ready tax data.",
      "Built pipelines to validate data before submission.",
      "Kept transaction data accurate and consistent.",
    ],
    technologies: ["PHP", "FileZilla", "Terminus", "MySQL"],
    logo: {
      src: "/image/logo-subaga.png",
    },
  },
  {
    id: "moladin-2025",
    role: "Software Engineer Intern",
    organization: "Moladin",
    category: "Engineering log",
    period: {
      start: { dateTime: "2025-09", label: "Sept 2025" },
      end: { dateTime: "2026-07", label: "July 2026" },
    },
    highlights: [
      "Worked with a Singapore-based engineering team.",
      "Built push notifications with Firebase Cloud Messaging.",
      "Built API-powered tagging, improving efficiency by 60% and cutting costs by 50%.",
      "Added unit tests to prevent regressions.",
    ],
    technologies: [
      "Docker",
      "Next.js",
      "Golang",
      "Node.js",
      "MySQL",
      "DBeaver",
      "Postman",
      "Bitbucket",
    ],
    logo: {
      src: "/image/moladin-logo.webp",
    },
  },
  {
    id: "fourlines-2024",
    role: "Software Engineer Intern",
    organization: "Fourlines Travel LTD",
    category: "Engineering log",
    period: {
      start: { dateTime: "2024-10", label: "Oct 2024" },
      end: { dateTime: "2024-12", label: "Dec 2024" },
    },
    highlights: [
      "Built a hotel management website from scratch.",
      "Used the PERN stack.",
    ],
    technologies: [
      "PostgreSQL",
      "Express.js",
      "React",
      "Node.js",
      "Postman",
    ],
    logo: {
      src: "/image/fourlines-logo.webp",
    },
  },
] satisfies readonly Experience[];
