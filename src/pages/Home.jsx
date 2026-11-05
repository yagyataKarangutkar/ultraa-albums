import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, CheckCircle, Globe, ShieldCheck, BadgePercent, HeartHandshake, Phone, ArrowUpRight } from 'lucide-react';
import Button from '../components/common/Button';
import SectionHeading from '../components/common/SectionHeading';
import SectionLabel from '../components/common/SectionLabel';
import ImagePlaceholder from '../components/common/ImagePlaceholder';
import ProductCard from '../components/common/ProductCard';
import FadeIn from '../components/common/FadeIn';
import Hero from '../components/hero/Hero';
import SignatureFormats from '../components/formats/SignatureFormats';
import AlbumShowroom from '../components/showroom/AlbumShowroom';

import { products } from '../data/products';
import { services } from '../data/services';
import { advantages } from '../data/advantages';
import { processSteps } from '../data/process';
import { testimonials, testimonialsPlaceholderMeta } from '../data/testimonials';
import { companyInfo } from '../data/company';

export default function Home() {
  const advantageIcons = {
    Globe: Globe,
    BadgePercent: BadgePercent,
    ShieldCheck: ShieldCheck,
    HeartHandshake: HeartHandshake,
  };

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
          SECTION 4: SERVICES
          Album Designing, Image Editing, Wedding Photography
         ========================================================================= */}
      <section className="relative z-30 bg-soft-grey py-20 sm:py-28 border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl mb-14">
              <SectionHeading
                label="Full Pro Studio Support"
                title="End-to-End Design & Post-Production"
                subtitle="Eliminate layout bottlenecks. Let our human layout artists and digital darkroom specialists prepare your client deliveries."
              />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <FadeIn key={service.id} delay={idx * 0.06}>
                <div className="bg-white border border-charcoal/15 p-8 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] uppercase font-sans tracking-widest-luxury text-nordic-blue-dark font-semibold bg-light-grey px-2.5 py-1 border border-charcoal/10">
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl text-charcoal">{service.title}</h3>

                    <p className="mt-3 text-xs sm:text-sm text-charcoal/70 leading-relaxed font-light">
                      {service.shortDescription}
                    </p>

                    <div className="my-6">
                      <ImagePlaceholder
                        src={service.image}
                        alt={service.alt || service.title}
                        subject={service.placeholderSubject}
                        aspect="16/9"
                        tone="misty"
                        showBadge={false}
                      />
                    </div>

                    <ul className="space-y-2 mt-4 text-xs text-charcoal/80 font-light">
                      {service.features.slice(0, 3).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-nordic-blue-dark flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-charcoal/10">
                    <Button to="/services" variant="ghost" size="sm" icon={ArrowRight}>
                      Explore Service Details
                    </Button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: ABOUT ULTRA ALBUMS (Mumbai Lab & Heritage)
         ========================================================================= */}
      <section className="relative z-20 bg-white py-20 sm:py-28 border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <FadeIn>
                <SectionLabel withLine theme="light" className="mb-3">
                  The Workshop
                </SectionLabel>

                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal leading-tight">
                  Handcrafted in Mumbai for Professional Photographers Worldwide.
                </h2>

                <div className="mt-6 space-y-4 text-sm sm:text-base text-charcoal/75 font-light leading-relaxed">
                  <p>
                    Ultra Albums manufactures bespoke wedding albums, flush mount books, and presentation cases from our dedicated production facility in Dahisar East, Mumbai.
                  </p>
                  <p>
                    Rather than relying on automated assembly lines, our craftspeople hand-score every fold, hand-apply reinforced library-grade cloth spines, and inspect every print under calibrated 5000K daylight illumination.
                  </p>
                  <p>
                    From independent destination photographers to high-volume studios across India, the UK, the US, and Europe, we provide personal layout design, seamless proofing, and reliable global delivery.
                  </p>
                </div>

                <div className="mt-8 p-4 bg-oak-wood/30 border border-charcoal/15 text-xs text-charcoal/70">
                  <p className="font-medium text-charcoal uppercase tracking-wider-luxury text-[11px] mb-1">
                    Authenticity Note & Client Claims:
                  </p>
                  <p>
                    {companyInfo.statsClaims.yearsInBusiness} & {companyInfo.statsClaims.photographersServed}. We verify all technical capabilities directly with production.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4">
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

            <div className="lg:col-span-6">
              <FadeIn delay={0.2}>
                <div className="relative p-3 bg-light-grey border border-charcoal/15">
                  <ImagePlaceholder
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80"
                    alt="Master bookbinder inspecting hand-stitched leather spine in Mumbai bindery"
                    subject="Master bookbinder inspecting hand-stitched leather spine and foil debossing under workshop lamp"
                    aspect="4/3"
                    tone="oak"
                    className="w-full"
                  />
                  <div className="mt-3 text-center text-xs font-serif italic text-charcoal/60">
                    Artisanal binding, rigid cores & archival silver halide papers
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: WHY ULTRA ALBUMS (4 Confirmed Points)
         ========================================================================= */}
      <section className="bg-light-grey py-20 sm:py-28 border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <SectionHeading
                align="center"
                label="The Pro Advantage"
                title="Why Professional Studios Partner With Us"
                subtitle="Engineered to protect your studio reputation, reduce turnaround headaches, and elevate client unboxing."
              />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((adv, idx) => {
              const Icon = advantageIcons[adv.icon] || ShieldCheck;
              return (
                <FadeIn key={adv.step} delay={idx * 0.06}>
                  <div className="bg-white border border-charcoal/15 p-7 flex flex-col justify-between h-full hover:border-charcoal/40 transition-colors">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className="font-serif text-2xl text-nordic-blue-dark">
                          {adv.step}
                        </span>
                        <div className="w-9 h-9 rounded-full bg-light-grey flex items-center justify-center text-charcoal/80">
                          <Icon className="w-4 h-4" strokeWidth={1.5} />
                        </div>
                      </div>

                      <h3 className="font-serif text-xl text-charcoal">{adv.title}</h3>
                      <p className="text-[11px] font-sans uppercase tracking-wider-luxury text-charcoal/50 mt-1 mb-3">
                        {adv.subtitle}
                      </p>

                      <p className="text-xs sm:text-sm text-charcoal/70 font-light leading-relaxed">
                        {adv.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: HOW IT WORKS (4 Process Steps)
         ========================================================================= */}
      <section className="bg-white py-20 sm:py-28 border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <SectionHeading
                label="Streamlined Workflow"
                title="How It Works: From Capture to Delivery"
                subtitle="Four clear steps connecting your digital files to a museum-grade heirloom on your client's coffee table."
              />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {processSteps.map((step, idx) => (
              <FadeIn key={step.step} delay={idx * 0.06}>
                <div className="relative flex flex-col h-full border-t border-charcoal/20 pt-6">
                  <span className="font-serif text-3xl sm:text-4xl text-charcoal/30 mb-3 font-normal">
                    {step.step}
                  </span>

                  <h3 className="font-serif text-xl text-charcoal mb-2">{step.title}</h3>

                  <p className="text-xs text-charcoal/80 font-medium mb-2 leading-snug">
                    {step.summary}
                  </p>

                  <p className="text-xs text-charcoal/65 font-light leading-relaxed">
                    {step.details}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: TESTIMONIALS (DELIBERATE EMPTY STATE)
          Strictly avoids fabricating reviews or photographer names.
         ========================================================================= */}
      <section className="bg-oak-wood/30 py-20 sm:py-28 border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <SectionHeading
                align="center"
                label={testimonialsPlaceholderMeta.heading}
                title={testimonialsPlaceholderMeta.subheading}
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="max-w-2xl mx-auto bg-white border border-charcoal/15 p-8 sm:p-12 text-center">
              <span className="inline-block px-3 py-1 bg-light-grey text-[10px] uppercase font-sans tracking-widest-luxury text-charcoal/60 border border-charcoal/10 mb-4">
                Client Content Review Pending
              </span>

              <h3 className="font-serif text-2xl text-charcoal">
                {testimonialsPlaceholderMeta.emptyStateTitle}
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-charcoal/70 font-light leading-relaxed">
                {testimonialsPlaceholderMeta.emptyStateDescription}
              </p>

              <div className="mt-6 pt-6 border-t border-charcoal/10 text-[11px] text-charcoal/50 font-sans">
                {testimonialsPlaceholderMeta.note}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: FINAL CTA
         ========================================================================= */}
      <section className="bg-charcoal text-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <SectionLabel theme="dark" withLine className="mb-4">
                Partner With Ultra Albums
              </SectionLabel>

              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal leading-tight">
                Ready to elevate your studio deliverables?
              </h2>

              <p className="mt-6 text-sm sm:text-base text-white/70 font-light max-w-xl mx-auto leading-relaxed">
                Download our complete product catalogue or contact our Mumbai production desk for sample swatch kits and custom pricing.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button to="/contact-us" variant="white" size="lg" icon={ArrowRight}>
                  Request Studio Sample
                </Button>

                <Button
                  href={companyInfo.cataloguePdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="lg"
                  className="text-white border-white/40 hover:bg-white/10"
                  icon={Download}
                >
                  Download Catalogue PDF
                </Button>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-misty-blue">
                <Phone className="w-3.5 h-3.5" />
                <span>Direct Mumbai Lab Line:</span>
                <a href={companyInfo.phoneTel} className="text-white hover:underline font-medium">
                  {companyInfo.phone}
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

