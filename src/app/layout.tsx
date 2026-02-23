import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitVilla – Luxury Fitness",
  description:
    "Premium Technogym equipment. Certified coaches. Steam, sauna and recovery. Noida Sector 76, Sector 133, Mayur Vihar.",
  icons: {
    icon: "/images/logo/fitvilla-logo.png",
    apple: "/images/logo/fitvilla-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className="pb-24 md:pb-0">{children}</div>
        <Footer />
        <MobileStickyCta />
        <WhatsAppButton />
      </body>
    </html>
  );
}
