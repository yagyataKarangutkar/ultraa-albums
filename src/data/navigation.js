/**
 * Complete Navigation Configuration
 * Contains every single link from https://ultraaalbums.com/
 * Organized cleanly into top bar, main nav dropdowns, UK services, and footer.
 */

export const topBarLinks = {
  phone: "+91 93222 54315",
  phoneTel: "tel:+919322254315",
  messengerUrl: "https://m.me/UltraaAlbums",
  payOnlineUrl: "https://www.paypal.com/in/signin",
  cataloguePdfUrl: "https://ultraaalbums.com/wp-content/uploads/2021/11/Ultraa-product-Catelogue.pdf",
};

export const mainNavConfig = [
  {
    name: "Home",
    path: "/",
    type: "link",
  },
  {
    name: "About Us",
    path: "/about-us",
    type: "link",
  },
  {
    name: "Our Products",
    path: "/products",
    type: "dropdown",
    overviewLabel: "All Products Overview",
    overviewPath: "/products",
    items: [
      {
        name: "Luxury Albums",
        path: "/collections/luxury-albums",
        subtitle: "Bespoke Italian Leather Heirloom",
        placeholderSubject: "Luxury leather album with gold debossing",
        image: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Flush Mount Album",
        path: "/collections/flush-mount-album",
        subtitle: "1.5mm Rigid Lay-Flat Cores",
        placeholderSubject: "Open flush mount album with 180° seamless panoramic spread",
        image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Layflat",
        path: "/collections/layflat",
        subtitle: "Continuous Double-Page Spreads",
        placeholderSubject: "Layflat book open flat on oak surface",
        image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Photo Book",
        path: "/collections/photo-book",
        subtitle: "Contemporary Editorial Volume",
        placeholderSubject: "Lightweight photo book with linen cover",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Box and Bags",
        path: "/collections/box-and-bags",
        subtitle: "Heirloom Clamshells & Packaging",
        placeholderSubject: "Handcrafted presentation box with satin pull-ribbon",
        image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Slip-in Albums",
        path: "/collections/slip-in-albums",
        subtitle: "Beveled Mat Pocket Assembly",
        placeholderSubject: "Detail view of archival slip-in mat aperture",
        image: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=800&q=80",
      },
    ],
    footerAction: {
      label: "Download Full Product Catalogue (PDF)",
      url: "https://ultraaalbums.com/wp-content/uploads/2021/11/Ultraa-product-Catelogue.pdf",
    },
  },
  {
    name: "Services",
    path: "/services",
    type: "dropdown",
    overviewLabel: "All Services Overview",
    overviewPath: "/services",
    items: [
      {
        name: "Album Designing",
        path: "/services#album-designing",
        subtitle: "6-7 Themes, Soft Proofs, Unlimited Revisions",
        placeholderSubject: "Digital album spread layout curation on desktop monitor",
      },
      {
        name: "Image Editing",
        path: "/services#image-editing",
        subtitle: "Pro Skin Retouching, Tone Harmonization & Cleanup",
        placeholderSubject: "Side-by-side subtle frequency separation portrait comparison",
      },
      {
        name: "Wedding Photography",
        path: "/services#wedding-photography",
        subtitle: "Pro Shoot Collaborations [TO CONFIRM]",
        placeholderSubject: "Cinematic wedding portrait in natural light",
      },
    ],
  },
  {
    name: "UK",
    path: "/uk",
    type: "dropdown",
    overviewLabel: "UK Overview",
    overviewPath: "/uk",
    items: [
      {
        name: "Flush Mount Album for UK",
        path: "/uk/flush-mount-album",
        subtitle: "Direct Air Express to Great Britain",
        placeholderSubject: "Flush mount album packaging ready for London studio shipping",
      },
      {
        name: "Luxury Albums for UK",
        path: "/uk/luxury-albums",
        subtitle: "Handcrafted Fine Art Deliveries for UK Photographers",
        placeholderSubject: "Bespoke leather album with UK shipping slip",
      },
      {
        name: "Box and Bags for UK",
        path: "/uk/box-and-bags",
        subtitle: "Custom Presentation Boxes for UK Studios",
        placeholderSubject: "Walnut presentation box stamped with London crest",
      },
      {
        name: "Slip-in Albums for UK",
        path: "/uk/slip-in-albums",
        subtitle: "Traditional Folios for British Portrait Studios",
        placeholderSubject: "Slip-in portfolio book with traditional British mat sizes",
      },
      {
        name: "Image Editing for UK",
        path: "/uk/image-editing",
        subtitle: "Overnight Post-Production for UK Timezones",
        placeholderSubject: "Digital retouching workflow for European wedding clients",
      },
      {
        name: "Photo Book for UK",
        path: "/uk/photo-book",
        subtitle: "Lightweight High-Volume Orders for UK Clients",
        placeholderSubject: "Editorial photo books stack for UK event studios",
      },
      {
        name: "Photography for UK",
        path: "/uk/photography",
        subtitle: "UK Destination Photography Support [TO CONFIRM]",
        placeholderSubject: "Destination wedding couple in London countryside",
      },
    ],
  },
  {
    name: "Blogs",
    path: "/blogs",
    type: "link",
  },
  {
    name: "Contact Us",
    path: "/contact-us",
    type: "link",
  },
];
