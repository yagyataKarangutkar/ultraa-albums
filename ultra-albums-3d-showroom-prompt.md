# Ultra Albums: Phase 2, Interactive 3D Album Showroom

## Role
You are a senior frontend engineer and motion designer. Phase 1 (the starter setup) is complete. Build the interactive 3D album showroom on top of it, as an enhancement to the Collections section. Do not redesign the rest of the website.

## Project Links
- **Original website (source of real content and product details):** https://ultraaalbums.com/
- **Design reference (premium, minimal product presentation):** https://www.zno.com/

## Context from Phase 1
The project is a React + Vite + Tailwind CSS site with React Router, Framer Motion (subtle fade-ins), Lucide icons, reusable components, content in `src/data/`, and a `ContactForm`. Inspect the existing code first and follow its conventions.

## Objective
Replace the ordinary flat product cards in the **Collections** section of the Home page with realistic, physical-looking 3D albums. Visitors should be able to explore each album, open it, browse its pages, read its specifications and enquire about that specific product.

It should feel like an exclusive luxury product showroom, not a generic e-commerce grid.

## 1. Preserve the Phase 1 design system
Keep:
- The Navbar, Footer, page structure and section order from Phase 1.
- The confirmed palette (as CSS variables / Tailwind tokens):

| Name | Hex |
|---|---|
| Misty Blue | `#C6D1D9` |
| Light Grey | `#F1F1F1` |
| Pale Blush | `#F4EBE9` |
| Oak Wood | `#E7E0D8` |
| Nordic Blue | `#67869A` |
| Black | `#111111` |
| White | `#FFFFFF` |

- Typography: Cormorant Garamond for headings, Inter for body and navigation.
- Minimal luxury direction: spacious, product-focused, restrained.

Do not introduce: neon or bright colours, unnecessary gradients, glassmorphism, excessive cards, decorative UI, unrelated animations, or a different design language. The showroom must look like a natural part of the site.

## 2. The 3D showroom
Replace the Collections cards with realistic 3D album products. Each should look like a physical handcrafted album.

**Visual details**
- Visible cover thickness and realistic proportions.
- Slightly rounded physical edges.
- Natural contact shadows beneath each album.
- Layered page edges.
- Subtle paper and cover-material textures.
- Soft ambient lighting, correct perspective and depth.
- Refined, understated product labels.
- Correct image aspect ratios, no stretching.

Arrange the albums in a balanced showroom layout that looks intentionally composed, not randomly floating.

### The four showcase albums
Use these four in the 3D showroom. The remaining products from the original site (Layflat, Box and Bags) stay in a simple secondary "More collections" row beneath, using the Phase 1 card style, so nothing from the real catalogue is lost.

| Album | Presentation |
|---|---|
| **Slip-in Albums** | Premium pocket-style album. Individual photographs shown inside sleeves or windows. Practical, elegant presentation. |
| **Flush Mount Albums** | Substantial, rigid, lay-flat album. Thick pages and panoramic wedding spreads. Mention the seamless 180-degree view only if the original site supports it. |
| **Photo Book** | Contemporary photo book. Thinner, flexible pages and editorial layouts. Visibly different from the flush mount album. |
| **Luxury (Leather) Albums** | Premium leather-bound album. Believable leather texture and refined cover finishing. Embossing or foil only if the original site lists it as an option. |

> The original site names this product "Luxury Albums". Use the name that appears on the original website.

**Do not invent** specifications, materials, guarantees or features. Use only content from https://ultraaalbums.com/ or the data files. Anything unknown is marked `TO CONFIRM` in the data file and hidden from the public UI until confirmed.

## 3. Images and assets
- No product photos have been supplied yet. Build every album so it works with a single image config in `src/data/albums.js` (cover image, interior page images, alt text).
- Until real photos exist, use the `ImagePlaceholder` component with the intended subject written on it (for example "Flush mount spread, full-width wedding photograph", "Leather cover texture close-up"). Never use random stock photos and never show broken images.
- Use CSS and layered elements for cover thickness, page edges and textures so the albums look credible even before photography arrives.
- The original site's images may be referenced for layout study, but do not hotlink or copy them. List which images are needed per album in the final report.

## 4. GSAP hover interactions
Add **GSAP** (`gsap`) for the showroom only. Keep Framer Motion for simple fade-ins elsewhere, and do not add any other animation library. Confirm in the report that there is no duplicate-library overlap beyond these two.

On desktop hover:
1. Gently lift the album.
2. Tilt it slightly towards the viewer.
3. Reveal a little page thickness.
4. Adjust the contact shadow to match the lift.
5. Reveal or emphasise the album name and a short description.

On pointer leave, return smoothly to rest.

**Motion direction:** natural easing, subtle and premium, no bouncing, spinning or exaggerated rotation, no interference with scrolling. Use `gsap.quickTo()` for pointer-following effects. Disable hover-only behaviour on touch devices.

## 5. Main feature: open the selected album in 3D
When an album is selected, open a dedicated immersive viewer. Do not navigate away and do not use a conventional product popup.

**Opening sequence**
1. Move the selected album smoothly to the centre of the viewing area.
2. Transition the surrounding background into a subtle, dimmed presentation using the palette (for example a dimmed Black overlay with Oak Wood warmth), not a new colour scheme.
3. Rotate the closed album into a natural viewing angle.
4. Animate the front cover opening around the spine.
5. Reveal the inner pages.
6. Allow browsing with realistic page-turn animations.

