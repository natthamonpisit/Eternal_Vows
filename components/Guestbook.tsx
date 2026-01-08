import React, { useState, useEffect, useRef } from 'react';
import { submitGuestbook, fetchWishes } from '../services/api';
import { GuestWishes } from '../types';

export const Guestbook: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'wall'>('wall');
  const [wishes, setWishes] = useState<GuestWishes[]>([]);
  const [currentWishIndex, setCurrentWishIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Initial fetch
    loadWishes();
    
    // Poll every 15 seconds for live updates (Reduced from 10s)
    const interval = setInterval(loadWishes, 15000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate wishes every 3 seconds
  useEffect(() => {
    if (activeTab === 'wall' && wishes.length > 1) {
      const interval = setInterval(() => {
        setCurrentWishIndex((prev) => (prev + 1) % wishes.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [activeTab, wishes.length]);

  const loadWishes = async () => {
    setIsRefreshing(true);
    const data = await fetchWishes();
    setWishes(data);
    setIsRefreshing(false);
  };

  const currentWish = wishes.length > 0 ? wishes[currentWishIndex % wishes.length] : null;

  return (
    <section className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12 relative">
        <h2 className="font-serif text-5xl text-charcoal mb-6">Guestbook</h2>
        
        {/* Navigation Tabs with Enhanced Visual Cue */}
        <div className="flex justify-center gap-4 sm:gap-8 font-sans text-sm tracking-widest uppercase bg-white/50 p-2 rounded-full inline-block backdrop-blur-sm border border-gold/10 shadow-sm relative">
          <button 
            onClick={() => setActiveTab('wall')}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === 'wall' 
                ? 'bg-gold text-white shadow-md' 
                : 'bg-transparent text-gray-500 hover:text-gold hover:bg-gold/5'
            }`}
          >
            Live Wall
          </button>
          <button 
            onClick={() => setActiveTab('form')}
            className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 group ${
              activeTab === 'form' 
                ? 'bg-charcoal text-white shadow-md' 
                : 'bg-transparent text-gold font-bold hover:bg-gold/10'
            }`}
          >
            <span>Leave a Wish</span>
            {/* Bouncing Pen Icon Effect */}
            <svg 
              className={`w-4 h-4 ${activeTab !== 'form' ? 'animate-bounce' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>

        {/* Action Buttons (Refresh & Presentation Mode) */}
        {activeTab === 'wall' && (
          <div className="absolute top-0 right-0 md:top-auto md:bottom-2 md:right-10 lg:right-20 flex items-center gap-3">
             {/* NEW: Explicit "Projector View" Button with Text */}
             <button
               onClick={() => window.open('?mode=live', '_blank')}
               className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-gold/40 rounded-full shadow-sm text-gold hover:bg-gold hover:text-white hover:shadow-md transition-all group"
               title="Open Presentation Mode in New Tab"
             >
               <span className="font-sans font-bold text-[10px] uppercase tracking-widest hidden sm:inline">Projector View</span>
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
               </svg>
             </button>

             {/* Refresh Button */}
             <button
               onClick={loadWishes}
               disabled={isRefreshing}
               className="p-2 text-gold/60 hover:text-gold transition-colors disabled:opacity-50"
               title="Refresh Messages"
             >
               <svg className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
               </svg>
             </button>
          </div>
        )}
        
        {/* Helper Text below tabs */}
        {activeTab === 'wall' && (
           <p className="font-serif text-charcoal/60 italic text-lg md:text-xl mt-6 animate-fade-in">
             {wishes.length > 1 ? "Wishes from our loved ones..." : "Tap the button above or the card below to sign"}
           </p>
        )}
      </div>

      {activeTab === 'wall' ? (
        <div className="min-h-[400px] flex justify-center pb-12">
          {wishes.length === 0 ? (
            // Empty State: Show CTA Card centered
            <div 
              onClick={() => setActiveTab('form')}
              className="w-full max-w-md bg-[#FAF9F6] p-6 rounded-lg border-2 border-dashed border-gold/40 flex flex-col items-center justify-center cursor-pointer group hover:bg-white hover:border-gold hover:shadow-lg transition-all min-h-[300px]"
            >
              <div className="w-14 h-14 rounded-full bg-gold/10 text-gold flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              </div>
              <h3 className="font-script text-2xl text-charcoal group-hover:text-gold transition-colors">Write your blessing</h3>
              <p className="font-sans text-[10px] uppercase tracking-widest text-gray-400 mt-2 group-hover:text-gold/70">Join the celebration</p>
            </div>
          ) : (
            // Carousel: Show Single Wish Card
            currentWish && (
              <div 
                key={`${currentWishIndex}-${currentWish.timestamp}`} 
                className="w-full max-w-md bg-white p-6 rounded-lg shadow-xl border border-gray-100 animate-fade-in transition-all duration-700 hover:shadow-2xl"
              >
                {currentWish.imageUrl && (
                  <div className="mb-6 rounded-md overflow-hidden aspect-square w-full bg-gray-50 border border-gray-100 relative shadow-inner">
                    <img 
                      src={currentWish.imageUrl} 
                      alt="Guest upload" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] hover:scale-110" 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="text-center px-2">
                  <div className="mb-4">
                     <svg className="w-8 h-8 text-gold/20 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9C9.04875 12.2882 11.2359 10.3204 12.8225 9.7042L12.0833 7.79979C9.25625 8.89708 7 12.1932 7 16V21H14.017ZM21 21L21 18C21 16.8954 20.1046 16 19 16H15.9829C16.0317 12.2882 18.2189 10.3204 19.8054 9.7042L19.0662 7.79979C16.2392 8.89708 13.9829 12.1932 13.9829 16V21H21Z" /></svg>
                     <p className="font-serif text-xl md:text-2xl text-charcoal italic leading-relaxed">"{currentWish.message}"</p>
                  </div>
                  <div className="flex flex-col items-center border-t border-gray-100 pt-4 mt-6">
                    <span className="font-sans font-bold text-sm uppercase text-gold tracking-widest">{currentWish.name}</span>
                    <span className="font-sans text-[10px] text-gray-400 mt-1">
                      {new Date(currentWish.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <GuestbookForm onSuccess={() => {
          // Delay switching back slightly so user sees success message
          setTimeout(() => {
            setActiveTab('wall');
            loadWishes();
          }, 2000);
        }} />
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
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Create preview
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

  // Helper function to resize image to max 1024px to prevent large payloads
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
        // Convert to base64 JPEG with 0.8 quality
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('processing');
    setErrorMessage('');
    setDebugLogs([]);

    let base64Image: string | null = null;
    
    try {
      if (file) {
        // Resize image before sending
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
        if (result.debug) {
          setDebugLogs(result.debug);
        }
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
        <h3 className="font-serif text-3xl text-charcoal mb-2">Thank You!</h3>
        <p className="text-gray-500 font-sans text-sm uppercase tracking-wide">Your wish has been posted</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-8 shadow-2xl rounded-lg animate-fade-in relative">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Your Name</label>
          <input 
            type="text" 
            required
            className="w-full bg-white text-charcoal border-b-2 border-gray-200 py-2 px-3 focus:border-gold focus:outline-none font-serif text-lg transition-colors placeholder-gray-300 rounded-none"
            placeholder="e.g. Auntie May"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Message</label>
          <textarea 
            required
            className="w-full bg-white text-charcoal border-2 border-gray-100 rounded-md p-3 focus:border-gold focus:outline-none font-serif text-base transition-colors placeholder-gray-300"
            rows={4}
            placeholder="Write your wishes here..."
            value={message}
            onChange={e => setMessage(e.target.value)}
          ></textarea>
        </div>
        
        <div>
          <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Photo (Optional)</label>
          
          {!previewUrl ? (
            <div 
              className="border-2 border-dashed border-gray-300 bg-gray-50 rounded-md p-8 text-center cursor-pointer hover:border-gold hover:bg-white transition-all group"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-10 h-10 mx-auto mb-3 text-gray-400 group-hover:text-gold transition-colors">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <p className="text-gray-500 text-sm font-serif italic group-hover:text-gold">Click to upload a photo</p>
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
          className="w-full bg-gold text-white py-4 px-6 font-sans font-bold uppercase tracking-widest hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg mt-4 flex items-center justify-center gap-2"
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
          <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm border border-red-100 text-left">
            <p className="font-bold mb-1">Error: {errorMessage}</p>
            {debugLogs.length > 0 && (
              <details className="mt-2 text-xs text-red-500" open>
                <summary className="cursor-pointer mb-1">View Details</summary>
                <ul className="list-disc pl-4 space-y-1 bg-white p-2 rounded border border-red-100">
                  {debugLogs.map((log, i) => (
                    <li key={i}>{log}</li>
                  ))}
                </ul>
              </details>
            )}
            <p className="mt-2 text-xs">Try uploading a smaller photo or check your connection.</p>
          </div>
        )}
      </form>
    </div>
  );
};