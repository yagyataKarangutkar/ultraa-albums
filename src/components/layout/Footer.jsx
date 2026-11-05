import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageSquare, Download, MapPin, ExternalLink, ArrowRight, CreditCard } from 'lucide-react';
import { companyInfo } from '../../data/company';
import { showcaseAlbums, secondaryCollections } from '../../data/albums';
import { services } from '../../data/services';
import { topBarLinks } from '../../data/navigation';
import Logo from '../common/Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white pt-16 pb-12 border-t border-charcoal/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Craft Philosophy */}
          <div className="lg:col-span-2 pr-0 lg:pr-6">
            <div className="mb-4">
              <Link to="/" className="inline-block group mb-2">
                <span className="font-serif text-2xl sm:text-3xl tracking-wider text-white">
                  ULTRA ALBUMS
                </span>
                <span className="block text-[10px] font-sans tracking-[0.25em] uppercase text-misty-blue/80 mt-1">
                  Handcrafted Heirloom Albums • Mumbai
                </span>
              </Link>
            </div>

            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-md">
              Specialized photo album manufacturing, layout design, and digital darkroom laboratory serving professional wedding photographers, studios, and visual artists across India, the UK, the US, and worldwide.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={topBarLinks.cataloguePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-sans uppercase tracking-wider-luxury bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
              >
                <Download className="w-3.5 h-3.5 text-misty-blue" />
                <span>Product Catalogue PDF</span>
              </a>

              <a
                href={topBarLinks.messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-sans uppercase tracking-wider-luxury bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
              >
                <MessageSquare className="w-3.5 h-3.5 text-misty-blue" />
                <span>Messenger</span>
              </a>
            </div>
          </div>

          {/* Col 2: Collections */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest-luxury text-misty-blue font-semibold mb-4">
              Our Products
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link to="/products" className="text-white hover:text-misty-blue transition-colors font-medium">
                  All Products Overview →
                </Link>
              </li>
              {showcaseAlbums.map((product) => (
                <li key={product.id}>
                  <Link
                    to={`/collections/${product.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {product.title}
                  </Link>
                </li>
              ))}
              {secondaryCollections.map((product) => (
                <li key={product.id}>
                  <Link
                    to={`/collections/${product.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {product.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services & Pro Studio */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest-luxury text-misty-blue font-semibold mb-4">
              Studio & Regional
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Studio Services Overview
                </Link>
              </li>
              <li>
                <Link to="/uk" className="hover:text-white transition-colors">
                  UK Photographer Services
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-white transition-colors">
                  Journal & Insights (Blogs)
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-white transition-colors">
                  About Our Mumbai Lab
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-white transition-colors">
                  Contact & Sample Enquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Studio Contact & Location */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest-luxury text-misty-blue font-semibold mb-4">
              Mumbai Bindery
            </h4>
            <address className="not-italic text-xs text-white/70 space-y-3 font-light leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-misty-blue flex-shrink-0 mt-0.5" />
                <span>
                  {companyInfo.address.unit}, {companyInfo.address.landmark}, {companyInfo.address.locality}, {companyInfo.address.city} - {companyInfo.address.pincode}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-misty-blue flex-shrink-0" />
                <a href={topBarLinks.phoneTel} className="text-white hover:text-misty-blue transition-colors font-medium">
                  {topBarLinks.phone}
                </a>
              </div>

              {/* Pay Online & External Portals */}
              <div className="pt-3 border-t border-white/10 text-[11px] text-white/60 space-y-2">
                <a
                  href={topBarLinks.payOnlineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-misty-blue hover:text-white transition-colors font-medium"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Pay Online via PayPal (External)</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
                <p className="text-[10px] text-white/40">
                  Secure invoice settlements for international studios
                </p>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© {currentYear} {companyInfo.name} ({companyInfo.legalName}). All rights reserved.</p>
          <p className="text-[11px] tracking-wider text-misty-blue/60">
            Engineered for Professional Photographers Worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
