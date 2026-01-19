
import React, { useState, useEffect, useMemo } from 'react';

interface EnvelopeProps {
  onOpen: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  // ---------------------------------------------------------------------------
  // CLOUDINARY CONFIG
  // ---------------------------------------------------------------------------
  const CLOUD_NAME = "damfrrvrb";
  const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto,w_1920/`;

  // ---------------------------------------------------------------------------
  // DESKTOP IMAGES (Horizontal)
  // ---------------------------------------------------------------------------
  const DESKTOP_CLOSED_ID = "Wedding_OukBew/Envelope/01_closed_envelope"; 
  const DESKTOP_HALF_ID = "Wedding_OukBew/Envelope/02_Middle_open"; 
  const DESKTOP_OPEN_ID = "Wedding_OukBew/Envelope/03_full_open"; 

  // ---------------------------------------------------------------------------
  // MOBILE IMAGES (Vertical/Portrait)
  // ---------------------------------------------------------------------------
  const MOBILE_CLOSED_ID = "Wedding_OukBew/Envelope/04_Closed_Iphone";
  const MOBILE_HALF_ID = "Wedding_OukBew/Envelope/05_Half_open_iphone";
  const MOBILE_OPEN_ID = "Wedding_OukBew/Envelope/06_Fullopen_iphone";


  // ---------------------------------------------------------------------------
  const getUrl = (id: string) => {
    return `${BASE_URL}${id}`;
  };

  const [stage, setStage] = useState<'closed' | 'half' | 'open'>('closed');
  const [isWhiteFlash, setIsWhiteFlash] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  // Detect Orientation
  const [isPortrait, setIsPortrait] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerHeight > window.innerWidth;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine which set of images to use
  const currentImages = useMemo(() => {
    if (isPortrait) {
      return {
        closed: MOBILE_CLOSED_ID,
        half: MOBILE_HALF_ID,
        open: MOBILE_OPEN_ID
      };
    }
    return {
      closed: DESKTOP_CLOSED_ID,
      half: DESKTOP_HALF_ID,
      open: DESKTOP_OPEN_ID
    };
  }, [isPortrait]);

  // Pre-calculate glitter particles
  const glitterParticles = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 2}px`,
      delay: `${Math.random() * 500}ms`,
      duration: `${Math.random() * 1000 + 500}ms`,
      color: Math.random() > 0.4 ? '#B78A7D' : '#FFFFFF'
    }));
  }, []);

  // Preload Images whenever orientation changes
  useEffect(() => {
    setImagesLoaded(false);
    const imageUrls = [
      getUrl(currentImages.closed), 
      getUrl(currentImages.half), 
      getUrl(currentImages.open)
    ];
    
    let loadedCount = 0;
    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount === imageUrls.length) {
         // Add a small delay to ensure UI renders smoothly
         setTimeout(() => setImagesLoaded(true), 500);
      }
    };

    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
      img.onload = checkLoaded;
      img.onerror = checkLoaded;
    });
  }, [currentImages]);

  const handleSequence = () => {
    setStage('half');
    setTimeout(() => {
      setStage('open');
      setTimeout(() => {
        setIsWhiteFlash(true);
        setTimeout(() => {
          onOpen();
        }, 1000);
      }, 300);
    }, 200);
  };

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden relative bg-[#D5C7BC]">
      
      {/* --- INITIAL LOADING SCREEN --- */}
      <div 
        className={`absolute inset-0 z-[60] bg-[#FDFBF7] flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${
          imagesLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex flex-col items-center space-y-6 animate-fade-in px-6 w-full">
          <div className="relative">
             <div className="w-16 h-16 border-4 border-gold/20 rounded-full"></div>
             <div className="absolute top-0 left-0 w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="text-center w-full">
            {/* Added generous padding (px-8, py-6) and loose leading to handle script font swashes */}
            <p className="font-script text-3xl md:text-5xl text-gold-shine px-8 py-6 leading-loose whitespace-nowrap">Natthamonpisit & Sorot</p>
            <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-charcoal/40 animate-pulse -mt-4">Loading Invitation...</p>
          </div>
        </div>
      </div>

      {/* 
         Responsive Container 
         - Mobile/Portrait: w-full h-full (Fill Screen)
         - Desktop/Landscape: aspect-[16/9] (Constrained Cinematic Ratio)
      */}
      <div className={`relative transition-all duration-1000 transform duration-700 shadow-2xl z-10 
        ${isPortrait 
           ? 'w-full h-full' 
           : 'w-full max-w-[177.78vh] aspect-[16/9]' 
        }
        ${imagesLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
      `}>
        
        {/* Layer 1: Closed */}
        <div 
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-none ${stage === 'closed' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          style={{ backgroundImage: `url("${getUrl(currentImages.closed)}")` }}
        ></div>

        {/* Layer 2: Half */}
        <div 
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-none ${stage === 'half' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          style={{ backgroundImage: `url("${getUrl(currentImages.half)}")` }}
        ></div>

        {/* Layer 3: Open */}
        <div 
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-none ${stage === 'open' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          style={{ backgroundImage: `url("${getUrl(currentImages.open)}")` }}
        ></div>


        {/* Controls Layer */}
        <div className={`absolute inset-0 z-20 transition-opacity duration-300 ${stage !== 'closed' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          
          {/* Invisible Click Area */}
          <button 
            onClick={handleSequence}
            disabled={!imagesLoaded}
            className="absolute inset-0 w-full h-full bg-transparent cursor-pointer"
            aria-label="Open Invitation"
          ></button>

          {/* 
              Text Positioned Relative to Image
              Adjust position based on orientation if needed
          */}
          <div className={`absolute left-0 right-0 text-center px-4 pointer-events-none ${isPortrait ? 'top-[30%]' : 'top-[22%]'}`}>
             <p className="font-sans text-xs sm:text-sm md:text-lg tracking-[0.25em] uppercase font-bold text-white/90 drop-shadow-md animate-float">
               Tap to Open
             </p>
          </div>
        </div>

      </div>

      {/* Magical White Flash Overlay (Glitter Dust Effect) */}
      <div className={`fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden transition-all duration-[1000ms] ease-out ${isWhiteFlash ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-[#FDFBF7] backdrop-blur-xl"></div>
        <div className={`absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(253,251,247,0.8)_60%,transparent_100%)] transition-transform duration-[1500ms] ease-out ${isWhiteFlash ? 'scale-150 opacity-100' : 'scale-50 opacity-0'}`}></div>

        {isWhiteFlash && (
          <div className="absolute inset-0">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vmax] h-[120vmax] bg-white opacity-80 blur-3xl animate-pulse"></div>
             {glitterParticles.map((p) => (
                <div 
                  key={p.id}
                  className="absolute rounded-full animate-ping opacity-0"
                  style={{
                    top: p.top,
                    left: p.left,
                    width: p.size,
                    height: p.size,
                    backgroundColor: p.color,
                    animationDelay: p.delay,
                    animationDuration: p.duration,
                    animationFillMode: 'forwards'
                  }}
                ></div>
             ))}
          </div>
        )}
      </div>

    </div>
  );
};
