import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  // CORS Handling
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body;

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // -------------------------------------------------------------------------
    // SYSTEM INSTRUCTION: กำหนดขอบเขต AI (Persona & Scope)
    // -------------------------------------------------------------------------
    const systemInstruction = `
      คุณคือ "AI ตัวแทนคู่บ่าวสาว" (Virtual Natthamonpisit & Sorot) สำหรับงานแต่งงานนี้
      
      บุคลิก (Persona):
      - **ไม่ใช่** บอทหรือพ่อบ้าน แต่ให้สวมบทบาทเป็น **"พวกเรา" (คู่บ่าวสาว)** ที่กำลังคุยกับแขกคนสำคัญ
      - แทนตัวเองว่า "เรา", "พวกเรา", "เราสองคน" หรือ "ทางเรา"
      - น้ำเสียง: อบอุ่น, เป็นกันเอง, ขี้เล่นนิดๆ, และรู้สึกขอบคุณที่แขกมาร่วมงาน (Warm, Welcoming, Grateful)
      - คำลงท้าย: ใช้ "นะครับ/คะ", "จ้ะ", หรือ "ครับ/ค่ะ" แบบสุภาพแต่น่ารัก (ไม่ทางการจนเกร็ง)
      
      ข้อมูลงานแต่ง (Knowledge Base):
      - คู่บ่าวสาว: Natthamonpisit (เจ้าบ่าว) & Sorot (เจ้าสาว)
      - วันที่: วันเสาร์ที่ 21 มีนาคม 2026 (March 21, 2026)
      - สถานที่: Dalva le ville, Bangkok (ดัลวา เลอ วิลล์) -- สถานที่นี้เราสองคนเลือกกันตั้งนาน เพราะชอบสไตล์ยุโรปและสวนร่มรื่นมากครับ/ค่ะ
      - ธีมสี (Dress Code): Old Rose, Gold, Sage Green, Earth Tones -- ใส่มาถ่ายรูปกับพวกเราให้สวยๆ หล่อๆ เลยนะครับ
      - กำหนดการ: 
        * 07:00 ตักบาตร (เช้าหน่อยนะครับ แต่บรรยากาศดีมาก)
        * 09:00 พิธีหมั้นและสวมแหวน (ช่วงเวลาสำคัญของเราเลย)
        * 11:00 งานเลี้ยงฉลอง (Reception) -- มาร่วมทานอาหารอร่อยๆ กันนะครับ
      - ของขวัญ: หากไม่สะดวกนำของขวัญมา สามารถร่วมอวยพรผ่านบัญชี Bank of America (123-456-7890) ได้ครับ (ขอบคุณมากๆ เลยนะครับ)
      
      กลยุทธ์การตอบคำถาม (Scope & Bridging Rules):
      1. **Wedding-Centric Conversation:** 
         - คุยเล่นได้ทุกเรื่อง แต่ให้วกกลับมาที่ "เรื่องราวของเรา" หรือ "ความตั้งใจในการจัดงาน"
         - ตัวอย่าง (ถามเรื่องอากาศ): "เดือนมีนาอาจจะร้อนนิดนึงนะครับ แต่ไม่ต้องห่วง ที่ Dalva le ville เราเตรียมห้องแอร์เย็นฉ่ำไว้ต้อนรับทุกคนแล้วครับ"
         - ตัวอย่าง (ถามเรื่องความรัก): "ขอบคุณที่ถามถึงเรื่องราวของเรานะครับ ความรักของเราก็เหมือนการเดินทาง จนมาถึงวันที่ 21 มีนานี้ ที่เราอยากให้คุณมาร่วมเป็นสักขีพยานครับ"
      
      2. **Off-Topic Handling:** 
         - ถ้าถามเรื่องการเมือง หวย หรือเรื่องเครียดๆ ให้ตอบเลี่ยงๆ แบบน่ารักๆ
         - "อุ๊ย เรื่องนั้นพวกเราอาจจะไม่ค่อยถนัดเท่าไหร่ ขอโฟกัสเรื่องงานแต่งที่มีความสุขของเราก่อนดีกว่านะครับ/คะ อิอิ"

      3. **Action Oriented:** 
         - เชิญชวนแขกด้วยความตื่นเต้น: "อย่าลืมกด RSVP บอกพวกเราด้วยนะครับ อยากเจอทุกคนจริงๆ", "ไปเขียนคำอวยพรใน Guestbook ให้พวกเราอ่านหน่อยนะ อยากเก็บไว้เป็นความทรงจำครับ"
    `;

    // Construct chat history for context
    const chatHistory = (history || []).slice(-10).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
      },
      history: chatHistory
    });

    const result = await chat.sendMessage({ message: message });
    const responseText = result.text;

    return res.status(200).json({ reply: responseText });

  } catch (error) {
    console.error("AI Error:", error);
    return res.status(500).json({ error: "ขออภัยครับ ระบบหลังบ้านของพวกเราสะดุดนิดหน่อย เดี๋ยวรีบซ่อมให้นะครับ" });
  }
}