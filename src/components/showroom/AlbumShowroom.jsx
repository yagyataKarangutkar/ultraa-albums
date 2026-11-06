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
      className={`relative z-30 bg-[#FAF9F6] py-16 sm:py-24 border-b border-[#E5E1DA] overflow-hidden ${className}`}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header — Centered on mobile, balanced split on desktop */}
        <FadeIn>
          <div className="flex flex-col items-center text-center md:flex-row md:items-end md:justify-between md:text-left mb-10 sm:mb-14">
            <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-2xl">
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#77736E] font-medium block mb-2">
                Interactive Showroom
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] leading-tight">
                Touch the Craft. Explore the Formats.
              </h2>
              <p className="mt-3 text-xs sm:text-sm md:text-base text-[#77736E] font-light leading-relaxed max-w-xl">
                Inspect layflat panoramic bindings, archival mat insets, and artisanal cover finishing in full perspective.
              </p>
            </div>

            <div className="mt-6 md:mt-0 flex-shrink-0 flex items-center justify-center gap-3">
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

        {/* 4 Showcase Album Products Floor — Centered in mobile view */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 items-stretch justify-items-center">
          {showcaseAlbums.map((album, idx) => {
            const albumDir = idx === 0 ? 'left' : idx === 3 ? 'right' : 'up';
            return (
              <FadeIn
                key={album.id}
                delay={idx * 0.08}
                direction={albumDir}
                distance={32}
                className="flex flex-col items-center justify-center h-full w-full mx-auto"
              >
                <Album3DProduct
                  album={album}
                  index={idx}
                  onSelect={handleSelectAlbum}
                />
              </FadeIn>
            );
          })}
        </div>

        {/* =========================================================================
            COMPACT COMPLETE CATALOGUE & PRESENTATION SECTION
           ========================================================================= */}
        <div className="mt-14 sm:mt-18 pt-10 sm:pt-14 border-t border-[#E5E1DA]">
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
