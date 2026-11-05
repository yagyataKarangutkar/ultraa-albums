import React from 'react';
import Reveal from './Reveal';

/**
 * FadeIn (Backwards-compatible alias for Reveal).
 * Re-uses the unified motion system to ensure consistency across all legacy calls.
 */
export default function FadeIn(props) {
  return <Reveal {...props} />;
}
