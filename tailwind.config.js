/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // New Colour Theme Tokens
        'ivory': '#F3F1E8',
        'soft-grey': '#F1F2F4',
        'lavender-frame': '#E3E6EF',
        'sky-wash': '#DEEAF9',
        'cream-stone': '#DED8C6',
        'porcelain-blue': '#8096B8',
        'periwinkle': '#9DADD4',
        'ink-blue': '#4F6389',
        'charcoal': '#111111',
        'muted': '#666666',

        // Old -> New Mappings (preserving existing Tailwind class roles seamlessly)
        'light-grey': '#F3F1E8', // Light Grey -> Ivory #F3F1E8
        'pale-blush': '#F1F2F4', // Pale Blush -> Soft Grey #F1F2F4
        'oak-wood': '#DED8C6',   // Oak Wood -> Cream Stone #DED8C6
        'misty-blue': '#DEEAF9', // Misty Blue -> Sky Wash #DEEAF9
        'nordic-blue': {
          DEFAULT: '#4F6389',    // Nordic Blue -> Ink Blue #4F6389
          dark: '#4F6389',       // Ink Blue #4F6389 (WCAG AA 5.4:1 on Ivory, 6.1:1 on White)
          light: '#8096B8',      // Porcelain Blue #8096B8 (decorative accents)
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

