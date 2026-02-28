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
    videoSrc: "https://drive.google.com/file/d/16eO0hfbmxMO-hj4P-8wKz-hO64CC5r0a/preview",
    imageSrc: "/images/hero/hero-1.jpg",
  },
  {
    id: "2",
    title: "Group Classes",
    description: "Yoga, Zumba, spinning and more in dedicated studios.",
    videoSrc: "https://drive.google.com/file/d/1plobWgL9qUyAHvV5ul14YJ9IvcVSqdbX/preview",
    imageSrc: "/images/hero/hero-2.jpg",
  },
  {
    id: "3",
    title: "Steam & Sauna",
    description: "Recover and relax with premium steam and sauna facilities.",
    videoSrc: "https://drive.google.com/file/d/1HO2V_Hl2sue0k7MwJciJL8oqXbOG_6Eb/preview",
    imageSrc: "/images/hero/hero-3.jpg",
  },
];

export function getVideoCards(): VideoCardItem[] {
  return videoCards;
}
