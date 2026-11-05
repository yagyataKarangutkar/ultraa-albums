import React from 'react';
import FormatAlbum from './FormatAlbum';
import FormatInfoCard from './FormatInfoCard';
import FormatIndicator from './FormatIndicator';

// SVG Bezier Curve path definitions for smooth mathematical morphing
export const PATH_FLAT_BOTTOM = 'M 0 120 Q 720 120 1440 120 L 1440 120 L 0 120 Z';
export const PATH_ARCHED_TOP = 'M 0 120 Q 720 0 1440 120 L 1440 120 L 0 120 Z';
export const PATH_FLAT_TOP = 'M 0 0 Q 720 0 1440 0 L 1440 120 L 0 120 Z';

/**
 * FormatStage Component (v4).
 * - Implements 21oaks signature curved page transition: each format family is a self-contained
 *   panel with an arched leading SVG curve that sweeps up smoothly over the previous panel.
 * - Previous panel remains 100% visible underneath the curve until covered.
 * - Giant editorial words glide in at z-10 directly behind the physical 3D album at z-20.
 * - The album rises and scales up in front of the words, which stay serenely positioned as an editorial watermark.
 * - Fixed top header bar and bottom 4-step indicator at z-50 with responsive contrast.
 * - Spacious, uncluttered, minimal luxury aesthetic.
 */
