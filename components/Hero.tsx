import React, { useState, useEffect } from 'react';
import { fetchGallery } from '../services/api';

/* 
  ========================================================================================
  HERO COMPONENT - 4 BLOCKS CONCEPT (Unified Mobile & Desktop)
  ========================================================================================
  
  Structure:
  1. Top Block: "The Wedding Of" (Paper Texture)
  2. Image Block: Main Visual + Names Overlay (Hero Image)
  3. Countdown Block: Timer (Paper Texture)
  4. Footer Block: Star Icon (Paper Texture)
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

  // Responsive Time Unit
  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center mx-1.5 sm:mx-3 md:mx-6">
      <span className="font-serif text-xl sm:text-2xl md:text-4xl lg:text-5xl text-[#5D4037] font-medium tabular-nums leading-none drop-shadow-sm transition-all">
        {String(value).padStart(2, '0')}
      </span>
      <span className="font-sans text-[9px] md:text-xs text-[#8E5B50] uppercase tracking-[0.1em] mt-1 md:mt-3 font-bold transition-all">
        {label}
      </span>
    </div>
  );

  return (
    // bg-transparent ensures global App texture visibility for Blocks 1, 3, 4
    <section className="relative w-full h-[100dvh] bg-transparent overflow-hidden flex flex-col">
      
      {/* 
        =======================================================================
        📱 MOBILE LAYOUT (4 BLOCKS)
        =======================================================================
      */}
      <div className="md:hidden w-full h-full flex flex-col">
         
         {/* [BLOCK 1] Intro - Size updated to 18px */}
         <div className="flex-none h-[15%] flex items-center justify-center z-10">
            {/* Updated text color to text-gold-shine */}
            <p className="text-gold-shine font-sans tracking-[0.3em] uppercase text-[18px] font-bold mt-2">
              The Wedding Of
            </p>
         </div>

         {/* [BLOCK 2] Image Card */}
         <div className="flex-grow w-full relative z-0 bg-charcoal">
             {/* 
                 DESIGN UPDATE:
                 - Added 'brightness-[0.7]' -> Fades image by 30% (Darkens it)
                 - Added 'grayscale' -> Ensures B&W look
             */}
             <div 
               className="absolute inset-0 bg-cover bg-center bg-no-repeat shadow-inner brightness-[0.7] grayscale"
               style={{ backgroundImage: `url("${bgUrl}")` }}
             >
               {/* Soft overlay to smoothen contrast */}
               <div className="absolute inset-0 bg-black/20"></div>
             </div>

             <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 w-full">
                <h1 
                  className="font-script text-[#FDFBF7] leading-none whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] w-full px-1"
                  style={{ fontSize: '9vw' }} 
                >
                  Natthamonpisit & Sorot
                </h1>
                
                <div className="mt-4 flex flex-col items-center gap-2 text-[#FDFBF7] drop-shadow-md animate-fade-in">
                   {/* Mobile Tuning: Increased font size to 11px and adjusted spacing */}
                   <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-bold">March 21, 2026</span>
                   <div className="w-8 h-px bg-white/50"></div>
                   <p className="font-sans text-[11px] uppercase tracking-[0.2em] opacity-90 text-[#EBCBC5]">Dalva le ville, Bangkok</p>
                </div>
             </div>
         </div>

         {/* [BLOCK 3] Countdown */}
         <div className="flex-none h-[18%] flex items-center justify-center z-10">
            <div className="flex items-center justify-center">
              <TimeUnit value={timeLeft.days} label="Days" />
              <span className="font-serif text-lg text-[#8E5B50]/50 -mt-3">:</span>
              <TimeUnit value={timeLeft.hours} label="Hrs" />
              <span className="font-serif text-lg text-[#8E5B50]/50 -mt-3">:</span>
              <TimeUnit value={timeLeft.minutes} label="Mins" />
              <span className="font-serif text-lg text-[#8E5B50]/50 -mt-3">:</span>
              <TimeUnit value={timeLeft.seconds} label="Secs" />
            </div>
         </div>

         {/* [BLOCK 4] Footer Star */}
         <div className="flex-none h-[12%] flex items-start justify-center pt-2 z-10">
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
        💻 DESKTOP LAYOUT (ADAPTED 4 BLOCKS CONCEPT)
        =======================================================================
      */}
      <div className="hidden md:flex flex-col w-full h-full relative z-10">
        
         {/* [BLOCK 1] Intro - Size updated to text-2xl */}
         <div className="flex-none h-[15%] flex items-center justify-center">
            {/* Updated text color to text-gold-shine */}
            <p className="text-gold-shine font-sans tracking-[0.4em] uppercase text-2xl font-bold translate-y-2">
              The Wedding Of
            </p>
         </div>

         {/* [BLOCK 2] Image Card */}
         {/* Uses padding to create a 'frame' effect on desktop, more elegant than full bleed */}
         <div className="flex-grow w-full px-8 lg:px-12 pb-4">
             <div className="w-full h-full relative rounded-sm overflow-hidden shadow-2xl group bg-charcoal">
                 {/* 
                     DESIGN UPDATE:
                     - Added 'brightness-[0.7]' and 'grayscale'
                 */}
                 <div 
                   className="absolute inset-0 bg-cover bg-center bg-no-repeat transform group-hover:scale-105 transition-transform duration-[20s] brightness-[0.7] grayscale"
                   style={{ backgroundImage: `url("${bgUrl}")` }}
                 >
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/15 transition-colors duration-700"></div>
                 </div>
                 
                 {/* Content */}
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <h1 className="font-script text-7xl lg:text-9xl text-[#FDFBF7] drop-shadow-lg whitespace-nowrap leading-none pb-4">
                      Natthamonpisit & Sorot
                    </h1>
                    
                    <div className="flex items-center gap-6 text-[#FDFBF7] mt-2 animate-fade-in backdrop-blur-sm bg-white/5 px-8 py-2 rounded-full border border-white/10">
                       {/* Date Size matched to Location Size */}
                       <span className="font-sans text-xs lg:text-sm uppercase tracking-[0.25em] font-bold">March 21, 2026</span>
                       <span className="w-2 h-2 rounded-full bg-[#EBCBC5]"></span>
                       <span className="font-sans text-xs lg:text-sm uppercase tracking-[0.25em] text-[#EBCBC5] font-bold">Dalva le ville, Bangkok</span>
                    </div>
                 </div>
             </div>
         </div>

         {/* [BLOCK 3] Countdown */}
         <div className="flex-none h-[15%] flex items-center justify-center">
             <div className="flex items-center justify-center">
                  <TimeUnit value={timeLeft.days} label="Days" />
                  <span className="font-serif text-3xl md:text-5xl text-[#8E5B50]/50 -mt-4 mx-2 md:mx-4">:</span>
                  <TimeUnit value={timeLeft.hours} label="Hours" />
                  <span className="font-serif text-3xl md:text-5xl text-[#8E5B50]/50 -mt-4 mx-2 md:mx-4">:</span>
                  <TimeUnit value={timeLeft.minutes} label="Minutes" />
                  <span className="font-serif text-3xl md:text-5xl text-[#8E5B50]/50 -mt-4 mx-2 md:mx-4">:</span>
                  <TimeUnit value={timeLeft.seconds} label="Seconds" />
             </div>
         </div>

         {/* [BLOCK 4] Footer Star */}
         <div className="flex-none h-[10%] flex items-start justify-center pt-2">
             <div className="flex flex-col items-center animate-pulse-slow hover:text-[#B78A7D] transition-colors cursor-default">
               <svg className="w-10 h-10 lg:w-12 lg:h-12 text-[#C08E86]" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/>
               </svg>
               <div className="flex gap-8 mt-1 opacity-60">
                  <svg className="w-4 h-4 text-[#B78A7D]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
                  </svg>
                  <svg className="w-4 h-4 text-[#B78A7D]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
                  </svg>
               </div>
            </div>
         </div>

      </div>

    </section>
  );
};