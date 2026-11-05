import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Single Swappable Brand Logo Component.
 * - Uses the original brand logo reference from ultraaalbums.com
 * - Single source of truth for the brand mark across navbar, drawer, and footer.
 * - Supports theme="light" (white typography over hero) and theme="dark" (charcoal typography).
 * - Graceful fallback to typographic lockup if image is loading or offline.
 * - Readily swappable when official vector SVG logo guidelines are finalized.
 */
export default function Logo({ className = '', showWordmark = true, theme = 'dark' }) {
  const [imageError, setImageError] = useState(false);
  const isLight = theme === 'light';

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-nordic-blue select-none ${className}`}
      aria-label="Ultra Albums Home"
    >
      {!imageError ? (
        <img
          src="https://ultraaalbums.com/wp-content/uploads/2021/10/cropped-ultra-logo.png"
          alt="Ultra Albums"
          className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
          onError={() => setImageError(true)}
          loading="eager"
        />
      ) : (
        /* Typographic Fallback */
        <div className="flex flex-col">
          <span
            className={`font-serif text-2xl sm:text-3xl tracking-[0.08em] font-medium leading-none ${
              isLight ? 'text-white' : 'text-charcoal'
            }`}
          >
            ULTRA ALBUMS
          </span>
          <span
            className={`text-[9px] font-sans tracking-[0.28em] uppercase mt-1 ${
              isLight ? 'text-white/70' : 'text-charcoal/60'
            }`}
          >
            Mumbai Bindery • Pro Lab
          </span>
        </div>
      )}

      {showWordmark && !imageError && (
        <div className={`hidden xl:flex flex-col border-l pl-3 ${
          isLight ? 'border-white/25 text-white' : 'border-charcoal/15 text-charcoal'
        }`}>
          <span className={`font-serif text-lg font-medium leading-none tracking-wider ${
            isLight ? 'text-white' : 'text-charcoal'
          }`}>
            ULTRA ALBUMS
          </span>
          <span className={`text-[9px] font-sans tracking-[0.24em] uppercase mt-1 ${
            isLight ? 'text-white/70' : 'text-charcoal/60'
          }`}>
            Bespoke Pro Bindery
          </span>
        </div>
      )}
    </Link>
  );
}
