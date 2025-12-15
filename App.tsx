import React, { useState, useEffect } from 'react';
import { Envelope } from './components/Envelope';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { Details } from './components/Details';
import { MoneyGift } from './components/MoneyGift';
import { RsvpForm } from './components/RsvpForm';
import { Guestbook } from './components/Guestbook';
import { Footer } from './components/Footer';
import { LiveWall } from './components/LiveWall';
import { ChatWidget } from './components/ChatWidget';

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);

  useEffect(() => {
    // Check URL parameters for ?mode=live
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'live') {
      setIsLiveMode(true);
    }
  }, []);

  const handleOpen = () => {
    setIsEnvelopeOpen(true);
    // Delay showing content slightly for animation smoothness
    setTimeout(() => {
      setShowContent(true);
    }, 800);
  };

  useEffect(() => {
    if (showContent || isLiveMode) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [showContent, isLiveMode]);

  // If in Live Mode, render ONLY the Live Wall
  if (isLiveMode) {
    return <LiveWall />;
  }

  // Normal Wedding Website Flow
  return (
    <div className="min-h-screen relative font-serif text-charcoal overflow-x-hidden">
      {/* Envelope Overlay */}
      <div 
        className={`fixed inset-0 z-50 transition-all duration-1000 ease-in-out ${
          isEnvelopeOpen 
            ? 'opacity-0 pointer-events-none -translate-y-full' 
            : 'opacity-100 pointer-events-auto'
        }`}
      >
        <Envelope onOpen={handleOpen} />
      </div>

      {/* Main Content */}
      <div 
        className={`transition-opacity duration-1000 ease-in ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Hero />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pb-24">
          <Gallery />
          <Details />
          
          <div id="rsvp-section" className="scroll-mt-20">
            <RsvpForm />
          </div>

          <MoneyGift />

          <div className="border-t border-gold/30 pt-20">
            <Guestbook />
          </div>
        </main>

        <Footer />

        {/* AI Wedding Concierge */}
        <ChatWidget />

        {/* Floating RSVP Button (Mobile Only) if not scrolled to RSVP yet */}
        {/* Adjusted bottom position to not overlap with ChatWidget */}
        <FloatingCTA />
      </div>
    </div>
  );
}

const FloatingCTA = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const rsvpSection = document.getElementById('rsvp-section');
      if (rsvpSection) {
        const rect = rsvpSection.getBoundingClientRect();
        // Hide if RSVP section is visible
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('rsvp-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 md:hidden animate-fade-in">
      <a 
        href="#rsvp-section"
        onClick={handleClick}
        className="bg-charcoal text-white font-sans uppercase tracking-widest text-[10px] font-bold py-3 px-5 rounded-full shadow-xl hover:bg-black transition-colors cursor-pointer border border-white/20"
      >
        RSVP Now
      </a>
    </div>
  );
};
