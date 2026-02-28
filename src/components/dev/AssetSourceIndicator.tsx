"use client";

import { isDriveActive } from "@/lib/asset-urls";

/** Shows in dev only so you can confirm whether assets are loaded from Drive or local. */
export function AssetSourceIndicator() {
  if (process.env.NODE_ENV !== "development") return null;

  const fromDrive = isDriveActive();

  return (
    <div
      className="fixed bottom-4 left-4 z-[100] rounded-lg border border-white/20 bg-black/90 px-3 py-2 text-xs font-medium text-white shadow-lg"
      title={
        fromDrive
          ? "Images/videos are loaded from Google Drive URLs"
          : "Images/videos are from public/ folder. Set NEXT_PUBLIC_USE_DRIVE_IMAGES=true and add file IDs in src/lib/asset-urls.ts to use Drive."
      }
    >
      Assets: {fromDrive ? "Google Drive" : "Local"}
    </div>
  );
}
