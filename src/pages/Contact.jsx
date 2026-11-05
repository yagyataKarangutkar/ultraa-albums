import React from 'react';
import { Phone, MessageSquare, Download, MapPin, Mail, Clock } from 'lucide-react';
import ContactForm from '../components/forms/ContactForm';
import FadeIn from '../components/common/FadeIn';
import InteriorPageHero from '../components/common/InteriorPageHero';

import { companyInfo } from '../data/company';
import { interiorHeroAssets } from '../data/interiorHeroAssets';

/**
 * Contact Us Page (Minimal Luxury Edition).
 * - Full-bleed photographic hero with text overlay.
 * - Minimal, quiet layout pairing the enquiry form with direct communication channels.
 */
export default function Contact() {
  return (
    <div className="w-full bg-white text-[#171717]">
      {/* Full-Bleed Photographic Hero Banner */}
      <InteriorPageHero {...interiorHeroAssets.contact} />

      {/* Main Content: Form + Studio Details */}
      <section id="contact-form" className="py-20 sm:py-28 border-b border-[#E5E1DA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <FadeIn>
                <div className="bg-[#F5F3EE] p-7 sm:p-9 border border-[#E5E1DA] rounded-[2px] shadow-sm">
                  <span className="text-[10px] uppercase font-sans tracking-widest text-[#77736E] font-semibold block mb-2">
                    Direct Inquiry
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#171717] font-normal leading-tight mb-2">
                    Send a Commission Note
                  </h2>
                  <p className="text-xs sm:text-sm text-[#77736E] font-light leading-relaxed mb-6">
                    Share your album requirements or sample kit request. We review and reply within one business day.
                  </p>
                  <ContactForm />
                </div>
              </FadeIn>
            </div>

            {/* Direct Channels Column */}
            <div className="lg:col-span-5 space-y-6">
              <FadeIn delay={0.1}>
                {/* Direct Phone */}
                <div className="p-6 bg-white border border-[#E5E1DA] rounded-[2px] shadow-2xs">
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-[#F5F3EE] border border-[#E5E1DA] text-[#171717] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-[#171717]" />
                    </div>
                    <div>
                      <span className="text-[9.5px] uppercase font-sans tracking-widest text-[#77736E] font-medium block">
                        Direct Lab Desk
                      </span>
                      <h3 className="font-serif text-lg text-[#171717] mt-0.5">
                        <a href={companyInfo.phoneTel} className="hover:underline">
                          {companyInfo.phone}
                        </a>
                      </h3>
                      <p className="mt-1 text-xs text-[#77736E] font-light leading-relaxed">
                        Monday to Saturday, 10:00 AM – 7:00 PM IST. Call directly for immediate project assistance.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Instant Messaging */}
                <div className="p-6 bg-white border border-[#E5E1DA] rounded-[2px] shadow-2xs">
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-[#F5F3EE] border border-[#E5E1DA] text-[#171717] flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-4 h-4 text-[#171717]" />
                    </div>
                    <div>
                      <span className="text-[9.5px] uppercase font-sans tracking-widest text-[#77736E] font-medium block">
                        Instant Messenger
                      </span>
                      <h3 className="font-serif text-lg text-[#171717] mt-0.5">Facebook Messenger</h3>
                      <p className="mt-1 text-xs text-[#77736E] font-light leading-relaxed">
                        Message our team directly for quick questions, layout drafts, and swatch inquiries.
                      </p>
                      <div className="mt-2.5">
                        <a
                          href={companyInfo.messengerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-sans tracking-wider uppercase text-[#171717] hover:underline font-medium"
                        >
                          <span>Open Messenger</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Production Facility */}
                <div className="p-6 bg-white border border-[#E5E1DA] rounded-[2px] shadow-2xs">
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-[#F5F3EE] border border-[#E5E1DA] text-[#171717] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-[#171717]" />
                    </div>
                    <div>
                      <span className="text-[9.5px] uppercase font-sans tracking-widest text-[#77736E] font-medium block">
                        Mumbai Atelier
                      </span>
                      <h3 className="font-serif text-lg text-[#171717] mt-0.5">Dahisar East Workshop</h3>
                      <p className="mt-1 text-xs text-[#77736E] font-light leading-relaxed">
                        {companyInfo.address.full}
                      </p>
                    </div>
                  </div>
                </div>

                {/* PDF Catalogue */}
                <div className="p-6 bg-[#F5F3EE] border border-[#E5E1DA] rounded-[2px] text-center">
                  <span className="text-[10px] uppercase font-sans tracking-widest text-[#77736E] font-medium block mb-1">
                    Complete Reference
                  </span>
                  <h4 className="font-serif text-lg text-[#171717]">Download Catalogue (PDF)</h4>
                  <p className="text-xs text-[#77736E] mt-1 mb-4 font-light">
                    Complete sizes, core specifications, and cover options.
                  </p>
                  <a
                    href={companyInfo.cataloguePdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-[#171717] border border-[#E5E1DA] hover:bg-black hover:text-white transition-all text-xs font-sans uppercase tracking-wider rounded-[1px] font-medium"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
