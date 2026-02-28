import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FitVilla Home | Premium Gyms in Noida & Mayur Vihar",
  description:
    "Discover FitVilla at a glance – hero, services, locations, testimonials, gallery and quick lead form. Book your seat now – limited slots available.",
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return children;
}

