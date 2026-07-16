import { formatCounter } from "../lib/format";

export type NonEmptyArray<T> = readonly [T, ...T[]];

export type ProjectSlide = Readonly<{
  /** Stable identifier that is independent of the slide's position. */
  id: string;
  src: string;
  alt?: string;
  label?: string;
}>;

export type ProjectLink = Readonly<{
  id: string;
  label: string;
  href: string;
}>;

export type Project = Readonly<{
  id: string;
  name: string;
  organization: string;
  kind: string;
  role: string;
  summary: string;
  highlights?: readonly string[];
  technologies?: readonly string[];
  gallery: Readonly<{
    /** At least one slide is required, so the gallery always has an image. */
    slides: NonEmptyArray<ProjectSlide>;
  }>;
  /** Add any link type you need. Omit the array to hide the link row. */
  links?: readonly ProjectLink[];
}>;

type ProjectSlideConvention = Readonly<{
  baseName: string;
  extension: "jpeg" | "jpg" | "png" | "webp";
  slideNumbers: NonEmptyArray<number>;
}>;

/**
 * Builds slides that follow public/image/{baseName}_slide{number}.{extension}.
 * For images with different filenames, write the `gallery.slides` objects
 * explicitly instead.
 */
export function createProjectSlides({
  baseName,
  extension,
  slideNumbers,
}: ProjectSlideConvention): NonEmptyArray<ProjectSlide> {
  const createSlide = (number: number): ProjectSlide => ({
    id: `${baseName}-slide-${number}`,
    src: `/image/${baseName}_slide${number}.${extension}`,
    label: formatCounter(number),
  });
  const [firstSlide, ...remainingSlides] = slideNumbers;

  return [createSlide(firstSlide), ...remainingSlides.map(createSlide)];
}

export const projectsSectionContent = {
  eyebrow: "Selected work / product archive",
  heading: {
    lead: "Products built for",
    accent: "real problems.",
  },
  description:
    "A growing archive of professional, team-led, and independent products designed around real user needs.",
  summaryLabels: {
    projects: "Projects",
    screenshots: "Interface views",
  },
} as const;

/*
 * PROJECT TEMPLATE
 *
 * 1. Put screenshots in public/image using this naming pattern:
 *    projectName_slide1.webp, projectName_slide2.webp, and so on. WebP keeps
 *    deployment size small while Next.js handles responsive delivery.
 * 2. Copy one project object below and update its text.
 * 3. Use `createProjectSlides` for convention-based filenames, or write an
 *    explicit non-empty `gallery.slides` array for any other image paths.
 * 4. Add any buttons you need to `links` with a unique id, label, and URL.
 *    Empty links are hidden, and the entire field can be omitted.
 */
export const projects = [
  {
    id: "vehicle-management-system",
    name: "Vehicle Management System",
    organization: "Moladin",
    kind: "Professional platform",
    role: "Software Engineer",
    summary:
      "A connected operations platform that keeps vehicle data, device health, and live activity visible in one place.",
    highlights: [
      "Built a tagging workflow that integrates IoT devices and third-party services to track card locations, VIN-linked vehicle details, and connection health.",
      "Implemented WebSocket connections to deliver real-time status updates across the platform.",
      "Created cross-user notifications with browser alerts whenever new activity arrives.",
      "Developed a shared Keycloak login experience used across Moladin systems.",
    ],
    technologies: [
      "Next.js",
      "Golang",
      "Node.js",
      "MySQL",
      "Docker",
      "WebSocket",
      "Keycloak",
      "Python",
      "Figma",
      "IoT APIs",
    ],
    gallery: {
      slides: createProjectSlides({
        baseName: "moladin",
        extension: "webp",
        slideNumbers: [1, 2, 3, 4],
      }),
    },
  },
  {
    id: "hpv-vaccination-platform",
    name: "HPV Vaccination Website",
    organization: "Team project",
    kind: "HealthTech platform",
    role: "Team Lead · Team of 5",
    summary:
      "A vaccination discovery and reservation platform that helps people find available hospitals, book appointments, and pay with confidence.",
    highlights: [
      "Led a five-person team in building a flow for discovering hospitals and reserving HPV vaccination appointments.",
      "Created an admin workspace for adding, updating, and removing hospital availability.",
      "Integrated a payment gateway to verify transactions before confirming reservations.",
      "Developed educational pages that make HPV prevention information easier to understand.",
    ],
    technologies: [
      "Laravel",
      "MySQL",
      "API Integration",
      "Payment Gateway",
      "GitHub",
      "Figma",
      "Database Design",
      "Team Leadership",
      "Agile",
    ],
    gallery: {
      slides: createProjectSlides({
        baseName: "hpv",
        extension: "webp",
        slideNumbers: [1, 2, 3, 4, 5],
      }),
    },
    links: [
      {
        id: "live",
        label: "Visit website",
        href: "https://hpv-vaccination.up.railway.app/",
      },
      {
        id: "github",
        label: "View GitHub",
        href: "https://github.com/alihadimusawa/hpv-vacctination",
      },
    ],
  },
  {
    id: "fourlines",
    name: "Fourlines",
    organization: "Fourlines Travel LTD",
    kind: "Individual project",
    role: "Full-stack Developer",
    summary:
      "An all-in-one hospitality website that combines hotel room availability with a polished company profile and travel content.",
    highlights: [
      "Independently designed and developed the platform from the ground up.",
      "Created a hotel catalogue where visitors can explore properties and check room availability.",
      "Combined the booking experience, company profile, and travel content within one cohesive website.",
    ],
    technologies: [
      "PostgreSQL",
      "Express.js",
      "React",
      "Node.js",
      "Postman",
      "Figma",
    ],
    gallery: {
      slides: createProjectSlides({
        baseName: "fourlines",
        extension: "webp",
        slideNumbers: [2, 3, 4],
      }),
    },
  },
] satisfies readonly Project[];
