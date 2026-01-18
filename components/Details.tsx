
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
        // If we have real images, use them (take up to 3)
        setVenueImages(images.slice(0, 3));
      } else {
        // 2. Fallback / Placeholder if folder is empty (Mocking Dalva le ville vibe)
        const placeholders = [
          "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop", // Hall
          "https://images.unsplash.com/photo-1464366400600-7168b8af0bc3?q=80&w=800&auto=format&fit=crop", // Garden
          "https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=800&auto=format&fit=crop", // Table
        ].map(url => ({ thumb: url, full: url }));
        setVenueImages(placeholders);
      }
      setLoadingVenue(false);
    };
    loadVenueImages();
  }, []);

  const events = [
    { 
      time: "07:00", 
      title: "Buddhist Alms Giving", 
      desc: "Morning Blessing",
      icon: (
        // Lotus Icon
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4c-2 3-4 6-4 9 0 2 2 3 4 3s4-1 4-3c0-3-2-6-4-9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 13c-2 0-3 1-3 3 0 2 2 3 4 3" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 13c2 0 3 1 3 3 0 2-2 3-4 3" />
        </svg>
      )
    },
    { 
      time: "09:00", 
      title: "Wedding Ceremony", 
      desc: "Engagement & Vows",
      icon: (
        // Diamond Ring Icon
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7l3-4 3 4H9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7l3 3 3-3" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10a6 6 0 100 12 6 6 0 000-12z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v7" />
        </svg>
      )
    },
    { 
      time: "11:00", 
      title: "Wedding Reception", 
      desc: "Celebration & Banquet",
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" /></svg>
      )
    }
  ];

  const addToCalendarUrl = () => {
    const title = encodeURIComponent("Wedding of Natthamonpisit & Sorot");
    const dates = "20260321T020000Z/20260321T070000Z";
    const details = encodeURIComponent("Join us in celebrating our special day! Ceremony starts at 09:00 AM.");
    const location = encodeURIComponent("Dalva le ville, Bangkok");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}&sf=true&output=xml`;
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-old-rose">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-60 pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}></div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10 space-y-24">
        
        {/* =========================================
            SECTION 1: THE SCHEDULE (Centered)
           ========================================= */}
        <div>
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-serif text-5xl md:text-7xl text-cream drop-shadow-sm text-gold-shine">The Schedule</h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-8 md:w-12 bg-cream/30"></div>
              <p className="font-sans text-cream/70 uppercase tracking-[0.25em] text-xs md:text-sm font-bold">Saturday, March 21st</p>
              <div className="h-px w-8 md:w-12 bg-cream/30"></div>
            </div>
            
            <a 
              href={addToCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 border border-cream/30 rounded-full text-cream hover:bg-cream hover:text-old-rose transition-all duration-300 text-xs font-sans uppercase tracking-widest font-bold mt-4"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Add to Calendar
            </a>
          </div>

          <div className="max-w-xl mx-auto relative">
             {/* Vertical Timeline Line */}
             <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-px bg-cream/30 md:-ml-px"></div>

             <div className="space-y-12">
               {events.map((event, idx) => (
                 <div key={idx} className={`relative flex items-center gap-8 md:gap-0 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                   
                    {/* Time & Title (Side A) */}
                    <div className="hidden md:block w-1/2 px-8 text-right">
                       {idx % 2 === 0 ? (
                         <>
                           <span className="font-serif text-5xl text-cream leading-none block mb-1">{event.time}</span>
                           <h3 className="font-sans font-bold text-xs text-cream/80 uppercase tracking-widest">{event.title}</h3>
                         </>
                       ) : (
                         <p className="font-serif text-cream/80 italic text-xl">{event.desc}</p>
                       )}
                    </div>

                    {/* Icon (Center) */}
                    <div className="relative z-10 flex-shrink-0 w-16 flex justify-center">
                       <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-cream/50 bg-old-rose flex items-center justify-center text-cream shadow-sm relative z-20">
                          {event.icon}
                       </div>
                    </div>

                    {/* Desc (Side B) */}
                    <div className={`flex-1 md:w-1/2 md:px-8 text-left md:text-left`}>
                       <div className="md:hidden">
                          <span className="font-serif text-4xl text-cream leading-none block mb-1">{event.time}</span>
                          <h3 className="font-sans font-bold text-xs text-cream/80 uppercase tracking-widest mb-1">{event.title}</h3>
                       </div>
                       
                       {idx % 2 === 0 ? (
                         <p className="font-serif text-cream/80 italic text-lg md:text-xl">{event.desc}</p>
                       ) : (
                         <div className="hidden md:block">
                            <span className="font-serif text-5xl text-cream leading-none block mb-1">{event.time}</span>
                            <h3 className="font-sans font-bold text-xs text-cream/80 uppercase tracking-widest">{event.title}</h3>
                         </div>
                       )}
                    </div>

                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* =========================================
            SECTION 2: LOCATION & VENUE (New)
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

              {/* Right: Venue Gallery (3 Images) */}
              <div className="space-y-6">
                 {/* Grid: Stack on Mobile (1 col), Row on Desktop (3 cols) */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                    {loadingVenue ? (
                       // Skeleton Loaders
                       Array.from({length: 3}).map((_, i) => (
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
