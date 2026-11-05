import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Hand-drawn wavy underline beneath the emphasised word.
 * Animates into view on initial mount using Framer Motion pathLength.
 * Uses currentColor / Charcoal (#111111) for deep black contrast.
 * Falls back to an immediate static stroke when prefers-reduced-motion is enabled.
 */
export default function WavyUnderline({ className = '', delay = 0.55, stroke = 'currentColor' }) {
  const shouldReduceMotion = useReducedMotion();

  // Organic, calligraphic wavy curve
  const pathD =
    "M 4 11 C 28 3, 52 18, 80 10 C 108 2, 136 17, 168 9 C 198 2, 226 15, 256 8 C 274 3, 290 10, 304 8";

  return (
    <svg
      viewBox="0 0 310 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full overflow-visible pointer-events-none ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d={pathD}
        stroke={stroke}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: shouldReduceMotion ? 1 : 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.8,
          delay: shouldReduceMotion ? 0 : delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </svg>
  );
}
