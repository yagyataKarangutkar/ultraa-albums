import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';
import Button from '../components/common/Button';
import FadeIn from '../components/common/FadeIn';
import InteriorPageHero from '../components/common/InteriorPageHero';

import { products } from '../data/products';
import { companyInfo } from '../data/company';
import { interiorHeroAssets } from '../data/interiorHeroAssets';

/**
 * Products / Collections Overview Page (Minimal Luxury Edition).
 * - Full-bleed photographic hero with text overlay.
 * - Minimal, quiet grid with spacious card layouts and hairline dividers.
 */
export default function Products() {
  return (
    <div className="w-full bg-white text-[#171717]">
      {/* Full-Bleed Photographic Hero Banner */}
      <InteriorPageHero {...interiorHeroAssets.products} />

      {/* Collections Grid */}
      <section className="py-20 sm:py-28 border-b border-[#E5E1DA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {products.map((product, idx) => {
              const cardDirection = idx % 3 === 0 ? 'left' : idx % 3 === 1 ? 'up' : 'right';
              return (
                <FadeIn key={product.id} delay={idx * 0.07} direction={cardDirection} distance={32}>
                  <ProductCard
                    product={product}
                    tone={idx % 2 === 0 ? 'oak' : 'misty'}
                  />
                </FadeIn>
              );
            })}
          </div>

          {/* Minimalist Studio Sample Callout */}
          <FadeIn direction="scale" distance={20} delay={0.15}>
            <div className="mt-20 p-8 sm:p-12 bg-[#F5F3EE] border border-[#E5E1DA] rounded-[2px] text-center max-w-2xl mx-auto shadow-2xs hover:shadow-md transition-shadow duration-300">
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#77736E] font-semibold block mb-2">
                Pro Sample Kits
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#171717] font-normal leading-tight">
                Order a Custom Studio Sample Kit
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-[#77736E] max-w-lg mx-auto leading-relaxed font-light">
                We provide discounted studio sample volumes with genuine leather swatches, archival core samples, and custom studio logo debossing.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Button to="/contact-us" variant="primary" size="md" icon={ArrowRight} className="hover:scale-[1.02] transition-transform">
                  Enquire for Sample Kit
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
