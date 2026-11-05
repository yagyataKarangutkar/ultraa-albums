import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Phone } from 'lucide-react';
import Button from '../components/common/Button';
import SectionHeading from '../components/common/SectionHeading';
import FadeIn from '../components/common/FadeIn';
import Hero from '../components/hero/Hero';
import SignatureFormats from '../components/formats/SignatureFormats';
import AlbumShowroom from '../components/showroom/AlbumShowroom';

import { services } from '../data/services';
import { companyInfo } from '../data/company';

export default function Home() {

  return (
    <div className="w-full relative bg-light-grey">
      {/* =========================================================================
          SECTION 1: HERO
          Full-viewport 100svh photography, bottom-left headline + wavy underline,
          bottom-right 5-tile thumbnail scene changer with auto-advance.
         ========================================================================= */}
      <Hero />

      {/* =========================================================================
          SECTION 2: SIGNATURE FORMAT FAMILIES (SCROLL-DRIVEN)
          Pinned 100svh section scrubbed to scroll with GSAP ScrollTrigger.
          Color scrubs across Light Grey -> Pale Blush -> Misty Blue -> Oak Wood -> Nordic Blue.
         ========================================================================= */}
      <SignatureFormats />

      {/* =========================================================================
          SECTION 3: 3D ALBUM SHOWROOM & MORE COLLECTIONS
         ========================================================================= */}
      <AlbumShowroom />

      {/* =========================================================================
          SECTION 4: BESPOKE STUDIO SERVICES
          Editorial 3-column layout with authentic wedding imagery
         ========================================================================= */}
      <section className="relative z-30 bg-white py-16 sm:py-24 border-b border-[#E5E1DA] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-2xl mb-12 sm:mb-16">
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#77736E] font-medium block mb-2">
                Atelier Services
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-normal leading-tight">
                Design & Post-Production for Visual Storytellers
              </h2>
              <p className="mt-3 text-sm text-[#77736E] font-light leading-relaxed">
                Dedicated layout artists and color specialists supporting wedding studios worldwide.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            {services.map((service, idx) => {
              const cardDirection = idx === 0 ? 'left' : idx === 1 ? 'up' : 'right';
              return (
                <FadeIn key={service.id} delay={idx * 0.08} direction={cardDirection} distance={28}>
                  <div className="group flex flex-col justify-between h-full">
                    <div>
                      <div className="overflow-hidden rounded-[1px] mb-5 border border-[#E5E1DA]">
                        <img
                          src={service.image}
                          alt={service.alt || service.title}
                          className="w-full aspect-[16/10] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>

                      <span className="text-[9.5px] uppercase font-sans tracking-widest text-[#77736E] font-medium block mb-1">
                        {service.badge}
                      </span>

                      <h3 className="font-serif text-2xl text-[#111111] group-hover:text-black transition-colors">
                        {service.title}
                      </h3>

                      <p className="mt-2.5 text-xs sm:text-[13px] text-[#77736E] leading-relaxed font-light">
                        {service.shortDescription}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#E5E1DA]/60">
                      <Link
                        to="/services"
                        className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider text-[#111111] hover:text-[#77736E] transition-colors font-medium"
                      >
                        <span>Explore Service</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: THE WORKSHOP & CRAFTSMANSHIP
          One strong brand statement + authentic Mumbai bindery photography
         ========================================================================= */}
      <section className="relative z-30 bg-[#FAF9F6] py-16 sm:py-24 border-b border-[#E5E1DA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Story Column */}
            <div className="lg:col-span-6 space-y-5 text-sm sm:text-base text-[#77736E] font-light leading-relaxed">
              <FadeIn direction="left" distance={32}>
                <span className="text-[10px] uppercase font-sans tracking-widest text-[#77736E] font-medium block mb-2">
                  The Workshop
                </span>

                <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-normal leading-tight">
                  Handcrafted in Mumbai for Professional Photographers Worldwide.
                </h2>

                <p className="pt-2">
                  Ultra Albums manufactures bespoke wedding albums, flush mount books, and presentation cases from our dedicated bindery in Dahisar East, Mumbai.
                </p>

                <p>
                  Rather than relying on automated assembly lines, our craftspeople hand-score every fold, hand-apply reinforced library-grade cloth spines, and inspect every print under calibrated 5000K daylight illumination.
                </p>

                <div className="pt-4 flex items-center gap-4">
                  <Button to="/about-us" variant="primary" size="md">
                    Read Our Story
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

            {/* Right Photography Column */}
            <div className="lg:col-span-6">
              <FadeIn delay={0.12} direction="right" distance={32}>
                <div className="border border-[#E5E1DA] bg-white p-2 rounded-[2px] shadow-sm overflow-hidden group">
                  <div className="overflow-hidden rounded-[1px]">
                    <img
                      src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80"
                      alt="Artisanal bookbinder inspecting handcrafted leather spine and foil debossing in workshop"
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="py-2.5 text-center text-[10px] uppercase font-sans tracking-widest text-[#77736E]">
                    Dahisar East Bindery • Handcrafted Quality Control
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* 4 Quiet Craft Standards */}
          <div className="mt-16 pt-12 border-t border-[#E5E1DA] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FadeIn delay={0.05} direction="up" distance={20}>
              <div>
                <span className="font-serif text-lg text-[#111111] block mb-1">01 / Archival Core</span>
                <p className="text-xs text-[#77736E] font-light leading-relaxed">
                  Rigid unwarping composite substrates with silver halide fine-art papers.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} direction="up" distance={20}>
              <div>
                <span className="font-serif text-lg text-[#111111] block mb-1">02 / Seamless Layflat</span>
                <p className="text-xs text-[#77736E] font-light leading-relaxed">
                  180° uninterrupted panoramic spreads with hand-scored micro-creases.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15} direction="up" distance={20}>
              <div>
                <span className="font-serif text-lg text-[#111111] block mb-1">03 / Human Proofing</span>
                <p className="text-xs text-[#77736E] font-light leading-relaxed">
                  Dedicated in-house designers preparing digital soft-copy proofs with unlimited revisions.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} direction="up" distance={20}>
              <div>
                <span className="font-serif text-lg text-[#111111] block mb-1">04 / Global Dispatch</span>
                <p className="text-xs text-[#77736E] font-light leading-relaxed">
                  Express air courier delivery in reinforced shockproof cases to studios worldwide.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: FINAL INVITATION
          Calm, confident, editorial CTA
         ========================================================================= */}
      <section className="bg-white py-16 sm:py-24 border-b border-[#E5E1DA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn direction="up" distance={30}>
            <span className="text-[10px] uppercase font-sans tracking-widest text-[#77736E] font-medium block mb-2">
              Commission an Heirloom
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl text-[#111111] font-normal leading-tight">
              Ready to elevate your studio deliverables?
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#77736E] font-light max-w-xl mx-auto leading-relaxed">
              Order a custom studio sample kit with genuine leather swatches or contact our Mumbai production desk for bespoke pricing.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button to="/contact-us" variant="primary" size="lg" icon={ArrowRight}>
                Request Studio Sample
              </Button>

              <Button
                href={companyInfo.cataloguePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                icon={Download}
              >
                Catalogue PDF
              </Button>
            </div>

            <p className="mt-6 text-xs text-[#77736E] font-light">
              Direct Mumbai Atelier Desk:{' '}
              <a href={companyInfo.phoneTel} className="text-[#111111] hover:underline font-medium">
                {companyInfo.phone}
              </a>
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

