export type Metric = Readonly<{
  id: string;
  value: string;
  label: string;
  unit?: string;
}>;

export type Credential = Readonly<{
  id: string;
  name: string;
  eyebrow: string;
  title: string;
  score: number;
  maxScore: number;
  /** Label shown beside the score scale, such as "Band score". */
  scaleLabel: string;
  /** Number of visual segments; this can differ from the real maximum score. */
  visualSegments: number;
  status?: string;
  certificate?: Readonly<{
    /** Set to false to keep the certificate data without showing its link. */
    visible?: boolean;
    label: string;
    href: string;
  }>;
}>;

export type ResearchEntry = Readonly<{
  id: string;
  label: string;
  title: string;
  highlights: readonly string[];
  publication?: Readonly<{
    label: string;
    href: string;
  }>;
}>;

export type DatedLabel = Readonly<{
  dateTime: string;
  label: string;
}>;

export type EducationEntry = Readonly<{
  id: string;
  institution: string;
  location: string;
  qualification: string;
  start: DatedLabel;
  end?: DatedLabel;
}>;

export type OrganizationEntry = Readonly<{
  id: string;
  name: string;
  affiliation: string;
  title: string;
  summary: string;
  logo: Readonly<{
    src: string;
    alt: string;
    width: number;
    height: number;
  }>;
  highlights: readonly string[];
  tags: readonly string[];
}>;

export const aboutSectionContent = {
  backdropWord: "ABOUT / ABOUT",
  intro: {
    eyebrow: "Profile signal / human layer",
    heading: "More than the",
    headingAccent: "code.",
    lead: "The experiences behind how I think, collaborate, and turn ambitious ideas into useful products.",
  },
  snapshot: {
    label: "Delivery snapshot",
    meta: "Build record",
    eyebrow: "Portfolio snapshot",
    heading: "Work, quantified.",
    highlightsLabel: "Background highlights",
  },
  credentials: {
    ariaLabel: "Language credentials",
    label: "Language credential",
    pluralLabel: "credentials",
  },
  research: {
    eyebrow: "Research archive",
    heading: "Published Research.",
    countPrefix: "published",
    countSingular: "exploration",
    countPlural: "explorations",
  },
  education: {
    eyebrow: "Education path",
    heading: "Education, one trajectory.",
    presentLabel: "Present",
    countSingular: "chapter",
    countPlural: "chapters",
  },
  organizations: {
    ariaLabel: "Organization experience",
    label: "Organization experience",
    countSingular: "chapter",
    countPlural: "chapters",
  },
} as const;

export const portfolioMetrics: readonly Metric[] = [
  { id: "projects", value: "46+", label: "Projects Completed" },
  { id: "code", value: "30,000+", label: "Lines of Code" },
  { id: "hours", value: "750+", label: "Coding Hours" },
  { id: "technologies", value: "15+", label: "Technologies" },
];

export const profileHighlights: readonly Metric[] = [
  { id: "degree", value: "3.5", unit: "years", label: "Early graduation" },
  {
    id: "internships",
    value: "13",
    unit: "months",
    label: "Internship experience",
  },
  { id: "research", value: "02", unit: "papers", label: "AI research projects" },
  {
    id: "study-abroad",
    value: "06",
    unit: "months",
    label: "Study abroad in Japan",
  },
];

export const credentials: readonly Credential[] = [
  {
    id: "ielts",
    name: "IELTS",
    eyebrow: "English proficiency",
    title: "Overall band score",
    score: 6,
    maxScore: 9,
    scaleLabel: "Band score",
    visualSegments: 9,
    status: "Certificate link available",
    certificate: {
      visible: false,
      label: "View IELTS certificate",
      href: "https://ielts.idp.com/vietnam/about/news-and-articles/article-toeic-and-ielts-level/en-gb",
    },
  },
];

const sharedPublication = {
  label: "Show Publication",
  href: "https://www.researchgate.net/publication/385441728_Exploring_Transformer-Based_Model_in_Sentiment_Analysis_of_Movie_Review",
} as const;

export const researchProjects: readonly ResearchEntry[] = [
  {
    id: "transformer-sentiment-analysis",
    label: "Sentiment intelligence",
    title:
      "Exploring Transformer-Based Model in Sentiment Analysis of Movie Review",
    highlights: [
      "Main author — led the research and writing process.",
      "Presented the findings at an IEEE international conference.",
      "Published in a Scopus-indexed conference proceeding.",
    ],
    publication: sharedPublication,
  },
  {
    id: "enhanced-densenet-classification",
    label: "Environmental AI",
    title:
      "Improving Garbage Image Classification with Enhanced DenseNet Architecture",
    highlights: [
      "Recognized as one of the best papers at the conference.",
      "Contributes to addressing global environmental challenges.",
    ],
    publication: sharedPublication,
  },
];

/*
 * Add another education item here and the timeline will expand automatically.
 * Omit `end` for a degree that is still in progress; the UI will show “Present”.
 */
export const education: readonly EducationEntry[] = [
  {
    id: "kindai-exchange",
    institution: "Kindai University",
    location: "Osaka, Japan",
    qualification: "Exchange Student",
    start: { dateTime: "2025-04", label: "April 2025" },
    end: { dateTime: "2025-08", label: "August 2025" },
  },
  {
    id: "binus-computer-science",
    institution: "BINUS University",
    location: "Jakarta, Indonesia",
    qualification: "Computer Science",
    start: { dateTime: "2022-09", label: "September 2022" },
    end: { dateTime: "2026-01", label: "January 2026" },
  },
];

export const organizationExperiences: readonly OrganizationEntry[] = [
  {
    id: "himti",
    name: "Himpunan Mahasiswa Teknik Informatika",
    affiliation: "BINUS / SOCS",
    title: "Organization Experience.",
    summary:
      "Led and collaborated on student-led initiatives through HIMTI, strengthening how I plan events, communicate across teams, and carry ideas from planning through delivery.",
    logo: {
      src: "/image/himti-logo.webp",
      alt: "HIMTI logo",
      width: 96,
      height: 96,
    },
    highlights: [
      "Helped lead major student events, carrying ideas from planning through delivery.",
      "Collaborated across teams and kept communication clear around shared goals.",
      "Strengthened ownership, coordination, and people-first leadership through organizational work.",
    ],
    tags: ["HIMTI", "Event Leadership", "Team Coordination", "Communication"],
  },
];
