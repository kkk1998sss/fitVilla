"use client";

import Link from "next/link";
import { claimTrialCta } from "@/content/site";
import { scrollToLeadForm } from "@/lib/scroll";
import { Card } from "@/components/ui/Card";

const benefits = [
  "Free Trial Session",
  "Free Body Analysis",
  "Limited Period Benefits",
];

export function OfferSection() {
  return (
    <section
      aria-labelledby="offer-heading"
      className="scroll-mt-20 border-t border-white/10 bg-black px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="offer-heading"
          className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Start Your Fitness Journey Today
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {benefits.map((benefit) => (
            <Card
              key={benefit}
              className="rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm transition-all hover:border-fitvilla-cyan/30 hover:bg-white/[0.08]"
            >
              <p className="font-semibold text-white">{benefit}</p>
            </Card>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
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
