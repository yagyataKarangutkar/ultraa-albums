import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

/**
 * High-fidelity photographic spread renderer for 3D albums.
 * - Pristine, uncluttered presentation: true luxury albums let the photography shine.
 * - Supports seamless panoramic split across two pages (panoramicHalf='left' | 'right' | 'full').
 * - Graceful fallback to architectural tone preview if image is loading or unavailable.
 * - Zero intrusive badges or dark overlays stamped across the photographs.
 */
export default function SpreadPhoto({
  photoUrl,
  subject = "Fine art wedding photograph",
  altText = "Ultra Albums archival photographic print",
  tone = "coastal-golden",
  title = "",
  caption = "",
  editorialQuote = "",
  isPanoramic = false,
  panoramicHalf = "full", // 'left' | 'right' | 'full'
  className = "",
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const toneGradients = {
    'coastal-golden': {
      bg: 'from-[#2A3742] via-[#5C534B] to-[#B88E5A]',
      ambient: 'rgba(230, 175, 115, 0.25)',
    },
    'dramatic-cathedral': {
      bg: 'from-[#19191D] via-[#352F39] to-[#6E5948]',
      ambient: 'rgba(215, 175, 120, 0.2)',
    },
    'golden-hour': {
      bg: 'from-[#2C241E] via-[#5C422E] to-[#B07B43]',
      ambient: 'rgba(255, 180, 100, 0.3)',
    },
    'champagne-sparkler': {
      bg: 'from-[#1A1815] via-[#383129] to-[#6E5D46]',
      ambient: 'rgba(245, 220, 160, 0.35)',
    },
    'sepia-noir': {
      bg: 'from-[#1F1C18] via-[#383229] to-[#6B5D4D]',
      ambient: 'rgba(180, 150, 110, 0.15)',
    },
    'warm-film': {
      bg: 'from-[#2A2320] via-[#4D3B30] to-[#8C6D56]',
      ambient: 'rgba(220, 170, 130, 0.25)',
    },
    'classic-bw': {
      bg: 'from-[#111111] via-[#2A2A2A] to-[#4A4A4A]',
      ambient: 'rgba(255, 255, 255, 0.1)',
    },
    'parchment': {
      bg: 'from-[#D9D0C5] via-[#C8BEB2] to-[#B5A99B]',
      ambient: 'rgba(120, 95, 65, 0.15)',
    },
    'editorial-clean': {
      bg: 'from-[#2E3338] via-[#4F565C] to-[#8A959E]',
      ambient: 'rgba(255, 255, 255, 0.2)',
    },
    'soft-contrast': {
      bg: 'from-[#202224] via-[#3D4145] to-[#737A82]',
      ambient: 'rgba(200, 215, 225, 0.2)',
    },
    'mediterranean-light': {
      bg: 'from-[#26323D] via-[#485966] to-[#A3B3C2]',
      ambient: 'rgba(195, 215, 230, 0.3)',
    },
    'warm-bistro': {
      bg: 'from-[#201815] via-[#402B20] to-[#825435]',
      ambient: 'rgba(255, 170, 100, 0.3)',
    },
    'regal-gold': {
      bg: 'from-[#1C1412] via-[#3D201A] to-[#7D532C]',
      ambient: 'rgba(240, 195, 90, 0.35)',
    },
    'timeless-sepia': {
      bg: 'from-[#1C1714] via-[#382B22] to-[#705B47]',
      ambient: 'rgba(210, 175, 130, 0.25)',
    },
  };

  const selectedTone = toneGradients[tone] || toneGradients['coastal-golden'];

  // Handle panoramic seamless split
  const getObjectPosition = () => {
    if (!isPanoramic) return 'center center';
    if (panoramicHalf === 'left') return 'left center';
    if (panoramicHalf === 'right') return 'right center';
    return 'center center';
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden flex flex-col justify-between bg-charcoal select-none ${className}`}
      role="img"
      aria-label={altText || subject || title}
    >
      {/* 1. Authentic High-Res Photography */}
      {photoUrl && !hasError ? (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            ref={(node) => {
              if (node && node.complete && node.naturalWidth > 0 && !isLoaded) {
                setIsLoaded(true);
              }
            }}
            src={photoUrl}
            alt={altText || title || subject}
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ease-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              objectPosition: getObjectPosition(),
              // For panoramic seamless split across the book gutter:
              width: isPanoramic ? (panoramicHalf === 'full' ? '100%' : '200%') : '100%',
              maxWidth: isPanoramic && panoramicHalf !== 'full' ? '200%' : '100%',
              transform:
                isPanoramic && panoramicHalf === 'right' ? 'translateX(-50%)' : 'none',
            }}
          />

          {/* Very delicate paper gloss sheen for tactile realism (zero dark overlay) */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-15 bg-gradient-to-tr from-black/20 via-transparent to-white/30"
            aria-hidden="true"
          />
        </div>
      ) : (
        /* Fallback Tone Gradient with Subtle Monogram */
        <div className={`absolute inset-0 bg-gradient-to-br ${selectedTone.bg} flex flex-col items-center justify-center p-4 text-center`}>
          <div
            className="absolute inset-0 pointer-events-none mix-blend-screen opacity-40"
            style={{
              background: `radial-gradient(ellipse at 40% 30%, ${selectedTone.ambient} 0%, transparent 75%)`,
            }}
          />
          <div className="relative z-10 flex flex-col items-center max-w-[220px]">
            <div className="w-8 h-8 rounded-full border border-white/20 bg-white/10 backdrop-blur-xs flex items-center justify-center mb-2 text-white/80">
              <ImageIcon className="w-4 h-4" />
            </div>
            {title && (
              <h4 className="font-serif text-xs sm:text-sm text-white/90 font-normal leading-snug">
                {title}
              </h4>
            )}
            <span className="font-sans text-[8px] uppercase tracking-widest-luxury text-white/60 mt-1">
              Archival Proof
            </span>
          </div>
        </div>
      )}

      {/* Subtle corner registration ticks for archival feel */}
      <span className="absolute top-1 left-1 w-1 h-1 border-t border-l border-white/20 pointer-events-none" />
      <span className="absolute top-1 right-1 w-1 h-1 border-t border-r border-white/20 pointer-events-none" />
      <span className="absolute bottom-1 left-1 w-1 h-1 border-b border-l border-white/20 pointer-events-none" />
      <span className="absolute bottom-1 right-1 w-1 h-1 border-b border-r border-white/20 pointer-events-none" />
    </div>
  );
}
