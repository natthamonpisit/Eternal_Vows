
import React, { useState, useEffect } from 'react';
import { fetchGallery } from '../services/api';

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
    <div className="flex flex-col items-center mx-1.5 sm:mx-2 md:mx-4">
      <span className="font-serif text-xl sm:text-3xl md:text-4xl text-[#5D4037] font-medium tabular-nums leading-none drop-shadow-sm">
        {String(value).padStart(2, '0')}
      </span>
      <span className="font-sans text-[8px] sm:text-[10px] text-[#8E5B50] uppercase tracking-[0.2em] mt-1 sm:mt-2 font-semibold">
        {label}
      </span>
    </div>
  );

  return (
    <section className="relative min-h-screen bg-[#FDFBF7] overflow-x-hidden">
      
      {/* 
        =======================================================================
        MOBILE LAYOUT
        =======================================================================
      */}
      <div className="md:hidden relative w-full min-h-[100dvh] bg-[#FDFBF7] flex flex-col justify-between">
         
         {/* 1. IMAGE & TEXT AREA (Top Section) */}
         <div className="relative w-full">
            <img 
              src={bgUrl} 
              alt="Wedding Couple" 
              className="w-full h-auto object-contain block" 
              onError={(e) => {
                 (e.target as HTMLImageElement).src = DEFAULT_BG_URL;
              }}
            />
            
            {/* Seamless Fade Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/90 to-transparent pointer-events-none"></div>

            {/* Names Overlay */}
            <div className="absolute bottom-0 left-0 right-0 pb-4 px-4 text-center z-10">
                <p className="text-[#B78A7D] font-sans tracking-[0.25em] uppercase text-[10px] font-bold mb-1 shadow-white/50">
                  The Wedding Of
                </p>
                
                <h1 className="font-script leading-none py-2 flex flex-col items-center justify-center gap-2 w-full">
                  <span className="text-4xl text-[#C08E86] whitespace-nowrap drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                    Natthamonpisit
                  </span>
                  <span className="font-serif text-2xl text-[#B78A7D] relative">
                    &
                  </span>
                  <span className="text-4xl text-[#C08E86] whitespace-nowrap drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                    Sorot
                  </span>
                </h1>
            </div>
         </div>

         {/* 2. CONTENT AREA (Bottom Section) */}
         <div className="flex-1 flex flex-col items-center justify-start pt-2 relative z-10 pb-6 px-4">
            
            {/* Sparkles Decor - Top */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <svg className="absolute top-4 left-8 w-4 h-4 text-[#EBCBC5] animate-pulse" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/></svg>
                <svg className="absolute bottom-20 right-8 w-6 h-6 text-[#C08E86]/30 animate-pulse delay-700" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/></svg>
            </div>

            {/* Countdown Timer */}
            <div className="relative z-10 mt-1">
                <div className="flex items-center justify-center bg-white/60 backdrop-blur-sm px-6 py-4 rounded-full border border-[#B78A7D]/20 shadow-[0_4px_20px_rgba(183,138,125,0.1)]">
                  <TimeUnit value={timeLeft.days} label="Days" />
                  <span className="font-serif text-lg text-[#8E5B50]/50 -mt-2">:</span>
                  <TimeUnit value={timeLeft.hours} label="Hours" />
                  <span className="font-serif text-lg text-[#8E5B50]/50 -mt-2">:</span>
                  <TimeUnit value={timeLeft.minutes} label="Mins" />
                </div>
            </div>

            {/* Info */}
            <div className="text-center mt-6 space-y-2 relative z-10">
                <div className="h-px w-12 bg-[#B78A7D]/30 mx-auto mb-4"></div>
                <p className="font-sans text-[#B78A7D] text-[10px] uppercase tracking-[0.2em] font-bold">
                    #OukBewTheWedding
                </p>
                <div className="flex flex-col items-center justify-center gap-1 text-[#5D4037] font-serif text-sm">
                   <div className="flex items-center gap-2">
                     <span>March 21, 2026</span>
                     <span className="w-1 h-1 bg-[#B78A7D] rounded-full"></span>
                     <span>Bangkok</span>
                   </div>
                   {/* Emphasized Venue Name */}
                   <p className="font-semibold text-lg text-[#B78A7D] mt-1 drop-shadow-sm">Dalva le ville</p>
                </div>
            </div>

            {/* Bottom Transition Decor: 3 Sparkles */}
            {/* Moved UP significantly to bottom-28 (approx 7rem) to fill the white space gap */}
            <div className="absolute bottom-28 left-0 right-0 flex justify-center items-end gap-6 md:gap-8 z-20 pointer-events-none">
                {/* Small Left Star */}
                <svg className="w-4 h-4 text-[#B78A7D]/60 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
                </svg>
                
                {/* Big Center Star */}
                <svg className="w-12 h-12 text-[#C08E86] animate-pulse-slow mb-3" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/>
                </svg>

                {/* Small Right Star */}
                <svg className="w-4 h-4 text-[#B78A7D]/60 animate-pulse delay-300" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
                </svg>
            </div>

         </div>
      </div>


      {/* 
        =======================================================================
        DESKTOP LAYOUT
        =======================================================================
      */}
      <div className="hidden md:flex flex-col items-center justify-center w-full min-h-screen relative">
        {/* Background Layers */}
        <div className="absolute inset-0 z-0">
          <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105"
              style={{ backgroundImage: `url("${bgUrl}")` }}
          ></div>
          <div className="absolute inset-0 bg-[#FDFBF7]/60 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/90 via-white/30 to-[#FDFBF7]"></div>
        </div>

        {/* Texture */}
        <div className="absolute inset-0 opacity-40 pointer-events-none z-10 mix-blend-multiply" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}></div>

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

        {/* Desktop Bottom Decor - 3 Stars */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center items-end gap-12 z-20 pointer-events-none">
            <svg className="w-5 h-5 text-[#B78A7D]/60 animate-pulse" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/></svg>
            <svg className="w-10 h-10 text-[#C08E86] animate-pulse-slow mb-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/></svg>
            <svg className="w-5 h-5 text-[#B78A7D]/60 animate-pulse delay-300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/></svg>
        </div>

      </div>

    </section>
  );
};
