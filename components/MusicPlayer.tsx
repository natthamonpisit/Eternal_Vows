import React, { useState, useRef, useEffect } from 'react';

interface MusicPlayerProps {
  shouldPlay: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ shouldPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Romantic Wedding Piano Music (Royalty Free)
  const MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/02/10/audio_fc8c8382ba.mp3?filename=wedding-piano-112521.mp3"; 

  useEffect(() => {
    if (shouldPlay && audioRef.current) {
      // Attempt to play automatically when envelope opens
      // Note: Browsers may block if no user interaction preceded this, 
      // but the "Open Envelope" click usually counts as interaction.
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((e) => {
          console.log("Autoplay blocked/waiting for interaction:", e);
          setIsPlaying(false);
        });
    }
  }, [shouldPlay]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in mix-blend-multiply">
      <audio ref={audioRef} src={MUSIC_URL} loop />
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
      <style>{`
        @keyframes music-bar {
          0%, 100% { height: 30%; }
          50% { height: 100%; }
        }
      `}</style>
    </div>
  );
};