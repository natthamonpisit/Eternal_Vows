
import React, { useState, useEffect } from 'react';
import { fetchGallery } from '../services/api';

export const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Default Fallback Image (รูปปัจจุบันที่พี่ส่งมา)
  // ใช้เป็นค่าเริ่มต้นเพื่อให้เว็บโหลดไว (LCP) ก่อนที่ API จะไปเช็ครูปใหม่มาให้
  const DEFAULT_BG_ID = "Wedding_OukBew/BG/7e0b499b-7fa4-4a7d-99e0-8068afce2e07_1_prgbpm";
  const CLOUD_NAME = "damfrrvrb";
  const [bgUrl, setBgUrl] = useState(`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto,c_cover/${DEFAULT_BG_ID}`);

  // Fetch Background Dynamically from 'Wedding_OukBew/BG' folder
  useEffect(() => {
    const loadDynamicBg = async () => {
      try {
        // ดึงรูปจาก Folder BG โดยตรง
        const images = await fetchGallery('Wedding_OukBew/BG');
        if (images.length > 0) {
          // ถ้ามีรูปใน Folder ให้ใช้รูปแรกที่เจอ (ล่าสุด)
          // ระบบจะ Override รูป Default ให้เองถ้าพี่อัพรูปใหม่เข้าไป
          setBgUrl(images[0].full);
        }
      } catch (error) {
        console.warn("Could not fetch dynamic BG, using default.");
      }
    };
    loadDynamicBg();
  }, []);

  useEffect(() => {
    // Target date: March 21, 2026 at 09:00 AM
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
      <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal font-medium tabular-nums leading-none">
        {String(value).padStart(2, '0')}
      </span>
      <span className="font-sans text-[8px] sm:text-[10px] text-gold uppercase tracking-[0.2em] mt-1 sm:mt-2">
        {label}
      </span>
    </div>
  );

  return (
    <section className="relative h-screen min-h-[700px] flex flex-col items-center text-center px-4 overflow-hidden">
      
      {/* 1. Main Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transition-transform duration-[20s] ease-linear hover:scale-105"
        style={{ backgroundImage: `url("${bgUrl}")` }}
      ></div>

      {/* 2. Soft Overlay (Cream Tint) - Helps text pop against the photo */}
      <div className="absolute inset-0 bg-cream/50 z-0 mix-blend-overlay"></div>
      
      {/* 3. Gradient Fade (Top & Bottom) - Ensures text readability at top, and smooth transition at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream/80 via-white/20 to-cream z-0"></div>

      {/* 4. Texture Overlay (Original Paper Texture) - Keeps the vintage feel */}
      <div className="absolute inset-0 opacity-40 pointer-events-none z-0 mix-blend-multiply" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}></div>

      {/* Main Content Area - Top Aligned with Padding */}
      <div className="pt-20 sm:pt-24 md:pt-32 animate-slide-up space-y-2 sm:space-y-3 md:space-y-4 max-w-5xl flex flex-col items-center relative z-10 w-full">
        <div className="space-y-4 w-full">
          {/* Responsive Font Size for Header */}
          <p className="text-gold-shine font-sans tracking-[0.2em] uppercase text-sm sm:text-xl md:text-3xl font-bold drop-shadow-sm">The Wedding Of</p>
          
          {/* Names in Charcoal */}
          <h1 className="font-script text-[11vw] sm:text-[8vw] lg:text-9xl text-charcoal drop-shadow-md leading-tight whitespace-nowrap px-1">
            Natthamonpisit <span className="text-gold mx-0.5 sm:mx-2">&</span> Sorot
          </h1>
        </div>

        {/* Tightened gap to move time up */}
        <div className="flex flex-col items-center gap-2 sm:gap-4 w-full">
          {/* Responsive Font Size for Date/Location */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 text-lg sm:text-2xl md:text-3xl lg:text-4xl font-serif text-charcoal/90 font-medium">
            <span>March 21, 2026</span>
            <span className="hidden md:block w-2 h-2 rounded-full bg-gold"></span>
            <span>Dalva le ville, Bangkok</span>
          </div>
          
          {/* Reduced vertical margin for divider */}
          <div className="w-12 sm:w-16 h-px bg-gold/50 my-1"></div>

          {/* Countdown Timer */}
          <div className="flex items-center justify-center mt-0 scale-90 sm:scale-100 bg-white/40 backdrop-blur-sm px-6 py-4 rounded-full border border-white/50 shadow-sm">
            <TimeUnit value={timeLeft.days} label="Days" />
            <span className="font-serif text-xl sm:text-2xl text-gold/50 -mt-3 sm:-mt-4">:</span>
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <span className="font-serif text-xl sm:text-2xl text-gold/50 -mt-3 sm:-mt-4">:</span>
            <TimeUnit value={timeLeft.minutes} label="Minutes" />
            <span className="font-serif text-xl sm:text-2xl text-gold/50 -mt-3 sm:-mt-4">:</span>
            <TimeUnit value={timeLeft.seconds} label="Seconds" />
          </div>
        </div>
      </div>

      {/* Arrow Container */}
      <div className="flex-1 flex items-center justify-center relative z-10 w-full pb-24">
        <div className="animate-bounce text-charcoal/80 drop-shadow-sm">
          <svg className="w-8 h-8 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
};
