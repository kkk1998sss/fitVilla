import type { Location } from "@/types";

export const LOCATION_SLUGS = ["sector-76", "sector-133", "mayur-vihar"] as const;
export type LocationSlug = (typeof LOCATION_SLUGS)[number];

export const locations: Location[] = [
  {
    slug: "sector-76",
    name: "Fitvilla Sector 76",
    shortDescription: "Premium setup | Steam & Sauna | Technogym",
    highlights: ["Premium setup", "Steam & Sauna", "Technogym"],
    imagePath: "/images/locations/sector-76.jpg",
    address:
      "3rd Floor, Suvardhnam Building, Metro Station, near Vishal Mega Mart, F Block, Sector 76, Noida, Uttar Pradesh 201301",
  },
  {
    slug: "sector-133",
    name: "Fitvilla Sector 133",
    shortDescription: "Premium setup | Recovery | Group classes",
    highlights: ["Premium setup", "Recovery", "Group classes"],
    imagePath: "/images/locations/sector-133.jpg",
    address: "4th Floor, Paras One33 Mall, Sector 133, 201304",
  },
  {
    slug: "mayur-vihar",
    name: "Fitvilla Mayur Vihar",
    shortDescription: "Premium setup | Trainers | Luxury environment",
    highlights: ["Premium setup", "Trainers", "Luxury environment"],
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
