import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Fitvilla Gym | Redefining Luxury Fitness in Noida & Delhi NCR",
  description:
    "Our journey from Sector 76 Noida to Sector 133 and Mayur Vihar. Train. Nourish. Transform. — Premium gyms with world-class equipment and expert coaching.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
