import React, { useState } from 'react';
import { submitRsvp } from '../services/api';

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
      <div className="max-w-xl mx-auto text-center py-20 px-6 bg-white shadow-xl rounded-lg border-t-4 border-gold animate-fade-in">
        <h3 className="font-script text-5xl text-gold-shine mb-4">Thank You!</h3>
        <p className="font-serif text-xl text-charcoal">Your response has been recorded.</p>
        <p className="font-sans text-sm text-gray-500 mt-2 uppercase tracking-widest">We can't wait to see you</p>
      </div>
    );
  }

  return (
    <section className="max-w-xl mx-auto bg-white p-8 md:p-12 shadow-2xl rounded-sm">
      <div className="text-center mb-10">
        <h2 className="font-serif text-4xl text-charcoal">R.S.V.P</h2>
        <p className="font-sans text-xs text-gold uppercase tracking-[0.2em] mt-2">Please respond by February 21st</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Full Name</label>
          <input 
            type="text" 
            required
            className="w-full border-b-2 border-gray-200 bg-transparent py-2 px-1 text-lg font-serif focus:border-gold focus:outline-none transition-colors"
            placeholder="Mr. & Mrs. John Doe"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div className="flex gap-8">
          <div className="flex-1">
            <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Attending?</label>
            <div className="flex gap-4 mt-3">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  name="attending"
                  checked={formData.attending === 'yes'}
                  onChange={() => setFormData({...formData, attending: 'yes'})}
                  className="accent-gold w-5 h-5"
                />
                <span className="ml-2 font-serif">Joyfully Accept</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  name="attending" 
                  checked={formData.attending === 'no'}
                  onChange={() => setFormData({...formData, attending: 'no'})}
                  className="accent-gray-500 w-5 h-5"
                />
                <span className="ml-2 font-serif">Regretfully Decline</span>
              </label>
            </div>
          </div>
        </div>

        {formData.attending === 'yes' && (
          <div>
            <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Total Guests</label>
            <select 
              className="w-full border-b-2 border-gray-200 bg-transparent py-2 px-1 text-lg font-serif focus:border-gold focus:outline-none"
              value={formData.attendees}
              onChange={e => setFormData({...formData, attendees: parseInt(e.target.value)})}
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Dietary Requirements / Note</label>
          <textarea 
            rows={3}
            className="w-full border-2 border-gray-100 bg-gray-50/50 p-3 rounded-md font-serif focus:border-gold focus:outline-none transition-colors"
            value={formData.note}
            onChange={e => setFormData({...formData, note: e.target.value})}
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="w-full bg-gold text-white font-sans font-bold uppercase tracking-widest py-4 px-6 hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          {status === 'submitting' ? 'Sending...' : 'Confirm RSVP'}
        </button>
        
        {status === 'error' && (
          <p className="text-red-500 text-center text-sm mt-2">Something went wrong. Please try again.</p>
        )}
      </form>
    </section>
  );
};