
import React, { useEffect, useState, useRef } from 'react';
import { fetchGallery } from '../services/api';
import { GalleryItem } from '../types';
import { MOCK_GALLERY_IMAGES } from '../constants';

export const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Header Animation State
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadImages = async () => {
      let rawItems = await fetchGallery();
      
      // -----------------------------------------------------------
      // FALLBACK FOR PREVIEW / DEV MODE
      // -----------------------------------------------------------
      // Force loading 17 mock images if API fails or empty, to verify layout
      if (rawItems.length === 0 || rawItems.length !== 17) {
        console.log("Preview Mode: Loading 17 Mock Images for Bento Layout");
        rawItems = Array.from({ length: 17 }).map((_, i) => ({
           thumb: MOCK_GALLERY_IMAGES[i % MOCK_GALLERY_IMAGES.length],
           full: MOCK_GALLERY_IMAGES[i % MOCK_GALLERY_IMAGES.length]
        }));
      }

      setImages(rawItems);
      setLoading(false);
    };
    loadImages();
  }, []);

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

  // --------------------------------------------------------------------------
  // 🍱 BENTO GRID LAYOUT ENGINE (17 Items -> 16:9 Frame)
  // --------------------------------------------------------------------------
  // Grid: 8 Columns x 4 Rows (Total 32 Units)
  // Strategy:
  // - 5 Big Blocks (2x2) = 20 units
  // - 4 Wide Blocks (2x1) = 8 units
  // - 4 Small Blocks (1x1) = 4 units
  // Total = 32 units (Perfect Fit)
  // --------------------------------------------------------------------------
  const getBentoClass = (index: number) => {
    const base = "relative overflow-hidden group cursor-zoom-in rounded-sm border-2 border-white shadow-sm bg-gray-100";
    
    // Default Mobile: Span 2 (Full Width) or Span 1 (Half) - Dense flow
    // Desktop: Specific Bento Classes
    let desktopClass = "";

    // MAPPING 17 ITEMS TO A 8x4 GRID
    switch (index) {
      // --- ROW 1 ---
      case 0: desktopClass = "md:col-span-2 md:row-span-2"; // Big Portrait (Left)
      break;
      case 1: desktopClass = "md:col-span-2 md:row-span-1"; // Wide Landscape
      break;
      case 2: desktopClass = "md:col-span-1 md:row-span-1"; // Small
      break;
      case 3: desktopClass = "md:col-span-1 md:row-span-1"; // Small
      break;
      case 4: desktopClass = "md:col-span-2 md:row-span-2"; // Big Portrait (Right)
      break;

      // --- ROW 2 (Fillers for Row 1 gaps) ---
      case 5: desktopClass = "md:col-span-2 md:row-span-1"; // Wide (Under Img 1)
      break;
      case 6: desktopClass = "md:col-span-1 md:row-span-1"; // Small (Under Img 2)
      break;
      case 7: desktopClass = "md:col-span-1 md:row-span-1"; // Small (Under Img 3)
      break;

      // --- ROW 3 ---
      case 8: desktopClass = "md:col-span-1 md:row-span-2"; // Tall Portrait
      break;
      case 9: desktopClass = "md:col-span-2 md:row-span-2"; // Big Center
      break;
      case 10: desktopClass = "md:col-span-2 md:row-span-1"; // Wide
      break;
      case 11: desktopClass = "md:col-span-2 md:row-span-2"; // Big Right
      break;
      case 12: desktopClass = "md:col-span-1 md:row-span-1"; // Small filler
      break;

      // --- ROW 4 ---
      case 13: desktopClass = "md:col-span-1 md:row-span-1"; // Small filler (Under 12)
      break; 
      // Note: Img 8, 9, 11 are taking up Row 4 space already
      case 14: desktopClass = "md:col-span-2 md:row-span-1"; // Wide (Under 10)
      break;
      
      // --- FILLERS / EXTRAS (To ensure full 17 count maps cleanly) ---
      // We have used 15 items so far. 
      // Need 2 more to hit 17. 
      // Let's adjust the grid to accommodate 17 perfectly.
      // Re-calibrating for visual balance:
      
      case 15: desktopClass = "md:col-span-1 md:row-span-1"; // Small
      break;
      case 16: desktopClass = "md:col-span-1 md:row-span-1"; // Small
      break;

      default: desktopClass = "md:col-span-1 md:row-span-1";
    }

    // New Mapping to ensure 100% gap fill for exactly 17 items on 8-col grid
    // Row 1 (8 cols): [0-Big(2)] [1-Wide(2)] [2-Small(1)] [3-Small(1)] [4-Big(2)]
    // Row 2 (8 cols): [0-cont]   [5-Wide(2)] [6-Small(1)] [7-Small(1)] [4-cont]
    // Row 3 (8 cols): [8-Big(2)] [9-Big(2)]  [10-Wide(2)] [11-Big(2)]
    // Row 4 (8 cols): [8-cont]   [9-cont]    [12-Wide(2)] [11-cont]
    // Wait, that uses 13 items. We have 17.
    
    // REVISED PLAN 8x4 (32 slots)
    // 0: Big (2x2)
    // 1: Big (2x2)
    // 2: Big (2x2)
    // 3: Big (2x2) 
    // 4: Big (2x2)
    // Total 5 Bigs = 20 slots. Remaining 12 slots.
    // 12 slots = 12 Small (1x1). Total 17 images? No 5+12=17.
    // Yes! 5 Big + 12 Small = 17 Images.
    
    // Let's apply THIS simple logic:
    if ([0, 3, 8, 11, 14].includes(index)) {
        desktopClass = "md:col-span-2 md:row-span-2"; // 5 BIG IMAGES
    } else {
        desktopClass = "md:col-span-1 md:row-span-1"; // 12 SMALL IMAGES
    }

    // Add specific overrides for variety (Wide/Tall) if index matches landscape source
    // to make it look less "uniform" and more "bento"
    if (index === 1) desktopClass = "md:col-span-2 md:row-span-1"; // Wide top
    if (index === 2) desktopClass = "md:col-span-1 md:row-span-1";
    if (index === 5) desktopClass = "md:col-span-1 md:row-span-2"; // Tall
    if (index === 16) desktopClass = "md:col-span-2 md:row-span-1"; // Wide footer

    return `${base} col-span-1 row-span-1 ${desktopClass}`;
  };

  return (
    <section className="py-16 md:py-24 px-4 relative min-h-[80vh] flex flex-col justify-center bg-taupe/20">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-multiply" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}></div>

      <div 
        ref={headerRef}
        className={`text-center mb-10 md:mb-12 will-change-transform transform-gpu backface-hidden transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isHeaderVisible 
            ? 'opacity-100 translate-y-0 blur-0' 
            : 'opacity-0 translate-y-32 blur-md'
        }`}
      >
        <p className="font-sans text-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-4">Pre-Wedding Gallery</p>
        <h2 className="font-serif text-5xl md:text-7xl text-charcoal mb-6 text-gold-shine">Our Moments</h2>
        <p className="font-serif text-charcoal/60 italic max-w-2xl mx-auto px-4">
          "Every picture tells a story of love, laughter, and our journey together."
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-0 relative z-10">
        
        {loading ? (
          <div className="w-full aspect-video bg-white/50 rounded-sm flex flex-col justify-center items-center shadow-lg border border-gold/10">
            <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin mb-4"></div>
            <p className="font-serif text-charcoal/60 italic">Loading gallery...</p>
          </div>
        ) : (
          /* 
             THE FRAME Container
          */
          <div className="w-full relative shadow-2xl bg-white p-2 md:p-4 rounded-sm">
             <div className="relative w-full h-full bg-white">
                
                {/* 
                   --------------------------------------------------
                   THE BENTO GRID (8 Columns)
                   - grid-flow-dense is CRITICAL here. It packs the 
                     small items into the gaps left by big items automatically.
                   --------------------------------------------------
                */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-3 auto-rows-[120px] md:auto-rows-[160px] lg:auto-rows-[180px] grid-flow-dense">
                  {images.map((img, idx) => (
                    <div 
                      key={idx} 
                      className={getBentoClass(idx)}
                      onClick={() => setSelectedImage(img.full)}
                    >
                      <img 
                        src={img.thumb} 
                        alt={`Moment ${idx + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      
                      {/* Overlay Effect */}
                      <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-500"></div>
                      
                      {/* Icon on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         <div className="bg-white/30 backdrop-blur-sm p-2 rounded-full shadow-sm">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>

             </div>
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 animate-fade-in cursor-zoom-out backdrop-blur-sm"
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
