# AAROG'26 Medical Camp Registration

A responsive web-based registration form for medical camp organized by YOUNG MINDS CLUB OF GCT YOUTH.

## Features

- 📱 Fully responsive design (mobile & desktop optimized)
- ☁️ Cloud-based data storage using Google Sheets
- 📊 Export registrations to Excel format
- 👁️ View all registrations
- ❌ Remove last entry (for error correction)
- 🔒 Secure and centralized data management

## Patient Information Collected

- Patient Name
- Age
- Gender
- Mobile Number
- Address
- Reason to Visit

## Tech Stack

- HTML5
- CSS3 (Responsive Design)
- JavaScript (Vanilla)
- Google Apps Script (Backend)
- Google Sheets (Database)
- SheetJS (Excel export)

## Deployment

This project is deployed on Netlify. For detailed deployment instructions, see [DEPLOYMENT_INSTRUCTIONS.md](DEPLOYMENT_INSTRUCTIONS.md).

## Setup Instructions

1. Create a Google Sheet for data storage
2. Deploy the Google Apps Script (`google-script.gs`)
3. Update the `SCRIPT_URL` in `index.html` with your Google Apps Script URL
4. Host the website on Netlify, GitHub Pages, or Vercel

## Files

- `index.html` - Main HTML structure
- `styles.css` - Responsive styling
- `script.js` - Form handling and data management
- `google-script.gs` - Google Apps Script for backend
- `DEPLOYMENT_INSTRUCTIONS.md` - Detailed deployment guide

## License

MIT License - Feel free to use and modify for your medical camp needs.

## Organized By

YOUNG MINDS CLUB OF GCT YOUTH
