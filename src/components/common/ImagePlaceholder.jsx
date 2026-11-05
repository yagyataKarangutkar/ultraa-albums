import React, { useState } from 'react';
import { Camera } from 'lucide-react';

/**
 * ImagePlaceholder / Luxury Photo Container.
 * - If `src` is provided, renders authentic high-res photography with lazy loading and smooth hover state.
 * - If `src` fails to load or is not provided, renders the architectural fallback placeholder.
 * - Respects aspect ratios, tone palettes, and WCAG AA accessibility with descriptive alt text.
 */
export default function ImagePlaceholder({
  src,
  alt = "Ultra Albums product photography",
  subject = "Open album spread",
  aspect = "4/3", // '4/3' | '16/9' | '1/1' | '3/2' | '2/3' | 'auto'
  tone = "oak", // 'oak' | 'misty' | 'blush' | 'grey'
  height = "",
  className = "",
  imageClassName = "",
  showBadge = true,
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClasses = {
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-[16/9]',
    '1/1': 'aspect-square',
    '3/2': 'aspect-[3/2]',
    '2/3': 'aspect-[2/3]',
    'auto': '',
  };

  const toneClasses = {
    oak: 'bg-[#DED8C6]/60 text-charcoal border-[#DED8C6]',
    misty: 'bg-[#DEEAF9]/50 text-charcoal border-[#DEEAF9]',
    blush: 'bg-[#F1F2F4] text-charcoal border-[#E3E6EF]',
    grey: 'bg-[#F3F1E8] text-charcoal border-[#E3E6EF]',
  };

  // If a valid image URL is provided and has not errored, render real photography
  if (src && !hasError) {
    return (
      <div
        className={`relative w-full overflow-hidden border border-charcoal/10 bg-oak-wood/20 ${
          aspectClasses[aspect] || 'aspect-[4/3]'
        } ${height} ${className}`}
      >
        <img
          src={src}
          alt={alt || subject}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'
          } ${imageClassName}`}
        />

        {/* Ambient subtle inner luxury border */}
        <div
          className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5"
          aria-hidden="true"
        />

        {/* Subtle corner registration tick marks */}
        <span className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/40 pointer-events-none" />
        <span className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-white/40 pointer-events-none" />
        <span className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-white/40 pointer-events-none" />
        <span className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-white/40 pointer-events-none" />
      </div>
    );
  }

  // Fallback architectural placeholder
  return (
    <div
      className={`relative w-full flex flex-col items-center justify-center p-6 border text-center overflow-hidden select-none transition-colors duration-300 ${
        aspectClasses[aspect] || 'aspect-[4/3]'
      } ${toneClasses[tone] || toneClasses.oak} ${height} ${className}`}
      role="img"
      aria-label={`Photo placeholder: ${subject}`}
    >
      {/* Subtle architectural grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #111111 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-xs sm:max-w-sm">
        <div className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center mb-3 bg-white/40">
          <Camera className="w-4 h-4 text-charcoal/70" strokeWidth={1.5} />
        </div>

        <span className="font-serif italic text-base sm:text-lg text-charcoal/90 leading-snug px-2">
          &ldquo;{subject}&rdquo;
        </span>

        {showBadge && (
          <span className="mt-3 inline-block font-sans text-[10px] uppercase tracking-widest-luxury text-charcoal/50 bg-white/60 px-2.5 py-1 border border-charcoal/10">
            Real product photo to be supplied
          </span>
        )}
      </div>

      {/* Frame registration tick marks in corners */}
      <span className="absolute top-2 left-2 w-2 h-2 border-t border-l border-charcoal/25" />
      <span className="absolute top-2 right-2 w-2 h-2 border-t border-r border-charcoal/25" />
      <span className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-charcoal/25" />
      <span className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-charcoal/25" />
    </div>
  );
}
