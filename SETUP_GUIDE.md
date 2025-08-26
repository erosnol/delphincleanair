# Delphin Clean Air - Lead Management Setup Guide

## 🎯 How to Track Your Website Inquiries

Your website now captures leads automatically! Here's how to set up and manage everything:

## 📧 Email Notifications (Recommended - Easiest Setup)

### Option 1: Resend (Recommended)
1. Go to [resend.com](https://resend.com) and create a free account
2. Get your API key from the dashboard
3. Create a `.env.local` file in your project root:
```bash
RESEND_API_KEY=re_your_api_key_here
ADMIN_EMAIL=your-email@example.com
```
4. Install Resend: `npm install resend`

### Option 2: Alternative - Console Logging (No Setup Required)
Your leads are already being logged to the console! When someone fills out a form, you'll see:
```
🎯 NEW LEAD - FREE-GIFT:
  name: John Doe
  email: john@example.com
  phone: (555) 123-4567
  timestamp: 8/25/2024, 5:30:22 PM
```

## 📊 Lead Storage Options

### Option 1: Airtable (Recommended)
1. Create a free [Airtable](https://airtable.com) account
2. Create a base called "Delphin Leads"
3. Create a table with these columns:
   - First Name (Single line text)
   - Last Name (Single line text)
   - Email (Email)
   - Phone (Phone number)
   - Source (Single select: free-gift, booking, ebook, affiliate)
   - Details (Long text)
   - Created At (Date & time)
   - Status (Single select: New, Contacted, Qualified, Closed)

4. Get your API key and Base ID from Airtable
5. Add to `.env.local`:
```bash
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_API_KEY=keyXXXXXXXXXXXXXX
```

### Option 2: Google Sheets (Alternative)
- Leads can be automatically added to a Google Sheet
- Requires Google Sheets API setup

## 📱 Admin Dashboard

Visit `/admin` on your website to see all leads in a beautiful dashboard:
- Real-time lead tracking
- Filter by source (assessments, bookings, ebooks, affiliates)
- Contact information and details
- Lead status management

## 📚 PDF Ebook Setup

### For your Spanish/English clean air books:

1. **Upload PDFs to your hosting:**
   - Create a `public/ebooks/` folder
   - Add your PDF files: `clean-air-guide-en.pdf`, `clean-air-guide-es.pdf`

2. **Update the ebook download links:**
   - The system will automatically email download links
   - PDFs will be served from your domain

3. **Alternative - Use a service:**
   - Upload to Google Drive and get shareable links
   - Use Dropbox or similar cloud storage
   - Host on AWS S3 or similar

## 🚀 Quick Start (Minimal Setup)

**To start tracking leads immediately with zero setup:**

1. Your leads are already being logged to the console
2. Visit `/admin` to see the dashboard (works without database)
3. Check your browser's developer console for real-time lead notifications

## 📈 Advanced Features Available

- **Email automation**: Welcome sequences for different lead types
- **CRM integration**: Connect to HubSpot, Salesforce, etc.
- **Analytics**: Google Analytics, Facebook Pixel tracking
- **SMS notifications**: Get text alerts for high-priority leads
- **Calendar integration**: Auto-schedule consultations
- **Lead scoring**: Prioritize your hottest prospects

## 🎥 Your Video Integration

Your Vimeo video (https://vimeo.com/751836839) is now integrated into the hero section with:
- Auto-play background video
- Interactive play button overlay
- Professional presentation

## 📞 What Happens When Someone Fills Out a Form

1. **Immediate**: Lead data logged to console
2. **Email**: You get notified instantly (if email is set up)
3. **Storage**: Lead saved to your database/Airtable
4. **User**: They get a confirmation email
5. **Dashboard**: Lead appears in your admin panel

## 🔧 Need Help?

The system is designed to work immediately with console logging. For advanced features:
1. Set up email notifications first (easiest wins)
2. Add Airtable for lead storage
3. Customize the admin dashboard
4. Add your PDF ebooks

Your website is already capturing leads - just check the console and `/admin` page!
