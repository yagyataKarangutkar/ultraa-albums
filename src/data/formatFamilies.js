/**
 * Ultra Albums — Signature Format Families Configuration
 * 4 flagship binding formats with authentic specifications from ultraaalbums.com
 * 
 * Rules:
 * - Real product titles and specs from the original site.
 * - New Colour Theme mapping:
 *   1. Slip-in Albums: Soft Grey #F1F2F4 (Text: Black #111111)
 *   2. Flush Mount Albums: Sky Wash #DEEAF9 (Text: Black #111111)
 *   3. Photo Book: Cream Stone #DED8C6 (Text: Black #111111)
 *   4. Luxury (Leather) Albums: Ink Blue #4F6389 (Text: White #FFFFFF)
 *   Neutral start state: Ivory #F3F1E8
 */

export const FORMAT_FAMILIES = [
  {
    id: "slip-in-albums",
    index: 0,
    name: "Slip-in Albums",
    subtitle: "Self-Mount Window Portfolio",
    description:
      "Classic slip-in pocket albums crafted with archival mats for instant studio print assembly. Features bevelled frames that protect prints with zero adhesives required.",
    bgColor: "#F1F2F4", // Soft Grey
    textColor: "#111111", // Black
    theme: "dark-text",
    specs: {
      formatType: "Slip-in Bevel Mat Folio",
      sizes: ["4 × 6 in", "5 × 7 in", "8 × 10 in"],
      coverOptions: "Archival Buckram, Natural Silk, Classic Rexine",
      paperType: "Acid-free mat framing boards with pre-cut apertures",
      bindingCraft: "Reinforced stitched spine with optional metal corners",
      productionLead: "4–6 business days",
    },
    visualProps: {
      type: "slip-in",
      coverColor: "#2A2A2A",
      coverMaterial: "buckram",
      windowPhoto: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80",
      accentFoil: "silver",
      thickness: "medium",
      edgeStyle: "clean",
    },
    alt: "Handcrafted black buckram slip-in photo album featuring a bevelled cameo window portrait",
    watermarkText: "Folio",
    ctaHref: "/collections/slip-in-albums",
    enquirePrefill: "Slip-in Albums",
  },
  {
    id: "flush-mount-albums",
    index: 1,
    name: "Flush Mount Albums",
    subtitle: "Architectural 180° Panoramic Rigidity",
    description:
      "Rigid unbending pages mounted edge-to-edge onto durable archival cores for ultra-crisp photographic impact. Opens completely flat for seamless panoramic storytelling.",
    bgColor: "#DEEAF9", // Sky Wash
    textColor: "#111111", // Black
    theme: "dark-text",
    specs: {
      formatType: "Rigid Core Flush Mount Layflat",
      sizes: ["8 × 8 in", "10 × 10 in", "12 × 12 in", "12 × 16 in"],
      coverOptions: "Japanese Bookcloth Linen, Velvet, Acrylic Cameo",
      paperType: "Fuji Crystal Archive HD / Silver Halide with UV seal",
      bindingCraft: "Solid composite core (1.2mm substrate) with micro-crease",
      productionLead: "7–10 business days",
    },
    visualProps: {
      type: "flush-mount",
      coverColor: "#4B5563",
      coverMaterial: "slate-linen",
      accentFoil: "blind-deboss",
      thickness: "thick",
      edgeStyle: "rigid-white",
    },
    alt: "Architectural flush mount album showing thick rigid core pages and seamless 180-degree layflat hinge",
    watermarkText: "Panoramic",
    ctaHref: "/collections/flush-mount-album",
    enquirePrefill: "Flush Mount Albums",
  },
  {
    id: "photo-book",
    index: 2,
    name: "Photo Book",
    subtitle: "Flexible Lightweight Fine Art Volume",
    description:
      "Refined flexible-page volumes designed for parent albums, guest books, and editorial portrait sessions. Sleek contemporary profile with museum-grade digital offset prints.",
    bgColor: "#DED8C6", // Cream Stone
    textColor: "#111111", // Black
    theme: "dark-text",
    specs: {
      formatType: "Lightweight Companion Hardcover",
      sizes: ["6 × 6 in", "8 × 8 in", "8.5 × 11 in", "10 × 10 in"],
      coverOptions: "Oatmeal Linen, Matte Photo Wrap, Soft-Touch Laminate",
      paperType: "200–250 gsm Lustre Silk / Fine Art Matte Velvet",
      bindingCraft: "Thermal PUR case binding with French fold endsheets",
      productionLead: "4–6 business days",
    },
    visualProps: {
      type: "photo-book",
      coverColor: "#C2B29F",
      coverMaterial: "natural-linen",
      accentFoil: "copper",
      thickness: "slim",
      edgeStyle: "clean-paper",
    },
    alt: "Minimalist oatmeal linen hardcover photo book with clean trimmed paper block",
    watermarkText: "Editorial",
    ctaHref: "/collections/photo-book",
    enquirePrefill: "Photo Book",
  },
  {
    id: "luxury-albums",
    index: 3,
    name: "Luxury Albums",
    subtitle: "Bespoke Tuscan Leather & Gilded Heirloom",
    description:
      "The flagship heirloom collection bound in genuine top-grain leather, acrylic cameos, and opulent velvet. Engineered for legacy wedding presentations to last generations.",
    bgColor: "#4F6389", // Ink Blue
    textColor: "#FFFFFF", // White
    theme: "light-text",
    specs: {
      formatType: "Hand-Bound Leather Master Volume",
      sizes: ["10 × 10 in", "12 × 12 in", "11 × 14 in", "12 × 18 in"],
      coverOptions: "Italian Top-Grain Leather, Velvet, Acrylic Glass Plate",
      paperType: "Museum-grade 310 gsm Cotton Rag / Archival Silver Halide",
      bindingCraft: "Ribbed leather spine, gilded metallic page edges, hot-foil stamping",
      productionLead: "10–14 business days",
    },
    visualProps: {
      type: "luxury-leather",
      coverColor: "#6B3E26", // Cognac Leather
      coverMaterial: "cognac-leather",
      accentFoil: "gold",
      thickness: "heavy-heirloom",
      edgeStyle: "gilded-gold",
    },
    alt: "Handcrafted cognac leather luxury wedding album with gold foil debossing and gilded page edges",
    watermarkText: "Heirloom",
    ctaHref: "/collections/luxury-albums",
    enquirePrefill: "Luxury Leather Albums",
  },
];

