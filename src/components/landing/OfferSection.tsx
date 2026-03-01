"use client";

import Link from "next/link";
import { claimTrialCta } from "@/content/site";
import { scrollToLeadForm } from "@/lib/scroll";
import styles from "./OfferSection.module.css";

const offers = [
  {
    id: "trial",
    title: "Free Trial Session",
    description:
      "Experience our gym with a full free session. Use Technogym equipment, meet our certified trainers, and try steam & sauna — no signup fee or commitment required.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path d="M14.5 3.5C14.5 3.5 14.5 5.5 12 5.5C9.5 5.5 9.5 3.5 9.5 3.5H7.5L4.20711 6.79289C3.81658 7.18342 3.81658 7.81658 4.20711 8.20711L6.5 10.5V20.5H17.5V10.5L19.7929 8.20711C20.1834 7.81658 20.1834 7.18342 19.7929 6.79289L16.5 3.5H14.5Z" />
      </svg>
    ),
  },
  {
    id: "body",
    title: "Free Body Analysis",
    description:
      "Get a complimentary BCA body composition scan. Track body fat, muscle mass and metabolic age so you can set clear goals and measure progress with your trainer.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path d="M4.5 9.5V5.5C4.5 4.94772 4.94772 4.5 5.5 4.5H9.5C10.0523 4.5 10.5 4.94772 10.5 5.5V9.5C10.5 10.0523 10.0523 10.5 9.5 10.5H5.5C4.94772 10.5 4.5 10.0523 4.5 9.5Z" />
        <path d="M13.5 18.5V14.5C13.5 13.9477 13.9477 13.5 14.5 13.5H18.5C19.0523 13.5 19.5 13.9477 19.5 14.5V18.5C19.5 19.0523 19.0523 19.5 18.5 19.5H14.5C13.9477 19.5 13.5 19.0523 13.5 18.5Z" />
        <path d="M4.5 19.5L7.5 13.5L10.5 19.5H4.5Z" />
        <path d="M16.5 4.5C18.1569 4.5 19.5 5.84315 19.5 7.5C19.5 9.15685 18.1569 10.5 16.5 10.5C14.8431 10.5 13.5 9.15685 13.5 7.5C13.5 5.84315 14.8431 4.5 16.5 4.5Z" />
      </svg>
    ),
  },
  {
    id: "benefits",
    title: "Limited Period Benefits",
    description:
      "Join now and lock in special membership rates. New members get the best price plus access to all three branches, group classes, and wellness cafe — no hidden fees.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path d="M20 12V22H4V12" />
        <path d="M22 7H2V12H22V7Z" />
        <path d="M12 22V7" />
        <path d="M12 7H7.5C6.67157 7 6 6.32843 6 5.5C6 4.67157 6.67157 4 7.5 4H12" />
        <path d="M12 7H16.5C17.3284 7 18 6.32843 18 5.5C18 4.67157 17.3284 4 16.5 4H12" />
      </svg>
    ),
  },
];

function Tile({ n }: { n: number }) {
  return <div className={`${styles.tile} ${styles[`tile${n}` as keyof typeof styles]}`} />;
}

export function OfferSection() {
  return (
    <section
      aria-labelledby="offer-heading"
      className={`scroll-mt-20 border-t border-white/10 bg-black px-4 py-16 sm:px-6 lg:px-8 ${styles.offerSection}`}
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="offer-heading"
          className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Start Your Fitness Journey Today
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-fitvilla-light/80 sm:text-lg">
          Get started with a free trial, free body analysis, and limited-time member benefits — no commitment.
        </p>
        <div className={`${styles.grid} mt-12`}>
          {offers.map((offer) => (
            <article key={offer.id} className={styles.card}>
              <span className={styles.icon}>{offer.icon}</span>
              <h4>{offer.title}</h4>
              <p>{offer.description}</p>
              <div className={styles.shine} aria-hidden />
              <div className={styles.background} aria-hidden>
                <div className={styles.tiles}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                    <Tile key={i} n={i} />
                  ))}
                </div>
                <div className={`${styles.line} ${styles.line1}`} />
                <div className={`${styles.line} ${styles.line2}`} />
                <div className={`${styles.line} ${styles.line3}`} />
              </div>
            </article>
          ))}
        </div>
        <div className={styles.ctaWrap}>
          <Link
            href="#lead-form"
            onClick={scrollToLeadForm}
            className="rounded-full bg-fitvilla-cyan px-8 py-3.5 font-semibold text-black transition-all hover:bg-fitvilla-glow hover:shadow-[0_0_20px_rgba(45,212,228,0.35)]"
          >
            {claimTrialCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
