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
  🎨 CORE DESIGN SYSTEM & MAINTENANCE GUIDE (บันทึกการออกแบบหลัก ห้ามลบ)
  ========================================================================================
  
  Concept: "Minimal Luxury Stationery"
  Mood: เรียบหรู, ผู้ดี, กระดาษการ์ด, ทองรมควัน, โปร่งสบาย
  
  ----------------------------------------------------------------------------------------
  1. TYPOGRAPHY RULES (ตัวอักษร)
  ----------------------------------------------------------------------------------------
  [Main Headings] (หัวข้อใหญ่ของแต่ละ Section)
  - Font: font-sans (Montserrat)
  - Size: text-4xl md:text-5xl
  - Style: UPPERCASE, font-bold, tracking-wider
  - Effect: 
    * พื้นขาว: className="text-gold-shine" (Metallic Rose Gold)
    * พื้นเข้ม: className="text-cream-shine" (Pearl White)

  [Sub-Headings] (คำอธิบายรอง)
  - Font: font-sans
  - Size: text-sm md:text-base
  - Style: UPPERCASE, font-medium, tracking-[0.2em]
  
  [Body Text]
  - Font: font-serif (Cormorant Garamond) -> ให้ความรู้สึกเหมือนนิยาย/จดหมาย

  ----------------------------------------------------------------------------------------
  2. SECTION STRATEGY (กฏการจัดวาง Layout)
  ----------------------------------------------------------------------------------------
  
  TYPE A: "THE VISUAL FLOW" (สำหรับ Gallery / รูปภาพ)
  - Behavior: พื้นหลังใส (Transparent) เห็น Texture กระดาษด้านหลัง
  - Style: No borders, Floating images, Open space.
  - Component: <Gallery />

  TYPE B: "THE GRAND STATEMENT" (สำหรับ Schedule / Venue)
  - Behavior: แถบสีทึบเต็มจอ (Full Width Solid Block)
  - Color: bg-old-rose (Pink Taupe)
  - Role: ใช้พักสายตา และเน้นข้อมูลสำคัญ
  - Component: <Details />

  TYPE C: "THE STATIONERY SUITE" (สำหรับ Interactive Forms ทั้งหมด)
  *** กฏเหล็ก (Strict Rule): ห้ามเปลี่ยน Style แยกกัน ต้องเหมือนกันทั้ง 3 ส่วน ***
  - Components: <RsvpForm />, <MoneyGift />, <Guestbook />
  - Container Style:
    * Background: bg-white (กระดาษขาว)
    * Border: border border-gold/40 (ขอบทองบาง 1px ห้ามหนา)
    * Shadow: shadow-2xl (เงานุ่มลึก ให้ดูลอยมีมิติ)
    * Layout: Header/Title ต้องอยู่ "ข้างใน" การ์ด
    * Width: max-w-3xl (เท่ากันหมด)

  ----------------------------------------------------------------------------------------
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
          - Seamless base for all transparent sections (Type A Sections)
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
        */}
        <main className="w-full relative z-10">
          
          {/* TYPE A: VISUAL FLOW */}
          <Gallery />
          
          {/* TYPE B: GRAND STATEMENT (Solid Background) */}
          <Details />
          
          {/* TYPE C: STATIONERY SUITE (Card Style Components) */}
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
        // Change from bg-charcoal to bg-[#C5908E] (Dusty Pink) to match theme
        className="bg-[#C5908E] text-white font-sans uppercase tracking-widest text-[10px] font-bold py-3 px-5 rounded-full shadow-xl hover:bg-[#B78A7D] transition-colors cursor-pointer border border-white/20"
      >
        RSVP Now
      </a>
    </div>
  );
};