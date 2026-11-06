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

    const target = document.getElementById('contact-section');
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="w-full max-w-md bg-white border border-[#E5E1DA] rounded-[2px] p-4 sm:p-5 text-[#111111] select-none shadow-xs"
      aria-label={`${name} Craft Specifications`}
    >
      {/* Compact 2x2 Specification Matrix */}
      <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-xs font-sans pb-3.5 border-b border-[#E5E1DA]">
        <div>
          <span className="text-[9px] uppercase tracking-widest text-[#77736E] font-medium block mb-0.5">
            Sizes
          </span>
          <span className="text-[12px] text-[#111111] font-normal leading-snug">
            {specs.sizes.slice(0, 3).join(', ')}
          </span>
        </div>

        <div>
          <span className="text-[9px] uppercase tracking-widest text-[#77736E] font-medium block mb-0.5">
            Turnaround
          </span>
          <span className="text-[12px] text-[#111111] font-normal leading-snug">
            {specs.productionLead}
          </span>
        </div>

        <div>
          <span className="text-[9px] uppercase tracking-widest text-[#77736E] font-medium block mb-0.5">
            Cover
          </span>
          <span className="text-[12px] text-[#111111] font-normal leading-snug truncate block" title={specs.coverOptions}>
            {specs.coverOptions.split(',').slice(0, 2).join(', ')}
          </span>
        </div>

        <div>
          <span className="text-[9px] uppercase tracking-widest text-[#77736E] font-medium block mb-0.5">
            Paper
          </span>
          <span className="text-[12px] text-[#111111] font-normal leading-snug truncate block">
            Archival Silver Halide
          </span>
        </div>
      </div>

      {/* Action Footers */}
      <div className="mt-3.5 flex items-center justify-between">
        <Button
          to={`/contact-us?service=${format.id}&album=${encodeURIComponent(enquirePrefill)}`}
          onClick={handleEnquireClick}
          variant="primary"
          size="sm"
          icon={ArrowRight}
          className="text-[10.5px] tracking-wider uppercase py-1.5 px-3.5"
        >
          Enquire
        </Button>

        <Link
          to={ctaHref}
          className="text-xs font-sans font-medium text-[#77736E] hover:text-[#111111] transition-colors uppercase tracking-wider"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}

