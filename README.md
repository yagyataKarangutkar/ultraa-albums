# Ultra Albums — Website Redesign (Starter Setup & 3D Showroom)

A minimal luxury, product-focused website foundation for **Ultra Albums** (Mumbai, India), engineered for professional photographers worldwide.

Built with **React 18 + Vite + Tailwind CSS + React Router v6 + Framer Motion + GSAP + Lucide Icons**.

---

## 1. Quick Start

### Install Dependencies
```bash
npm install
```

### Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 2. Architecture & Folder Structure

```text
codeai-project/
├── index.html                  # HTML entry point with Cormorant Garamond & Inter fonts + SEO meta
├── package.json                # Project dependencies (React, Vite, Tailwind, GSAP, Framer Motion)
├── postcss.config.js           # PostCSS Tailwind config
├── tailwind.config.js          # Confirmed colour tokens, typography scales, luxury tracking
├── vite.config.js              # Vite bundler configuration (port 3000)
├── public/
│   └── favicon.svg             # Minimalist luxury monogram favicon
└── src/
    ├── main.jsx                # React root mount with BrowserRouter
    ├── App.jsx                 # Global app routes & layout shell
    ├── styles/
    │   └── index.css           # Tailwind base, CSS variables, 3D transform utilities, textures
    ├── data/                   # Content layer (All texts isolated for easy editing)
    │   ├── albums.js           # 4 Showcase albums (3D) + Secondary collections (Layflat, Box & Bags)
    │   ├── company.js          # Phone, address, catalogue PDF URL, messenger link, unconfirmed items
    │   ├── navigation.js       # Complete navbar specification & sub-item configs (Products, Services, UK)
    │   ├── products.js         # Full product catalog & specifications
    │   ├── services.js         # 3 pro studio services (Album Designing, Retouching, Photography)
    │   ├── advantages.js       # 4 core studio advantages (Worldwide delivery, quality, etc.)
    │   ├── process.js          # 4-step production & proofing workflow
    │   ├── testimonials.js     # Empty state array (No fabricated reviews, review pending)
    │   └── faq.js              # Pro studio FAQ knowledge base
    ├── components/
    │   ├── common/
    │   │   ├── Button.jsx           # Luxury button (primary, outline, ghost, white)
    │   │   ├── FadeIn.jsx           # Subtle Framer Motion fade-in with prefers-reduced-motion check
    │   │   ├── ImagePlaceholder.jsx # Architectural placeholder showing exact intended photographic subject
    │   │   ├── Logo.jsx             # Single swappable brand logo component referencing original brand mark
    │   │   ├── ProductCard.jsx      # Minimalist product card with image placeholder and link
    │   │   ├── SectionHeading.jsx   # Cormorant Garamond serif section titles
    │   │   └── SectionLabel.jsx     # High-tracking uppercase micro-label
    │   ├── forms/
    │   │   └── ContactForm.jsx      # Fully validated contact enquiry form with state handling
    │   ├── showroom/                # Interactive 3D Album Showroom Components
    │   │   ├── Album3DProduct.jsx   # Physical 3D album card with GSAP quickTo pointer-following tilt & lift
    │   │   ├── AlbumExperience.jsx  # Fullscreen 3D viewer modal with focus trap & warm dimmed backdrop
    │   │   ├── AlbumPageTurner.jsx  # 3D dual-faced leaf page rotation around spine with touch/key navigation
    │   │   ├── AlbumInformation.jsx # Accompanying specifications panel with direct enquiry pre-fill
    │   │   └── SpreadPhoto.jsx      # Category-matched architectural photographic spread renderer
    │   └── layout/
    │       ├── Navbar.jsx           # Full specification navbar (Top bar, dropdowns, mobile drawer)
    │       ├── Footer.jsx           # Editorial charcoal footer with catalog link, address, legacy links
    │       └── ScrollToTop.jsx      # Route change scroll reset utility
    └── pages/
        ├── Home.jsx            # 9-section homepage skeleton (Hero to Footer)
        ├── Products.jsx        # Collections index page
        ├── ProductDetail.jsx   # Dynamic reusable detail template (/collections/:slug)
        ├── Services.jsx        # Studio services & design options overview
        ├── About.jsx           # Mumbai workshop craftsmanship story & verified claims note
        ├── Contact.jsx         # Production desk contact, phone, messenger, enquiry form
        ├── FAQ.jsx             # Accordion pro photographer FAQ
        ├── UkServices.jsx      # UK regional services landing page (Marked TO BUILD)
        ├── Blogs.jsx           # Studio journal & insights placeholder (Marked TO BUILD)
        └── NotFound.jsx        # 404 fallback page
```

