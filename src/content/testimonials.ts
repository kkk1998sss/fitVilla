/**
 * Member testimonials. Sourced from FitVilla’s official presence (e.g. fitvillagym.com, Google).
 */

export interface Testimonial {
  quote: string;
  name?: string;
  role?: string;
}

/** Short quotes for cards or section highlights */
export const testimonialQuotes: Testimonial[] = [
  {
    quote:
      "This gym is amazing. Very friendly trainer, top equipment and great environment. Good service with friendly staff and super clean and comfortable gym for everyone from beginners to professional athletes.",
    name: "Member",
    role: "Sector 76",
  },
  {
    quote:
      "Fitvilla is one of the best place to workout and the best part of the gym is trainer's and the staff of gym they all are really friendly. I had a beautiful experience working with trainer Mukul.",
    name: "Member",
    role: "Sector 76",
  },
  {
    quote:
      "Fantastic, clean gym with helpful staff and world class trainers. I train with Manoj and have a fantastic experience. Though every trainer is extremely helpful and knowledgeable. Strongly recommend.",
    name: "Member",
    role: "Sector 76",
  },
  {
    quote:
      "Fitvilla is best gym in noida, having best equipments, professional coaches. It has dedicated areas for HIIT, workout and other amenities. In first one month there is substantial progress.",
    name: "Member",
    role: "Sector 76",
  },
  {
    quote:
      "Hygienic, clean and spacious gym. In my view best gym in Noida considering parameters like cleanness, hygiene, space. Fitness equipments new and maintained. Office staff is supportive.",
    name: "Member",
    role: "Sector 76",
  },
  {
    quote:
      "Fitness is journey, not destination so keep going. Coach Manoj always motivate and help to explain the exercise and muscle knowledge. Lost 5.3 kg in one month. Best gym of Noida.",
    name: "Member",
    role: "Sector 76",
  },
];

export function getRandomTestimonial(): Testimonial {
  return testimonialQuotes[Math.floor(Math.random() * testimonialQuotes.length)];
}

export function getTestimonialByIndex(i: number): Testimonial {
  return testimonialQuotes[i % testimonialQuotes.length];
}
