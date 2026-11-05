import React, { useState } from 'react';
import { BookOpen, Sparkles, ArrowRight, Download } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';
import FadeIn from '../common/FadeIn';

import Album3DProduct from './Album3DProduct';
import AlbumExperience from './AlbumExperience';
import CompactCatalogue from '../catalogue/CompactCatalogue';
import { showcaseAlbums } from '../../data/albums';
import { companyInfo } from '../../data/company';

/**
 * Premium 3D Album Showroom Section.
 * - Displays the 4 Showcase Albums in an interactive 3D showroom with GSAP hover effects.
 * - Displays the compressed, single-viewport Compact Catalogue & Presentation Suite.
 * - Opens the dedicated immersive 3D viewer when any showcase album is selected.
 */
export default function AlbumShowroom({ className = '' }) {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [triggerEl, setTriggerEl] = useState(null);

  const handleSelectAlbum = (album, element) => {
    setTriggerEl(element);
    setSelectedAlbum(album);
  };

  const handleCloseViewer = () => {
    setSelectedAlbum(null);
  };

  const handleSwitchAlbum = (album) => {
    setSelectedAlbum(album);
  };

  return (
    <section
      id="3d-album-showroom"
      className={`relative z-30 bg-white py-14 sm:py-20 lg:py-24 border-b border-charcoal/10 overflow-hidden ${className}`}
    >
      {/* Background Architectural Grid Accent */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #111111 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
            <SectionHeading
              label="Interactive 3D Showroom"
              title="Touch the Craft. Explore the Formats."
              subtitle="Select any flagship collection to inspect layflat panoramic bindings, archival mat insets, and artisanal cover finishing in full perspective."
            />

            <div className="mt-6 md:mt-0 flex-shrink-0 flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest-luxury text-nordic-blue-dark">
                <Sparkles className="w-3.5 h-3.5" />
                <span>3D Physical Simulation</span>
              </span>

              <Button
                href={companyInfo.cataloguePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                icon={Download}
              >
                Catalogue PDF
              </Button>
            </div>
          </div>
        </FadeIn>

        {/* 4 Showcase Album Products Floor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          {showcaseAlbums.map((album, idx) => {
            const albumDir = idx === 0 ? 'left' : idx === 3 ? 'right' : 'up';
            return (
              <FadeIn key={album.id} delay={idx * 0.08} direction={albumDir} distance={32} className="flex h-full">
                <Album3DProduct
                  album={album}
                  index={idx}
                  onSelect={handleSelectAlbum}
                />
              </FadeIn>
            );
          })}
        </div>

        {/* Compact Studio Note Information Strip */}
        <FadeIn delay={0.2} className="mt-6 sm:mt-8">
          <div className="px-3.5 py-2.5 sm:px-4 sm:py-2 bg-pale-blush/60 border border-charcoal/15 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal/70 gap-2.5">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-nordic-blue animate-pulse flex-shrink-0" />
              <span className="font-sans leading-normal">
                <strong className="font-semibold text-charcoal">Studio Note:</strong> Desktop users can hover to tilt and inspect physical album depth. Click any volume to browse panoramic inside spreads.
              </span>
            </div>

            <Button
              to="/collections"
              variant="ghost"
              size="sm"
              icon={ArrowRight}
              className="text-xs py-1 whitespace-nowrap flex-shrink-0"
            >
              Compare All Technical Specs
            </Button>
          </div>
        </FadeIn>

        {/* =========================================================================
            COMPACT COMPLETE CATALOGUE & PRESENTATION SECTION
            Fits within one desktop viewport (~560-640px height)
           ========================================================================= */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-charcoal/10">
          <CompactCatalogue />
        </div>
      </div>

      {/* Immersive 3D Album Experience Modal */}
      {selectedAlbum && (
        <AlbumExperience
          selectedAlbum={selectedAlbum}
          triggerElement={triggerEl}
          onClose={handleCloseViewer}
          onSwitchAlbum={handleSwitchAlbum}
        />
      )}
    </section>
  );
}
