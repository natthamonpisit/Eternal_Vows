
import React, { useState, useEffect } from 'react';
import { fetchGallery } from '../services/api';

/* 
  ========================================================================================
  🤵👰 COMPONENT: Hero (ส่วนหัวข้อหน้าแรก - Re-Layout)
  ========================================================================================
  
  [Layout Concept - Based on Brief]
  1. Top Section (~65% Height): 
     - Background Image
     - Top Gradient (Gray/White -> Transparent)
     - Content (Names, Date, Countdown) centered
     - Bottom Gradient (Transparent -> Site BG #FDFBF7)
  
  2. Bottom Section (~35% Height):
     - Solid Background (#FDFBF7)
     - Star Shape Icon centered
     
  [Spacing Logic]
  - ใช้ h-[65vh] สำหรับส่วนรูปภาพเพื่อให้ได้สัดส่วนประมาณ 60-65% ตามที่ต้องการ
  - ใช้ Flexbox จัด Content ให้อยู่กึ่งกลางของส่วนรูปภาพ
*/

export const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const DEFAULT_BG_URL = "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920&auto=format&fit=crop";
  const [bgUrl, setBgUrl] = useState(DEFAULT_BG_URL);

  useEffect(() => {
    // 🔄 Fetch Dynamic Background
    const loadDynamicBg = async () => {
      try {
        const images = await fetchGallery('Wedding_OukBew/BG');
        if (images.length > 0) {
          setBgUrl(images[0].full);
        }
      } catch (error) {
        console.warn("Could not fetch dynamic BG, using default.");
      }
    };
    loadDynamicBg();
  }, []);

  useEffect(() => {
    // ⏳ Countdown Logic
    const targetDate = new Date("2026-03-21T09:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center mx-1.5 sm:mx-2 md:mx-3">
      <span className="font-serif text-lg sm:text-2xl text-[#5D4037] font-medium tabular-nums leading-none drop-shadow-sm">
        {String(value).padStart(2, '0')}
      </span>
      <span className="font-sans text-[8px] text-[#8E5B50] uppercase tracking-[0.1em] mt-1 font-semibold">
        {label}
      </span>
    </div>
  );

  return (
    <section className="relative w-full bg-[#FDFBF7]">
      
      {/* 
        =======================================================================
        📱 MOBILE LAYOUT (Specific 60/40 Split Layout)
        =======================================================================
      */}
      <div className="md:hidden flex flex-col w-full min-h-[100dvh]">
         
         {/* --- TOP SECTION (65% Height) --- */}
         <div className="relative w-full h-[65vh] overflow-hidden shadow-lg">
            
            {/* 1. Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url("${bgUrl}")` }}
            ></div>

            {/* 2. Top Fading (Gray/White -> Transparent) */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-200/80 via-gray-100/50 to-transparent mix-blend-multiply pointer-events-none z-10"></div>

            {/* 3. Bottom Fading (Transparent -> Site BG #FDFBF7) */}
            {/* ไล่สีให้กลืนไปกับ section ด้านล่าง */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/90 to-transparent pointer-events-none z-10"></div>

            {/* 4. CONTENT CENTERED (Sandwiched between gradients) */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 pt-10">
                
                {/* Intro */}
                <p className="text-[#5D4037] font-sans tracking-[0.25em] uppercase text-[10px] font-bold mb-2 shadow-white/50">
                  The Wedding Of
                </p>
                
                {/* Names */}
                <h1 className="font-script leading-none flex flex-col items-center justify-center gap-2 w-full mb-4">
                  <span className="text-4xl text-[#C08E86] whitespace-nowrap drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
                    Natthamonpisit
                  </span>
                  <span className="font-serif text-xl text-[#B78A7D]">
                    &
                  </span>
                  <span className="text-4xl text-[#C08E86] whitespace-nowrap drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
                    Sorot
                  </span>
                </h1>

                {/* Date & Location */}
                <div className="flex flex-col items-center justify-center gap-1 text-[#5D4037] font-serif text-sm mb-6">
                   <div className="flex items-center gap-2 bg-white/40 backdrop-blur-[2px] px-3 py-1 rounded-full">
                     <span>March 21, 2026</span>
                     <span className="w-1 h-1 bg-[#B78A7D] rounded-full"></span>
                     <span>Bangkok</span>
                   </div>
                   <p className="font-semibold text-base text-[#B78A7D] mt-1 drop-shadow-sm">Dalva le ville</p>
                </div>

                {/* Countdown Timer */}
                <div className="flex items-center justify-center bg-white/70 backdrop-blur-md px-4 py-3 rounded-full border border-[#B78A7D]/20 shadow-[0_4px_15px_rgba(183,138,125,0.15)]">
                  <TimeUnit value={timeLeft.days} label="Days" />
                  <span className="font-serif text-lg text-[#8E5B50]/50 -mt-3">:</span>
                  <TimeUnit value={timeLeft.hours} label="Hrs" />
                  <span className="font-serif text-lg text-[#8E5B50]/50 -mt-3">:</span>
                  <TimeUnit value={timeLeft.minutes} label="Mins" />
                </div>
            </div>
         </div>

         {/* --- BOTTOM SECTION (Remaining Space - Solid Color) --- */}
         {/* Star Shape Decor */}
         <div className="relative flex-1 bg-[#FDFBF7] min-h-[35vh] flex items-center justify-center overflow-hidden">
            
            {/* Background Texture for seamless feel */}
            <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}></div>
            
            {/* The Star Shape (As requested) */}
            <div className="relative z-10 flex flex-col items-center animate-pulse-slow">
               {/* Main 4-point Star */}
               <svg className="w-16 h-16 text-[#C08E86]" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/>
               </svg>
               
               {/* Small accent stars */}
               <div className="absolute top-0 left-0 -translate-x-full -translate-y-1/2">
                  <svg className="w-4 h-4 text-[#B78A7D]/60 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
                  </svg>
               </div>
               <div className="absolute bottom-0 right-0 translate-x-full translate-y-1/2">
                  <svg className="w-4 h-4 text-[#B78A7D]/60 animate-pulse delay-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
                  </svg>
               </div>
            </div>

            {/* Optional text below star */}
            <div className="absolute bottom-8 text-center opacity-50">
               <p className="font-script text-xl text-[#B78A7D]">Save the Date</p>
            </div>
         </div>

      </div>


      {/* 
        =======================================================================
        💻 DESKTOP LAYOUT (Retaining Full Screen for Grandeur)
        =======================================================================
        Using similar gradient logic for consistency but keeping full height
      */}
      <div className="hidden md:flex flex-col items-center justify-center w-full min-h-screen relative">
        {/* Background Layers */}
        <div className="absolute inset-0 z-0">
          <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105"
              style={{ backgroundImage: `url("${bgUrl}")` }}
          ></div>
          
          {/* Desktop Gradients */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-gray-200/50 to-transparent mix-blend-multiply"></div>
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/80 to-transparent"></div>
          
          <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
        </div>

        {/* Content */}
        <div className="flex-1 w-full max-w-7xl flex flex-col items-center justify-center relative z-20 px-4 pb-12">
          <div className="text-center w-full relative pt-2">
            <p className="text-[#8E5B50] font-sans tracking-[0.25em] uppercase text-xl font-bold drop-shadow-sm mb-1">
              The Wedding Of
            </p>
            
            <h1 className="font-script leading-normal py-6 px-2 drop-shadow-sm flex flex-row items-center justify-center gap-4">
              <span className="text-7xl bg-gradient-to-r from-[#4A3728] via-[#8E5B50] to-[#4A3728] bg-clip-text text-transparent pb-2 px-2 whitespace-nowrap">
                Natthamonpisit
              </span>
              <span className="font-serif text-5xl text-[#B78A7D]">
                &
              </span>
              <span className="text-7xl bg-gradient-to-r from-[#4A3728] via-[#8E5B50] to-[#4A3728] bg-clip-text text-transparent pb-2 px-2 whitespace-nowrap">
                Sorot
              </span>
            </h1>
          </div>

          <div className="flex flex-col items-center gap-8 mt-4 w-full">
            <div className="flex flex-row items-center justify-center gap-8 text-2xl font-serif text-[#5D4037] font-medium drop-shadow-sm">
              <span>March 21, 2026</span>
              <span className="w-2 h-2 rounded-full bg-[#8E5B50]"></span>
              <span className="text-2xl">Dalva le ville, Bangkok</span>
            </div>
            
            <div className="w-16 h-px bg-[#8E5B50]/50 my-2"></div>

            <div className="flex items-center justify-center bg-white/70 backdrop-blur-md px-8 py-5 rounded-full border border-white/60 shadow-lg ring-1 ring-[#8E5B50]/10">
              <TimeUnit value={timeLeft.days} label="Days" />
              <span className="font-serif text-xl text-[#8E5B50]/50 -mt-3">:</span>
              <TimeUnit value={timeLeft.hours} label="Hours" />
              <span className="font-serif text-xl text-[#8E5B50]/50 -mt-3">:</span>
              <TimeUnit value={timeLeft.minutes} label="Minutes" />
              <span className="font-serif text-xl text-[#8E5B50]/50 -mt-3">:</span>
              <TimeUnit value={timeLeft.seconds} label="Seconds" />
            </div>
          </div>
        </div>

        {/* Desktop Bottom Star Decor */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center items-end gap-12 z-20 pointer-events-none">
            <svg className="w-5 h-5 text-[#B78A7D]/60 animate-pulse" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/></svg>
            <svg className="w-12 h-12 text-[#C08E86] animate-pulse-slow mb-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/></svg>
            <svg className="w-5 h-5 text-[#B78A7D]/60 animate-pulse delay-300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/></svg>
        </div>

      </div>

    </section>
  );
};
