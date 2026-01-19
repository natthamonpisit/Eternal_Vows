
/*
  ========================================================================================
  📊 BACKEND: Google Apps Script
  ========================================================================================
  
  [Spreadsheet Info]
  - Sheet ID: '10nq4glCrBgH0wdqeAFFqYfAk-5FZ7Swr4-6c-K5y0iQ'
  
  [Sheets Structure]
  1. RSVP: [Timestamp, Name, Attending, Guests, Note]
  2. GuestBook: [Timestamp, Name, Message, ImageURL]
  3. Slips (New): [Timestamp, SenderName, SlipURL]
*/

// ---------------- CONFIGURATION ----------------
const CONFIG = {
  SHEET_ID: '10nq4glCrBgH0wdqeAFFqYfAk-5FZ7Swr4-6c-K5y0iQ'
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
  if (action === 'getWishes') return getWishes();
  return createCorsResponse({ success: true, message: "Wedding API Ready" });
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.action === 'rsvp') return handleRsvp(data);
    if (data.action === 'guestbook') return handleGuestbook(data);
    if (data.action === 'uploadSlip') return handleSlip(data); // New Action
    return createCorsResponse({ error: 'Invalid action' });
  } catch (err) {
    return createCorsResponse({ error: err.toString() });
  }
}

function handleSlip(data) {
  try {
    const sheetId = extractId(CONFIG.SHEET_ID);
    const ss = SpreadsheetApp.openById(sheetId);
    let sheet = ss.getSheetByName('Slips');
    
    // Create 'Slips' sheet if not exists
    if (!sheet) { 
      sheet = ss.insertSheet('Slips'); 
      sheet.appendRow(['Timestamp', 'SenderName', 'SlipURL']); 
    }

    sheet.appendRow([new Date(), data.name, data.image]);
    return createCorsResponse({ success: true });
  } catch (err) {
    return createCorsResponse({ success: false, error: err.toString() });
  }
}

function handleGuestbook(data) {
  try {
    const sheetId = extractId(CONFIG.SHEET_ID);
    const ss = SpreadsheetApp.openById(sheetId);
    let sheet = ss.getSheetByName('GuestBook');
    if (!sheet) { 
      sheet = ss.insertSheet('GuestBook'); 
      sheet.appendRow(['Timestamp', 'Name', 'Message', 'ImageURL']); 
    }
    
    sheet.appendRow([new Date(), data.name, data.message, data.image || '']);
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
    
    const rows = sheet.getDataRange().getValues();
    const cleanRows = rows.filter(r => r[0] !== 'Timestamp' && r[1] && r[1].toString() !== '');

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