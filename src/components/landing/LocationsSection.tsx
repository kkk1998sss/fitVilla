"use client";

import Link from "next/link";
import Image from "next/image";
import { locationsHeadline } from "@/content/site";
import { getAllLocations } from "@/content/locations";
import { ROUTES } from "@/lib/constants";

export function LocationsSection() {
  const locations = getAllLocations();

  return (
    <section
      aria-labelledby="locations-heading"
      className="scroll-mt-20 border-t border-white/10 bg-black px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="locations-heading"
          className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          {locationsHeadline}
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {locations.map((loc) => (
            <article
              key={loc.slug}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all hover:border-fitvilla-cyan/30 hover:bg-white/[0.08]"
            >
              <div className="relative aspect-[4/3] bg-fitvilla-deep">
                <Image
                  src={loc.imagePath}
                  alt={loc.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-semibold text-white">{loc.name}</h3>
                  <p className="text-sm text-fitvilla-light/90">
                    {loc.shortDescription}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <Link
                  href={ROUTES.location(loc.slug)}
                  className="inline-block rounded-full bg-fitvilla-cyan px-6 py-2.5 text-sm font-semibold text-black transition-all hover:bg-fitvilla-glow"
                >
                  Join
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
