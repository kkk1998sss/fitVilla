"use client";

import Link from "next/link";
import { freeTrialCta } from "@/content/site";
import { Card } from "@/components/ui/Card";

const PLACEHOLDER_COUNT = 3;

export function TransformationsSection() {
  return (
    <section
      aria-labelledby="transformations-heading"
      className="scroll-mt-20 border-t border-white/10 bg-black px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="transformations-heading"
          className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Real Members. Real Results.
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => (
            <Card
              key={i}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all hover:border-fitvilla-cyan/30 hover:bg-white/[0.08]"
            >
              <div className="aspect-[3/4] bg-fitvilla-deep">
                <div className="flex h-full items-center justify-center text-fitvilla-muted/50 text-sm">
                  Before / After
                </div>
              </div>
              <div className="p-4 text-center text-sm text-fitvilla-light/80">
                Transformation {i + 1}
              </div>
            </Card>
          ))}
        </div>
        <blockquote className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-lg italic text-fitvilla-light/90">
            &ldquo;Testimonial text from member&rdquo;
          </p>
        </blockquote>
        <div className="mt-10 flex justify-center">
          <Link
            href="#lead-form"
            className="rounded-full bg-fitvilla-cyan px-8 py-3.5 font-semibold text-black transition-all hover:bg-fitvilla-glow hover:shadow-[0_0_20px_rgba(45,212,228,0.35)]"
          >
            {freeTrialCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
