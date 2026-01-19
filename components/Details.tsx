
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

  // Updated Schedule Data with Culturally Accurate Icons
  const events = [
    { 
      time: "07:09", 
      title: "Buddhist Ceremony", 
      desc: "Monk Blessing & Merit Making",
      icon: (
        // Icon: Alms Bowl (บาตรพระ) on Stand
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           {/* Bowl Body */}
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M5 10c0 4.4 3.6 8 8 8s8-3.6 8-8" />
           {/* Rim */}
           <ellipse cx="13" cy="10" rx="8" ry="2.5" strokeWidth={1.2} />
           {/* Lid Handle */}
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M11 7.5V5h4v2.5" />
           {/* Stand (Kha Bat) */}
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M10 18l-2 3h10l-2-3" />
        </svg>
      )
    },
    { 
      time: "08:29", 
      title: "Engagement Ceremony", 
      desc: "Ring Exchange",
      icon: (
        // Icon: Solitaire Ring (แหวนเพชร)
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {/* Ring Band */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 21c-4.4 0-8-3.6-8-8 0-4.4 3.6-8 8-8s8 3.6 8 8c0 4.4-3.6 8-8 8z" />
          {/* Diamond Setting */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 5l-3-2h6l-3 2z" />
          {/* Diamond Top */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 5l2.5-3.5h-5L12 5z" />
          {/* Sparkle */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M18 3l2-1M6 3L4 2" /> 
        </svg>
      )
    },
    { 
      time: "09:09", 
      title: "Phiti Rub Wai", 
      desc: "Paying Respects to Elders",
      icon: (
        // Icon: Pedestal Tray (พานแว่นฟ้า) with Gift
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {/* Gift Box */}
          <rect x="7" y="2" width="10" height="6" rx="1" strokeWidth={1.2} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 2v6" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M7 5h10" />
          
          {/* Tray Top */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 10h16c0 3-3.6 5-8 5s-8-2-8-5z" />
          
          {/* Pedestal Base */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 15v3" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M8 21h8l-1-3h-6l-1 3z" />
        </svg>
      )
    },
    { 
      time: "09:49", 
      title: "Water Pouring", 
      desc: "Rod Nam Sangha Ceremony",
      icon: (
        // Icon: Thai Conch Shell (หอยสังข์) - Redrawn to look less like a chicken
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {/* Main Shell Body (Spiral) */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M17.5 7c2 1.5 2.5 4 1.5 6s-4 3-7 1" />
          {/* Long Spout (Tapered) */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 14 C 9 16 6 15 4 13" />
          {/* Connecting Top Curve */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 13 C 6 11 10 6 17.5 7" />
          
          {/* Spiral Detail (Inside) */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M16 9c-1 0-2 .5-2 2" />
          
          {/* Water Flowing */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 13 q -1 3 -0.5 6" strokeDasharray="2 2" />
          <circle cx="3.5" cy="20" r="0.5" fill="currentColor" />
        </svg>
      )
    },
    { 
      time: "11:09", 
      title: "Wedding Celebration", 
      desc: "Lunch Banquet & Party",
      icon: (
        // Icon: Wedding Cake
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           {/* Top Tier */}
           <rect x="10" y="6" width="4" height="3" rx="0.5" strokeWidth={1.2} />
           {/* Middle Tier */}
           <rect x="8" y="9" width="8" height="4" rx="0.5" strokeWidth={1.2} />
           {/* Bottom Tier */}
           <rect x="6" y="13" width="12" height="5" rx="0.5" strokeWidth={1.2} />
           {/* Stand */}
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M5 18h14" />
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 18v3m-3 0h6" />
           
           {/* Topper / Candles */}
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M11 6V4m2 2V4" />
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
          TOP SEAMLESS WAVE 
          - Transition from Previous Section (Cream) to Old Rose
      */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform -translate-y-[99%] z-10">
        <svg className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#C08E86"></path>
        </svg>
      </div>

      <div className="bg-old-rose py-24 relative overflow-hidden">
        {/* Background Texture for Details Section */}
        <div className="absolute inset-0 opacity-60 pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}></div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10 space-y-24">
          
          {/* =========================================
              SECTION 1: THE SCHEDULE
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
               <div className="absolute left-[24px] md:left-[320px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#F3E5AB]/30 to-transparent"></div>

               <div className="space-y-12">
                 {events.map((event, idx) => (
                   <div key={idx} className="relative flex items-center group">
                      <div className="hidden md:flex w-[280px] items-center justify-end pr-10 gap-6">
                         <div className="w-10 h-10 text-[#F3E5AB]/80 group-hover:text-white transition-colors duration-500">
                            {event.icon}
                         </div>
                         <span className="font-serif text-3xl text-[#F3E5AB] font-medium tracking-wider drop-shadow-sm min-w-[80px] text-right">
                            {event.time}
                         </span>
                      </div>

                      <div className="md:hidden absolute left-[56px] -top-6 flex items-center gap-2">
                          <span className="font-serif text-xl text-[#F3E5AB] font-bold">{event.time}</span>
                      </div>

                      <div className="flex-1 pl-16 md:pl-24 pt-1">
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

                <div className="space-y-6">
                   <div className="grid grid-cols-2 gap-4">
                      {loadingVenue ? (
                         Array.from({length: 4}).map((_, i) => (
                           <div key={i} className="aspect-[4/3] bg-white/10 rounded-sm animate-pulse"></div>
                         ))
                      ) : (
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
      </div>

      {/* 
          BOTTOM SEAMLESS WAVE 
          - Transition from Old Rose to Next Section (Cream)
      */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[99%] z-10">
        <svg className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px] transform rotate-180" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#C08E86"></path>
        </svg>
      </div>

    </section>
  );
};
