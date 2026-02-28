/**
 * Central place for image/video URLs. Supports local /public paths or Google Drive direct links.
 *
 * To use Drive: set NEXT_PUBLIC_USE_DRIVE_IMAGES=true and add file IDs below.
 * Get file ID: In Drive, right-click file → Share → "Copy link". Link looks like
 *   https://drive.google.com/file/d/XXXXXXXXXX/view  → ID is XXXXXXXXXX
 * Folder: https://drive.google.com/drive/folders/158FPqmKZ89JRpr43mYrAOz-GxuHgK46m
 */

const USE_DRIVE =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_USE_DRIVE_IMAGES === "true";

const DRIVE_IMAGE_URL = "https://drive.google.com/uc?export=view&id=";
const DRIVE_VIDEO_URL = "https://drive.google.com/uc?export=download&id=";

/** Paste Drive file IDs here (from Share → Copy link; ID is between /d/ and /view) */
export const driveFileIds = {
  logo: "",
  "hero-1": "",
  "hero-2": "",
  "hero-3": "",
  "hero-4": "",
  "hero-5": "",
  "hero-6": "",
  "hero-7": "",
  "hero-8": "",
  "hero-9": "",
  "athlete-female": "",
  "athlete-male": "",
  "sector-76": "",
  "sector-133": "",
  "mayur-vihar": "",
  experience: "",
  "hero-video": "",
  "card-1-video": "",
  "card-2-video": "",
  "card-3-video": "",
} as const;

function getDriveImageUrl(id: string): string {
  return id ? `${DRIVE_IMAGE_URL}${id}` : "";
}
function getDriveVideoUrl(id: string): string {
  return id ? `${DRIVE_VIDEO_URL}${id}` : "";
}

/** Use for next/image and img src. Returns Drive URL if configured, else local path. */
export function getImageUrl(key: keyof typeof driveFileIds): string {
  if (USE_DRIVE && driveFileIds[key]) {
    const url = getDriveImageUrl(driveFileIds[key] as string);
    if (url) return url;
  }
  const local: Record<string, string> = {
    logo: "/images/logo/fitvilla-logo.png",
    "hero-1": "/images/hero/hero-1.jpg",
    "hero-2": "/images/hero/hero-2.jpg",
    "hero-3": "/images/hero/hero-3.jpg",
    "hero-4": "/images/hero/hero-4.jpg",
    "hero-5": "/images/hero/hero-5.jpg",
    "hero-6": "/images/hero/hero-6.jpg",
    "hero-7": "/images/hero/hero-7.jpg",
    "hero-8": "/images/hero/hero-8.jpg",
    "hero-9": "/images/hero/hero-9.jpg",
    "athlete-female": "/images/hero/athlete-female.png",
    "athlete-male": "/images/hero/athlete-male.png",
    "sector-76": "/images/locations/sector-76.jpg",
    "sector-133": "/images/locations/sector-133.jpg",
    "mayur-vihar": "/images/locations/mayur-vihar.jpg",
    experience: "/images/experience/experience.jpg",
    "hero-video": "",
    "card-1-video": "",
    "card-2-video": "",
    "card-3-video": "",
  };
  return local[key] ?? "";
}

/** Use for video src. Returns Drive URL if configured, else local path. */
export function getVideoUrl(key: "hero-video" | "card-1-video" | "card-2-video" | "card-3-video"): string {
  if (USE_DRIVE && driveFileIds[key]) {
    const url = getDriveVideoUrl(driveFileIds[key] as string);
    if (url) return url;
  }
  const local: Record<string, string> = {
    "hero-video": "/videos/hero.mp4",
    "card-1-video": "/videos/card-1.mp4",
    "card-2-video": "/videos/card-2.mp4",
    "card-3-video": "/videos/card-3.mp4",
  };
  return local[key] ?? "";
}

export function isUsingDrive(): boolean {
  return USE_DRIVE;
}

/** For debugging: are we actually loading any asset from Drive? (flag on + at least one ID set) */
export function isDriveActive(): boolean {
  if (!USE_DRIVE) return false;
  return Object.values(driveFileIds).some((id) => typeof id === "string" && id.length > 0);
}
