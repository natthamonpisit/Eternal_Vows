import React, { useEffect, useState, useRef } from 'react';
import { fetchGallery } from '../services/api';

export const Gallery: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      const urls = await fetchGallery();
      setImages(urls);
      setLoading(false);
    };
    loadImages();
  }, []);

  // ฟังก์ชันคำนวณขนาดของแต่ละรูปตามลำดับ (Mosaic Pattern)
  const getGridClass = (index: number) => {
    const pattern = index % 10;
    if (pattern === 0) return 'col-span-2 row-span-2';
    if (pattern === 2) return 'col-span-1 row-span-2';
    if (pattern === 5) return 'col-span-2 row-span-1';
    if (pattern === 8) return 'col-span-1 row-span-2';
    return 'col-span-1 row-span-1';
  };

  return (
    <section className="py-16 md:py-24 px-4 relative min-h-screen bg-taupe/50">
      <div className="text-center mb-12 md:mb-16 animate-slide-up">
        <p className="font-sans text-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-4">Pre-Wedding Gallery</p>
        <h2 className="font-serif text-5xl md:text-7xl text-charcoal mb-8 text-gold-shine">Our Moments</h2>
        <div className="w-px h-12 md:h-16 bg-gold mx-auto"></div>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center h-64 space-y-6">
          <div className="w-16 h-16 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
          <p className="font-serif text-charcoal/60 italic text-lg tracking-wide">Retrieving memories...</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          {/* Mosaic Grid Layout 
              Refined columns for Tablet: md:grid-cols-4 might be too tight, but keeping it to maintain mosaic pattern integrity.
              Adjusted auto-rows for responsiveness.
          */}
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[240px] lg:auto-rows-[280px] gap-2 md:gap-3 grid-flow-dense">
            {images.map((url, index) => (
              <GalleryItem 
                key={index}
                url={url}
                index={index}
                gridClass={getGridClass(index)}
                onClick={() => setSelectedImage(url)}
              />
            ))}
          </div>

          {images.length === 0 && (
            <div className="text-center py-24 border border-gold/20 rounded-lg mx-auto max-w-2xl bg-white/50">
              <p className="font-serif text-2xl text-charcoal/40 italic mb-4">"Memories are being made..."</p>
              <p className="font-sans text-xs text-gold uppercase tracking-widest">Photos coming soon</p>
            </div>
          )}
        </div>
      )}

      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-fade-in cursor-zoom-out backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <img 
            src={selectedImage} 
            alt="Full screen moment" 
            className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-sm border-[4px] md:border-[8px] border-white"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </section>
  );
};

// Sub-component for individual gallery item to handle its own scroll animation
const GalleryItem: React.FC<{ 
  url: string; 
  index: number; 
  gridClass: string;
  onClick: () => void;
}> = ({ url, index, gridClass, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting);
      });
    }, {
      threshold: 0.15,
    });

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      if (domRef.current) observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={domRef}
      className={`${gridClass} relative group cursor-pointer overflow-hidden rounded-sm transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
        isVisible 
          ? 'opacity-100 translate-y-0 blur-0' 
          : 'opacity-0 translate-y-32 blur-md'
      }`}
      onClick={onClick}
      style={{
        transitionDelay: isVisible ? `${(index % 6) * 100}ms` : '0ms'
      }}
    >
      <div className="w-full h-full relative overflow-hidden bg-gray-100 border-[3px] md:border-[6px] border-white shadow-sm box-border">
        <img 
          src={url} 
          alt={`Moment ${index + 1}`} 
          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Image+Load+Error";
          }}
        />
        {/* Overlay Effect */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/90 p-3 rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
};