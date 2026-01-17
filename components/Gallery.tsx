import React, { useEffect, useState, useRef } from 'react';
import { fetchGallery } from '../services/api';
import { GalleryItem } from '../types';

interface SizedGalleryItem extends GalleryItem {
  orientation: 'landscape' | 'portrait';
}

type LayoutType = 'uniform' | 'magazine';

export const Gallery: React.FC = () => {
  const [images, setImages] = useState<SizedGalleryItem[]>([]);
  const [layoutType, setLayoutType] = useState<LayoutType>('uniform');
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Header Animation State
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadImages = async () => {
      const rawItems = await fetchGallery();
      
      // 1. Fetch exactly 8 candidates
      let candidateItems = rawItems.slice(0, 8);
      
      // Fallback: Ensure we have exactly 8 images (Duplicate if needed to fill grid)
      while (candidateItems.length > 0 && candidateItems.length < 8) {
        candidateItems = [...candidateItems, ...candidateItems].slice(0, 8);
      }

      // 2. Analyze Orientation
      const sizedItems = await Promise.all(
        candidateItems.map(item => {
          return new Promise<SizedGalleryItem>((resolve) => {
            const img = new Image();
            img.src = item.thumb;
            img.onload = () => {
              resolve({
                ...item,
                orientation: img.naturalWidth > img.naturalHeight ? 'landscape' : 'portrait'
              });
            };
            img.onerror = () => {
              resolve({ ...item, orientation: 'landscape' });
            };
          });
        })
      );

      if (sizedItems.length === 0) {
        setLoading(false);
        return;
      }

      // 3. LOGIC: CHOOSE LAYOUT
      const portraits = sizedItems.filter(i => i.orientation === 'portrait');
      const landscapes = sizedItems.filter(i => i.orientation === 'landscape');
      const portraitCount = portraits.length;
      
      let finalLayout: LayoutType = 'uniform';
      let sortedImages: SizedGalleryItem[] = [];

      // Case: Mixed Orientations (2-6 Portraits) -> Use Magazine Layout
      if (portraitCount >= 2 && portraitCount <= 6) {
        finalLayout = 'magazine';
        
        // Priority: Put 2 Portraits in the Center Column (Target indices: 3, 4)
        const centerImages = portraits.slice(0, 2);
        
        // Remaining pool
        const remainingPool = [...portraits.slice(2), ...landscapes];
        
        // Left Column (Target indices: 0, 1, 2)
        const leftImages = remainingPool.slice(0, 3);
        
        // Right Column (Target indices: 5, 6, 7)
        const rightImages = remainingPool.slice(3, 6);
        
        // Final Assembly: [Left... , Center... , Right...]
        sortedImages = [...leftImages, ...centerImages, ...rightImages];
        
      } else {
        // Case: Uniform (All Landscape or All Portrait or just 1 outlier) -> Use Uniform 4x2
        finalLayout = 'uniform';
        sortedImages = sizedItems;
      }

      setImages(sortedImages.slice(0, 8));
      setLayoutType(finalLayout);
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

      <div className="max-w-7xl mx-auto w-full px-0 relative z-10">
        
        {loading ? (
          <div className="w-full aspect-video bg-white/50 rounded-sm flex flex-col justify-center items-center shadow-lg border border-gold/10">
            <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin mb-4"></div>
            <p className="font-serif text-charcoal/60 italic">Loading gallery...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="w-full aspect-video bg-white/50 rounded-sm flex flex-col justify-center items-center shadow-lg border border-gold/10">
            <p className="font-serif text-2xl text-charcoal/40 italic mb-2">"Memories are being made..."</p>
          </div>
        ) : (
          /* 
             THE FRAME (16:9 Aspect Ratio Container)
          */
          <div className="w-full relative pt-[56.25%] shadow-2xl bg-white">
             <div className="absolute inset-0 w-full h-full bg-white">
                
                {/* 
                   --------------------------------------------------
                   LAYOUT A: UNIFORM GRID (4 Columns x 2 Rows)
                   --------------------------------------------------
                   Used for: 0, 1, 7, 8 Portraits
                   Simple CSS Grid.
                */}
                {layoutType === 'uniform' && (
                  <div className="w-full h-full grid grid-cols-2 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-1 p-1">
                    {images.map((img, idx) => (
                      <div 
                        key={idx} 
                        className="relative w-full h-full overflow-hidden group cursor-zoom-in"
                        onClick={() => setSelectedImage(img.full)}
                      >
                        <img 
                          src={img.thumb} 
                          alt={`Moment ${idx + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 
                   --------------------------------------------------
                   LAYOUT B: MAGAZINE GRID (3 Columns: 3 - 2 - 3)
                   --------------------------------------------------
                   Used for: 2, 3, 4, 5, 6 Portraits
                   
                   TECHNIQUE: CSS GRID with 6 ROWS.
                   - Left Col Items: Span 2 Rows each (3 items * 2 = 6 rows)
                   - Center Col Items: Span 3 Rows each (2 items * 3 = 6 rows)
                   - Right Col Items: Span 2 Rows each (3 items * 2 = 6 rows)
                   
                   Result: PERFECT HEIGHT MATCH. No whitespace.
                */}
                {layoutType === 'magazine' && (
                  <>
                    {/* DESKTOP: 6-Row Grid */}
                    <div className="hidden md:grid w-full h-full grid-cols-[1fr_1.3fr_1fr] grid-rows-6 gap-1 p-1">
                       {/* Left Column (Indices 0, 1, 2) */}
                       <div className="relative w-full h-full overflow-hidden group cursor-zoom-in row-span-2 col-start-1" onClick={() => setSelectedImage(images[0].full)}>
                          <img src={images[0].thumb} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                       </div>
                       <div className="relative w-full h-full overflow-hidden group cursor-zoom-in row-span-2 col-start-1" onClick={() => setSelectedImage(images[1].full)}>
                          <img src={images[1].thumb} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                       </div>
                       <div className="relative w-full h-full overflow-hidden group cursor-zoom-in row-span-2 col-start-1" onClick={() => setSelectedImage(images[2].full)}>
                          <img src={images[2].thumb} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                       </div>

                       {/* Center Column (Indices 3, 4 - Hero) */}
                       <div className="relative w-full h-full overflow-hidden group cursor-zoom-in row-span-3 col-start-2" onClick={() => setSelectedImage(images[3].full)}>
                          <img src={images[3].thumb} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                       </div>
                       <div className="relative w-full h-full overflow-hidden group cursor-zoom-in row-span-3 col-start-2" onClick={() => setSelectedImage(images[4].full)}>
                          <img src={images[4].thumb} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                       </div>

                       {/* Right Column (Indices 5, 6, 7) */}
                       <div className="relative w-full h-full overflow-hidden group cursor-zoom-in row-span-2 col-start-3" onClick={() => setSelectedImage(images[5].full)}>
                          <img src={images[5].thumb} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                       </div>
                       <div className="relative w-full h-full overflow-hidden group cursor-zoom-in row-span-2 col-start-3" onClick={() => setSelectedImage(images[6].full)}>
                          <img src={images[6].thumb} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                       </div>
                       <div className="relative w-full h-full overflow-hidden group cursor-zoom-in row-span-2 col-start-3" onClick={() => setSelectedImage(images[7].full)}>
                          <img src={images[7].thumb} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                       </div>
                    </div>

                    {/* MOBILE: Standard 2-Col Grid (Fallback) */}
                    <div className="md:hidden w-full h-full grid grid-cols-2 grid-rows-4 gap-1 p-1">
                      {images.map((img, idx) => (
                        <div key={idx} className="relative w-full h-full overflow-hidden" onClick={() => setSelectedImage(img.full)}>
                          <img src={img.thumb} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      ))}
                    </div>
                  </>
                )}

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