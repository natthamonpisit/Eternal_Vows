import React, { useState } from 'react';
import { submitRsvp } from '../services/api';
import { FadeInUp } from './FadeInUp';

export const RsvpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    attendees: 1,
    attending: 'yes' as 'yes' | 'no',
    note: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    const result = await submitRsvp(formData);
    
    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <FadeInUp>
        <div className="max-w-2xl mx-auto text-center py-24 px-8 bg-white shadow-2xl rounded-sm border border-gold/40 animate-fade-in mx-4">
          <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-6">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h3 className="font-sans text-3xl md:text-5xl text-gold-shine mb-4 font-bold uppercase tracking-wider">Thank You!</h3>
          <p className="font-sans text-lg text-charcoal">Your response has been recorded.</p>
          <p className="font-sans text-sm text-gray-400 mt-2 uppercase tracking-widest">We can't wait to see you</p>
        </div>
      </FadeInUp>
    );
  }

  return (
    // DESIGN UPDATE: 'Stationery Card' Style
    // Wider (max-w-3xl), White BG, Thin Gold Border, Soft Shadow
    <section className="max-w-3xl mx-auto px-4">
      <FadeInUp>
        {/* Mobile Tuning: Changed p-8 to p-6 for better spacing on small screens */}
        <div className="bg-white p-6 md:p-16 shadow-2xl rounded-sm border border-gold/40 relative overflow-hidden">
          
          {/* Header moved inside */}
          <div className="text-center mb-10 md:mb-12">
            {/* DESIGN RULE UPDATE: Mobile text-3xl, Desktop text-5xl */}
            <h2 className="font-sans text-3xl md:text-5xl text-gold-shine font-bold tracking-wider uppercase mb-3">R.S.V.P</h2>
            {/* DESIGN FIX: Shortened text + Uppercase as per new request */}
            <p className="font-sans text-gray-500 text-xs md:text-base uppercase tracking-[0.2em] font-medium">PLEASE RESPOND BY FEB 21ST</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10 max-w-xl mx-auto">
            <div className="relative group">
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gold/80 mb-2">Guest Name</label>
              <input 
                type="text" 
                required
                // DESIGN FIX: Changed to font-sans uppercase to match stationery style
                className="w-full border-b border-gray-300 bg-transparent py-3 px-1 text-sm md:text-base font-sans font-bold uppercase tracking-wider text-charcoal focus:border-gold focus:outline-none transition-all rounded-none placeholder-gray-300"
                placeholder="MR. & MRS. JOHN DOE"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-8 pt-4">
              <div className="flex-1">
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gold/80 mb-3">Attending?</label>
                <div className="flex flex-col gap-4">
                  <label className="flex items-center cursor-pointer group">
                    <div className={`w-6 h-6 rounded-full border border-gold flex items-center justify-center transition-all ${formData.attending === 'yes' ? 'bg-gold' : 'bg-white'}`}>
                       {formData.attending === 'yes' && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                    </div>
                    <input 
                      type="radio" 
                      name="attending"
                      checked={formData.attending === 'yes'}
                      onChange={() => setFormData({...formData, attending: 'yes'})}
                      className="hidden"
                    />
                    {/* DESIGN FIX: Matching Font size (text-sm md:text-base) and tracking (wider) */}
                    <span className={`ml-3 font-sans text-sm md:text-base font-bold uppercase tracking-wider transition-colors ${formData.attending === 'yes' ? 'text-charcoal' : 'text-gray-400'}`}>JOYFULLY ACCEPT</span>
                  </label>
                  
                  <label className="flex items-center cursor-pointer group">
                    <div className={`w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center transition-all ${formData.attending === 'no' ? 'bg-charcoal border-charcoal' : 'bg-white'}`}>
                       {formData.attending === 'no' && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                    </div>
                    <input 
                      type="radio" 
                      name="attending" 
                      checked={formData.attending === 'no'}
                      onChange={() => setFormData({...formData, attending: 'no'})}
                      className="hidden"
                    />
                    {/* DESIGN FIX: Matching Font size (text-sm md:text-base) and tracking (wider) */}
                    <span className={`ml-3 font-sans text-sm md:text-base font-bold uppercase tracking-wider transition-colors ${formData.attending === 'no' ? 'text-charcoal' : 'text-gray-400'}`}>REGRETFULLY DECLINE</span>
                  </label>
                </div>
              </div>

              {formData.attending === 'yes' && (
                <div className="flex-1 animate-fade-in">
                  <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gold/80 mb-3">Number of Guests</label>
                  <select 
                    // DESIGN FIX: Matches Guest Name input style perfectly (tracking-wider)
                    className="w-full border-b border-gray-300 bg-transparent py-3 px-1 text-sm md:text-base font-sans font-bold uppercase tracking-wider text-charcoal focus:border-gold focus:outline-none rounded-none cursor-pointer"
                    value={formData.attendees}
                    onChange={e => setFormData({...formData, attendees: parseInt(e.target.value)})}
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'GUEST' : 'GUESTS'}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="pt-4">
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gold/80 mb-2">Note</label>
              <textarea 
                rows={2}
                // DESIGN FIX: Changed font weight to bold, updated placeholder to remove food reference
                className="w-full border border-gray-200 bg-gray-50/30 p-4 rounded-sm font-sans text-sm font-bold uppercase tracking-wide focus:border-gold focus:outline-none transition-colors placeholder-gray-300 resize-none text-charcoal"
                placeholder="SONG REQUESTS & WELL WISHES"
                value={formData.note}
                onChange={e => setFormData({...formData, note: e.target.value})}
              ></textarea>
            </div>

            {/* 
               THEME UPDATE: SWAPPED COLORS & ROUNDED-FULL
               Default: bg-gold text-white (Strong Call to Action)
               Hover: bg-[#E6DABF] text-charcoal (Soft Paper feel)
               Shape: rounded-full (Pill shape)
            */}
            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full bg-gold text-white font-sans font-bold uppercase tracking-widest py-4 px-6 hover:bg-[#E6DABF] hover:text-charcoal transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6 shadow-md rounded-full border border-transparent hover:border-gold/20 hover:shadow-lg"
            >
              {status === 'submitting' ? 'Sending Response...' : 'Confirm R.S.V.P'}
            </button>
            
            {status === 'error' && (
              <p className="text-red-500 text-center text-sm mt-2">Something went wrong. Please try again.</p>
            )}
          </form>
        </div>
      </FadeInUp>
    </section>
  );
};