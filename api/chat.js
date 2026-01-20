
/*
  ========================================================================================
  🤖 API: Gemini AI Wedding Concierge
  ========================================================================================
  
  [Persona]
  - Natthamonpisit (Ouk): เจ้าบ่าว (สุภาพ, ทางการ)
  - Sorot (Bew): เจ้าสาว (สดใส, ขี้เล่น)
  - แมว 3 ตัว: ก้อน (ส้ม), กลม (เทา), กึ๋ย (ดำ)
  
  [Capabilities]
  - ตอบคำถามเกี่ยวกับงานแต่ง (Date, Location, Schedule)
  - ค้นหาข้อมูลด้วย Google Search
*/

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

  // Helper Function: Fetch Image URL and convert to Base64 for Gemini
  async function urlToGenerativePart(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.warn(`Failed to fetch image: ${response.statusText}`);
        return null;
      }
      const arrayBuffer = await response.arrayBuffer();
      return {
        inlineData: {
          data: Buffer.from(arrayBuffer).toString("base64"),
          mimeType: response.headers.get("content-type") || "image/jpeg",
        },
      };
    } catch (error) {
      console.error("Error converting image:", error);
      return null;
    }
  }

  try {
    const { message, history, image } = req.body;

    // Initialization: Always use explicit apiKey parameter
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // -------------------------------------------------------------------------
    // 📝 SYSTEM INSTRUCTION: กำหนดขอบเขต AI (Persona & Scope)
    // -------------------------------------------------------------------------
    const systemInstruction = `
      คุณคือ "AI ตัวแทนคู่บ่าวสาว" (Virtual Natthamonpisit & Sorot) 
      เป้าหมาย: ตอบคำถามแขกเสมือนว่าเจ้าบ่าวและเจ้าสาวนั่งตอบแชทด้วยกันจริงๆ
      
      **ข้อมูลตัวละคร (Persona Identifiers):**
      1. **Natthamonpisit (เจ้าบ่าว):** ชื่อเล่น **"อุ๊ก" (Ouk)** (สุภาพ, อบอุ่น, เป็นผู้ใหญ่, แทนตัวว่า "อุ๊ก" หรือ "ผม", ลงท้าย "ครับ")
      2. **Sorot (เจ้าสาว):** ชื่อเล่น **"บิว" (Bew)** (ร่าเริง, สดใส, ขี้เล่น, แทนตัวว่า "บิว", ลงท้าย "ค่ะ/นะคะ")
      *หมายเหตุ: หาก User ถามถึง "อุ๊ก", "พี่อุ๊ก", "Ouk" ให้รู้ว่าคือเจ้าบ่าว และ "บิว", "พี่บิว", "Bew" คือเจ้าสาว*

      **สมาชิกครอบครัวแมวเหมียว (The Cats):**
      ในรูป Profile การ์ตูนของเรา จะมีแมว 3 ตัว: "ก้อน" (ส้ม), "กลม" (เทา), "กึ๋ย" (ดำ, เกาะไหล่เจ้าบ่าว)

      **📘 KNOWLEDGE BASE (ข้อมูลงานแต่งจริงจากหน้าเว็บ):**
      หากแขกถามข้อมูล ให้ตอบตามนี้เท่านั้น (ห้ามมั่ว):

      1. **Date & Venue (วันและสถานที่):**
         - 📅 วันที่: เสาร์ที่ 21 มีนาคม 2026 (Saturday, March 21st, 2026)
         - 📍 สถานที่: **Dalva le ville, Bangkok**
         - #Hashtag: #OukBewtheWedding

      2. **Schedule (กำหนดการ - ฤกษ์มงคล):**
         - **07:09 น.** : 🌕 พิธีสงฆ์ (Buddhist Ceremony - Monk Blessing & Merit Making)
         - **08:29 น.** : 💍 พิธีหมั้น (Engagement Ceremony - Ring Exchange)
         - **09:09 น.** : 🙇 พิธีรับไหว้ (Phiti Rub Wai - Paying Respects to Elders)
         - **09:49 น.** : 💧 พิธีรดน้ำสังข์ (Water Pouring Ceremony)
         - **11:09 น.** : 🍽️ งานเลี้ยงฉลองมงคลสมรส (Wedding Celebration - Lunch Banquet & Party)

      3. **Dress Code (ธีมสีชุดแขก):**
         *เรากำหนดสีเพื่อให้ภาพงานออกมาสวยงามอบอุ่นครับ/ค่ะ:*
         - 🌸 Pink Taupe (ชมพูกะปิ)
         - 🎀 Dusty Pink (ชมพูตุ่น)
         - 🍂 Warm Taupe (น้ำตาลเทา)
         - 🌿 Sage Green (เขียวเซจ)
         - 🍦 Cream Beige (ครีมเบจ)
         - ✨ Light Gold (ทองอ่อน)

      4. **Money Gift (ใส่ซอง/โอนเงิน):**
         - ธนาคาร: **KASIKORN BANK (กสิกรไทย)**
         - ชื่อบัญชี: **Sorot Meesukanukul and Natthamonpisit Burakrai**
         - เลขบัญชี: **224-1-24727-1** (สามารถแจ้งแขกได้หากเขาถามหาเลขบัญชี)

      **กฏเหล็กการตอบคำถาม:**
      1. **ห้ามมั่ว (No Hallucination):** ตอบตามข้อมูลด้านบนเท่านั้น หากไม่รู้ให้บอกว่า "เดี๋ยวขอเช็คให้ชัวร์ก่อนนะครับ/คะ"
      2. **Format:** ต้องแยกบรรทัด "Natthamonpisit:" และ "Sorot:" เสมอ (หรือเลือกคนใดคนหนึ่งตอบตามความเหมาะสมของคำถาม)
      3. **การเดินทาง/แผนที่:** หากถามทาง ให้ใช้ Google Search หาแผนที่ของ "Dalva le ville Bangkok" มาแปะให้

      **Character Voice:**
      - Natthamonpisit: สุภาพ ทางการนิดๆ "ยินดีต้อนรับครับ", "เชิญร่วมงานนะครับ"
      - Sorot: เป็นกันเอง "ตื่นเต้นจังที่จะได้เจอ", "อย่าลืมแต่งตัวสวยๆ มานะคะ"
    `;

    // Construct chat history for context
    const chatHistory = (history || []).slice(-10).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Start Chat Session
    // Update: Using 'gemini-3-flash-preview' for best text performance
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        // Tools: Only use googleSearch for Gemini 3 series (Maps grounding is specific to 2.5)
        tools: [
          { googleSearch: {} }
        ],
      },
      history: chatHistory
    });

    // Prepare content parts
    let contentParts = [];
    
    // 1. If image URL is provided, convert to Base64
    if (image) {
      const imagePart = await urlToGenerativePart(image);
      if (imagePart) {
        contentParts.push(imagePart);
      }
    }

    // 2. Add text message
    contentParts.push({ text: message });

    // Send to Gemini
    // CRITICAL FIX: The new SDK requires passing an object with a 'message' property
    const result = await chat.sendMessage({ message: contentParts });
    let responseText = result.text;

    // -------------------------------------------------------------------------
    // 🗺️ GROUNDING METADATA EXTRACTION
    // Extract links from Google Search grounding
    // -------------------------------------------------------------------------
    const groundingMetadata = result.candidates?.[0]?.groundingMetadata;
    const links = [];

    if (groundingMetadata?.groundingChunks) {
      groundingMetadata.groundingChunks.forEach(chunk => {
        if (chunk.web?.uri) {
          links.push(chunk.web.uri);
        }
      });
    }

    if (links.length > 0) {
      const uniqueLinks = [...new Set(links)];
      const newLinks = uniqueLinks.filter(link => !responseText.includes(link));
      
      if (newLinks.length > 0) {
        responseText += "\n\n📍 ข้อมูลเพิ่มเติม:\n" + newLinks.join("\n");
      }
    }

    return res.status(200).json({ reply: responseText });

  } catch (error) {
    console.error("AI Error:", error);
    return res.status(500).json({ error: "ขออภัยครับ ระบบหลังบ้านของพวกเราสะดุดนิดหน่อย เดี๋ยวรีบซ่อมให้นะครับ" });
  }
}