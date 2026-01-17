import React from 'react';

export const Details: React.FC = () => {
  const events = [
    { 
      time: "07:00", 
      title: "Buddhist Alms Giving", 
      desc: "Morning Blessing",
      icon: (
        // Lotus Icon for Buddhism
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

  // Google Calendar Link Generator
  const addToCalendarUrl = () => {
    const title = encodeURIComponent("Wedding of Natthamonpisit & Sorot");
    const dates = "20260321T020000Z/20260321T070000Z"; // UTC Time (09:00 - 14:00 BKK is +7)
    const details = encodeURIComponent("Join us in celebrating our special day! Ceremony starts at 09:00 AM.");
    const location = encodeURIComponent("Dalva le ville, Bangkok");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}&sf=true&output=xml`;
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-old-rose">
      {/* 1. Enhanced Paper Texture Background */}
      <div className="absolute inset-0 opacity-60 pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24 space-y-4">
          <h2 className="font-serif text-5xl md:text-7xl text-cream drop-shadow-sm text-gold-shine">The Schedule</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-8 md:w-12 bg-cream/30"></div>
            <p className="font-sans text-cream/70 uppercase tracking-[0.25em] text-xs md:text-sm font-bold">Saturday, March 21st</p>
            <div className="h-px w-8 md:w-12 bg-cream/30"></div>
          </div>
          
          {/* Add to Calendar Button */}
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

        {/* Main Content Grid 
            Changed grid-cols-2 (tablet) to grid-cols-1, only splitting on lg (desktop)
            This prevents squishing on iPads 
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 relative">
          
          {/* Center Divider Line (Only visible on Large Desktop) 
              Updated color to charcoal/20 for better visibility against Old Rose background
          */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -ml-px bg-gradient-to-b from-transparent via-charcoal/20 to-transparent z-10"></div>

          {/* Left Column: Schedule Timeline */}
          {/* Reduced lg:pr-12 to lg:pr-5 to move content closer to the center line */}
          <div className="relative flex flex-col justify-center lg:items-end lg:pr-5 pl-6 lg:pl-0">
            {/* Local Timeline Line (Mobile & Tablet) - Hidden on Desktop */}
            <div className="absolute left-[1.65rem] md:left-[2.15rem] top-4 bottom-4 w-px bg-gold/30 lg:hidden"></div> 
            
            {/* Content Wrapper */}
            <div className="space-y-12 md:space-y-16 w-full lg:max-w-[420px]">
              {events.map((event, idx) => (
                <div key={idx} className="relative flex items-start gap-6 md:gap-8 group">
                  
                  {/* Timeline Icon */}
                  <div className="relative z-10">
                     {/* Connector Line for Desktop Mode (Right side aligned) */}
                     {idx !== events.length - 1 && (
                       <div className="absolute left-1/2 top-10 bottom-[-4rem] w-px bg-cream/30 -ml-px hidden lg:block"></div>
                     )}
                     
                     <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-cream/50 bg-old-rose flex items-center justify-center text-cream shadow-sm group-hover:bg-cream group-hover:text-old-rose transition-colors duration-500 relative z-20">
                        {event.icon}
                     </div>
                  </div>

                  {/* Content - Updated to Cream/White text for better visibility */}
                  <div className="pt-1 text-left flex-1">
                    <span className="font-serif text-4xl md:text-5xl text-cream leading-none block mb-2">{event.time}</span>
                    <h3 className="font-sans font-bold text-xs md:text-sm text-cream/90 uppercase tracking-widest mb-1">{event.title}</h3>
                    <p className="font-serif text-cream/80 italic text-lg md:text-xl">{event.desc}</p>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Right Column: The Arch Map */}
          <div className="flex items-center justify-center lg:pl-12 pt-8 lg:pt-0">
            {/* 3. Double Arch Frame Design with Responsive Width 
                Reduced max-w to 300px (was 360px)
            */}
            <div className="relative drop-shadow-2xl w-full max-w-[300px]">
               
               {/* Outer Black Arch - Responsive Width */}
               <div className="w-full aspect-[360/520] bg-charcoal rounded-t-[160px] md:rounded-t-[180px] rounded-b-xl p-3 md:p-4 flex flex-col relative shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                  
                  {/* Inner White Arch */}
                  <div className="flex-1 bg-white rounded-t-[140px] md:rounded-t-[160px] rounded-b-lg p-2 overflow-hidden relative">
                      
                      {/* The Map */}
                      <div className="w-full h-full rounded-t-[130px] md:rounded-t-[150px] rounded-b-md overflow-hidden bg-gray-100 relative isolate">
                        <iframe 
                          className="w-full h-full filter grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                          src="https://maps.google.com/maps?q=Dalva+le+ville+Bangkok&t=&z=15&ie=UTF8&iwloc=&output=embed"
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Wedding Location Map"
                        ></iframe>

                        {/* Button Overlay */}
                        <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10 pointer-events-none">
                            <a 
                              href="https://www.google.com/maps/search/?api=1&query=Dalva+le+ville+Bangkok" 
                              target="_blank" 
                              rel="noreferrer"
                              className="pointer-events-auto bg-charcoal/90 text-white px-5 py-2 md:px-6 md:py-3 rounded-full font-sans text-[10px] font-bold uppercase tracking-widest shadow-lg border border-white/20 hover:bg-gold transition-colors flex items-center gap-2 group"
                            >
                              <span>View Map</span>
                              <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            </a>
                        </div>
                      </div>

                  </div>

               </div>
               
               {/* Location Text Below - Updated to match new theme */}
               <div className="text-center mt-8 md:mt-10">
                  <h3 className="font-serif text-3xl md:text-4xl text-[#F9E4B7] drop-shadow-md font-medium">Dalva le ville</h3>
                  <p className="font-sans text-xl md:text-2xl font-bold uppercase tracking-widest text-[#F9E4B7] drop-shadow-md mt-2">Bangkok, Thailand</p>
               </div>

            </div>
          </div>

        </div>

        {/* DRESS CODE SECTION */}
        {/* Changed background from charcoal to white/95 to resolve "dark black area" complaint on mobile */}
        <div className="mt-20 md:mt-24 py-12 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl text-center relative mx-4 md:mx-0 border border-white/40">
          <h3 className="font-serif text-4xl md:text-5xl text-gold-shine mb-4">Dress Code</h3>
          {/* Changed text color to charcoal since background is now light */}
          <p className="font-sans text-sm md:text-base text-charcoal/70 uppercase tracking-[0.2em] mb-8 font-medium">
            Rose Gold • Sage Green • Earth Tones • Light Gold • Blush Pink
          </p>
          
          <div className="flex justify-center items-start gap-4 md:gap-8 flex-wrap px-2">
             {[
               { color: '#C5908E', name: 'Rose Gold' }, 
               { color: '#CFC1B3', name: 'Warm Taupe' }, 
               { color: '#9EA996', name: 'Sage Green' }, 
               { color: '#E6DABF', name: 'Cream Beige' }, 
               { color: '#DBC895', name: 'Light Gold' },
               { color: '#E8D3C6', name: 'Blush Pink' },
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