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
    caption: "Wedding Photo Albums · Archival Flush Mount",
    shortTitle: "Wedding",
    description:
      "Wedding album is a high-quality, meticulously crafted photo album designed to preserve and showcase the precious memories of a couple's wedding day in an elegant and lavish manner.",
    cta: {
      label: "Explore Collection",
      href: "/wedding-photo-albums",
      toConfirm: false,
    },
    subject:
      "An open, premium wedding album spread or a closed luxury album, soft natural light, neutral surface",
    alt: "Handcrafted open flush mount wedding photo album with seamless 180-degree panoramic spread on neutral surface",
    src: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=2400&q=85",
    thumbSrc:
      "https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=360&q=75",
    srcSet: {
      small:
        "https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=800&q=80",
      medium:
        "https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=1400&q=80",
      large:
        "https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=2400&q=85",
    },
    focalPoint: "center center",
    credit:
      "Unsplash (Jeremy Wong) · Temporary placeholder · REPLACE WITH REAL PRODUCT PHOTO",
  },
  {
    id: "scene-baby",
    index: 1,
    title: "Baby Photo Albums",
    prefix: "",
    emphasisWord: "Baby",
    suffix: " Photo Albums",
    caption: "Baby Photo Albums · Fine Art Keepsakes",
    shortTitle: "Baby",
    description:
      "Creating a cherished photo album for your little one is a delightful way to capture and celebrate those precious moments. There are plenty of creative ideas to explore.",
    cta: {
      label: "Explore Collection",
      href: "/baby-photo-albums",
      toConfirm: true,
    },
    subject:
      "A soft, light album or photo book with baby photographs, pastel and gentle tones",
    alt: "Soft pastel heirloom memory book and newborn photography prints on neutral linen",
    src: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=2400&q=85",
    thumbSrc:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=360&q=75",
    srcSet: {
      small:
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80",
      medium:
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1400&q=80",
      large:
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=2400&q=85",
    },
    focalPoint: "center center",
    credit:
      "Unsplash (Picsea) · Temporary placeholder · REPLACE WITH REAL PRODUCT PHOTO",
  },
  {
    id: "scene-family",
    index: 2,
    title: "Family Photo Albums",
    prefix: "",
    emphasisWord: "Family",
    suffix: " Photo Albums",
    caption: "Family Photo Albums · Generational Heirlooms",
    shortTitle: "Family",
    description:
      "Collection of photographs that document the significant moments, events, and memories shared by a family. Preserving moments of joy, milestones, celebrations, vacations, and everyday life.",
    cta: {
      label: "Explore Collection",
      href: "/family-photo-albums",
      toConfirm: true,
    },
    subject:
      "An open family album or photo book on a table, warm and natural, prints visible",
    alt: "Open family photo album with printed portraits on a natural oak surface",
    src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=2400&q=85",
    thumbSrc:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=360&q=75",
    srcSet: {
      small:
        "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80",
      medium:
        "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1400&q=80",
      large:
        "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=2400&q=85",
    },
    focalPoint: "center 40%",
    credit:
      "Unsplash (Roman Kraft) · Temporary placeholder · REPLACE WITH REAL PRODUCT PHOTO",
  },
  {
    id: "scene-travel",
    index: 3,
    title: "Travel Photo Albums",
    prefix: "",
    emphasisWord: "Travel",
    suffix: " Photo Albums",
    caption: "Travel Photo Albums · Bound Expeditions",
    shortTitle: "Travel",
    description:
      "It is a wonderful way to cherish your adventures and relive those special moments. It is not just about preserving images; it's also an opportunity to tell your unique story through visuals, captions, and mementos. It is a reflection of your adventures and the joy you experienced during your travels.",
    cta: {
      label: "Explore Collection",
      href: "/travel-photo-albums",
      toConfirm: true,
    },
    subject:
      "An album or photo book with travel photographs, maps or mementos as minimal props",
    alt: "Bound travel album journal with expedition photography and maps on studio desk",
    src: "https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?auto=format&fit=crop&w=2400&q=85",
    thumbSrc:
      "https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?auto=format&fit=crop&w=360&q=75",
    srcSet: {
      small:
        "https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?auto=format&fit=crop&w=800&q=80",
      medium:
        "https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?auto=format&fit=crop&w=1400&q=80",
      large:
        "https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?auto=format&fit=crop&w=2400&q=85",
    },
    focalPoint: "center center",
    credit:
      "Unsplash (Dariusz Sankowski) · Temporary placeholder · REPLACE WITH REAL PRODUCT PHOTO",
  },
  {
    id: "scene-wall-art",
    index: 4,
    title: "Premium Wall Art",
    prefix: "Premium ",
    emphasisWord: "Wall",
    suffix: " Art",
    caption: "Premium Wall Art · Gallery Framing & Canvas",
    shortTitle: "Wall Art",
    description:
      "Wall decor encompasses a wide range of items that can enhance the aesthetic appeal of your space and reflect your personality and style.",
    cta: {
      label: "Explore Collection",
      href: "/wall-art",
      toConfirm: true,
    },
    subject:
      "Framed prints or a gallery-style wall display in a calm interior",
    alt: "Minimal luxury gallery-style framed archival prints hanging in a calm architectural interior",
    src: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=2400&q=85",
    thumbSrc:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=360&q=75",
    srcSet: {
      small:
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
      medium:
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1400&q=80",
      large:
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=2400&q=85",
    },
    focalPoint: "center 45%",
    credit:
      "Unsplash (Jonas Jacobsson) · Temporary placeholder · REPLACE WITH REAL PRODUCT PHOTO",
  },
];
