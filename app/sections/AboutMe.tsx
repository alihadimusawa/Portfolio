import {
  BookOpen,
  Code2,
  GraduationCap,
  Languages,
  MapPin,
  UsersRound,
} from "lucide-react";
import {
  aboutSectionContent,
  credentials,
  education,
  organizationExperiences,
  portfolioMetrics,
  profileHighlights,
  researchProjects,
} from "./about.data";
import { formatCounter } from "../lib/format";
import CredentialCard from "./about/CredentialCard";
import EducationTimeline from "./about/EducationTimeline";
import MetricGrid from "./about/MetricGrid";
import OrganizationCard from "./about/OrganizationCard";
import ResearchCard from "./about/ResearchCard";
import styles from "./AboutMe.module.css";
import { sectionIds, siteIdentity } from "./site.data";

export default function AboutMe() {
  const credentialCount = credentials.length;
  const researchProjectCount = researchProjects.length;
  const educationCount = education.length;
  const organizationCount = organizationExperiences.length;

  return (
    <section
      id={sectionIds.about}
      className={styles.aboutSection}
      aria-labelledby="aboutHeading"
    >
      <div className={styles.sectionGrid} aria-hidden="true" />
      <div className={styles.sectionGlow} aria-hidden="true" />
      <div className={styles.backdropWord} aria-hidden="true">
        <span>{aboutSectionContent.backdropWord}</span>
      </div>

      <header className={styles.aboutIntro}>
        <div className={styles.introHeading}>
          <p className={styles.aboutEyebrow}>
            <span aria-hidden="true" />
            {aboutSectionContent.intro.eyebrow}
          </p>
          <h2 id="aboutHeading">
            {aboutSectionContent.intro.heading}{" "}
            <span>{aboutSectionContent.intro.headingAccent}</span>
          </h2>
        </div>

        <div className={styles.introLead}>
          <p>{aboutSectionContent.intro.lead}</p>
          <div className={styles.introCoordinates}>
            <MapPin size={13} strokeWidth={1.7} aria-hidden="true" />
            {siteIdentity.location.fullLabel}
          </div>
        </div>
      </header>

      <div className={styles.aboutGrid}>
        <article
          className={`${styles.panel} ${styles.storyPanel}`}
          data-panel="01"
        >
          <div className={styles.panelTopline}>
            <span>
              <Code2 size={13} strokeWidth={1.7} aria-hidden="true" />
              {aboutSectionContent.snapshot.label}
            </span>
            <span>{aboutSectionContent.snapshot.meta}</span>
          </div>

          <div className={styles.storyCopy}>
            <p className={styles.storyKicker}>
              {aboutSectionContent.snapshot.eyebrow}
            </p>
            <h3>{aboutSectionContent.snapshot.heading}</h3>
          </div>

          <MetricGrid metrics={portfolioMetrics} className={styles.statsGrid} />

          <div className={styles.profileHighlights}>
            <p>{aboutSectionContent.snapshot.highlightsLabel}</p>
            <MetricGrid
              metrics={profileHighlights}
              className={styles.profileStatsGrid}
            />
          </div>
        </article>

        <aside
          className={`${styles.panel} ${styles.languagePanel}`}
          data-panel="02"
          aria-label={aboutSectionContent.credentials.ariaLabel}
        >
          <div className={styles.panelTopline}>
            <span>
              <Languages size={13} strokeWidth={1.7} aria-hidden="true" />
              {aboutSectionContent.credentials.label}
            </span>
            <span>
              {credentialCount === 1
                ? credentials[0].name
                : `${credentialCount} ${aboutSectionContent.credentials.pluralLabel}`}
            </span>
          </div>

          <div className={styles.credentialList}>
            {credentials.map((credential) => (
              <CredentialCard credential={credential} key={credential.id} />
            ))}
          </div>
        </aside>

        <section
          className={`${styles.panel} ${styles.researchPanel}`}
          data-panel="03"
          aria-labelledby="researchHeading"
        >
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionKicker}>
                <BookOpen size={13} strokeWidth={1.7} aria-hidden="true" />
                {aboutSectionContent.research.eyebrow}
              </p>
              <h3 id="researchHeading">
                {aboutSectionContent.research.heading}
              </h3>
            </div>
            <span>
              {formatCounter(researchProjectCount)}{" "}
              {aboutSectionContent.research.countPrefix}{" "}
              {researchProjectCount === 1
                ? aboutSectionContent.research.countSingular
                : aboutSectionContent.research.countPlural}
            </span>
          </div>

          <div className={styles.researchGrid}>
            {researchProjects.map((project, index) => (
              <ResearchCard project={project} index={index} key={project.id} />
            ))}
          </div>
        </section>

        <section
          className={`${styles.panel} ${styles.educationPanel}`}
          data-panel="04"
          aria-labelledby="educationHeading"
        >
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionKicker}>
                <GraduationCap size={13} strokeWidth={1.7} aria-hidden="true" />
                {aboutSectionContent.education.eyebrow}
              </p>
              <h3 id="educationHeading">
                {aboutSectionContent.education.heading}
              </h3>
            </div>
            <span>
              {formatCounter(educationCount)}{" "}
              {educationCount === 1
                ? aboutSectionContent.education.countSingular
                : aboutSectionContent.education.countPlural}
            </span>
          </div>

          <EducationTimeline
            entries={education}
            presentLabel={aboutSectionContent.education.presentLabel}
          />
        </section>

        <section
          className={`${styles.panel} ${styles.communityPanel}`}
          data-panel="05"
          aria-label={aboutSectionContent.organizations.ariaLabel}
        >
          <div className={styles.panelTopline}>
            <span>
              <UsersRound size={13} strokeWidth={1.7} aria-hidden="true" />
              {aboutSectionContent.organizations.label}
            </span>
            <span>
              {formatCounter(organizationCount)}{" "}
              {organizationCount === 1
                ? aboutSectionContent.organizations.countSingular
                : aboutSectionContent.organizations.countPlural}
            </span>
          </div>

          <div className={styles.organizationGrid}>
            {organizationExperiences.map((entry) => (
              <OrganizationCard entry={entry} key={entry.id} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
