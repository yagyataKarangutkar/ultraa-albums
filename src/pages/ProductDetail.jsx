import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Download, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import SectionLabel from '../components/common/SectionLabel';
import ImagePlaceholder from '../components/common/ImagePlaceholder';
import Button from '../components/common/Button';
import FadeIn from '../components/common/FadeIn';
import SlipInProductHero from '../components/products/SlipInProductHero';
import { products } from '../data/products';
import { companyInfo } from '../data/company';

export default function ProductDetail({ defaultSlug }) {
  const { slug } = useParams();
  const effectiveSlug = slug || defaultSlug;
  const product = products.find((p) => p.slug === effectiveSlug) || products[0];

  const isSlipIn = effectiveSlug === 'slip-in-albums';

  return (
    <div className="w-full">
      {/* Breadcrumb / Top Bar */}
      <div className="bg-light-grey/80 border-b border-charcoal/10 py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-sans">
          <div className="flex items-center gap-2 text-charcoal/60">
            <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-charcoal transition-colors">Products</Link>
            <span>/</span>
            <span className="text-charcoal font-medium">{product.title}</span>
          </div>

          <Link
            to="/products"
            className="hidden sm:inline-flex items-center gap-1 text-charcoal hover:text-ink-blue transition-colors uppercase tracking-wider-luxury text-[11px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Products</span>
          </Link>
        </div>
      </div>

      {/* Main Detail Section: Dedicated Tactile 3D Hero for Slip-in Albums vs Standard Collections */}
      {isSlipIn ? (
        <SlipInProductHero product={product} />
      ) : (
        <section className="bg-white py-12 sm:py-20 border-b border-charcoal/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Visual Column */}
              <div className="lg:col-span-7">
                <FadeIn direction="left" distance={40}>
                  <div className="border border-charcoal/15 bg-light-grey p-3 sm:p-4 rounded-[2px] shadow-sm hover:shadow-xl hover:border-charcoal/30 transition-all duration-500 group overflow-hidden">
                    <div className="overflow-hidden">
                      <ImagePlaceholder
                        src={product.image}
                        alt={product.alt || product.title}
                        subject={product.placeholderSubject}
                        aspect="4/3"
                        tone="oak"
                        className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="mt-3 px-2 flex items-center justify-between text-[11px] text-charcoal/50 font-sans">
                      <span>{product.title} — Mumbai Workshop Master Edition</span>
                      <span className="italic">Archival silver halide & fine-art media</span>
                    </div>
                  </div>

                  {/* Secondary Detail Photography Tiles */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="border border-charcoal/10 bg-soft-grey/60 p-2 rounded-[2px] overflow-hidden group hover:border-charcoal/30 transition-colors">
                      <div className="overflow-hidden">
                        <ImagePlaceholder
                          src={product.detailImage1}
                          alt={`${product.title} craftsmanship detail`}
                          subject="Macro close-up of spine stitching & foil deboss"
                          aspect="3/2"
                          tone="blush"
                          showBadge={false}
                          className="transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                    <div className="border border-charcoal/10 bg-sky-wash/40 p-2 rounded-[2px] overflow-hidden group hover:border-charcoal/30 transition-colors">
                      <div className="overflow-hidden">
                        <ImagePlaceholder
                          src={product.detailImage2}
                          alt={`${product.title} layflat core spread`}
                          subject="Open layflat seam detail showing flush mount core"
                          aspect="3/2"
                          tone="misty"
                          showBadge={false}
                          className="transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>

              {/* Spec / Info Column */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <FadeIn delay={0.12} direction="right" distance={40}>
                  <div>
                    <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal">
                      {product.title}
                    </h1>

                    <p className="text-xs uppercase font-sans tracking-widest text-[#77736E] mt-1 mb-4 font-medium">
                      {product.subtitle}
                    </p>

                    <p className="text-sm text-[#77736E] font-light leading-relaxed mb-6">
                      {product.overview}
                    </p>

                    {/* Key Craft Features */}
                    <div className="py-5 border-t border-b border-[#E5E1DA]">
                      <h3 className="text-[10px] font-sans uppercase tracking-widest text-[#111111] font-medium mb-3">
                        Craft Specifications
                      </h3>
                      <ul className="space-y-2.5 text-xs text-[#77736E] font-light">
                        {product.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <Check className="w-3.5 h-3.5 text-[#111111] flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Standard Pro Dimensions */}
                    <div className="py-5 border-b border-charcoal/10">
                      <h3 className="text-xs font-sans uppercase tracking-widest-luxury text-charcoal font-semibold mb-2">
                        Available Sizes
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size) => (
                          <span
                            key={size}
                            className="px-2.5 py-1 bg-light-grey text-charcoal text-xs border border-charcoal/10 font-sans"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Cover Materials */}
                    <div className="py-5 border-b border-charcoal/10">
                      <h3 className="text-xs font-sans uppercase tracking-widest-luxury text-charcoal font-semibold mb-2">
                        Cover Materials & Swatches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {product.coverMaterials.map((mat) => (
                          <span
                            key={mat}
                            className="px-2.5 py-1 bg-white text-charcoal text-xs border border-charcoal/20 font-sans"
                          >
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-8 flex flex-col sm:flex-row gap-3">
                      <Button
                        to={`/contact-us?service=${product.slug}`}
                        variant="primary"
                        size="md"
                        className="w-full sm:w-auto"
                        icon={ArrowRight}
                      >
                        Enquire For Pricing
                      </Button>

                      <Button
                        href={companyInfo.cataloguePdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline"
                        size="md"
                        className="w-full sm:w-auto"
                        icon={Download}
                      >
                        PDF Catalogue
                      </Button>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trust Bar */}
      <section className="bg-[#FAF9F6] py-12 border-b border-[#E5E1DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-white border border-[#E5E1DA] rounded-[2px]">
              <ShieldCheck className="w-4 h-4 mx-auto text-[#111111] mb-2" />
              <h4 className="font-serif text-lg text-[#111111]">Archival Warranty</h4>
              <p className="mt-1 text-xs text-[#77736E] font-light">Rigid unwarping substrate & museum-grade inks</p>
            </div>
            <div className="p-6 bg-white border border-[#E5E1DA] rounded-[2px]">
              <Sparkles className="w-4 h-4 mx-auto text-[#111111] mb-2" />
              <h4 className="font-serif text-lg text-[#111111]">Human Layout Proofs</h4>
              <p className="mt-1 text-xs text-[#77736E] font-light">Digital soft-copy link & unlimited revisions</p>
            </div>
            <div className="p-6 bg-white border border-[#E5E1DA] rounded-[2px]">
              <Clock className="w-4 h-4 mx-auto text-[#111111] mb-2" />
              <h4 className="font-serif text-lg text-[#111111]">Worldwide Air Freight</h4>
              <p className="mt-1 text-xs text-[#77736E] font-light">Direct to studio doorstep in reinforced cases</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
