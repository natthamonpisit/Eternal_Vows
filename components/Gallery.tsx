import React, { useEffect, useState, useRef } from 'react';
import { fetchGallery } from '../services/api';
import { GalleryItem } from '../types';

export const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Header Animation State
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadImages = async () => {
      const items = await fetchGallery();
      setImages(items);
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
          observer.disconnect(); // Animate only once
        }
      },
      { threshold: 0.2 } // Trigger when 20% visible
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
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
      <div 
        ref={headerRef}
        className={`text-center mb-12 md:mb-16 will-change-transform transform-gpu backface-hidden transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isHeaderVisible 
            ? 'opacity-100 translate-y-0 blur-0' 
            : 'opacity-0 translate-y-32 blur-md'
        }`}
      >
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
            {images.map((item, index) => (
              <GalleryItemView 
                key={index}
                url={item.thumb}
                index={index}
                gridClass={getGridClass(index)}
                onClick={() => setSelectedImage(item.full)}
              />
            ))}
          </div>

          {images.length === 0 && (
            <div className="text-center py-24 border border-gold/20 rounded-lg mx-auto max-w-2xl bg-white/50">
              <p className="font-serif text-2xl text-charcoal/40 italic mb-4">"Memories are being made..."</p>
              <p className="font-sans text-xs text-gold uppercase tracking-widest">Photos coming soon</p>
            </div>
          )}

          {/* Instagram Hashtag Button */}
          <div className="mt-16 text-center animate-fade-in">
            <a 
              href="https://www.instagram.com/explore/tags/NatSorotWedding/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-8 py-4 bg-white border border-gold/20 rounded-full shadow-md hover:shadow-xl hover:border-gold hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px] shadow-sm">
                 <div className="w-full h-full bg-white rounded-[6px] flex items-center justify-center">
                    <svg className="w-5 h-5 text-charcoal" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                 </div>
              </div>
              <div className="text-left">
                 <p className="font-sans text-[10px] uppercase tracking-widest text-gold font-bold mb-0.5">See Live Moments</p>
                 <p className="font-serif text-xl text-charcoal italic group-hover:text-gold transition-colors">#NatSorotWedding</p>
              </div>
              <svg className="w-5 h-5 text-gray-300 group-hover:translate-x-1 transition-transform group-hover:text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
            </a>
          </div>

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
const GalleryItemView: React.FC<{ 
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
        // Trigger only ONCE when intersecting
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect observer immediately to prevent re-triggering/flickering on scroll events
          observer.disconnect();
        }
      });
    }, {
      threshold: 0.15,
    });

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={domRef}
      className={`${gridClass} relative group cursor-pointer overflow-hidden rounded-sm will-change-transform transform-gpu backface-hidden transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
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