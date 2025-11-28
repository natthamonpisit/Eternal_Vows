
import React, { useState, useEffect, useRef } from 'react';
import { submitGuestbook, fetchWishes } from '../services/api';
import { GuestWishes } from '../types';

export const Guestbook: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'wall'>('wall');
  const [wishes, setWishes] = useState<GuestWishes[]>([]);

  useEffect(() => {
    // Initial fetch
    loadWishes();
    
    // Poll every 10 seconds for live updates
    const interval = setInterval(loadWishes, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadWishes = async () => {
    const data = await fetchWishes();
    setWishes(data);
  };

  return (
    <section className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="font-serif text-5xl text-charcoal mb-4">Guestbook</h2>
        <div className="flex justify-center gap-6 font-sans text-sm tracking-widest uppercase">
          <button 
            onClick={() => setActiveTab('wall')}
            className={`pb-2 border-b-2 transition-colors ${activeTab === 'wall' ? 'border-gold text-charcoal' : 'border-transparent text-gray-400 hover:text-gold'}`}
          >
            Live Wall
          </button>
          <button 
            onClick={() => setActiveTab('form')}
            className={`pb-2 border-b-2 transition-colors ${activeTab === 'form' ? 'border-gold text-charcoal' : 'border-transparent text-gray-400 hover:text-gold'}`}
          >
            Leave a Wish
          </button>
        </div>
      </div>

      {activeTab === 'wall' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {wishes.map((wish, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 break-inside-avoid transform transition hover:-translate-y-1 hover:shadow-lg">
              {wish.imageUrl && (
                <div className="mb-4 rounded-md overflow-hidden h-48 w-full bg-gray-50 border border-gray-100">
                  <img 
                    src={wish.imageUrl} 
                    alt="Guest upload" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
              )}
              <p className="font-serif text-lg text-charcoal italic mb-4 leading-relaxed">"{wish.message}"</p>
              <div className="flex justify-between items-end border-t border-gray-100 pt-3">
                <span className="font-sans font-bold text-xs uppercase text-gold tracking-wider">{wish.name}</span>
                <span className="font-sans text-[10px] text-gray-400">
                  {new Date(wish.timestamp).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
          {wishes.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-400 font-serif italic bg-white/50 rounded-lg border border-dashed border-gray-300">
              No wishes yet. Be the first to sign!
            </div>
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
            className="w-full bg-white text-charcoal border-b-2 border-gray-200 py-2 px-3 focus:border-gold focus:outline-none font-serif text-lg transition-colors placeholder-gray-300"
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
