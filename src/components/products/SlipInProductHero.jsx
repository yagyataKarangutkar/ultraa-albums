import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  Layers,
  Maximize2,
  Sparkles,
  ShieldCheck,
  Download,
  BookOpen,
  Check,
} from 'lucide-react';
import Button from '../common/Button';
import FadeIn from '../common/FadeIn';
import AlbumExperience from '../showroom/AlbumExperience';
import { showcaseAlbums } from '../../data/albums';
import { companyInfo } from '../../data/company';

/**
 * SlipInProductHero Component.
 * - Dedicated tactile 3D product stage for Slip-in Albums with pointer tilt & dynamic studio lighting.
 * - Separate, aligned horizontal material preview rail (Archival Buckram, Natural Silk, Classic Rexine).
 * - Refined Craft Specifications card with precise typography, chips, and 16px icons.
 * - Direct trigger connecting seamlessly into the 3D Interactive Showroom.
 * - Responsive 2-column layout with 0 horizontal overflow.
 */

// 3 Authentic Cover Material Options
const COVER_MATERIALS = [
  {
    id: 'buckram',
    name: 'Archival Buckram',
    toneLabel: 'Obsidian Weave',
    coverColor: '#242424',
    textColor: '#FFFFFF',
    cornerColor: '#C5A880',
    foilColor: 'silver',
    texture: 'weave',
    sampleImage:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'silk',
    name: 'Natural Silk',
    toneLabel: 'Pearl Champagne',
    coverColor: '#E6E0D4',
    textColor: '#111111',
    cornerColor: '#D4AF37',
    foilColor: 'gold',
    texture: 'silk',
    sampleImage:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'rexine',
    name: 'Classic Rexine',
    toneLabel: 'Saddle Tan Leatherette',
    coverColor: '#6B4423',
    textColor: '#FFFFFF',
    cornerColor: '#C5A880',
    foilColor: 'gold',
    texture: 'leather',
    sampleImage:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
  },
];

