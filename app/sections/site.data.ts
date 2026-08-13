/*
 * SITE CONTENT TEMPLATE
 *
 * Keep shared identity, navigation, hero, and contact content in this file.
 * Components should only be responsible for layout and interaction, so most
 * portfolio-wide updates can be made here without duplicating values.
 */

export const sectionIds = {
  mainContent: "main-content",
  home: "homeSection",
  experience: "experienceSection",
  projects: "projectsSection",
  about: "aboutSection",
  contact: "contactSection",
} as const;

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];
type PageSectionKey = Exclude<keyof typeof sectionIds, "mainContent">;
export type PageSectionId = (typeof sectionIds)[PageSectionKey];

export function toSectionHref(sectionId: SectionId): `#${SectionId}` {
  return `#${sectionId}`;
}

export const siteIdentity = {
  fullName: "Ali Hadi Musawa",
  displayName: "Ali Hadi",
  role: "Software engineer",
  email: "alihadishp@gmail.com",
  resumeUrl:
    "https://drive.google.com/file/d/1_hJMKX5bak-BXuEqiWAPcjr6c_O2oSNb/view?usp=sharing",
  location: {
    city: "Jakarta",
    country: "Indonesia",
    fullLabel: "Jakarta, Indonesia",
    shortLabel: "Jakarta, ID",
    coordinates: "06.2088° S / 106.8456° E",
  },
  brand: {
    imageSrc: "/image/Ali-Hadi-Musawa.png",
    imageWidth: 186,
    imageHeight: 20,
  },
  portrait: {
    imageSrc: "/image/ali-profile2.JPG",
    alt: "Portrait of Ali Hadi Musawa",
    caption: "Software engineer / 2026",
  },
} as const;

export const siteMetadata = {
  title: `${siteIdentity.fullName} | Software Engineer`,
  description: `Portfolio of ${siteIdentity.fullName}, a software engineer building reliable and scalable digital products.`,
} as const;

export type NavigationItem = Readonly<{
  label: string;
  href: string;
  sectionId: PageSectionId | null;
  external: boolean;
}>;

function createSectionNavigationItem(
  label: string,
  sectionId: PageSectionId,
): NavigationItem {
  return {
    label,
    sectionId,
    href: toSectionHref(sectionId),
    external: false,
  };
}

export const navigationItems: readonly NavigationItem[] = [
  createSectionNavigationItem("Home", sectionIds.home),
  createSectionNavigationItem("Experience", sectionIds.experience),
  createSectionNavigationItem("Projects", sectionIds.projects),
  createSectionNavigationItem("About", sectionIds.about),
  createSectionNavigationItem("Contact", sectionIds.contact),
  {
    label: "Résumé",
    href: siteIdentity.resumeUrl,
    sectionId: null,
    external: true,
  },
];

export const headerContent = {
  skipLinkLabel: "Skip to content",
  contactLabel: "Let's talk",
  mobileAvailability: "Available for selected opportunities",
} as const;

export const featuredTechnologies = [
  "Next.js",
  "Javascript",
  "Go",
  "Express.js",
  "MySql",
  "Docker",
] as const;

export const heroContent = {
  availabilityLabel: siteIdentity.role,
  headline: {
    ariaLabel: "Code. Create. Innovate.",
    primary: "Code.",
    outlined: "Create.",
    accent: "Innovate.",
  },
  introduction:
    "Hi, im Ali, and yes, i created this myself.",
  resumeActionLabel: "View my résumé",
  emailActionLabel: "Start a conversation",
  stackLabel: "Selected stack",
  visualIndex: "01",
  currentMode: {
    label: "Current mode",
    value: "Building & shipping",
  },
  locationChipLabel: "Based in",
  scrollLabel: "Scroll to explore",
} as const;

export type SocialLink = Readonly<{
  id: string;
  label: string;
  value: string;
  href: string;
  iconSrc: string;
  enabled: boolean;
}>;

/*
 * SOCIAL LINK TEMPLATE
 * Add another object and its icon path to show a channel. Set `enabled` to
 * false to hide a link temporarily without deleting its content.
 */
export const socialLinks: readonly SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    value: "@alihadimusawa",
    href: "https://github.com/alihadimusawa",
    iconSrc: "/image/github.png",
    enabled: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "Ali Hadi Musawa",
    href: "https://www.linkedin.com/in/alimusawa/",
    iconSrc: "/image/linkedin.png",
    enabled: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "+62 813-1059-1197",
    href: "https://wa.me/6281310591197",
    iconSrc: "/image/whatsapp.png",
    enabled: true,
  },
];

export const contactContent = {
  backdropWord: "CONTACT",
  eyebrow: "Available to connect",
  heading: {
    primary: "Have an idea?",
    accent: "Let's give it shape.",
  },
  lead: "Open to collaborations and new opportunities.",
  emailLabel: "Email me",
  channelsLabel: "Connect",
  backToTopLabel: "Back to top",
} as const;
