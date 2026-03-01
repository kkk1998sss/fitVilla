"use client";

import Image from "next/image";
import Link from "next/link";
import { getAllLocations } from "@/content/locations";
import { locationsHeadline } from "@/content/site";
import styles from "./LocationStackCarousel.module.css";

const MARQUEE_ITEMS = 6; // duplicate 3 locations twice for seamless loop

export function LocationStackCarousel() {
  const locations = getAllLocations();
  const items = Array.from({ length: MARQUEE_ITEMS }, (_, i) => locations[i % locations.length]);

  return (
    <section
      className="scroll-mt-20 border-t border-white/10 bg-black px-4 py-16 sm:px-6 lg:px-8"
      aria-labelledby="locations-carousel-heading"
    >
      <div className="mx-auto flex w-full max-w-[920px] flex-col items-center">
        <h2
          id="locations-carousel-heading"
          className="mb-10 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          {locationsHeadline}
        </h2>
        <div className={`${styles.carousel} ${styles.mask}`}>
          {items.map((loc, i) => (
            <article
              key={`${loc.slug}-${i}`}
              className={styles.article}
              style={{ "--i": i } as React.CSSProperties}
            >
              <div className={styles.imgWrap}>
                <Image
                  src={loc.imagePath}
                  alt={loc.name}
                  width={300}
                  height={480}
                  className={styles.img}
                  sizes="(max-width: 600px) 260px, 300px"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.style.display = "none";
                  }}
                />
              </div>
              <div className={styles.info}>
                <h3 className={styles.title}>{loc.name}</h3>
                <p className={styles.desc}>{loc.shortDescription}</p>
                <Link href="#map" className={styles.cta}>
                  View on map
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
