import React, { useState, useRef, useEffect } from 'react';

interface MusicPlayerProps {
  shouldPlay: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ shouldPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  // -----------------------------------------------------------------------
  // 🎵 PLAYLIST SYSTEM (Auto Fallback)
  // -----------------------------------------------------------------------
  const PLAYLIST = [
    // 1. Link หลัก: Dropbox (High Stability) - ใช้ raw=1 เพื่อ Direct Stream
    "https://www.dropbox.com/scl/fi/3ft3n9brvy4h8i74ivz1p/Canon-in-D-Pachelbel-s-Canon-Cello-Piano-BEST-WEDDING-VERSION.mp3?rlkey=kqb84liwyqa0gqvfqt8dzcmgd&st=93jjaemg&raw=1",

    // 2. Link สำรอง 1: Google Drive เดิม
    "https://docs.google.com/uc?export=download&id=1e9Yx_8gkYNIqQwz9E40fH4rhjj5-nPH1", 
    
    // 3. Link สำรอง 2: Archive.org
    "https://ia800504.us.archive.org/19/items/CanonInD_265/CanonInD.mp3"
  ];

  // Effect to handle Play/Pause based on props
  useEffect(() => {
    if (shouldPlay && audioRef.current) {
      // Try to play
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasError(false);
          })
          .catch((error) => {
            console.log("Auto-play prevented:", error);
            // Browser policy might block this until user interaction
            setIsPlaying(false);
          });
      }
    }
  }, [shouldPlay]);

  // Effect to handle Source Switching
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load(); // Important: Reload audio element when src changes
      if (shouldPlay && isPlaying) {
        const p = audioRef.current.play();
        if (p) p.catch(e => console.warn("Playback failed after switch:", e));
      }
    }
  }, [currentSourceIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasError(false);
          })
          .catch(console.error);
      }
    }
  };

  const handleAudioError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    // Log error details for debugging
    const target = e.currentTarget;
    console.warn(`Audio Error (Source ${currentSourceIndex}):`, target.error);

    if (currentSourceIndex < PLAYLIST.length - 1) {
      console.log(`Switching to fallback source ${currentSourceIndex + 1}...`);
      setCurrentSourceIndex(prev => prev + 1);
    } else {
      console.error("All audio sources failed to load.");
      setHasError(true);
      setIsPlaying(false);
    }
  };

  return (
    // DESIGN UPDATE: Moved from right-4 to left-4
    <div className="fixed top-4 left-4 z-50 animate-fade-in mix-blend-multiply">
      {/* Remove crossOrigin attribute to allow redirects */}
      <audio 
        ref={audioRef} 
        src={PLAYLIST[currentSourceIndex]} 
        loop 
        preload="auto"
        onError={handleAudioError}
      />
      
      {!hasError && (
        <button 
          onClick={togglePlay}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full border border-gold/30 flex items-center justify-center shadow-lg transition-all duration-300 backdrop-blur-md ${
            isPlaying 
              ? 'bg-gold/10 text-gold hover:bg-gold hover:text-white' 
              : 'bg-white/80 text-gray-400 hover:bg-white hover:text-gold'
          }`}
          title={isPlaying ? "Pause Music" : "Play Music"}
        >
          {isPlaying ? (
            <div className="flex gap-0.5 md:gap-1 items-end h-4 md:h-5">
               <div className="w-0.5 md:w-1 bg-current rounded-full animate-[music-bar_1s_ease-in-out_infinite]"></div>
               <div className="w-0.5 md:w-1 bg-current rounded-full animate-[music-bar_1s_ease-in-out_infinite_0.2s]"></div>
               <div className="w-0.5 md:w-1 bg-current rounded-full animate-[music-bar_1s_ease-in-out_infinite_0.4s]"></div>
               <div className="w-0.5 md:w-1 bg-current rounded-full animate-[music-bar_1s_ease-in-out_infinite_0.1s]"></div>
            </div>
          ) : (
            <svg className="w-4 h-4 md:w-5 md:h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      )}
      
      <style>{`
        @keyframes music-bar {
          0%, 100% { height: 30%; }
          50% { height: 100%; }
        }
      `}</style>
    </div>
  );
};