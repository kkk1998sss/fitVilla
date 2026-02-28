"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { experienceCta } from "@/content/site";

import { getImageUrl } from "@/lib/asset-urls";
const EXPERIENCE_IMAGE = getImageUrl("experience");

const experiencePoints = [
  "Recover in steam and sauna",
  "Relax in wellness cafe",
  "Track progress with BCA",
];

export function ExperienceSection() {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      aria-labelledby="experience-heading"
      className="scroll-mt-20 border-t border-white/10 bg-black px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Image side – from Drive (run npm run copy-assets) or placeholder */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-fitvilla-deep">
            {!imageError && (
              <Image
                src={EXPERIENCE_IMAGE}
                alt="FitVilla gym experience"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                onError={() => setImageError(true)}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-fitvilla-teal/30 to-fitvilla-cyan/10" />
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
                <span className="text-fitvilla-muted/50 text-sm uppercase tracking-wider">
                  Experience image
                </span>
              </div>
            )}
          </div>
          {/* Copy side */}
          <div>
            <h2
              id="experience-heading"
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Train with world class equipment
            </h2>
            <ul className="mt-6 space-y-4">
              {experiencePoints.map((point, i) => (
                <li
                  key={point}
                  className="flex items-center gap-3 text-lg text-fitvilla-light/90"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fitvilla-cyan/20 text-fitvilla-cyan">
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href="#lead-form"
              className="mt-8 inline-block rounded-full bg-fitvilla-cyan px-8 py-3.5 font-semibold text-black transition-all hover:bg-fitvilla-glow hover:shadow-[0_0_20px_rgba(45,212,228,0.35)]"
            >
              {experienceCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
