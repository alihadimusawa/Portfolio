"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatCounter } from "../lib/format";
import type { NonEmptyArray, ProjectSlide } from "./projects.data";
import styles from "./Projects.module.css";

type ProjectGalleryProps = {
  galleryId: string;
  projectName: string;
  slides: NonEmptyArray<ProjectSlide>;
};

export default function ProjectGallery({
  galleryId,
  projectName,
  slides,
}: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const lastIndex = slides.length - 1;
  const activeIndex = Math.min(selectedIndex, lastIndex);
  const activeSlide = slides[activeIndex];
  const hasMultipleSlides = slides.length > 1;

  const selectSlide = (nextIndex: number) => {
    setSelectedIndex(Math.min(Math.max(nextIndex, 0), lastIndex));
  };

  const showPrevious = () => {
    selectSlide((activeIndex - 1 + slides.length) % slides.length);
  };

  const showNext = () => {
    selectSlide((activeIndex + 1) % slides.length);
  };

  return (
    <div
      className={styles.gallery}
      role="region"
      aria-label={`${projectName} screenshot gallery`}
    >
      <div className={styles.browserBar} aria-hidden="true">
        <span className={styles.browserDots}>
          <i />
          <i />
          <i />
        </span>
        <span>{projectName}</span>
        <span>
          {formatCounter(activeIndex + 1)} / {formatCounter(slides.length)}
        </span>
      </div>

      <div className={styles.imageFrame}>
        <Image
          className={styles.projectImage}
          src={activeSlide.src}
          alt={
            activeSlide.alt ??
            `${projectName} interface screenshot ${activeIndex + 1} of ${slides.length}`
          }
          fill
          sizes="(max-width: 960px) 90vw, 720px"
        />
        <span className={styles.imageStamp} aria-hidden="true">
          Interface /{" "}
          {activeSlide.label ?? formatCounter(activeIndex + 1)}
        </span>
      </div>

      <div className={styles.galleryControls}>
        <div
          className={styles.slideSelectors}
          role="group"
          aria-label="Choose a screenshot"
        >
          {slides.map((slide, index) => (
            <button
              className={index === activeIndex ? styles.activeSelector : undefined}
              type="button"
              aria-label={`Show ${projectName} screenshot ${index + 1}`}
              aria-pressed={index === activeIndex}
              onClick={() => selectSlide(index)}
              key={`${galleryId}-${slide.id}-${index}`}
            >
              {formatCounter(index + 1)}
            </button>
          ))}
        </div>

        {hasMultipleSlides && (
          <div className={styles.galleryArrows}>
            <button
              type="button"
              aria-label={`Show previous ${projectName} screenshot`}
              onClick={showPrevious}
            >
              <ChevronLeft size={17} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={`Show next ${projectName} screenshot`}
              onClick={showNext}
            >
              <ChevronRight size={17} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      <p className={styles.visuallyHidden} aria-live="polite">
        Showing {projectName} screenshot {activeIndex + 1} of {slides.length}
      </p>
    </div>
  );
}
