import React, { useEffect, useState, useMemo } from 'react';
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
      // 1. Explicitly fetch from 'Wedding_OukBew/Ourmoment' folder
      const rawItems = await fetchGallery('Wedding_OukBew/Ourmoment');
      
      if (rawItems.length > 0) {
        setImages(rawItems);
      } else {
        // Fallback
        console.log("No images found in Ourmoment, using Mock Data.");
        const mocks = MOCK_GALLERY_IMAGES.map(url => ({ thumb: url, full: url }));
        setImages(mocks);
      }

      setLoading(false);
    };
    loadImages();
  }, []);

  // 🍱 LOGIC: Image Distribution for Mobile (Manual Balance)
  // แทนที่จะใช้ columns-2 (ที่เรียงบนลงล่างแล้วทำให้สูงต่ำไม่เท่ากัน)
  // เจเปลี่ยนมาใช้การแยก Array เป็น "ซ้าย" (Index คู่) และ "ขวา" (Index คี่)
  // วิธีนี้จะช่วยเกลี่ยรูปสุดท้ายให้ไปลงในฝั่งที่ว่างกว่าโดยอัตโนมัติตามลำดับการโหลดครับ
  const mobileColumns = useMemo(() => {
    const left: GalleryItem[] = [];
    const right: GalleryItem[] = [];
    
    images.forEach((img, i) => {
      // สลับฟันปลา: รูปที่ 1 ลงซ้าย, รูปที่ 2 ลงขวา, รูปที่ 3 ลงซ้าย ...
      if (i % 2 === 0) {
        left.push(img);
      } else {
        right.push(img);
      }
    });
    
    return { left, right };
  }, [images]);

  // 🍱 LOGIC: Desktop Grid Pattern
  const getDesktopClass = (index: number) => {
    const base = "relative overflow-hidden group cursor-zoom-in rounded-sm border border-white/30 shadow-sm bg-white/10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110";
    
    // Grid Spanning Logic
    let spanClass = "col-span-1 row-span-1";
    const mod = index % 12;

    if (mod === 0 || mod === 7) {
        spanClass = "col-span-2 row-span-2"; // Big Highlight (2x2)
    } 
    else if (mod === 3) {
        spanClass = "col-span-1 row-span-2"; // Tall Portrait (1x2)
    }
    else if (mod === 10) {
        spanClass = "col-span-2 row-span-1"; // Wide Landscape (2x1)
    }

    return { container: `relative overflow-hidden group cursor-zoom-in rounded-sm border border-white/30 shadow-sm bg-white/10 ${spanClass}`, img: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" };
  };

  return (
    // Section uses transparent background to show App global texture
    <section className="pt-0 md:pt-24 pb-16 px-4 relative flex flex-col justify-center">
      
      <FadeInUp>
        <div className="text-center mb-16 md:mb-20 relative z-10">
          {/* Main Heading */}
          <h2 className="font-sans text-3xl md:text-5xl text-gold-shine mb-3 uppercase tracking-wider font-bold">Our Moments</h2>
          <p className="font-sans text-gray-500 text-sm md:text-base tracking-[0.3em] uppercase font-medium">Pre-Wedding Gallery</p>
        </div>
      </FadeInUp>

      <div className="max-w-[1400px] mx-auto w-full px-0 relative z-10">
        
        {loading ? (
          <div className="w-full min-h-screen bg-white/5 backdrop-blur-sm rounded-sm flex flex-col justify-start pt-32 items-center shadow-none border border-gold/10">
            <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin mb-4"></div>
            <p className="font-sans text-charcoal/60 uppercase tracking-widest text-xs">Loading gallery...</p>
          </div>
        ) : (
          <FadeInUp delay="200ms">
             
             {/* 
                📱 MOBILE LAYOUT: DUAL COLUMN FLEX (Manual Masonry)
                แก้ปัญหา Column สูงต่ำไม่เท่ากันด้วยการสลับรูปซ้ายขวา
             */}
             <div className="flex md:hidden gap-3 items-start">
                {/* Left Column (Even Indices: 0, 2, 4...) */}
                <div className="flex-1 flex flex-col gap-3">
                   {mobileColumns.left.map((img, idx) => (
                      <div 
                        key={`m-left-${idx}`}
                        className="relative overflow-hidden group cursor-zoom-in rounded-sm border border-white/30 shadow-sm bg-white/10"
                        onClick={() => setSelectedImage(img.full)}
                      >
                         <img 
                           src={img.thumb} 
                           alt={`Moment L${idx}`} 
                           className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                           loading="lazy"
                         />
                         <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-500"></div>
                      </div>
                   ))}
                </div>

                {/* Right Column (Odd Indices: 1, 3, 5...) */}
                <div className="flex-1 flex flex-col gap-3">
                   {mobileColumns.right.map((img, idx) => (
                      <div 
                        key={`m-right-${idx}`}
                        className="relative overflow-hidden group cursor-zoom-in rounded-sm border border-white/30 shadow-sm bg-white/10"
                        onClick={() => setSelectedImage(img.full)}
                      >
                         <img 
                           src={img.thumb} 
                           alt={`Moment R${idx}`} 
                           className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                           loading="lazy"
                         />
                         <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-500"></div>
                      </div>
                   ))}
                </div>
             </div>

             {/* 
                💻 DESKTOP LAYOUT: CSS GRID (Complex Pattern)
                คง Layout เดิมที่พี่ชอบไว้ครับ
             */}
             <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-6 md:gap-4 md:auto-rows-[160px] lg:auto-rows-[180px] grid-flow-dense">
               {images.map((img, idx) => {
                 const styles = getDesktopClass(idx);
                 return (
                   <div 
                     key={`d-${idx}`} 
                     className={styles.container}
                     onClick={() => setSelectedImage(img.full)}
                   >
                     <img 
                       src={img.thumb} 
                       alt={`Moment ${idx + 1}`} 
                       className={styles.img}
                       loading="lazy"
                     />
                     <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-500"></div>
                   </div>
                 );
               })}
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

        {/* Closing Divider */}
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