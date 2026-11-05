import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SpreadPhoto from './SpreadPhoto';

/**
 * Image preloader helper with HTMLImageElement.decode() fallback.
 * Prevents image flicker, flashing, or tearing during page turns.
 */
const preloadImage = (url) => {
  if (!url) return Promise.resolve();
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    if (img.decode) {
      img.decode().then(resolve).catch(resolve);
    } else {
      img.onload = resolve;
      img.onerror = resolve;
    }
  });
};

/**
 * Deterministic 3D Interactive Open Album with Realistic Page Turning.
 * - Deterministic 3-layer architecture:
 *   1. Stable Base Layer underneath (pre-rendering incoming page so lifting the leaf never flashes).
 *   2. Turning Leaf Layer above with dual-face 3D rotation around spine.
 *   3. Dynamic fold shading and smooth easing.
 * - Comprehensive image preloading on mount & album switch.
 * - Distinct, authentic category styling across all 4 tabs:
 *   • Slip-in Albums: Beveled archival mat apertures.
 *   • Flush Mount Albums: Rigid 1.5mm white core edge lines and seamless layflat.
 *   • Photo Book: Editorial typography on flexible fine-art paper.
 *   • Luxury Albums: Warm parchment, subtle gilded leaf edge block, and gold deboss frame.
 * - Restrained pointer tilt (2–3° max), touch swipe, and keyboard navigation.
 */
