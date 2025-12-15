
// ---------------- CONFIGURATION ----------------
const CONFIG = {
  // รหัส Sheet ที่ถูกต้อง (ตัว y)
  SHEET_ID: '10nq4glCrBgH0wdqeAFFqYfAk-5FZ7Swr4-6c-K5y0iQ', 
  GALLERY_FOLDER_ID: '1Qa2ztFGPavgnMVaG_Bz7-9uoZqOTV5Gu',
  GUESTBOOK_FOLDER_ID: '1HhsMZCZNkmWjP6ySi7HLyogBuvd7LFEu' 
};

// ---------------- HELPER FUNCTIONS ----------------

function extractId(raw) {
  if (!raw) return '';
  const text = raw.toString();
  if (text.includes('/d/')) {
    return text.split('/d/')[1].split('/')[0];
  }
  return text.trim();
}

// ---------------- MAIN LOGIC ----------------

function doGet(e) {
  const action = e ? e.parameter.action : 'test';
  
  if (action === 'getGallery') return getGalleryImages();
  if (action === 'getWishes') return getWishes();
  
  return createCorsResponse({ success: true, message: "Wedding API Ready" });
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.action === 'rsvp') return handleRsvp(data);
    if (data.action === 'guestbook') return handleGuestbook(data);
    return createCorsResponse({ error: 'Invalid action' });
  } catch (err) {
    return createCorsResponse({ error: err.toString() });
  }
}

function getGalleryImages() {
  const images = [];
  try {
    const cleanId = extractId(CONFIG.GALLERY_FOLDER_ID);
    const folder = DriveApp.getFolderById(cleanId);
    const files = folder.getFiles();
    
    while (files.hasNext()) {
      const file = files.next();
      const mime = file.getMimeType();
      const name = file.getName();
      const id = file.getId();

      if (mime.includes('image') || name.toLowerCase().endsWith('.heic')) {
        // Return object with thumbnail (w600) and full size (w2048)
        images.push({
          thumb: "https://drive.google.com/thumbnail?id=" + id + "&sz=w600",
          full: "https://drive.google.com/thumbnail?id=" + id + "&sz=w2048"
        });
      }
    }
    return createCorsResponse({ success: true, data: images });
  } catch (err) {
    return createCorsResponse({ success: false, error: err.toString() });
  }
}

function handleGuestbook(data) {
  try {
    const sheetId = extractId(CONFIG.SHEET_ID);
    const folderId = extractId(CONFIG.GUESTBOOK_FOLDER_ID);
    
    // เช็ค Sheet
    const ss = SpreadsheetApp.openById(sheetId);
    let sheet = ss.getSheetByName('GuestBook');
    if (!sheet) { 
      sheet = ss.insertSheet('GuestBook'); 
      sheet.appendRow(['Timestamp', 'Name', 'Message', 'ImageURL']); 
    }

    // จัดการรูปภาพ
    let imageUrl = '';
    if (data.image) {
      const parts = data.image.split(',');
      const base64Data = parts.length > 1 ? parts[1] : parts[0];
      const contentType = parts.length > 1 ? parts[0].split(':')[1].split(';')[0] : 'image/png';
      
      const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), contentType, data.name || 'guest');
      const file = DriveApp.getFolderById(folderId).createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      imageUrl = "https://drive.google.com/thumbnail?id=" + file.getId() + "&sz=w1024";
    }
    
    sheet.appendRow([new Date(), data.name, data.message, imageUrl]);
    return createCorsResponse({ success: true });
    
  } catch (err) {
    return createCorsResponse({ success: false, error: err.toString() });
  }
}

function handleRsvp(data) {
  try {
    const cleanId = extractId(CONFIG.SHEET_ID);
    const ss = SpreadsheetApp.openById(cleanId);
    let sheet = ss.getSheetByName('RSVP');
    if (!sheet) { sheet = ss.insertSheet('RSVP'); sheet.appendRow(['Timestamp', 'Name', 'Attending', 'Guests', 'Note']); }
    sheet.appendRow([new Date(), data.name, data.attending, data.attendees || 0, data.note || '']);
    return createCorsResponse({ success: true });
  } catch (err) {
    return createCorsResponse({ success: false, error: err.toString() });
  }
}

function getWishes() {
  try {
    const cleanId = extractId(CONFIG.SHEET_ID);
    const ss = SpreadsheetApp.openById(cleanId);
    const sheet = ss.getSheetByName('GuestBook');
    if (!sheet) return createCorsResponse({ success: true, data: [] });
    
    // ดึงข้อมูลทั้งหมดออกมา
    const rows = sheet.getDataRange().getValues();
    
    // กรองข้อมูล:
    // 1. ตัดแถวที่เป็นหัวตารางทิ้ง (เช็คว่าคอลัมน์แรกเขียนว่า Timestamp ไหม)
    // 2. ตัดแถวว่างทิ้ง (เช็คว่าคอลัมน์ Name ต้องไม่ว่าง)
    const cleanRows = rows.filter(r => r[0] !== 'Timestamp' && r[1] && r[1].toString() !== '');

    // เอา 20 อันล่าสุด (Reverse)
    const wishes = cleanRows.reverse().slice(0, 20).map(r => ({
      timestamp: r[0], 
      name: r[1], 
      message: r[2], 
      imageUrl: r[3]
    }));
    
    return createCorsResponse({ success: true, data: wishes });
  } catch (err) {
    return createCorsResponse({ success: false, error: err.toString() });
  }
}

function createCorsResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}