It should feel like a real hardcover book opening. Use GSAP timelines with CSS 3D transforms. The spine, cover and pages must stay visually connected throughout. Do not fake it with opacity changes or horizontal slides.

**Technical direction**
- `perspective`, `transform-style: preserve-3d`, `transform-origin`, `backface-visibility: hidden`, `rotateY`.
- Separate front and back faces for every page leaf to prevent bleed-through and ghosting.

## 6. A unique interior for every album
- **Slip-in:** photographs inside individual sleeves or windows, showing how prints are presented, with the actual format details.
- **Flush Mount:** thick rigid lay-flat pages, full-width two-page spreads, panoramic experience.
- **Photo Book:** thinner flexible pages, multiple editorial layouts, visibly different construction.
- **Luxury (Leather):** leather cover and texture, actual finishing options, opens to reveal inner pages.

Each album has its own page set and layouts. Do not reuse the same pages for all four.

## 7. Realistic page turning
Implement:
- Previous and Next controls.
- Small, elegant page-position indicators, clickable where appropriate.
- Arrow-key navigation, and Escape to close.
- Touch swipe on mobile.
- Correct page order and spread pairing.
- Page rotation around the spine with subtle shadows during the turn.
- Correct image proportions.

No flickering, ghosting, jumps or incorrect stacking. Visitors can browse multiple spreads without closing and reopening.

## 8. Album information panel
Show a clean panel beside the open album. Include only information that exists for the selected product: name, short description, available sizes, cover material, paper type, customisation options, finishing options and other specifications from the data file.

Keep it visually secondary: refined typography, restrained dividers, generous whitespace.

**Enquire About This Album** button must:
- Identify the currently selected album.
- Pass the album name and category into the Phase 1 `ContactForm` (for example through a route query parameter or shared state) and pre-fill a product field.
- Keep all existing form validation and success behaviour.

Do not create a disconnected or non-functional enquiry flow.

## 9. Animation quality
- Subtle showroom entrance and staggered album reveals.
- Gentle scroll-based entrance. Use ScrollTrigger only where it genuinely helps.
- Smooth selection, cover-opening, page-turning and closing transitions.
- Respect `prefers-reduced-motion` (fall back to simple fades and a non-animated page switch).

**Avoid:** excessive parallax, random floating objects, continuous spinning, heavy blur, over-animated text, scroll hijacking, animations that delay access to content, layout shifts, and unnecessary React re-renders.

## 10. Responsive behaviour
- **Desktop:** all four albums in a balanced arrangement with enough space to be recognisable. Open album and info panel balanced and fitting the viewport.
- **Tablet:** adjust count and spacing, keep 3D where performance allows, keep controls accessible.
- **Mobile:** swipeable album selector or clean stacked layout. Mobile-friendly viewer, touch page turning, large tap targets, no horizontal overflow, no hover dependency, readable information. Lay out the viewer deliberately for mobile rather than shrinking the desktop one.

## 11. Implementation
Create reusable components, adapting names to the project structure:
- `AlbumShowroom`
- `Album3DProduct`
- `AlbumExperience` (the viewer)
- `AlbumPageTurner`
- `AlbumInformation`

Put all album data, pages and specs in `src/data/albums.js`.

**Performance**
- Lazy-load images that are not initially visible and use responsive sizes.
- Do not load every high-resolution image before an album is opened.
- Clean up GSAP timelines, listeners and ScrollTriggers on unmount.
- Avoid React state updates during pointer movement (use refs and GSAP).
- Make sure the showroom does not slow the rest of the site.

**Accessibility**
- Keyboard-operable albums and viewer, focus trap while the viewer is open, focus restored on close.
- Proper ARIA labels and `role="dialog"` for the viewer.
- Meaningful alt text from the data file.

## 12. Testing checklist
Implement and test the full working experience, not a static mockup. Verify:

- [ ] All four albums render, each with its own visual identity.
- [ ] Desktop hover is smooth, and touch devices never get stuck in a hover state.
- [ ] Each album opens independently and the cover-opening animation works.
- [ ] Page turns go in the correct direction, and Previous/Next work.
- [ ] Keyboard navigation and Escape work, and mobile swipe works.
- [ ] Closing restores the showroom and focus correctly.
- [ ] Specifications match the selected album.
- [ ] The enquiry button pre-fills the correct album in the form.
- [ ] The secondary "More collections" row (Layflat, Box and Bags) is present.
- [ ] Existing navigation and Phase 1 functionality still work.
- [ ] No broken images, and every placeholder is clearly labelled.
- [ ] No console errors and no horizontal overflow on mobile.
- [ ] Animations stay smooth, and reduced-motion is honoured.

## Final Output
1. Summary of what was built and the files changed.
2. List of the photographs needed for each album (cover, interior pages, texture close-ups) with suggested aspect ratios.
3. List of specifications still marked `TO CONFIRM` for the client.
4. Notes on performance and any known limitations.

## Final Creative Direction
The finished section should feel like a premium handcrafted album manufacturer's digital showroom. The album is the centre of attention: visitors see its cover, appreciate its construction, open it, explore its photographs and understand the differences between the formats. Prioritise realism, craftsmanship and smooth interaction over visual effects.

**The result must be a fully functional interactive 3D album experience, not just a redesigned set of product cards.**
