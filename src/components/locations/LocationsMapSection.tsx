"use client";

import { useMemo, useState } from "react";
import { getAllLocations } from "@/content/locations";
import type { Location } from "@/types";

function buildMapUrl(loc: Location): string {
  const query = loc.address ?? loc.name;
  const encoded = encodeURIComponent(query);
  return `https://www.google.com/maps?q=${encoded}&output=embed`;
}

export function LocationsMapSection() {
  const locations = getAllLocations();
  const [activeSlug, setActiveSlug] = useState(locations[0]?.slug ?? "");

  const activeLocation = useMemo(
    () => locations.find((l) => l.slug === activeSlug) ?? locations[0],
    [activeSlug, locations],
  );

  if (!activeLocation) return null;

  const mapUrl = buildMapUrl(activeLocation);

  return (
    <section className="scroll-mt-20 border-t border-white/10 bg-black px-4 pt-24 pb-16 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,2.1fr)_minmax(0,3fr)] lg:items-start">
          {/* Left: location selector + details */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Find Your Nearest Fitvilla
            </h1>
            <p className="mt-3 text-sm text-fitvilla-light/80 sm:text-base">
              Three premium locations connected through one vision of luxury fitness. Tap a branch to
              explore it on the map.
            </p>

            <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
              {locations.map((loc) => {
                const isActive = loc.slug === activeSlug;
                return (
                  <button
                    key={loc.slug}
                    type="button"
                    onClick={() => setActiveSlug(loc.slug)}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                      isActive
                        ? "bg-fitvilla-cyan text-black shadow-[0_0_16px_rgba(45,212,228,0.7)]"
                        : "bg-white/5 text-fitvilla-light/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {loc.name.replace("Fitvilla ", "")}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-fitvilla-cyan/80">
                  Selected Branch
                </p>
                <h2 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
                  {activeLocation.name}
                </h2>
                <p className="mt-2 text-sm text-fitvilla-light/85">
                  {activeLocation.shortDescription}
                </p>
              </div>

              {activeLocation.address && (
                <div className="rounded-xl bg-black/50 p-3 text-xs text-fitvilla-light/80 sm:text-sm">
                  <p className="font-medium text-white/90">Address</p>
                  <p className="mt-1 leading-relaxed">{activeLocation.address}</p>
                </div>
              )}

              {activeLocation.highlights?.length ? (
                <div className="flex flex-wrap gap-2">
                  {activeLocation.highlights.map((h) => (
                    <span
                      key={h}
                      className="inline-flex items-center rounded-full border border-fitvilla-cyan/40 bg-fitvilla-cyan/10 px-3 py-1 text-xs font-medium text-fitvilla-cyan"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {/* Right: map */}
          <div className="relative mt-4 lg:mt-0">
            <div className="absolute inset-0 -z-10 rounded-[32px] bg-[radial-gradient(circle_at_top,_rgba(45,212,228,0.3),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(15,41,64,0.9),_transparent_65%)] opacity-70" />
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/80 shadow-[0_22px_80px_rgba(15,23,42,0.95)]">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-xs text-fitvilla-light/80 sm:px-5">
                <span className="inline-flex items-center gap-2 font-medium text-white/90">
                  <span className="h-2 w-2 rounded-full bg-fitvilla-cyan animate-pulse" />
                  Live map view
                </span>
                <span className="hidden sm:inline text-[11px] uppercase tracking-[0.16em] text-fitvilla-muted">
                  Drag · Zoom · Explore
                </span>
              </div>

              <div className="relative aspect-[4/3] sm:aspect-[16/9]">
                <iframe
                  key={activeLocation.slug}
                  src={mapUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                  title={`Map of ${activeLocation.name}`}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

