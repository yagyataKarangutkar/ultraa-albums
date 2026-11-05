/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Minimal Luxury Editorial Palette (Warm Off-White, Charcoal, Muted Stone)
        'ivory': '#FAF9F6',
        'soft-grey': '#F5F3EE',
        'lavender-frame': '#F5F3EE',
        'sky-wash': '#F5F3EE',
        'cream-stone': '#FAF9F6',
        'porcelain-blue': '#77736E',
        'periwinkle': '#77736E',
        'ink-blue': '#111111',
        'charcoal': '#111111',
        'muted': '#77736E',

        // Theme Token Mappings — Neutral Luxury System
        'light-grey': '#FAF9F6', // Serene Warm Ivory
        'pale-blush': '#F5F3EE', // Soft Editorial Warm Stone
        'oak-wood': '#E5E1DA',   // Architectural Hairline Divider
        'misty-blue': '#F5F3EE', // Neutral Canvas
        'nordic-blue': {
          DEFAULT: '#111111',    // Charcoal Default
          dark: '#111111',       // Charcoal Deep
          light: '#77736E',      // Muted Warm Grey
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        'widest-luxury': '0.22em',
        'wider-luxury': '0.15em',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
}