export default function AlbumPageTurner({ album, onClose }) {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const [turnState, setTurnState] = useState(null); // { direction: 'next' | 'prev', fromIndex, toIndex }

  const bookContainerRef = useRef(null);
  const turningLeafRef = useRef(null);
  const touchStartXRef = useRef(0);
  const tiltAnimationRef = useRef(null);

  const totalSpreads = album.spreads.length;

  // Detect reduced motion preference
  const isReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Preload all spread images for the active album to prevent flashing
  useEffect(() => {
    const urlsToPreload = [];
    album.spreads.forEach((spread) => {
      if (spread.isPanoramicFullBleed && spread.panoramicDetails?.photoUrl) {
        urlsToPreload.push(spread.panoramicDetails.photoUrl);
      }
      if (spread.left?.photoUrl) urlsToPreload.push(spread.left.photoUrl);
      if (spread.right?.photoUrl) urlsToPreload.push(spread.right.photoUrl);
    });

    Promise.all(urlsToPreload.map(preloadImage)).catch(() => {});
  }, [album]);

  // Entrance animation for book shell
  useEffect(() => {
    if (!bookContainerRef.current) return;

    if (isReducedMotion) {
      gsap.set(bookContainerRef.current, { opacity: 1, scale: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      bookContainerRef.current,
      {
        rotateX: 14,
        rotateY: 0,
        scale: 0.94,
        opacity: 0,
        y: 28,
      },
      {
        rotateX: 6,
        rotateY: 0,
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: 'power3.out',
      }
    );
  }, [album.id, isReducedMotion]);

  // Restrained pointer tilt (max 2.5 degrees on fine pointer)
  const handlePointerMove = (e) => {
    if (isReducedMotion || !bookContainerRef.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const rect = bookContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateY = (x / (rect.width / 2)) * 2.5;
    const rotateX = 6 - (y / (rect.height / 2)) * 2.5;

    if (tiltAnimationRef.current) tiltAnimationRef.current.kill();
    tiltAnimationRef.current = gsap.to(bookContainerRef.current, {
      rotateY,
      rotateX,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handlePointerLeave = () => {
    if (isReducedMotion || !bookContainerRef.current) return;

    if (tiltAnimationRef.current) tiltAnimationRef.current.kill();
    tiltAnimationRef.current = gsap.to(bookContainerRef.current, {
      rotateY: 0,
      rotateX: 6,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  // FORWARD Page Turn (Right-to-Left leaf rotation 0 -> -180deg)
  const turnNext = useCallback(() => {
    if (isTurning || currentSpread >= totalSpreads - 1) return;

    if (isReducedMotion) {
      setCurrentSpread((prev) => prev + 1);
      return;
    }

    const nextIndex = currentSpread + 1;
    setIsTurning(true);
    setTurnState({ direction: 'next', fromIndex: currentSpread, toIndex: nextIndex });

    const leaf = turningLeafRef.current;
    if (!leaf) {
      setCurrentSpread(nextIndex);
      setIsTurning(false);
      setTurnState(null);
      return;
    }

    // Prepare leaf on the right at 0deg
    gsap.set(leaf, {
      rotateY: 0,
      opacity: 1,
      zIndex: 40,
      transformOrigin: 'left center',
    });

    // Animate leaf flipping to -180deg (left side)
    gsap.to(leaf, {
      rotateY: -180,
      duration: 0.72,
      ease: 'power2.inOut',
      onComplete: () => {
        setCurrentSpread(nextIndex);
        setTurnState(null);
        gsap.set(leaf, { opacity: 0, zIndex: 1, rotateY: 0 });
        setIsTurning(false);
      },
    });

    // Safety timeout fallback
    setTimeout(() => {
      setIsTurning(false);
    }, 850);
  }, [currentSpread, totalSpreads, isTurning, isReducedMotion]);

  // BACKWARD Page Turn (Left-to-Right leaf rotation -180 -> 0deg)
  const turnPrev = useCallback(() => {
    if (isTurning || currentSpread <= 0) return;

    if (isReducedMotion) {
      setCurrentSpread((prev) => prev - 1);
      return;
    }

    const prevIndex = currentSpread - 1;
    setIsTurning(true);
    setTurnState({ direction: 'prev', fromIndex: currentSpread, toIndex: prevIndex });

    const leaf = turningLeafRef.current;
    if (!leaf) {
      setCurrentSpread(prevIndex);
      setIsTurning(false);
      setTurnState(null);
      return;
    }

    // Prepare leaf on the left at -180deg
    gsap.set(leaf, {
      rotateY: -180,
      opacity: 1,
      zIndex: 40,
      transformOrigin: 'left center',
    });

    // Flip leaf back to 0deg (right side)
    gsap.to(leaf, {
      rotateY: 0,
      duration: 0.72,
      ease: 'power2.inOut',
      onComplete: () => {
        setCurrentSpread(prevIndex);
        setTurnState(null);
        gsap.set(leaf, { opacity: 0, zIndex: 1 });
        setIsTurning(false);
      },
    });

    // Safety timeout fallback
    setTimeout(() => {
      setIsTurning(false);
    }, 850);
  }, [currentSpread, isTurning, isReducedMotion]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target && ['input', 'textarea', 'select'].includes(e.target.tagName.toLowerCase())) {
        return;
      }
      if (e.key === 'ArrowRight') {
        turnNext();
      } else if (e.key === 'ArrowLeft') {
        turnPrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [turnNext, turnPrev, onClose]);

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartXRef.current - touchEndX;

    if (deltaX > 45) {
      turnNext();
    } else if (deltaX < -45) {
      turnPrev();
    }
  };

  /**
   * Category-Specific Page Renderer.
   * Renders left or right page with authentic physical details for all 4 album families.
   */
  const renderPage = (spread, side) => {
    if (!spread) return null;

    const pageData = side === 'left' ? spread.left : spread.right;

    // 1. Panoramic Full Bleed (Flush Mount Albums)
    if (spread.isPanoramicFullBleed) {
      return (
        <div className="w-full h-full relative overflow-hidden bg-[#171717]">
          <SpreadPhoto
            isPanoramic
            panoramicHalf={side}
            photoUrl={spread.panoramicDetails?.photoUrl}
            title={spread.panoramicDetails?.title}
            subject={side === 'left' ? spread.panoramicDetails?.leftSubject : spread.panoramicDetails?.rightSubject}
            tone={spread.panoramicDetails?.photoTone}
            caption="Seamless Layflat Panoramic Core"
            altText={spread.panoramicDetails?.altText}
          />
          {/* Rigid page edge simulation for flush mount */}
          <div
            className={`absolute top-0 bottom-0 ${
              side === 'left' ? 'left-0 border-r' : 'right-0 border-l'
            } w-1 sm:w-1.5 bg-white/90 border-black/10 shadow-xs pointer-events-none`}
          />
        </div>
      );
    }

    // 2. Slip-in Albums: Beveled Archival Mat Aperture
    if (album.id === 'slip-in-albums') {
      return (
        <div className="w-full h-full p-3 sm:p-5 bg-[#F5F3EE] flex flex-col justify-between border-charcoal/5">
          <div className="text-center pb-1 border-b border-[#E5E1DA]">
            <span className="text-[8.5px] uppercase font-sans tracking-widest text-[#77736E] font-medium">
              Archival Mat Folio • 100% Cotton Rag
            </span>
          </div>

          {/* Beveled Slip-in Mat Window Frame */}
          <div className="my-auto mx-auto w-[86%] max-h-[74%] aspect-[3/4] p-2 sm:p-2.5 bg-white border-2 border-[#DED8C6] shadow-sm flex items-center justify-center relative">
            <div className="w-full h-full border border-black/10 shadow-inner overflow-hidden relative">
              <SpreadPhoto
                photoUrl={pageData?.photoUrl}
                title={pageData?.title}
                subject={pageData?.placeholderSubject}
                altText={pageData?.altText}
                tone={pageData?.photoTone}
                caption={pageData?.caption}
              />
            </div>
            {/* Corner registration ticks for precision bindery feel */}
            <span className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-[#77736E]/40" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-[#77736E]/40" />
            <span className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-[#77736E]/40" />
            <span className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-[#77736E]/40" />
          </div>

          <div className="pt-1 border-t border-[#E5E1DA] flex items-center justify-between text-[8.5px] text-[#77736E] font-sans uppercase">
            <span>Aperture 0{spread.spreadIndex * 2 + (side === 'left' ? 1 : 2)}</span>
            <span>Acid-Free Bevel</span>
          </div>
        </div>
      );
    }

    // 3. Photo Book: Lighter Flexible Fine-Art Paper & Modern Editorial Typography
    if (album.id === 'photo-book') {
      return (
        <div className="w-full h-full p-3.5 sm:p-5 lg:p-6 bg-white flex flex-col justify-between">
          <div>
            <span className="text-[8.5px] sm:text-[9.5px] uppercase font-sans tracking-widest text-[#77736E] font-medium block">
              Editorial Series • Vol. 0{spread.spreadIndex + 1}
            </span>
            <h3 className="font-serif text-xs sm:text-sm lg:text-base text-[#171717] mt-0.5 leading-snug">
              {pageData?.title}
            </h3>
          </div>

          <div className="my-auto mx-auto w-full max-h-[64%] aspect-[4/3] p-1 border border-[#E5E1DA] bg-[#F9F9F8]">
            <SpreadPhoto
              photoUrl={pageData?.photoUrl}
              title={pageData?.title}
              subject={pageData?.placeholderSubject}
              altText={pageData?.altText}
              tone={pageData?.photoTone}
              caption={pageData?.caption}
            />
          </div>

          <div className="pt-1.5 border-t border-[#E5E1DA] flex items-center justify-between text-[8px] sm:text-[9px] text-[#77736E] font-sans">
            <span>Flexible Fine-Art Paper • 300 gsm</span>
            <span>Page 0{spread.spreadIndex * 2 + (side === 'left' ? 1 : 2)}</span>
          </div>
        </div>
      );
    }

    // 4. Flush Mount Albums (non-panoramic standard spread)
    if (album.id === 'flush-mount-album') {
      return (
        <div className="w-full h-full p-2.5 sm:p-4 bg-white flex flex-col justify-between relative">
          {/* Rigid White Page Edge */}
          <div
            className={`absolute top-0 bottom-0 ${
              side === 'left' ? 'left-0 border-r' : 'right-0 border-l'
            } w-1 sm:w-1.5 bg-[#F9F9F8] border-black/10 shadow-xs pointer-events-none`}
          />

          <div className="w-full h-full p-1 border border-[#E5E1DA] overflow-hidden">
            <SpreadPhoto
              photoUrl={pageData?.photoUrl}
              title={pageData?.title}
              subject={pageData?.placeholderSubject}
              altText={pageData?.altText}
              tone={pageData?.photoTone}
              caption={pageData?.caption}
            />
          </div>
        </div>
      );
    }

    // 5. Luxury Albums: Tuscan Leather Trim, Parchment Paper & Gold Deboss
    return (
      <div className="w-full h-full p-3 sm:p-5 bg-[#FAF8F5] flex flex-col justify-between relative">
        {/* Subtle gold foil border frame */}
        <div className="absolute inset-2 sm:inset-3 border border-amber-600/20 pointer-events-none" />

        {/* Gilded leaf edge block simulation on outer edge */}
        <div
          className={`absolute top-0 bottom-0 ${
            side === 'left' ? 'left-0' : 'right-0'
          } w-1 sm:w-1.5 bg-gradient-to-b from-amber-400/80 via-amber-300/90 to-amber-500/80 pointer-events-none shadow-xs`}
        />

        <div className="relative z-10 text-center pb-1">
          <span className="text-[8.5px] uppercase font-sans tracking-widest text-amber-900/70 font-semibold">
            Heirloom Plate 0{spread.spreadIndex * 2 + (side === 'left' ? 1 : 2)}
          </span>
        </div>

        <div className="relative z-10 my-auto mx-auto w-[88%] max-h-[72%] aspect-[3/4] p-1.5 sm:p-2 bg-white border border-[#E5E1DA] shadow-sm">
          <SpreadPhoto
            photoUrl={pageData?.photoUrl}
            title={pageData?.title}
            subject={pageData?.placeholderSubject}
            altText={pageData?.altText}
            tone={pageData?.photoTone}
            caption={pageData?.caption}
          />
        </div>

        <div className="relative z-10 pt-1 flex items-center justify-between text-[8.5px] text-[#77736E] font-sans uppercase">
          <span>24k Hand-Gilded Leaf</span>
          <span>Archival Metallic Paper</span>
        </div>
      </div>
    );
  };

  // Determine what is rendered on base layers during turns
  const activeSpreadData = album.spreads[currentSpread];
  const nextSpreadData = currentSpread < totalSpreads - 1 ? album.spreads[currentSpread + 1] : null;
  const prevSpreadData = currentSpread > 0 ? album.spreads[currentSpread - 1] : null;

  // Base Left Page
  let baseLeftSpread = activeSpreadData;
  if (turnState?.direction === 'prev' && prevSpreadData) {
    baseLeftSpread = prevSpreadData; // pre-render incoming spread on left underneath
  }

  // Base Right Page
  let baseRightSpread = activeSpreadData;
  if (turnState?.direction === 'next' && nextSpreadData) {
    baseRightSpread = nextSpreadData; // pre-render incoming spread on right underneath
  }

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center select-none min-h-0"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* 3D Physical Open Book Stage */}
      <div className="relative w-full max-w-3xl xl:max-w-4xl h-[min(370px,46vh)] sm:h-[min(420px,48vh)] flex items-center justify-center perspective-theater p-1 sm:p-2 flex-shrink-0">
        {/* Soft, calm contact shadow grounded on the gallery floor (Warm Ivory aesthetic) */}
        <div className="absolute bottom-2 w-[90%] h-12 rounded-[50%] bg-[#171717]/10 filter blur-xl pointer-events-none" />

        {/* The Open Hardcover Book Shell */}
        <div
          ref={bookContainerRef}
          className="relative w-full max-w-[720px] h-[min(320px,40vh)] sm:h-[min(365px,44vh)] preserve-3d flex shadow-xl rounded-sm"
          style={{
            transformStyle: 'preserve-3d',
            backgroundColor: album.cover.baseColor || '#1E2227',
          }}
        >
          {/* Outer Cover Trim Lip */}
          <div className="absolute -inset-1 rounded-sm bg-[#171717]/25 -z-10 shadow-lg" />

          {/* LAYER 1: BASE LEFT HALF SPREAD */}
          <div
            className="w-1/2 h-full relative overflow-hidden bg-white shadow-inner flex flex-col"
            style={{
              borderTopLeftRadius: '2px',
              borderBottomLeftRadius: '2px',
            }}
          >
            {renderPage(baseLeftSpread, 'left')}

            {/* Left page gutter curve shadow */}
            <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-12 bg-gradient-to-l from-[#171717]/20 via-[#171717]/05 to-transparent pointer-events-none" />
          </div>

          {/* CENTER BOOK SPINE / SEAM */}
          <div className="relative w-2 sm:w-2.5 h-full z-30 flex-shrink-0 bg-[#1E2024] flex items-center justify-center shadow-xs">
            <div className="w-px h-full bg-black/40" />
            <div className="absolute top-0 w-full h-1 bg-amber-400/50" />
            <div className="absolute bottom-0 w-full h-1 bg-amber-400/50" />
          </div>

          {/* LAYER 1: BASE RIGHT HALF SPREAD */}
          <div
            className="w-1/2 h-full relative overflow-hidden bg-white shadow-inner flex flex-col"
            style={{
              borderTopRightRadius: '2px',
              borderBottomRightRadius: '2px',
            }}
          >
            {renderPage(baseRightSpread, 'right')}

            {/* Right page gutter curve shadow */}
            <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-12 bg-gradient-to-r from-[#171717]/20 via-[#171717]/05 to-transparent pointer-events-none" />
          </div>

          {/* LAYER 2: TURNING LEAF (3D DUAL-FACED ROTATION) */}
          <div
            ref={turningLeafRef}
            className="absolute top-0 right-0 w-1/2 h-full preserve-3d opacity-0 pointer-events-none z-40"
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'left center',
            }}
          >
            {/* FRONT FACE of turning leaf (facing right when rotateY = 0) */}
            <div
              className="absolute inset-0 w-full h-full bg-white shadow-xl overflow-hidden"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              {turnState?.direction === 'next'
                ? renderPage(album.spreads[turnState.fromIndex], 'right')
                : turnState?.direction === 'prev'
                ? renderPage(album.spreads[turnState.toIndex], 'right')
                : renderPage(activeSpreadData, 'right')}

              {/* Dynamic paper fold gradient shadow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#171717]/25 via-transparent to-[#171717]/10 pointer-events-none" />
            </div>

            {/* BACK FACE of turning leaf (facing left when rotated to -180deg) */}
            <div
              className="absolute inset-0 w-full h-full bg-white shadow-xl overflow-hidden"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              {turnState?.direction === 'next'
                ? renderPage(album.spreads[turnState.toIndex], 'left')
                : turnState?.direction === 'prev'
                ? renderPage(album.spreads[turnState.fromIndex], 'left')
                : null}

              {/* Dynamic reverse paper fold gradient shadow */}
              <div className="absolute inset-0 bg-gradient-to-l from-[#171717]/25 via-transparent to-[#171717]/10 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls Bar: Quiet Luxury Gallery Aesthetic */}
      <div className="w-full max-w-lg mt-2.5 sm:mt-3 px-3 flex items-center justify-between flex-shrink-0">
        <button
          type="button"
          onClick={turnPrev}
          disabled={currentSpread === 0 || isTurning}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans text-[#171717] bg-white hover:bg-[#EAE6DF] disabled:opacity-30 disabled:pointer-events-none transition-all border border-[#E5E1DA] rounded-full shadow-2xs cursor-pointer focus:outline-none"
          aria-label="Previous Spread"
        >
          <ChevronLeft className="w-3.5 h-3.5 text-[#77736E]" />
          <span className="hidden sm:inline text-[11px] font-sans uppercase tracking-wider">Previous</span>
          <span className="sm:hidden text-[10px]">Prev</span>
        </button>

        {/* Minimalist Spread Counter & Dots */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5">
            {album.spreads.map((spread, sIdx) => (
              <button
                key={spread.spreadIndex}
                type="button"
                onClick={() => {
                  if (!isTurning && sIdx !== currentSpread) {
                    if (sIdx > currentSpread) {
                      turnNext();
                    } else {
                      turnPrev();
                    }
                  }
                }}
                className={`transition-all duration-300 ${
                  sIdx === currentSpread
                    ? 'w-4 sm:w-5 h-1 bg-[#171717] rounded-full'
                    : 'w-1.5 h-1.5 bg-[#DED8C6] hover:bg-[#77736E] rounded-full'
                }`}
                aria-label={`Go to Spread ${sIdx + 1}`}
              />
            ))}
          </div>

          <span className="mt-1 text-[10px] font-sans tracking-widest uppercase text-[#77736E]">
            Spread 0{currentSpread + 1} / 0{totalSpreads} • {activeSpreadData?.name}
          </span>
        </div>

        <button
          type="button"
          onClick={turnNext}
          disabled={currentSpread === totalSpreads - 1 || isTurning}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans text-[#171717] bg-white hover:bg-[#EAE6DF] disabled:opacity-30 disabled:pointer-events-none transition-all border border-[#E5E1DA] rounded-full shadow-2xs cursor-pointer focus:outline-none"
          aria-label="Next Spread"
        >
          <span className="hidden sm:inline text-[11px] font-sans uppercase tracking-wider">Next</span>
          <span className="sm:hidden text-[10px]">Next</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#77736E]" />
        </button>
      </div>

      {/* Understated Keyboard & Touch Hint */}
      <div className="mt-1 text-center text-[9px] font-sans text-[#77736E]/70 tracking-wider flex-shrink-0">
        <span className="hidden sm:inline">Use Left / Right arrow keys to turn pages • Esc to close</span>
        <span className="sm:hidden">Swipe left or right to turn pages</span>
      </div>
    </div>
  );
}
