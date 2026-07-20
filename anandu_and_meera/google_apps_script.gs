/**
 * Google Apps Script — Wedding Blessings Sheet Handler
 * Anandu & Meera | Wedding Invitation
 *
 * Deploy as a Web App:
 *   Execute as: Me
 *   Who has access: Anyone
 *
 * Then copy the deployment URL into GOOGLE_SCRIPT_URL in script.js
 */

const SHEET_ID = '186ZsAP72kiZRjyMQyzSWLCwBr9X9zvO0Y3rGeaA2sqE';
const SHEET_NAME = 'Sheet1'; // Change if your tab has a different name

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    // Add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Name', 'Blessing', 'Date']);
      sheet.getRange(1, 1, 1, 3).setFontWeight('bold');
    }

    // Append the new blessing
    sheet.appendRow([
      data.name  || 'Anonymous',
      data.text  || '',
      data.time  || new Date().toLocaleDateString('en-IN')
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function — run manually in the Apps Script editor to verify sheet access
function testAppend() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Name', 'Blessing', 'Date']);
  }
  sheet.appendRow(['Test User', 'This is a test blessing!', new Date().toLocaleDateString('en-IN')]);
  Logger.log('Test row appended successfully.');
}
