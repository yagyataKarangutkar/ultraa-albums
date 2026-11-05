import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Check, Download } from 'lucide-react';
import { companyInfo } from '../../data/company';

/**
 * AlbumInformation Component (Quiet Luxury Gallery Edition).
 * - Clean, spacious editorial reading hierarchy for the 3D Showroom.
 * - Essential facts visible upfront; secondary technical details organized into refined accordions.
 * - Single calm primary CTA with pre-filled enquiry route.
 * - Colors: Deep Charcoal (#171717), Muted Warm Grey (#77736E), Thin Dividers (#E5E1DA).
 */
export default function AlbumInformation({ album, className = '' }) {
  const [openSection, setOpenSection] = useState(null);

  if (!album) return null;

  const toggleAccordion = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div
      className={`bg-white border border-[#E5E1DA] p-5 sm:p-6 lg:p-7 flex flex-col justify-between text-[#171717] shadow-sm rounded-[3px] max-h-none lg:max-h-[min(580px,82vh)] overflow-visible lg:overflow-hidden select-none ${className}`}
    >
      <div className="flex-1 min-h-0 overflow-y-auto pr-1">
        {/* Category Eyebrow */}
        <div className="flex items-center justify-between pb-2 border-b border-[#E5E1DA]">
          <span className="text-[10px] uppercase font-sans tracking-widest text-[#77736E] font-semibold">
            {album.badge || 'Fine Art Monograph'}
          </span>
          <span className="text-[9.5px] font-sans uppercase tracking-wider text-[#77736E]/70">
            Mumbai Pro Bindery
          </span>
        </div>

        {/* Title & Description */}
        <div className="mt-3">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#171717] leading-tight">
            {album.title}
          </h2>
          <span className="text-[11px] uppercase font-sans tracking-wider text-[#77736E] block mt-0.5">
            {album.subtitle}
          </span>
          <p className="mt-2 text-xs sm:text-[13px] text-[#77736E] font-light leading-relaxed">
            {album.overview}
          </p>
        </div>

        {/* Compact Formats / Sizes Row */}
        <div className="mt-4 pt-3 border-t border-[#E5E1DA]">
          <span className="block font-sans text-[10px] uppercase tracking-widest text-[#77736E] font-semibold mb-2">
            Available Formats
          </span>
          <div className="flex flex-wrap gap-1.5">
            {album.specs.sizes.map((size) => (
              <span
                key={size}
                className="px-2.5 py-1 bg-[#F5F3EE] text-[#171717] text-[11px] font-sans font-medium border border-[#E5E1DA] rounded-[1px]"
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        {/* Refined Secondary Details Accordions */}
        <div className="mt-5 pt-3 border-t border-[#E5E1DA] space-y-2">
          {/* Accordion 1: Substrate Core & Paper */}
          <div className="border-b border-[#E5E1DA] pb-2">
            <button
              type="button"
              onClick={() => toggleAccordion('core')}
              className="w-full flex items-center justify-between py-1.5 text-left text-xs font-sans uppercase tracking-wider text-[#171717] font-medium hover:text-black focus:outline-none"
            >
              <span>Substrate Core & Paper</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#77736E] transition-transform duration-200 ${
                  openSection === 'core' ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            {openSection === 'core' && (
              <div className="pt-1.5 pb-2 text-xs text-[#77736E] space-y-1.5 animate-fadeIn">
                <p>
                  <strong className="font-medium text-[#171717]">Core: </strong>
                  {album.specs.core}
                </p>
                <p>
                  <strong className="font-medium text-[#171717]">Calibration: </strong>
                  {album.specs.paper}
                </p>
              </div>
            )}
          </div>

          {/* Accordion 2: Cover Materials */}
          <div className="border-b border-[#E5E1DA] pb-2">
            <button
              type="button"
              onClick={() => toggleAccordion('cover')}
              className="w-full flex items-center justify-between py-1.5 text-left text-xs font-sans uppercase tracking-wider text-[#171717] font-medium hover:text-black focus:outline-none"
            >
              <span>Cover Materials & Finishes</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#77736E] transition-transform duration-200 ${
                  openSection === 'cover' ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            {openSection === 'cover' && (
              <div className="pt-1.5 pb-2 text-xs text-[#77736E] space-y-1.5 animate-fadeIn">
                <p className="mb-1 text-[11px] text-[#77736E]">
                  Sample bound in {album.cover.materialName}:
                </p>
                <div className="flex flex-wrap gap-1">
                  {album.specs.coverOptions.map((opt) => (
                    <span
                      key={opt}
                      className="px-2 py-0.5 bg-[#F5F3EE] text-[#171717] text-[10px] font-sans border border-[#E5E1DA] rounded-[1px]"
                    >
                      {opt}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Accordion 3: Artisanal Construction */}
          <div className="border-b border-[#E5E1DA] pb-2">
            <button
              type="button"
              onClick={() => toggleAccordion('craft')}
              className="w-full flex items-center justify-between py-1.5 text-left text-xs font-sans uppercase tracking-wider text-[#171717] font-medium hover:text-black focus:outline-none"
            >
              <span>Artisanal Finishing Options</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#77736E] transition-transform duration-200 ${
                  openSection === 'craft' ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            {openSection === 'craft' && (
              <div className="pt-1.5 pb-2 text-xs text-[#77736E] space-y-1 animate-fadeIn">
                {album.specs.finishing.map((fin, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                    <Check className="w-3 h-3 text-[#171717] flex-shrink-0" />
                    <span>{fin}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Enquire Button & Technical Specs PDF Link */}
      <div className="mt-4 pt-3.5 border-t border-[#E5E1DA] flex-shrink-0 space-y-2">
        <Link
          to={`/contact-us?service=${album.id}`}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-sans tracking-widest uppercase bg-[#171717] text-white hover:bg-black transition-colors rounded-[1px] font-semibold text-center shadow-xs"
        >
          <span>Enquire About {album.title}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <div className="flex items-center justify-between text-[10.5px] text-[#77736E] pt-0.5">
          <a
            href={companyInfo.cataloguePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-sans uppercase tracking-wider text-[#171717] hover:underline font-medium"
          >
            <Download className="w-3 h-3" />
            <span>Download Specs (PDF)</span>
          </a>

          <span className="font-sans text-[#77736E]/80">
            Studio bespoke orders
          </span>
        </div>
      </div>
    </div>
  );
}
