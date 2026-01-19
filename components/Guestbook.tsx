import React, { useState, useRef } from 'react';
import { submitGuestbook } from '../services/api';
import { FadeInUp } from './FadeInUp';

export const Guestbook: React.FC = () => {
  const [isWriting, setIsWriting] = useState(false);

  return (
    // DESIGN UPDATE: 'Stationery Card' Style
    // Max Width consistent with others (max-w-3xl)
    <section className="max-w-3xl mx-auto px-4">
      <FadeInUp>
        {/* Mobile Tuning: Changed p-8 to p-6 */}
        <div className="bg-white border border-gold/40 shadow-2xl rounded-sm p-6 md:p-16 relative overflow-hidden transition-all duration-500">
          
          {/* Header moved INSIDE the card */}
          <div className="text-center mb-10 md:mb-12 relative z-10">
             <h2 className="font-sans text-4xl md:text-5xl text-gold-shine mb-3 uppercase tracking-wider font-bold">Guestbook</h2>
             <p className="font-sans text-gray-500 text-xs md:text-base uppercase tracking-widest font-medium">
               Share your memories & blessings
             </p>
          </div>

          {!isWriting ? (
            // CLEAN STATE: Selection Buttons
            <div className="animate-fade-in max-w-xl mx-auto">
                 <div className="flex flex-col gap-6 items-center">
                    
                    {/* Option 1: View Live Wall */}
                    <button 
                      onClick={() => window.open('/#live', '_blank')}
                      className="group relative w-full flex items-center gap-6 px-6 py-5 bg-[#FAF9F6] border border-gold/20 rounded-sm hover:border-gold hover:bg-white hover:shadow-lg transition-all duration-300"
                    >
                       <div className="w-12 h-12 rounded-full bg-white border border-gold/20 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-colors shrink-0">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                       </div>
                       <div className="text-left flex-1">
                          <span className="block font-sans text-lg md:text-xl text-charcoal group-hover:text-gold transition-colors font-bold uppercase tracking-wide">View Live Wall</span>
                          <span className="block font-sans text-[10px] text-gray-400 uppercase tracking-wider mt-1">See all wishes on projector mode</span>
                       </div>
                       <svg className="w-5 h-5 text-gray-300 group-hover:text-gold transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </button>

                    <div className="flex items-center gap-4 w-full px-8 opacity-40">
                       <div className="h-px bg-gold/50 flex-1"></div>
                       <span className="font-serif italic text-gold text-lg">or</span>
                       <div className="h-px bg-gold/50 flex-1"></div>
                    </div>

                    {/* Option 2: Write a Wish - 'Cream Beige' Style */}
                    <button 
                      onClick={() => setIsWriting(true)}
                      className="group relative w-full flex items-center gap-6 px-6 py-5 bg-[#E6DABF] text-charcoal rounded-sm shadow-md hover:bg-gold hover:text-white transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                       <div className="w-12 h-12 rounded-full bg-white/40 text-charcoal flex items-center justify-center group-hover:bg-white/20 group-hover:text-white transition-colors shrink-0">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                       </div>
                       <div className="text-left flex-1">
                          <span className="block font-sans text-lg md:text-xl font-bold uppercase tracking-wide">Leave a Wish</span>
                          <span className="block font-sans text-[10px] opacity-70 uppercase tracking-wider mt-1">Sign the guestbook</span>
                       </div>
                    </button>

                 </div>
            </div>
          ) : (
            // FORM STATE
            <div className="animate-fade-in relative max-w-xl mx-auto">
              <button 
                onClick={() => setIsWriting(false)}
                className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors mb-6 text-xs font-sans font-bold uppercase tracking-widest"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                <span>Back</span>
              </button>
              
              <GuestbookForm onSuccess={() => {
                 setTimeout(() => setIsWriting(false), 2500);
              }} />
            </div>
          )}
        </div>
      </FadeInUp>
    </section>
  );
};

const GuestbookForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_WIDTH = 1024;
        const MAX_HEIGHT = 1024;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('processing');
    setErrorMessage('');

    let base64Image: string | null = null;
    
    try {
      if (file) {
        base64Image = await resizeImage(file);
      }

      setStatus('submitting');
      const result = await submitGuestbook({
        name,
        message,
        image: base64Image
      });

      if (result.success) {
        setStatus('success');
        onSuccess();
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Unknown error occurred');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(String(err));
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-[#FAF9F6] p-8 rounded-sm text-center animate-fade-in border border-green-100">
        <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="font-sans text-3xl text-charcoal mb-2 font-bold uppercase tracking-wide">Thank You!</h3>
        <p className="text-gray-500 font-sans text-sm uppercase tracking-wide">Your wish has been posted</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gold/80 mb-2">Your Name</label>
          <input 
            type="text" 
            required
            className="w-full bg-transparent text-charcoal border-b border-gray-300 py-3 px-1 focus:border-gold focus:outline-none font-serif text-xl font-medium transition-colors placeholder-gray-200 rounded-none"
            placeholder="e.g. Auntie May"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gold/80 mb-2">Message</label>
          <textarea 
            required
            className="w-full bg-gray-50/50 text-charcoal border border-gray-200 rounded-sm p-4 focus:border-gold focus:outline-none font-serif text-lg font-medium transition-colors placeholder-gray-300 resize-none"
            rows={4}
            placeholder="Write your wishes here..."
            value={message}
            onChange={e => setMessage(e.target.value)}
          ></textarea>
        </div>
        
        <div>
          <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gold/80 mb-2">Photo (Optional)</label>
          
          {!previewUrl ? (
            <div 
              className="border border-dashed border-gray-300 bg-[#FAF9F6] rounded-sm p-6 text-center cursor-pointer hover:border-gold hover:bg-white transition-all group"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-8 h-8 mx-auto mb-2 text-gray-300 group-hover:text-gold transition-colors">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <p className="text-gray-400 text-xs font-sans font-bold uppercase tracking-wide group-hover:text-gold">Add a selfie or memory</p>
            </div>
          ) : (
            <div className="relative rounded-sm overflow-hidden border border-gray-200 group">
              <img src={previewUrl} alt="Preview" className="w-full h-56 object-cover" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-white text-charcoal rounded-full p-1.5 shadow-md hover:bg-red-50 hover:text-red-500 transition-colors"
                title="Remove image"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          )}
          
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <button 
          type="submit" 
          disabled={status === 'processing' || status === 'submitting'}
          className="w-full bg-[#E6DABF] text-charcoal py-4 px-6 font-sans text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md mt-4 flex items-center justify-center gap-2 rounded-sm border border-transparent hover:border-gold/20"
        >
          {status === 'processing' || status === 'submitting' ? (
            <>
              <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {status === 'processing' ? 'Processing Image...' : 'Signing...'}
            </>
          ) : (
            'Sign Guestbook'
          )}
        </button>

        {status === 'error' && (
          <div className="bg-red-50 text-red-600 p-4 rounded-sm text-sm border border-red-100 text-center">
            <p className="font-bold">Error: {errorMessage}</p>
            <p className="text-xs mt-1">Please try again.</p>
          </div>
        )}
      </form>
    </div>
  );
};