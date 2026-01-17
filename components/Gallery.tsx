import React, { useEffect, useState, useRef } from 'react';
import { fetchGallery } from '../services/api';
import { GalleryItem } from '../types';

export const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // State to track image orientations (index -> 'landscape' | 'portrait' | 'square')
  const [orientations, setOrientations] = useState<Record<number, 'landscape' | 'portrait' | 'square'>>({});

  // Header Animation State
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadImages = async () => {
      const items = await fetchGallery();
      // Limit to 7 images for the "Board" feel (prevents it from becoming too long)
      setImages(items.slice(0, 7)); 
      setLoading(false);
    };
    loadImages();
  }, []);

  // Intersection Observer for Header Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // ---------------------------------------------------------------------------
  // SMART ALGORITHM: Detect Aspect Ratio
  // ---------------------------------------------------------------------------
  const handleImageLoad = (index: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    let orient: 'landscape' | 'portrait' | 'square' = 'square';

    // Algorithm: 
    // If width is significantly larger (> 20% diff), it's landscape.
    // If height is significantly larger, it's portrait.
    if (naturalWidth > naturalHeight * 1.2) {
      orient = 'landscape';
    } else if (naturalHeight > naturalWidth * 1.2) {
      orient = 'portrait';
    }

    setOrientations(prev => ({ ...prev, [index]: orient }));
  };

  /**
   * Calculate Grid Spans based on Orientation
   * Using a 4-column grid base on desktop, 2-column on mobile.
   */
  const getItemClasses = (index: number) => {
    const orientation = orientations[index];
    const baseClass = "relative bg-white p-2 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden group cursor-zoom-in rounded-sm";
    
    // Default (Loading or Square)
    let spans = "col-span-1 row-span-1 aspect-square"; 

    if (orientation === 'landscape') {
      // Landscape: Span 2 columns, 1 row
      spans = "col-span-2 row-span-1 aspect-[4/3] md:aspect-[3/2]";
    } else if (orientation === 'portrait') {
      // Portrait: Span 1 column, 2 rows
      spans = "col-span-1 row-span-2 aspect-[3/4] md:aspect-[2/3]";
    }

    return `${baseClass} ${spans}`;
  };

  return (
    <section className="py-16 md:py-24 px-4 relative min-h-[80vh] flex flex-col justify-center bg-taupe/20">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-multiply" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}></div>

      <div 
        ref={headerRef}
        className={`text-center mb-10 md:mb-16 will-change-transform transform-gpu backface-hidden transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isHeaderVisible 
            ? 'opacity-100 translate-y-0 blur-0' 
            : 'opacity-0 translate-y-32 blur-md'
        }`}
      >
        <p className="font-sans text-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-4">Pre-Wedding Gallery</p>
        <h2 className="font-serif text-5xl md:text-7xl text-charcoal mb-6 text-gold-shine">Our Moments</h2>
      </div>

      <div className="max-w-6xl mx-auto w-full px-2 md:px-0 relative z-10">
        
        {loading ? (
          <div className="w-full h-64 bg-white/50 rounded-lg flex flex-col justify-center items-center shadow-lg border border-gold/10">
            <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin mb-4"></div>
            <p className="font-serif text-charcoal/60 italic">Loading gallery...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="w-full h-64 bg-white/50 rounded-lg flex flex-col justify-center items-center shadow-lg border border-gold/10">
            <p className="font-serif text-2xl text-charcoal/40 italic mb-2">"Memories are being made..."</p>
            <p className="font-sans text-xs text-gold uppercase tracking-widest">Photos coming soon</p>
          </div>
        ) : (
          /* 
             SMART DENSE GRID 
             - grid-flow-row-dense: This is the magic. It fills empty gaps automatically.
             - grid-cols-2 (Mobile) -> grid-cols-4 (Desktop): Finer grain for better packing.
          */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 grid-flow-row-dense auto-rows-[minmax(120px,auto)] md:auto-rows-[200px]">
            {images.map((item, index) => (
              <div 
                key={index} 
                className={`${getItemClasses(index)} animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedImage(item.full)}
              >
                {/* Image Container */}
                <div className="w-full h-full overflow-hidden relative">
                   <img 
                     src={item.thumb} 
                     alt={`Gallery ${index}`}
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                     loading="lazy"
                     onLoad={(e) => handleImageLoad(index, e)}
                     onError={(e) => {
                       (e.target as HTMLImageElement).src = "https://placehold.co/600x400/EBCBC5/white?text=Image";
                     }}
                   />
                   {/* Shine Effect */}
                   <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Instagram Link */}
        <div className="mt-12 md:mt-16 text-center">
            <a 
              href="https://www.instagram.com/explore/tags/NatSorotWedding/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-charcoal/60 hover:text-gold transition-colors font-sans text-xs uppercase tracking-widest border-b border-transparent hover:border-gold pb-0.5"
            >
              <span>View more on Instagram #NatSorotWedding</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
        </div>
      </div>

      {/* Lightbox Overlay */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-fade-in cursor-zoom-out backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 z-50"
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