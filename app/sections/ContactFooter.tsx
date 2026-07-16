import Image from "next/image";
import { ArrowUp, ArrowUpRight, Mail, MapPin } from "lucide-react";
import { formatCounter } from "../lib/format";
import styles from "./ContactFooter.module.css";
import {
  contactContent,
  sectionIds,
  siteIdentity,
  socialLinks,
  toSectionHref,
} from "./site.data";

export default function ContactFooter() {
  const currentYear = new Date().getFullYear();
  const visibleSocialLinks = socialLinks.filter(
    (link) => link.enabled && link.href.trim().length > 0,
  );

  return (
    <footer
      id={sectionIds.contact}
      className={styles.contactFooter}
      aria-labelledby="contactHeading"
    >
      <div className={styles.contactShell}>
        <div className={styles.sectionGrid} aria-hidden="true" />
        <div className={styles.sectionGlow} aria-hidden="true" />
        <div className={styles.backdropWord} aria-hidden="true">
          {contactContent.backdropWord}
        </div>

        <div className={styles.contactBody}>
          <div className={styles.contactCopy}>
            <p className={styles.contactEyebrow}>
              <span aria-hidden="true" />
              {contactContent.eyebrow}
            </p>
            <h2 id="contactHeading">
              {contactContent.heading.primary}{" "}
              <span>{contactContent.heading.accent}</span>
            </h2>
            <p className={styles.contactLead}>{contactContent.lead}</p>

            <a
              className={styles.emailLink}
              href={`mailto:${siteIdentity.email}`}
              aria-label={`Email ${siteIdentity.displayName} at ${siteIdentity.email}`}
            >
              <Mail size={18} strokeWidth={1.7} aria-hidden="true" />
              <span>
                <small>{contactContent.emailLabel}</small>
                {siteIdentity.email}
              </span>
              <ArrowUpRight size={19} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </div>

          <address className={styles.contactChannels}>
            <div className={styles.channelTopline}>
              <span>{contactContent.channelsLabel}</span>
              <span>{formatCounter(visibleSocialLinks.length)}</span>
            </div>

            <ul className={styles.channelList}>
              {visibleSocialLinks.map((link, index) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span
                      className={`${styles.channelIcon} ${styles.channelIconAsset}`}
                      aria-hidden="true"
                    >
                      <Image
                        className={styles.channelIconImage}
                        src={link.iconSrc}
                        alt=""
                        width={24}
                        height={24}
                      />
                    </span>
                    <span>
                      <small>
                        {formatCounter(index + 1)} / {link.label}
                      </small>
                      <strong>{link.value}</strong>
                    </span>
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </address>
        </div>

        <div className={styles.footerLine}>
          <small>
            © {currentYear} {siteIdentity.fullName}.
          </small>

          <div className={styles.location}>
            <MapPin size={13} strokeWidth={1.7} aria-hidden="true" />
            {siteIdentity.location.fullLabel}
          </div>

          <a
            className={styles.backToTop}
            href={toSectionHref(sectionIds.home)}
          >
            {contactContent.backToTopLabel}
            <ArrowUp size={14} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
