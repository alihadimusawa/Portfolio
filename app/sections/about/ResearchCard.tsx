import { ArrowUpRight } from "lucide-react";
import { formatCounter } from "../../lib/format";
import styles from "../AboutMe.module.css";
import type { ResearchEntry } from "../about.data";
import NumberedList from "./NumberedList";

type ResearchCardProps = {
  project: ResearchEntry;
  index: number;
};

export default function ResearchCard({
  project,
  index,
}: ResearchCardProps) {
  return (
    <article className={styles.researchCard}>
      <div className={styles.researchMeta}>
        <span>R-{formatCounter(index + 1)}</span>
        <span>{project.label}</span>
      </div>
      <h4>{project.title}</h4>
      <NumberedList
        items={project.highlights}
        className={styles.researchPoints}
      />
      {project.publication ? (
        <a
          className={styles.publicationLink}
          href={project.publication.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.publication.label}: ${project.title}`}
        >
          <span>{project.publication.label}</span>
          <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
        </a>
      ) : null}
    </article>
  );
}
