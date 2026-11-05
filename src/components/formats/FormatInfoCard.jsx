import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Maximize2, Sparkles, Clock, ShieldCheck, Box } from 'lucide-react';
import Button from '../common/Button';

/**
 * FormatInfoCard Component.
 * - Minimal luxury white card sliding up from bottom right as seen in the reference video.
 * - Displays authentic craft specifications: sizes, cover options, paper type, turnaround.
 * - Primary CTA: 'Enquire About This Album' smoothly navigating to ContactForm with pre-fill.
 * - Secondary Link: 'View details' / 'Explore in 3D Showroom'.
 */
export default function FormatInfoCard({ format, onEnquire }) {
  const { name, subtitle, specs, ctaHref, enquirePrefill } = format;

  const handleEnquireClick = (e) => {
    if (onEnquire) {
      e.preventDefault();
      onEnquire(format);
      return;
    }

    // Default smooth scroll to contact section
    const target = document.getElementById('contact-section');
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="w-full max-w-md bg-white border border-[#E5E1DA] shadow-sm rounded-[2px] p-5 sm:p-7 text-[#111111] select-none"
      aria-label={`${name} Craft Specifications`}
    >
      {/* Header Tag & Subtitle */}
      <div className="flex items-center justify-between border-b border-[#E5E1DA] pb-3.5 mb-4">
        <div>
          <span className="font-sans text-[9.5px] uppercase tracking-widest text-[#77736E] font-medium block mb-0.5">
            Craft Specifications
          </span>
          <h4 className="font-serif text-xl sm:text-2xl font-normal text-[#111111] leading-tight">
            {specs.formatType}
          </h4>
        </div>
        <span className="text-[10px] font-sans text-[#77736E] uppercase tracking-wider bg-[#F5F3EE] px-2.5 py-1 border border-[#E5E1DA] rounded-[1px]">
          {specs.productionLead}
        </span>
      </div>

      {/* Specification Key-Value Grid — Clean Minimal Typography */}
      <dl className="space-y-3.5 text-xs font-sans">
        {/* Available Sizes */}
        <div>
          <dt className="text-[9.5px] uppercase tracking-widest text-[#77736E] font-medium mb-1.5">
            Standard Pro Sizes
          </dt>
          <dd className="flex flex-wrap gap-1.5">
            {specs.sizes.map((size) => (
              <span
                key={size}
                className="px-2.5 py-0.5 bg-[#FAF9F6] text-[#111111] text-[11px] font-normal border border-[#E5E1DA] rounded-[1px]"
              >
                {size}
              </span>
            ))}
          </dd>
        </div>

        {/* Cover Materials */}
        <div className="pt-2.5 border-t border-[#E5E1DA]/60">
          <dt className="text-[9.5px] uppercase tracking-widest text-[#77736E] font-medium mb-1">
            Cover Materials
          </dt>
          <dd className="text-[#111111]/85 text-xs font-light leading-snug">
            {specs.coverOptions}
          </dd>
        </div>

        {/* Paper & Core */}
        <div className="pt-2.5 border-t border-[#E5E1DA]/60">
          <dt className="text-[9.5px] uppercase tracking-widest text-[#77736E] font-medium mb-1">
            Archival Paper & Core
          </dt>
          <dd className="text-[#111111]/85 text-xs font-light leading-snug">
            {specs.paperType}
          </dd>
        </div>

        {/* Binding Craft */}
        <div className="pt-2.5 border-t border-[#E5E1DA]/60">
          <dt className="text-[9.5px] uppercase tracking-widest text-[#77736E] font-medium mb-1">
            Artisanal Construction
          </dt>
          <dd className="text-[#111111]/85 text-xs font-light leading-snug">
            {specs.bindingCraft}
          </dd>
        </div>
      </dl>

      {/* Action Footers */}
      <div className="mt-6 pt-5 border-t border-[#E5E1DA] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Primary Enquire Button */}
        <Button
          to={`/contact-us?service=${format.id}&album=${encodeURIComponent(enquirePrefill)}`}
          onClick={handleEnquireClick}
          variant="primary"
          size="sm"
          icon={ArrowRight}
          className="text-xs tracking-wider uppercase justify-center"
        >
          Enquire About This Album
        </Button>

        {/* Secondary Detail Link */}
        <Link
          to={ctaHref}
          className="text-center sm:text-right text-xs font-sans font-medium text-[#77736E] hover:text-[#111111] transition-colors uppercase tracking-wider py-1"
        >
          View Details & 3D →
        </Link>
      </div>
    </div>
  );
}

