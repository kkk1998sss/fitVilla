/**
 * Feature card background images from Fitvilla photos Drive folder.
 * One ID per feature card (Technogym, Coaches, Zones, BCA, Recovery, Lockers, Cafe, Protein, Comfort).
 * Add Drive file IDs (Share → Copy link; ID is between /d/ and /view).
 * Folder: https://drive.google.com/drive/folders/158FPqmKZ89JRpr43mYrAOz-GxuHgK46m
 */
/** Thumbnail API is more reliable for embedding; sz=w800 gives good quality. */
const DRIVE_IMAGE_BASE = "https://drive.google.com/thumbnail?id=";
const DRIVE_IMAGE_SIZE = "&sz=w800";

/** Drive file IDs for each feature card (index 0 = Technogym, 1 = Coaches, … 8 = Comfort). Empty = use local fallback. */
export const featureCardDriveIds: string[] = [
  "1ZtzPJFbb9WGFnvQv5rZO81ueUDl6V7ki", // 0 Technogym – DSC05615.JPG; add more IDs from folder for other cards
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];

/** First Drive ID used as fallback when a card has no dedicated ID (so all cards show a photo). */
const FALLBACK_ID = featureCardDriveIds[0] || "";

/** Returns image URL for feature card at index: dedicated Drive ID, else fallback Drive image, else local path. */
export function getFeatureCardImageUrl(index: number, localFallback: string): string {
  const id = featureCardDriveIds[index] || FALLBACK_ID;
  return id ? `${DRIVE_IMAGE_BASE}${id}${DRIVE_IMAGE_SIZE}` : localFallback;
}
