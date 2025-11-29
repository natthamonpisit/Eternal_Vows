
import React, { useState, useEffect, useMemo } from 'react';

interface EnvelopeProps {
  onOpen: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  // ---------------------------------------------------------------------------
  // รหัสรูปภาพ Stop Motion Animation (จาก Google Drive ของพี่นัท)
  // ---------------------------------------------------------------------------
  
  // 1. รูปซองปิด (Closed)
  const CLOSED_ID = "1TT6MKgz1RV70T1PmRj_I5QH49pbqQpxf"; 

  // 2. รูปซองเปิดครึ่งนึง (Half Open)
  const HALF_ID = "1QPx4ifFYd__PL9O_LJn-hBKkjNaDL451"; 

  // 3. รูปซองเปิดเกือบสุด (Fully Open)
  const OPEN_ID = "1W0hljkGqWNVvBa1EpL4NcMXnHa1COYf4"; 


  // ---------------------------------------------------------------------------
  const getUrl = (id: string) => {
    if (id.startsWith("REPLACE")) return "https://via.placeholder.com/1920x1080/e3b336/ffffff?text=Please+Insert+Image+ID";
    return `https://drive.google.com/thumbnail?id=${id}&sz=w1920`;
  };

  const [stage, setStage] = useState<'closed' | 'half' | 'open'>('closed');
  const [isWhiteFlash, setIsWhiteFlash] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Pre-calculate glitter particles to avoid re-render jumps (Random dust effect)
  const glitterParticles = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 2}px`, // ขนาดเล็กๆ 2-5px เหมือนกลิตเตอร์
      delay: `${Math.random() * 500}ms`,
      duration: `${Math.random() * 1000 + 500}ms`,
      color: Math.random() > 0.4 ? '#B78A7D' : '#FFFFFF' // Rose Gold & White glitter
    }));
  }, []);

  // Preload Images
  useEffect(() => {
    const imageUrls = [getUrl(CLOSED_ID), getUrl(HALF_ID), getUrl(OPEN_ID)];
    let loadedCount = 0;
    
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imageUrls.length) setImagesLoaded(true);
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === imageUrls.length) setImagesLoaded(true);
      };
    });
  }, []);

  const handleSequence = () => {
    // จังหวะที่ 1: เปลี่ยนเป็นรูปเปิดครึ่ง
    setStage('half');

    // เร่งจังหวะ Stop Motion ให้เร็วขึ้น (200ms)
    setTimeout(() => {
      // จังหวะที่ 2: เปลี่ยนเป็นรูปเปิดสุด
      setStage('open');
      
      // เปิดสุดแล้วรอแป๊บเดียว (300ms) พอให้ตาเห็น แล้ววาบเลย
      setTimeout(() => {
        // จังหวะที่ 3: จอขาววาบแบบฟุ้งๆ วิ้งๆ
        setIsWhiteFlash(true);
        
        // รอเอฟเฟกต์ทำงาน (1000ms) ให้เห็นวิ้งๆ ก่อน แล้วค่อยเข้าเว็บ
        setTimeout(() => {
          onOpen();
        }, 1000);
      }, 300);

    }, 200);
  };

  return (
    <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center overflow-hidden relative">
      
      {/* 
        Container ที่ล็อค Aspect Ratio 16:9 ให้ตรงกับรูปภาพซองจดหมาย 
        ทำให้เราสามารถวางตำแหน่ง Text ได้แม่นยำ (Responsive Locking)
      */}
      <div className="relative w-full max-w-[177.78vh] aspect-[16/9] shadow-2xl">
        
        {/* Layer 1: Closed */}
        <div 
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-none ${stage === 'closed' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          style={{ backgroundImage: `url("${getUrl(CLOSED_ID)}")` }}
        ></div>

        {/* Layer 2: Half */}
        <div 
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-none ${stage === 'half' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          style={{ backgroundImage: `url("${getUrl(HALF_ID)}")` }}
        ></div>

        {/* Layer 3: Open */}
        <div 
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-none ${stage === 'open' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          style={{ backgroundImage: `url("${getUrl(OPEN_ID)}")` }}
        ></div>


        {/* Controls Layer */}
        <div className={`absolute inset-0 z-20 transition-opacity duration-300 ${stage !== 'closed' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          
          {/* Invisible Click Area */}
          <button 
            onClick={handleSequence}
            disabled={!imagesLoaded}
            className="absolute inset-0 w-full h-full bg-transparent cursor-pointer"
            aria-label="Open Invitation"
          ></button>

          {/* 
              Text Positioned Relative to Image
              top-[22%] positions it higher on the upper flap.
          */}
          <div className="absolute top-[22%] left-0 right-0 text-center px-4 pointer-events-none">
             <p className="font-script text-3xl sm:text-4xl md:text-5xl text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] animate-float">
               {imagesLoaded ? "Tap to Open" : "Loading..."}
             </p>
          </div>
        </div>

      </div>

      {/* Magical White Flash Overlay (Glitter Dust Effect) - Covers entire screen */}
      <div className={`fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden transition-all duration-[1000ms] ease-out ${isWhiteFlash ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Base Cream/White Layer with Blur */}
        <div className="absolute inset-0 bg-[#FDFBF7] backdrop-blur-xl"></div>

        {/* Misty/Glow Effect */}
        <div className={`absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(253,251,247,0.8)_60%,transparent_100%)] transition-transform duration-[1500ms] ease-out ${isWhiteFlash ? 'scale-150 opacity-100' : 'scale-50 opacity-0'}`}></div>

        {/* Glitter Particles */}
        {isWhiteFlash && (
          <div className="absolute inset-0">
             {/* Center Light Burst */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vmax] h-[120vmax] bg-white opacity-80 blur-3xl animate-pulse"></div>
             
             {/* Generate 50 glitter particles */}
             {glitterParticles.map((p) => (
                <div 
                  key={p.id}
                  className="absolute rounded-full animate-ping opacity-0"
                  style={{
                    top: p.top,
                    left: p.left,
                    width: p.size,
                    height: p.size,
                    backgroundColor: p.color,
                    animationDelay: p.delay,
                    animationDuration: p.duration,
                    animationFillMode: 'forwards'
                  }}
                ></div>
             ))}
          </div>
        )}
      </div>

    </div>
  );
};
