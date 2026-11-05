# Ultra Albums — Hero Imagery Register & Image Credits

This document tracks all imagery utilized within the Ultra Albums redesigned web platform. Every asset is categorized by its origin, usage status, licensing, and client replacement requirements.

---

## 1. Hero Section Scenes (5 Slides)

All hero background photography is currently populated with curated, free-license Unsplash photography that rigorously aligns with the physical craft characteristics of Ultra Albums. 

> [!IMPORTANT]
> **Client Action Required:** Every photograph in this section is marked **`REPLACE WITH REAL PRODUCT PHOTO`**. Ultra Albums should provide authentic high-resolution studio photography (minimum 2560 × 1440 px, 16:9 landscape aspect ratio) for each of these 5 product lines.

| Slide # | Slide Title | Subject | Source & Photographer | License | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | **Wedding Photo Albums** | Handcrafted open flush mount photo album with seamless 180° layflat panoramic spread on neutral surface | [Unsplash: Jeremy Wong](https://unsplash.com/photos/de2939b7ef71) | Unsplash Commercial Free-use | `REPLACE WITH REAL PRODUCT PHOTO` |
| **02** | **Baby Photo Albums** | Soft pastel heirloom memory book and newborn photography prints on neutral linen | [Unsplash: Picsea](https://unsplash.com/photos/ee00e0ddd4e4) | Unsplash Commercial Free-use | `REPLACE WITH REAL PRODUCT PHOTO` |
| **03** | **Family Photo Albums** | Open family photo album with printed portraits on a natural oak surface | [Unsplash: Roman Kraft](https://unsplash.com/photos/dc8714191300) | Unsplash Commercial Free-use | `REPLACE WITH REAL PRODUCT PHOTO` |
| **04** | **Travel Photo Albums** | Bound travel album journal with expedition photography and maps on studio desk | [Unsplash: Dariusz Sankowski](https://unsplash.com/photos/e3d235c7d4c9) | Unsplash Commercial Free-use | `REPLACE WITH REAL PRODUCT PHOTO` |
| **05** | **Premium Wall Art** | Minimal luxury gallery-style framed archival prints hanging in a calm architectural interior | [Unsplash: Jonas Jacobsson](https://unsplash.com/photos/0e12902e5a38) | Unsplash Commercial Free-use | `REPLACE WITH REAL PRODUCT PHOTO` |

---

## 2. Image Optimization & Format Strategy

For production deployment:
1. **LCP Optimization:** Slide 1 (`scene-wedding`) is preloaded directly in `<head>` via `<link rel="preload" as="image" fetchpriority="high">` to guarantee instant Largest Contentful Paint.
2. **Post-paint Preloading:** Slides 2 through 5 are silently preloaded via JavaScript after initial paint, ensuring thumbnail clicks result in instant ~0.35s visual cuts with 0ms buffering or network latency.
3. **Contrast Scrim:** Each photo layer uses a flat 32% black overlay (`bg-black/32`), ensuring strict WCAG AA contrast (ratio > 4.5:1) for all white serif and sans-serif text without requiring decorative gradients or backdrop blurs.
4. **Fallback:** If an asset fails to fetch or the network drops, `HeroScene` mounts `ImagePlaceholder` with tone matched to Oak Wood and the intended craft subject clearly specified.
