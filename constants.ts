
// ---------------- คำแนะนำสำหรับพี่นัท ----------------
// ผมแก้ URL เป็นตัวใหม่ล่าสุดที่พี่ส่งมาให้แล้วครับ (...tfjg/exec)
// ตอนนี้ระบบจะเชื่อมต่อกับ Google Sheet ผ่าน Script ตัวใหม่นี้ครับ

export const API_URL = "https://script.google.com/macros/s/AKfycbyvomQVxSrgQdYTgSTVZmMPIiqThw5d26ZJIvdaUgQg2tdYgoN_Oy9VoVipgLvCtfjg/exec";

// รูปตัวอย่าง (ระบบจะโชว์รูปพวกนี้ระหว่างรอรูปจริงโหลด หรือถ้า API มีปัญหา)
// เจเพิ่มให้ครบ 17 รูป และคละแนวตั้ง/แนวนอน ให้เหมือนของจริงครับ
export const MOCK_GALLERY_IMAGES = [
  // 1. Portrait
  "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=800&auto=format&fit=crop",
  // 2. Landscape
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop", 
  // 3. Landscape
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
  // 4. Portrait
  "https://images.unsplash.com/photo-1520854221256-17451cc330e7?q=80&w=800&auto=format&fit=crop",
  // 5. Portrait
  "https://images.unsplash.com/photo-1522673607200-1645062cd495?q=80&w=800&auto=format&fit=crop",
  // 6. Landscape
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop",
  // 7. Landscape
  "https://images.unsplash.com/photo-1529636721158-b851fd5a0868?q=80&w=800&auto=format&fit=crop",
  // 8. Portrait
  "https://images.unsplash.com/photo-1532712938310-34cb3958d425?q=80&w=800&auto=format&fit=crop",
  // 9. Portrait
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop",
  // 10. Landscape
  "https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=800&auto=format&fit=crop",
  // 11. Portrait
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop",
  // 12. Portrait
  "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=800&auto=format&fit=crop",
  // 13. Landscape
  "https://images.unsplash.com/photo-1623091411315-327c4b785d95?q=80&w=800&auto=format&fit=crop",
  // 14. Portrait
  "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?q=80&w=800&auto=format&fit=crop",
  // 15. Portrait
  "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=800&auto=format&fit=crop",
  // 16. Landscape
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
  // 17. Landscape (Centerpiece)
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"
];

export const MOCK_WISHES = [
  { name: "คุณพ่อ & คุณแม่", message: "ขอให้ลูกทั้งสองครองรักกันตราบนานเท่านานนะลูก", timestamp: new Date().toISOString() },
  { name: "เพื่อนเจ้าบ่าว", message: "ยินดีด้วยครับเพื่อน! รอไปฉลองไม่ไหวแล้ว", timestamp: new Date().toISOString() },
];
