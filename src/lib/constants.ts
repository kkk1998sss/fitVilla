import { LOCATION_SLUGS } from "@/content/locations";

export const ROUTES = {
  home: "/",
  locations: "/locations",
  location: (slug: string) => `/locations/${slug}`,
  facilities: "/facilities",
  transformations: "/transformations",
  contact: "/contact",
} as const;

export const LOCATION_OPTIONS = LOCATION_SLUGS.map((slug) => ({
  value: slug,
  label: slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" "),
}));
