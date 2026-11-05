import React from 'react';
import { Download, MapPin, ArrowRight } from 'lucide-react';
import SectionLabel from '../components/common/SectionLabel';
import ImagePlaceholder from '../components/common/ImagePlaceholder';
import Button from '../components/common/Button';
import FadeIn from '../components/common/FadeIn';
import InteriorPageHero from '../components/common/InteriorPageHero';
import { interiorHeroAssets } from '../data/interiorHeroAssets';
import { companyInfo } from '../data/company';

/**
 * About Page (Minimal Luxury Atelier Edition).
 * - Image-overlay hero banner with text overlayed directly on the photo.
 * - Clean, spacious editorial reading layout with generous breathing room.
 * - Hairline dividers and quiet typography.
 */
export default function About() {
  return (
    <div className="w-full bg-white text-[#171717]">
      {/* Full-Bleed Photographic Hero Banner */}
      <InteriorPageHero {...interiorHeroAssets.about} />

      {/* Main Heritage & Philosophy Story */}
      <section className="py-20 sm:py-28 border-b border-[#E5E1DA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Story Text Column */}
            <div className="lg:col-span-6 space-y-6 text-sm sm:text-base text-[#77736E] font-light leading-relaxed">
              <FadeIn>
                <span className="text-[10px] uppercase font-sans tracking-widest text-[#77736E] font-semibold block mb-2">
                  Our Philosophy
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal leading-tight">
                  Built by Bookbinders for Visual Storytellers
                </h2>

                <p className="pt-2">
                  At Ultra Albums, we believe a wedding or family heirloom should endure for generations. In an era dominated by fleeting digital screens, a physical album remains the tangible touchstone of human memories.
                </p>

                <p>
                  From our production center in Dahisar East, Mumbai, we handcraft every volume using rigid non-warping composite cores, archival silver halide photo papers, and genuine leatherette, velvet, and buckram bookcloth covers.
                </p>

                <p>
                  Unlike mass consumer printers, each spread at Ultra Albums is scored, mounted, and inspected by hand under 5000K daylight illumination. We offer complete flexibility in embossing, acrylic cameo fronts, presentation folios, and custom dimensions.
                </p>
              </FadeIn>
            </div>

            {/* Artisanal Workshop Image */}
            <div className="lg:col-span-6">
              <FadeIn delay={0.15}>
                <div className="relative p-2 bg-[#F5F3EE] border border-[#E5E1DA] rounded-[2px] shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
                    alt="Master craftsman hand-gluing spine headband and aligning archival core album pages"
                    className="w-full aspect-[4/3] object-cover rounded-[1px]"
                    loading="lazy"
                  />
                  <div className="py-2 px-1 text-center text-[10.5px] uppercase font-sans tracking-widest text-[#77736E]">
                    Mumbai Atelier • Handcrafted Quality Control
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Studio Location & Direct Contact */}
      <section className="bg-[#F5F3EE] py-20 sm:py-24 border-b border-[#E5E1DA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="text-[10px] uppercase font-sans tracking-widest text-[#77736E] font-semibold block mb-2">
              Production Atelier
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal">
              Dahisar East Bindery & Studio
            </h3>
            <p className="mt-3 text-sm text-[#77736E] max-w-xl mx-auto leading-relaxed font-light">
              {companyInfo.address.full}
            </p>
            <p className="mt-2 text-xs text-[#77736E]">
              Direct Lab Line:{' '}
              <a href={companyInfo.phoneTel} className="text-[#171717] hover:underline font-medium">
                {companyInfo.phone}
              </a>
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <Button to="/contact-us" variant="primary" size="md">
                Contact Studio
              </Button>
              <Button
                href={companyInfo.cataloguePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="md"
                icon={Download}
              >
                Catalogue PDF
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