export default function SlipInProductHero({ product }) {
  const [selectedMaterial, setSelectedMaterial] = useState(COVER_MATERIALS[0]);
  const [selectedSize, setSelectedSize] = useState('5 × 7 in');
  const [isShowroomOpen, setIsShowroomOpen] = useState(false);
  const [triggerEl, setTriggerEl] = useState(null);

  // 3D Pointer Tilt & Dynamic Lighting state
  const stageRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 8, rotateY: -12, transX: 0, transY: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 35, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch devices to disable pointer tilt
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isTouch = window.matchMedia('(hover: none)').matches;
      setIsTouchDevice(isTouch);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (isTouchDevice || !stageRef.current) return;

    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // 0 to width
    const y = e.clientY - rect.top; // 0 to height

    // Normalize coordinates from -1 to 1
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    // Restrained rotation: max 5deg on X, 6deg on Y
    const rotX = 8 - normY * 5;
    const rotY = -12 + normX * 6;
    const transX = normX * 4;
    const transY = normY * 3;

    setTilt({
      rotateX: rotX,
      rotateY: rotY,
      transX,
      transY,
    });

    setSpotlight({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.22,
    });
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly ease back to neutral rest position
    setTilt({ rotateX: 8, rotateY: -12, transX: 0, transY: 0 });
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleOpenShowroom = (e) => {
    setTriggerEl(e.currentTarget);
    setIsShowroomOpen(true);
  };

  const slipInAlbumData =
    showcaseAlbums.find((a) => a.id === 'slip-in-albums') || showcaseAlbums[0];

  return (
    <div className="w-full">
      {/* =========================================================================
          MAIN EDITORIAL TWO-COLUMN PRODUCT SECTION
         ========================================================================= */}
      <section className="bg-white py-10 sm:py-16 lg:py-20 border-b border-charcoal/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start min-w-0">
            
            {/* ===================================================================
                LEFT COLUMN (55%): 3D Physical Album Stage + Material Preview Rail
               =================================================================== */}
            <div className="lg:col-span-7 flex flex-col items-center min-w-0">
              <FadeIn>
                {/* 1. Main 3D Album Stage */}
                <div
                  ref={stageRef}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="relative w-full max-w-[480px] h-[390px] sm:h-[450px] md:h-[490px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
                  style={{ perspective: '1200px' }}
                  aria-label="3D Interactive Slip-in Album Presentation"
                >
                  {/* Multi-layer Ambient Contact Shadow beneath album */}
                  <div
                    className="absolute bottom-5 sm:bottom-7 w-[82%] h-12 bg-black/45 rounded-full filter blur-xl transition-all duration-500 pointer-events-none"
                    style={{
                      transform: `rotateX(82deg) translateZ(-60px) scale(${
                        isHovered ? 1.18 : 1.12
                      })`,
                      opacity: isHovered ? 0.75 : 0.65,
                    }}
                  />
                  <div
                    className="absolute bottom-3 sm:bottom-5 w-[65%] h-8 bg-black/30 rounded-full filter blur-md pointer-events-none"
                    style={{
                      transform: 'rotateX(82deg) translateZ(-40px) scale(1.05)',
                    }}
                  />

                  {/* Physical 3D Album Body */}
                  <div
                    className="relative w-64 sm:w-76 md:w-84 h-80 sm:h-96 md:h-[415px] rounded-[3px]"
                    style={{
                      transform: `rotateY(${tilt.rotateY}deg) rotateX(${tilt.rotateX}deg) translate3d(${tilt.transX}px, ${tilt.transY}px, 0)`,
                      transformStyle: 'preserve-3d',
                      backgroundColor: selectedMaterial.coverColor,
                      boxShadow: isHovered
                        ? '18px 26px 60px rgba(0, 0, 0, 0.38), 6px 10px 22px rgba(0, 0, 0, 0.25), inset -1px 0 2px rgba(255, 255, 255, 0.15)'
                        : '14px 22px 50px rgba(0, 0, 0, 0.32), 4px 8px 16px rgba(0, 0, 0, 0.2), inset -1px 0 2px rgba(255, 255, 255, 0.1)',
                      transition: isHovered
                        ? 'transform 0.12s ease-out, background-color 0.4s ease, box-shadow 0.3s ease'
                        : 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.4s ease, box-shadow 0.5s ease',
                    }}
                  >
                    {/* Material Surface Grain Overlay */}
                    <div
                      className={`absolute inset-0 rounded-[3px] opacity-25 pointer-events-none mix-blend-overlay ${
                        selectedMaterial.id === 'buckram'
                          ? 'bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:5px_5px]'
                          : selectedMaterial.id === 'silk'
                          ? 'bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:3px_3px]'
                          : 'bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:6px_6px]'
                      }`}
                    />

                    {/* Dynamic Studio Light Follower */}
                    <div
                      className="absolute inset-0 rounded-[3px] pointer-events-none transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,${spotlight.opacity}) 0%, transparent 65%)`,
                      }}
                    />

                    {/* Ambient Rim Highlight & Subtle Border */}
                    <div className="absolute inset-0 rounded-[3px] bg-gradient-to-tr from-black/20 via-transparent to-white/20 pointer-events-none" />
                    <div className="absolute inset-0 rounded-[3px] border border-white/20 pointer-events-none" />

                    {/* Realistic Rounded Book Spine (Left side with highlight & groove) */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-8 sm:w-9 rounded-l-[3px] overflow-hidden"
                      style={{
                        background:
                          'linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(255,255,255,0.18) 32%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0.48) 100%)',
                        borderRight: '1px solid rgba(0,0,0,0.4)',
                      }}
                    />

                    {/* Antiqued Protective Metal Corners */}
                    <span
                      className="absolute top-2 left-10 w-4 h-4 border-t-2 border-l-2 rounded-tl-[1px] shadow-sm pointer-events-none transition-colors duration-400"
                      style={{ borderColor: selectedMaterial.cornerColor }}
                    />
                    <span
                      className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 rounded-tr-[1px] shadow-sm pointer-events-none transition-colors duration-400"
                      style={{ borderColor: selectedMaterial.cornerColor }}
                    />
                    <span
                      className="absolute bottom-2 left-10 w-4 h-4 border-b-2 border-l-2 rounded-bl-[1px] shadow-sm pointer-events-none transition-colors duration-400"
                      style={{ borderColor: selectedMaterial.cornerColor }}
                    />
                    <span
                      className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 rounded-br-[1px] shadow-sm pointer-events-none transition-colors duration-400"
                      style={{ borderColor: selectedMaterial.cornerColor }}
                    />

                    {/* Inset Beveled Archival Mat Cameo Window */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 pl-12">
                      <div
                        className="relative w-38 sm:w-46 h-46 sm:h-54 rounded-[2px] p-2.5 bg-[#F3F1E8] shadow-inner transition-transform duration-300"
                        style={{
                          boxShadow:
                            'inset 2px 3px 8px rgba(0,0,0,0.55), 1px 1px 0 rgba(255,255,255,0.25)',
                        }}
                      >
                        {/* Genuine Portrait Inside Mat Aperture */}
                        <div className="w-full h-full overflow-hidden rounded-[1px] relative shadow-inner">
                          <img
                            src={selectedMaterial.sampleImage}
                            alt="Cameo portrait inside archival slip-in window"
                            className="w-full h-full object-cover filter contrast-[1.05] transition-opacity duration-400"
                            loading="eager"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 pointer-events-none" />
                        </div>
                      </div>

                      {/* Hot-foil Debossed Edition Tag */}
                      <span
                        className="mt-3.5 font-serif text-[10px] sm:text-[11px] tracking-widest-luxury uppercase font-medium transition-colors duration-300"
                        style={{ color: selectedMaterial.textColor, opacity: 0.8 }}
                      >
                        Archival Slip-in Folio
                      </span>
                    </div>

                    {/* Physical Page Block: Layered acid-free mat board edges */}
                    <div
                      className="absolute top-[2px] bottom-[2px] right-[-10px] sm:right-[-13px] w-[10px] sm:w-[13px] rounded-r-[2px] bg-[#DED8C6] border-y border-r border-charcoal/25 overflow-hidden"
                      style={{
                        transform: 'rotateY(90deg) translateZ(0)',
                        transformOrigin: 'left center',
                      }}
                    >
                      {/* Layered Mat Core Lines */}
                      <div className="w-full h-full flex flex-col justify-around py-2.5 opacity-60">
                        <span className="h-px bg-charcoal/25" />
                        <span className="h-px bg-charcoal/25" />
                        <span className="h-px bg-charcoal/25" />
                        <span className="h-px bg-charcoal/25" />
                        <span className="h-px bg-charcoal/25" />
                        <span className="h-px bg-charcoal/25" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interaction Cue (Desktop Only) */}
                <div className="hidden sm:flex items-center justify-center gap-1.5 mt-2 text-[11px] text-charcoal/50 font-sans tracking-wide">
                  <Sparkles className="w-3 h-3 text-ink-blue" />
                  <span>Move cursor over album to inspect 3D physical depth</span>
                </div>

                {/* ===============================================================
                    2. SEPARATE, ALIGNED MATERIAL PREVIEW RAIL
                   =============================================================== */}
                <div className="w-full max-w-md mt-6 pt-5 border-t border-charcoal/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-sans tracking-widest-luxury text-charcoal/60 font-semibold">
                      Select Cover Material
                    </span>
                    <span className="text-[11px] font-sans text-ink-blue font-medium">
                      {selectedMaterial.name} ({selectedMaterial.toneLabel})
                    </span>
                  </div>

                  {/* 3 Material Option Cards */}
                  <div
                    className="grid grid-cols-3 gap-2.5 sm:gap-3"
                    role="radiogroup"
                    aria-label="Slip-in Cover Materials"
                  >
                    {COVER_MATERIALS.map((mat) => {
                      const isSelected = mat.id === selectedMaterial.id;

                      return (
                        <button
                          key={mat.id}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => setSelectedMaterial(mat)}
                          className={`relative p-2 rounded-[2px] text-left transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-ink-blue ${
                            isSelected
                              ? 'border-charcoal bg-white shadow-md -translate-y-0.5'
                              : 'border-charcoal/15 bg-light-grey/60 hover:bg-white hover:border-charcoal/30 hover:-translate-y-0.5'
                          }`}
                        >
                          {/* Mini Swatch Thumbnail */}
                          <div
                            className="w-full h-8 sm:h-9 rounded-[1px] border border-black/15 shadow-inner mb-2 flex items-center justify-center relative overflow-hidden"
                            style={{ backgroundColor: mat.coverColor }}
                          >
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-white/40"
                              style={{ backgroundColor: mat.cornerColor }}
                            />
                            {isSelected && (
                              <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-white text-charcoal flex items-center justify-center shadow-xs">
                                <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                              </div>
                            )}
                          </div>

                          <span className="block font-sans text-[10px] sm:text-[11px] font-medium text-charcoal leading-tight truncate">
                            {mat.name}
                          </span>
                          <span className="block font-sans text-[9px] text-charcoal/50 tracking-wider truncate mt-0.5">
                            {mat.toneLabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* ===================================================================
                RIGHT COLUMN (45%): Editorial Content & Craft Specifications Card
               =================================================================== */}
            <div className="lg:col-span-5 flex flex-col justify-between min-w-0">
              <FadeIn delay={0.1}>
                {/* 1. Eyebrow, Main Heading, & Intro Copy */}
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-5 h-px bg-ink-blue" aria-hidden="true" />
                    <span className="font-sans text-[11px] uppercase tracking-widest-luxury text-ink-blue font-bold">
                      Self-Mount Window Portfolio
                    </span>
                  </div>

                  <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal leading-[1.05] tracking-tight mb-3">
                    Slip-in Albums
                  </h1>

                  <p className="font-sans text-xs sm:text-sm text-charcoal/75 font-light leading-relaxed mb-6 max-w-xl">
                    Classic slip-in pocket albums crafted with archival mats for instant
                    studio print assembly. Features bevelled frames that protect prints with
                    zero adhesives required.
                  </p>

                  {/* 2. Distinct Redesigned Craft Specifications Card */}
                  <div className="bg-white border border-charcoal/15 shadow-lg sm:shadow-xl rounded-[3px] p-5 sm:p-7 text-charcoal">
                    {/* Card Header Area */}
                    <div className="flex items-start justify-between pb-3.5 border-b border-charcoal/10">
                      <div>
                        <span className="font-sans text-[10px] uppercase tracking-widest-luxury text-charcoal/50 font-semibold block">
                          Craft Specifications
                        </span>
                        <h2 className="font-serif text-lg sm:text-xl font-normal text-charcoal leading-tight mt-0.5">
                          Slip-in Bevel Mat Folio
                        </h2>
                      </div>

                      <div className="flex items-center gap-1.5 text-[10px] font-sans text-charcoal/65 uppercase tracking-wider bg-light-grey/80 px-2 py-1 border border-charcoal/10 rounded-[1px] flex-shrink-0">
                        <Clock className="w-3 h-3 text-ink-blue flex-shrink-0" />
                        <span>4–6 business days</span>
                      </div>
                    </div>

                    {/* 4 Specification Groups with Clean Vertical Rhythm */}
                    <dl className="mt-4 space-y-4 text-xs font-sans">
                      {/* Group 1: Standard Pro Sizes */}
                      <div>
                        <dt className="text-[10px] uppercase tracking-widest-luxury text-charcoal/60 font-semibold mb-1.5 flex items-center gap-1.5">
                          <Maximize2 className="w-3.5 h-3.5 text-ink-blue flex-shrink-0" />
                          <span>Standard Pro Sizes</span>
                        </dt>
                        <dd className="flex flex-wrap gap-1.5 pt-0.5">
                          {['4 × 6 in', '5 × 7 in', '8 × 10 in'].map((size) => {
                            const isSizeActive = size === selectedSize;

                            return (
                              <button
                                key={size}
                                type="button"
                                onClick={() => setSelectedSize(size)}
                                className={`px-2.5 py-1 text-[11px] font-sans font-medium rounded-[1px] transition-all duration-150 border focus:outline-none focus:ring-1 focus:ring-ink-blue ${
                                  isSizeActive
                                    ? 'bg-charcoal text-white border-charcoal shadow-xs'
                                    : 'bg-light-grey text-charcoal border-charcoal/15 hover:border-charcoal/40 hover:bg-white'
                                }`}
                              >
                                {size}
                              </button>
                            );
                          })}
                        </dd>
                      </div>

                      {/* Group 2: Cover Materials */}
                      <div className="pt-3 border-t border-charcoal/8">
                        <dt className="text-[10px] uppercase tracking-widest-luxury text-charcoal/60 font-semibold mb-1 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-ink-blue flex-shrink-0" />
                          <span>Cover Materials</span>
                        </dt>
                        <dd className="text-charcoal/85 text-xs font-light leading-snug">
                          Archival Buckram, Natural Silk, Classic Rexine
                        </dd>
                      </div>

                      {/* Group 3: Archival Paper & Core */}
                      <div className="pt-3 border-t border-charcoal/8">
                        <dt className="text-[10px] uppercase tracking-widest-luxury text-charcoal/60 font-semibold mb-1 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-ink-blue flex-shrink-0" />
                          <span>Archival Paper & Core</span>
                        </dt>
                        <dd className="text-charcoal/85 text-xs font-light leading-snug">
                          Acid-free mat framing boards with pre-cut apertures
                        </dd>
                      </div>

                      {/* Group 4: Artisanal Construction */}
                      <div className="pt-3 border-t border-charcoal/8">
                        <dt className="text-[10px] uppercase tracking-widest-luxury text-charcoal/60 font-semibold mb-1 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-ink-blue flex-shrink-0" />
                          <span>Artisanal Construction</span>
                        </dt>
                        <dd className="text-charcoal/85 text-xs font-light leading-snug">
                          Reinforced stitched spine with optional metal corners
                        </dd>
                      </div>
                    </dl>

                    {/* Action Buttons inside Card */}
                    <div className="mt-6 pt-5 border-t border-charcoal/15 flex flex-col gap-2.5">
                      {/* Primary CTA: Enquire */}
                      <Button
                        to={`/contact-us?service=slip-in-albums&size=${encodeURIComponent(
                          selectedSize
                        )}&material=${encodeURIComponent(selectedMaterial.name)}`}
                        variant="primary"
                        size="md"
                        icon={ArrowRight}
                        className="w-full text-xs tracking-widest-luxury uppercase justify-center shadow-md font-semibold"
                      >
                        Enquire For Pricing ({selectedSize})
                      </Button>

                      {/* Secondary CTA: 3D Interactive Showroom */}
                      <button
                        type="button"
                        onClick={handleOpenShowroom}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-sans uppercase tracking-widest-luxury text-charcoal hover:text-ink-blue bg-light-grey/80 hover:bg-light-grey border border-charcoal/20 transition-all font-medium rounded-[1px] focus:outline-none focus:ring-2 focus:ring-ink-blue cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-ink-blue" />
                        <span>Explore in 3D Showroom</span>
                      </button>

                      {/* Tertiary: Download PDF */}
                      <div className="pt-1 text-center">
                        <a
                          href={companyInfo.cataloguePdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-sans text-charcoal/60 hover:text-ink-blue transition-colors uppercase tracking-wider underline-offset-4 hover:underline"
                        >
                          <Download className="w-3 h-3" />
                          <span>Download Technical Specifications (PDF)</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DEDICATED 3D INTERACTIVE SHOWROOM MODAL
          Seamlessly connected when 'Explore in 3D Showroom' is clicked.
         ========================================================================= */}
      {isShowroomOpen && (
        <AlbumExperience
          selectedAlbum={slipInAlbumData}
          triggerElement={triggerEl}
          onClose={() => setIsShowroomOpen(false)}
          onSwitchAlbum={(album) => {
            // Optional switch handler inside showroom
          }}
        />
      )}
    </div>
  );
}

