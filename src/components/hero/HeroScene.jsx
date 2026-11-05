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

      {/* Subtle localized left gradient strictly for typography contrast — preserves 100% original photo saturation & sharpness across the center & right */}
      <div
        className="absolute inset-y-0 left-0 w-full sm:w-2/3 lg:w-1/2 bg-gradient-to-r from-white/75 via-white/40 to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
