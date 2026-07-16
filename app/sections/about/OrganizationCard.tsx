import Image from "next/image";
import styles from "../AboutMe.module.css";
import type { OrganizationEntry } from "../about.data";
import NumberedList from "./NumberedList";

export default function OrganizationCard({
  entry,
}: {
  entry: OrganizationEntry;
}) {
  return (
    <article className={styles.organizationEntry}>
      <div className={styles.communityGlyph}>
        <span>
          <Image
            className={styles.organizationLogo}
            src={entry.logo.src}
            alt={entry.logo.alt}
            width={entry.logo.width}
            height={entry.logo.height}
          />
        </span>
      </div>

      <div className={styles.communityCopy}>
        <p className={styles.organizationKicker}>{entry.name}</p>
        <p className={styles.organizationAffiliation}>{entry.affiliation}</p>
        <h3 id={`organization-${entry.id}`}>{entry.title}</h3>
        <p className={styles.organizationSummary}>{entry.summary}</p>
        <NumberedList
          items={entry.highlights}
          className={styles.projectHighlights}
        />
        {entry.tags.length > 0 ? (
          <ul
            className={styles.communityTags}
            aria-label={`${entry.name} strengths`}
          >
            {entry.tags.map((tag, index) => (
              <li key={`${index}-${tag}`}>{tag}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
