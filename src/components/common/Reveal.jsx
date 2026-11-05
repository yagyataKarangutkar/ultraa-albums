import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MOTION } from '../../lib/motion';

/**
 * Universal Reveal Component (React Bits Enhanced).
 * - Full directional support: 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur' | 'none'
 * - Smooth luxury ease: [0.16, 1, 0.3, 1]
 * - Fires once on scroll entrance with graceful margin trigger.
 * - Full prefers-reduced-motion fallback.
 */
export default function Reveal({
  children,
  delay = 0,
  duration = 0.55,
  direction = 'up',
  distance = 32,
  className = '',
  as = 'div',
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  let initialVariants = { opacity: 0 };
  let animateVariants = { opacity: 1 };

  switch (direction) {
    case 'left':
      initialVariants = { opacity: 0, x: -distance };
      animateVariants = { opacity: 1, x: 0 };
      break;
    case 'right':
      initialVariants = { opacity: 0, x: distance };
      animateVariants = { opacity: 1, x: 0 };
      break;
    case 'down':
      initialVariants = { opacity: 0, y: -distance };
      animateVariants = { opacity: 1, y: 0 };
      break;
    case 'scale':
      initialVariants = { opacity: 0, scale: 0.94, y: distance * 0.4 };
      animateVariants = { opacity: 1, scale: 1, y: 0 };
      break;
    case 'blur':
      initialVariants = { opacity: 0, filter: 'blur(10px)', y: distance * 0.5 };
      animateVariants = { opacity: 1, filter: 'blur(0px)', y: 0 };
      break;
    case 'up':
      initialVariants = { opacity: 0, y: distance };
      animateVariants = { opacity: 1, y: 0 };
      break;
    case 'none':
    default:
      initialVariants = { opacity: 0 };
      animateVariants = { opacity: 1 };
      break;
  }

  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      initial={initialVariants}
      whileInView={animateVariants}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
