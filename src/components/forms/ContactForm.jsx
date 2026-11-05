import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Send, ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import { companyInfo } from '../../data/company';

/**
 * Accessible luxury Contact / Enquiry Form.
 * Features:
 * - Controlled inputs with client-side validation
 * - Accessible error messages and aria attributes
 * - Simulated submission with elegant success state
 * - Explicit developer note regarding backend handler confirmation
 */
export default function ContactForm({ className = '', defaultService = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: defaultService || 'luxury-albums',
    studio: '',
    message: '',
  });

  // Keep service field updated if defaultService prop updates
  useEffect(() => {
    if (defaultService) {
      setFormData((prev) => ({ ...prev, service: defaultService }));
    }
  }, [defaultService]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[\d\s+\-()]{7,20}$/.test(formData.phone)) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide details about your enquiry';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate front-end submission latency
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: defaultService || 'luxury-albums',
      studio: '',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className={`bg-white border border-charcoal/15 p-8 sm:p-12 text-center ${className}`}>
        <div className="w-12 h-12 mx-auto rounded-full bg-oak-wood/50 flex items-center justify-center text-charcoal mb-4">
          <CheckCircle2 className="w-6 h-6 text-charcoal" />
        </div>
        <h3 className="font-serif text-3xl text-charcoal">Enquiry Received</h3>
        <p className="mt-3 text-sm text-charcoal/70 max-w-md mx-auto leading-relaxed">
          Thank you, <span className="font-medium text-charcoal">{formData.name}</span>. We have logged your enquiry. Our Mumbai studio team typically responds to professional photographers within 24 hours.
        </p>
        <div className="mt-4 p-3 bg-light-grey/80 border border-charcoal/10 text-[11px] text-charcoal/60 max-w-md mx-auto">
          Notice: Form submissions currently log to front-end state. Backend email/CRM integration endpoint to be confirmed with client.
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Button variant="outline" size="sm" onClick={handleReset}>
            Send Another Message
          </Button>
          <Button
            as="a"
            href={companyInfo.messengerUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="sm"
          >
            Chat on Messenger
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`bg-white border border-charcoal/15 p-6 sm:p-10 ${className}`}
    >
      <div className="mb-6">
        <h3 className="font-serif text-2xl sm:text-3xl text-charcoal">Studio & Order Enquiry</h3>
        <p className="mt-1 text-xs text-charcoal/60">
          Professional photographers and studios worldwide may submit specifications below.
        </p>
      </div>

      <div className="space-y-4">
        {/* Name & Studio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-xs font-sans uppercase tracking-wider-luxury text-charcoal/80 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              aria-invalid={errors.name ? 'true' : 'false'}
              className={`w-full px-3.5 py-2.5 text-sm bg-white border ${
                errors.name ? 'border-red-500 focus:ring-red-400' : 'border-charcoal/20 focus:border-charcoal'
              } text-charcoal placeholder:text-charcoal/30 transition-colors`}
            />
            {errors.name && (
              <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="studio" className="block text-xs font-sans uppercase tracking-wider-luxury text-charcoal/80 mb-1.5">
              Studio / Brand Name <span className="text-charcoal/40 lowercase text-[11px]">(optional)</span>
            </label>
            <input
              type="text"
              id="studio"
              name="studio"
              value={formData.studio}
              onChange={handleChange}
              placeholder="e.g. Studio Photography Co."
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-charcoal/20 focus:border-charcoal text-charcoal placeholder:text-charcoal/30 transition-colors"
            />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-xs font-sans uppercase tracking-wider-luxury text-charcoal/80 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@domain.com"
              aria-invalid={errors.email ? 'true' : 'false'}
              className={`w-full px-3.5 py-2.5 text-sm bg-white border ${
                errors.email ? 'border-red-500 focus:ring-red-400' : 'border-charcoal/20 focus:border-charcoal'
              } text-charcoal placeholder:text-charcoal/30 transition-colors`}
            />
            {errors.email && (
              <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-sans uppercase tracking-wider-luxury text-charcoal/80 mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 or international format"
              aria-invalid={errors.phone ? 'true' : 'false'}
              className={`w-full px-3.5 py-2.5 text-sm bg-white border ${
                errors.phone ? 'border-red-500 focus:ring-red-400' : 'border-charcoal/20 focus:border-charcoal'
              } text-charcoal placeholder:text-charcoal/30 transition-colors`}
            />
            {errors.phone && (
              <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>
        </div>

        {/* Product / Service Interest */}
        <div>
          <label htmlFor="service" className="block text-xs font-sans uppercase tracking-wider-luxury text-charcoal/80 mb-1.5">
            Interested Collection / Service
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-charcoal/20 focus:border-charcoal text-charcoal transition-colors"
          >
            <option value="luxury-albums">Luxury Albums (Flagship Heirloom)</option>
            <option value="flush-mount-album">Flush Mount Album</option>
            <option value="layflat">Layflat Photo Book</option>
            <option value="photo-book">Photo Book (Parent / Companion)</option>
            <option value="box-and-bags">Box & Packaging Suite</option>
            <option value="slip-in-albums">Slip-in Presentation Albums</option>
            <option value="album-designing">Album Designing (6-7 Themes)</option>
            <option value="image-editing">Image Retouching & Editing</option>
            <option value="general">General Studio Partnership / Samples</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-sans uppercase tracking-wider-luxury text-charcoal/80 mb-1.5">
            Project Specifications & Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your album requirements, approximate quantity, preferred sizes, and timeline..."
            aria-invalid={errors.message ? 'true' : 'false'}
            className={`w-full px-3.5 py-2.5 text-sm bg-white border ${
              errors.message ? 'border-red-500 focus:ring-red-400' : 'border-charcoal/20 focus:border-charcoal'
            } text-charcoal placeholder:text-charcoal/30 transition-colors resize-y`}
          />
          {errors.message && (
            <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[11px] text-charcoal/50 leading-tight">
          Backend endpoint to be confirmed with client. Directly contact +91 93222 54315 for urgent quotes.
        </p>

        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={isSubmitting}
          icon={Send}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? 'Transmitting...' : 'Submit Enquiry'}
        </Button>
      </div>
    </form>
  );
}

