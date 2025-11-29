import React, { useState, useEffect } from 'react';

export const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

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
      {/* 1. Subtle Paper Texture Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}></div>

      {/* Main Content Area - Top Aligned with Padding */}
      {/* Reduced padding-top to move content up and prevent overlap with bottom arrow */}
      {/* Reduced space-y to bring Date/Location closer to Names */}
      <div className="pt-20 sm:pt-24 md:pt-32 animate-slide-up space-y-2 sm:space-y-3 md:space-y-4 max-w-5xl flex flex-col items-center relative z-10 w-full">
        <div className="space-y-4 w-full">
          {/* Responsive Font Size for Header */}
          <p className="text-gold-shine font-sans tracking-[0.2em] uppercase text-sm sm:text-xl md:text-3xl font-bold">The Wedding Of</p>
          
          {/* Names in Charcoal - Fluid Typography optimized for all screens */}
          {/* text-[11vw] for mobile to maximize size without breaking, capped at lg sizes */}
          <h1 className="font-script text-[11vw] sm:text-[8vw] lg:text-9xl text-charcoal drop-shadow-sm leading-tight whitespace-nowrap px-1">
            Natthamonpisit <span className="text-gold mx-0.5 sm:mx-2">&</span> Sorot
          </h1>
        </div>

        {/* Tightened gap to move time up */}
        <div className="flex flex-col items-center gap-2 sm:gap-4 w-full">
          {/* Responsive Font Size for Date/Location */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 text-lg sm:text-2xl md:text-3xl lg:text-4xl font-serif text-charcoal/80">
            <span>March 21, 2026</span>
            <span className="hidden md:block w-2 h-2 rounded-full bg-gold"></span>
            <span>Dalva le ville, Bangkok</span>
          </div>
          
          {/* Reduced vertical margin for divider */}
          <div className="w-12 sm:w-16 h-px bg-gold/30 my-1"></div>

          {/* Countdown Timer - Removed top margin to pull it closer */}
          <div className="flex items-center justify-center mt-0 scale-90 sm:scale-100">
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

      {/* Arrow Container: Fills the remaining space to center the arrow vertically */}
      <div className="flex-1 flex items-center justify-center relative z-10 w-full pb-24">
        <div className="animate-bounce text-gold/80">
          <svg className="w-8 h-8 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
};