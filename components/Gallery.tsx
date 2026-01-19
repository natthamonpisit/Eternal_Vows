
import React, { useEffect, useState } from 'react';
import { fetchGallery } from '../services/api';
import { GalleryItem } from '../types';
import { MOCK_GALLERY_IMAGES } from '../constants';
import { FadeInUp } from './FadeInUp';

export const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      let rawItems = await fetchGallery();
      
      // Fallback for Preview
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

  // 🍱 BENTO GRID LOGIC (Same as before)
  const getBentoClass = (index: number) => {
    const base = "relative overflow-hidden group cursor-zoom-in rounded-sm border-2 border-white shadow-sm bg-gray-100";
    let desktopClass = "";
    if ([0, 3, 8, 11, 14].includes(index)) {
        desktopClass = "md:col-span-2 md:row-span-2"; 
    } else {
        desktopClass = "md:col-span-1 md:row-span-1"; 
    }
    if (index === 1) desktopClass = "md:col-span-2 md:row-span-1"; 
    if (index === 2) desktopClass = "md:col-span-1 md:row-span-1";
    if (index === 5) desktopClass = "md:col-span-1 md:row-span-2"; 
    if (index === 16) desktopClass = "md:col-span-2 md:row-span-1"; 

    return `${base} col-span-1 row-span-1 ${desktopClass}`;
  };

  return (
    // Changed bg-taupe/20 to transparent/subtle to blend with global background
    <section className="py-24 px-4 relative min-h-[80vh] flex flex-col justify-center">
      
      {/* Optional: Very subtle gradient to differentiate section without hard lines */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-taupe/5 to-transparent pointer-events-none"></div>

      <FadeInUp>
        <div className="text-center mb-16 md:mb-20">
          <p className="font-sans text-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-4">Pre-Wedding Gallery</p>
          <h2 className="font-serif text-5xl md:text-7xl text-charcoal mb-6 text-gold-shine">Our Moments</h2>
          <p className="font-serif text-charcoal/60 italic max-w-2xl mx-auto px-4">
            "Every picture tells a story of love, laughter, and our journey together."
          </p>
        </div>
      </FadeInUp>

      <div className="max-w-[1400px] mx-auto w-full px-0 relative z-10">
        
        {loading ? (
          <div className="w-full aspect-video bg-white/50 rounded-sm flex flex-col justify-center items-center shadow-lg border border-gold/10">
            <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin mb-4"></div>
            <p className="font-serif text-charcoal/60 italic">Loading gallery...</p>
          </div>
        ) : (
          /* THE FRAME Container - We animate the container entry, but NOT the images inside */
          <FadeInUp delay="200ms">
            <div className="w-full relative shadow-2xl bg-white p-2 md:p-4 rounded-sm">
               <div className="relative w-full h-full bg-white">
                  {/* THE BENTO GRID - Images are STATIC (no motion/scroll effects) as requested */}
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
                        <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-500"></div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </FadeInUp>
        )}

        <FadeInUp delay="400ms">
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
        </FadeInUp>
      </div>

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
