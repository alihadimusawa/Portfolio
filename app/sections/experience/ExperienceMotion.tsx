"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import styles from "../Experience.module.css";

export function ExperienceEntryReveal({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.li
      className={className}
      initial={prefersReducedMotion ? false : { y: 28 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.56, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.li>
  );
}

export function ExperienceTimelineShell({
  children,
}: {
  children: ReactNode;
}) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 72%", "end 68%"],
  });
  const timelineProgress = useSpring(scrollYProgress, {
    stiffness: 105,
    damping: 28,
    mass: 0.28,
  });

  return (
    <div
      className={styles.experienceTimelineShell}
      ref={timelineRef}
      id="experienceTimeline"
    >
      <div className={styles.timelineRail} aria-hidden="true">
        <span className={styles.railBase} />
        <motion.span
          className={styles.railProgress}
          style={{ scaleY: prefersReducedMotion ? 1 : timelineProgress }}
        />
      </div>

      {children}
    </div>
  );
}
