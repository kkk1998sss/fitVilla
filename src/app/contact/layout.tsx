import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | FitVilla",
  description: "Get in touch with FitVilla – locations, email, phone, opening hours.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
