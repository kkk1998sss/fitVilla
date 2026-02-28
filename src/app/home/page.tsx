"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getFeatures } from "@/content/features";
import { getAllLocations } from "@/content/locations";
import { getFeatureCardImageUrl } from "@/content/ecosystemGallery";
import { FeatureIcon } from "@/components/icons/FeatureIcons";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { LOCATION_OPTIONS } from "@/lib/constants";
import { freeTrialCta, leadFormHeading } from "@/content/site";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rahul Mehta",
    role: "Member · Sector 76",
    quote:
      "FitVilla has everything I need – Technogym equipment, steam & sauna, and coaches who actually track my progress.",
  },
  {
    name: "Ananya Gupta",
    role: "Member · Sector 133",
    quote:
      "The Sector 133 club feels like a luxury fitness hotel. Recovery zones and group classes keep me consistent.",
  },
  {
    name: "Vikas Sharma",
    role: "Member · Mayur Vihar",
    quote:
      "Finally a premium gym in East Delhi. The environment, coaches and facilities are on another level.",
  },
];

export default function HomeTabPage() {
  const features = getFeatures();
  const locations = getAllLocations();
  const [showPopup, setShowPopup] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setStickyVisible(window.scrollY > 320);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="bg-black">
      {/* Hero with primary CTA that opens popup lead form */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center sm:px-6 lg:px-8">
        {/* Background image + gradients. Place the provided spin-room image at /public/images/home/home-hero-spin.jpg */}
        <div className="absolute inset-0">
          <Image
            src="/images/home/home-hero-spin.jpg"
            alt=""
            fill
            className="object-cover opacity-40"
            sizes="100vw"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-fitvilla-deep/75 via-black/85 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(45,212,228,0.16),transparent)]" />
        </div>
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-8">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-fitvilla-cyan">
              Home · FitVilla Gyms
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Train in a Luxury Fitness Ecosystem
            </h1>
            <p className="mt-5 text-base text-fitvilla-light/90 sm:text-lg">
              Three premium locations · Technogym equipment · Certified coaches · Steam, sauna & recovery.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setShowPopup(true)}
              className="rounded-full bg-fitvilla-cyan px-8 py-3.5 text-sm font-semibold text-black transition-all hover:bg-fitvilla-glow hover:shadow-[0_0_24px_rgba(45,212,228,0.5)]"
            >
              Book your seat now – Hurry up, few left
            </button>
            <Link
              href="/locations"
              className="rounded-full border border-fitvilla-cyan/60 px-8 py-3.5 text-sm font-semibold text-fitvilla-cyan transition-all hover:border-fitvilla-cyan hover:bg-fitvilla-cyan/10"
            >
              View all locations
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-fitvilla-muted sm:text-sm">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-fitvilla-cyan animate-pulse" />
              Limited free trial slots per day
            </span>
            <span>Sector 76 · Sector 133 · Mayur Vihar</span>
          </div>
        </div>
      </section>

      {/* Services / Facilities snapshot */}
      <section className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Services & Facilities
            </h2>
            <p className="mt-3 text-fitvilla-muted">
              A curated mix of performance training, recovery, and member comfort.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.slice(0, 6).map((f, index) => {
              const imageSrc = getFeatureCardImageUrl(index, f.imageSrc ?? "");
              return (
                <Card
                  key={f.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-fitvilla-cyan/40 hover:bg-white/[0.08]"
                >
                  {imageSrc && (
                    <div className="pointer-events-none absolute inset-0 opacity-30">
                      {imageSrc.includes("drive.google.com") ? (
                        <img
                          src={imageSrc}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Image
                          src={imageSrc}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          unoptimized
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                    </div>
                  )}
                  <div className="relative flex flex-col items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/70 text-fitvilla-cyan ring-1 ring-white/15">
                      <FeatureIcon featureId={f.id} />
                    </div>
                    <h3 className="text-base font-semibold text-white">{f.title}</h3>
                    <p className="text-sm leading-relaxed text-fitvilla-light/90">{f.subtext}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Locations preview */}
      <section className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Choose Your Nearest FitVilla
            </h2>
            <p className="mt-3 text-fitvilla-muted">
              Three large-format clubs across Noida and East Delhi, all built to the same premium standard.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {locations.map((loc) => (
              <Card
                key={loc.slug}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all hover:border-fitvilla-cyan/30 hover:bg-white/[0.08]"
              >
                <div className="relative aspect-[4/3] bg-fitvilla-deep">
                  <Image
                    src={loc.imagePath}
                    alt={loc.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-semibold text-white">{loc.name}</h3>
                    <p className="mt-1 text-xs text-fitvilla-light/90">{loc.shortDescription}</p>
                  </div>
                </div>
                <div className="p-4">
                  <Link
                    href="/locations"
                    className="text-sm font-semibold text-fitvilla-cyan hover:text-fitvilla-glow"
                  >
                    Explore this location →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What Members Are Saying
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Card
                key={t.name}
                className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 text-left"
              >
                <p className="text-sm leading-relaxed text-fitvilla-light/90">“{t.quote}”</p>
                <div className="mt-5">
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-fitvilla-muted">{t.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Inside FitVilla
            </h2>
            <span className="hidden text-xs uppercase tracking-[0.18em] text-fitvilla-muted sm:inline">
              Swipe to explore
            </span>
          </div>
          <div className="mt-6 flex gap-3 overflow-x-auto pb-3">
            {[1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                className="relative h-40 min-w-[220px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-fitvilla-deep"
              >
                <Image
                  src={`/images/hero/hero-${idx}.jpg`}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="220px"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popup lead form for primary CTA */}
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Book your seat now"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-fitvilla-deep/90 via-black to-black shadow-[0_24px_80px_rgba(0,0,0,0.95)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-fitvilla-light hover:bg-white/10"
              aria-label="Close"
            >
              <span className="text-lg leading-none">×</span>
            </button>
            <div className="relative p-6 sm:p-8">
              <div className="mb-6">
                <p className="inline-flex items-center rounded-full bg-fitvilla-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-fitvilla-cyan">
                  {leadFormHeading}
                </p>
                <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
                  Book your seat now – Hurry up, few left
                </h2>
                <p className="mt-2 text-sm text-fitvilla-light/85">
                  Share your details and our team will call you back to confirm your free trial slot
                  at your preferred location.
                </p>
              </div>

              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  // Here you can wire submission to your backend / form tool later
                  setShowPopup(false);
                }}
              >
                <Input
                  label="Name"
                  id="popup-name"
                  type="text"
                  placeholder="Your name"
                  required
                  className="w-full rounded-lg border border-white/20 bg-black/60 px-4 py-3 text-white placeholder:text-fitvilla-muted focus:border-fitvilla-cyan focus:outline-none focus:ring-1 focus:ring-fitvilla-cyan"
                />
                <Input
                  label="Phone"
                  id="popup-phone"
                  type="tel"
                  placeholder="Your phone number"
                  required
                  className="w-full rounded-lg border border-white/20 bg-black/60 px-4 py-3 text-white placeholder:text-fitvilla-muted focus:border-fitvilla-cyan focus:outline-none focus:ring-1 focus:ring-fitvilla-cyan"
                />
                <Select
                  label="Preferred location"
                  id="popup-location"
                  options={LOCATION_OPTIONS}
                  required
                  className="w-full rounded-lg border border-white/20 bg-black/60 px-4 py-3 text-white focus:border-fitvilla-cyan focus:outline-none focus:ring-1 focus:ring-fitvilla-cyan"
                />
                <button
                  type="submit"
                  className="mt-2 w-full rounded-full bg-fitvilla-cyan py-3.5 text-sm font-semibold text-black transition-all hover:bg-fitvilla-glow hover:shadow-[0_0_20px_rgba(45,212,228,0.4)] focus:outline-none focus:ring-2 focus:ring-fitvilla-cyan focus:ring-offset-2 focus:ring-offset-black"
                >
                  {freeTrialCta}
                </button>
                <p className="mt-2 text-[11px] text-fitvilla-muted">
                  No spam. Our team will only contact you to confirm your trial booking and answer any
                  questions.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Sticky CTA at bottom of viewport */}
      {stickyVisible && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/90 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
            <p className="text-xs text-fitvilla-light/85 sm:text-sm">
              Seats filling fast for this week. Book your free trial now.
            </p>
            <button
              type="button"
              onClick={() => setShowPopup(true)}
              className="whitespace-nowrap rounded-full bg-fitvilla-cyan px-4 py-2 text-xs font-semibold text-black transition-all hover:bg-fitvilla-glow sm:px-6 sm:text-sm"
            >
              Book your seat
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

