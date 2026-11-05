import React from 'react';

/**
 * Section label identifier.
 * Small uppercase label with wide letter spacing per design guide.
 */
export default function SectionLabel({
  children,
  className = '',
  withLine = false,
  theme = 'light', // 'light' (on white/grey) or 'dark' (on charcoal)
}) {
  const colorClass = theme === 'dark' ? 'text-misty-blue/80' : 'text-nordic-blue-dark';

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {withLine && <span className="w-6 h-px bg-nordic-blue/60" aria-hidden="true" />}
      <span className={`font-sans text-[11px] font-semibold uppercase tracking-widest-luxury ${colorClass}`}>
        {children}
      </span>
      {withLine && <span className="w-6 h-px bg-nordic-blue/60" aria-hidden="true" />}
    </div>
  );
}

