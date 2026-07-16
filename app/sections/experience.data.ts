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
      "Developed backend services to transform raw POS transaction data into standardized formats compatible with government tax systems.",
      "Implemented data processing pipelines to validate, transform, and prepare transaction data before submission to external government platforms.",
      "Maintained data integrity and consistency throughout the transaction processing workflow.",
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
      "Collaborated with the Singapore engineering team in an English-speaking, cross-functional environment.",
      "Developed and integrated a push notification system using Firebase Cloud Messaging (FCM).",
      "Designed and implemented a tagging feature integrated with third-party APIs, increasing workflow efficiency by 60% and reducing operational costs by 50%.",
      "Wrote unit tests to ensure code quality, improve reliability, and reduce regressions.",
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
      "Built a hotel management website from the ground up.",
      "Designed the application around the PERN stack.",
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
