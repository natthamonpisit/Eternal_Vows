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
import { MusicPlayer } from './components/MusicPlayer';

/*
  ========================================================================================
  🎨 DESIGN SYSTEM RULES (ห้ามลบ / DO NOT DELETE)
  ========================================================================================
  
  0. HERO SECTION
     - Freestyle: ปรับเปลี่ยนได้ตามจริตบ่าวสาว (No strict rules)

  1. MAIN SECTION HEADINGS (หัวข้อใหญ่ของแต่ละ Block)
     - Font: font-sans (Montserrat)
     - Size: text-4xl md:text-5xl
     - Weight: font-bold
     - Case: UPPERCASE
     - Tracking: tracking-wider
     - Effect:
       * บนพื้นขาว/สว่าง: className="text-gold-shine"
       * บนพื้นเข้ม/สี:   className="text-cream-shine"

  2. SUB-HEADINGS / DESCRIPTIONS (หัวข้อรอง / คำอธิบาย)
     - Reference: อิงตามคำว่า "Atmosphere & Location" ในหน้า Venue
     - Font: font-sans (Montserrat)
     - Size: text-sm md:text-base
     - Weight: font-medium (ตัวบาง)
     - Case: UPPERCASE
     - Tracking: tracking-[0.2em] หรือ tracking-widest
     - Color:
       * บนพื้นขาว: text-gray-500 หรือ text-gold (ตามบริบท)
       * บนพื้นเข้ม: text-cream/80 หรือ text-[#F3E5AB]
  ========================================================================================
*/

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);

  useEffect(() => {
    // Function to check hash and set mode
    const checkHash = () => {
      setIsLiveMode(window.location.hash === '#live');
    };

    // Check on mount
    checkHash();

    // Listen for hash changes (Navigation without reload)
    window.addEventListener('hashchange', checkHash);
    
    // Cleanup listener
    return () => window.removeEventListener('hashchange', checkHash);
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
      
      {/* 
          GLOBAL BACKGROUND TEXTURE 
          - Fixed position: Texture stays still while content scrolls (Parallax feel)
          - Seamless base for all transparent sections
      */}
      <div className="fixed inset-0 z-[-1] bg-[#FDFBF7] pointer-events-none">
         <div className="absolute inset-0 opacity-40 mix-blend-multiply" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}></div>
      </div>

      {/* Background Music Player - Starts when envelope opens */}
      <MusicPlayer shouldPlay={isEnvelopeOpen} />

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
        
        {/* 
            SEAMLESS MAIN CONTAINER 
            - Removed max-w-7xl and space-y-24 to allow full-width sections to touch 
        */}
        <main className="w-full relative z-10">
          
          <Gallery />
          
          {/* Details handles its own background and transitions */}
          <Details />
          
          <div id="rsvp-section" className="scroll-mt-20 py-24 px-4 sm:px-6">
             <div className="max-w-7xl mx-auto">
                <RsvpForm />
             </div>
          </div>

          <div className="py-12 px-4 sm:px-6">
             <div className="max-w-7xl mx-auto">
                <MoneyGift />
             </div>
          </div>

          <div className="border-t border-gold/30 pt-20 pb-24 px-4 sm:px-6">
             <div className="max-w-7xl mx-auto">
               <Guestbook />
             </div>
          </div>
        </main>

        <Footer />

        {/* AI Wedding Concierge */}
        <ChatWidget />

        {/* Floating RSVP Button (Mobile Only) if not scrolled to RSVP yet */}
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
        // Change from bg-charcoal to bg-[#C5908E] (Dusty Pink)
        className="bg-[#C5908E] text-white font-sans uppercase tracking-widest text-[10px] font-bold py-3 px-5 rounded-full shadow-xl hover:bg-[#B78A7D] transition-colors cursor-pointer border border-white/20"
      >
        RSVP Now
      </a>
    </div>
  );
};