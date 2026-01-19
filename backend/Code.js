
/*
  ========================================================================================
  📊 BACKEND: Google Apps Script
  ========================================================================================
  
  [Description]
  ใช้เป็น Database ง่ายๆ สำหรับเก็บข้อมูล RSVP และ Guestbook ลง Google Sheet
  
  [Spreadsheet Info]
  - Sheet ID: '10nq4glCrBgH0wdqeAFFqYfAk-5FZ7Swr4-6c-K5y0iQ'
  
  [Sheets Structure]
  1. RSVP
     - Columns: [Timestamp, Name, Attending, Guests, Note]
     
  2. GuestBook
     - Columns: [Timestamp, Name, Message, ImageURL]
     
  [Deployment]
  - ต้อง Deploy เป็น Web App
  - Execute as: Me (เจ้าของบัญชี)
  - Who has access: Anyone (เพื่อเปิด Public API)
*/

// ---------------- CONFIGURATION ----------------
const CONFIG = {
  SHEET_ID: '10nq4glCrBgH0wdqeAFFqYfAk-5FZ7Swr4-6c-K5y0iQ', 
  // Gallery and Guestbook Folders are no longer used for storage in Drive
  // But kept in config to avoid breaking old variables if referenced
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
  
  // Gallery is now handled by Vercel/Cloudinary, but we keep this for backward compat
  // or if you want to use Drive as backup.
  if (action === 'getGallery') return createCorsResponse({ success: true, data: [] }); 
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

function handleGuestbook(data) {
  try {
    const sheetId = extractId(CONFIG.SHEET_ID);
    
    // Check Sheet
    const ss = SpreadsheetApp.openById(sheetId);
    let sheet = ss.getSheetByName('GuestBook');
    if (!sheet) { 
      sheet = ss.insertSheet('GuestBook'); 
      sheet.appendRow(['Timestamp', 'Name', 'Message', 'ImageURL']); 
    }

    // Handle Image
    // Now the frontend sends a Cloudinary URL string directly.
    // If it's a URL (starts with http), we save it directly.
    // If it's Base64 (legacy), we save to Drive (Old logic fallback).
    
    let finalImageUrl = '';

    if (data.image) {
       if (data.image.toString().startsWith('http')) {
          // It's a Cloudinary URL
          finalImageUrl = data.image;
       } else {
          // Fallback: Base64 Upload to Drive (Legacy)
          const folderId = extractId(CONFIG.GUESTBOOK_FOLDER_ID);
          const parts = data.image.split(',');
          const base64Data = parts.length > 1 ? parts[1] : parts[0];
          const contentType = parts.length > 1 ? parts[0].split(':')[1].split(';')[0] : 'image/png';
          
          const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), contentType, data.name || 'guest');
          const file = DriveApp.getFolderById(folderId).createFile(blob);
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          finalImageUrl = "https://drive.google.com/thumbnail?id=" + file.getId() + "&sz=w1024";
       }
    }
    
    sheet.appendRow([new Date(), data.name, data.message, finalImageUrl]);
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
    
    // Fetch data
    const rows = sheet.getDataRange().getValues();
    
    // Filter
    const cleanRows = rows.filter(r => r[0] !== 'Timestamp' && r[1] && r[1].toString() !== '');

    // Get latest 20
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
