import React, { useState, useRef } from 'react';
import { submitGuestbook } from '../services/api';
import { FadeInUp } from './FadeInUp';

export const Guestbook: React.FC = () => {
  const [isWriting, setIsWriting] = useState(false);

  return (
    <section className="max-w-4xl mx-auto px-4 text-center">
      <FadeInUp>
        <div className="mb-10 relative">
          {/* Matches Gift with Love style: text-4xl md:text-5xl, text-gold-shine, uppercase, tracking-wider, font-bold */}
          <h2 className="font-sans text-4xl md:text-5xl text-gold-shine mb-4 uppercase tracking-wider font-bold">Guestbook</h2>
          {/* Design System Update: text-sm md:text-base, font-medium (Thin) */}
          <p className="font-sans text-gold text-sm md:text-base uppercase tracking-widest font-medium">
            Share your memories & blessings
          </p>
        </div>
      </FadeInUp>

      {!isWriting ? (
        // CLEAN STATE: Selection Buttons
        <FadeInUp delay="100ms">
          <div className="bg-[#FAF9F6] p-8 md:p-12 rounded-xl border border-gold/20 shadow-lg max-w-2xl mx-auto">
             <div className="flex flex-col gap-6 items-center">
                
                {/* Option 1: View Live Wall */}
                <button 
                  onClick={() => window.open('/#live', '_blank')}
                  className="group relative w-full max-w-sm flex items-center justify-center gap-4 px-6 py-4 bg-white border border-gold/30 rounded-lg hover:border-gold hover:shadow-md transition-all duration-300"
                >
                   <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                   </div>
                   <div className="text-left flex-1">
                      <span className="block font-sans text-lg md:text-xl text-charcoal group-hover:text-gold transition-colors font-bold uppercase tracking-wide">View Live Wall</span>
                      <span className="block font-sans text-[10px] text-gray-400 uppercase tracking-wider">See all wishes on projector mode</span>
                   </div>
                   <svg className="w-5 h-5 text-gray-300 group-hover:text-gold transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </button>

                <div className="flex items-center gap-4 w-full max-w-xs opacity-50">
                   <div className="h-px bg-charcoal/20 flex-1"></div>
                   <span className="font-sans italic text-charcoal/60 text-sm">or</span>
                   <div className="h-px bg-charcoal/20 flex-1"></div>
                </div>

                {/* Option 2: Write a Wish (Primary Action) */}
                <button 
                  onClick={() => setIsWriting(true)}
                  className="group relative w-full max-w-sm flex items-center justify-center gap-4 px-6 py-5 bg-charcoal text-white rounded-lg shadow-lg hover:bg-gold transition-all duration-300 transform hover:-translate-y-1"
                >
                   <div className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center group-hover:bg-white group-hover:text-gold transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                   </div>
                   <div className="text-left flex-1">
                      <span className="block font-sans text-lg md:text-xl font-bold uppercase tracking-wide">Leave a Wish</span>
                      <span className="block font-sans text-[10px] text-white/60 uppercase tracking-wider group-hover:text-white/80">Sign the guestbook</span>
                   </div>
                </button>

             </div>
          </div>
        </FadeInUp>
      ) : (
        // FORM STATE
        <div className="animate-fade-in relative">
          <button 
            onClick={() => setIsWriting(false)}
            className="absolute -top-12 left-0 md:-left-4 flex items-center gap-2 text-gray-400 hover:text-charcoal transition-colors px-2 py-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            <span className="text-sm font-sans uppercase tracking-widest">Back</span>
          </button>
          
          <GuestbookForm onSuccess={() => {
             setTimeout(() => setIsWriting(false), 2500);
          }} />
        </div>
      )}
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
      <div className="max-w-lg mx-auto bg-white p-12 shadow-xl rounded-lg text-center animate-fade-in border-t-4 border-gold">
        <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        {/* Matches Gift with Love style */}
        <h3 className="font-sans text-3xl text-charcoal mb-2 font-bold uppercase tracking-wide">Thank You!</h3>
        <p className="text-gray-500 font-sans text-sm uppercase tracking-wide">Your wish has been posted</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-8 shadow-2xl rounded-lg animate-fade-in relative border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Your Name</label>
          <input 
            type="text" 
            required
            className="w-full bg-white text-charcoal border-b-2 border-gray-200 py-2 px-3 focus:border-gold focus:outline-none font-sans text-lg font-medium transition-colors placeholder-gray-300 rounded-none"
            placeholder="e.g. Auntie May"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Message</label>
          <textarea 
            required
            className="w-full bg-white text-charcoal border-2 border-gray-100 rounded-md p-3 focus:border-gold focus:outline-none font-sans text-base font-medium transition-colors placeholder-gray-300"
            rows={4}
            placeholder="Write your wishes here... (Not for money transfer slips)"
            value={message}
            onChange={e => setMessage(e.target.value)}
          ></textarea>
        </div>
        
        <div>
          <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Photo (Optional)</label>
          
          {!previewUrl ? (
            <div 
              className="border-2 border-dashed border-gray-300 bg-gray-50 rounded-md p-6 text-center cursor-pointer hover:border-gold hover:bg-white transition-all group"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-8 h-8 mx-auto mb-2 text-gray-400 group-hover:text-gold transition-colors">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <p className="text-gray-500 text-sm font-sans font-medium group-hover:text-gold">Add a selfie or memory</p>
            </div>
          ) : (
            <div className="relative rounded-md overflow-hidden border border-gray-200 group">
              <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
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
          className="w-full bg-gold text-white py-4 px-6 font-sans font-bold uppercase tracking-widest hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg mt-4 flex items-center justify-center gap-2 rounded-md"
        >
          {status === 'processing' || status === 'submitting' ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
          <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm border border-red-100 text-center">
            <p className="font-bold">Error: {errorMessage}</p>
            <p className="text-xs mt-1">Please try again.</p>
          </div>
        )}
      </form>
    </div>
  );
};