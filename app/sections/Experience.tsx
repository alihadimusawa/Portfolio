import Image from "next/image";
import { ArrowDown, Briefcase, Code2, Sparkles } from "lucide-react";
import { formatCounter, uniqueValues } from "../lib/format";
import {
  experiences,
  experienceSectionContent,
  type Experience,
} from "./experience.data";
import {
  ExperienceEntryReveal,
  ExperienceTimelineShell,
} from "./experience/ExperienceMotion";
import { sectionIds } from "./site.data";
import styles from "./Experience.module.css";

type ExperienceEntryProps = {
  experience: Experience;
  index: number;
  total: number;
};

function ExperienceEntry({
  experience,
  index,
  total,
}: ExperienceEntryProps) {
  const side = index % 2 === 0 ? "left" : "right";
  const chapter = formatCounter(index + 1);
  const totalChapters = formatCounter(total);
  const highlights = experience.highlights ?? [];
  const visibleTechnologies = uniqueValues(experience.technologies ?? []);
  const periodEnd = experience.period.current
    ? {
        label: experience.period.currentLabel ?? "Present",
        dateTime: undefined,
      }
    : experience.period.end;

  return (
    <ExperienceEntryReveal
      className={`${styles.timelineItem} ${
        side === "left" ? styles.timelineItemLeft : styles.timelineItemRight
      }`}
    >
      <span className={styles.timelineConnector} aria-hidden="true">
        <span />
      </span>

      <span className={styles.timelineNode} aria-hidden="true" />

      <div className={styles.experienceDate}>
        <span className={styles.dateChapter} aria-hidden="true">
          {chapter}
        </span>
        <span className={styles.dateContent}>
          <span>Log {chapter} / Period</span>
          <span className={styles.dateRange}>
            <time dateTime={experience.period.start.dateTime}>
              {experience.period.start.label}
            </time>
            {periodEnd && (
              <>
                <span aria-hidden="true">—</span>
                {periodEnd.dateTime ? (
                  <time dateTime={periodEnd.dateTime}>{periodEnd.label}</time>
                ) : (
                  <span>{periodEnd.label}</span>
                )}
              </>
            )}
          </span>
        </span>
      </div>

      <article className={styles.experienceCard} data-chapter={chapter}>
        <span className={styles.cardFrame} aria-hidden="true" />

        <div className={styles.cardTopline}>
          <span className={styles.categoryLabel}>
            <Briefcase size={12} strokeWidth={1.7} aria-hidden="true" />
            {experience.category}
          </span>
          <span className={styles.cardCounter} aria-hidden="true">
            {chapter} / {totalChapters}
          </span>
        </div>

        <div className={styles.experienceCardHeader}>
          {experience.logo && (
            <div className={styles.logoFrame}>
              <Image
                src={experience.logo.src}
                alt={experience.logo.alt ?? ""}
                width={54}
                height={54}
                className={styles.experienceLogo}
              />
            </div>
          )}

          <div>
            <h3>{experience.role}</h3>
            <p className={styles.experienceOrganization}>
              {experience.organization}
            </p>
          </div>
        </div>

        {highlights.length > 0 && (
          <div className={styles.highlightsBlock}>
            <p className={styles.cardSectionLabel}>
              <Sparkles size={13} strokeWidth={1.7} aria-hidden="true" />
              Impact highlights
            </p>

            <ul className={styles.experienceHighlights}>
              {highlights.map((highlight, highlightIndex) => (
                <li key={`${experience.id}-highlight-${highlightIndex}`}>
                  <span aria-hidden="true">
                    {formatCounter(highlightIndex + 1)}
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {visibleTechnologies.length > 0 && (
          <div className={styles.experienceTechnologies}>
            <p className={styles.cardSectionLabel}>
              <Code2 size={13} strokeWidth={1.7} aria-hidden="true" />
              Skills &amp; toolkit
            </p>

            <ul className={styles.technologyList}>
              {visibleTechnologies.map((technology, technologyIndex) => (
                <li
                  key={`${experience.id}-technology-${technologyIndex}`}
                >
                  <span aria-hidden="true">/</span>
                  {technology}
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </ExperienceEntryReveal>
  );
}

export default function Experience() {
  const technologyCount = new Set(
    experiences.flatMap((experience) => experience.technologies ?? []),
  ).size;

  return (
    <section
      id={sectionIds.experience}
      className={styles.experienceSection}
      aria-labelledby="experienceHeading"
    >
      <div className={styles.sectionGrid} aria-hidden="true" />
      <div className={styles.sectionGlow} aria-hidden="true" />
      <div className={styles.backdropWord} aria-hidden="true">
        <span>EXPERIENCE / EXPERIENCE</span>
      </div>

      <header className={styles.experienceIntro}>
        <div className={styles.introHeading}>
          <p className={styles.experienceEyebrow}>
            <span aria-hidden="true" />
            {experienceSectionContent.eyebrow}
          </p>
          <h2 id="experienceHeading">
            {experienceSectionContent.heading.lead}{" "}
            <span>{experienceSectionContent.heading.accent}</span>
          </h2>
        </div>

        <div className={styles.introDetails}>
          <p>{experienceSectionContent.description}</p>

          <div className={styles.timelineSummary}>
            <div>
              <strong>{formatCounter(experiences.length)}</strong>
              <span>{experienceSectionContent.summaryLabels.chapters}</span>
            </div>
            <div>
              <strong>{formatCounter(technologyCount)}</strong>
              <span>{experienceSectionContent.summaryLabels.technologies}</span>
            </div>
          </div>

          <a className={styles.traceLink} href="#experienceTimeline">
            {experienceSectionContent.traceLabel}
            <ArrowDown size={14} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>
      </header>

      <ExperienceTimelineShell>
        <ol className={styles.experienceTimeline}>
          {experiences.map((experience, index) => (
            <ExperienceEntry
              experience={experience}
              index={index}
              total={experiences.length}
              key={experience.id}
            />
          ))}
        </ol>

        <div className={styles.nextChapter}>
          <span className={styles.nextChapterNode} aria-hidden="true" />
          <span>
            <small>{experienceSectionContent.nextChapter.eyebrow}</small>
            <strong>{experienceSectionContent.nextChapter.title}</strong>
          </span>
          <span className={styles.terminalCursor} aria-hidden="true">
            _
          </span>
        </div>
      </ExperienceTimelineShell>
    </section>
  );
}
