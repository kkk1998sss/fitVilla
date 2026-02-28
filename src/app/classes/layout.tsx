import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Classes & Schedule | FitVilla",
  description:
    "View group classes and schedule at FitVilla – Spin, HIIT, Yoga, Strength and more. Check weekly and monthly timetables.",
};

export default function ClassesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
