import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { secondaryCollections } from '../../data/albums';
import { MOTION } from '../../lib/motion';

/**
 * Compact Catalogue & Presentation Section.
 * Designed to fit comfortably within one desktop viewport (~560-640px height).
 * - Restrained, premium editorial layout.
 * - Aligned two-column cards with balanced landscape image height (210-240px).
 * - Tailored crops: Seamless Spreads shows couple & album; Presentation Suite frames luxury box.
 * - Subtle entrance animations (once-only) and refined 3-4px hover lift.
 * - Full reduced-motion and touch safety support.
 */
export default function CompactCatalogue({ className = '' }) {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants adhering to Unified Motion System
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION.duration.base,
        ease: MOTION.ease.out,
      },
    },
  };

  const buttonFadeRight = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: MOTION.duration.base,
        ease: MOTION.ease.out,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: MOTION.ease.out,
      },
    },
  };

  return (
    <div className={`w-full max-w-7xl mx-auto ${className}`}>
      {/* Heading Row: Eyebrow, Title, Description + Right-Aligned View All Action */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-30px' }}
        variants={containerVariants}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-6 mb-5 sm:mb-6"
      >
        <div className="max-w-xl">
          <motion.span
            variants={itemFadeUp}
            className="text-[10px] sm:text-[11px] uppercase font-sans tracking-widest text-[#77736E] font-semibold block mb-1"
          >
            Complete Catalogue
          </motion.span>

          <motion.h3
            variants={itemFadeUp}
            className="font-serif text-2xl sm:text-3xl text-[#171717] font-normal leading-tight"
          >
            More Collections & Presentation
          </motion.h3>

          <motion.p
            variants={itemFadeUp}
            className="mt-1 text-xs sm:text-sm text-[#77736E] font-light max-w-[560px] leading-relaxed"
          >
            Complementary panoramic albums and handcrafted presentation packaging.
          </motion.p>
        </div>

        {/* View All Catalogue Items Action */}
        <motion.div variants={buttonFadeRight} className="flex-shrink-0 mt-2 sm:mt-0">
          <Link
            to="/collections"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 text-xs font-sans uppercase tracking-wider text-[#171717] bg-white hover:bg-[#F5F3EE] border border-charcoal/20 hover:border-charcoal/40 transition-all rounded-[1px] group focus:outline-none focus:ring-1 focus:ring-ink-blue"
          >
            <span>View All Catalogue Items</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Two-Column Catalogue Cards Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-30px' }}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 items-stretch"
      >
        {secondaryCollections.map((item, idx) => {
          const isLayflat = item.id === 'layflat';

          return (
            <motion.article
              key={item.id}
              variants={cardVariants}
              className="group flex flex-col bg-white border border-charcoal/10 hover:border-charcoal/25 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md"
            >
              {/* Product Image Window (Strict Landscape Aspect 1.75:1 to 1.85:1, Height 210-235px) */}
              <Link
                to={`/collections/${item.slug}`}
                className="block overflow-hidden relative focus:outline-none focus:ring-1 focus:ring-ink-blue h-[210px] sm:h-[225px] lg:h-[235px] bg-[#F5F3EE] flex-shrink-0"
                tabIndex={-1}
                aria-hidden="true"
              >
                <div className="w-full h-full overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.04 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, ease: MOTION.ease.out }}
                    className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
                      isLayflat
                        ? 'object-[center_68%]' // Centers the couple and album subject instead of empty sky
                        : 'object-center'
                    }`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Subtle Inner Framing Layer for Balanced Presentation */}
                <div
                  className="absolute inset-0 pointer-events-none border border-black/5"
                  aria-hidden="true"
                />

                {/* Refined Category Tag Top-Left */}
                {item.tag && (
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 text-[9.5px] uppercase font-sans tracking-widest text-[#171717] border border-charcoal/10 shadow-2xs transition-all duration-300 ease-out group-hover:-translate-y-0.5">
                    {item.tag}
                  </span>
                )}
              </Link>

              {/* Card Body Content */}
              <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
                <div>
                  {item.subtitle && (
                    <p className="text-[10px] sm:text-[10.5px] font-sans uppercase tracking-wider text-[#77736E] mb-1">
                      {item.subtitle}
                    </p>
                  )}

                  <h4 className="font-serif text-xl sm:text-[22px] text-[#171717] leading-snug">
                    <Link
                      to={`/collections/${item.slug}`}
                      className="hover:text-ink-blue transition-colors focus:outline-none focus:ring-1 focus:ring-ink-blue"
                    >
                      {item.title}
                    </Link>
                  </h4>

                  <p className="mt-1.5 text-xs sm:text-[13px] text-[#77736E] font-light leading-relaxed line-clamp-2">
                    {item.shortDescription}
                  </p>
                </div>

                {/* View Specifications Action */}
                <div className="mt-3.5 pt-3 border-t border-charcoal/10 flex items-center justify-between">
                  <Link
                    to={`/collections/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-sans tracking-wider uppercase text-[#171717] group-hover:text-ink-blue transition-colors focus:outline-none focus:underline"
                  >
                    <span>View Specifications</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </div>
  );
}

