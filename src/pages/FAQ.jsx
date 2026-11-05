import React, { useState } from 'react';
import { ChevronDown, Download, Phone, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/common/Button';
import FadeIn from '../components/common/FadeIn';
import InteriorPageHero from '../components/common/InteriorPageHero';

import { faqs } from '../data/faq';
import { companyInfo } from '../data/company';
import { interiorHeroAssets } from '../data/interiorHeroAssets';

/**
 * FAQ Page (Minimal Luxury Edition).
 * - Full-bleed photographic hero with text overlay.
 * - Smooth animated accordions with Framer Motion height transitions.
 */
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <div className="w-full bg-white text-[#171717]">
      {/* Full-Bleed Photographic Hero Banner */}
      <InteriorPageHero {...interiorHeroAssets.faq} />

      {/* Accordion FAQ Section */}
      <section className="py-14 sm:py-20 lg:py-28 border-b border-[#E5E1DA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <FadeIn key={idx} delay={idx * 0.05} direction="up" distance={20}>
                  <div className="border border-[#E5E1DA] bg-white rounded-[2px] transition-all duration-300 shadow-2xs hover:border-[#171717]/30">
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left focus:outline-none focus:ring-1 focus:ring-ink-blue cursor-pointer group"
                      aria-expanded={isOpen}
                    >
                      <div className="pr-4">
                        <span className="text-[9.5px] font-sans uppercase tracking-widest text-[#77736E] font-medium block mb-1">
                          {faq.category}
                        </span>
                        <h3 className="font-serif text-base sm:text-lg text-[#171717] font-normal group-hover:text-black transition-colors">
                          {faq.question}
                        </h3>
                      </div>
                      <span className="text-[#77736E] flex-shrink-0">
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-[13.5px] text-[#77736E] font-light leading-relaxed border-t border-[#E5E1DA]">
                            <p>{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* Minimal Production Support Bar */}
          <FadeIn direction="scale" distance={20} delay={0.15}>
            <div className="mt-14 p-6 sm:p-8 bg-[#F5F3EE] border border-[#E5E1DA] rounded-[2px] flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left hover:shadow-md transition-shadow duration-300">
              <div>
                <h4 className="font-serif text-xl text-[#171717]">Have a specific technical question?</h4>
                <p className="mt-1 text-xs text-[#77736E] font-light">
                  Call our Mumbai lab at {companyInfo.phone} or send a commission inquiry.
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Button to="/contact-us" variant="primary" size="sm" className="hover:scale-[1.02] transition-transform">
                  Ask Production Desk
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
