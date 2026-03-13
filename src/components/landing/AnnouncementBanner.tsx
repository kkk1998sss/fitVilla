"use client";

import { useEffect, useState } from "react";

type AdminAnnouncement = {
  message?: string | null;
  updatedAt?: string | null;
};

export function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/announcement");
        if (!res.ok) return;
        const data = (await res.json()) as AdminAnnouncement;
        setAnnouncement(data.message?.trim() || "");
      } catch {
        // ignore
      }
    };
    load();
  }, []);

  if (!announcement) {
    return null;
  }

  return (
    <div className="border-b border-fitvilla-cyan/40 bg-gradient-to-r from-black via-fitvilla-deep to-black/90">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 text-xs text-fitvilla-light/90 sm:text-sm">
        <span className="inline-flex items-center gap-1 rounded-full bg-fitvilla-cyan/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-fitvilla-cyan">
          <span className="h-2 w-2 animate-pulse rounded-full bg-fitvilla-cyan shadow-[0_0_8px_rgba(45,212,228,0.9)]" />
          <span>Schedule update</span>
        </span>
        <div className="flex-1 overflow-hidden">
          <div className="font-semibold text-[11px] text-white sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis">
            {announcement}
          </div>
        </div>
      </div>
    </div>
  );
}

