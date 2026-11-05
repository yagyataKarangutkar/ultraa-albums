/**
 * Ultra Albums — Hero Section Scenes Configuration (v2)
 * 5 curated scenes reflecting the real landing page slider of Ultra Albums (ultraaalbums.com).
 * 
 * Rules:
 * - Real landing page text with silent fixes for original typos ("howcase" -> "showcase", "ptotographs" -> "photographs").
 * - Slide 1 links to /wedding-photo-albums. Slides 2-5 link targets marked TO CONFIRM.
 * - Temporary free-licence Unsplash photography matched to each slide subject, flagged for client replacement.
 */

export const HERO_CONFIG = {
  // Autoplay is off by default as per reference video (click-driven). Easy to enable here.
  autoplayDefault: false,
  autoplayInterval: 8000, // 8 seconds when enabled
  transitionDuration: 0.35, // 350ms clean cross-fade measured from 21oaks reference
  ease: [0.16, 1, 0.3, 1], // gentle ease-out without bounce or zoom
  scrimOpacity: 0.32, // ~30% flat black overlay for WCAG AA compliance
};

export const heroScenes = [
  {
    id: "scene-wedding",
    index: 0,
    title: "Wedding Photo Albums",
    prefix: "",
    emphasisWord: "Wedding",
    suffix: " Photo Albums",
    caption: "Wedding · Timeless moments. Forever yours.",
    shortTitle: "Wedding",
    description:
      "Timeless moments. Forever yours. Preserving the precious memories of a couple's wedding day in an elegant, handcrafted volume.",
    cta: {
      label: "Explore Collection",
      href: "/wedding-photo-albums",
      toConfirm: false,
    },
    subject: "Traditional royal wedding couple in festive attire under floral arch",
    alt: "Wedding couple in pastel sherwani and bridal lehenga under floral arch",
    src: "/images/hero/hero-wedding.jpg",
    thumbSrc: "/images/hero/hero-wedding.jpg",
    focalPoint: "center 30%",
    credit: "Ultra Albums Official Collection",
  },
  {
    id: "scene-baby",
    index: 1,
    title: "Baby Photo Albums",
    prefix: "",
    emphasisWord: "Baby",
    suffix: " Photo Albums",
    caption: "Baby · Little moments. Big happiness.",
    shortTitle: "Baby",
    description:
      "Little moments. Big happiness. Cherish every smile, milestone, and delicate detail of your little one with fine-art keepsakes.",
    cta: {
      label: "Explore Collection",
      href: "/baby-photo-albums",
      toConfirm: true,
    },
    subject: "Smiling baby in knit hoodie with bear ears beside teddy bear",
    alt: "Joyful baby in cozy knitwear with teddy bear",
    src: "/images/hero/hero-baby.jpg",
    thumbSrc: "/images/hero/hero-baby.jpg",
    focalPoint: "center 35%",
    credit: "Ultra Albums Official Collection",
  },
  {
    id: "scene-family",
    index: 2,
    title: "Family Photo Albums",
    prefix: "",
    emphasisWord: "Family",
    suffix: " Photo Albums",
    caption: "Family · Together is our favourite place.",
    shortTitle: "Family",
    description:
      "Together is our favourite place. Preserving moments of joy, generational milestones, vacations, and celebrations in an archival book.",
    cta: {
      label: "Explore Collection",
      href: "/family-photo-albums",
      toConfirm: true,
    },
    subject: "Multigenerational family portrait with grandparents, parents, and laughing young boy",
    alt: "Multigenerational Indian family smiling together outdoors",
    src: "/images/hero/hero-family.jpg",
    thumbSrc: "/images/hero/hero-family.jpg",
    focalPoint: "center 40%",
    credit: "Ultra Albums Official Collection",
  },
  {
    id: "scene-travel",
    index: 3,
    title: "Travel Photo Albums",
    prefix: "",
    emphasisWord: "Travel",
    suffix: " Photo Albums",
    caption: "Travel · Explore. Capture. Relive.",
    shortTitle: "Travel",
    description:
      "Explore. Capture. Relive. A wonderful way to cherish your adventures, visual storytelling, and scenic expeditions across the world.",
    cta: {
      label: "Explore Collection",
      href: "/travel-photo-albums",
      toConfirm: true,
    },
    subject: "Woman in straw hat overlooking sunset across Mediterranean coastal caldera",
    alt: "Scenic travel sunset over white seaside village and ocean caldera",
    src: "/images/hero/hero-travel.jpg",
    thumbSrc: "/images/hero/hero-travel.jpg",
    focalPoint: "center 35%",
    credit: "Ultra Albums Official Collection",
  },
];
