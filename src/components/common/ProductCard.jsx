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
    <article className={`group flex flex-col bg-white border border-[#E5E1DA] transition-all duration-300 ease-out hover:border-[#111111]/30 hover:-translate-y-1 hover:shadow-md rounded-[2px] ${className}`}>
      {/* Product Image Area */}
      <Link
        to={`/collections/${slug}`}
        className="block overflow-hidden relative focus:outline-none"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="transition-transform duration-700 ease-out group-hover:scale-105">
          <ImagePlaceholder
            src={product.image}
            alt={product.alt || `${title} presentation`}
            subject={placeholderSubject || `${title} presentation`}
            aspect={aspect}
            tone={tone}
            showBadge={false}
          />
        </div>
      </Link>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-1 justify-between bg-white">
        <div>
          {subtitle && (
            <p className="text-[10px] font-sans uppercase tracking-widest text-[#77736E] mb-1.5 font-medium">
              {subtitle}
            </p>
          )}

          <h3 className="font-serif text-2xl text-[#111111] group-hover:text-black transition-colors font-normal">
            <Link
              to={`/collections/${slug}`}
              className="focus:outline-none"
            >
              {title}
            </Link>
          </h3>

          <p className="mt-2 text-xs sm:text-[13px] text-[#77736E] font-light leading-relaxed line-clamp-2">
            {shortDescription}
          </p>
        </div>

        {/* Link / CTA */}
        <div className="mt-5 pt-4 border-t border-[#E5E1DA] flex items-center justify-between">
          <Link
            to={`/collections/${slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-sans tracking-wider uppercase text-[#111111] group-hover:text-black transition-colors font-medium"
          >
            <span>View Specifications</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}

