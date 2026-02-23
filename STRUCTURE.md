# FitVilla – Folder Structure & Multi-Location Plan

## Route structure (multi-location)

| Route | Purpose |
|-------|--------|
| `/` | Main landing (all locations, hero, features, lead form) |
| `/locations` | Choose your nearest Fitvilla (location cards) |
| `/locations/[slug]` | Location-specific page (e.g. `sector-76`, `sector-133`, `mayur-vihar`) – same sections, location context |
| `/facilities` | Facilities overview (optional) |
| `/transformations` | Transformations gallery (optional) |
| `/contact` | Contact page |

**Navbar links:** Logo → `/` | Locations → `/locations` | Facilities → `/facilities` | Transformations → `/transformations` | Contact → `/contact` | CTA → Free trial (scroll to lead form or modal).

---

## Directory tree

```
fitvilla/
├── public/
│   └── images/
│       ├── logo/
│       ├── hero/           # Hero bg, full-screen assets
│       ├── locations/     # Per-location images (sector-76, sector-133, mayur-vihar)
│       ├── features/      # Icons/illustrations for feature cards
│       ├── experience/    # Experience section imagery
│       ├── transformations/
│       └── favicon/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout (fonts, metadata, Navbar/Footer wrapper if needed)
│   │   ├── page.tsx             # Home = landing page (composes all sections)
│   │   ├── globals.css
│   │   ├── locations/
│   │   │   ├── page.tsx         # Locations listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Dynamic location page (sector-76, etc.)
│   │   ├── facilities/
│   │   │   └── page.tsx
│   │   ├── transformations/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileStickyCta.tsx   # Sticky "Start Free Trial" on mobile
│   │   │   └── WhatsAppButton.tsx    # Floating WhatsApp
│   │   │
│   │   ├── landing/              # Landing page sections (in wireframe order)
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── LocationsSection.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── TransformationsSection.tsx
│   │   │   ├── OfferSection.tsx
│   │   │   ├── LeadFormSection.tsx
│   │   │   └── MapSection.tsx
│   │   │
│   │   └── ui/                   # Reusable primitives (no section-specific copy)
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       ├── Select.tsx
│   │       └── index.ts
│   │
│   ├── content/                  # Copy and structured data (no components)
│   │   ├── locations.ts          # All location data (slug, name, address, features, image, map)
│   │   ├── features.ts           # Feature cards (title, subtext, priority for sizing)
│   │   ├── nav.ts                # Nav links and CTA label
│   │   └── site.ts               # Site-wide strings (brand name, taglines)
│   │
│   ├── types/
│   │   ├── location.ts
│   │   ├── feature.ts
│   │   └── index.ts
│   │
│   ├── lib/
│   │   ├── constants.ts          # Location slugs, routes
│   │   └── utils.ts
│   │
│   └── hooks/
│       └── (e.g. useLeadForm.ts when you add form logic)
│
├── STRUCTURE.md                  # This file
├── package.json
└── ...
```

---

## Section → component mapping (wireframe)

| Section | Component | Notes |
|---------|-----------|--------|
| Navbar | `layout/Navbar` | Logo, Locations, Facilities, Transformations, Contact, Free Trial CTA |
| Hero | `landing/HeroSection` | Full-screen, headline, CTAs, location strip |
| Features | `landing/FeaturesSection` | 3×3 grid; data from `content/features.ts`; 3 cards larger (Technogym, Steam & Sauna, Certified Coaches) |
| Locations | `landing/LocationsSection` | Cards from `content/locations.ts`; "Join" → `/locations/[slug]` |
| Experience | `landing/ExperienceSection` | Image + copy + "Book Free Trial" |
| Transformations | `landing/TransformationsSection` | Before/after + testimonial + CTA |
| Offer | `landing/OfferSection` | Free trial + benefits + "Claim Free Trial" |
| Lead form | `landing/LeadFormSection` | Name, Phone, Location (select); repeat 3× on page as per doc |
| Map | `landing/MapSection` | 3 maps (Sector 76, 133, Mayur Vihar) |
| Footer | `layout/Footer` | Logo, Locations, Contact, Instagram, WhatsApp |
| Mobile sticky CTA | `layout/MobileStickyCta` | "Start Free Trial" |
| WhatsApp | `layout/WhatsAppButton` | Floating button |

---

## Conversion elements (from doc)

- **Lead form** repeated 3 times on landing.
- **Sticky bottom CTA** on mobile: "Start Free Trial".
- **Floating WhatsApp** button.
- **Feature cards:** Technogym, Steam & Sauna, Certified Coaches rendered larger (e.g. row-span or bigger card).

---

## Mobile flow order (stack)

1. Logo (in Navbar)  
2. Hero  
3. CTA  
4. Features  
5. Locations  
6. Experience  
7. Transformations  
8. Offer  
9. Lead Form  
10. Map  
11. Footer  

Same section order on desktop; layout (grid vs stack) handled in each section.

---

## Location slugs (canonical)

- `sector-76`
- `sector-133`
- `mayur-vihar`

Use in: `/locations/[slug]`, lead form dropdown, and `content/locations.ts`.

---

## Next steps (when you start design)

1. Add images under `public/images/` per folder above.
2. Fill `content/locations.ts` and `content/features.ts` with real copy.
3. Implement `components/layout/*` and `components/landing/*` (no design yet; structure only).
4. Compose `app/page.tsx` from landing sections in the order above.
5. Implement `app/locations/[slug]/page.tsx` to reuse same sections with location context.
6. Add design (Tailwind, fonts, spacing, responsive) and then polish.
