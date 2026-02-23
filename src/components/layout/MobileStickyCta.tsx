"use client";

import Link from "next/link";
import { freeTrialCta } from "@/content/site";

export function MobileStickyCta() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/95 py-3 backdrop-blur-md md:hidden"
      aria-hidden
    >
      <div className="px-4">
        <Link
          href="#lead-form"
          className="flex w-full items-center justify-center rounded-full bg-fitvilla-cyan py-3.5 text-base font-semibold text-black transition-all active:scale-[0.98]"
        >
          {freeTrialCta}
        </Link>
      </div>
    </div>
  );
}
