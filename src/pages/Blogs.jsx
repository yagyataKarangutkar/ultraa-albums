import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import Button from '../components/common/Button';
import FadeIn from '../components/common/FadeIn';
import InteriorPageHero from '../components/common/InteriorPageHero';

import { companyInfo } from '../data/company';
import { interiorHeroAssets } from '../data/interiorHeroAssets';

/**
 * Blogs / Atelier Journal Page (Minimal Luxury Edition).
 * - Full-bleed photographic hero with text overlay.
 * - Minimal, quiet editorial card grid with clean typography and generous whitespace.
 */
export default function Blogs() {
  const articles = [
    {
      title: 'The Art of Flush Mount Bookbinding: Why Core Thickness Matters',
      category: 'Craftsmanship',
      date: 'Studio Journal',
      summary:
        'An exploration into why 1.5mm archival composite cores prevent warping, eliminate wavy pages, and deliver the definitive layflat presentation.',
    },
    {
      title: 'Designing for Narrative Rhythm: Pacing Wedding Day Stories',
      category: 'Album Design',
      date: 'Design Atelier',
      summary:
        'How our in-house layout artists curate 6-7 thematic aesthetics to guide couples through emotional wedding day arcs.',
    },
    {
      title: 'Color Calibration for Print: Calibrating sRGB vs Adobe RGB for Fine Art Paper',
      category: 'Technical Lab',
      date: 'Color Lab',
      summary:
        'Practical studio recommendations for achieving 100% color fidelity between your display and physical silver halide photo papers.',
    },
  ];

  return (
    <div className="w-full bg-white text-[#171717]">
      {/* Full-Bleed Photographic Hero Banner */}
      <InteriorPageHero {...interiorHeroAssets.blogs} />

      {/* Articles Grid */}
      <section id="articles" className="py-14 sm:py-20 lg:py-28 border-b border-[#E5E1DA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {articles.map((art, idx) => {
              const cardDirection = idx === 0 ? 'left' : idx === 1 ? 'up' : 'right';
              return (
                <FadeIn key={idx} delay={idx * 0.1} direction={cardDirection} distance={36}>
                  <article className="border border-[#E5E1DA] p-6 sm:p-7 bg-[#F5F3EE]/50 hover:bg-white hover:border-[#171717]/40 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 rounded-[2px] flex flex-col justify-between h-full shadow-2xs group cursor-pointer">
                    <div>
                      <div className="flex items-center justify-between text-[10px] uppercase font-sans tracking-widest text-[#77736E] font-medium mb-3">
                        <span className="transition-colors group-hover:text-black">{art.category}</span>
                        <span className="text-[#77736E]/60">{art.date}</span>
                      </div>

                      <h3 className="font-serif text-xl sm:text-[22px] text-[#171717] mb-3 leading-snug group-hover:text-black transition-colors">
                        {art.title}
                      </h3>

                      <p className="text-xs sm:text-[13px] text-[#77736E] font-light leading-relaxed">
                        {art.summary}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#E5E1DA] flex items-center justify-between text-xs font-sans uppercase tracking-wider text-[#171717] font-medium">
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                    </div>
                  </article>
                </FadeIn>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <Button
              href={companyInfo.cataloguePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="md"
              icon={Download}
            >
              Download Complete Catalogue (PDF)
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
