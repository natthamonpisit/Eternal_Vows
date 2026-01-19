import React from 'react';
import { FadeInUp } from './FadeInUp';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-cream py-16 text-center">
      <FadeInUp>
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          {/* Added leading-normal and py-2 to prevent script font truncation */}
          <h2 className="font-script text-4xl md:text-5xl text-gold-shine leading-normal py-2">
            Natthamonpisit & Sorot
          </h2>
          <p className="font-serif italic text-white/60">
            "Of all the stars in the universe, I found you."
          </p>
          <div className="w-12 h-1 bg-white/10 mx-auto my-8"></div>
          <p className="font-sans text-xs uppercase tracking-widest text-white/40">
            © 2026 The Wedding. Made with Love.
          </p>
        </div>
      </FadeInUp>
    </footer>
  );
};