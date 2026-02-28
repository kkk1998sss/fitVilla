import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join FitVilla | Book Your Free Trial",
  description:
    "Train in a luxury fitness ecosystem. Book your seat – limited free trial slots. Sector 76, Sector 133, Mayur Vihar.",
};

export default function JoinFitvillaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
