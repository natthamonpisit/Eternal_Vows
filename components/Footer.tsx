import React from 'react';
import { FadeInUp } from './FadeInUp';

export const Footer: React.FC = () => {
  return (
    // DESIGN UPDATE: Reduced padding (py-16 -> py-10 md:py-12) to reduce overall height
    <footer className="bg-charcoal text-cream py-10 md:py-12 text-center">
      <FadeInUp>
        {/* Reduced vertical spacing (space-y-6 -> space-y-3 md:space-y-4) */}
        <div className="max-w-4xl mx-auto px-6 space-y-3 md:space-y-4">
          {/* Title */}
          <h2 className="font-script text-3xl md:text-5xl text-gold-shine leading-normal py-1">
            Natthamonpisit & Sorot
          </h2>
          
          {/* Quote */}
          <p className="font-serif italic text-white/60 text-sm md:text-base">
            "Of all the stars in the universe, I found you."
          </p>
          
          {/* Divider - Reduced margin (my-8 -> my-5) */}
          <div className="w-12 h-px bg-white/10 mx-auto my-5"></div>
          
          {/* Copyright */}
          <p className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-white/40">
            © 2026 The Wedding. Made with Love.
          </p>
        </div>
      </FadeInUp>
    </footer>
  );
};