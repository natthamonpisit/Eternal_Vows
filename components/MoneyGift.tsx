import React, { useState } from 'react';

export const MoneyGift: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const ACCOUNT_NUMBER = "123-456-7890"; // พี่นัทอย่าลืมแก้เลขบัญชีจริงตรงนี้นะครับ

  const handleCopy = () => {
    navigator.clipboard.writeText(ACCOUNT_NUMBER.replace(/-/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-2xl mx-auto text-center space-y-6 md:space-y-8 bg-[#FAF9F6] border-4 border-gold/40 p-8 md:p-12 rounded-xl shadow-2xl relative transform transition-transform hover:-translate-y-1 duration-300">
        {/* Added leading-normal and py-2 to prevent script font clipping */}
        <h2 className="font-script text-4xl md:text-5xl text-gold-shine leading-normal py-2">Gift with Love</h2>
        <p className="font-serif text-base md:text-lg text-gray-600 leading-relaxed px-2 md:px-8">
          Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, a cash contribution towards our new life together would be deeply appreciated.
        </p>
        
        <div className="py-4 md:py-6">
          <div className="w-48 h-48 md:w-56 md:h-56 mx-auto bg-white p-3 rounded-lg shadow-inner border border-gray-200 flex items-center justify-center mb-6">
            {/* QR Code Placeholder */}
            <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded">
               <svg className="w-10 h-10 md:w-12 md:h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4h2v-4zM5 21v-4m4 4v-4m4 4v-4m-4-4h4m-4 4h4m-4-4v4m4-4v4m-5 0V3m-4 0v18m18 0V3" /></svg>
               <span className="text-[10px] md:text-xs font-sans font-bold uppercase tracking-wide">Scan QR Code</span>
            </div>
          </div>
          <p className="mt-4 font-sans text-xs md:text-sm text-gray-500 font-medium tracking-wide">Bank of America • Natthamonpisit & Sorot</p>
          
          {/* Copyable Account Number */}
          <div className="relative mt-2 inline-block group">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gold/30 rounded-full shadow-sm hover:shadow-md hover:border-gold transition-all group-hover:-translate-y-0.5"
            >
              <span className="font-mono text-lg md:text-xl text-charcoal font-bold tracking-wider">{ACCOUNT_NUMBER}</span>
              <svg className={`w-4 h-4 text-gold transition-all ${copied ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              
              {/* Success Checkmark */}
              <svg className={`absolute right-4 w-4 h-4 text-green-500 transition-all ${copied ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </button>
            
            {/* Tooltip */}
            <span className={`absolute left-1/2 -translate-x-1/2 -bottom-8 text-[10px] bg-charcoal text-white px-2 py-1 rounded transition-opacity ${copied ? 'opacity-100' : 'opacity-0'}`}>
              Copied!
            </span>
            <p className="text-[10px] text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Tap to copy</p>
          </div>

        </div>
      </div>
    </section>
  );
};