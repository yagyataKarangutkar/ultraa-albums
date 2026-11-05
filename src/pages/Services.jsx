import React from 'react';
import { Check, ArrowRight, Download, MessageSquare } from 'lucide-react';
import SectionLabel from '../components/common/SectionLabel';
import Button from '../components/common/Button';
import FadeIn from '../components/common/FadeIn';
import InteriorPageHero from '../components/common/InteriorPageHero';

import { interiorHeroAssets } from '../data/interiorHeroAssets';
import { services } from '../data/services';
import { processSteps } from '../data/process';
import { companyInfo } from '../data/company';

/**
 * Services Page (Minimal Luxury Edition).
 * - Full-bleed photographic hero with text overlay.
 * - Spacious, uncluttered service features with refined typography and natural spacing.
 * - Zero noisy boxes; subtle hairline dividers and calm CTAs.
 */
export default function Services() {
  return (
    <div className="w-full bg-white text-[#171717]">
      {/* Full-Bleed Photographic Hero Banner */}
      <InteriorPageHero {...interiorHeroAssets.services} />

      {/* Services Detailed List */}
      <section className="py-20 sm:py-28 border-b border-[#E5E1DA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {services.map((service, idx) => {
            const isReversed = idx % 2 !== 0;

            return (
              <FadeIn key={service.id} delay={0.08}>
                <div
                  id={service.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                    isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Service Text Description */}
                  <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : ''}`}>
                    <span className="text-[10px] uppercase font-sans tracking-widest text-[#77736E] font-semibold block mb-2">
                      {service.badge}
                    </span>

                    <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal leading-tight">
                      {service.title}
                    </h2>

                    <p className="mt-3 text-sm text-[#77736E] font-light leading-relaxed">
                      {service.longDescription}
                    </p>

                    <div className="mt-6 pt-5 border-t border-[#E5E1DA]">
                      <span className="text-[10.5px] uppercase font-sans tracking-widest text-[#171717] font-medium block mb-3">
                        Included Specifications:
                      </span>
                      <ul className="space-y-2 text-xs sm:text-[13px] text-[#77736E] font-light">
                        {service.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5">
                            <Check className="w-3.5 h-3.5 text-[#171717] flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 flex items-center gap-4">
                      <Button to={`/contact-us?service=${service.id}`} variant="primary" size="md">
                        Enquire for Service
                      </Button>
                      <Button
                        href={companyInfo.messengerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline"
                        size="md"
                      >
                        Ask on Messenger
                      </Button>
                    </div>
                  </div>

                  {/* Service Curated Photography */}
                  <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : ''}`}>
                    <div className="p-2 bg-[#F5F3EE] border border-[#E5E1DA] rounded-[2px] shadow-sm">
                      <img
                        src={service.image}
                        alt={service.alt || service.title}
                        className="w-full aspect-[4/3] object-cover rounded-[1px]"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Minimal Design & Print Cycle */}
      <section className="bg-[#F5F3EE] py-20 sm:py-24 border-b border-[#E5E1DA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-xl mx-auto text-center mb-14">
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#77736E] font-semibold block mb-2">
                Order Lifecycle
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal">
                From Capture to Physical Delivery
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#77736E] font-light">
                Transparent milestones from high-res file upload to finished boxed shipping.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="bg-white p-6 border border-[#E5E1DA] rounded-[2px] shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <span className="font-serif text-2xl text-[#77736E]">{step.step}</span>
                  <h4 className="font-serif text-lg text-[#171717] mt-2 mb-1.5">{step.title}</h4>
                  <p className="text-xs text-[#77736E] leading-relaxed font-light">{step.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
