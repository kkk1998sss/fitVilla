/**
 * Dynamic location page: /locations/sector-76 | sector-133 | mayur-vihar.
 * Same sections as landing but with location context (prefilled form, location-specific copy).
 */

import { getLocationBySlug, getLocationSlugs } from "@/content/locations";
import { notFound } from "next/navigation";

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getLocationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return { title: "Location | FitVilla" };
  return {
    title: `${location.name} | FitVilla`,
    description: location.shortDescription,
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  return (
    <main>
      <h1>{location.name}</h1>
      <p>{location.shortDescription}</p>
      {/* Reuse landing sections with location prop when you implement design */}
    </main>
  );
}
