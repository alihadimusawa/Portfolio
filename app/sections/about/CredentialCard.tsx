import type { CSSProperties } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import styles from "../AboutMe.module.css";
import type { Credential } from "../about.data";

function formatScore(score: number) {
  return Number.isInteger(score) ? score.toFixed(1) : String(score);
}

export default function CredentialCard({
  credential,
}: {
  credential: Credential;
}) {
  const score = formatScore(credential.score);
  const maxScore = formatScore(credential.maxScore);
  const segmentCount = Math.max(1, Math.floor(credential.visualSegments));
  const normalizedScore =
    credential.maxScore > 0
      ? Math.min(1, Math.max(0, credential.score / credential.maxScore))
      : 0;
  const scoreRingStyle = {
    "--score-progress": `${normalizedScore * 100}%`,
  } as CSSProperties;
  const scoreTrackStyle = {
    "--score-segment-count": segmentCount,
  } as CSSProperties;
  const filledSegments = normalizedScore * segmentCount;

  return (
    <div className={styles.languageContent}>
      <div
        className={styles.scoreRing}
        style={scoreRingStyle}
        aria-label={`${credential.name} score ${score} out of ${maxScore}`}
      >
        <span>
          <strong>{score}</strong>
          <small>{credential.name}</small>
        </span>
      </div>

      <div className={styles.languageCopy}>
        <p>{credential.eyebrow}</p>
        <h3 id={`credential-${credential.id}`}>{credential.title}</h3>
      </div>

      <section
        className={styles.credentialDetails}
        aria-label={`${credential.name} score details`}
      >
        <div className={styles.scoreScaleLabel}>
          <span>{credential.scaleLabel}</span>
          <span>
            {score} / {maxScore}
          </span>
        </div>

        <div
          className={styles.scoreScaleTrack}
          style={scoreTrackStyle}
          aria-hidden="true"
        >
          {Array.from({ length: segmentCount }, (_, index) => {
            const segmentFill = Math.min(
              100,
              Math.max(0, (filledSegments - index) * 100),
            );

            return (
              <span
                key={index}
                style={
                  {
                    "--score-segment-fill": `${segmentFill}%`,
                  } as CSSProperties
                }
              />
            );
          })}
        </div>

        {credential.status ? (
          <div className={styles.certificateStatus}>
            <CheckCircle2 size={14} strokeWidth={1.8} aria-hidden="true" />
            {credential.status}
          </div>
        ) : null}

        {credential.certificate ? (
          <a
            className={styles.credentialLink}
            href={credential.certificate.href}
            target="_blank"
            rel="noreferrer"
          >
            <span>{credential.certificate.label}</span>
            <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
          </a>
        ) : null}
      </section>
    </div>
  );
}
