import { ArrowUpRight, Code2, Layers3 } from "lucide-react";
import { formatCounter, uniqueValues } from "../lib/format";
import ProjectDisclosure from "./ProjectDisclosure";
import ProjectGallery from "./ProjectGallery";
import { projects, projectsSectionContent } from "./projects.data";
import { sectionIds } from "./site.data";
import styles from "./Projects.module.css";

export default function Projects() {
  const screenshotCount = projects.reduce(
    (total, project) => total + project.gallery.slides.length,
    0,
  );

  return (
    <section
      id={sectionIds.projects}
      className={styles.projectsSection}
      aria-labelledby="projectsHeading"
    >
      <div className={styles.sectionGrid} aria-hidden="true" />
      <div className={styles.sectionGlow} aria-hidden="true" />
      <div className={styles.backdropWord} aria-hidden="true">
        <span>PROJECTS / PROJECTS</span>
      </div>

      <header className={styles.projectsIntro}>
        <div className={styles.introHeading}>
          <p className={styles.projectsEyebrow}>
            <span aria-hidden="true" />
            {projectsSectionContent.eyebrow}
          </p>
          <h2 id="projectsHeading">
            {projectsSectionContent.heading.lead}{" "}
            <span>{projectsSectionContent.heading.accent}</span>
          </h2>
        </div>

        <div className={styles.introDetails}>
          <p>{projectsSectionContent.description}</p>
          <dl className={styles.projectSummary}>
            <div>
              <dt>{projectsSectionContent.summaryLabels.projects}</dt>
              <dd>{formatCounter(projects.length)}</dd>
            </div>
            <div>
              <dt>{projectsSectionContent.summaryLabels.screenshots}</dt>
              <dd>{formatCounter(screenshotCount)}</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className={styles.projectList}>
        {projects.map((project, index) => {
          const projectNumber = formatCounter(index + 1);
          const highlights = project.highlights ?? [];
          const technologies = uniqueValues(project.technologies ?? []);
          const availableLinks = (project.links ?? []).filter((link) =>
            link.href.trim(),
          );

          return (
            <article
              className={styles.projectCard}
              id={project.id}
              key={project.id}
            >
              <div className={styles.gallerySide}>
                <ProjectGallery
                  galleryId={project.id}
                  projectName={project.name}
                  slides={project.gallery.slides}
                />
              </div>

              <div className={styles.projectContent}>
                <div className={styles.projectTopline}>
                  <span>Case file / {projectNumber}</span>
                  <span>{project.kind}</span>
                </div>

                <div className={styles.projectIdentity}>
                  <p>{project.organization}</p>
                  <h3>{project.name}</h3>
                  <span>{project.role}</span>
                </div>

                {highlights.length > 0 ? (
                  <ProjectDisclosure
                    projectId={project.id}
                    projectName={project.name}
                    summary={project.summary}
                    highlights={highlights}
                  />
                ) : (
                  <p className={styles.projectDescriptionStandalone}>
                    {project.summary}
                  </p>
                )}

                {technologies.length > 0 && (
                  <div className={styles.projectBlock}>
                    <p className={styles.blockLabel}>
                      <Code2 size={13} strokeWidth={1.7} aria-hidden="true" />
                      Toolkit
                    </p>
                    <ul className={styles.technologyList}>
                      {technologies.map((technology, technologyIndex) => (
                        <li
                          key={`${project.id}-technology-${technologyIndex}`}
                        >
                          {technology}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {availableLinks.length > 0 && (
                  <div className={styles.projectLinks}>
                    {availableLinks.map((link, linkIndex) => (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        key={`${project.id}-${link.id}-${linkIndex}`}
                      >
                        {link.label}
                        <ArrowUpRight
                          size={15}
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <span className={styles.cardIndex} aria-hidden="true">
                <Layers3 size={14} strokeWidth={1.6} />
                {projectNumber} / {formatCounter(projects.length)}
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
