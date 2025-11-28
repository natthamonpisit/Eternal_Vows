import React from 'react';

export const Details: React.FC = () => {
  const events = [
    { 
      time: "07:00", 
      title: "Buddhist Alms Giving", 
      desc: "Morning Blessing",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
      )
    },
    { 
      time: "09:00", 
      title: "Wedding Ceremony", 
      desc: "Engagement & Vows",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      )
    },
    { 
      time: "11:00", 
      title: "Wedding Reception", 
      desc: "Celebration & Banquet",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" /></svg>
      )
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-[#E8D0D0]">
      {/* 1. Enhanced Paper Texture Background (Increased opacity and added mix-blend-overlay) */}
      <div className="absolute inset-0 opacity-60 pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24 space-y-4">
          <h2 className="font-serif text-6xl md:text-7xl text-charcoal drop-shadow-sm text-gold-shine">The Schedule</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-charcoal/30"></div>
            <p className="font-sans text-charcoal/70 uppercase tracking-[0.25em] text-sm font-bold">Saturday, March 21st</p>
            <div className="h-px w-12 bg-charcoal/30"></div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 relative">
          
          {/* Center Divider Line (Global Separator) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -ml-px bg-gradient-to-b from-transparent via-gold/40 to-transparent z-10"></div>

          {/* Left Column: Schedule Timeline 
              No right padding to keep content flush with center divider
          */}
          <div className="relative flex flex-col justify-center md:items-end md:pr-0 pb-20 md:pb-0 pl-4 md:pl-0">
            {/* Local Timeline Line (Mobile only) */}
            <div className="absolute left-[1.65rem] top-4 bottom-4 w-px bg-gold/30 md:hidden"></div> 
            
            {/* Content Wrapper */}
            <div className="space-y-16 w-full md:max-w-[420px]">
              {events.map((event, idx) => (
                <div key={idx} className="relative flex items-start gap-8 group">
                  
                  {/* Timeline Icon (Left Side of text) */}
                  <div className="relative z-10">
                     {/* Connector Line for Desktop */}
                     {idx !== events.length - 1 && (
                       <div className="absolute left-1/2 top-10 bottom-[-4rem] w-px bg-gold/30 -ml-px hidden md:block"></div>
                     )}
                     
                     <div className="w-12 h-12 rounded-full border border-gold bg-[#E8D0D0] flex items-center justify-center text-gold shadow-sm group-hover:bg-gold group-hover:text-white transition-colors duration-500 relative z-20">
                        {event.icon}
                     </div>
                  </div>

                  {/* Content (Right Side of icon) */}
                  <div className="pt-1 text-left flex-1">
                    <span className="font-serif text-5xl text-charcoal leading-none block mb-2">{event.time}</span>
                    <h3 className="font-sans font-bold text-sm text-charcoal/80 uppercase tracking-widest mb-1">{event.title}</h3>
                    <p className="font-serif text-charcoal/60 italic text-xl">{event.desc}</p>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Right Column: The Arch Map */}
          <div className="flex items-center justify-center md:pt-0 pl-0 md:pl-10">
            {/* 3. Double Arch Frame Design with Perfect Semi-Circle */}
            <div className="relative drop-shadow-2xl">
               
               {/* Outer Black Arch (Door Frame) 
                   Calculated Radius: Width 360px -> Radius 180px for perfect semi-circle 
               */}
               <div className="w-[320px] md:w-[360px] h-[520px] bg-charcoal rounded-t-[160px] md:rounded-t-[180px] rounded-b-xl p-4 flex flex-col relative shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                  
                  {/* Inner White Arch (Frame) */}
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
                              className="pointer-events-auto bg-charcoal/90 text-white px-6 py-3 rounded-full font-sans text-[10px] font-bold uppercase tracking-widest shadow-lg border border-white/20 hover:bg-gold transition-colors flex items-center gap-2 group"
                            >
                              <span>View Map</span>
                              <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            </a>
                        </div>
                      </div>

                  </div>

               </div>
               
               {/* Location Text Below */}
               <div className="text-center mt-10">
                  <h3 className="font-serif text-4xl text-charcoal">Dalva le ville</h3>
                  <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold mt-2">Bangkok, Thailand</p>
               </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};