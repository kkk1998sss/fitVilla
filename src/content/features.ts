import type { Feature } from "@/types";

/**
 * Order matches wireframe. Priority "highlight" = larger card (Technogym, Steam & Sauna, Certified Coaches).
 */
const heroImage = (n: number) => `/images/hero/hero-${n}.jpg`;

export const features: Feature[] = [
  {
    id: "technogym",
    title: "Technogym Equipment",
    subtext:
      "Train on world class machines trusted by elite athletes and luxury gyms globally",
    priority: "highlight",
    imageSrc: heroImage(1),
  },
  {
    id: "coaches",
    title: "Certified Expert Coaches",
    subtext: "Industry leading trainers focused on results, safety, and performance",
    priority: "highlight",
    imageSrc: heroImage(2),
  },
  {
    id: "zones",
    title: "Dedicated Workout Zones",
    subtext:
      "Separate zones for cardio, strength training, crossfit, spinning, and group classes like yoga and zumba",
    priority: "default",
    imageSrc: heroImage(3),
  },
  {
    id: "bca",
    title: "BCA Body Composition Analysis",
    subtext:
      "Track fat, muscle, and progress with advanced body analysis technology",
    priority: "default",
    imageSrc: heroImage(4),
  },
  {
    id: "recovery",
    title: "Recovery and Relaxation",
    subtext:
      "Premium steam and sauna facilities to support recovery and muscle relaxation",
    priority: "highlight",
    imageSrc: heroImage(5),
  },
  {
    id: "lockers",
    title: "Digital Lockers",
    subtext: "Secure, modern lockers for a seamless and hassle free experience",
    priority: "default",
    imageSrc: heroImage(6),
  },
  {
    id: "cafe",
    title: "Wellness Cafe",
    subtext: "Refuel with healthy meals, beverages, and nutrition focused options",
    priority: "default",
    imageSrc: heroImage(7),
  },
  {
    id: "protein",
    title: "Protein Shake Vending Machine",
    subtext: "Instant access to post workout nutrition and recovery shakes",
    priority: "default",
    imageSrc: heroImage(8),
  },
  {
    id: "comfort",
    title: "Premium Member Comfort",
    subtext:
      "High speed WiFi and alkaline drinking water for complete comfort and wellness",
    priority: "default",
    imageSrc: heroImage(9),
  },
];

export function getFeatures(): Feature[] {
  return features;
}

export function getHighlightFeatures(): Feature[] {
  return features.filter((f) => f.priority === "highlight");
}
