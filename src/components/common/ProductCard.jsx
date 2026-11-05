import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ImagePlaceholder from './ImagePlaceholder';

/**
 * Minimalist luxury Product Card.
 * Clean lines, generous whitespace, subtle hover lift.
 */
export default function ProductCard({
  product,
  tone = 'oak',
  aspect = '4/3',
  className = '',
}) {
  const { slug, title, subtitle, shortDescription, placeholderSubject, tag } = product;

  return (
    <article className={`group flex flex-col bg-white border border-charcoal/10 transition-all duration-300 ease-out hover:border-charcoal/40 hover:-translate-y-1 hover:shadow-lg rounded-[2px] ${className}`}>
      {/* Product Image Area */}
      <Link
        to={`/collections/${slug}`}
        className="block overflow-hidden relative focus:outline-none focus:ring-2 focus:ring-nordic-blue"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="transition-transform duration-500 ease-out group-hover:scale-105">
          <ImagePlaceholder
            src={product.image}
            alt={product.alt || `${title} presentation`}
            subject={placeholderSubject || `${title} presentation`}
            aspect={aspect}
            tone={tone}
            showBadge={false}
          />
        </div>

        {tag && (
          <span className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 text-[10px] uppercase font-sans tracking-widest-luxury text-charcoal border border-charcoal/10 shadow-2xs transition-transform duration-300 group-hover:translate-x-0.5">
            {tag}
          </span>
        )}
      </Link>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-1 justify-between bg-white">
        <div>
          {subtitle && (
            <p className="text-[11px] font-sans uppercase tracking-wider-luxury text-nordic-blue-dark mb-1.5 transition-colors group-hover:text-black">
              {subtitle}
            </p>
          )}

          <h3 className="font-serif text-2xl text-charcoal group-hover:text-black transition-colors">
            <Link
              to={`/collections/${slug}`}
              className="focus:outline-none focus:ring-2 focus:ring-nordic-blue rounded-none"
            >
              {title}
            </Link>
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-charcoal/70 font-light leading-relaxed line-clamp-2">
            {shortDescription}
          </p>
        </div>

        {/* Link / CTA */}
        <div className="mt-5 pt-4 border-t border-charcoal/10 flex items-center justify-between">
          <Link
            to={`/collections/${slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-sans tracking-wider-luxury uppercase text-charcoal group-hover:text-black transition-colors font-medium"
          >
            <span>View Specifications</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}

