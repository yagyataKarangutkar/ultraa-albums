import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Phone,
  MessageSquare,
  CreditCard,
  Download,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import Button from '../common/Button';
import ImagePlaceholder from '../common/ImagePlaceholder';
import { topBarLinks, mainNavConfig } from '../../data/navigation';
import { dropdownVariants, drawerBackdropVariants, drawerPanelVariants } from '../../lib/motion';

/**
 * Ultra Albums Navbar Component.
 * - Floats transparently over the Hero on the Home page (white text & logo).
 * - Transitions smoothly to solid Phase 1 layout upon scrolling past hero.
 * - Slim top bar with phone, Messenger, and Pay Online external link.
 * - Main bar with swappable Logo, centered links + accessible dropdowns, and Enquire Now CTA.
 * - Accessible keyboard navigation (Tab, Enter/Space, ArrowUp/Down, Escape).
 * - Desktop hover with debounce timer + click support.
 * - Mobile full-height drawer with single-open accordion items and focus trap.
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'Our Products' | 'Services' | 'UK' | null
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenAccordion, setMobileOpenAccordion] = useState(null); // name of open accordion
  const [previewProduct, setPreviewProduct] = useState(null);

  const location = useLocation();
  const dropdownTimerRef = useRef(null);
  const navContainerRef = useRef(null);
  const mobileDrawerRef = useRef(null);

  const isHome = location.pathname === '/';
  // Overlay mode when at top of hero on home page
  const isHeroOverlaid = isHome && !isScrolled;

  // Close menus on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    setMobileOpenAccordion(null);
  }, [location.pathname]);

  // Monitor scroll state
  useEffect(() => {
    const handleScroll = () => {
      // Transition from transparent hero to solid bar
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll and trap focus when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const drawer = mobileDrawerRef.current;
      if (drawer) {
        const firstFocusable = drawer.querySelector('button, [href]');
        firstFocusable?.focus();
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Hover timer debounce for desktop dropdowns
  const handleMouseEnter = (name) => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 140);
  };

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const toggleMobileAccordion = (name) => {
    setMobileOpenAccordion(mobileOpenAccordion === name ? null : name);
  };

  // Keyboard navigation within dropdowns
  const handleDropdownKeyDown = (e, items, currentIdx) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = (currentIdx + 1) % items.length;
      document.getElementById(`dropdown-item-${nextIdx}`)?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIdx = (currentIdx - 1 + items.length) % items.length;
      document.getElementById(`dropdown-item-${prevIdx}`)?.focus();
    } else if (e.key === 'Escape') {
      setOpenDropdown(null);
    }
  };

  // Check if a parent dropdown item should show an active state
  const isParentActive = (navItem) => {
    if (navItem.type !== 'dropdown') return false;
    if (location.pathname === navItem.overviewPath) return true;
    if (navItem.name === 'Our Products' && (location.pathname.startsWith('/collections') || location.pathname === '/products')) return true;
    if (navItem.name === 'Services' && location.pathname.startsWith('/services')) return true;
    if (navItem.name === 'UK' && location.pathname.startsWith('/uk')) return true;
    return false;
  };

  return (
    <div
      ref={navContainerRef}
      className={`w-full z-40 transition-all duration-300 ${
        isHome
          ? isHeroOverlaid
            ? 'absolute top-0 left-0 right-0'
            : 'fixed top-0 left-0 right-0 shadow-sm'
          : 'sticky top-0'
      }`}
    >
      {/* =========================================================================
          1. SLIM TOP BAR
          Black or Nordic Blue on Light Grey.
         ========================================================================= */}
      <div
        className={`text-[11px] font-sans border-b py-1.5 px-4 sm:px-8 transition-colors duration-300 ${
          isHeroOverlaid
            ? 'bg-light-grey/85 backdrop-blur-xs text-charcoal border-charcoal/10'
            : 'bg-light-grey text-charcoal border-oak-wood'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Phone & Pro Workshop */}
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden md:inline uppercase tracking-wider text-[10px] text-charcoal/60">
              Mumbai Lab & Bindery
            </span>
            <a
              href={topBarLinks.phoneTel}
              className="inline-flex items-center gap-1.5 transition-colors font-medium text-charcoal hover:text-nordic-blue"
              aria-label="Direct Phone Line: +91 93222 54315"
            >
              <Phone className="w-3 h-3 text-nordic-blue" />
              <span>{topBarLinks.phone}</span>
            </a>
          </div>

          {/* Right: Messenger & Pay Online */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href={topBarLinks.messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors text-charcoal/80 hover:text-nordic-blue"
            >
              <MessageSquare className="w-3 h-3 text-nordic-blue" />
              <span>Facebook Messenger</span>
            </a>

            <a
              href={topBarLinks.payOnlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium transition-colors pl-3 border-l text-charcoal hover:text-nordic-blue border-charcoal/15"
            >
              <CreditCard className="w-3 h-3 text-nordic-blue" />
              <span>Pay Online</span>
              <ExternalLink className="w-2.5 h-2.5 text-charcoal/50" />
            </a>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. MAIN NAVIGATION BAR
          Typographic brand mark on left (logo removed), links + dropdowns, Enquire Now on right.
         ========================================================================= */}
      <header
        className={`w-full transition-all duration-300 border-b ${
          isHeroOverlaid
            ? 'bg-white/70 backdrop-blur-md border-charcoal/10 py-4 sm:py-5 text-charcoal'
            : isScrolled
            ? 'bg-white/95 backdrop-blur-sm border-oak-wood py-3 shadow-sm text-charcoal'
            : 'bg-white border-oak-wood/60 py-4 sm:py-5 text-charcoal'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Typographic Wordmark on Left (Old logo image removed) */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="font-serif text-lg sm:text-xl font-normal tracking-[0.16em] text-charcoal hover:text-nordic-blue transition-colors uppercase select-none"
              aria-label="Ultra Albums Home"
            >
              Ultra Albums
            </Link>
          </div>

          {/* Desktop Navigation Links in Center */}
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8"
            aria-label="Primary Navigation"
          >
            {mainNavConfig.map((item) => {
              if (item.type === 'link') {
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `relative py-2 text-xs font-sans tracking-wider-luxury uppercase transition-colors ${
                        isActive
                          ? 'text-charcoal font-semibold'
                          : 'text-charcoal/75 hover:text-charcoal'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span>{item.name}</span>
                        {isActive && (
                          <span
                            className="absolute bottom-0 left-0 w-full h-[2px] bg-charcoal"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              }

              // Dropdown Item (Our Products, Services, UK)
              const isOpen = openDropdown === item.name;
              const hasActiveChild = isParentActive(item);

              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => toggleDropdown(item.name)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    className={`inline-flex items-center gap-1.5 py-2 text-xs font-sans tracking-wider-luxury uppercase transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal ${
                      isOpen || hasActiveChild
                        ? 'text-charcoal font-semibold'
                        : 'text-charcoal/75 hover:text-charcoal'
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen
                          ? 'rotate-180 text-charcoal'
                          : 'text-charcoal/60'
                      }`}
                    />
                    {hasActiveChild && (
                      <span
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-charcoal"
                      />
                    )}
                  </button>

                  {/* Desktop Dropdown Panel (Always solid crisp white panel with Oak Wood border) */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white border border-oak-wood shadow-xl z-50 text-charcoal ${
                          item.name === 'Our Products' ? 'w-[580px]' : item.name === 'UK' ? 'w-[440px]' : 'w-[360px]'
                        }`}
                        role="menu"
                        aria-orientation="vertical"
                        aria-label={`${item.name} Submenu`}
                      >
                      {/* Products Dropdown: Split View with Small Image Placeholder Column */}
                      {item.name === 'Our Products' ? (
                        <div>
                          <div className="grid grid-cols-12 divide-x divide-oak-wood/50">
                            {/* Links Column */}
                            <div className="col-span-7 p-4 space-y-1">
                              <Link
                                to={item.overviewPath}
                                onClick={() => setOpenDropdown(null)}
                                className="block px-3 py-2 text-[11px] font-sans font-semibold uppercase tracking-wider-luxury text-nordic-blue hover:bg-light-grey transition-colors border-b border-oak-wood/50 mb-2"
                              >
                                {item.overviewLabel} →
                              </Link>

                              {item.items.map((sub, idx) => (
                                <Link
                                  key={sub.name}
                                  id={`dropdown-item-${idx}`}
                                  to={sub.path}
                                  onMouseEnter={() => setPreviewProduct(sub)}
                                  onClick={() => setOpenDropdown(null)}
                                  onKeyDown={(e) => handleDropdownKeyDown(e, item.items, idx)}
                                  className="group block px-3 py-2 text-left hover:bg-light-grey transition-colors"
                                  role="menuitem"
                                >
                                  <span className="block text-xs font-serif text-charcoal group-hover:text-nordic-blue transition-colors">
                                    {sub.name}
                                  </span>
                                  <span className="block text-[10px] text-charcoal/50 font-sans font-light">
                                    {sub.subtitle}
                                  </span>
                                </Link>
                              ))}
                            </div>

                            {/* Minimal Image Placeholder Preview Column */}
                            <div className="col-span-5 p-4 bg-light-grey/60 flex flex-col justify-between">
                              <div>
                                <span className="block text-[10px] font-sans uppercase tracking-widest-luxury text-charcoal/50 mb-2">
                                  Format Spec Preview
                                </span>
                                <div className="border border-oak-wood bg-white p-1">
                                  <ImagePlaceholder
                                    src={previewProduct?.image}
                                    alt={previewProduct?.name || 'Handcrafted Album'}
                                    subject={
                                      previewProduct?.placeholderSubject ||
                                      'Luxury flush mount album spread'
                                    }
                                    aspect="4/3"
                                    tone="oak"
                                    showBadge={false}
                                  />
                                </div>
                                <p className="mt-2 text-[11px] font-serif text-charcoal">
                                  {previewProduct?.name || 'Handcrafted Album'}
                                </p>
                                <p className="text-[10px] text-charcoal/60 font-sans leading-tight">
                                  {previewProduct?.subtitle || 'Mumbai artisan bindery'}
                                </p>
                              </div>

                              <span className="text-[9px] uppercase tracking-wider text-charcoal/40 font-sans">
                                Archival Pro Lab
                              </span>
                            </div>
                          </div>

                          {/* Products Dropdown Footer with Catalogue Download Link */}
                          <div className="p-3 bg-light-grey border-t border-oak-wood flex items-center justify-between text-xs">
                            <span className="text-[11px] text-charcoal/60 font-sans">
                              Full Specs & Pricing Swatches
                            </span>
                            <a
                              href={item.footerAction.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider text-nordic-blue hover:underline font-medium"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>{item.footerAction.name}</span>
                            </a>
                          </div>
                        </div>
                      ) : (
                        /* Standard Dropdowns (Services & UK) */
                        <div className="p-4 space-y-1">
                          <Link
                            to={item.overviewPath}
                            onClick={() => setOpenDropdown(null)}
                            className="block px-3 py-2 text-[11px] font-sans font-semibold uppercase tracking-wider-luxury text-nordic-blue hover:bg-light-grey transition-colors border-b border-oak-wood/50 mb-2"
                          >
                            {item.overviewLabel} →
                          </Link>

                          {item.items.map((sub, idx) => (
                            <Link
                              key={sub.name}
                              id={`dropdown-item-${idx}`}
                              to={sub.path}
                              onClick={() => setOpenDropdown(null)}
                              onKeyDown={(e) => handleDropdownKeyDown(e, item.items, idx)}
                              className="group block px-3 py-2 text-left hover:bg-light-grey transition-colors"
                              role="menuitem"
                            >
                              <span className="block text-xs font-serif text-charcoal group-hover:text-nordic-blue transition-colors">
                                {sub.name}
                              </span>
                              <span className="block text-[10px] text-charcoal/50 font-sans font-light">
                                {sub.subtitle}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Enquire Now Button on Right */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <Button
              to="/contact-us"
              variant="primary"
              size="sm"
              icon={ArrowRight}
              className="transition-colors shadow-sm text-xs"
            >
              Enquire Now
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <Button
              to="/contact-us"
              variant="primary"
              size="sm"
              className="py-1.5 px-3 text-[10px]"
            >
              Enquire
            </Button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5 rounded-none text-charcoal hover:bg-light-grey focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal"
              aria-label="Open Mobile Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          3. MOBILE AND TABLET FULL-HEIGHT DRAWER
          Strict ordering, accordion dropdowns, trap focus, large 44px tap targets.
         ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileDrawerRef}
            variants={drawerBackdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-50 lg:hidden bg-charcoal/60 backdrop-blur-none"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            onClick={(e) => {
              if (e.target === e.currentTarget) setMobileMenuOpen(false);
            }}
          >
            <motion.div
              variants={drawerPanelVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white border-l border-oak-wood shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              {/* Drawer Header (Old logo image removed) */}
              <div>
                <div className="p-4 sm:p-6 border-b border-oak-wood flex items-center justify-between">
                  <span className="font-serif text-lg tracking-[0.14em] font-normal text-charcoal uppercase">
                    Ultra Albums
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 text-charcoal hover:bg-light-grey focus:outline-none focus:ring-2 focus:ring-charcoal"
                    aria-label="Close Mobile Navigation"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Accordion Menu Items in Strict Required Order */}
                <nav className="p-4 sm:p-6 divide-y divide-oak-wood/50" aria-label="Mobile Menu Links">
                  {/* 1. Home */}
                  <NavLink
                    to="/"
                    end
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `min-h-[44px] flex items-center py-3 text-sm font-sans uppercase tracking-wider-luxury transition-colors ${
                        isActive ? 'text-nordic-blue font-semibold' : 'text-charcoal'
                      }`
                    }
                  >
                    Home
                  </NavLink>

                  {/* 2. About Us */}
                  <NavLink
                    to="/about-us"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `min-h-[44px] flex items-center py-3 text-sm font-sans uppercase tracking-wider-luxury transition-colors ${
                        isActive ? 'text-nordic-blue font-semibold' : 'text-charcoal'
                      }`
                    }
                  >
                    About Us
                  </NavLink>

                  {/* 3. Our Products (Accordion) */}
                  <div className="py-2">
                    <button
                      type="button"
                      onClick={() => toggleMobileAccordion('Our Products')}
                      className="w-full min-h-[44px] flex items-center justify-between py-2 text-sm font-sans uppercase tracking-wider-luxury text-charcoal text-left"
                      aria-expanded={mobileOpenAccordion === 'Our Products'}
                    >
                      <span>Our Products</span>
                      <ChevronDown
                        className={`w-4 h-4 text-charcoal/60 transition-transform ${
                          mobileOpenAccordion === 'Our Products' ? 'rotate-180 text-nordic-blue' : ''
                        }`}
                      />
                    </button>

                    {mobileOpenAccordion === 'Our Products' && (
                      <div className="pl-4 pr-2 py-2 space-y-1 bg-light-grey/60 border-l-2 border-nordic-blue mb-2">
                        <Link
                          to="/products"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block min-h-[36px] py-1.5 text-xs font-sans uppercase font-semibold tracking-wider text-nordic-blue"
                        >
                          All Products Overview →
                        </Link>
                        {mainNavConfig
                          .find((i) => i.name === 'Our Products')
                          ?.items.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block min-h-[36px] py-1.5 text-xs font-serif text-charcoal/80 hover:text-nordic-blue"
                            >
                              {sub.name}
                            </Link>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* 4. Services (Accordion) */}
                  <div className="py-2">
                    <button
                      type="button"
                      onClick={() => toggleMobileAccordion('Services')}
                      className="w-full min-h-[44px] flex items-center justify-between py-2 text-sm font-sans uppercase tracking-wider-luxury text-charcoal text-left"
                      aria-expanded={mobileOpenAccordion === 'Services'}
                    >
                      <span>Services</span>
                      <ChevronDown
                        className={`w-4 h-4 text-charcoal/60 transition-transform ${
                          mobileOpenAccordion === 'Services' ? 'rotate-180 text-nordic-blue' : ''
                        }`}
                      />
                    </button>

                    {mobileOpenAccordion === 'Services' && (
                      <div className="pl-4 pr-2 py-2 space-y-1 bg-light-grey/60 border-l-2 border-nordic-blue mb-2">
                        <Link
                          to="/services"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block min-h-[36px] py-1.5 text-xs font-sans uppercase font-semibold tracking-wider text-nordic-blue"
                        >
                          All Services Overview →
                        </Link>
                        {mainNavConfig
                          .find((i) => i.name === 'Services')
                          ?.items.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block min-h-[36px] py-1.5 text-xs font-serif text-charcoal/80 hover:text-nordic-blue"
                            >
                              {sub.name}
                            </Link>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* 5. UK (Accordion) */}
                  <div className="py-2">
                    <button
                      type="button"
                      onClick={() => toggleMobileAccordion('UK')}
                      className="w-full min-h-[44px] flex items-center justify-between py-2 text-sm font-sans uppercase tracking-wider-luxury text-charcoal text-left"
                      aria-expanded={mobileOpenAccordion === 'UK'}
                    >
                      <span>UK Services</span>
                      <ChevronDown
                        className={`w-4 h-4 text-charcoal/60 transition-transform ${
                          mobileOpenAccordion === 'UK' ? 'rotate-180 text-nordic-blue' : ''
                        }`}
                      />
                    </button>

                    {mobileOpenAccordion === 'UK' && (
                      <div className="pl-4 pr-2 py-2 space-y-1 bg-light-grey/60 border-l-2 border-nordic-blue mb-2">
                        <Link
                          to="/uk"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block min-h-[36px] py-1.5 text-xs font-sans uppercase font-semibold tracking-wider text-nordic-blue"
                        >
                          UK Services Overview →
                        </Link>
                        {mainNavConfig
                          .find((i) => i.name === 'UK')
                          ?.items.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block min-h-[36px] py-1.5 text-xs font-serif text-charcoal/80 hover:text-nordic-blue"
                            >
                              {sub.name}
                            </Link>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* 6. Blogs */}
                  <NavLink
                    to="/blogs"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `min-h-[44px] flex items-center py-3 text-sm font-sans uppercase tracking-wider-luxury transition-colors ${
                        isActive ? 'text-nordic-blue font-semibold' : 'text-charcoal'
                      }`
                    }
                  >
                    Blogs
                  </NavLink>

                  {/* 7. Contact Us */}
                  <NavLink
                    to="/contact-us"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `min-h-[44px] flex items-center py-3 text-sm font-sans uppercase tracking-wider-luxury transition-colors ${
                        isActive ? 'text-nordic-blue font-semibold' : 'text-charcoal'
                      }`
                    }
                  >
                    Contact Us
                  </NavLink>
                </nav>
              </div>

              {/* Drawer Footer: Phone, Messenger, Pay Online, Download, Enquire Now */}
              <div className="p-4 sm:p-6 bg-light-grey border-t border-oak-wood space-y-3">
                {/* 8. Phone */}
                <a
                  href={topBarLinks.phoneTel}
                  className="min-h-[44px] flex items-center gap-2.5 text-xs font-sans text-charcoal hover:text-nordic-blue"
                >
                  <Phone className="w-4 h-4 text-nordic-blue" />
                  <span>Call: {topBarLinks.phone}</span>
                </a>

                {/* 9. Messenger */}
                <a
                  href={topBarLinks.messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] flex items-center gap-2.5 text-xs font-sans text-charcoal hover:text-nordic-blue"
                >
                  <MessageSquare className="w-4 h-4 text-nordic-blue" />
                  <span>Facebook Messenger</span>
                </a>

                {/* 10. Pay Online */}
                <a
                  href={topBarLinks.payOnlineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] flex items-center justify-between text-xs font-sans text-charcoal hover:text-nordic-blue"
                >
                  <span className="flex items-center gap-2.5">
                    <CreditCard className="w-4 h-4 text-nordic-blue" />
                    <span>Pay Online (PayPal)</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-charcoal/40" />
                </a>

                {/* 11. Download Catalogue */}
                <a
                  href={topBarLinks.cataloguePdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] flex items-center gap-2.5 text-xs font-sans text-nordic-blue font-medium hover:underline"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Catalogue (PDF)</span>
                </a>

                {/* 12. Full-width Enquire Now button */}
                <div className="pt-2">
                  <Button
                    to="/contact-us"
                    variant="primary"
                    size="md"
                    className="w-full justify-center min-h-[48px]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Enquire Now
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
