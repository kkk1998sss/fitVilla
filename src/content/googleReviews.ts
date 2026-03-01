export interface GoogleReview {
  name: string;
  date: string;
  rating: number;
  quote: string;
  verified: boolean;
}

export const googleReviews: GoogleReview[] = [
  { name: "Ridhima Aggarwal", date: "14 Sept 2025", rating: 5, quote: "The coaches are wonderful. They train with patience and clarity. Best gym in Noida!", verified: true },
  { name: "Rajeev Sharma", date: "8 Sept 2025", rating: 5, quote: "The facilities are very well structured. Technogym equipment and steam & sauna – everything is top class.", verified: true },
  { name: "Madhuri Dhanuka", date: "3 Oct 2025", rating: 5, quote: "The club is awesome! Staff explained everything in detail and made me feel welcome. Highly recommend.", verified: true },
  { name: "Pooja Agarwal", date: "30 Sept 2025", rating: 5, quote: "Excellent gym! Clean, premium equipment and the coaches really know their stuff. Worth every rupee.", verified: true },
  { name: "Sarita Devi", date: "28 Oct 2025", rating: 5, quote: "Very supportive team. Best fitness experience I've ever had. Sector 76 location is fantastic.", verified: true },
  { name: "Manisha Patel", date: "24 Nov 2025", rating: 5, quote: "Transformative experience. Lost 8 kg in 3 months. Highly recommend to everyone!", verified: true },
  { name: "Rekha Sharma", date: "14 Sept 2025", rating: 5, quote: "Outstanding facilities. Gained so much strength and confidence. FitVilla feels like a second home.", verified: true },
  { name: "Rakhi Shukla", date: "20 Sept 2025", rating: 5, quote: "The classes are going very well. Coaches teach clearly and the environment is motivating. Really enjoying it!", verified: true },
];

export function getGoogleReviews(): GoogleReview[] {
  return googleReviews;
}
