# AAROG'26 Medical Camp Registration - Deployment Guide

## Option 1: Google Sheets Backend (Recommended - FREE)

### Step 1: Set up Google Sheets
1. Go to https://sheets.google.com
2. Create a new spreadsheet
3. Name it "AAROG'26 Registrations"

### Step 2: Add Google Apps Script
1. In your Google Sheet, click **Extensions** > **Apps Script**
2. Delete any existing code
3. Copy and paste the entire content from `google-script.gs`
4. Click **Save** (disk icon)

### Step 3: Deploy as Web App
1. Click **Deploy** > **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Fill in the settings:
   - Description: "AAROG'26 Registration Form"
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**
6. Click **Authorize access** and grant permissions
7. **Copy the Web App URL** (it looks like: https://script.google.com/macros/s/XXXXX/exec)

### Step 4: Update Your Website
1. Open `index.html`
2. Find this line: `const SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';`
3. Replace `YOUR_GOOGLE_SCRIPT_URL_HERE` with your copied Web App URL
4. Save the file

### Step 5: Host Your Website (Choose one)

#### A. GitHub Pages (FREE)
1. Create a GitHub account at https://github.com
2. Create a new repository named "aarog26-registration"
3. Upload `index.html`, `script.js`, and `styles.css`
4. Go to Settings > Pages
5. Select "main" branch and click Save
6. Your site will be live at: https://yourusername.github.io/aarog26-registration

#### B. Netlify (FREE)
1. Go to https://www.netlify.com
2. Sign up for free
3. Drag and drop your folder (containing index.html, script.js, styles.css)
4. Your site will be live instantly with a URL like: https://random-name.netlify.app
5. You can customize the domain name in settings

#### C. Vercel (FREE)
1. Go to https://vercel.com
2. Sign up for free
3. Click "Add New" > "Project"
4. Import your files
5. Deploy - your site will be live at: https://your-project.vercel.app

#### D. Google Drive (Simple but limited)
1. Upload all files to Google Drive
2. Right-click `index.html` > Open with > Google Drive Viewer
3. Share the link (limited functionality)

## Option 2: Firebase (More Advanced - FREE)

If you prefer Firebase instead of Google Sheets:
1. Go to https://firebase.google.com
2. Create a new project
3. Enable Firestore Database
4. I can help you modify the code for Firebase if needed

## Testing Your Deployment

1. Open your deployed website URL
2. Fill out the registration form and submit
3. Check your Google Sheet - you should see the data appear
4. Test the "View Registrations" button
5. Test the "Download Excel" button
6. Test the "Remove Last Entry" button

## Sharing the Link

Once deployed, share your website URL with:
- Medical camp volunteers
- Registration desk staff
- Anyone who needs to register patients

The data will be stored centrally in your Google Sheet, accessible from anywhere!

## Troubleshooting

- **Form not submitting**: Check that the SCRIPT_URL is correct in index.html
- **Data not appearing**: Make sure you deployed the Google Script as "Anyone" can access
- **CORS errors**: These are normal with Google Apps Script (mode: 'no-cors' handles this)

## Security Note

The Google Sheet is only accessible to you. The Web App URL allows form submissions but doesn't expose the sheet data directly.