export default function FormatStage({
  formats,
  stageRef,
  panelsRef,
  curvedPathsRef,
  wordmarksRef,
  albumsRef,
  rightColumnsRef,
  activeFormatIndex,
  onSelectIndex,
  onEnquire,
}) {
  const activeFormat = formats[activeFormatIndex] || formats[0];
  const isLightText = activeFormat.textColor === '#FFFFFF';

  return (
    <div
      ref={stageRef}
      className="relative w-full h-[100svh] min-h-[640px] max-h-[1440px] overflow-hidden select-none bg-light-grey"
      aria-label="Signature Format Families Interactive Showcase"
    >
      {/* =========================================================================
          1. THE 4 FORMAT PANELS (Stacked in physical z-order: 10, 20, 30, 40)
         ========================================================================= */}
      {formats.map((format, idx) => {
        const isPanelLight = format.textColor === '#FFFFFF';
        const isIntroPanel = idx === 0;

        return (
          <div
            key={format.id}
            ref={(el) => (panelsRef.current[idx] = el)}
            className="absolute inset-0 w-full h-full flex flex-col justify-between p-4 sm:p-6 lg:p-10 select-none overflow-hidden"
            style={{
              backgroundColor: format.bgColor,
              color: format.textColor,
              zIndex: (idx + 1) * 10,
              transform: isIntroPanel ? 'translateY(0%)' : 'translateY(105%)',
              willChange: 'transform',
            }}
          >
            {/* Dynamic Leading SVG Curve on top (for panels 1, 2, 3) */}
            {!isIntroPanel && (
              <div
                className="absolute left-0 right-0 -top-20 sm:-top-28 md:-top-32 h-20 sm:h-28 md:h-32 w-full overflow-visible pointer-events-none"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 1440 120"
                  className="w-full h-full overflow-visible"
                  preserveAspectRatio="none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    ref={(el) => (curvedPathsRef.current[idx] = el)}
                    d={PATH_FLAT_BOTTOM}
                    fill={format.bgColor}
                  />
                </svg>
              </div>
            )}

            {/* Spacer for Top Fixed Header */}
            <div className="w-full h-10 sm:h-12 flex-shrink-0" />

            {/* MAIN CONTENT ARENA: Left (Album + Wordmark) & Right (Text + Info Card) */}
            <div className="relative z-20 w-full max-w-7xl mx-auto flex-1 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-10 my-auto py-2">
              
              {/* LEFT COLUMN: Hero Physical 3D Album Stage with Words Behind */}
              <div className="relative w-full lg:w-1/2 flex items-center justify-center h-[260px] xs:h-[300px] sm:h-[390px] md:h-[450px] lg:h-[500px]">
                
                {/* Layer A: Giant Ghosted Words BEHIND Album (z-10, strictly bounded to prevent horizontal scrollbar) */}
                <div
                  ref={(el) => (wordmarksRef.current[idx] = el)}
                  className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none text-center overflow-hidden max-w-full"
                  style={{
                    opacity: isIntroPanel ? 1 : 0,
                    transform: isIntroPanel ? 'translateY(0px)' : 'translateY(60px)',
                  }}
                >
                  <span
                    className="font-serif italic text-[22vw] sm:text-[18vw] lg:text-[14vw] font-light leading-none tracking-tight whitespace-nowrap select-none drop-shadow-xs"
                    style={{
                      color: format.textColor,
                      opacity: isPanelLight ? 0.12 : 0.16,
                      textShadow: '0 20px 40px rgba(0,0,0,0.04)',
                    }}
                  >
                    {format.watermarkText || 'Albums'}
                  </span>
                </div>

                {/* Layer B: Hero Physical 3D Album IN FRONT OF Words (z-20, interactive pointer events enabled) */}
                <div
                  ref={(el) => (albumsRef.current[idx] = el)}
                  className="relative z-20 flex items-center justify-center pointer-events-auto"
                  style={{
                    opacity: isIntroPanel ? 1 : 0,
                    transform: isIntroPanel
                      ? 'translateY(0px) scale(1)'
                      : 'translateY(120px) scale(0.85)',
                  }}
                >
                  <FormatAlbum format={format} isMini={false} />
                </div>
              </div>

              {/* RIGHT COLUMN: Editorial Headline & Light Info Card (z-30) */}
              <div
                ref={(el) => (rightColumnsRef.current[idx] = el)}
                className="relative z-30 w-full lg:w-1/2 flex flex-col items-start justify-center max-w-lg lg:pl-6 pointer-events-auto"
                style={{
                  opacity: isIntroPanel ? 1 : 0,
                  transform: isIntroPanel ? 'translateY(0px)' : 'translateY(40px)',
                }}
              >
                {/* Format Header Text */}
                <div className="mb-4 text-left">
                  <span className="font-serif italic text-sm sm:text-base opacity-80 block mb-1">
                    {format.subtitle}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-[1.08] mb-2.5">
                    {format.name}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm font-light leading-relaxed opacity-85 max-w-md line-clamp-3">
                    {format.description}
                  </p>
                </div>

                {/* Light Info Card */}
                <div className="w-full">
                  <FormatInfoCard format={format} onEnquire={onEnquire} />
                </div>
              </div>
            </div>

            {/* Spacer for Bottom Fixed Indicator */}
            <div className="w-full h-14 sm:h-16 flex-shrink-0" />
          </div>
        );
      })}

      {/* =========================================================================
          2. FIXED TOP HEADER BAR (Z-50: Section Label & Counter)
         ========================================================================= */}
      <div className="absolute top-4 sm:top-6 lg:top-8 left-4 sm:left-6 lg:left-10 right-4 sm:right-6 lg:right-10 z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-6 h-px transition-colors duration-400 ${
                isLightText ? 'bg-white/80' : 'bg-charcoal/80'
              }`}
              aria-hidden="true"
            />
            <span
              className={`font-sans text-[10px] sm:text-[11px] uppercase tracking-widest-luxury font-bold transition-colors duration-400 ${
                isLightText ? 'text-white' : 'text-charcoal'
              }`}
            >
              Signature Format Families
            </span>
          </div>

          <div
            className={`text-[11px] font-sans tracking-widest-luxury uppercase font-medium transition-colors duration-400 ${
              isLightText ? 'text-white/80' : 'text-charcoal/80'
            }`}
          >
            <span>0{activeFormatIndex + 1}</span>
            <span className="mx-1.5 opacity-50">/</span>
            <span>04</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. FIXED BOTTOM INDICATOR LINEUP (Z-50: Row of 4 Mini Albums)
         ========================================================================= */}
      <div className="absolute bottom-3 sm:bottom-5 lg:bottom-6 left-0 right-0 z-50 pointer-events-auto flex justify-center">
        <FormatIndicator
          formats={formats}
          activeIndex={activeFormatIndex}
          onSelectIndex={onSelectIndex}
          isIntro={false}
          textColor={activeFormat.textColor}
        />
      </div>
    </div>
  );
}
