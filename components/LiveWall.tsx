import React, { useEffect, useState } from 'react';
import { fetchWishes } from '../services/api';
import { GuestWishes } from '../types';

export const LiveWall: React.FC = () => {
  const [wishes, setWishes] = useState<GuestWishes[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Slideshow State
  const [activeIndex, setActiveIndex] = useState(0);

  const loadWishes = async () => {
    setIsRefreshing(true);
    const data = await fetchWishes();
    
    // Check if new data is different to avoid unnecessary re-renders/resets
    setWishes(prev => {
      return data;
    });
    
    setLoading(false);
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadWishes();
    const interval = setInterval(loadWishes, 15000); // Fetch new data every 15s
    
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Auto-Rotate Slideshow (Every 6 seconds)
  useEffect(() => {
    if (wishes.length > 0) {
      const timer = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % wishes.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [wishes.length]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Current Wish to Display
  const currentWish = wishes.length > 0 ? wishes[activeIndex] : null;

  return (
    // MAIN CONTAINER: 3 BOX LAYOUT (Header / Main / Footer)
    <div className="fixed inset-0 w-full h-full bg-[#FDFBF7] text-charcoal font-serif overflow-hidden flex flex-col">
      
      {/* Background Texture & Decor */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
         <div className="absolute top-10 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-pulse"></div>
         <div className="absolute bottom-20 right-20 w-80 h-80 bg-old-rose/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* --- BOX 1: HEADER (Fixed Height, No Shrink) --- */}
      <header className="flex-none relative z-20 w-full pt-2 landscape:pt-4 pb-2 px-4 text-center bg-gradient-to-b from-[#FDFBF7] via-[#FDFBF7]/95 to-transparent">
        
        {/* Navigation Controls */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 flex gap-3 z-30">
           <button 
             onClick={() => window.location.hash = ''}
             className="p-2 rounded-full bg-white/80 shadow-sm border border-gold/20 text-gold hover:bg-gold hover:text-white transition-all group backdrop-blur-sm"
             title="Back to Website"
           >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
           </button>
        </div>

        <div className="absolute top-4 right-4 md:top-6 md:right-6 flex gap-3 z-30">
          <button 
            onClick={toggleFullScreen}
            className="p-2 rounded-full bg-white/80 shadow-sm border border-gold/20 text-gold hover:bg-gold hover:text-white transition-all backdrop-blur-sm"
          >
            {isFullscreen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
            )}
          </button>
        </div>

        {/* Names - Reduced size and increased padding/line-height to prevent clipping */}
        <div className="py-1 landscape:py-2 mt-1 landscape:mt-2">
          <h1 className="font-script text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-gold-shine mb-1 leading-loose py-2 drop-shadow-sm px-4">
            Natthamonpisit & Sorot
          </h1>
        </div>
        
        <div className="flex items-center justify-center gap-4 opacity-70 mb-1">
          <div className="h-px w-8 md:w-16 bg-charcoal/20"></div>
          <p className="font-sans text-[8px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-charcoal/60">
            Guestbook Live Wall
          </p>
          <div className="h-px w-8 md:w-16 bg-charcoal/20"></div>
        </div>
      </header>

      {/* --- BOX 2: MAIN CONTENT (Flexible, Fills space, No Overflow overlap) --- */}
      {/* Added larger bottom padding (pb-12 md:pb-24) to visually lift the center content up */}
      <main className="flex-1 w-full relative z-10 flex flex-col justify-center items-center overflow-hidden px-4 pt-2 pb-12 md:pb-24">
        
        {/* Loading State */}
        {loading && wishes.length === 0 ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
            <p className="font-serif text-xl text-gold animate-pulse">Loading wishes...</p>
          </div>
        ) : wishes.length === 0 ? (
          // Empty State
          <div className="text-center py-12 bg-white/50 backdrop-blur-sm px-12 rounded-3xl border border-gold/20 shadow-xl max-w-[90%]">
             <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
             </div>
             <p className="font-serif text-2xl md:text-4xl text-charcoal/80 italic mb-4">Waiting for the first wish...</p>
             <p className="font-sans text-xs md:text-sm text-gold uppercase tracking-[0.2em]">Scan QR code to send your love</p>
          </div>
        ) : (
          // Slideshow Card
          <div className="w-full h-full flex items-center justify-center">
             <div 
               key={activeIndex} 
               className="
                 relative bg-white shadow-2xl rounded-2xl overflow-hidden animate-fade-in border border-white/50 ring-1 ring-gold/10
                 
                 /* FLEX LAYOUT: Column on Mobile Portrait, Row on Landscape */
                 flex flex-col landscape:flex-row
                 
                 /* WIDTH CONTROLS */
                 /* Portrait: Full width but capped */
                 w-full max-w-[340px] 
                 /* Landscape: Auto width (shrink to fit content) + Max width cap to prevent over-stretching */
                 landscape:w-auto landscape:max-w-[85vw]
                 
                 /* HEIGHT CONTROLS */
                 /* Portrait: Auto height */
                 h-auto max-h-full 
                 /* Landscape: Fixed viewport height percentage to drive the aspect ratio */
                 landscape:h-[75vh] md:landscape:h-[60vh]
                 
                 /* Centering */
                 my-auto mx-auto
               "
             >
                {/* Image Section */}
                {currentWish?.imageUrl ? (
                  <div className="
                    relative bg-gray-100 overflow-hidden flex-shrink-0
                    
                    /* Portrait: Full width, REDUCED ASPECT RATIO (Taller than square, but shorter visually in flex) */
                    /* UPDATED: aspect-[10/9] creates a slightly shorter image container than aspect-square (1:1) */
                    w-full aspect-[10/9] 
                    
                    /* Landscape: Height matches container (100%), Width auto, Aspect Ratio 4:3 (or 1:1) */
                    landscape:h-full landscape:w-auto landscape:aspect-[4/3]
                  ">
                    {/* Layer 1: Blurred Background (To fill any gaps nicely) */}
                    <img 
                      src={currentWish.imageUrl} 
                      alt="Background" 
                      className="absolute inset-0 w-full h-full object-cover blur-xl opacity-60 scale-110"
                      referrerPolicy="no-referrer"
                    />

                    {/* Layer 2: Main Image (Contained - Shows WHOLE picture) */}
                    <img 
                      src={currentWish.imageUrl} 
                      alt="Memory" 
                      className="relative z-10 w-full h-full object-contain animate-[scale-in_10s_ease-out_forwards]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  // Fallback decoration
                  <div className="hidden landscape:flex w-64 bg-[#FAF9F6] items-center justify-center border-r border-gold/10 relative overflow-hidden flex-shrink-0">
                     <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
                     <svg className="w-32 h-32 text-gold/20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  </div>
                )}

                {/* Message Section */}
                <div className={`
                   /* Portrait: Flex-1 to fill height */
                   flex-1 
                   
                   /* Landscape: Fixed Width! Do not grow. Keeps card compact. */
                   landscape:flex-none landscape:w-[280px] md:landscape:w-[320px]
                   
                   relative flex flex-col justify-center overflow-hidden
                   /* UPDATED PADDING: Reduced on mobile to give more space for text */
                   p-4 md:p-6 landscape:p-6
                   
                   ${!currentWish?.imageUrl ? 'items-center text-center' : ''}
                   min-h-0
                `}>
                  
                  {/* Quotes */}
                  <svg className="w-6 h-6 md:w-12 md:h-12 text-gold/20 absolute top-3 left-3 md:top-6 md:left-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9C9.04875 12.2882 11.2359 10.3204 12.8225 9.7042L12.0833 7.79979C9.25625 8.89708 7 12.1932 7 16V21H14.017ZM21 21L21 18C21 16.8954 20.1046 16 19 16H15.9829C16.0317 12.2882 18.2189 10.3204 19.8054 9.7042L19.0662 7.79979C16.2392 8.89708 13.9829 12.1932 13.9829 16V21H21Z" /></svg>
                  <svg className="w-6 h-6 md:w-12 md:h-12 text-gold/20 absolute bottom-3 right-3 md:bottom-6 md:right-6 rotate-180" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9C9.04875 12.2882 11.2359 10.3204 12.8225 9.7042L12.0833 7.79979C9.25625 8.89708 7 12.1932 7 16V21H14.017ZM21 21L21 18C21 16.8954 20.1046 16 19 16H15.9829C16.0317 12.2882 18.2189 10.3204 19.8054 9.7042L19.0662 7.79979C16.2392 8.89708 13.9829 12.1932 13.9829 16V21H21Z" /></svg>

                  <div className="relative z-10 w-full max-h-full overflow-y-auto custom-scrollbar px-2 md:px-4 flex flex-col justify-center">
                    {/* 
                       UPDATES:
                       1. Reduced Mobile Font Size: text-[11px] (was 13px)
                       2. Reduced Desktop Font Size: md:text-xl lg:text-2xl (was 2xl/3xl) - ~15% reduction
                    */}
                    <p className="font-sans text-[11px] sm:text-sm md:text-xl lg:text-2xl text-charcoal font-medium leading-relaxed md:leading-relaxed mb-4 md:mb-6 break-words text-center md:text-left">
                      {currentWish?.message}
                    </p>
                    
                    <div className="inline-block border-t border-gold/30 pt-3 md:pt-4 px-4 text-center md:text-left">
                      <p className="font-sans font-bold text-sm md:text-xl uppercase text-gold tracking-widest">
                        {currentWish?.name}
                      </p>
                      <p className="font-sans text-[10px] md:text-[10px] text-gray-400 mt-1 md:mt-2 tracking-wide">
                        {currentWish?.timestamp ? new Date(currentWish.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                      </p>
                    </div>
                  </div>

                </div>
             </div>
          </div>
        )}
      </main>

      {/* --- BOX 3: FOOTER (Fixed Height, No Shrink) --- */}
      <footer className="flex-none relative z-20 w-full bg-white/80 backdrop-blur-md border-t border-gold/10 py-2 landscape:py-3 px-6 flex justify-between items-center">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="p-1 bg-white rounded-lg shadow-sm border border-gold/10">
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://eternal-vows-pi.vercel.app/" 
              alt="Scan to Wish" 
              className="w-8 h-8 md:w-14 md:h-14 mix-blend-multiply"
            />
          </div>
          
          <div className="text-left">
            <p className="font-sans font-bold text-charcoal uppercase tracking-widest text-[8px] md:text-xs mb-0.5">Join the celebration</p>
            <p className="font-serif text-gold italic text-[10px] md:text-base">Scan to send your wishes</p>
            <p className="font-sans text-[8px] md:text-[10px] text-charcoal/50 tracking-wider hidden sm:block">eternal-vows-pi.vercel.app</p>
          </div>
        </div>
        
        {/* Progress Indicator */}
        {wishes.length > 0 && (
          <div className="flex gap-1.5">
            {wishes.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1 md:h-1.5 rounded-full transition-all duration-500 ${
                  idx === activeIndex ? 'w-4 md:w-8 bg-gold' : 'w-1 md:w-1.5 bg-gray-200'
                }`}
              ></div>
            )).slice(0, 10)} 
            {wishes.length > 10 && <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-gray-200"></div>}
          </div>
        )}
      </footer>

      <style>{`
        @keyframes scale-in {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(183, 138, 125, 0.3);
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
};