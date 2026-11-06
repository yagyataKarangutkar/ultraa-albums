import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-24 px-4 text-center bg-[#FAF9F6]">
      <div className="max-w-md mx-auto">
        <span className="font-sans text-[10px] uppercase tracking-widest text-[#77736E] font-medium block mb-2">
          Error 404
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#111111] font-normal mt-1 mb-4">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#77736E] font-light mb-8 leading-relaxed">
          The page or album collection you requested does not exist or may have been relocated.
        </p>
        <Button to="/" variant="primary" size="md" icon={ArrowLeft} iconPosition="left">
          Return to Atelier
        </Button>
      </div>
    </div>
  );
}

