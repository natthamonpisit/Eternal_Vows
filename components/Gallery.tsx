
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
      if (rawItems.length === 0) {
        console.log("Preview Mode: Loading Mock Images");
        // สร้าง Dummy Data 17 รูป
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
        <p className="font-serif text-charcoal/60 italic max-w-2xl mx-auto px-4">
          "Every picture tells a story of love, laughter, and our journey together."
        </p>
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
             THE FRAME Container
          */
          <div className="w-full relative shadow-2xl bg-white p-4 md:p-6 rounded-sm">
             <div className="relative w-full h-full bg-white p-2">
                
                {/* 
                   --------------------------------------------------
                   MASONRY LAYOUT (Pinterest Style)
                   --------------------------------------------------
                   - Uses CSS Columns (columns-2, columns-3, columns-4)
                   - Images flow naturally from top to bottom, then next column
                   - Respects aspect ratio perfectly (No cropping)
                */}
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                  {images.map((img, idx) => (
                    <div 
                      key={idx} 
                      className="break-inside-avoid relative group cursor-zoom-in rounded-sm overflow-hidden border-[4px] border-white shadow-sm bg-white"
                      onClick={() => setSelectedImage(img.full)}
                    >
                      <img 
                        src={img.thumb} 
                        alt={`Moment ${idx + 1}`} 
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
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
