
import React, { useState, useEffect } from 'react';
import { fetchGallery } from '../services/api';

/* 
  ========================================================================================
  🤵👰 COMPONENT: Hero (ส่วนหัวข้อหน้าแรก - Re-Layout V.12 The One Paper Concept)
  ========================================================================================
  
  [Design Concept]
  - "Paper Everywhere": No local backgrounds. Everything is transparent to show the global App.tsx texture.
  - 4 Vertical Blocks:
    1. Intro: "The Wedding Of"
    2. Main: Names -> Image (Landscape/Contain) -> Date/Location
    3. Timer: Countdown
    4. Footer: Star
*/

export const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const DEFAULT_BG_URL = "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920&auto=format&fit=crop&sat=-100";
  const [bgUrl, setBgUrl] = useState(DEFAULT_BG_URL);

  useEffect(() => {
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
    <div className="flex flex-col items-center mx-2 sm:mx-3">
      <span className="font-serif text-xl sm:text-2xl text-[#5D4037] font-medium tabular-nums leading-none drop-shadow-sm">
        {String(value).padStart(2, '0')}
      </span>
      <span className="font-sans text-[9px] text-[#8E5B50] uppercase tracking-[0.1em] mt-1 font-bold">
        {label}
      </span>
    </div>
  );

  return (
    // bg-transparent is KEY here. We rely 100% on App.tsx for the background color/texture.
    <section className="relative w-full h-[100dvh] bg-transparent overflow-hidden">
      
      {/* 
        =======================================================================
        📱 MOBILE LAYOUT (Flexbox Stack)
        =======================================================================
      */}
      <div className="md:hidden w-full h-full flex flex-col px-4">
         
         {/* [BLOCK 1] The Wedding Of */}
         <div className="flex-none h-[12%] flex items-end justify-center pb-2">
            <p className="text-[#5D4037] font-sans tracking-[0.3em] uppercase text-[10px] font-bold">
              The Wedding Of
            </p>
         </div>

         {/* [BLOCK 2] Names & Image & Date */}
         <div className="flex-1 flex flex-col items-center min-h-0">
             
             {/* 2.1 Names */}
             <div className="flex-none pt-2 pb-4 text-center z-10">
                <h1 
                  className="font-script text-[#C08E86] leading-none whitespace-nowrap drop-shadow-sm"
                  style={{ fontSize: '13vw' }} 
                >
                  Natthamonpisit
                </h1>
                <h1 
                  className="font-script text-[#C08E86] leading-none whitespace-nowrap drop-shadow-sm -mt-2"
                  style={{ fontSize: '13vw' }} 
                >
                  & Sorot
                </h1>
             </div>

             {/* 2.2 Image (The Heart) */}
             <div className="flex-1 w-full relative mb-4">
                <div 
                  className="absolute inset-0 bg-contain bg-center bg-no-repeat drop-shadow-xl"
                  style={{ backgroundImage: `url("${bgUrl}")` }}
                ></div>
             </div>

             {/* 2.3 Date & Location */}
             <div className="flex-none pb-4 text-center">
               <div className="flex flex-col items-center gap-1 text-[#5D4037] font-serif">
                 <span className="font-semibold text-xl tracking-wide">March 21, 2026</span>
                 <p className="font-medium text-xs text-[#B78A7D] tracking-[0.1em] uppercase">Dalva le ville, Bangkok</p>
               </div>
             </div>
         </div>

         {/* [BLOCK 3] Countdown */}
         <div className="flex-none pb-8 flex items-center justify-center">
            <div className="flex items-center justify-center">
              <TimeUnit value={timeLeft.days} label="Days" />
              <span className="font-serif text-lg text-[#8E5B50]/50 -mt-3">:</span>
              <TimeUnit value={timeLeft.hours} label="Hrs" />
              <span className="font-serif text-lg text-[#8E5B50]/50 -mt-3">:</span>
              <TimeUnit value={timeLeft.minutes} label="Mins" />
            </div>
         </div>

         {/* [BLOCK 4] Footer Star (The Anchor) */}
         <div className="flex-none h-[12%] flex items-start justify-center pt-2">
            <div className="flex flex-col items-center animate-pulse-slow">
               <svg className="w-10 h-10 text-[#C08E86]" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/>
               </svg>
               <div className="relative w-full h-4">
                  <svg className="absolute left-1/2 -translate-x-[200%] top-0 w-3 h-3 text-[#B78A7D]/60 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
                  </svg>
                  <svg className="absolute right-1/2 translate-x-[200%] top-0 w-3 h-3 text-[#B78A7D]/60 animate-pulse delay-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
                  </svg>
               </div>
            </div>
         </div>

      </div>


      {/* 
        =======================================================================
        💻 DESKTOP LAYOUT
        =======================================================================
      */}
      <div className="hidden md:flex flex-col items-center justify-center w-full min-h-screen relative">
        <div className="absolute inset-0 z-0">
          <div 
              className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-20 scale-95"
              style={{ backgroundImage: `url("${bgUrl}")` }}
          ></div>
        </div>

        <div className="flex-1 w-full max-w-7xl flex flex-col items-center justify-center relative z-20 px-4 pb-12">
          <div className="text-center w-full relative pt-2">
            <p className="text-[#8E5B50] font-sans tracking-[0.25em] uppercase text-xl font-bold drop-shadow-sm mb-1">
              The Wedding Of
            </p>
            <h1 className="font-script leading-normal py-6 px-2 drop-shadow-sm flex flex-row items-center justify-center gap-4">
              <span className="text-7xl bg-gradient-to-r from-[#4A3728] via-[#8E5B50] to-[#4A3728] bg-clip-text text-transparent pb-2 px-2 whitespace-nowrap">
                Natthamonpisit
              </span>
              <span className="font-serif text-5xl text-[#B78A7D]">&</span>
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
      </div>

    </section>
  );
};
