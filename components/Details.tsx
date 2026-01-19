
import React, { useEffect, useState } from 'react';
import { fetchGallery } from '../services/api';
import { GalleryItem } from '../types';

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

  // Updated Schedule Data with English & Luxury Icons
  const events = [
    { 
      time: "07:09", 
      title: "Buddhist Ceremony", 
      desc: "Monk Blessing & Merit Making",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm0-12a1 1 0 100 2 1 1 0 000-2zm0 4a3 3 0 100 6 3 3 0 000-6z" />
        </svg>
      )
    },
    { 
      time: "08:29", 
      title: "Engagement Ceremony", 
      desc: "Ring Exchange",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 7v5" />
        </svg>
      )
    },
    { 
      time: "09:09", 
      title: "Tea Ceremony", 
      desc: "Pay Respects to Elders",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M18.36 6.64a9 9 0 11-12.73 0M12 2v10" />
        </svg>
      )
    },
    { 
      time: "09:49", 
      title: "Water Pouring", 
      desc: "Rod Nam Sangha Ceremony",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    { 
      time: "11:09", 
      title: "Wedding Reception", 
      desc: "Lunch Banquet & Celebration",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
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
    <section className="relative py-16 md:py-24 overflow-hidden bg-old-rose">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-60 pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}></div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10 space-y-24">
        
        {/* =========================================
            SECTION 1: THE SCHEDULE (Luxury Row Layout)
           ========================================= */}
        <div>
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-serif text-5xl md:text-7xl text-[#FDFBF7] drop-shadow-sm">The Schedule</h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-8 md:w-12 bg-[#F3E5AB]/40"></div>
              <p className="font-sans text-[#F3E5AB] uppercase tracking-[0.25em] text-xs md:text-sm font-bold">Saturday, March 21st</p>
              <div className="h-px w-8 md:w-12 bg-[#F3E5AB]/40"></div>
            </div>
            
            <a 
              href={addToCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 border border-[#F3E5AB]/30 rounded-full text-[#F3E5AB] hover:bg-[#F3E5AB] hover:text-old-rose transition-all duration-300 text-xs font-sans uppercase tracking-widest font-bold mt-6"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Add to Calendar
            </a>
          </div>

          <div className="max-w-4xl mx-auto relative">
             
             {/* 
                 THE TIMELINE LINE 
                 - Positioned at approx 35% from left on Desktop to allow space for Icon+Time
             */}
             <div className="absolute left-[24px] md:left-[320px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#F3E5AB]/30 to-transparent"></div>

             <div className="space-y-12">
               {events.map((event, idx) => (
                 <div key={idx} className="relative flex items-center group">
                   
                    {/* LEFT GROUP: Icon + Time (Desktop) */}
                    {/* "Icon left of line, left of time" implies: Icon -> Time -> Line */}
                    <div className="hidden md:flex w-[280px] items-center justify-end pr-10 gap-6">
                       
                       {/* Icon */}
                       <div className="w-10 h-10 text-[#F3E5AB]/80 group-hover:text-white transition-colors duration-500">
                          {event.icon}
                       </div>

                       {/* Time (Vanilla Cream, No Shimmer, Elegant) */}
                       <span className="font-serif text-3xl text-[#F3E5AB] font-medium tracking-wider drop-shadow-sm min-w-[80px] text-right">
                          {event.time}
                       </span>

                    </div>

                    {/* MOBILE GROUP (Layout adjusted for small screen) */}
                    <div className="md:hidden absolute left-[56px] -top-6 flex items-center gap-2">
                        <span className="font-serif text-xl text-[#F3E5AB] font-bold">{event.time}</span>
                    </div>

                    {/* CENTER POINT ON LINE */}
                    <div className="absolute left-[19px] md:left-[315px] w-[11px] h-[11px] rounded-full bg-[#F3E5AB] border-2 border-old-rose z-10 shadow-sm group-hover:scale-125 transition-transform duration-300"></div>

                    {/* RIGHT GROUP: Content */}
                    <div className="flex-1 pl-12 md:pl-12 pt-1">
                       <h3 className="font-serif text-3xl md:text-4xl text-[#FDFBF7] mb-1 drop-shadow-sm group-hover:translate-x-1 transition-transform duration-300">
                          {event.title}
                       </h3>
                       <p className="font-sans text-[#F3E5AB]/70 uppercase tracking-widest text-xs font-medium border-t border-white/10 inline-block pt-2">
                         {event.desc}
                       </p>
                    </div>

                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* =========================================
            SECTION 2: LOCATION & VENUE
           ========================================= */}
        <div className="border-t border-cream/20 pt-16 md:pt-24">
           <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-6xl text-cream drop-shadow-sm mb-2">The Venue</h2>
              <p className="font-sans text-cream/80 uppercase tracking-[0.2em] text-sm md:text-base font-bold">Atmosphere & Location</p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Left: The Map (Arch Design) */}
              <div className="flex justify-center">
                <div className="relative drop-shadow-2xl w-full max-w-[320px]">
                   <div className="w-full aspect-[360/500] bg-charcoal rounded-t-[160px] md:rounded-t-[180px] rounded-b-xl p-3 md:p-4 flex flex-col relative shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                      <div className="flex-1 bg-white rounded-t-[140px] md:rounded-t-[160px] rounded-b-lg p-2 overflow-hidden relative">
                          <div className="w-full h-full rounded-t-[130px] md:rounded-t-[150px] rounded-b-md overflow-hidden bg-gray-100 relative isolate">
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
                      <h3 className="font-serif text-3xl text-[#F9E4B7] drop-shadow-md font-medium">Dalva le ville</h3>
                      <p className="font-sans text-lg font-bold uppercase tracking-widest text-[#F9E4B7] drop-shadow-md mt-1">Bangkok, Thailand</p>
                   </div>
                </div>
              </div>

              {/* Right: Venue Gallery (4 Images) */}
              <div className="space-y-6">
                 {/* Grid: 2x2 Layout for BIG images */}
                 <div className="grid grid-cols-2 gap-4">
                    {loadingVenue ? (
                       // Skeleton Loaders
                       Array.from({length: 4}).map((_, i) => (
                         <div key={i} className="aspect-[4/3] bg-white/10 rounded-sm animate-pulse"></div>
                       ))
                    ) : (
                       // Images
                       venueImages.map((img, idx) => (
                         <div key={idx} className="aspect-[4/3] relative group overflow-hidden rounded-sm border-2 border-white/20 shadow-md">
                            <img 
                              src={img.thumb} 
                              alt="Venue Atmosphere" 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                         </div>
                       ))
                    )}
                 </div>
                 <p className="text-center lg:text-left font-serif text-cream/80 italic text-sm">
                   "A classic and elegant atmosphere to celebrate our special day."
                 </p>
              </div>

           </div>
        </div>

        {/* =========================================
            SECTION 3: DRESS CODE
           ========================================= */}
        <div className="py-12 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl text-center relative mx-0 border border-white/40">
          <h3 className="font-serif text-4xl md:text-5xl text-gold-shine mb-8">Dress Code</h3>
          
          <div className="flex justify-center items-start gap-4 md:gap-8 flex-wrap px-2">
             {[
               { color: '#C08E86', name: 'Pink Taupe' },
               { color: '#C5908E', name: 'Dusty Pink' }, 
               { color: '#CFC1B3', name: 'Warm Taupe' }, 
               { color: '#9EA996', name: 'Sage Green' }, 
               { color: '#E6DABF', name: 'Cream Beige' }, 
               { color: '#DBC895', name: 'Light Gold' },
             ].map((swatch, i) => (
               <div key={i} className="flex flex-col items-center gap-2 group w-20 sm:w-24">
                 <div 
                   className="w-12 h-12 md:w-16 md:h-16 rounded-full shadow-md border border-gray-200 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300"
                   style={{ backgroundColor: swatch.color }}
                 ></div>
                 <span className="font-sans text-[10px] uppercase tracking-wider text-charcoal/60 group-hover:text-charcoal transition-colors whitespace-nowrap font-semibold">
                   {swatch.name}
                 </span>
               </div>
             ))}
          </div>
        </div>

      </div>
    </section>
  );
};
