
import React, { useState, useEffect } from 'react';
import { fetchGallery } from '../services/api';

/* 
  ========================================================================================
  🤵👰 COMPONENT: Hero (ส่วนหัวข้อหน้าแรก - Re-Layout V.11 Seamless Texture Everywhere)
  ========================================================================================
  
  [Request]
  1. Fill the cream color (#FDFBF7) and texture (cream-paper) up to the top.
  2. Make the whole website look like one continuous piece of paper.
  3. Image container background becomes transparent to reveal the paper texture.
*/

export const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // รูปขาวดำ
  const DEFAULT_BG_URL = "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920&auto=format&fit=crop&sat=-100";
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
    <div className="flex flex-col items-center mx-2 sm:mx-3">
      <span className="font-serif text-xl sm:text-2xl text-[#5D4037] font-medium tabular-nums leading-none drop-shadow-md">
        {String(value).padStart(2, '0')}
      </span>
      <span className="font-sans text-[9px] text-[#8E5B50] uppercase tracking-[0.1em] mt-1 font-bold shadow-white">
        {label}
      </span>
    </div>
  );

  return (
    <section className="relative w-full bg-[#FDFBF7]">
      
      {/* 
         GLOBAL TEXTURE LAYER (The Base)
         This creates the seamless paper look from the very top.
      */}
      <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none bg-fixed z-0" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}>
      </div>

      {/* 
        =======================================================================
        📱 MOBILE LAYOUT (4-Block Vertical Stack)
        =======================================================================
      */}
      <div className="md:hidden relative w-full h-[100dvh] flex flex-col z-10">
         
         {/* 
            LAYER B: BACKGROUND IMAGE (Underlying Layer)
            - bg-transparent: To let the global texture show through the empty spaces
         */}
         <div className="absolute top-0 left-0 w-full h-[75%] overflow-hidden z-0 bg-transparent">
            <div 
              className="absolute inset-0 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url("${bgUrl}")` }}
            ></div>
         </div>

         {/* 
            LAYER D: CONTENT BLOCKS (Z-Index 10)
         */}
         
         {/* [BLOCK 1] The Wedding Of (Intro) */}
         <div className="relative z-10 flex-none pt-12 pb-2 flex items-end justify-center h-[15%]">
            <p className="text-[#5D4037] font-sans tracking-[0.3em] uppercase text-[10px] font-bold drop-shadow-sm">
              The Wedding Of
            </p>
         </div>

         {/* [BLOCK 2] Names & Details (Main Content) */}
         <div className="relative z-10 flex-grow flex flex-col items-center justify-center -mt-4">
             <h1 
               className="font-script text-[#C08E86] leading-none whitespace-nowrap drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] text-center px-1"
               style={{ fontSize: '9vw' }} 
             >
               Natthamonpisit & Sorot
             </h1>
             <div className="flex flex-col items-center gap-1 text-[#5D4037] font-serif text-sm drop-shadow-md mt-4">
               <div className="flex items-center gap-2">
                 <span className="font-semibold text-lg">March 21, 2026</span>
               </div>
               <p className="font-medium text-sm text-[#B78A7D] tracking-wide">Dalva le ville, Bangkok</p>
             </div>
         </div>

         {/* [BLOCK 3] Countdown Timer */}
         <div className="relative z-10 flex-none pb-8 flex items-center justify-center">
            <div className="flex items-center justify-center pt-2">
              <TimeUnit value={timeLeft.days} label="Days" />
              <span className="font-serif text-lg text-[#8E5B50]/50 -mt-3">:</span>
              <TimeUnit value={timeLeft.hours} label="Hrs" />
              <span className="font-serif text-lg text-[#8E5B50]/50 -mt-3">:</span>
              <TimeUnit value={timeLeft.minutes} label="Mins" />
            </div>
         </div>

         {/* [BLOCK 4] Footer Star (The Anchor) */}
         <div className="relative z-20 flex-none h-[25%] bg-[#FDFBF7] rounded-t-[2rem] -mt-6 flex items-center justify-center shadow-[0_-10px_40px_rgba(253,251,247,1)]">
            
            {/* Texture Matcher: Uses the exact same texture settings */}
            <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none bg-fixed rounded-t-[2rem]" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}></div>

            <div className="relative z-10 flex flex-col items-center animate-pulse-slow">
               <svg className="w-14 h-14 text-[#C08E86]" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/>
               </svg>
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
         </div>

      </div>


      {/* 
        =======================================================================
        💻 DESKTOP LAYOUT (Updated Base)
        =======================================================================
      */}
      <div className="hidden md:flex flex-col items-center justify-center w-full min-h-screen relative bg-transparent">
        <div className="absolute inset-0 z-0">
          <div 
              className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105"
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

        <div className="absolute bottom-12 left-0 right-0 flex justify-center items-end gap-12 z-20 pointer-events-none">
            <svg className="w-5 h-5 text-[#B78A7D]/60 animate-pulse" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/></svg>
            <svg className="w-12 h-12 text-[#C08E86] animate-pulse-slow mb-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/></svg>
            <svg className="w-5 h-5 text-[#B78A7D]/60 animate-pulse delay-300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/></svg>
        </div>

      </div>

    </section>
  );
};
