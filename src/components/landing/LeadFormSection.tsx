"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { leadFormHeading, freeTrialCta } from "@/content/site";
import { LOCATION_OPTIONS } from "@/lib/constants";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const TRIAL_IMAGES = [
  "/images/hero/hero-1.jpg",
  "/images/hero/hero-2.jpg",
  "/images/hero/hero-3.jpg",
  "/images/hero/hero-4.jpg",
];

const ROLES = { previous: 0, current: 1, next: 2 } as const;

function getImageIndexForRole(role: number, currentIndex: number): number {
  const n = TRIAL_IMAGES.length;
  if (role === ROLES.previous) return (currentIndex - 1 + n) % n;
  if (role === ROLES.current) return currentIndex;
  return (currentIndex + 1) % n;
}

interface LeadFormSectionProps {
  id?: string;
  formIdSuffix?: string;
}

export function LeadFormSection({ id, formIdSuffix = "" }: LeadFormSectionProps) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [roles, setRoles] = useState<number[]>([ROLES.previous, ROLES.current, ROLES.next]);

  useEffect(() => setMounted(true), []);

  const go = useCallback((direction: 1 | -1) => {
    if (direction === 1) {
      setRoles((r) => [r[2], r[0], r[1]]);
      setCurrentIndex((c) => (c + 1) % TRIAL_IMAGES.length);
    } else {
      setRoles((r) => [r[1], r[2], r[0]]);
      setCurrentIndex((c) => (c - 1 + TRIAL_IMAGES.length) % TRIAL_IMAGES.length);
    }
  }, []);

  const suffix = formIdSuffix ? `-${formIdSuffix}` : "";
  const headingId = `lead-form-heading${suffix}`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="scroll-mt-20 border-t border-white/10 bg-black px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
          {/* Left: voyage-style slider */}
          <div className="relative flex min-h-[220px] justify-center lg:order-1 lg:min-h-0 lg:justify-start">
            <div className="voyage-slider">
              <button
                type="button"
                className="voyage-slider__btn"
                onClick={() => go(-1)}
                aria-label="Previous slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <div className="voyage-slides-w">
                <div className="voyage-slides">
                  {[0, 1, 2].map((i) => {
                    const role = roles[i];
                    const imageIndex = getImageIndexForRole(role, currentIndex);
                    const src = TRIAL_IMAGES[imageIndex];
                    return (
                      <div
                        key={i}
                        className="voyage-slide"
                        data-current={role === ROLES.current ? "" : undefined}
                        data-previous={role === ROLES.previous ? "" : undefined}
                        data-next={role === ROLES.next ? "" : undefined}
                      >
                        <div className="voyage-slide__inner">
                          <div className="voyage-slide__img-w">
                            <Image
                              src={src}
                              alt=""
                              fill
                              className="voyage-slide__img object-cover"
                              sizes="(max-width: 1024px) 40vw, 280px"
                              unoptimized
                            />
                            <div className="absolute inset-0 rounded-[1rem] bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                className="voyage-slider__btn"
                onClick={() => go(1)}
                aria-label="Next slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:order-2">
            <h2
              id={headingId}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              {leadFormHeading}
            </h2>
            {mounted ? (
              <form
                className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="space-y-5">
                  <Input
                    label="Name"
                    id={`name${suffix}`}
                    type="text"
                    placeholder="Your name"
                    required
                    className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder:text-fitvilla-muted focus:border-fitvilla-cyan focus:outline-none focus:ring-1 focus:ring-fitvilla-cyan"
                  />
                  <Input
                    label="Phone"
                    id={`phone${suffix}`}
                    type="tel"
                    placeholder="Your phone number"
                    required
                    className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder:text-fitvilla-muted focus:border-fitvilla-cyan focus:outline-none focus:ring-1 focus:ring-fitvilla-cyan"
                  />
                  <Select
                    label="Location"
                    id={`location${suffix}`}
                    options={LOCATION_OPTIONS}
                    required
                    className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white focus:border-fitvilla-cyan focus:outline-none focus:ring-1 focus:ring-fitvilla-cyan"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-6 w-full rounded-full bg-fitvilla-cyan py-3.5 font-semibold text-black transition-all hover:bg-fitvilla-glow hover:shadow-[0_0_20px_rgba(45,212,228,0.35)] focus:outline-none focus:ring-2 focus:ring-fitvilla-cyan focus:ring-offset-2 focus:ring-offset-black"
                >
                  {freeTrialCta}
                </button>
              </form>
            ) : (
              <div
                className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8"
                style={{ minHeight: 220 }}
                aria-hidden
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
