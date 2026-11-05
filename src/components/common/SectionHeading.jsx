import React from 'react';
import SectionLabel from './SectionLabel';

/**
 * Editorial Section Heading component.
 * Combines Cormorant Garamond serif with optional section label and subtext.
 */
export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'left', // 'left' | 'center' | 'right'
  className = '',
  theme = 'light', // 'light' | 'dark'
  titleSize = 'default', // 'default' | 'large' | 'compact'
}) {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  const titleSizes = {
    compact: 'text-2xl sm:text-3xl md:text-4xl',
    default: 'text-3xl sm:text-4xl md:text-5xl',
    large: 'text-4xl sm:text-5xl md:text-6xl',
  };

  const isDark = theme === 'dark';

  return (
    <div className={`flex flex-col ${alignmentClasses[align]} max-w-3xl ${className}`}>
      {label && (
        <SectionLabel
          theme={theme}
          withLine={align === 'center'}
          className="mb-3"
        >
          {label}
        </SectionLabel>
      )}

      <h2
        className={`font-serif font-normal leading-[1.15] ${titleSizes[titleSize]} ${
          isDark ? 'text-white' : 'text-charcoal'
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 text-sm sm:text-base font-light leading-relaxed max-w-2xl ${
            isDark ? 'text-white/70' : 'text-charcoal/70'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

