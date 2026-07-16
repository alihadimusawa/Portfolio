"use client";

import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { formatCounter } from "../lib/format";
import styles from "./Projects.module.css";

type ProjectDisclosureProps = {
  projectId: string;
  projectName: string;
  summary: string;
  highlights: readonly string[];
};

export default function ProjectDisclosure({
  projectId,
  projectName,
  summary,
  highlights,
}: ProjectDisclosureProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleId = `${projectId}-build-toggle`;
  const panelId = `${projectId}-build-details`;

  return (
    <div
      className={`${styles.projectDisclosure} ${
        isOpen ? styles.disclosureOpen : ""
      }`}
    >
      <div
        className={styles.projectDescriptionReveal}
        aria-hidden={isOpen}
      >
        <div className={styles.projectDescriptionInner}>
          <p className={styles.projectDescription}>{summary}</p>
        </div>
      </div>

      <button
        id={toggleId}
        className={styles.disclosureToggle}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={`${isOpen ? "Hide" : "Show"} what I built for ${projectName}`}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className={styles.blockLabel}>
          <Sparkles size={14} strokeWidth={1.7} aria-hidden="true" />
          What I built
        </span>
        <span className={styles.disclosureIcon} aria-hidden="true">
          <ChevronDown size={17} strokeWidth={1.8} />
        </span>
      </button>

      <div
        id={panelId}
        className={styles.disclosureContent}
        role="region"
        aria-labelledby={toggleId}
        aria-hidden={!isOpen}
      >
        <div className={styles.disclosureContentInner}>
          <div className={styles.disclosurePanel}>
            <ul className={styles.highlightList}>
              {highlights.map((highlight, highlightIndex) => (
                <li key={`${projectId}-highlight-${highlightIndex}`}>
                  <span aria-hidden="true">
                    {formatCounter(highlightIndex + 1)}
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