---

## 3. Navbar Specification & Behaviour

* **Slim Top Bar:**
  * Direct Phone: `+91 93222 54315` (`tel:+919322254315`).
  * Facebook Messenger: direct link to `https://m.me/UltraaAlbums`.
  * Pay Online: external link to `https://www.paypal.com/in/signin` (`target="_blank" rel="noopener noreferrer"`).
* **Main Bar:**
  * Left: Swappable `Logo.jsx` referencing `https://ultraaalbums.com/wp-content/uploads/2021/10/cropped-ultra-logo.png` with typographic fallback and link to `/`.
  * Center:
    * `Home` (`/`)
    * `About Us` (`/about-us`)
    * `Our Products` (Dropdown with 6 items, small preview card, overview link, and catalogue PDF download link in footer)
    * `Services` (Dropdown with Album Designing, Image Editing, Wedding Photography)
    * `UK` (Dropdown with 7 regional items marked TO BUILD)
    * `Blogs` (`/blogs` marked TO BUILD)
    * `Contact Us` (`/contact-us`)
  * Right: `Enquire Now` button routing to `/contact-us`.
* **Dropdown Behaviour:**
  * Debounced hover delay (140ms) + click toggle.
  * Closes on outside click, Escape, and route change.
  * Simple white panel with thin Oak Wood border (`#E7E0D8`), no heavy drop shadows.
  * Full keyboard support (`Tab`, `Enter`/`Space`, `ArrowUp`/`ArrowDown`, `Escape`).
  * Active states on parent dropdowns when sub-pages are active.
* **Mobile / Tablet Full-Height Drawer:**
  * Hamburger button opens drawer with clear Close (`✕`) button.
  * Accordion dropdowns (one open at a time).
  * Strict mobile link sequence: *Home, About Us, Our Products, Services, UK, Blogs, Contact Us, Phone, Messenger, Pay Online, Download Catalogue, Enquire Now*.
  * Focus trap, body scroll locked, 44px+ tap targets.

---

## 4. Design Tokens & Styling Guide

| Token | Hex | Role | Contrast Note |
|---|---|---|---|
| **Black / Charcoal** | `#111111` | Headings, body text, primary buttons, footer | 18.2:1 on White (Passes AAA) |
| **White** | `#FFFFFF` | Cards, form fields, crisp contrasting areas | Base canvas |
| **Light Grey** | `#F1F1F1` | Main page background | Soft architectural ground |
| **Oak Wood** | `#E7E0D8` | Warm section background, borders, image placeholders | Subtle warm contrast |
| **Pale Blush** | `#F4EBE9` | Alternate section background | Warm organic contrast |
| **Misty Blue** | `#C6D1D9` | Soft panels, sub-surface tags | Restrained accent ground |
| **Nordic Blue** | `#67869A` | Accents, active indicators, borders, hover states | **WCAG AA Flag**: 3.87:1 on white (safe for large text/borders; `#3E5667` provided for small text links). |

### Typography
* **Headings:** `Cormorant Garamond` (Weights: 400, 500, 600)
* **Body, UI & Navigation:** `Inter` (Weights: 300, 400, 500, 600)
* **Section Identifiers:** Small uppercase labels with wide tracking (`letterSpacing: '0.22em'`)

---

## 5. Scope & Client Review Checklist

### Implemented in Starter Foundation:
* Complete Navbar according to exact specification with all original links preserved.
* Swappable `Logo` component.
* 9-section Home page skeleton with the 3D Showroom and secondary collections row.
* All routes configured with clean components and aliases (`/`, `/about-us`, `/products`, `/collections/:slug`, `/services`, `/uk`, `/blogs`, `/contact-us`, `/faq`).
* Validated Contact Form with client-side feedback and service pre-fill.
* Responsive across desktop, laptop, tablet, and mobile (no horizontal overflow between 320px and 1920px).

### Items To Be Confirmed With Ultra Albums Client:
1. **Logo & Brand Assets:** Official vector SVG logo mark and brand guidelines.
2. **Product Photography & Swatches:** High-resolution studio photography to replace neutral placeholders.
3. **Official Email & WhatsApp:** Current confirmed support email and WhatsApp Business click-to-chat API.
4. **Testimonials & Endorsements:** Real photographer reviews and featured project photographs.
5. **UK Regional Scope:** Dedicated GBP pricing tables and local UK distributor details.
6. **WordPress Blog Migration:** Content migration schedule for articles currently on `https://ultraaalbums.com/blogs`.
