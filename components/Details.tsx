import React, { useEffect, useState } from 'react';
import { fetchGallery } from '../services/api';
import { GalleryItem } from '../types';
import { FadeInUp } from './FadeInUp';

export const Details: React.FC = () => {
  const [venueImages, setVenueImages] = useState<GalleryItem[]>([]);
  const [loadingVenue, setLoadingVenue] = useState(true);

  // Fetch Location Images specifically
  useEffect(() => {
    const loadVenueImages = async () => {
      // 1. Try fetching from the specific folder
      const images = await fetchGallery('Wedding_OukBew/Location');
      
      if (images.length > 0) {
        setVenueImages(images.slice(0, 4));
      } else {
        // 2. Fallback
        const placeholders = [
          "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop", 
          "https://images.unsplash.com/photo-1464366400600-7168b8af0bc3?q=80&w=800&auto=format&fit=crop", 
          "https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=800&auto=format&fit=crop", 
          "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=800&auto=format&fit=crop"
        ].map(url => ({ thumb: url, full: url }));
        setVenueImages(placeholders);
      }
      setLoadingVenue(false);
    };
    loadVenueImages();
  }, []);

  // Updated Schedule Data with REFINED Luxury Icons
  const events = [
    { 
      time: "07:09", 
      title: "Buddhist Ceremony", 
      desc: "Monk Blessing & Merit Making",
      icon: (
        // Icon: Alms Bowl - Centered & Clean
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           {/* Medallion Border */}
           <circle cx="12" cy="12" r="11" strokeWidth="0.8" />
           <circle cx="12" cy="12" r="9.5" strokeWidth="0.3" strokeDasharray="1 3" opacity="0.5" />
           
           {/* Bowl Shape - Perfectly Centered */}
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6.5 11c0 3.5 2.462 6 5.5 6 3.038 0 5.5-2.5 5.5-6" />
           <ellipse cx="12" cy="11" rx="5.5" ry="1.5" strokeWidth={1} />
           
           {/* Lid & Handle - Clean lines */}
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10.5 9V7.5h3V9" />
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 7.5V6" />
           <circle cx="12" cy="5" r="0.8" fill="currentColor" />
           
           {/* Stand */}
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M9 17l-1 2h8l-1-2" />
        </svg>
      )
    },
    { 
      time: "08:29", 
      title: "Engagement Ceremony", 
      desc: "Ring Exchange",
      icon: (
        // Icon: Twin Rings - Full Circles (No cuts)
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           {/* Medallion Border */}
           <circle cx="12" cy="12" r="11" strokeWidth="0.8" />
           <circle cx="12" cy="12" r="9.5" strokeWidth="0.3" strokeDasharray="1 3" opacity="0.5" />
           
           {/* Ring 1 (Left) */}
           <circle cx="10" cy="12" r="3.5" strokeWidth={1} />
           {/* Diamond 1 */}
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M10 8.5L8.5 6.5h3L10 8.5z" />

           {/* Ring 2 (Right) - Offset */}
           <circle cx="14" cy="12" r="3.5" strokeWidth={1} />
           {/* Diamond 2 */}
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M14 8.5L12.5 6.5h3L14 8.5z" />
           
           {/* Sparkle between */}
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.6} d="M12 4l.5 1.5L14 6l-1.5.5L12 8l-.5-1.5L10 6l1.5-.5z" />
        </svg>
      )
    },
    { 
      time: "09:09", 
      title: "Phiti Rub Wai", 
      desc: "Paying Respects to Elders",
      icon: (
        // Icon: Pedestal Tray - Simplified & Balanced
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           {/* Medallion Border */}
           <circle cx="12" cy="12" r="11" strokeWidth="0.8" />
           <circle cx="12" cy="12" r="9.5" strokeWidth="0.3" strokeDasharray="1 3" opacity="0.5" />

           {/* Base */}
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 18h6l1 2H8l1-2z" />
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v3" />
           
           {/* Tray Body */}
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 11c0 2.5 2 4 5 4s5-1.5 5-4" />
           <ellipse cx="12" cy="11" rx="5" ry="1.2" strokeWidth={1} />
           
           {/* Gift Box on top (Clean Rectangle) */}
           <rect x="9.5" y="6.5" width="5" height="3.5" strokeWidth={1} rx="0.5" />
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.5v3.5" />
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.5 8.25h5" />
        </svg>
      )
    },
    { 
      time: "09:49", 
      title: "Water Pouring", 
      desc: "Rod Nam Sangha Ceremony",
      icon: (
        // Icon: Traditional Thai Conch Shell (หอยสังข์) - Long Tapered Tail
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           {/* Medallion Border */}
           <circle cx="12" cy="12" r="11" strokeWidth="0.8" />
           <circle cx="12" cy="12" r="9.5" strokeWidth="0.3" strokeDasharray="1 3" opacity="0.5" />

           {/* Tilted Conch Shell (Diagonal Placement) */}
           <g transform="rotate(-45, 12, 12) translate(0, -1)">
             {/* The Body (Bulbous top) */}
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6c2.5 0 4 2 4 4.5 0 1.5-1 3-2 4" />
             {/* The Tail (Long Tapered Cone) - Connecting body to tip */}
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6C9.5 6 8 8 8 10.5c0 3 2 7 4 10" />
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 14.5c-1 2-2 4-2 6" />
             
             {/* Spiral Detail inside */}
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8.5c1 0 1.5.5 1.5 1.5s-.5 2-1.5 2.5" />
           </g>
           
           {/* Water Drops (Falling vertically relative to page, not shell) */}
           <circle cx="10" cy="18" r="0.6" fill="currentColor" />
           <circle cx="10" cy="20.5" r="0.4" fill="currentColor" />
        </svg>
      )
    },
    { 
      time: "11:09", 
      title: "Wedding Celebration", 
      desc: "Lunch Banquet & Party",
      icon: (
        // Icon: Champagne Toast - Perfectly Centered & Symmetrical
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           {/* Medallion Border */}
           <circle cx="12" cy="12" r="11" strokeWidth="0.8" />
           <circle cx="12" cy="12" r="9.5" strokeWidth="0.3" strokeDasharray="1 3" opacity="0.5" />

           {/* Symmetrical Glasses Group */}
           <g transform="translate(0.5, 0.5)">
             {/* Glass 1 (Left) - Tilted Right 10 deg */}
             <g transform="rotate(10, 10, 12)">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.5 11.5V7h3v4.5a1.5 1.5 0 0 1-1.5 1.5 1.5 1.5 0 0 1-1.5-1.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 13v4M8 17h4" />
             </g>
             
             {/* Glass 2 (Right) - Tilted Left 10 deg */}
             <g transform="rotate(-10, 14, 12)">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12.5 11.5V7h3v4.5a1.5 1.5 0 0 1-1.5 1.5 1.5 1.5 0 0 1-1.5-1.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 13v4M12 17h4" />
             </g>

             {/* Bubbles - Rising from precise center */}
             <circle cx="12" cy="5" r="0.6" fill="currentColor" />
             <circle cx="12" cy="3" r="0.4" fill="currentColor" opacity="0.7" />
           </g>
        </svg>
      )
    }
  ];

  const addToCalendarUrl = () => {
    const title = encodeURIComponent("Wedding of Natthamonpisit & Sorot");
    const dates = "20260321T000000Z/20260321T070000Z";
    const details = encodeURIComponent("Join us in celebrating our special day! Ceremony starts at 07:09 AM.");
    const location = encodeURIComponent("Dalva le ville, Bangkok");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}&sf=true&output=xml`;
  };

  return (
    <section className="relative w-full">
      
      {/* 
          Standard Color Block Section
          MOBILE UPDATE: Reduced padding (py-12)
      */}
      <div className="bg-old-rose py-12 md:py-24 relative overflow-hidden shadow-[0_0_50px_rgba(192,142,134,0.3)] z-10">
        
        {/* Background Texture for Details Section */}
        <div className="absolute inset-0 opacity-60 pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}></div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10 space-y-16 md:space-y-24">
          
          {/* =========================================
              SECTION 1: THE SCHEDULE
             ========================================= */}
          <div>
            <FadeInUp>
              {/* MOBILE UPDATE: Reduced margin-bottom (mb-8) */}
              <div className="text-center mb-8 md:mb-16 space-y-2 md:space-y-4">
                {/* 
                  DESIGN RULE: HEADINGS
                  Mobile: text-3xl (30px) - Reduced for breathing room
                  Desktop: text-5xl (48px)
                */}
                <h2 className="font-sans text-3xl md:text-5xl text-cream-shine drop-shadow-sm uppercase tracking-wider font-bold">The Schedule</h2>
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px w-8 md:w-12 bg-[#F3E5AB]/40"></div>
                  {/* Design System Update: text-sm md:text-base, font-medium (Thin) */}
                  <p className="font-sans text-[#F3E5AB] uppercase tracking-[0.25em] text-sm md:text-base font-medium">Saturday, March 21st</p>
                  <div className="h-px w-8 md:w-12 bg-[#F3E5AB]/40"></div>
                </div>
                
                <a 
                  href={addToCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 border border-[#F3E5AB]/30 rounded-full text-[#F3E5AB] hover:bg-[#F3E5AB] hover:text-old-rose transition-all duration-300 text-xs font-sans uppercase tracking-widest font-bold mt-4 md:mt-6"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Add to Calendar
                </a>
              </div>
            </FadeInUp>

            <div className="max-w-4xl mx-auto relative">
               {/* Timeline Line */}
               <div className="absolute left-[24px] md:left-[320px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#F3E5AB]/30 to-transparent"></div>

               {/* MOBILE UPDATE: Reduced spacing (space-y-5) */}
               <div className="space-y-5 md:space-y-12">
                 {events.map((event, idx) => (
                   <FadeInUp key={idx} delay={`${idx * 150}ms`}>
                     <div className="relative flex items-center group">
                        
                        {/* --- DESKTOP LAYOUT (Left Side: Time & Icon) --- */}
                        <div className="hidden md:flex w-[280px] items-center justify-end pr-10 gap-6">
                           <div className="w-14 h-14 text-[#F3E5AB]/80 group-hover:text-white transition-colors duration-500">
                              {event.icon}
                           </div>
                           <span className="font-sans text-2xl text-[#F3E5AB] font-bold tracking-wider drop-shadow-sm min-w-[80px] text-right">
                              {event.time}
                           </span>
                        </div>

                        {/* --- MOBILE LAYOUT (Timeline Icon + Time above) --- */}
                        {/* 
                           MOBILE ICON UPDATE:
                           - Size: w-12 h-12 (Fixed container size)
                           - Padding: p-2 (Reduced from p-2.5) -> This makes the inner Icon LARGER by ~10%
                        */}
                        <div className="md:hidden absolute left-[24px] -translate-x-1/2 flex items-center justify-center w-12 h-12 bg-old-rose border-2 border-[#F3E5AB] rounded-full z-10 text-[#F3E5AB] shadow-lg p-2">
                            {event.icon}
                        </div>

                        {/* 2. Content */}
                        <div className="flex-1 pl-16 md:pl-24 pt-1">
                           {/* 
                              MOBILE TYPOGRAPHY UPDATE (-15% Size):
                              - Time: text-lg (18px) -> text-base (16px)
                           */}
                           <span className="md:hidden block font-sans text-base text-[#F3E5AB] font-bold mb-1">
                              {event.time}
                           </span>

                           {/* 
                              - Title: text-xl (20px) -> text-lg (18px)
                           */}
                           <h3 className="font-sans text-lg md:text-3xl text-[#FDFBF7] mb-1 drop-shadow-sm group-hover:translate-x-1 transition-transform duration-300 font-bold uppercase tracking-wide">
                              {event.title}
                           </h3>
                           
                           {/* 
                              - Desc: text-xs (12px) -> text-[10px]
                           */}
                           <p className="font-sans text-[#F3E5AB]/70 uppercase tracking-widest text-[10px] md:text-xs font-medium border-t border-white/10 inline-block pt-2">
                             {event.desc}
                           </p>
                        </div>

                     </div>
                   </FadeInUp>
                 ))}
               </div>
            </div>
          </div>

          {/* =========================================
              SECTION 2: LOCATION & VENUE
             ========================================= */}
          <div className="border-t border-cream/20 pt-10 md:pt-24">
             <FadeInUp>
               <div className="text-center mb-12">
                  {/* DESIGN RULE: SECTION HEADER - Mobile: text-3xl */}
                  <h2 className="font-sans text-3xl md:text-5xl text-cream-shine drop-shadow-sm mb-2 uppercase tracking-wider font-bold">The Venue</h2>
                  {/* Design System Update: text-sm md:text-base, font-medium (Thin) */}
                  <p className="font-sans text-cream/80 uppercase tracking-[0.2em] text-sm md:text-base font-medium">Atmosphere & Location</p>
               </div>
             </FadeInUp>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <FadeInUp delay="200ms">
                  <div className="flex justify-center">
                    
                    {/* 
                       MOBILE FINE-TUNING:
                       1. Size Reduction: max-w from 320px -> 240px (Approx 25% smaller on mobile)
                       2. Border Geometry: Calculated precise radii for perfect semi-circle arch
                          - Mobile Width: 240px -> Outer Radius: 120px
                          - Padding: p-3 (12px) -> Inner Radius: 108px
                          - Inner Padding: p-2 (8px) -> Map Radius: 100px
                    */}
                    <div className="relative drop-shadow-2xl w-full max-w-[240px] md:max-w-[320px]">
                       
                       {/* Outer Frame (UPDATED: White Border as requested) */}
                       <div className="w-full aspect-[360/500] bg-white rounded-t-[120px] md:rounded-t-[160px] rounded-b-xl p-3 md:p-4 flex flex-col relative shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                          
                          {/* Inner Matte (White) */}
                          <div className="flex-1 bg-white rounded-t-[108px] md:rounded-t-[144px] rounded-b-lg p-2 overflow-hidden relative">
                              
                              {/* Map Container */}
                              <div className="w-full h-full rounded-t-[100px] md:rounded-t-[136px] rounded-b-md overflow-hidden bg-gray-100 relative isolate">
                                <iframe 
                                  className="w-full h-full filter grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                                  src="https://maps.google.com/maps?q=Dalva+le+ville+Bangkok&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                  allowFullScreen
                                  loading="lazy"
                                  referrerPolicy="no-referrer-when-downgrade"
                                  title="Wedding Location Map"
                                ></iframe>
                                <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10 pointer-events-none">
                                    <a 
                                      href="https://www.google.com/maps/search/?api=1&query=Dalva+le+ville+Bangkok" 
                                      target="_blank" 
                                      rel="noreferrer"
                                      className="pointer-events-auto bg-charcoal/90 text-white px-5 py-2 rounded-full font-sans text-[10px] font-bold uppercase tracking-widest shadow-lg border border-white/20 hover:bg-gold transition-colors flex items-center gap-2 group"
                                    >
                                      <span>View Map</span>
                                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    </a>
                                </div>
                              </div>
                          </div>
                       </div>
                       <div className="text-center mt-6">
                          <h3 className="font-sans text-2xl text-[#F9E4B7] drop-shadow-md font-bold uppercase tracking-wider">Dalva le ville</h3>
                          <p className="font-sans text-sm font-bold uppercase tracking-widest text-[#F9E4B7] drop-shadow-md mt-1">Bangkok, Thailand</p>
                       </div>
                    </div>
                  </div>
                </FadeInUp>

                <div className="space-y-6">
                   <div className="grid grid-cols-2 gap-4">
                      {loadingVenue ? (
                         Array.from({length: 4}).map((_, i) => (
                           <div key={i} className="aspect-[4/3] bg-white/10 rounded-sm animate-pulse"></div>
                         ))
                      ) : (
                         venueImages.map((img, idx) => (
                           <FadeInUp key={idx} delay={`${idx * 150}ms`}>
                             <div className="aspect-[4/3] relative group overflow-hidden rounded-sm border-2 border-white/20 shadow-md">
                                <img 
                                  src={img.thumb} 
                                  alt="Venue Atmosphere" 
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                             </div>
                           </FadeInUp>
                         ))
                      )}
                   </div>
                   <FadeInUp delay="600ms">
                     {/* Shortened Venue Description */}
                     <p className="text-center lg:text-left font-sans text-cream/80 italic text-sm tracking-wide">
                       "A classic and elegant celebration."
                     </p>
                   </FadeInUp>
                </div>

             </div>
          </div>

          {/* =========================================
              SECTION 3: DRESS CODE
             ========================================= */}
          <FadeInUp>
            {/* 
              MOBILE COMPACT UPDATE:
              - Padding: py-12 -> py-8
            */}
            <div className="py-8 md:py-12 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl text-center relative mx-0 border border-white/40">
              {/* 
                 MOBILE COMPACT UPDATE:
                 - Font Size: text-3xl -> text-2xl
                 - Margin: mb-8 -> mb-6
              */}
              <h3 className="font-sans text-2xl md:text-5xl text-gold-shine mb-6 md:mb-8 uppercase tracking-wider font-bold">Dress Code</h3>
              
              {/* 
                 MOBILE COMPACT UPDATE:
                 - Spacing: gap-4 -> gap-x-3 gap-y-5
              */}
              <div className="flex justify-center items-start gap-x-3 gap-y-5 md:gap-8 flex-wrap px-2">
                 {[
                   { color: '#C08E86', name: 'Pink Taupe' },
                   { color: '#C5908E', name: 'Dusty Pink' }, 
                   { color: '#CFC1B3', name: 'Warm Taupe' }, 
                   { color: '#9EA996', name: 'Sage Green' }, 
                   { color: '#E6DABF', name: 'Cream Beige' }, 
                   { color: '#DBC895', name: 'Light Gold' },
                 ].map((swatch, i) => (
                   // Wrapper width: w-20 -> w-16
                   <div key={i} className="flex flex-col items-center gap-2 group w-16 sm:w-20 md:w-24">
                     {/* 
                        Circle Size: w-12 -> w-10 (~17% Reduction)
                     */}
                     <div 
                       className="w-10 h-10 md:w-16 md:h-16 rounded-full shadow-md border border-gray-200 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300"
                       style={{ backgroundColor: swatch.color }}
                     ></div>
                     {/* 
                        Text Size: text-[10px] -> text-[9px]
                     */}
                     <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-wider text-charcoal/60 group-hover:text-charcoal transition-colors whitespace-nowrap font-semibold">
                       {swatch.name}
                     </span>
                   </div>
                 ))}
              </div>
            </div>
          </FadeInUp>

        </div>
      </div>
    </section>
  );
};