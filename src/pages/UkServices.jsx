import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Download, ArrowRight, Globe, Shield } from 'lucide-react';
import Button from '../components/common/Button';
import FadeIn from '../components/common/FadeIn';
import InteriorPageHero from '../components/common/InteriorPageHero';

import { companyInfo } from '../data/company';
import { mainNavConfig } from '../data/navigation';
import { interiorHeroAssets } from '../data/interiorHeroAssets';

/**
 * UK Services Page (Minimal Luxury Edition).
 * - Full-bleed photographic hero with text overlay.
 * - Minimal, quiet layout highlighting direct courier dispatch, archival warranty, and regional links.
 */
export default function UkServices() {
  const { ukSlug } = useParams();
  const location = useLocation();

  const ukNav = mainNavConfig.find((i) => i.name === 'UK');
  const matchedService = ukNav?.items.find((i) => i.path.endsWith(ukSlug || '')) || null;

  const title = matchedService ? matchedService.name : interiorHeroAssets.uk.title;
  const description = matchedService ? matchedService.subtitle : interiorHeroAssets.uk.description;

  return (
    <div className="w-full bg-white text-[#171717]">
      {/* Full-Bleed Photographic Hero Banner */}
      <InteriorPageHero
        {...interiorHeroAssets.uk}
        title={title}
        description={description}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'UK Services', href: '/uk' },
          ...(matchedService ? [{ label: matchedService.name }] : []),
        ]}
      />

      {/* Main Content Area */}
      <section className="py-20 sm:py-28 border-b border-[#E5E1DA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Story & Specifications Column */}
            <div className="lg:col-span-8 space-y-6 text-sm sm:text-base text-[#77736E] font-light leading-relaxed">
              <FadeIn>
                <span className="text-[10px] uppercase font-sans tracking-widest text-[#77736E] font-semibold block mb-2">
                  Great Britain & International
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal leading-tight">
                  Serving British Wedding & Portrait Studios
                </h2>

                <p className="pt-2">
                  Ultra Albums manufactures handcrafted flush mount books, luxury leather presentation folios, and custom boxes for professional wedding photographers across England, Scotland, Wales, and Northern Ireland.
                </p>

                <p>
                  All albums are handcrafted in our Mumbai bindery using archival rigid substrates, museum-grade silver halide photo papers, and genuine imported leathers, and delivered directly to British studio doorsteps via express air freight with end-to-end tracking.
                </p>

                {/* Minimalist 2-card advantage row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-6">
                  <div className="p-6 border border-[#E5E1DA] bg-[#F5F3EE] rounded-[2px]">
                    <Globe className="w-4 h-4 text-[#171717] mb-2.5" />
                    <h3 className="font-serif text-lg text-[#171717]">Express UK Air Freight</h3>
                    <p className="mt-1.5 text-xs text-[#77736E] font-light leading-relaxed">
                      Secure shockproof packaging with tracked DHL / FedEx air delivery to UK addresses.
                    </p>
                  </div>
                  <div className="p-6 border border-[#E5E1DA] bg-[#F5F3EE] rounded-[2px]">
                    <Shield className="w-4 h-4 text-[#171717] mb-2.5" />
                    <h3 className="font-serif text-lg text-[#171717]">Archival Warranty</h3>
                    <p className="mt-1.5 text-xs text-[#77736E] font-light leading-relaxed">
                      Rigid non-warping composite cores engineered to withstand British humidity variations.
                    </p>
                  </div>
                </div>

                <div className="pt-8 flex items-center gap-4">
                  <Button to="/contact-us?region=uk" variant="primary" size="md">
                    Enquire for UK Dispatch
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

            {/* Sidebar Navigation */}
            <div className="lg:col-span-4 space-y-6">
              <FadeIn delay={0.1}>
                <div className="p-6 bg-[#F5F3EE] border border-[#E5E1DA] rounded-[2px]">
                  <span className="text-[10px] uppercase font-sans tracking-widest text-[#77736E] font-semibold block mb-4">
                    UK Regional Offerings
                  </span>
                  <ul className="space-y-1 text-xs">
                    {ukNav?.items.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          className={`block py-2 px-3 rounded-[1px] transition-colors ${
                            location.pathname === item.path
                              ? 'bg-white font-medium text-[#171717] shadow-2xs border border-[#E5E1DA]'
                              : 'text-[#77736E] hover:text-[#171717] hover:bg-white/50'
                          }`}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
