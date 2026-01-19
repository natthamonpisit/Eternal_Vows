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

  // 🍱 BENTO GRID LOGIC
  const getBentoClass = (index: number) => {
    // UPDATED: Removed bg-gray-100, added bg-white/50 for placeholder feel before load
    // Added border-white/40 to make images pop slightly from transparent bg
    const base = "relative overflow-hidden group cursor-zoom-in rounded-sm border border-white/30 shadow-sm bg-white/10";
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
    // Section uses transparent background to show App global texture
    <section className="pt-0 pb-16 px-4 relative flex flex-col justify-center">
      
      <FadeInUp>
        <div className="text-center mb-16 md:mb-20 relative z-10">
          {/* Main Heading First - Updated to Mobile text-3xl */}
          <h2 className="font-sans text-3xl md:text-5xl text-gold-shine mb-3 uppercase tracking-wider font-bold">Our Moments</h2>
          {/* Subheading Moved Below */}
          <p className="font-sans text-gray-500 text-sm md:text-base tracking-[0.3em] uppercase font-medium">Pre-Wedding Gallery</p>
        </div>
      </FadeInUp>

      <div className="max-w-[1400px] mx-auto w-full px-0 relative z-10">
        
        {loading ? (
          <div className="w-full aspect-video bg-white/10 backdrop-blur-sm rounded-sm flex flex-col justify-center items-center shadow-lg border border-gold/10">
            <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin mb-4"></div>
            <p className="font-sans text-charcoal/60 uppercase tracking-widest text-xs">Loading gallery...</p>
          </div>
        ) : (
          /* DESIGN UPDATE: Removed White Frame Container. Images float on background. */
          <FadeInUp delay="200ms">
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4 auto-rows-[120px] md:auto-rows-[160px] lg:auto-rows-[180px] grid-flow-dense">
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
          </FadeInUp>
        )}

        <FadeInUp delay="400ms">
          <div className="mt-12 md:mt-16 text-center">
              <a 
                href="https://www.instagram.com/explore/tags/OukBewtheWedding/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center p-[2px] overflow-hidden rounded-full transition-transform hover:scale-105 duration-300 shadow-lg"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]"></span>
                <span className="relative flex items-center gap-2 px-6 py-2.5 transition-all ease-in duration-200 bg-white rounded-full group-hover:bg-opacity-0">
                    <span className="font-sans text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] bg-clip-text text-transparent group-hover:text-white">
                       View on Instagram #OukBewtheWedding
                    </span>
                    <svg className="w-4 h-4 text-[#fd1d1d] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </span>
              </a>
          </div>
        </FadeInUp>

        {/* Closing Divider for Visual Flow */}
        <FadeInUp delay="500ms">
           <div className="w-24 h-px bg-gold/30 mx-auto mt-20"></div>
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