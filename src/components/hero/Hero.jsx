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
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 md:pb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-10 pointer-events-none">
        {/* Left Column: Pure Minimal Luxury Editorial Typography */}
        <div className="max-w-xl text-left pointer-events-auto">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeScene.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.28,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Category Heading in Spaced Elegant Serif */}
              <h1 className="font-serif font-normal text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-[#111111] uppercase tracking-[0.16em] leading-tight select-none">
                {activeScene.shortTitle}
              </h1>

              {/* Poetic Subtitle matching uploaded reference */}
              <p className="mt-2 text-xs sm:text-sm md:text-[15px] font-serif italic text-[#111111]/80 tracking-wide font-light">
                {activeScene.caption.includes('·')
                  ? activeScene.caption.split('·')[1].trim()
                  : activeScene.description}
              </p>

              {/* Understated Hairline Divider */}
              <div className="w-12 h-px bg-[#111111]/40 my-3.5" aria-hidden="true" />

              {/* Quiet Minimal CTA */}
              <div className="pt-0.5">
                <Button
                  to={activeScene.cta.href}
                  onClick={(e) => {
                    if (onExploreClick) {
                      e.preventDefault();
                      onExploreClick(activeScene);
                    }
                  }}
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                  className="text-xs tracking-widest uppercase font-medium"
                >
                  {activeScene.cta.label}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
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
    </section>
  );
}
