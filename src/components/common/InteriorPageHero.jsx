import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronRight, Download } from 'lucide-react';
import { MOTION } from '../../lib/motion';

/**
 * Cinematic Image-Overlay Interior Page Hero Component.
 * - The entire header is a full-bleed photo banner with text overlayed directly on the image.
 * - Restrained editorial height (~360px-440px on desktop) ensuring content below remains accessible.
 * - High-contrast cinematic scrim & vignette guarantees WCAG AA text readability.
 * - Centered, spacious typography with display serif titles, subtle letter-spaced eyebrows, and clean breadcrumbs.
 * - Smooth entrance animations adhering to the Unified Motion System.
 * - Full reduced-motion and touch safety support.
 */
export default function InteriorPageHero({
  eyebrow,
  title,
  description,
  breadcrumb = [],
  badge,
  image,
  imageAlt,
  focalPosition = 'center center',
  ctaLabel,
  ctaHref,
  isExternalCta = false,
  secondaryCta,
  className = '',
}) {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
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

  return (
    <section
      className={`relative w-full h-[360px] sm:h-[400px] lg:h-[440px] flex items-center justify-center overflow-hidden bg-[#111111] select-none border-b border-black/20 ${className}`}
      aria-label={`${title} Banner`}
    >
      {/* 1. Full-Bleed Background Photographic Hero Image */}
      <motion.img
        src={image}
        alt={imageAlt || title}
        initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ objectPosition: focalPosition }}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        decoding="async"
      />

      {/* 2. Cinematic Scrim & Vignette for Contrast & Quiet Luxury Atmosphere */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/40"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]"
        aria-hidden="true"
      />

      {/* 3. Corner Atelier Registration Ticks */}
      <span className="absolute top-4 left-4 sm:top-6 sm:left-6 w-3 h-3 border-t border-l border-white/30 pointer-events-none" />
      <span className="absolute top-4 right-4 sm:top-6 sm:right-6 w-3 h-3 border-t border-r border-white/30 pointer-events-none" />
      <span className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-3 h-3 border-b border-l border-white/30 pointer-events-none" />
      <span className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-3 h-3 border-b border-r border-white/30 pointer-events-none" />

      {/* 4. Editorial Content Overlay (Centered & Spacious) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col items-center"
        >
          {/* Breadcrumb Trail */}
          {breadcrumb && breadcrumb.length > 0 && (
            <motion.nav
              variants={itemFadeUp}
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-[10.5px] font-sans uppercase tracking-widest text-white/70 mb-3"
            >
              {breadcrumb.map((item, idx) => {
                const isLast = idx === breadcrumb.length - 1;
                return (
                  <React.Fragment key={idx}>
                    {idx > 0 && (
                      <ChevronRight className="w-2.5 h-2.5 text-white/40 flex-shrink-0" />
                    )}
                    {item.href && !isLast ? (
                      <Link
                        to={item.href}
                        className="hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-white/95 font-medium">{item.label}</span>
                    )}
                  </React.Fragment>
                );
              })}
            </motion.nav>
          )}

          {/* Eyebrow Label & Provenance Badge */}
          {(eyebrow || badge) && (
            <motion.div
              variants={itemFadeUp}
              className="flex items-center gap-2 mb-2.5"
            >
              {eyebrow && (
                <span className="text-[10px] sm:text-[11px] uppercase font-sans tracking-[0.25em] text-white/80 font-medium">
                  {eyebrow}
                </span>
              )}
              {badge && (
                <span className="hidden sm:inline-block px-2 py-0.5 bg-white/15 backdrop-blur-xs text-[9px] uppercase font-sans tracking-wider text-white border border-white/20 rounded-[1px]">
                  {badge}
                </span>
              )}
            </motion.div>
          )}

          {/* Main Display Heading (Semantic H1) */}
          <motion.h1
            variants={itemFadeUp}
            className="font-serif text-3xl sm:text-5xl lg:text-[56px] text-white font-normal leading-[1.08] tracking-tight drop-shadow-sm max-w-3xl"
          >
            {title}
          </motion.h1>

          {/* Concise Supporting Description */}
          {description && (
            <motion.p
              variants={itemFadeUp}
              className="mt-3.5 sm:mt-4 text-xs sm:text-sm md:text-[15px] text-white/85 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-xs"
            >
              {description}
            </motion.p>
          )}

          {/* Call to Action Actions */}
          {(ctaLabel || secondaryCta) && (
            <motion.div
              variants={itemFadeUp}
              className="mt-6 flex flex-wrap items-center justify-center gap-3"
            >
              {ctaLabel && ctaHref && (
                isExternalCta ? (
                  <a
                    href={ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-sans uppercase tracking-wider text-charcoal bg-white hover:bg-[#F3F1E8] transition-colors rounded-[1px] font-medium shadow-sm group"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{ctaLabel}</span>
                  </a>
                ) : (
                  <Link
                    to={ctaHref}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-sans uppercase tracking-wider text-charcoal bg-white hover:bg-[#F3F1E8] transition-colors rounded-[1px] font-medium shadow-sm group"
                  >
                    <span>{ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                  </Link>
                )
              )}

              {secondaryCta && (
                <Link
                  to={secondaryCta.href}
                  className="inline-flex items-center gap-1 px-4 py-2 text-xs font-sans uppercase tracking-wider text-white hover:text-white bg-white/10 hover:bg-white/20 transition-colors rounded-[1px] border border-white/25"
                >
                  <span>{secondaryCta.label}</span>
                </Link>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
