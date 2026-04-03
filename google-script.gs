// Google Apps Script for AAROG'26 Medical Camp Registration
// Deploy this as a Web App with "Anyone" access

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  // Skip header row and convert to JSON
  const jsonData = [];
  for (let i = 1; i < data.length; i++) {
    jsonData.push({
      timestamp: data[i][0],
      name: data[i][1],
      age: data[i][2],
      gender: data[i][3],
      mobile: data[i][4],
      address: data[i][5],
      reason: data[i][6]
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify(jsonData))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Check if this is a remove action
    if (e.parameter.action === 'removeLast') {
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) { // Don't delete header
        sheet.deleteRow(lastRow);
      }
      return ContentService.createTextOutput(JSON.stringify({success: true}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Regular form submission
    const data = JSON.parse(e.postData.contents);
    
    // Initialize sheet with headers if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Age', 'Gender', 'Mobile', 'Address', 'Reason to Visit']);
    }
    
    // Append new row
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.age,
      data.gender,
      data.mobile,
      data.address,
      data.reason
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
