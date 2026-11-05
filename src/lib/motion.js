/**
 * Ultra Albums — Unified Motion Design System
 * Single source of truth for motion tokens, easings, and animation configurations.
 * Adheres strictly to the minimal luxury brief:
 * "Less clutter. More craftsmanship. Better storytelling."
 */

export const MOTION = {
  // Durations (in seconds)
  duration: {
    fast: 0.2, // Hovers, dropdowns, mobile drawer, button states
    base: 0.45, // Standard section reveals, card entrances
    slow: 0.8, // Major scene transitions, 3D showroom modals
  },

  // Easing Curves (Cubic Bezier format)
  ease: {
    // Premium ease-out for entrances: smooth deceleration, zero bounce, zero spring overshoot
    out: [0.22, 1, 0.36, 1],
    // Symmetric ease-in-out for two-way scrubbed transitions
    inOut: [0.65, 0, 0.35, 1],
    // Quick, clean ease for photography cross-fades
    snappy: [0.25, 0.1, 0.25, 1],
  },

  // Distances (in pixels)
  distance: {
    reveal: 16, // Max vertical entrance travel (restrained, no giant slides)
    revealSmall: 10,
  },

  // Stagger Timing
  stagger: {
    base: 0.07, // Stagger interval between sibling cards
    maxItems: 6, // Maximum items to stagger (avoids late popping on large grids)
  },

  // Scale Tokens
  scale: {
    hover: 1.025, // Subtle luxury hover scale (restrained, 1.02 to 1.03)
    tap: 0.985, // Subtle tactile press
  },
};

/**
 * Shared Framer Motion Variants for Section Reveals
 */
export const revealVariants = {
  hidden: { opacity: 0, y: MOTION.distance.reveal },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION.duration.base,
      ease: MOTION.ease.out,
    },
  },
};

/**
 * Lightweight Route Transition Variants
 */
export const pageFadeVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.22,
      ease: MOTION.ease.out,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
      ease: MOTION.ease.inOut,
    },
  },
};

/**
 * Dropdown Menu Animation Variants
 */
export const dropdownVariants = {
  closed: {
    opacity: 0,
    y: -6,
    transition: {
      duration: MOTION.duration.fast,
      ease: MOTION.ease.inOut,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION.duration.fast,
      ease: MOTION.ease.out,
    },
  },
};

/**
 * Mobile Drawer Animation Variants
 */
export const drawerBackdropVariants = {
  closed: {
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  open: {
    opacity: 1,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
};

export const drawerPanelVariants = {
  closed: {
    x: '100%',
    transition: { duration: 0.25, ease: MOTION.ease.inOut },
  },
  open: {
    x: '0%',
    transition: { duration: 0.28, ease: MOTION.ease.out },
  },
};

