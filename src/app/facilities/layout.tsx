import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facilities | FitVilla",
  description: "Premium facilities at FitVilla – Technogym, steam, sauna, BCA, and more.",
};

export default function FacilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
