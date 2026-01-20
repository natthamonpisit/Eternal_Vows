import React, { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Update initial message to new dialogue format using nicknames
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'ai', 
      content: 'Natthamonpisit: สวัสดีครับทุกคน! อุ๊กยินดีต้อนรับสู่งานแต่งของเรานะครับ สอบถามข้อมูลต่างๆ ได้เลยครับ ✨\n\nSorot: บิวตื่นเต้นมากๆ เลยที่จะได้เจอทุกคน อย่าลืมกด RSVP ให้เราด้วยนะคะ ❤️' 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ---------------------------------------------------------------------------
  // 📸 เปลี่ยน Link รูปการ์ตูนบ่าวสาวตรงนี้ครับ
  // ใช้รูปจาก Google Drive ID: 1VNRHQVuoxow67BpPVJftXvzMNEod2JUY
  // ---------------------------------------------------------------------------
  const COUPLE_AVATAR_URL = "https://drive.google.com/thumbnail?id=1VNRHQVuoxow67BpPVJftXvzMNEod2JUY&sz=w500"; 
  // เพิ่มขนาด sz=w500 เพื่อให้ภาพชัดขึ้นเมื่อขยายใหญ่

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: text,
          history: messages.map(m => ({ role: m.role, content: m.content })) 
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', content: 'Natthamonpisit: ขออภัยครับ ระบบขัดข้องชั่วคราว\nSorot: เดี๋ยวพวกเรามาตอบใหม่นะคะ' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  // Helper function to render text with clickable links AND Bold Names
  const renderContent = (content: string) => {
    const lines = content.split('\n');

    return lines.map((line, lineIdx) => {
      // 1. Check if line starts with Speaker Name (e.g., "Natthamonpisit:")
      const speakerMatch = line.match(/^(Natthamonpisit:|Sorot:)\s*(.*)/);

      let contentToRender = line;
      let speakerName = null;

      if (speakerMatch) {
        speakerName = speakerMatch[1]; // "Natthamonpisit:"
        contentToRender = speakerMatch[2]; // The rest of the message
      }

      // 2. Process URLs in the content
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const parts = contentToRender.split(urlRegex);
      const processedContent = parts.map((part, index) => {
        if (part.match(urlRegex)) {
          return (
            <a 
              key={index} 
              href={part} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-500 hover:text-blue-700 underline break-all"
            >
              {part}
            </a>
          );
        }
        return <span key={index}>{part}</span>;
      });

      // 3. Render the line
      return (
        <div key={lineIdx} className={`${speakerName ? 'mt-2 first:mt-0' : 'min-h-[1.2em]'}`}>
          {speakerName && (
            <span className="font-bold text-gold-shine mr-1.5 drop-shadow-sm">
              {speakerName}
            </span>
          )}
          <span className="text-charcoal/90">{processedContent}</span>
        </div>
      );
    });
  };

  return (
    <>
      {/* Floating Action Button (Cartoon Avatar) */}
      <button
        onClick={toggleChat}
        // Mobile Tuning: Reduced size from w-20 to w-16 to save space
        className={`fixed bottom-6 right-6 md:bottom-12 md:right-12 z-50 p-0 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 group ${isOpen ? 'rotate-12 scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open Wedding Concierge"
      >
        <div className="relative">
          {/* Container for Avatar */}
          <div className="w-16 h-16 md:w-28 md:h-28 rounded-full bg-white border-4 border-gold shadow-[0_4px_25px_rgba(183,138,125,0.6)] overflow-hidden relative flex items-center justify-center">
            {/* Cartoon Image */}
            <img 
              src={COUPLE_AVATAR_URL}
              alt="Chat with us"
              // VISUAL FIX: 
              // Mobile: translate-y-5 (Unchanged - Shows faces/cats correctly on small screens)
              // Desktop: md:translate-y-9 (Move down further to prevent cutting off heads/cats on larger containers)
              className="w-full h-full object-cover rounded-full bg-white transform scale-[2.5] translate-y-5 md:translate-y-9 hover:scale-[2.6] transition-transform duration-500"
              onError={(e) => {
                // Fallback if image fails to load
                (e.target as HTMLImageElement).src = "https://placehold.co/200x200/FDFBF7/B78A7D?text=Couple";
              }}
            />
            
            {/* Shine Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 pointer-events-none rounded-full"></div>
          </div>

          {/* Online Status Dot - MOVED OUTSIDE CONTAINER */}
          {/* VISUAL FIX: Sits on top of border, size increased by ~5% (w-[18px]/[23px]) */}
          <div className="absolute bottom-0 right-0 md:bottom-1 md:right-1 w-[18px] h-[18px] md:w-[23px] md:h-[23px] bg-green-500 border-[3px] border-white rounded-full animate-pulse z-20 shadow-sm"></div>
        </div>
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 w-[90vw] md:w-[400px] h-[500px] max-h-[80vh] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gold/20 flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right transform ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-90 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-gold to-[#C08E86] p-4 flex items-center justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-12 h-12 rounded-full border-2 border-white/50 overflow-hidden bg-white/90 backdrop-blur-sm">
               {/* Small Avatar in Header */}
               {/* VISUAL FIX: Adjusted translate-y-2 to translate-y-3 to move image DOWN slightly */}
               <img src={COUPLE_AVATAR_URL} alt="Assistant" className="w-full h-full object-cover rounded-full scale-[2.0] translate-y-3" />
            </div>
            <div>
              {/* DESIGN UPDATE: Changed to font-sans (Montserrat) and added tracking */}
              <h3 className="font-sans text-white text-lg font-bold tracking-wide">Natthamonpisit & Sorot</h3>
              <p className="font-sans text-white/70 text-[10px] uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Online
              </p>
            </div>
          </div>
          <button 
            onClick={toggleChat}
            className="text-white/80 hover:text-white transition-colors relative z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAF9F6] scrollbar-thin">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                // DESIGN UPDATE: Changed font-serif to font-sans for better readability on chat
                className={`max-w-[85%] p-3 rounded-2xl text-sm md:text-base font-sans leading-relaxed shadow-sm flex gap-2 ${
                  msg.role === 'user' 
                    ? 'bg-gold text-white rounded-br-none flex-row-reverse' 
                    : 'bg-white text-charcoal border border-gray-100 rounded-bl-none block'
                }`}
              >
                {/* Avatar next to AI message */}
                {msg.role === 'ai' && (
                  <div className="w-6 h-6 min-w-[24px] rounded-full overflow-hidden bg-white border border-gray-100 mt-1 shrink-0">
                     <img src={COUPLE_AVATAR_URL} alt="AI" className="w-full h-full object-cover scale-[2.0] translate-y-2" />
                  </div>
                )}
                
                {/* Content Container - removed whitespace-pre-wrap to handle lines manually */}
                <div className="w-full">
                  {renderContent(msg.content)}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm flex gap-1">
                <div className="w-2 h-2 bg-gold/50 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gold/50 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gold/50 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions (Chips) */}
        <div className="px-4 py-2 bg-[#FAF9F6] flex gap-2 overflow-x-auto no-scrollbar mask-gradient">
           {['👗 ธีมสีชุด?', '📍 ขอแผนที่', '⏰ งานเริ่มกี่โมง?', '🚗 ที่จอดรถ?'].map((q, i) => (
             <button 
               key={i}
               onClick={() => handleQuickQuestion(q)}
               className="whitespace-nowrap px-3 py-1 bg-white border border-gold/30 rounded-full text-[10px] md:text-xs text-charcoal/80 hover:bg-gold hover:text-white transition-colors shadow-sm font-sans"
             >
               {q}
             </button>
           ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form 
            onSubmit={(e) => { e.preventDefault(); sendMessage(inputText); }}
            className="flex gap-2 items-center"
          >
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="สอบถามข้อมูล..."
              // DESIGN UPDATE: Changed to font-sans
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 font-sans text-charcoal text-sm transition-all"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={!inputText.trim() || isLoading}
              className="w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center hover:bg-[#8E5B50] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md shrink-0"
            >
              <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};