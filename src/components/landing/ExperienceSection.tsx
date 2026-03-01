"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { experienceCta } from "@/content/site";
import { scrollToLeadForm } from "@/lib/scroll";
import { getImageUrl } from "@/lib/asset-urls";
const EXPERIENCE_IMAGE = getImageUrl("experience");

const experiencePoints = [
  "Steam room, showers and lockers for a complete club experience",
  "In-house health cafe to refuel (partner: The Healers Cafe)",
  "BCA body composition analysis to track fat, muscle and progress",
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
              A personalised, inclusive place for your workout
            </h2>
            <p className="mt-4 text-fitvilla-light/90">
              Achieve your goals under certified trainers. Our biggest club spreads across 10,000 sq ft with dedicated zones for cardio, strength, crossfit, spinning, yoga and Zumba.
            </p>
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
              onClick={scrollToLeadForm}
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
