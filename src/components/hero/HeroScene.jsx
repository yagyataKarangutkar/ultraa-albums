import React, { useState } from 'react';
import ImagePlaceholder from '../common/ImagePlaceholder';

/**
 * HeroScene Component (v3).
 * - Full-viewport 100svh photograph with object-fit: cover.
 * - Soft light wash & left gradient overlay ensuring deep Black (#111111) text is 100% visible and crisp (WCAG AAA).
 * - Supports responsive srcset, high priority on Scene 0 (LCP), and graceful fallback to ImagePlaceholder.
 */
export default function HeroScene({ scene, isLcp = false }) {
  const [hasError, setHasError] = useState(false);

  // Build responsive srcset string
  const srcSetString = scene.srcSet
    ? `${scene.srcSet.small} 800w, ${scene.srcSet.medium} 1400w, ${scene.srcSet.large} 2400w`
    : undefined;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none">
      {!hasError ? (
        <img
          src={scene.src}
          srcSet={srcSetString}
          sizes="100vw"
          alt={scene.alt}
          fetchpriority={isLcp ? 'high' : 'auto'}
          loading={isLcp ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover"
          style={{ objectPosition: scene.focalPoint || 'center center' }}
        />
      ) : (
        /* Graceful Fallback if offline/network fails */
        <div className="w-full h-full flex items-center justify-center bg-oak-wood/30">
          <ImagePlaceholder
            subject={scene.subject}
            aspect="16/9"
            tone="oak"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Light wash & editorial gradient for WCAG AAA deep black text legibility */}
      <div
        className="absolute inset-0 bg-white/20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-light-grey/90 via-white/55 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/40 to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
