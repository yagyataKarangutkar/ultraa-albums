# Ultra Albums: Website Redesign, Starter Setup Prompt

## Role
You are a senior frontend engineer and UI designer. Set up the starting foundation for a website redesign. Do NOT build every page in full yet. Build the foundation, then stop and summarise.

## Project Links
- **Original website (study first, keep its content and structure in mind):** https://ultraaalbums.com/
- **Design reference (study layout, spacing, product presentation and premium minimal feel; do not copy assets or text):** https://www.zno.com/

## Project
Redesign of **Ultra Albums**, a photo album manufacturer and designer based in Mumbai that serves professional photographers worldwide.

## Before Coding
1. Visit both links above. Write a short note (max 15 lines) on:
   - What content and pages the original site has (products, services, UK pages, FAQ, blogs, catalogue PDF, contact form, pay online link).
   - What makes the reference site feel premium (grid, whitespace, imagery, typography, CTAs).
2. Do not rebuild backend functionality. If the original uses WordPress features (forms, PayPal link), keep them as external links or placeholders and list them as "to be confirmed".

## Design Direction
Minimal luxury, product-focused, spacious, timeless. Photography matters more than decoration.

**Avoid:** gradients, heavy shadows, glassmorphism, too many cards, over-rounded corners, large text blocks, excessive animation, generic AI-template look.

## Colour Palette (confirmed)
Define as CSS variables / Tailwind theme tokens.

| Name | Hex | Suggested use |
|---|---|---|
| Misty Blue | `#C6D1D9` | Soft panels, subtle section backgrounds |
| Light Grey | `#F1F1F1` | Main page background |
| Pale Blush | `#F4EBE9` | Alternate section background |
| Oak Wood | `#E7E0D8` | Warm section background, borders, image placeholders |
| Nordic Blue | `#67869A` | Links, accents, hover states |
| Black | `#111111` | Headings, body text, primary buttons, footer |
| White | `#FFFFFF` | Cards, form fields, clean contrast areas |

Rules:
- Keep it restrained: at most 2 tints per section.
- Check text contrast (WCAG AA) and flag any failing pairs. Nordic Blue text on light backgrounds should be checked especially.

## Typography
- **Headings:** Cormorant Garamond (serif)
- **Body and navigation:** Inter
- Small uppercase labels with wide letter spacing for section identifiers.
- Define a clear type scale and a consistent spacing scale in the theme.

## Tech Stack
React + Vite + Tailwind CSS + React Router + Framer Motion (subtle fade-ins only) + Lucide icons. No unnecessary dependencies. Clean, reusable, maintainable code.

## Setup Tasks
1. Scaffold the project with a clean folder structure (`components/`, `pages/`, `data/`, `assets/`, `styles/`).
2. Configure the Tailwind theme with the palette, fonts, spacing, container width and breakpoints above.
3. Build the global layout: sticky Navbar (mobile menu, active states), Footer, and ScrollToTop on route change.
4. Create reusable components: Button (primary, ghost), SectionLabel, SectionHeading, ProductCard, ImagePlaceholder, FadeIn wrapper, ContactForm (name, email, phone, message, validation, success state).
5. Set up routes with placeholder pages: Home, Products (index), Product detail (one reusable template), Services, About, Contact, FAQ.
6. Keep all content in data files (`src/data/products.js`, `services.js`, etc.) so it is easy to edit.
7. Build the Home page skeleton with these sections in order: Hero, Collections grid, Services, About, Why Ultra Albums (4 points), How It Works (4 steps), Testimonials (empty state), Final CTA, Footer.
8. Add SEO basics: semantic HTML, proper heading hierarchy, meta tags, alt text, favicon placeholder.
9. Make it responsive for desktop, laptop, tablet and phone. Design mobile layouts deliberately, not as compressed desktop.

## Content (use real content from the original site; do not invent facts)
- **Navigation:** Home, Collections, About Us, Services, Contact Us, plus an "Enquire Now" button.
- **Products:** Luxury Albums, Flush Mount Album, Layflat, Photo Book, Box and Bags, Slip-in Albums.
- **Services:** Album Designing (6-7 themes, soft-copy preview, unlimited revisions), Image Editing, Wedding Photography.
- **Process:** Transfer photos online, Get design, Printing on approval, Shipping.
- **Advantages:** Worldwide Delivery, Cost Effective, Reliable Quality, Customer Centric.
- **Contact:** phone +91 93222 54315, Facebook Messenger (https://m.me/UltraaAlbums), product catalogue PDF (https://ultraaalbums.com/wp-content/uploads/2021/11/Ultraa-product-Catelogue.pdf).
- **Suggested hero headline:** "Memories, Beautifully Preserved." with CTA "Explore Collections".
- Do NOT fabricate testimonials, awards, client names or statistics. Mark unknowns as "TO CONFIRM". Treat "15 years" and "15+ photographers" as client claims that need confirmation.
- Use neutral image placeholders with the intended subject written on them (for example "Open album spread", "Cover texture close-up"). Do not use random stock photos. Real product photos will be supplied.

## Performance and Accessibility
Lazy-load images, use modern formats, keep animations subtle (fade and small hover scale only, respect `prefers-reduced-motion`), keyboard-accessible navigation, visible focus states.

## Output
1. Short research note from the two sites.
2. A working project that runs with `npm install` and `npm run dev`.
3. A README with folder structure, how to edit content, and the design tokens.
4. A final list of what was built, what is placeholder, and what must be confirmed with the client:
   - Logo and brand guidelines
   - Product photos and specifications
   - Address and email
   - WhatsApp number
   - Testimonials
   - Ordering process
   - Existing site features to keep

**Stop after this setup and wait for review before building full pages.**
