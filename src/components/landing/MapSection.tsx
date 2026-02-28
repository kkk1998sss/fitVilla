"use client";

import { getAllLocations } from "@/content/locations";
import type { Location } from "@/types";

function buildMapEmbedUrl(loc: Location): string {
  const query = loc.address ?? loc.name;
  const encoded = encodeURIComponent(query);
  return `https://www.google.com/maps?q=${encoded}&output=embed`;
}

export function MapSection() {
  const locations = getAllLocations();

  return (
    <section
      aria-labelledby="map-heading"
      className="scroll-mt-20 border-t border-white/10 bg-black px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="map-heading"
          className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Find us
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {locations.map((loc) => (
            <div
              key={loc.slug}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all hover:border-fitvilla-cyan/30"
            >
              <div className="relative aspect-video bg-fitvilla-deep">
                <iframe
                  src={buildMapEmbedUrl(loc)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                  title={`Map of ${loc.name}`}
                />
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-white">{loc.name}</p>
                <p className="mt-1 text-sm text-fitvilla-light/80">
                  {loc.shortDescription}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
