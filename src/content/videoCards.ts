export interface VideoCardItem {
  id: string;
  title: string;
  description: string;
  videoSrc: string;
  imageSrc: string;
}

/**
 * Three rectangle video cards for Experience FitVilla. Click opens popup to play again.
 */
export const videoCards: VideoCardItem[] = [
  {
    id: "1",
    title: "Premium Equipment",
    description: "Train on world-class Technogym machines across our three locations.",
    videoSrc: "/videos/card-1.mp4",
    imageSrc: "/images/hero/hero-1.jpg",
  },
  {
    id: "2",
    title: "Group Classes",
    description: "Yoga, Zumba, spinning and more in dedicated studios.",
    videoSrc: "/videos/card-2.mp4",
    imageSrc: "/images/hero/hero-2.jpg",
  },
  {
    id: "3",
    title: "Steam & Sauna",
    description: "Recover and relax with premium steam and sauna facilities.",
    videoSrc: "/videos/card-3.mp4",
    imageSrc: "/images/hero/hero-3.jpg",
  },
];

export function getVideoCards(): VideoCardItem[] {
  return videoCards;
}
