import React, { useState, useRef } from 'react';
import { FadeInUp } from './FadeInUp';
import { submitSlip } from '../services/api';

export const MoneyGift: React.FC = () => {
  const [view, setView] = useState<'info' | 'upload'>('info');
  const [copied, setCopied] = useState(false);
  const ACCOUNT_NUMBER = "123-456-7890"; // พี่นัทอย่าลืมแก้เลขบัญชีจริงตรงนี้นะครับ

  const handleCopy = () => {
    navigator.clipboard.writeText(ACCOUNT_NUMBER.replace(/-/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12 md:py-16 px-4">
      <FadeInUp>
        <div className="max-w-2xl mx-auto space-y-6 md:space-y-8 bg-[#FAF9F6] border-4 border-gold/40 p-8 md:p-12 rounded-xl shadow-2xl relative transition-all duration-300">
          
          <div className="text-center">
             {/* Changed to font-sans */}
             <h2 className="font-sans text-4xl md:text-5xl text-gold-shine leading-normal py-2 uppercase tracking-wider font-bold">Gift with Love</h2>
             {view === 'info' && (
                /* Changed to font-sans */
                <p className="font-sans text-sm md:text-base text-gray-600 leading-relaxed px-2 md:px-8 mt-4 font-medium">
                  Your presence is the most precious gift to us. For your convenience, we have provided this digital option for those who wish to offer a token of celebration without the need to carry cash.
                </p>
             )}
          </div>

          {view === 'info' ? (
            // ===================================
            // VIEW 1: INFO & QR CODE
            // ===================================
            <div className="py-4 md:py-6 text-center animate-fade-in">
              <div className="w-48 h-48 md:w-56 md:h-56 mx-auto bg-white p-3 rounded-lg shadow-inner border border-gray-200 flex items-center justify-center mb-6">
                {/* QR Code Placeholder */}
                <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded">
                   <svg className="w-10 h-10 md:w-12 md:h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4h2v-4zM5 21v-4m4 4v-4m4 4v-4m-4-4h4m-4 4h4m-4-4v4m4-4v4m-5 0V3m-4 0v18m18 0V3" /></svg>
                   <span className="text-[10px] md:text-xs font-sans font-bold uppercase tracking-wide">Scan QR Code</span>
                </div>
              </div>
              <p className="mt-4 font-sans text-xs md:text-sm text-gray-500 font-medium tracking-wide">Bank of America • Natthamonpisit & Sorot</p>
              
              {/* Copyable Account Number */}
              <div className="relative mt-2 inline-block group mb-8">
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gold/30 rounded-full shadow-sm hover:shadow-md hover:border-gold transition-all group-hover:-translate-y-0.5"
                >
                  {/* Changed from font-mono to font-sans */}
                  <span className="font-sans text-lg md:text-xl text-charcoal font-bold tracking-wider">{ACCOUNT_NUMBER}</span>
                  <svg className={`w-4 h-4 text-gold transition-all ${copied ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  
                  {/* Success Checkmark */}
                  <svg className={`absolute right-4 w-4 h-4 text-green-500 transition-all ${copied ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </button>
                
                {/* Tooltip */}
                <span className={`absolute left-1/2 -translate-x-1/2 -bottom-8 text-[10px] bg-charcoal text-white px-2 py-1 rounded transition-opacity ${copied ? 'opacity-100' : 'opacity-0'}`}>
                  Copied!
                </span>
              </div>

              {/* Attach Slip Button */}
              <div>
                <button
                  onClick={() => setView('upload')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal text-white font-sans text-xs font-bold uppercase tracking-widest rounded-md hover:bg-gold transition-colors shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                  Attach Slip
                </button>
              </div>

            </div>
          ) : (
            // ===================================
            // VIEW 2: UPLOAD FORM
            // ===================================
            <SlipUploadForm onBack={() => setView('info')} />
          )}

        </div>
      </FadeInUp>
    </section>
  );
};

// Sub-component for Upload Form to keep code clean
const SlipUploadForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'submitting' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
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
        const MAX = 1024;
        if (width > height) {
          if (width > MAX) { height *= MAX / width; width = MAX; }
        } else {
          if (height > MAX) { width *= MAX / height; height = MAX; }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.onerror = reject;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setStatus('processing');
    try {
      const base64 = await resizeImage(file);
      setStatus('submitting');
      
      const result = await submitSlip({ name, image: base64 });
      
      if (result.success) {
        setStatus('success');
        setTimeout(() => {
          onBack(); // Reset after success
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'success') {
     return (
       <div className="py-12 animate-fade-in text-center">
         <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
         </div>
         {/* Changed to font-sans */}
         <h3 className="font-sans text-3xl text-charcoal mb-2 font-bold uppercase tracking-wide">Slip Sent!</h3>
         <p className="text-gray-500 font-sans text-sm uppercase tracking-wide">Thank you for your kindness.</p>
       </div>
     );
  }

  return (
    <div className="animate-fade-in text-left">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors mb-6 text-sm font-sans font-bold uppercase tracking-widest"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back
      </button>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
           <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Sender Name</label>
           <input 
             type="text" 
             required
             /* Changed to font-sans */
             className="w-full border-b-2 border-gray-200 bg-transparent py-2 px-1 text-lg font-sans font-medium focus:border-gold focus:outline-none transition-colors rounded-none placeholder-gray-300"
             placeholder="e.g. Somchai Jai-dee"
             value={name}
             onChange={e => setName(e.target.value)}
           />
        </div>

        <div>
           <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Upload Slip</label>
           {!previewUrl ? (
             <div 
               onClick={() => fileInputRef.current?.click()}
               className="border-2 border-dashed border-gray-300 bg-white p-8 rounded-lg text-center cursor-pointer hover:border-gold hover:bg-gold/5 transition-all group"
             >
                <div className="w-10 h-10 mx-auto mb-3 text-gray-400 group-hover:text-gold transition-colors">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                {/* Changed to font-sans */}
                <p className="font-sans text-gray-500 font-medium">Tap to select image</p>
             </div>
           ) : (
             <div className="relative rounded-lg overflow-hidden border border-gray-200">
                <img src={previewUrl} alt="Slip Preview" className="w-full object-contain max-h-64 bg-gray-50" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600"
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
          className="w-full bg-gold text-white py-4 font-sans font-bold uppercase tracking-widest hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md rounded-sm"
        >
           {status === 'processing' || status === 'submitting' ? 'Uploading...' : 'Send Slip'}
        </button>
        
        {status === 'error' && (
           <p className="text-red-500 text-center text-sm">Upload failed. Please try again.</p>
        )}
      </form>
    </div>
  );
};