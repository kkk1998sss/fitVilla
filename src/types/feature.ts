/**
 * Priority "highlight" = show larger in features grid (Technogym, Steam & Sauna, Certified Coaches).
 */

export type FeaturePriority = "default" | "highlight";

export interface Feature {
  id: string;
  title: string;
  subtext: string;
  priority: FeaturePriority;
  iconPath?: string;
  imageSrc?: string;
}
