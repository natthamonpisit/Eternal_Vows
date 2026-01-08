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
      // Simple length check or deep comparison could go here
      // For now, just update
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
    <div className="min-h-screen bg-[#FDFBF7] text-charcoal font-serif relative overflow-hidden flex flex-col">
      {/* Background Texture & Decor */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}></div>
      
      {/* Floating Particles/Bokeh (Optional Aesthetic) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-10 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-pulse"></div>
         <div className="absolute bottom-20 right-20 w-80 h-80 bg-old-rose/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header - Fixed Padding & Line Height */}
      <header className="pt-12 pb-6 px-4 text-center relative z-20 bg-gradient-to-b from-[#FDFBF7] via-[#FDFBF7]/90 to-transparent flex-shrink-0">
        
        {/* Navigation Controls */}
        <div className="absolute top-6 left-6 flex gap-3">
           <button 
             onClick={() => window.location.hash = ''}
             className="p-3 rounded-full bg-white/80 shadow-sm border border-gold/20 text-gold hover:bg-gold hover:text-white transition-all group backdrop-blur-sm"
             title="Back to Website"
           >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
           </button>
        </div>

        <div className="absolute top-6 right-6 flex gap-3">
          <button 
            onClick={toggleFullScreen}
            className="p-3 rounded-full bg-white/80 shadow-sm border border-gold/20 text-gold hover:bg-gold hover:text-white transition-all backdrop-blur-sm"
          >
            {isFullscreen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
            )}
          </button>
        </div>

        {/* Names - Added generous padding and line-height to prevent clipping */}
        <div className="py-2">
          <h1 className="font-script text-6xl md:text-7xl lg:text-8xl text-gold-shine mb-3 leading-[1.3] drop-shadow-sm px-4 pt-2">
            Natthamonpisit & Sorot
          </h1>
        </div>
        
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-12 md:w-20 bg-charcoal/20"></div>
          <p className="font-sans text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-charcoal/60">
            Guestbook Live Wall
          </p>
          <div className="h-px w-12 md:w-20 bg-charcoal/20"></div>
        </div>
      </header>

      {/* Main Content - Slideshow */}
      <main className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 relative z-10 w-full max-w-[1400px] mx-auto">
        
        {loading && wishes.length === 0 ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
            <p className="font-serif text-xl text-gold animate-pulse">Loading wishes...</p>
          </div>
        ) : wishes.length === 0 ? (
          // Empty State
          <div className="text-center py-20 bg-white/50 backdrop-blur-sm p-12 rounded-3xl border border-gold/20 shadow-xl">
             <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
             </div>
             <p className="font-serif text-3xl md:text-5xl text-charcoal/80 italic mb-4">Waiting for the first wish...</p>
             <p className="font-sans text-sm md:text-lg text-gold uppercase tracking-[0.2em]">Scan QR code to send your love</p>
          </div>
        ) : (
          // Slideshow Card
          <div className="w-full h-full flex items-center justify-center">
             {/* Key ensures React remounts the component to trigger animations when index changes */}
             <div 
               key={activeIndex} 
               className="relative bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in border border-white/50 ring-1 ring-gold/10 flex flex-col md:flex-row min-h-[50vh] md:h-[60vh]"
             >
                {/* Left: Image (Conditional) */}
                {currentWish?.imageUrl ? (
                  <div className="w-full md:w-1/2 h-[40vh] md:h-full bg-gray-100 relative overflow-hidden">
                    <img 
                      src={currentWish.imageUrl} 
                      alt="Memory" 
                      className="absolute inset-0 w-full h-full object-cover animate-[scale-in_10s_ease-out_forwards]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                ) : (
                  // Fallback decoration if no image
                  <div className="hidden md:flex w-1/3 bg-[#FAF9F6] items-center justify-center border-r border-gold/10 relative overflow-hidden">
                     <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
                     <svg className="w-32 h-32 text-gold/20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  </div>
                )}

                {/* Right: Message */}
                <div className={`flex-1 p-8 md:p-16 flex flex-col justify-center relative ${!currentWish?.imageUrl ? 'items-center text-center' : ''}`}>
                  
                  {/* Quote Icon */}
                  <svg className="w-12 h-12 md:w-16 md:h-16 text-gold/20 mb-6 absolute top-8 left-8" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9C9.04875 12.2882 11.2359 10.3204 12.8225 9.7042L12.0833 7.79979C9.25625 8.89708 7 12.1932 7 16V21H14.017ZM21 21L21 18C21 16.8954 20.1046 16 19 16H15.9829C16.0317 12.2882 18.2189 10.3204 19.8054 9.7042L19.0662 7.79979C16.2392 8.89708 13.9829 12.1932 13.9829 16V21H21Z" /></svg>
                  
                  <div className="relative z-10">
                    <p className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal italic leading-relaxed md:leading-relaxed mb-8 break-words">
                      "{currentWish?.message}"
                    </p>
                    
                    <div className="inline-block border-t border-gold/30 pt-6 px-4">
                      <p className="font-sans font-bold text-lg md:text-xl uppercase text-gold tracking-widest">
                        {currentWish?.name}
                      </p>
                      <p className="font-sans text-xs text-gray-400 mt-2 tracking-wide">
                        {currentWish?.timestamp ? new Date(currentWish.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                      </p>
                    </div>
                  </div>

                </div>
             </div>
          </div>
        )}
      </main>

      {/* Footer / QR Instructions */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gold/10 py-4 px-6 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-6">
          {/* Actual QR Code pointing to the website */}
          <div className="hidden md:block p-1 bg-white rounded-lg shadow-sm border border-gold/10">
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://eternal-vows-pi.vercel.app/" 
              alt="Scan to Wish" 
              className="w-14 h-14 md:w-16 md:h-16 mix-blend-multiply"
            />
          </div>
          
          <div className="text-left">
            <p className="font-sans font-bold text-charcoal uppercase tracking-widest text-xs md:text-sm mb-1">Join the celebration</p>
            <p className="font-serif text-gold italic text-sm md:text-base">Scan to send your wishes</p>
            <p className="font-sans text-[10px] text-charcoal/50 mt-1 tracking-wider">eternal-vows-pi.vercel.app</p>
          </div>
        </div>
        
        {/* Progress Indicator */}
        {wishes.length > 0 && (
          <div className="flex gap-1.5">
            {wishes.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === activeIndex ? 'w-8 bg-gold' : 'w-1.5 bg-gray-200'
                }`}
              ></div>
            )).slice(0, 10) /* Limit dots if too many */} 
            {wishes.length > 10 && <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>}
          </div>
        )}
      </footer>

      <style>{`
        @keyframes scale-in {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};