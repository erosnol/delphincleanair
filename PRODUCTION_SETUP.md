# Production Setup Guide

## Critical Issues to Fix

### 1. Google OAuth Setup (Required for Admin Login)

#### Step 1: Create Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set Application type to "Web application"
6. Add authorized JavaScript origins:
   - `https://delphincleanair.org`
   - `http://localhost:3000` (for development)
7. Add authorized redirect URIs:
   - `https://delphincleanair.org/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google` (for development)

#### Step 2: Environment Variables (Production)
Add these to your Netlify environment variables:

```bash
# NextAuth Configuration
NEXTAUTH_URL=https://delphincleanair.org
NEXTAUTH_SECRET=your_super_secret_random_string_here_32_chars_min

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Admin Email (for login access)
ADMIN_EMAIL=erosdelphin@gmail.com

# Email Service (Resend - for appointment notifications)
RESEND_API_KEY=your_resend_api_key_here

# Airtable (for storing leads)
AIRTABLE_BASE_ID=your_airtable_base_id
AIRTABLE_API_KEY=your_airtable_api_key
```

### 2. Resend Email Setup (For Appointment Notifications)

#### Step 1: Create Resend Account
1. Go to [Resend.com](https://resend.com/)
2. Sign up for free account
3. Verify your domain `delphincleanair.org`
4. Get your API key from dashboard

#### Step 2: Domain Verification
1. Add DNS records for `delphincleanair.org`
2. Verify domain in Resend dashboard
3. Test email sending

### 3. Airtable Setup (For Lead Storage)

#### Step 1: Create Airtable Base
1. Go to [Airtable.com](https://airtable.com/)
2. Create new base called "Delphin Leads"
3. Create table with these fields:
   - First Name (Single line text)
   - Last Name (Single line text)
   - Email (Email)
   - Phone (Phone number)
   - Source (Single select: air-washer-gift, booking, affiliate, job-application)
   - Status (Single select: New, Contacted, Qualified, Closed)
   - Details (Long text)
   - Created At (Date & time)

#### Step 2: Get API Credentials
1. Go to https://airtable.com/api
2. Select your base
3. Copy Base ID and API key

### 4. Netlify Environment Variables

Go to your Netlify dashboard → Site settings → Environment variables and add:

```
NEXTAUTH_URL=https://delphincleanair.org
NEXTAUTH_SECRET=generate_a_random_32_character_string
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
ADMIN_EMAIL=erosdelphin@gmail.com
RESEND_API_KEY=your_resend_api_key
AIRTABLE_BASE_ID=your_airtable_base_id
AIRTABLE_API_KEY=your_airtable_api_key
```

### 5. Testing the Setup

#### Test Admin Login:
1. Go to `https://delphincleanair.org/admin-login`
2. Click "Sign in with Google"
3. Should redirect to Google OAuth
4. After successful login, should redirect to admin dashboard

#### Test Appointment Booking:
1. Go to main site and book a consultation
2. Check console logs in Netlify Functions
3. Check your email for notifications
4. Check Airtable for new lead record

### 6. Debugging Console Errors

The console errors you're seeing are likely due to:

1. **Missing NEXTAUTH_URL**: Fixed in netlify.toml
2. **Google OAuth not configured**: Need to set up credentials
3. **Missing environment variables**: Need to add to Netlify

### 7. Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

Or use this online generator: https://generate-secret.vercel.app/32

## Quick Fix Checklist

- [ ] Set up Google OAuth credentials
- [ ] Add all environment variables to Netlify
- [ ] Set up Resend email service
- [ ] Set up Airtable base
- [ ] Test admin login
- [ ] Test appointment booking
- [ ] Verify email notifications work

## Support

If you need help with any of these steps, the main issues are likely:
1. Missing Google OAuth setup
2. Missing NEXTAUTH_SECRET
3. Missing email service configuration

Fix these three and the admin login + appointment notifications should work.
