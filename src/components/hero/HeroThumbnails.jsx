import React, { useRef } from 'react';

/**
 * HeroThumbnails Component (v3).
 * - 5 landscape preview tiles on bottom-right (desktop) or centered (mobile).
 * - Real <button> elements with 44px+ tap targets.
 * - Deep Charcoal / Black accents (ring-2 ring-charcoal) and dark progress bar.
 * - Always-on auto-advance progress indicator.
 * - Full keyboard navigation (ArrowLeft / ArrowRight / Home / End).
 */
export default function HeroThumbnails({
  scenes,
  activeIndex,
  onSelect,
  progress = 0, // 0 to 1
  activeCaption = '',
  className = '',
}) {
  const containerRef = useRef(null);

  const handleKeyDown = (e, currentIdx) => {
    let nextIdx = currentIdx;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextIdx = (currentIdx + 1) % scenes.length;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIdx = (currentIdx - 1 + scenes.length) % scenes.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIdx = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIdx = scenes.length - 1;
    } else {
      return;
    }

    onSelect(nextIdx);
    const targetBtn = document.getElementById(`hero-thumb-${nextIdx}`);
    if (targetBtn) {
      targetBtn.focus();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col items-start lg:items-end gap-2.5 select-none ${className}`}
      aria-label="Hero Scene Gallery Controls"
    >
      {/* Active Scene Caption (Dark Charcoal Luxury Typography) */}
      {activeCaption && (
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-sans text-charcoal font-semibold uppercase tracking-widest-luxury">
          <span className="w-1.5 h-1.5 rounded-full bg-charcoal" />
          <span>{activeCaption}</span>
        </div>
      )}

      {/* 5 Thumbnail Buttons */}
      <div
        className="flex items-center gap-1.5 sm:gap-2.5"
        role="tablist"
        aria-label="Hero Scenes"
      >
        {scenes.map((scene, idx) => {
          const isActive = idx === activeIndex;

          return (
            <div
              key={scene.id}
              className="p-1 -m-1 flex items-center justify-center min-w-[44px] min-h-[44px]"
            >
              <button
                id={`hero-thumb-${idx}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-current={isActive ? 'true' : undefined}
                aria-label={`Slide 0${idx + 1}: ${scene.title}`}
                onClick={() => onSelect(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`relative group overflow-hidden w-12 h-9 sm:w-18 sm:h-13 md:w-22 md:h-15 lg:w-24 lg:h-16 rounded-[2px] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal ${
                  isActive
                    ? 'ring-2 ring-charcoal shadow-md opacity-100 scale-[1.02]'
                    : 'opacity-65 hover:opacity-90 ring-1 ring-charcoal/20'
                }`}
              >
                {/* Thumbnail Image */}
                <img
                  src={scene.thumbSrc}
                  alt={scene.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle wash */}
                <div
                  className={`absolute inset-0 transition-opacity ${
                    isActive ? 'bg-black/5' : 'bg-black/15 group-hover:bg-black/5'
                  }`}
                />

                {/* Always-on Active Progress Bar */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-charcoal/20">
                    <div
                      className="h-full bg-charcoal transition-all duration-75 ease-linear"
                      style={{
                        width: `${Math.min(100, Math.max(0, progress * 100))}%`,
                      }}
                    />
                  </div>
                )}

                {/* Scene Index Tag in Deep Charcoal */}
                <span className="absolute top-1 left-1 sm:left-1.5 text-[8px] sm:text-[9px] font-sans font-bold text-charcoal bg-white/85 px-1 py-0.2 rounded-[1px] shadow-xs">
                  0{idx + 1}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
