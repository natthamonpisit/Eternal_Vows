
// ---------------- คำแนะนำสำหรับพี่นัท ----------------
// ผมแก้ URL เป็นตัวใหม่ล่าสุดที่พี่ส่งมาให้แล้วครับ (...tfjg/exec)
// ตอนนี้ระบบจะเชื่อมต่อกับ Google Sheet ผ่าน Script ตัวใหม่นี้ครับ

export const API_URL = "https://script.google.com/macros/s/AKfycbyvomQVxSrgQdYTgSTVZmMPIiqThw5d26ZJIvdaUgQg2tdYgoN_Oy9VoVipgLvCtfjg/exec";

// รูปตัวอย่าง (ระบบจะโชว์รูปพวกนี้ระหว่างรอรูปจริงโหลด หรือถ้า API มีปัญหา)
export const MOCK_GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520854221256-17451cc330e7?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522673607200-1645062cd495?q=80&w=800&auto=format&fit=crop",
];

export const MOCK_WISHES = [
  { name: "คุณพ่อ & คุณแม่", message: "ขอให้ลูกทั้งสองครองรักกันตราบนานเท่านานนะลูก", timestamp: new Date().toISOString() },
  { name: "เพื่อนเจ้าบ่าว", message: "ยินดีด้วยครับเพื่อน! รอไปฉลองไม่ไหวแล้ว", timestamp: new Date().toISOString() },
];
