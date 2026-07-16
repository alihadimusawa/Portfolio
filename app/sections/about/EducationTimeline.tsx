import { formatCounter } from "../../lib/format";
import styles from "../AboutMe.module.css";
import type { EducationEntry } from "../about.data";

type EducationTimelineProps = {
  entries: readonly EducationEntry[];
  presentLabel: string;
};

export default function EducationTimeline({
  entries,
  presentLabel,
}: EducationTimelineProps) {
  return (
    <ol className={styles.educationTimeline}>
      {entries.map((entry, index) => (
        <li key={entry.id}>
          <span className={styles.educationNode} aria-hidden="true">
            <span>{formatCounter(index + 1)}</span>
          </span>
          <article>
            <div className={styles.educationTitle}>
              <div>
                <h4>{entry.institution}</h4>
                <p>{entry.location}</p>
              </div>
              <span className={styles.educationQualification}>
                {entry.qualification}
              </span>
            </div>
            <p className={styles.educationDate}>
              <time dateTime={entry.start.dateTime}>{entry.start.label}</time>
              <span aria-hidden="true">—</span>
              {entry.end ? (
                <time dateTime={entry.end.dateTime}>{entry.end.label}</time>
              ) : (
                <span>{presentLabel}</span>
              )}
            </p>
          </article>
        </li>
      ))}
    </ol>
  );
}
