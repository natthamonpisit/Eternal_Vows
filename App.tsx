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
  1. TYPOGRAPHY FAMILIES (3 ทหารเสือ)
  ----------------------------------------------------------------------------------------
  [A] The Signature (font-script): 'Great Vibes'
      - Role: ชื่อบ่าวสาว, จุดเน้นอารมณ์โรแมนติก
      - Rule: ห้ามใช้ All Caps เด็ดขาด (ต้อง Title Case เท่านั้น)

  [B] The Elegant Voice (font-serif): 'Cormorant Garamond'
      - Role: คำคม (Quotes), เนื้อหาจดหมาย, Body text ที่ต้องการความหรู
      - Rule: เส้นฟอนต์มีความหนาบางชัดเจน (High Contrast) เหมาะกับ Italic

  [C] The Structure (font-sans): 'Montserrat'
      - Role: หัวข้อหลัก (Headings), ข้อมูลสถานที่, วันที่, ปุ่มกด, ฟอร์ม
      - Rule: ***ต้องใช้คู่กับ UPPERCASE และ Tracking (Letter Spacing) เสมอ***
              เพื่อลุคที่ดู Modern & Premium

  ----------------------------------------------------------------------------------------
  2. TYPOGRAPHY SCALING STRATEGY (กฏขนาดตัวอักษร Mobile vs Desktop)
  ----------------------------------------------------------------------------------------
  *Update: ลดขนาด Mobile ลง 20-25% เพื่อแก้ปัญหาคำตกหล่นและพื้นที่หายใจ*

  [Main Headings] (หัวข้อใหญ่ของแต่ละ Section เช่น RSVP, GIFT WITH LOVE)
  - Mobile:  text-3xl (30px) -> กระชับ ไม่ล้นจอ
  - Desktop: text-5xl (48px) -> หรูหรา เต็มตา
  - Style:   UPPERCASE, font-bold, tracking-wider

  [Card Titles / Event Names] (ชื่อพิธีการใน Schedule, หัวข้อย่อย)
  - Mobile:  text-xl (20px)  -> อ่านง่าย ไม่กินพื้นที่
  - Desktop: text-3xl (30px)
  - Style:   UPPERCASE, font-bold, tracking-wide

  [Body Text / Details] (เวลา, คำบรรยาย)
  - Mobile:  text-sm (14px)
  - Desktop: text-base (16px)

  ----------------------------------------------------------------------------------------
  3. SECTION STRATEGY (กฏการจัดวาง Layout)
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
  4. SCROLLING ARCHITECTURE (⛔️ กฏเหล็กเรื่อง SCROLLBAR ห้ามลืมเด็ดขาด)
  ----------------------------------------------------------------------------------------
  Problem: เคยเกิดปัญหา "Double Scrollbar" (มี Scrollbar 2 เส้นซ้อนกัน) และ "Scroll Lag" (เลื่อนแล้วหน่วง)
           โดยเฉพาะบน Safari iOS และ Chrome Mobile
  
  Cause:   การใส่ class `overflow-x-hidden` หรือ `overflow-y-auto` ลงใน Main Container (<div className="min-h-screen ...">)
           ทำให้ Div นั้นกลายเป็น Scroll Container ตัวที่ 2 ซ้อนทับกับ Browser Window Body
  
  RULE:    *** ห้ามใส่ overflow property ใดๆ ที่ Main Container ของ App.tsx เด็ดขาด ***
           - ปล่อยให้ `body` (ใน index.html) เป็นผู้จัดการ Scroll เพียงผู้เดียว
           - ถ้าต้องการซ่อน overflow แนวนอน ให้จัดการที่ index.html หรือเฉพาะ component ลูกเท่านั้น

  ----------------------------------------------------------------------------------------
*/

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);

  useEffect(() => {
    // Function to check hash and set mode
    const checkHash = () => {
      const hash = window.location.hash;
      setIsLiveMode(hash === '#live');

      // Special Route: #guestbook (Skip envelope & Scroll to guestbook)
      if (hash === '#guestbook') {
        setIsEnvelopeOpen(true);
        setShowContent(true);
        // Delay slightly to ensure rendering is complete
        setTimeout(() => {
           const element = document.getElementById('guestbook-section');
           if (element) {
             element.scrollIntoView({ behavior: 'smooth', block: 'center' });
           }
        }, 800);
      }
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
    // FIX: Removed 800ms delay. Content is shown immediately when envelope logic finishes.
    setShowContent(true);
  };

  useEffect(() => {
    // SCROLLBAR MANAGEMENT
    const applyScrollSettings = () => {
      if (isLiveMode) {
        // FIX: FORCE HIDDEN ON BOTH HTML & BODY for Live Mode
        // This removes the pink scrollbar ghost completely
        document.documentElement.style.overflow = 'hidden'; 
        document.body.style.overflow = 'hidden'; 
      } else if (showContent) {
        // Allow default scrolling for main site
        document.documentElement.style.overflow = '';
        document.body.style.overflow = ''; 
      } else {
        // Envelope closed
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
      }
    };

    applyScrollSettings();

    // Cleanup function
    return () => {
       document.documentElement.style.overflow = '';
       document.body.style.overflow = '';
    };
  }, [showContent, isLiveMode]);

  // If in Live Mode, render ONLY the Live Wall
  if (isLiveMode) {
    return <LiveWall />;
  }

  // Normal Wedding Website Flow
  return (
    // ⚠️ CRITICAL: DO NOT ADD 'overflow-x-hidden' HERE. SEE RULE #4 ABOVE.
    <div className="min-h-screen relative font-serif text-charcoal">
      
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

          {/* ID ADDED: guestbook-section for Auto-scroll */}
          <div id="guestbook-section" className="border-t border-gold/30 pt-20 pb-24 px-4 sm:px-6 scroll-mt-20">
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
        // Mobile Tuning: Updated to Glassmorphism style with Dusty Pink Tint
        className="bg-[#C5908E]/90 backdrop-blur-md text-white font-sans uppercase tracking-widest text-[10px] font-bold py-3 px-5 rounded-full shadow-xl hover:bg-[#B78A7D] transition-all cursor-pointer border border-white/30 flex items-center gap-2"
      >
        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
        RSVP Now
      </a>
    </div>
  );
};