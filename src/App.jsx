import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import useLenisScroll from './hooks/useLenisScroll';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import UkServices from './pages/UkServices';
import Blogs from './pages/Blogs';
import NotFound from './pages/NotFound';
import { pageFadeVariants } from './lib/motion';

export default function App() {
  const location = useLocation();
  useLenisScroll();

  return (
    <div className="min-h-screen flex flex-col bg-light-grey text-charcoal font-sans selection:bg-misty-blue selection:text-charcoal">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 w-full" id="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageFadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            <Routes location={location}>
              {/* Main Home Route */}
              <Route path="/" element={<Home />} />

              {/* About Us (with alias support) */}
              <Route path="/about-us" element={<About />} />
              <Route path="/about" element={<Navigate to="/about-us" replace />} />

              {/* Products & Collections */}
              <Route path="/products" element={<Products />} />
              <Route path="/collections" element={<Navigate to="/products" replace />} />
              <Route path="/collections/:slug" element={<ProductDetail />} />

              {/* Hero Slide Dedicated Routes (Slide 1 confirmed, 2-5 to confirm) */}
              <Route path="/wedding-photo-albums" element={<ProductDetail defaultSlug="flush-mount-album" />} />
              <Route path="/baby-photo-albums" element={<ProductDetail defaultSlug="photo-book" />} />
              <Route path="/family-photo-albums" element={<ProductDetail defaultSlug="layflat" />} />
              <Route path="/travel-photo-albums" element={<ProductDetail defaultSlug="photo-book" />} />
              <Route path="/wall-art" element={<ProductDetail defaultSlug="box-and-bags" />} />

              {/* Services */}
              <Route path="/services" element={<Services />} />
              <Route path="/services/:serviceSlug" element={<Services />} />

              {/* UK Services Dropdown Routes (Marked TO BUILD) */}
              <Route path="/uk" element={<UkServices />} />
              <Route path="/uk/:ukSlug" element={<UkServices />} />

              {/* Blogs */}
              <Route path="/blogs" element={<Blogs />} />

              {/* Contact Us */}
              <Route path="/contact-us" element={<Contact />} />
              <Route path="/contact" element={<Navigate to="/contact-us" replace />} />

              {/* FAQ */}
              <Route path="/faq" element={<FAQ />} />

              {/* 404 Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
