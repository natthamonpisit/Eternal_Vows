import React from 'react';

export const MoneyGift: React.FC = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto text-center space-y-8 bg-[#FAF9F6] border-4 border-gold/40 p-12 rounded-xl shadow-2xl relative transform transition-transform hover:-translate-y-1 duration-300">
        {/* Added leading-normal and py-2 to prevent script font clipping */}
        <h2 className="font-script text-5xl text-gold-shine leading-normal py-2">Gift with Love</h2>
        <p className="font-serif text-lg text-gray-600 leading-relaxed">
          Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, a cash contribution towards our new life together would be deeply appreciated.
        </p>
        
        <div className="py-6">
          <div className="w-56 h-56 mx-auto bg-white p-3 rounded-lg shadow-inner border border-gray-200 flex items-center justify-center mb-6">
            {/* QR Code Placeholder */}
            <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded">
               <svg className="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4h2v-4zM5 21v-4m4 4v-4m4 4v-4m-4-4h4m-4 4h4m-4-4v4m4-4v4m-5 0V3m-4 0v18m18 0V3" /></svg>
               <span className="text-xs font-sans font-bold uppercase tracking-wide">Scan QR Code</span>
            </div>
          </div>
          <p className="mt-4 font-sans text-sm text-gray-500 font-medium tracking-wide">Bank of America • Natthamonpisit & Sorot</p>
          <p className="text-sm text-gray-400 mt-1">123-456-7890</p>
        </div>
      </div>
    </section>
  );
};