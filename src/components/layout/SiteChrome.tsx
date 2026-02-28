"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";
import { AssetSourceIndicator } from "@/components/dev/AssetSourceIndicator";

const JOIN_PAGE_PATH = "/joinfitvilla";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isJoinPage = pathname === JOIN_PAGE_PATH;

  if (isJoinPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <div className="pb-24 md:pb-0">{children}</div>
      <Footer />
      <MobileStickyCta />
      <WhatsAppButton />
      <AssetSourceIndicator />
    </>
  );
}
