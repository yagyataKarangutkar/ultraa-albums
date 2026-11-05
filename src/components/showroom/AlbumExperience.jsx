import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { X, BookOpen } from 'lucide-react';
import AlbumPageTurner from './AlbumPageTurner';
import AlbumInformation from './AlbumInformation';
import { showcaseAlbums } from '../../data/albums';

/**
 * Dedicated 3D Album Showroom Gallery (Quiet Luxury Edition).
 * Redesigned from a dark configurator into a bright, calm album gallery.
 * - Warm Ivory (#F5F3EE) studio atmosphere with soft lighting and hairline dividers (#E5E1DA).
 * - Compact header with understated segmented category tabs and quiet close button.
 * - Stage receives 65-70% usable space; info panel receives 30-35%.
 * - Smooth category-switch cross-fade and preloading.
 * - Zero horizontal overflow; viewport-locked height with internal scrolling for info panel.
 */
export default function AlbumExperience({
  selectedAlbum,
  onClose,
  onSwitchAlbum,
  triggerElement,
}) {
  const overlayRef = useRef(null);
  const stageAreaRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousActiveElementRef = useRef(null);
  const [activeAlbum, setActiveAlbum] = useState(selectedAlbum);
  const [isSwitchingCategory, setIsSwitchingCategory] = useState(false);

  // Sync prop changes
  useEffect(() => {
    setActiveAlbum(selectedAlbum);
  }, [selectedAlbum]);

  // Focus management and accessibility trap + Strict scroll lock
  useEffect(() => {
    previousActiveElementRef.current = triggerElement || document.activeElement;

    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
        return;
      }

      if (e.key === 'Tab' && overlayRef.current) {
        const focusableElements = overlayRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener('keydown', handleKeyDown);

      if (previousActiveElementRef.current && typeof previousActiveElementRef.current.focus === 'function') {
        previousActiveElementRef.current.focus();
      }
    };
  }, [triggerElement]);

  // GSAP Entrance Transition (Warm Ivory gallery entrance)
  useEffect(() => {
    if (!overlayRef.current) return;

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: 'power2.out' }
    );

    if (stageAreaRef.current) {
      gsap.fromTo(
        stageAreaRef.current,
        { opacity: 0, y: 14, scale: 0.985 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, delay: 0.05, ease: 'power3.out' }
      );
    }
  }, []);

  // Category switch with calm cross-fade (450ms)
  const handleCategorySwitch = (nextAlbum) => {
    if (isSwitchingCategory || nextAlbum.id === activeAlbum.id) return;

    setIsSwitchingCategory(true);
    if (stageAreaRef.current) {
      gsap.to(stageAreaRef.current, {
        opacity: 0.2,
        y: 6,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          setActiveAlbum(nextAlbum);
          onSwitchAlbum(nextAlbum);
          gsap.to(stageAreaRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => setIsSwitchingCategory(false),
          });
        },
      });
    } else {
      setActiveAlbum(nextAlbum);
      onSwitchAlbum(nextAlbum);
      setIsSwitchingCategory(false);
    }
  };

  const handleClose = () => {
    if (!overlayRef.current) {
      onClose();
      return;
    }

    gsap.to(overlayRef.current, {
      opacity: 0,
      scale: 0.99,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  const modalContent = (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] w-screen h-[100dvh] max-h-[100dvh] overflow-hidden bg-[#F5F3EE] flex flex-col justify-between p-3 sm:px-6 sm:py-3 lg:px-8 lg:py-3 select-none text-[#171717]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="showroom-modal-title"
    >
      {/* Soft studio ambient lighting (Warm Ivory gallery) */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 50% 28%, rgba(255, 255, 255, 0.75) 0%, rgba(245, 243, 238, 0.98) 75%)',
        }}
      />

      {/* Top Header Bar: Compact & Quiet Luxury */}
      <header className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between pb-2.5 border-b border-[#E5E1DA] flex-shrink-0">
        {/* Brand Wordmark & Showroom Title */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-[#E5E1DA] shadow-xs flex items-center justify-center text-[#171717] flex-shrink-0">
            <BookOpen className="w-3.5 h-3.5 text-[#171717]" />
          </div>
          <div>
            <span className="text-[9px] uppercase font-sans tracking-widest text-[#77736E] font-medium block leading-tight">
              3D Album Showcase • Digital Atelier
            </span>
            <h1
              id="showroom-modal-title"
              className="font-serif text-sm sm:text-base text-[#171717] font-normal leading-tight"
            >
              {activeAlbum.title}
            </h1>
          </div>
        </div>

        {/* Centre Understated Category Tabs (Desktop & Tablet) */}
        <nav
          className="hidden md:flex items-center gap-1 bg-[#EAE6DF]/70 p-1 rounded-full border border-[#E5E1DA]"
          aria-label="Album Categories"
        >
          {showcaseAlbums.map((alb) => {
            const isActive = alb.id === activeAlbum.id;
            return (
              <button
                key={alb.id}
                type="button"
                onClick={() => handleCategorySwitch(alb)}
                className={`px-3 sm:px-3.5 py-1 text-xs font-sans tracking-wider rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#171717] font-medium shadow-xs border border-[#E5E1DA]'
                    : 'text-[#77736E] hover:text-[#171717] hover:bg-white/40'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {alb.title}
              </button>
            );
          })}
        </nav>

        {/* Quiet Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={handleClose}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans text-[#171717] bg-white hover:bg-[#EAE6DF] border border-[#E5E1DA] rounded-full shadow-2xs transition-colors focus:ring-1 focus:ring-[#171717] focus:outline-none cursor-pointer"
          aria-label="Close Showroom (Press Escape)"
        >
          <span className="hidden sm:inline text-[11px] font-sans tracking-wider uppercase">Close</span>
          <X className="w-3.5 h-3.5 text-[#77736E]" />
        </button>
      </header>

      {/* Main Content Arena: 65-70% Album Stage + 30-35% Info Panel */}
      <main
        ref={stageAreaRef}
        className="relative z-10 w-full max-w-7xl mx-auto flex-1 min-h-0 py-2 overflow-y-auto lg:overflow-hidden"
      >
        <div className="w-full h-auto lg:h-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-0">
          {/* Left/Center Column (65-70% width): 3D Album Stage */}
          <section
            className="lg:col-span-7 xl:col-span-8 flex flex-col items-center justify-center min-h-[340px] sm:min-h-[420px] lg:h-full lg:min-h-0 overflow-visible"
            aria-label="3D Album Interactive Stage"
          >
            <AlbumPageTurner
              key={activeAlbum.id}
              album={activeAlbum}
              onClose={handleClose}
            />
          </section>

          {/* Right Column (30-35% width): Product Information & Specifications */}
          <section
            className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center min-h-0 pb-6 lg:pb-0 overflow-visible lg:overflow-y-auto"
            aria-label="Product Specifications"
          >
            <AlbumInformation album={activeAlbum} />
          </section>
        </div>
      </main>

      {/* Bottom Bar: Quiet Provenance & Mobile Category Switcher */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto pt-2 border-t border-[#E5E1DA] flex items-center justify-between text-[10.5px] text-[#77736E] flex-shrink-0">
        {/* Mobile Horizontal Category Switcher */}
        <div className="flex md:hidden items-center gap-1 overflow-x-auto max-w-[220px] py-0.5">
          {showcaseAlbums.map((alb) => (
            <button
              key={alb.id}
              type="button"
              onClick={() => handleCategorySwitch(alb)}
              className={`px-2 py-0.5 text-[9px] font-sans uppercase whitespace-nowrap rounded-sm transition-colors ${
                alb.id === activeAlbum.id
                  ? 'bg-white text-[#171717] font-semibold shadow-2xs border border-[#E5E1DA]'
                  : 'text-[#77736E] bg-white/40'
              }`}
            >
              {alb.title}
            </button>
          ))}
        </div>

        <span className="hidden sm:inline font-sans">
          Handcrafted in Dahisar East, Mumbai • Shipped worldwide to professional studios
        </span>

        <span className="font-sans text-[10px] text-[#77736E] font-medium">
          True 180° Layflat & Archival Substrate Cores
        </span>
      </footer>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
}
