/**
 * Locations listing: "Choose Your Nearest Fitvilla" – reuse LocationsSection or custom layout.
 */

import { LocationsSection } from "@/components/landing/LocationsSection";

export const metadata = {
  title: "Locations | FitVilla",
  description: "Choose your nearest FitVilla – Noida Sector 76, Sector 133, Mayur Vihar.",
};

export default function LocationsPage() {
  return (
    <main>
      <LocationsSection />
      {/* Optional: extra location-specific content */}
    </main>
  );
}
