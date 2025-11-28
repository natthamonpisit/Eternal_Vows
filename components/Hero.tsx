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
      <span className="font-serif text-3xl md:text-5xl text-charcoal font-medium tabular-nums leading-none">
        {String(value).padStart(2, '0')}
      </span>
      <span className="font-sans text-[10px] md:text-xs text-gold uppercase tracking-[0.2em] mt-2">
        {label}
      </span>
    </div>
  );

  return (
    <section className="relative h-screen min-h-[700px] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* 1. Subtle Paper Texture Background (Replaced Image) */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}></div>

      <div className="animate-slide-up space-y-8 max-w-5xl flex flex-col items-center relative z-10">
        <div className="space-y-4">
          <p className="text-gold-shine font-sans tracking-[0.2em] uppercase text-sm md:text-base font-bold">The Wedding Of</p>
          {/* 2. Names in Charcoal (Black), Only & in Gold */}
          <h1 className="font-script text-5xl md:text-7xl lg:text-8xl text-charcoal drop-shadow-sm leading-tight">
            Natthamonpisit <span className="text-gold mx-2">&</span> Sorot
          </h1>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 text-lg md:text-2xl font-serif text-charcoal/80">
            <span>March 21, 2026</span>
            <span className="hidden md:block w-2 h-2 rounded-full bg-gold"></span>
            <span>Dalva le ville, Bangkok</span>
          </div>
          
          <div className="w-16 h-px bg-gold/30 my-2"></div>

          {/* Countdown Timer */}
          <div className="flex items-center justify-center mt-2">
            <TimeUnit value={timeLeft.days} label="Days" />
            <span className="font-serif text-2xl text-gold/50 -mt-4">:</span>
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <span className="font-serif text-2xl text-gold/50 -mt-4">:</span>
            <TimeUnit value={timeLeft.minutes} label="Minutes" />
            <span className="font-serif text-2xl text-gold/50 -mt-4">:</span>
            <TimeUnit value={timeLeft.seconds} label="Seconds" />
          </div>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <div className="absolute bottom-10 animate-bounce text-gold/80 z-10">
        <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};