"use client";

import Link from "next/link";
import Image from "next/image";
import { featuresHeadline, featuresSubtext, freeTrialCta } from "@/content/site";
import { getFeatures } from "@/content/features";
import { Card } from "@/components/ui/Card";

export function FeaturesSection() {
  const features = getFeatures();

  return (
    <section
      aria-labelledby="features-heading"
      className="scroll-mt-20 bg-black px-4 py-16 sm:px-6 lg:px-8 [contain:layout]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="features-heading"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            {featuresHeadline}
          </h2>
          <p className="mt-4 text-lg text-fitvilla-muted">{featuresSubtext}</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card
              key={f.id}
              className={`feature-card group relative min-h-[200px] overflow-hidden rounded-xl border border-white/10 p-6 [contain:layout_paint] [content-visibility:auto] [contain-intrinsic-size:auto_200px] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-fitvilla-cyan/40 hover:shadow-[0_12px_40px_-12px_rgba(45,212,228,0.25)] hover:will-change-transform ${
                f.priority === "highlight"
                  ? "sm:col-span-2 lg:col-span-1 ring-1 ring-fitvilla-cyan/20 hover:ring-fitvilla-cyan/40"
                  : ""
              }`}
            >
              {/* Background image – isolated layer + fixed blur for smooth scroll */}
              {f.imageSrc && (
                <div className="absolute inset-0 [transform:translateZ(0)] [backface-visibility:hidden]">
                  <Image
                    src={f.imageSrc}
                    alt=""
                    fill
                    className="object-cover blur-[6px] transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/55 transition-colors duration-300 group-hover:bg-black/45" aria-hidden />
                </div>
              )}
              {/* Content */}
              <div className="relative">
                <h3 className="text-lg font-semibold text-white transition-transform duration-300 group-hover:translate-x-0.5">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-fitvilla-light/90">{f.subtext}</p>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-fitvilla-light/90">Experience the difference yourself</p>
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
