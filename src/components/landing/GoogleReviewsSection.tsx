"use client";

import { useRef } from "react";
import { getGoogleReviews } from "@/content/googleReviews";

const CARD_WIDTH = 320;
const GAP = 16;

export function GoogleReviewsSection() {
  const reviews = getGoogleReviews();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -(CARD_WIDTH + GAP) : CARD_WIDTH + GAP, behavior: "smooth" });
  };

  return (
    <section
      className="border-b border-white/10 bg-black px-4 py-12 sm:px-6 lg:px-8"
      aria-labelledby="reviews-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Google Reviews
          </h2>
          <div className="mt-1 flex items-center justify-center gap-2">
            <span className="text-2xl font-bold text-fitvilla-cyan">4.9</span>
            <span className="text-white/80">/5</span>
            <span className="flex text-amber-400">
              {"★".repeat(5)}
            </span>
          </div>
        </div>
        <div className="relative mt-8">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide sm:pb-4"
          >
            {reviews.map((review, i) => (
              <div
                key={i}
                className="min-w-[280px] max-w-[320px] flex-shrink-0 rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:border-fitvilla-cyan/30 hover:bg-white/[0.08] sm:min-w-[300px]"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-fitvilla-cyan/20 text-lg font-bold text-fitvilla-cyan">
                      {review.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">{review.name}</p>
                      <p className="text-xs text-fitvilla-muted">{review.date}</p>
                    </div>
                  </div>
                  {review.verified && (
                    <span className="shrink-0 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-400">
                      Verified
                    </span>
                  )}
                </div>
                <div className="mt-3 flex text-amber-400" aria-hidden>
                  {"★".repeat(review.rating)}
                </div>
                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-fitvilla-light/90">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/20 bg-black/80 p-2.5 text-white shadow-lg backdrop-blur-sm transition-all hover:border-fitvilla-cyan/50 hover:bg-fitvilla-cyan/20 hover:text-fitvilla-cyan md:flex md:items-center md:justify-center"
            aria-label="Previous reviews"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/20 bg-black/80 p-2.5 text-white shadow-lg backdrop-blur-sm transition-all hover:border-fitvilla-cyan/50 hover:bg-fitvilla-cyan/20 hover:text-fitvilla-cyan md:flex md:items-center md:justify-center"
            aria-label="Next reviews"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
