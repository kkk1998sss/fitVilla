import { LocationsSection } from "@/components/landing/LocationsSection";
import { LocationsMapSection } from "@/components/locations/LocationsMapSection";

export const metadata = {
  title: "Locations | FitVilla",
  description: "Choose your nearest FitVilla – Noida Sector 76, Sector 133, Mayur Vihar.",
};

export default function LocationsPage() {
  return (
    <main>
      <LocationsMapSection />
      <LocationsSection />
    </main>
  );
}
