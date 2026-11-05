import React from 'react';
import FormatAlbum from './FormatAlbum';

/**
 * FormatIndicator Component.
 * - Represents the row of 4 mini albums along the bottom edge as seen in the reference video.
 * - Serves as both the initial lineup in the intro state and the persistent interactive 4-step indicator.
 * - Highlights active album with white/charcoal active ring and index.
 * - Clickable to smoothly jump to any album format.
 */
export default function FormatIndicator({
  formats,
  activeIndex,
  onSelectIndex,
  isIntro = false,
  textColor = '#111111',
  className = '',
}) {
  const isLightText = textColor === '#FFFFFF';

  return (
    <div
      className={`flex items-end justify-center gap-3 sm:gap-6 md:gap-8 select-none ${className}`}
      role="tablist"
      aria-label="Signature Format Families Selector"
    >
      {formats.map((format, idx) => {
        const isActive = !isIntro && idx === activeIndex;

        return (
          <button
            key={format.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-current={isActive ? 'true' : undefined}
            aria-label={`Select ${format.name} (${idx + 1} of 4)`}
            onClick={() => onSelectIndex(idx)}
            className={`group relative flex flex-col items-center focus:outline-none transition-all duration-300 ${
              isActive
                ? 'scale-105 opacity-100'
                : 'opacity-70 hover:opacity-100 scale-95'
            }`}
          >
            {/* Active Pill Outline */}
            <div
              className={`p-1.5 sm:p-2 rounded-[3px] transition-all duration-300 border ${
                isActive
                  ? isLightText
                    ? 'border-white bg-white/10 shadow-lg'
                    : 'border-charcoal bg-charcoal/5 shadow-md'
                  : 'border-transparent hover:border-charcoal/20'
              }`}
            >
              {/* Mini 3D Album Thumbnail */}
              <FormatAlbum format={format} isMini={true} />
            </div>

            {/* Label & Index below mini album */}
            <div className="mt-1.5 flex flex-col items-center text-center">
              <span
                className={`text-[9px] font-sans font-bold uppercase tracking-widest transition-colors ${
                  isActive
                    ? isLightText
                      ? 'text-white'
                      : 'text-charcoal'
                    : isLightText
                    ? 'text-white/60 group-hover:text-white'
                    : 'text-charcoal/60 group-hover:text-charcoal'
                }`}
              >
                0{idx + 1}
              </span>
              <span
                className={`hidden md:inline text-[10px] font-serif tracking-wide truncate max-w-[90px] transition-colors ${
                  isActive
                    ? isLightText
                      ? 'text-white font-medium'
                      : 'text-charcoal font-medium'
                    : isLightText
                    ? 'text-white/50'
                    : 'text-charcoal/50'
                }`}
              >
                {format.name}
              </span>
            </div>

            {/* Subtle Active Indicator Dot */}
            {isActive && (
              <span
                className={`w-1 h-1 rounded-full mt-1 ${
                  isLightText ? 'bg-white' : 'bg-charcoal'
                }`}
                aria-hidden="true"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

