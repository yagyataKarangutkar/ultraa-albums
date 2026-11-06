import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { Sparkles } from 'lucide-react';

/**
 * Realistic 3D Physical Album Product Component.
 * - Features physical 3D perspective, spine curvature, layered page block, and cover debossing.
 * - Uses gsap.quickTo() for ultra-smooth pointer-following 3D tilt.
 * - Completely disables hover-only transforms on touch devices.
 * - Accessible keyboard trigger support (Enter / Space).
 */
export default function Album3DProduct({
  album,
  onSelect,
  index = 0,
}) {
  const containerRef = useRef(null);
  const bookRef = useRef(null);
  const shadowRef = useRef(null);
  const infoRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  // gsap.quickTo refs for performant pointer tracking
  const rotateYTo = useRef(null);
  const rotateXTo = useRef(null);
  const liftYTo = useRef(null);
  const shadowScaleTo = useRef(null);

  useEffect(() => {
    // Detect touch capability to prevent sticky hover states
    if (typeof window !== 'undefined') {
      const touchDetected =
        'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouch(touchDetected);
    }
  }, []);

  // GSAP quickTo and hover motion setup
  useEffect(() => {
    if (isTouch || !containerRef.current || !bookRef.current || !shadowRef.current) return;

    const container = containerRef.current;
    const book = bookRef.current;
    const shadow = shadowRef.current;

    // Default resting transform
    gsap.set(book, {
      rotateX: 14,
      rotateY: -10,
      rotateZ: 1.5,
      y: 0,
      transformPerspective: 1400,
    });

    gsap.set(shadow, {
      scale: 1,
      opacity: 0.55,
      y: 0,
      filter: 'blur(10px)',
    });

    // Initialize gsap.quickTo pipes
    rotateYTo.current = gsap.quickTo(book, 'rotateY', { duration: 0.45, ease: 'power2.out' });
    rotateXTo.current = gsap.quickTo(book, 'rotateX', { duration: 0.45, ease: 'power2.out' });
    liftYTo.current = gsap.quickTo(book, 'y', { duration: 0.4, ease: 'power2.out' });
    shadowScaleTo.current = gsap.quickTo(shadow, 'scale', { duration: 0.45, ease: 'power2.out' });

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const xPercent = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const yPercent = (e.clientY - rect.top) / rect.height - 0.5;

      const targetRotateY = -10 + xPercent * 14;
      const targetRotateX = 14 - yPercent * 12;

      if (rotateYTo.current) rotateYTo.current(targetRotateY);
      if (rotateXTo.current) rotateXTo.current(targetRotateX);
    };

    const handleMouseEnter = () => {
      if (liftYTo.current) liftYTo.current(-16);
      if (shadowScaleTo.current) shadowScaleTo.current(1.08);

      gsap.to(shadow, {
        opacity: 0.35,
        y: 12,
        filter: 'blur(16px)',
        duration: 0.4,
        ease: 'power2.out',
      });

      if (infoRef.current) {
        gsap.to(infoRef.current, {
          borderColor: '#111111',
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      if (rotateYTo.current) rotateYTo.current(-10);
      if (rotateXTo.current) rotateXTo.current(14);
      if (liftYTo.current) liftYTo.current(0);
      if (shadowScaleTo.current) shadowScaleTo.current(1);

      gsap.to(book, {
        rotateX: 14,
        rotateY: -10,
        rotateZ: 1.5,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      });

      gsap.to(shadow, {
        opacity: 0.55,
        y: 0,
        filter: 'blur(10px)',
        duration: 0.7,
        ease: 'power3.out',
      });

      if (infoRef.current) {
        gsap.to(infoRef.current, {
          borderColor: '#E5E1DA',
          duration: 0.3,
        });
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isTouch]);

  // Texture mapping for cover materials
  const getTextureClass = (style) => {
    switch (style) {
      case 'cognac-leather':
        return 'texture-leather';
      case 'natural-linen':
        return 'texture-linen';
      case 'buckram':
        return 'texture-buckram';
      case 'slate-linen':
      default:
        return 'texture-slate';
    }
  };

  const isGilded = album.id === 'luxury-albums';
  const isFlushMount = album.id === 'flush-mount-album';

  return (
    <div
      ref={containerRef}
      onClick={() => onSelect(album, containerRef.current)}
      className="group relative flex flex-col items-center justify-between cursor-pointer select-none py-4 px-2"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(album, containerRef.current);
        }
      }}
      aria-label={`Open interactive 3D showroom viewer for ${album.title}`}
    >
      {/* 3D Physical Album Stage */}
      <div className="relative w-full max-w-[280px] sm:max-w-[310px] h-[340px] sm:h-[370px] flex items-center justify-center perspective-showroom">
        
        {/* Natural Contact Shadow beneath the album */}
        <div
          ref={shadowRef}
          className="absolute bottom-6 w-[82%] h-10 rounded-[50%] bg-[#111111]/70 pointer-events-none transition-all"
        />

        {/* 3D Physical Book Structure */}
        <div
          ref={bookRef}
          className="relative w-[210px] sm:w-[230px] h-[260px] sm:h-[285px] preserve-3d transition-transform duration-200"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Front Cover Plate */}
          <div
            className={`absolute inset-0 rounded-[3px] border border-black/20 shadow-md flex flex-col justify-between p-6 ${getTextureClass(
              album.cover.textureStyle
            )}`}
            style={{
              backgroundColor: album.cover.baseColor,
              transform: 'translateZ(12px)',
            }}
          >
            {/* Ambient Lighting highlight across cover edge */}
            <div className="absolute inset-0 rounded-[3px] bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />

            {/* Inset Cameo / Window Photo Frame */}
            {album.cover.windowPhoto && (
              <div className="relative mx-auto mt-1 w-20 sm:w-24 h-16 sm:h-20 bg-charcoal/40 border border-white/20 shadow-inner overflow-hidden flex flex-col items-center justify-center p-0.5">
                {album.cover.windowPhoto.photoUrl ? (
                  <div className="w-full h-full relative overflow-hidden">
                    <img
                      src={album.cover.windowPhoto.photoUrl}
                      alt={album.cover.windowPhoto.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-charcoal/80 to-charcoal/30 flex flex-col items-center justify-center text-center p-1">
                    <Sparkles className="w-3.5 h-3.5 text-white/70 mb-1" />
                    <span className="font-serif italic text-[9px] text-white/90 leading-tight">
                      {album.cover.windowPhoto.title}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Foil Stamped / Debossed Title */}
            <div className="relative z-10 my-auto text-center">
              <span
                className={`font-sans text-[9px] uppercase tracking-widest-luxury block mb-1 font-semibold ${
                  album.id === 'photo-book'
                    ? 'text-charcoal/60'
                    : isGilded
                    ? 'gold-foil-text'
                    : 'silver-foil-text'
                }`}
              >
                {album.cover.subEmboss}
              </span>

              <h3
                className={`font-serif text-lg sm:text-xl tracking-wider uppercase font-medium leading-tight ${
                  album.id === 'photo-book'
                    ? 'text-charcoal'
                    : isGilded
                    ? 'gold-foil-text'
                    : 'silver-foil-text'
                }`}
              >
                {album.title}
              </h3>

              <div
                className={`w-8 h-px mx-auto my-2.5 ${
                  album.id === 'photo-book' ? 'bg-charcoal/30' : 'bg-white/30'
                }`}
              />

              <span
                className={`font-sans text-[8px] uppercase tracking-[0.25em] ${
                  album.id === 'photo-book' ? 'text-charcoal/50' : 'text-white/60'
                }`}
              >
                ULTRA ALBUMS • MUMBAI
              </span>
            </div>

            {/* Handcrafted Bottom Signature Tag */}
            <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10 text-[8px] font-sans uppercase tracking-wider text-white/50">
              <span className={album.id === 'photo-book' ? 'text-charcoal/60' : 'text-white/60'}>
                {album.badge}
              </span>
              <span className={album.id === 'photo-book' ? 'text-charcoal/60' : 'text-white/60'}>
                Hand-Bound
              </span>
            </div>

            {/* Corner Accents for traditional & luxury albums */}
            {(album.id === 'slip-in-albums' || album.id === 'luxury-albums') && (
              <>
                <span className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-amber-400/40" />
                <span className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-amber-400/40" />
                <span className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-amber-400/40" />
                <span className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-amber-400/40" />
              </>
            )}
          </div>

          {/* Left Spine (Physical Curved Hinge) */}
          <div
            className="absolute top-0 bottom-0 left-0 w-6 origin-left -translate-x-full shadow-md"
            style={{
              transform: 'rotateY(-90deg) translateZ(0px)',
              backgroundColor: album.cover.baseColor,
              backgroundImage:
                'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(255,255,255,0.15) 30%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.7) 100%)',
            }}
          >
            <div className="w-full h-full flex items-center justify-center transform -rotate-90 text-[8px] font-sans uppercase tracking-[0.2em] text-white/60 whitespace-nowrap">
              {album.title} • ARCHIVAL
            </div>
          </div>

          {/* Right Edge (Layered Page Block) */}
          <div
            className={`absolute top-1 bottom-1 right-0 w-5 origin-right ${
              isGilded ? 'page-block-gilded' : 'page-block-edge'
            }`}
            style={{
              transform: 'rotateY(90deg) translateZ(-2px)',
            }}
          >
            {isFlushMount && (
              <div className="w-full h-full bg-white/40 flex items-center justify-center">
                <span className="text-[7px] text-charcoal/60 font-sans rotate-90 whitespace-nowrap">
                  1.5mm Cores
                </span>
              </div>
            )}
          </div>

          {/* Bottom Edge Page Block */}
          <div
            className={`absolute bottom-0 left-2 right-1 h-5 origin-bottom ${
              isGilded ? 'page-block-gilded' : 'page-block-edge'
            }`}
            style={{
              transform: 'rotateX(-90deg) translateZ(0px)',
            }}
          />

          {/* Back Cover Plate */}
          <div
            className="absolute inset-0 rounded-[3px] shadow-2xl"
            style={{
              backgroundColor: album.cover.baseColor,
              transform: 'translateZ(-12px)',
            }}
          />
        </div>
      </div>

      {/* Minimal Product Title Plaque — Title Only */}
      <div
        ref={infoRef}
        className="w-full mt-4 py-3.5 px-4 bg-white border border-[#E5E1DA] transition-all duration-300 text-center flex items-center justify-center rounded-[2px]"
      >
        <h3 className="font-serif text-lg sm:text-xl text-[#111111] font-normal tracking-tight group-hover:text-black transition-colors">
          {album.title}
        </h3>
      </div>
    </div>
  );
}

