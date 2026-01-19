
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
  const [bgUrl, setBgUrl] = useState(`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto,c_cover/${DEFAULT_BG_ID}`);

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
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#5D4037] font-medium tabular-nums leading-none drop-shadow-sm">
        {String(value).padStart(2, '0')}
      </span>
      <span className="font-sans text-[8px] sm:text-[10px] text-[#8E5B50] uppercase tracking-[0.2em] mt-1 sm:mt-2 font-semibold">
        {label}
      </span>
    </div>
  );

  return (
    <section className="relative h-screen min-h-[700px] flex flex-col items-center text-center px-4 overflow-hidden">
      
      {/* 1. Main Background Image (Layer 0) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transition-transform duration-[20s] ease-linear hover:scale-105"
        style={{ backgroundImage: `url("${bgUrl}")` }}
      ></div>

      {/* 2. Soft Overlay (Layer 10) */}
      <div className="absolute inset-0 bg-[#FDFBF7]/60 z-10 mix-blend-overlay"></div>
      
      {/* 3. Gradient Fade (Layer 10) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/90 via-white/30 to-[#FDFBF7] z-10"></div>

      {/* 4. Texture Overlay (Layer 10) */}
      <div className="absolute inset-0 opacity-40 pointer-events-none z-10 mix-blend-multiply" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}></div>

      {/* Main Content Area - Z-Index 50 (TOPMOST) */}
      {/* 
          FIX: Increased top padding (pt-32 -> pt-44) to create more space at the top
          Added max-w-[95vw] to ensure it never exceeds screen width on mobile.
      */}
      <div className="pt-32 sm:pt-40 md:pt-48 animate-slide-up space-y-4 w-full max-w-[95vw] md:max-w-7xl flex flex-col items-center relative z-50 mx-auto">
        <div className="space-y-2 md:space-y-6 w-full px-2">
          {/* Headline */}
          <p className="text-[#8E5B50] font-sans tracking-[0.25em] uppercase text-xs sm:text-sm md:text-xl font-bold drop-shadow-sm">
            The Wedding Of
          </p>
          
          {/* Names */}
          {/* 
             REDUCED FONT SIZES:
             - Mobile: text-4xl (was 5xl)
             - Tablet: text-5xl (was 6xl)
             - Desktop: text-7xl (was 8xl)
          */}
          <h1 className="font-script leading-normal py-2 px-2 md:px-4 drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)] flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3">
            
            {/* Name 1 */}
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-[#4A3728] via-[#8E5B50] to-[#4A3728] bg-clip-text text-transparent pb-1 md:pb-0">
              Natthamonpisit
            </span>

            {/* Ampersand */}
            <span className="font-serif text-2xl sm:text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-b from-[#B78A7D] to-[#8E5B50] my-0.5 md:my-0">
              &
            </span>

            {/* Name 2 */}
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-[#4A3728] via-[#8E5B50] to-[#4A3728] bg-clip-text text-transparent pb-1 md:pb-0">
              Sorot
            </span>
          </h1>
        </div>

        {/* Info Section */}
        <div className="flex flex-col items-center gap-4 sm:gap-6 w-full pt-4">
          {/* Date & Location */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 text-base sm:text-lg md:text-2xl font-serif text-[#5D4037] font-medium drop-shadow-sm">
            <span>March 21, 2026</span>
            <span className="hidden md:block w-2 h-2 rounded-full bg-[#8E5B50]"></span>
            <span className="text-sm sm:text-lg md:text-2xl">Dalva le ville, Bangkok</span>
          </div>
          
          {/* Divider */}
          <div className="w-12 sm:w-16 h-px bg-[#8E5B50]/50 my-2"></div>

          {/* Countdown Timer */}
          <div className="flex items-center justify-center mt-2 scale-90 sm:scale-100 bg-white/70 backdrop-blur-md px-6 py-4 sm:px-8 sm:py-5 rounded-full border border-white/60 shadow-lg ring-1 ring-[#8E5B50]/10 max-w-[90vw]">
            <TimeUnit value={timeLeft.days} label="Days" />
            <span className="font-serif text-xl sm:text-2xl text-[#8E5B50]/50 -mt-3 sm:-mt-4">:</span>
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <span className="font-serif text-xl sm:text-2xl text-[#8E5B50]/50 -mt-3 sm:-mt-4">:</span>
            <TimeUnit value={timeLeft.minutes} label="Minutes" />
            <span className="font-serif text-xl sm:text-2xl text-[#8E5B50]/50 -mt-3 sm:-mt-4">:</span>
            <TimeUnit value={timeLeft.seconds} label="Seconds" />
          </div>
        </div>
      </div>

      {/* Arrow Container REMOVED as requested */}
    </section>
  );
};
