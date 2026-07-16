"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  FileText,
  Mail,
  MapPin,
  Terminal,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import ScrambleText from "../components/ScrambleText";
import styles from "./HomeSection.module.css";
import {
  featuredTechnologies,
  heroContent,
  sectionIds,
  siteIdentity,
  toSectionHref,
} from "./site.data";

const revealGroup: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.045,
    },
  },
};

const revealItem: Variants = {
  hidden: { opacity: 1, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HomeSection() {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { stiffness: 180, damping: 22 });
  const smoothTiltY = useSpring(tiltY, { stiffness: 180, damping: 22 });
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const copyScrollY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const visualScrollY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.78], [1, 0]);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontalPosition = (event.clientX - bounds.left) / bounds.width;
    const verticalPosition = (event.clientY - bounds.top) / bounds.height;

    tiltX.set((0.5 - verticalPosition) * 5);
    tiltY.set((horizontalPosition - 0.5) * 7);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <section
      id={sectionIds.home}
      className={styles.hero}
      ref={heroRef}
      aria-labelledby="homeHeading"
    >
      <div className={styles.heroGrid} aria-hidden="true" />
      <div className={styles.heroGlow} aria-hidden="true" />

      <motion.div
        className={styles.heroCopy}
        variants={revealGroup}
        initial={prefersReducedMotion ? false : "hidden"}
        animate="visible"
        style={{
          y: prefersReducedMotion ? 0 : copyScrollY,
          opacity: prefersReducedMotion ? 1 : heroOpacity,
        }}
      >
        <motion.div className={styles.availability} variants={revealItem}>
          <span className={styles.availabilityDot} aria-hidden="true" />
          <Code2 size={14} strokeWidth={1.8} aria-hidden="true" />
          <span>{heroContent.availabilityLabel}</span>
          <i aria-hidden="true" />
          <span className={styles.availabilityLocation}>
            {siteIdentity.location.fullLabel}
          </span>
        </motion.div>

        <motion.h1
          id="homeHeading"
          className={styles.headline}
          aria-label={heroContent.headline.ariaLabel}
          variants={revealItem}
        >
          <span className={styles.headlineRow} aria-hidden="true">
            {heroContent.headline.primary}{" "}
            <span className={styles.outlineWord}>
              {heroContent.headline.outlined}
            </span>
          </span>
          <span className={styles.accentRow} aria-hidden="true">
            <ScrambleText text={heroContent.headline.accent} duration={480} />
          </span>
        </motion.h1>

        <motion.p className={styles.introduction} variants={revealItem}>
          {heroContent.introduction}
        </motion.p>

        <motion.div className={styles.heroActions} variants={revealItem}>
          <motion.a
            className={styles.primaryAction}
            href={siteIdentity.resumeUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={
              prefersReducedMotion ? undefined : { y: -4, scale: 1.015 }
            }
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
          >
            <FileText size={18} strokeWidth={1.8} aria-hidden="true" />
            {heroContent.resumeActionLabel}
            <ArrowUpRight
              className={styles.actionArrow}
              size={17}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </motion.a>

          <motion.a
            className={styles.secondaryAction}
            href={`mailto:${siteIdentity.email}`}
            whileHover={prefersReducedMotion ? undefined : { y: -3 }}
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
          >
            <Mail size={18} strokeWidth={1.8} aria-hidden="true" />
            {heroContent.emailActionLabel}
          </motion.a>
        </motion.div>

        <motion.div className={styles.focusStrip} variants={revealItem}>
          <p>{heroContent.stackLabel}</p>
          <ul aria-label="Selected technologies">
            {featuredTechnologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.heroVisual}
        initial={
          prefersReducedMotion ? false : { opacity: 1, scale: 0.94, x: 32 }
        }
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.02, ease: [0.16, 1, 0.3, 1] }}
        style={{
          y: prefersReducedMotion ? 0 : visualScrollY,
          rotateX: prefersReducedMotion ? 0 : smoothTiltX,
          rotateY: prefersReducedMotion ? 0 : smoothTiltY,
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
      >
        <span className={styles.visualIndex} aria-hidden="true">
          {heroContent.visualIndex}
        </span>

        <motion.div
          className={styles.portraitOrbit}
          aria-hidden="true"
          initial={{ rotate: -12 }}
          animate={{ rotate: prefersReducedMotion ? -12 : 348 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 28, repeat: Infinity, ease: "linear" }
          }
        >
          <span />
          <span />
        </motion.div>

        <div className={styles.portraitFrame}>
          <motion.div
            className={styles.portraitImageWrap}
            initial={
              prefersReducedMotion ? false : { scale: 0.97 }
            }
            animate={{ scale: 1 }}
            transition={{ duration: 0.48, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={siteIdentity.portrait.imageSrc}
              alt={siteIdentity.portrait.alt}
              fill
              preload
              sizes="(max-width: 600px) 90vw, (max-width: 860px) 78vw, (max-width: 1200px) 40vw, 440px"
              className={styles.portraitImage}
            />
            <div className={styles.portraitTone} aria-hidden="true" />
          </motion.div>

          <motion.span
            className={styles.portraitScan}
            initial={prefersReducedMotion ? false : { y: "-120%", opacity: 0 }}
            animate={
              prefersReducedMotion
                ? { opacity: 0 }
                : { y: "920%", opacity: [0, 0.7, 0] }
            }
            transition={{ duration: 0.68, delay: 0.2, ease: "easeInOut" }}
            aria-hidden="true"
          />

          <div className={styles.portraitCaption}>
            <strong>{siteIdentity.displayName}</strong>
            <span>{siteIdentity.portrait.caption}</span>
          </div>
        </div>

        <motion.div
          className={`${styles.dataChip} ${styles.primaryChip}`}
          initial={prefersReducedMotion ? false : { opacity: 1, x: 20, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.32, delay: 0.28, ease: "easeOut" }}
          whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.02 }}
        >
          <span className={styles.chipIcon}>
            <Terminal size={17} strokeWidth={1.7} aria-hidden="true" />
          </span>
          <span>
            <small>{heroContent.currentMode.label}</small>
            {heroContent.currentMode.value}
          </span>
        </motion.div>

        <motion.div
          className={`${styles.dataChip} ${styles.secondaryChip}`}
          initial={prefersReducedMotion ? false : { opacity: 1, x: -20, y: -8 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.32, delay: 0.34, ease: "easeOut" }}
          whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.02 }}
        >
          <span className={styles.chipIcon}>
            <MapPin size={17} strokeWidth={1.7} aria-hidden="true" />
          </span>
          <span>
            <small>{heroContent.locationChipLabel}</small>
            {siteIdentity.location.shortLabel}
          </span>
        </motion.div>

        <span className={styles.visualCoordinates} aria-hidden="true">
          {siteIdentity.location.coordinates}
        </span>
      </motion.div>

      <motion.a
        className={styles.scrollCue}
        href={toSectionHref(sectionIds.experience)}
        initial={prefersReducedMotion ? false : { opacity: 1, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.44, ease: "easeOut" }}
        whileHover={prefersReducedMotion ? undefined : { y: 3 }}
      >
        <span>{heroContent.scrollLabel}</span>
        <span className={styles.scrollIcon}>
          <ArrowDown size={15} strokeWidth={1.8} aria-hidden="true" />
        </span>
      </motion.a>
    </section>
  );
}
