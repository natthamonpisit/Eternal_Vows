import React, { useEffect, useState } from 'react';
import { fetchWishes } from '../services/api';
import { GuestWishes } from '../types';

export const LiveWall: React.FC = () => {
  const [wishes, setWishes] = useState<GuestWishes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWishes = async () => {
      const data = await fetchWishes();
      setWishes(data);
      setLoading(false);
    };

    // Initial load
    loadWishes();

    // Auto-refresh every 10 seconds
    const interval = setInterval(loadWishes, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-charcoal font-serif relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}></div>

      {/* Header */}
      <header className="pt-8 pb-4 px-4 text-center relative z-10 bg-[#FDFBF7]/90 backdrop-blur-sm sticky top-0 shadow-sm border-b border-gold/20">
        <h1 className="font-script text-4xl sm:text-5xl md:text-6xl text-gold-shine mb-2 leading-tight">Natthamonpisit & Sorot</h1>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-8 md:w-12 bg-charcoal/20"></div>
          <p className="font-sans text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-charcoal/60">
            Thank you for your wishes
          </p>
          <div className="h-px w-8 md:w-12 bg-charcoal/20"></div>
        </div>
      </header>

      {/* Content Grid */}
      <main className="max-w-[1600px] mx-auto p-4 md:p-8 relative z-10">
        {loading && wishes.length === 0 ? (
          <div className="flex justify-center items-center h-[60vh]">
            <div className="w-16 h-16 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {wishes.map((wish, idx) => (
              <div 
                key={`${idx}-${wish.timestamp}`} 
                className="bg-white p-6 rounded-lg shadow-lg border border-gold/10 break-inside-avoid animate-fade-in flex flex-col"
              >
                {/* Image Section */}
                {wish.imageUrl && (
                  <div className="mb-4 rounded-md overflow-hidden bg-gray-50 border border-gray-100 aspect-video relative group">
                    <img 
                      src={wish.imageUrl} 
                      alt="Guest memory" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                {/* Message */}
                <div className="flex-1">
                  <p className="font-serif text-lg md:text-xl lg:text-2xl text-charcoal italic mb-4 leading-relaxed relative">
                    <span className="text-gold/20 text-4xl absolute -top-2 -left-2">"</span>
                    {wish.message}
                    <span className="text-gold/20 text-4xl absolute -bottom-4 -right-2">"</span>
                  </p>
                </div>

                {/* Footer: Name & Time */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-end">
                  <span className="font-sans font-bold text-xs md:text-sm uppercase text-gold tracking-wider truncate max-w-[70%]">
                    {wish.name}
                  </span>
                  <span className="font-sans text-[10px] text-gray-400">
                    {new Date(wish.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && wishes.length === 0 && (
          <div className="text-center py-40">
             <p className="font-serif text-2xl md:text-3xl text-charcoal/40 italic">Waiting for the first wish...</p>
             <p className="font-sans text-xs md:text-sm text-gold mt-4 uppercase tracking-widest">Scan QR code to sign guestbook</p>
          </div>
        )}
      </main>
    </div>
  );
};