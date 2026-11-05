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
      className="w-full max-w-md bg-white border border-charcoal/15 shadow-xl sm:shadow-2xl rounded-[3px] p-5 sm:p-7 text-charcoal select-none"
      aria-label={`${name} Craft Specifications`}
    >
      {/* Header Tag & Subtitle */}
      <div className="flex items-center justify-between border-b border-charcoal/10 pb-3 mb-4">
        <div>
          <span className="font-sans text-[10px] uppercase tracking-widest-luxury text-ink-blue font-semibold">
            Craft Specifications
          </span>
          <h4 className="font-serif text-lg sm:text-xl font-normal text-charcoal leading-tight">
            {specs.formatType}
          </h4>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-sans text-charcoal/65 uppercase tracking-wider bg-light-grey/80 px-2 py-1 border border-charcoal/10 rounded-[1px]">
          <Clock className="w-3 h-3 text-ink-blue flex-shrink-0" />
          <span>{specs.productionLead}</span>
        </span>
      </div>

      {/* Specification Key-Value Grid */}
      <dl className="space-y-3.5 text-xs font-sans">
        {/* Available Sizes */}
        <div>
          <dt className="text-[10px] uppercase tracking-wider-luxury text-charcoal/60 font-semibold mb-1.5 flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-ink-blue flex-shrink-0" />
            <span>Standard Pro Sizes</span>
          </dt>
          <dd className="flex flex-wrap gap-1.5">
            {specs.sizes.map((size) => (
              <span
                key={size}
                className="px-2.5 py-0.5 bg-ivory text-charcoal text-[11px] font-medium border border-charcoal/15 rounded-[2px]"
              >
                {size}
              </span>
            ))}
          </dd>
        </div>

        {/* Cover Materials */}
        <div className="pt-2.5 border-t border-charcoal/8">
          <dt className="text-[10px] uppercase tracking-wider-luxury text-charcoal/60 font-semibold mb-1 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-ink-blue flex-shrink-0" />
            <span>Cover Materials</span>
          </dt>
          <dd className="text-charcoal/85 text-xs font-light leading-snug">
            {specs.coverOptions}
          </dd>
        </div>

        {/* Paper & Core */}
        <div className="pt-2.5 border-t border-charcoal/8">
          <dt className="text-[10px] uppercase tracking-wider-luxury text-charcoal/60 font-semibold mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-ink-blue flex-shrink-0" />
            <span>Archival Paper & Core</span>
          </dt>
          <dd className="text-charcoal/85 text-xs font-light leading-snug">
            {specs.paperType}
          </dd>
        </div>

        {/* Binding Craft */}
        <div className="pt-2.5 border-t border-charcoal/8">
          <dt className="text-[10px] uppercase tracking-wider-luxury text-charcoal/60 font-semibold mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-ink-blue flex-shrink-0" />
            <span>Artisanal Construction</span>
          </dt>
          <dd className="text-charcoal/85 text-xs font-light leading-snug">
            {specs.bindingCraft}
          </dd>
        </div>
      </dl>

      {/* Action Footers */}
      <div className="mt-6 pt-5 border-t border-charcoal/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
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
          className="text-center sm:text-right text-xs font-sans font-medium text-charcoal/70 hover:text-ink-blue transition-colors uppercase tracking-wider py-1"
        >
          View Details & 3D →
        </Link>
      </div>
    </div>
  );
}

