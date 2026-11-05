import React, { useState, useRef, useEffect } from 'react';

/**
 * FormatAlbum Component (v5).
 * - High-fidelity physical 3D album rendering tailored to each of the 4 signature formats:
 *   1. Slip-in: Obsidian buckram, brass corners, beveled aperture with authentic bridal portrait
 *   2. Flush Mount: Slate bookcloth, acrylic cameo, and distinctive 1.5mm rigid white substrate edges
 *   3. Photo Book: Tactile oat linen hardcover, clean debossed typography, flexible paper edges
 *   4. Luxury Leather: Full-grain Tuscan cognac leather, 4 raised spine ribs, 24k gold hot-foil deboss, and gilded gold leaf page edges
 * - Interactive 3D pointer tilt with damped return and subtle studio spotlight tracking.
 * - Supports large Hero mode and small Mini indicator mode.
 */
export default function FormatAlbum({
  format,
  isMini = false,
  className = '',
}) {
  const { visualProps } = format;
  const isLuxury = visualProps.type === 'luxury-leather';
  const isFlushMount = visualProps.type === 'flush-mount';
  const isSlipIn = visualProps.type === 'slip-in';
  const isPhotoBook = visualProps.type === 'photo-book';

  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ rotX: 11, rotY: -15, rotZ: 1.5, trX: 0, trY: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 35, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouch(window.matchMedia('(hover: none)').matches);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (isTouch || isMini || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    setTilt({
      rotX: 11 - normY * 5,
      rotY: -15 + normX * 6,
      rotZ: 1.5 - normX * 0.8,
      trX: normX * 4,
      trY: normY * 3,
    });

    setSpotlight({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.2,
    });
  };

  const handleMouseEnter = () => {
    if (!isTouch && !isMini) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotX: 11, rotY: -15, rotZ: 1.5, trX: 0, trY: 0 });
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  // =========================================================================
  // MINI ALBUM (Used in Bottom 4-Step Indicator)
  // =========================================================================
  if (isMini) {
    return (
      <div
        className={`relative flex items-center justify-center transition-transform duration-300 ${className}`}
        style={{ perspective: '600px' }}
      >
        <div
          className="relative w-12 h-15 sm:w-14 sm:h-18 rounded-[2px] transition-all duration-300 shadow-md"
          style={{
            transform: 'rotateY(-12deg) rotateX(10deg)',
            transformStyle: 'preserve-3d',
            backgroundColor: visualProps.coverColor,
            boxShadow:
              '2px 4px 10px rgba(0,0,0,0.3), inset -1px 0 2px rgba(255,255,255,0.15)',
          }}
        >
          {/* Mini Spine */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1.5 sm:w-2 bg-black/30 rounded-l-[2px]"
            style={{
              borderRight: '1px solid rgba(255,255,255,0.15)',
            }}
          />

          {/* Mini Cameo / Foil Accent */}
          {isSlipIn && (
            <div className="absolute inset-x-2 top-2.5 bottom-3.5 border border-white/40 bg-black/40 overflow-hidden rounded-[1px] p-0.5">
              <div className="w-full h-full bg-[#DED8C6] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-charcoal/40" />
              </div>
            </div>
          )}

          {isFlushMount && (
            <div className="absolute inset-x-2.5 top-3.5 bottom-4 border border-white/30 rounded-[1px] flex items-center justify-center">
              <span className="w-2.5 h-px bg-white/60" />
            </div>
          )}

          {isPhotoBook && (
            <div className="absolute inset-x-2 top-3 bottom-3 flex flex-col items-center justify-center">
              <span className="w-3 h-px bg-charcoal/40 mb-1" />
              <span className="w-2 h-px bg-charcoal/25" />
            </div>
          )}

          {isLuxury && (
            <div className="absolute inset-1.5 border border-[#D4AF37]/60 rounded-[1px] flex flex-col items-center justify-center">
              <span className="w-2 h-px bg-[#D4AF37]/90" />
            </div>
          )}

          {/* Mini Page Block on Right */}
          <div
            className={`absolute right-[-3px] top-[1px] bottom-[1px] w-[3px] rounded-r-[1px] ${
              isLuxury
                ? 'bg-[#C5A030] shadow-[0_0_2px_#D4AF37]'
                : isFlushMount
                ? 'bg-white shadow-xs'
                : 'bg-[#DED8C6]'
            }`}
          />
        </div>
      </div>
    );
  }

  // =========================================================================
  // FULL-SIZE HERO 3D ALBUM
  // =========================================================================
  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-[260px] xs:max-w-[310px] sm:max-w-[380px] md:max-w-[430px] h-[260px] xs:h-[310px] sm:h-[430px] md:h-[490px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* 1. Realistic Multi-Layer Ambient Contact Shadow */}
      <div
        className="absolute bottom-4 sm:bottom-6 w-[82%] h-10 bg-black/40 rounded-full filter blur-xl transition-all duration-500 pointer-events-none"
        style={{
          transform: `rotateX(82deg) translateZ(-60px) scale(${isHovered ? 1.18 : 1.15})`,
          opacity: isHovered ? 0.7 : 0.6,
        }}
      />
      <div
        className="absolute bottom-2 sm:bottom-4 w-[65%] h-6 bg-black/25 rounded-full filter blur-md pointer-events-none"
        style={{
          transform: 'rotateX(82deg) translateZ(-40px) scale(1.05)',
        }}
      />

      {/* 2. Physical 3D Album Body */}
      <div
        className="relative w-48 xs:w-56 sm:w-72 md:w-80 h-60 xs:h-72 sm:h-92 md:h-[400px] rounded-[4px]"
        style={{
          transform: `rotateY(${tilt.rotY}deg) rotateX(${tilt.rotX}deg) rotateZ(${tilt.rotZ}deg) translate3d(${tilt.trX}px, ${tilt.trY}px, 0)`,
          transformStyle: 'preserve-3d',
          backgroundColor: visualProps.coverColor,
          boxShadow: isHovered
            ? '18px 28px 60px rgba(0, 0, 0, 0.4), 6px 10px 20px rgba(0, 0, 0, 0.25), inset -1px 0 2px rgba(255, 255, 255, 0.15)'
            : '14px 22px 50px rgba(0, 0, 0, 0.35), 4px 8px 16px rgba(0, 0, 0, 0.2), inset -1px 0 2px rgba(255, 255, 255, 0.1)',
          transition: isHovered
            ? 'transform 0.12s ease-out, box-shadow 0.3s ease'
            : 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease',
        }}
      >
        {/* Dynamic Studio Spotlight Overlay */}
        <div
          className="absolute inset-0 rounded-[4px] pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,${spotlight.opacity}) 0%, transparent 65%)`,
          }}
        />
        {/* Subtle Material Surface Grain / Weave Texture */}
        <div
          className={`absolute inset-0 rounded-[4px] opacity-25 pointer-events-none mix-blend-overlay ${
            isLuxury
              ? 'bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:6px_6px]'
              : isPhotoBook
              ? 'bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:4px_4px]'
              : 'bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:5px_5px]'
          }`}
        />

        {/* Ambient Cover Highlight & Rim Light */}
        <div className="absolute inset-0 rounded-[4px] bg-gradient-to-tr from-black/20 via-transparent to-white/15 pointer-events-none" />
        <div className="absolute inset-0 rounded-[4px] border border-white/20 pointer-events-none" />

        {/* Realistic Book Spine (Left side with highlight, gradient roll, and ribbing) */}
        <div
          className="absolute left-0 top-0 bottom-0 w-8 sm:w-9 rounded-l-[4px] overflow-hidden"
          style={{
            background:
              'linear-gradient(to right, rgba(0,0,0,0.4) 0%, rgba(255,255,255,0.15) 30%, rgba(0,0,0,0.18) 75%, rgba(0,0,0,0.45) 100%)',
            borderRight: '1px solid rgba(0,0,0,0.35)',
          }}
        >
          {/* 4 Raised Spine Hubs / Ribs for Luxury Tuscan Leather */}
          {isLuxury && (
            <div className="absolute inset-y-0 left-0 right-0 flex flex-col justify-between py-12 opacity-80">
              <span className="h-[3px] bg-black/70 shadow-[0_1px_1px_rgba(255,255,255,0.25)]" />
              <span className="h-[3px] bg-black/70 shadow-[0_1px_1px_rgba(255,255,255,0.25)]" />
              <span className="h-[3px] bg-black/70 shadow-[0_1px_1px_rgba(255,255,255,0.25)]" />
              <span className="h-[3px] bg-black/70 shadow-[0_1px_1px_rgba(255,255,255,0.25)]" />
            </div>
          )}
        </div>

        {/* =====================================================================
            3. FORMAT-SPECIFIC COVER DETAILS
           ===================================================================== */}

        {/* FORMAT 1: SLIP-IN ALBUM (Beveled Cameo Aperture + Brass Corners) */}
        {isSlipIn && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 pl-12">
            {/* Antiqued Brass Protective Corners */}
            <span className="absolute top-2 left-10 w-4 h-4 border-t-2 border-l-2 border-[#C5A880] rounded-tl-[1px] shadow-sm pointer-events-none" />
            <span className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#C5A880] rounded-tr-[1px] shadow-sm pointer-events-none" />
            <span className="absolute bottom-2 left-10 w-4 h-4 border-b-2 border-l-2 border-[#C5A880] rounded-bl-[1px] shadow-sm pointer-events-none" />
            <span className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#C5A880] rounded-br-[1px] shadow-sm pointer-events-none" />

            {/* Inset Beveled Archival Mat Cameo Window */}
            <div
              className="relative w-36 sm:w-44 h-44 sm:h-52 rounded-[2px] p-2.5 bg-[#F3F1E8] shadow-inner"
              style={{
                boxShadow:
                  'inset 2px 3px 8px rgba(0,0,0,0.55), 1px 1px 0 rgba(255,255,255,0.2)',
              }}
            >
              {/* Photo inside Cameo */}
              <div className="w-full h-full overflow-hidden rounded-[1px] relative shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                  alt="Cameo portrait inside archival slip-in window"
                  className="w-full h-full object-cover filter contrast-[1.05]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
              </div>
            </div>

            <span className="mt-4 font-serif text-[10px] sm:text-[11px] text-white/70 tracking-widest-luxury uppercase font-medium">
              Archival Slip-in Folio
            </span>
          </div>
        )}

        {/* FORMAT 2: FLUSH MOUNT ALBUM (Slate Linen + Acrylic Cameo + Blind Deboss) */}
        {isFlushMount && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 pl-12">
            {/* Acrylic Glass Cameo Plate */}
            <div
              className="relative w-40 sm:w-48 h-32 sm:h-38 rounded-[2px] p-1 bg-white/10 border border-white/25 shadow-lg mb-4"
              style={{
                boxShadow:
                  '0 8px 20px rgba(0,0,0,0.35), inset 0 0 10px rgba(255,255,255,0.2)',
              }}
            >
              <div className="w-full h-full overflow-hidden rounded-[1px] relative">
                <img
                  src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80"
                  alt="Panoramic sunset wedding portrait"
                  className="w-full h-full object-cover filter contrast-[1.08]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Deep Blind-Debossed Frame */}
            <div
              className="w-40 sm:w-48 py-2.5 px-3 border border-white/20 rounded-[2px] text-center"
              style={{
                boxShadow:
                  'inset 1px 1px 3px rgba(0,0,0,0.5), 1px 1px 1px rgba(255,255,255,0.1)',
              }}
            >
              <span className="font-serif text-sm sm:text-base text-white/90 tracking-[0.22em] uppercase font-light block">
                Flush Mount
              </span>
              <span className="font-sans text-[8px] text-white/60 tracking-[0.28em] uppercase mt-0.5 block">
                180° Layflat Rigid Core
              </span>
            </div>
          </div>
        )}

        {/* FORMAT 3: PHOTO BOOK (Natural Oat Linen + Minimalist Cover Stamping) */}
        {isPhotoBook && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 pl-12">
            <div className="w-44 sm:w-52 py-8 px-4 border border-charcoal/20 rounded-[2px] text-center bg-white/10 backdrop-blur-2xs">
              <span className="font-serif text-2xl sm:text-3xl text-charcoal/85 tracking-[0.18em] uppercase font-medium block">
                Memoirs
              </span>
              <span className="w-8 h-px bg-charcoal/35 mx-auto my-3 block" />
              <p className="font-sans text-[9px] sm:text-[10px] text-charcoal/60 tracking-[0.3em] uppercase">
                Contemporary Editorial
              </p>
              <span className="mt-4 inline-block font-sans text-[8px] text-charcoal/40 tracking-widest uppercase">
                Fine Art Paper Series
              </span>
            </div>

            {/* Black Silk Bookmark Ribbon Peeking from Bottom */}
            <div className="absolute -bottom-4 left-24 w-3 h-8 bg-charcoal shadow-md rounded-b-[1px] transform -rotate-3" />
          </div>
        )}

        {/* FORMAT 4: LUXURY LEATHER ALBUM (Tuscan Leather + 24k Gold Foil Frame) */}
        {isLuxury && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-8 pl-12">
            <div
              className="w-44 sm:w-54 h-60 sm:h-72 border-2 border-[#D4AF37]/80 rounded-[3px] p-1.5 flex flex-col items-center justify-center text-center"
              style={{
                boxShadow:
                  '0 0 16px rgba(212, 175, 55, 0.25), inset 0 0 12px rgba(0,0,0,0.5)',
              }}
            >
              <div className="w-full h-full border border-[#D4AF37]/50 p-4 sm:p-5 flex flex-col items-center justify-between">
                <span className="w-3 h-3 border-t border-l border-[#D4AF37]/80 self-start" />
                
                <div className="my-auto">
                  <span className="font-serif text-2xl sm:text-3xl text-[#F2DE9C] tracking-[0.22em] uppercase font-normal drop-shadow-md block">
                    Heirloom
                  </span>
                  <span className="w-12 h-px bg-[#D4AF37]/90 mx-auto my-3.5 block" />
                  <span className="font-sans text-[9px] sm:text-[10px] text-[#F2DE9C]/80 tracking-[0.3em] uppercase block">
                    Tuscan Leather
                  </span>
                  <span className="font-sans text-[8px] text-[#F2DE9C]/60 tracking-[0.2em] uppercase mt-1 block">
                    Hand-Tooled Edition
                  </span>
                </div>

                <span className="w-3 h-3 border-b border-r border-[#D4AF37]/80 self-end" />
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            4. REALISTIC PHYSICAL PAGE BLOCK EDGES
           ===================================================================== */}
        {/* Right Edge: Visible Page Layers & Substrate Core */}
        <div
          className={`absolute top-[2px] bottom-[2px] right-[-11px] sm:right-[-15px] rounded-r-[2px] overflow-hidden ${
            isFlushMount
              ? 'w-[11px] sm:w-[15px] bg-white border-y border-r border-charcoal/25 shadow-inner'
              : isLuxury
              ? 'w-[11px] sm:w-[15px] bg-[#C5A030] shadow-[inset_-2px_0_5px_rgba(0,0,0,0.35)]'
              : isPhotoBook
              ? 'w-[7px] sm:w-[9px] bg-[#DED8C6] border-r border-charcoal/15'
              : 'w-[9px] sm:w-[12px] bg-[#DED8C6] border-r border-charcoal/20'
          }`}
          style={{
            transform: 'rotateY(90deg) translateZ(0)',
            transformOrigin: 'left center',
          }}
        >
          {/* Flush Mount: Distinctive 1.5mm Rigid Composite Core Lines */}
          {isFlushMount && (
            <div className="w-full h-full flex flex-col justify-around py-2.5 opacity-70">
              <span className="h-px bg-charcoal/25" />
              <span className="h-px bg-charcoal/25" />
              <span className="h-px bg-charcoal/25" />
              <span className="h-px bg-charcoal/25" />
              <span className="h-px bg-charcoal/25" />
              <span className="h-px bg-charcoal/25" />
              <span className="h-px bg-charcoal/25" />
            </div>
          )}

          {/* Luxury Albums: Shimmering 24k Gold Leaf Page Edges */}
          {isLuxury && (
            <div
              className="w-full h-full"
              style={{
                background:
                  'linear-gradient(to bottom, #F5E6A3 0%, #B8860B 35%, #F5E6A3 65%, #996515 100%)',
              }}
            />
          )}

          {/* Photo Book: Fine trimmed paper lines */}
          {isPhotoBook && (
            <div className="w-full h-full flex flex-col justify-around py-3 opacity-40">
              <span className="h-px bg-charcoal/20" />
              <span className="h-px bg-charcoal/20" />
              <span className="h-px bg-charcoal/20" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
