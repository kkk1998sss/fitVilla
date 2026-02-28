"use client";

import Link from "next/link";
import {
  contactEmail,
  phone1,
  phone2,
  openingHours,
  locations as footerLocations,
} from "@/content/footer";
import { useInView } from "@/hooks/useInView";

export default function ContactPage() {
  const [heroInView, heroRef] = useInView();

  return (
    <main className="bg-black">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center sm:px-6 lg:px-8"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-fitvilla-deep/60 via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(45,212,228,0.08),transparent)]" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <p
            className={`mb-4 text-sm font-medium uppercase tracking-[0.2em] text-fitvilla-cyan transition-all duration-1000 ${
              heroInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Get in Touch
          </p>
          <h1
            className={`text-4xl font-bold leading-tight tracking-tight text-white transition-all duration-1000 delay-75 sm:text-5xl lg:text-6xl ${
              heroInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            We&apos;d Love to Hear From You
          </h1>
          <p
            className={`mt-6 text-lg text-fitvilla-light/90 transition-all duration-1000 delay-150 sm:text-xl ${
              heroInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Reach out for membership enquiries, free trial bookings, or any questions. Our team is here to help.
          </p>
        </div>
      </section>

      {/* Contact details */}
      <section className="border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Email */}
            <a
              href={`mailto:${contactEmail}`}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-fitvilla-cyan/30 hover:bg-white/[0.08]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-fitvilla-cyan/20 text-fitvilla-cyan transition-colors group-hover:bg-fitvilla-cyan/30">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-white">Email</h3>
              <p className="mt-1 text-sm text-fitvilla-light/90 break-all">{contactEmail}</p>
              <p className="mt-2 text-xs text-fitvilla-cyan/80">Click to send an email</p>
            </a>

            {/* Phone */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-fitvilla-cyan/20 text-fitvilla-cyan">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-white">Phone</h3>
              <a href={`tel:${phone1.replace(/\D/g, "")}`} className="mt-1 block text-sm text-fitvilla-light/90 hover:text-fitvilla-cyan">
                {phone1}
              </a>
              <a href={`tel:${phone2.replace(/\D/g, "")}`} className="mt-1 block text-sm text-fitvilla-light/90 hover:text-fitvilla-cyan">
                {phone2}
              </a>
            </div>

            {/* Hours */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:col-span-2 lg:col-span-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-fitvilla-cyan/20 text-fitvilla-cyan">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-white">Opening Hours</h3>
              <ul className="mt-3 space-y-2 text-sm text-fitvilla-light/90">
                {openingHours.map((row) => (
                  <li key={row.days} className="flex justify-between gap-4">
                    <span>{row.days}</span>
                    <span className="text-fitvilla-cyan/90">{row.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Locations */}
          <div className="mt-14">
            <h2 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Our Locations
            </h2>
            <p className="mt-3 text-center text-fitvilla-muted">
              Visit any of our three branches. Book a free trial or drop in for a tour.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {footerLocations.map((loc) => (
                <div
                  key={loc.name}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-fitvilla-cyan/20 hover:bg-white/[0.08]"
                >
                  <h3 className="font-semibold text-white">{loc.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fitvilla-light/90">
                    {loc.address}
                  </p>
                  <Link
                    href="/locations"
                    className="mt-4 inline-block text-sm font-medium text-fitvilla-cyan hover:text-fitvilla-glow"
                  >
                    View on map →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-20 flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-center">
            <Link
              href="/#lead-form"
              className="rounded-full bg-fitvilla-cyan px-8 py-3.5 font-semibold text-black transition-all hover:bg-fitvilla-glow hover:shadow-[0_0_24px_rgba(45,212,228,0.4)]"
            >
              Start Free Trial
            </Link>
            <Link
              href="/locations"
              className="rounded-full border border-fitvilla-cyan/50 px-8 py-3.5 font-semibold text-fitvilla-cyan transition-all hover:bg-fitvilla-cyan/10 hover:border-fitvilla-cyan"
            >
              View Locations
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
