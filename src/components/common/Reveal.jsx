import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MOTION } from '../../lib/motion';

/**
 * Universal Reveal Component.
 * - Single source of truth for element entrance reveals across the application.
 * - Enforces `once: true` so animations fire only ONCE and never re-trigger on every scroll pass.
 * - Subtle vertical travel (16px max) with smooth deceleration curve [0.22, 1, 0.36, 1].
 * - Full prefers-reduced-motion support (renders instantly without movement).
 * - Safe fallback: if observer fails, content renders visible.
 */
export default function Reveal({
  children,
  delay = 0,
  duration = MOTION.duration.base,
  direction = 'up', // 'up' | 'none'
  className = '',
  as = 'div',
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  // If user prefers reduced motion, render immediately with zero animation
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const initialY = direction === 'up' ? MOTION.distance.reveal : 0;
  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      initial={{ opacity: 0, y: initialY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: MOTION.ease.out,
      }}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

