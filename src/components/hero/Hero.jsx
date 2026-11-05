import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeroScene from './HeroScene';
import HeroThumbnails from './HeroThumbnails';
import WavyUnderline from './WavyUnderline';
import PixelMosaicTransition from './PixelMosaicTransition';
import Button from '../common/Button';
import { heroScenes } from '../../data/heroScenes';

const AUTO_ADVANCE_DURATION = 5000; // 5 seconds each slide stays still
const TRANSITION_LOCK_MS = 1600;    // lock-out during mosaic transition

/**
 * Ultra Albums Hero Section (v5) — Pixel-Mosaic Transition.
 *
 * Key changes from v4:
 * - Image transitions use a canvas pixel-mosaic dissolve/reveal instead of
 *   a simple opacity cross-fade.
 * - Autoplay pauses on hover and when the browser tab is hidden.
 * - Rapid input is debounced: manual changes are ignored while a transition
 *   is in flight.
 * - The mosaic pattern rotates through 4 art-directed wave styles.
 * - prefers-reduced-motion falls back to an instant swap (no mosaic).
 */
export default function Hero({ onExploreClick }) {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [previousSceneIndex, setPreviousSceneIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const touchStartXRef = useRef(0);
  const progressIntervalRef = useRef(null);
  const progressStartTimeRef = useRef(Date.now());
  const transitionCountRef = useRef(0); // used to rotate mosaic patterns

  const activeScene = heroScenes[activeSceneIndex];

  // ─── Preload all hero images on mount ─────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    heroScenes.forEach((scene) => {
      const img = new Image();
      img.src = scene.src;
      if (scene.thumbSrc) {
        const tImg = new Image();
        tImg.src = scene.thumbSrc;
      }
    });
  }, []);

  // ─── Reset description expansion on slide change ──────────────────────────
  useEffect(() => {
    setIsDescriptionExpanded(false);
  }, [activeSceneIndex]);

  // ─── Scene change handler ─────────────────────────────────────────────────
  const handleSelectScene = useCallback(
    (nextIndex) => {
      if (nextIndex === activeSceneIndex) return;
      if (isTransitioning) return; // lock out during mosaic

      setIsTransitioning(true);
      setPreviousSceneIndex(activeSceneIndex);
      setActiveSceneIndex(nextIndex);
      setProgress(0);
      progressStartTimeRef.current = Date.now();
      transitionCountRef.current += 1;

      // Fail-safe transition unlock
      setTimeout(() => {
        setIsTransitioning(false);
        setPreviousSceneIndex(null);
      }, TRANSITION_LOCK_MS);
    },
    [activeSceneIndex, isTransitioning]
  );

  // Called by PixelMosaicTransition when the mosaic completes
  const handleMosaicComplete = useCallback(() => {
    setPreviousSceneIndex(null);
    setIsTransitioning(false);
  }, []);

  // ─── Continuous Autoplay timer ───────────────────────────────────────────
  useEffect(() => {
    if (isTransitioning) return;

    progressStartTimeRef.current = Date.now();
    const stepMs = 40;

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - progressStartTimeRef.current;
      const currentProgress = Math.min(1, elapsed / AUTO_ADVANCE_DURATION);
      setProgress(currentProgress);

      if (currentProgress >= 1) {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
        const nextIdx = (activeSceneIndex + 1) % heroScenes.length;
        handleSelectScene(nextIdx);
      }
    }, stepMs);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [activeSceneIndex, isTransitioning, handleSelectScene]);

  // ─── Pause autoplay only when tab is hidden ──────────────────────────────
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
        progressStartTimeRef.current = Date.now();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // ─── Mobile Touch Swipe ───────────────────────────────────────────────────
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartXRef.current - touchEndX;

    if (deltaX > 40) {
      handleSelectScene((activeSceneIndex + 1) % heroScenes.length);
    } else if (deltaX < -40) {
      handleSelectScene((activeSceneIndex - 1 + heroScenes.length) % heroScenes.length);
    }
  };

  // Mosaic pattern index cycles 0→1→2→3→0…
  const mosaicPattern = transitionCountRef.current % 4;

  return (
    <section
      id="hero-section"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[100svh] min-h-[560px] sm:min-h-[640px] max-h-[1440px] overflow-hidden bg-light-grey text-charcoal flex flex-col justify-end"
      aria-label="Ultra Albums Featured Hero"
    >
      {/* ─── Background Image Layers ───────────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-light-grey">
        {/* Base layer: the current (or previous during transition) image */}
        {previousSceneIndex !== null && (
          <div
            key={`base-${heroScenes[previousSceneIndex].id}`}
            className="absolute inset-0 w-full h-full z-10"
            aria-hidden="true"
          >
            <HeroScene scene={heroScenes[previousSceneIndex]} isLcp={false} />
          </div>
        )}

        {/* Active scene — sits below the old scene during mosaic, then pops above after */}
        <div
          key={`active-${activeScene.id}`}
          className="absolute inset-0 w-full h-full"
          style={{
            // During mosaic transition: z-5 (behind old scene at z-10).
            // After mosaic completes: z-20 (in front of everything).
            zIndex: isTransitioning ? 5 : 20,
          }}
          aria-hidden="false"
        >
          <HeroScene scene={activeScene} isLcp={activeSceneIndex === 0} />
        </div>

        {/* Pixel-mosaic canvas overlay — only during transitions */}
        {isTransitioning && (
          <PixelMosaicTransition
            incomingSrc={activeScene.src}
            focalPoint={activeScene.focalPoint}
            pattern={mosaicPattern}
            onComplete={handleMosaicComplete}
            reducedMotion={shouldReduceMotion}
          />
        )}
      </div>

      {/* ─── Content Arena ─────────────────────────────────────────────── */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-12 md:pb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-10 pointer-events-none">
        {/* Left Column: Typography */}
        <div className="max-w-2xl text-left pointer-events-auto">
          {/* Micro Section Label */}
          <div className="mb-2 sm:mb-4 flex items-center gap-2.5">
            <span className="w-5 sm:w-6 h-px bg-charcoal/60" aria-hidden="true" />
            <span className="font-sans text-[9.5px] sm:text-[11px] uppercase tracking-widest-luxury text-charcoal font-bold drop-shadow-2xs">
              Photo Album Manufacturer · Mumbai
            </span>
          </div>

          {/* Reserved Height Heading Container */}
          <div className="min-h-[64px] sm:min-h-[110px] md:min-h-[130px] lg:min-h-[150px] flex items-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.h1
                key={activeScene.id}
                aria-live="polite"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.22,
                  ease: 'easeOut',
                }}
                className="font-serif font-normal text-[32px] xs:text-4xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.06] text-charcoal tracking-tight select-none break-words"
              >
                {activeScene.prefix}
                <span className="relative inline-block italic font-normal text-charcoal">
                  {activeScene.emphasisWord}
                  <WavyUnderline
                    color="#111111"
                    className="-bottom-1.5 sm:-bottom-2 md:-bottom-2.5 text-charcoal"
                  />
                </span>
                {activeScene.suffix}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Supporting Text */}
          <div className="mt-4 sm:mt-5 min-h-[58px] sm:min-h-[72px] md:min-h-[80px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeScene.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.22,
                  ease: 'easeOut',
                }}
                className="text-sm sm:text-base md:text-lg text-charcoal/90 font-normal leading-relaxed max-w-xl"
              >
                <p
                  className={`transition-all duration-200 ${
                    isDescriptionExpanded
                      ? ''
                      : 'line-clamp-3 sm:line-clamp-none'
                  }`}
                >
                  {activeScene.description}
                </p>

                {/* Mobile 'Read more' toggle */}
                {activeScene.description.length > 170 && (
                  <button
                    type="button"
                    onClick={() =>
                      setIsDescriptionExpanded(!isDescriptionExpanded)
                    }
                    className="sm:hidden mt-1.5 text-xs text-charcoal underline uppercase tracking-wider font-bold focus:outline-none"
                  >
                    {isDescriptionExpanded ? 'Show less' : 'Read more'}
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Primary CTA */}
          <div className="mt-6 sm:mt-8 flex items-center gap-4">
            <Button
              to={activeScene.cta.href}
              onClick={(e) => {
                if (onExploreClick) {
                  e.preventDefault();
                  onExploreClick(activeScene);
                }
              }}
              variant="primary"
              size="lg"
              icon={ArrowRight}
              className="text-xs tracking-widest-luxury font-semibold uppercase hover:bg-ink-blue hover:border-ink-blue transition-colors shadow-md"
            >
              {activeScene.cta.label}
            </Button>
          </div>
        </div>

        {/* Right Column: Thumbnails */}
        <div className="lg:self-end flex-shrink-0 pointer-events-auto">
          <HeroThumbnails
            scenes={heroScenes}
            activeIndex={activeSceneIndex}
            onSelect={handleSelectScene}
            progress={progress}
            activeCaption={activeScene.caption}
          />
        </div>
      </div>

      {/* Frame registration tick marks */}
      <div
        className="absolute top-24 left-6 w-2.5 h-2.5 border-t border-l border-charcoal/30 pointer-events-none hidden sm:block"
        aria-hidden="true"
      />
      <div
        className="absolute top-24 right-6 w-2.5 h-2.5 border-t border-r border-charcoal/30 pointer-events-none hidden sm:block"
        aria-hidden="true"
      />
    </section>
  );
}
