import type { Location } from "@/types";

export const LOCATION_SLUGS = ["sector-76", "sector-133", "mayur-vihar"] as const;
export type LocationSlug = (typeof LOCATION_SLUGS)[number];

export const locations: Location[] = [
  {
    slug: "sector-76",
    name: "Fitvilla Sector 76",
    shortDescription: "Best gym in Central Noida · Steam & Sauna · Technogym",
    highlights: ["Rated top in Central Noida", "Steam & Sauna", "Technogym"],
    imagePath: "/images/locations/sector-76.jpg",
    address:
      "3rd Floor, Suvardhnam Building, Metro Station, near Vishal Mega Mart, F Block, Sector 76, Noida, Uttar Pradesh 201301",
  },
  {
    slug: "sector-133",
    name: "Fitvilla Sector 133",
    shortDescription: "Top gym on Noida–Greater Noida Expressway · Recovery · Group classes",
    highlights: ["Rated top on Expressway", "Recovery", "Group classes"],
    imagePath: "/images/locations/sector-133.jpg",
    address: "4th Floor, Paras One33 Mall, Sector 133, 201304",
  },
  {
    slug: "mayur-vihar",
    name: "Fitvilla Mayur Vihar",
    shortDescription: "New branch · Mayur Vihar Phase 1 · Certified trainers",
    highlights: ["New branch Delhi", "Certified trainers", "Luxury environment"],
    imagePath: "/images/locations/mayur-vihar.jpg",
    address: "Mayur Vihar Phase 1 Kotla Village Plot No 322",
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((loc) => loc.slug === slug);
}

export function getLocationSlugs(): string[] {
  return LOCATION_SLUGS.slice();
}

export function getAllLocations(): Location[] {
  return locations;
}
