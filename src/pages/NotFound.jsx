import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20 px-4 text-center bg-light-grey">
      <div className="max-w-md mx-auto">
        <span className="font-sans text-xs uppercase tracking-widest-luxury text-nordic-blue-dark font-semibold">
          Error 404
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-charcoal mt-2 mb-4">
          Page Not Found
        </h1>
        <p className="text-sm text-charcoal/70 font-light mb-8 leading-relaxed">
          The page or album collection you requested does not exist or may have been relocated.
        </p>
        <Button to="/" variant="primary" size="md" icon={ArrowLeft} iconPosition="left">
          Return to Home
        </Button>
      </div>
    </div>
  );
}

