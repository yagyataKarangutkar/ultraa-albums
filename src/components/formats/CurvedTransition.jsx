import React from 'react';

/**
 * CurvedTransition Component.
 * - Renders an organic SVG Bezier Curve reveal curtain as seen on 21oaks.
 * - The curve arches dynamically as it sweeps into view over the previous page,
 *   allowing the visitor to see the previous page underneath before it flattens smoothly.
 * - Managed via GSAP for silky mathematical bezier interpolation.
 */
export default function CurvedTransition({
  containerRef,
  pathRef,
  fillColor = '#F1F2F4',
  className = '',
}) {
  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-visible pointer-events-none select-none z-15 ${className}`}
      style={{
        transform: 'translateY(105%)',
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      {/* Dynamic Leading SVG Curve */}
      <div className="absolute left-0 right-0 -top-20 sm:-top-32 md:-top-40 h-20 sm:h-32 md:h-40 w-full overflow-visible">
        <svg
          viewBox="0 0 1440 240"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={pathRef}
            d="M 0 240 Q 720 240 1440 240 L 1440 240 L 0 240 Z"
            fill={fillColor}
          />
        </svg>
      </div>

      {/* Solid Color Body */}
      <div
        className="w-full h-full"
        style={{
          backgroundColor: fillColor,
        }}
      />
    </div>
  );
}

