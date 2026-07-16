"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { formatCounter } from "../lib/format";
import styles from "./Header.module.css";
import {
  headerContent,
  navigationItems,
  sectionIds,
  siteIdentity,
  toSectionHref,
  type PageSectionId,
} from "./site.data";

const trackedSectionIds = navigationItems
  .map((item) => item.sectionId)
  .filter((sectionId): sectionId is PageSectionId => sectionId !== null);

export default function Header() {
  const prefersReducedMotion = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<PageSectionId>(
    sectionIds.home,
  );
  const { scrollY, scrollYProgress } = useScroll();
  const pageProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.25,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const nextIsScrolled = latest > 24;
    setIsScrolled((current) =>
      current === nextIsScrolled ? current : nextIsScrolled,
    );
  });

  useEffect(() => {
    const intersectingSections = new Set<PageSectionId>();
    const sections = trackedSectionIds.flatMap((sectionId) => {
      const element = document.getElementById(sectionId);
      return element ? [element] : [];
    });
    let observer: IntersectionObserver | null = null;

    const handleIntersections: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id as PageSectionId;

        if (entry.isIntersecting) {
          intersectingSections.add(sectionId);
        } else {
          intersectingSections.delete(sectionId);
        }
      });

      const nextActiveSection = [...trackedSectionIds]
        .reverse()
        .find((sectionId) => intersectingSections.has(sectionId));

      if (nextActiveSection) {
        setActiveSection((current) =>
          current === nextActiveSection ? current : nextActiveSection,
        );
      }
    };

    const observeSections = () => {
      observer?.disconnect();
      intersectingSections.clear();

      const activationLine = Math.round(window.innerHeight * 0.42);
      const spaceBelowLine = Math.max(
        window.innerHeight - activationLine - 2,
        0,
      );
      observer = new IntersectionObserver(handleIntersections, {
        // A two-pixel band replaces scroll-time layout reads.
        rootMargin: `-${activationLine}px 0px -${spaceBelowLine}px 0px`,
      });
      sections.forEach((section) => observer?.observe(section));
    };

    observeSections();
    window.addEventListener("resize", observeSections);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", observeSections);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  useEffect(() => {
    const desktopNavigation = window.matchMedia("(min-width: 1081px)");

    const closeMenuOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    desktopNavigation.addEventListener("change", closeMenuOnDesktop);

    return () => {
      desktopNavigation.removeEventListener("change", closeMenuOnDesktop);
    };
  }, []);

  return (
    <motion.header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      initial={prefersReducedMotion ? false : { opacity: 1, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <a
        className={styles.skipLink}
        href={toSectionHref(sectionIds.mainContent)}
      >
        {headerContent.skipLinkLabel}
      </a>

      <div className={styles.shell}>
        <a
          className={styles.brand}
          href={toSectionHref(sectionIds.home)}
          aria-label={`${siteIdentity.fullName} — back to home`}
        >
          <Image
            src={siteIdentity.brand.imageSrc}
            alt=""
            width={siteIdentity.brand.imageWidth}
            height={siteIdentity.brand.imageHeight}
            className={styles.brandLogo}
          />
          <span className={styles.brandSignal} aria-hidden="true" />
        </a>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          {navigationItems.map((item, index) => {
            const isActive = item.sectionId === activeSection;

            return (
              <motion.a
                className={`${styles.navLink} ${isActive ? styles.activeLink : ""}`}
                href={item.href}
                key={item.label}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                aria-current={isActive ? "location" : undefined}
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                transition={{ type: "spring", stiffness: 420, damping: 26 }}
              >
                <span>{formatCounter(index + 1)}</span>
                {item.label}
              </motion.a>
            );
          })}
        </nav>

        <a
          className={styles.contactLink}
          href={toSectionHref(sectionIds.contact)}
        >
          {headerContent.contactLabel}
          <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
        </a>

        <button
          className={styles.menuButton}
          type="button"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? (
            <X size={20} aria-hidden="true" />
          ) : (
            <Menu size={20} aria-hidden="true" />
          )}
        </button>

        <motion.span
          className={styles.pageProgress}
          style={{ scaleX: prefersReducedMotion ? 1 : pageProgress }}
          aria-hidden="true"
        />
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.mobilePanel}
            id="mobile-navigation"
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -12, scale: 0.97 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -8, scale: 0.98 }
            }
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <nav aria-label="Mobile navigation">
              {navigationItems.map((item, index) => {
                const isActive = item.sectionId === activeSection;

                return (
                  <a
                    className={isActive ? styles.mobileActiveLink : ""}
                    href={item.href}
                    key={item.label}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    aria-current={isActive ? "location" : undefined}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{formatCounter(index + 1)}</span>
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className={styles.mobileAvailability}>
              <span aria-hidden="true" />
              {headerContent.mobileAvailability}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
