
import React, { useState, useEffect } from 'react';
import { fetchGallery } from '../services/api';

export const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Default Fallback Image
  const DEFAULT_BG_ID = "Wedding_OukBew/BG/7e0b499b-7fa4-4a7d-99e0-8068afce2e07_1_prgbpm";
  const CLOUD_NAME = "damfrrvrb";
  const [bgUrl, setBgUrl] = useState(`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto,c_limit,w_1080/${DEFAULT_BG_ID}`);

  // Fetch Background Dynamically from 'Wedding_OukBew/BG' folder
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
        - Seamless Fade: Gradient from Image to Cream
        - Text: Rusty Pink (Rose Gold) + Glow
        - Decor: Vector Rose at bottom
        =======================================================================
      */}
      <div className="md:hidden relative w-full min-h-[100dvh] bg-[#FDFBF7] flex flex-col">
         
         {/* 1. Image Section */}
         <div className="relative w-full">
            <img 
              src={bgUrl} 
              alt="Wedding Couple" 
              className="w-full h-auto object-contain block" 
            />
            
            {/* Seamless Fade Gradient: ไล่จากรูป (Transparent) ลงมาเป็นสีครีม (#FDFBF7) ให้เนียน */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/80 to-transparent pointer-events-none"></div>
         </div>

         {/* 2. Text Overlay (Floating higher up on the image) */}
         <div className="absolute top-[28%] left-0 right-0 z-20 flex flex-col items-center justify-center px-4">
            
            <p className="text-[#EBCBC5] font-sans tracking-[0.25em] uppercase text-[10px] font-bold mb-2 drop-shadow-md">
              The Wedding Of
            </p>
            
            {/* Names: Rusty Pink (Theme Color) with Text Shadow/Glow for readability */}
            <h1 className="font-script leading-tight py-2 flex flex-col items-center justify-center gap-1 w-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              <span className="text-4xl text-[#EBCBC5] whitespace-nowrap bg-clip-text">
                Natthamonpisit
              </span>
              <span className="font-serif text-2xl text-[#C08E86] relative top-1">
                &
              </span>
              <span className="text-4xl text-[#EBCBC5] whitespace-nowrap">
                Sorot
              </span>
            </h1>

            {/* Date - Darker tone (Old Rose) because it might sit on the faded part */}
             <div className="flex flex-col items-center gap-2 mt-3 font-serif text-[#C08E86] text-sm font-medium tracking-wide drop-shadow-sm">
                <span>March 21, 2026</span>
                <span className="w-1 h-1 rounded-full bg-[#C08E86]"></span>
                <span className="text-xs uppercase tracking-widest">Dalva le ville, Bangkok</span>
            </div>
         </div>

         {/* 3. Bottom Section: Timer & Rose Decor */}
         <div className="flex-1 bg-[#FDFBF7] flex flex-col items-center justify-start pt-4 relative -mt-4 z-10 pb-12">
            
            {/* VECTOR ROSE (Line Art) - Background Decor */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 opacity-10 pointer-events-none text-[#B78A7D]">
                <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5">
                   <path d="M100 130 C 90 120, 80 140, 100 180 C 120 140, 110 120, 100 130" /> {/* Stem/Leaf base */}
                   <path d="M100 130 C 70 110, 60 70, 100 40 C 140 70, 130 110, 100 130" /> {/* Outer Bud */}
                   <path d="M100 40 C 80 60, 85 90, 100 100 C 115 90, 120 60, 100 40" /> {/* Inner Petals */}
                   <path d="M100 40 C 95 35, 105 35, 100 40" /> {/* Tip */}
                   <path d="M70 100 Q 50 80 60 120" strokeLinecap="round" /> {/* Left Leaf */}
                   <path d="M130 100 Q 150 80 140 120" strokeLinecap="round" /> {/* Right Leaf */}
                </svg>
            </div>

            {/* Countdown Timer */}
            <div className="relative z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm px-5 py-4 rounded-full border border-[#B78A7D]/20 shadow-[0_4px_20px_rgba(183,138,125,0.15)] mt-2 mx-4">
              <TimeUnit value={timeLeft.days} label="Days" />
              <span className="font-serif text-lg text-[#8E5B50]/50 -mt-2">:</span>
              <TimeUnit value={timeLeft.hours} label="Hours" />
              <span className="font-serif text-lg text-[#8E5B50]/50 -mt-2">:</span>
              <TimeUnit value={timeLeft.minutes} label="Mins" />
            </div>

            <p className="mt-8 font-sans text-[10px] text-[#8E5B50]/60 uppercase tracking-widest relative z-10">
                #OukBewTheWedding
            </p>
         </div>

      </div>


      {/* 
        =======================================================================
        DESKTOP LAYOUT (Unchanged)
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
      </div>

    </section>
  );
};
