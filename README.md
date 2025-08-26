# Delphin Clean Air - Lead Generation Website

A modern, bilingual lead generation website for Delphin Clean Air featuring:

## Features
- 🌍 **Bilingual Support** - English and Spanish
- 📧 **Lead Capture System** - Email notifications via Resend API
- 📊 **CRM Integration** - Airtable for lead management
- 🔐 **Secure Admin Dashboard** - Google OAuth authentication
- 📱 **Responsive Design** - Mobile-first approach
- 📚 **PDF Downloads** - Free ebooks with lead capture
- 💬 **Testimonials System** - Customer reviews with approval workflow
- 📅 **Consultation Booking** - Virtual and in-person appointments
- 🤝 **Affiliate Program** - Partner signup system

## Tech Stack
- **Framework:** Next.js 14 with App Router
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js with Google OAuth
- **Animations:** Framer Motion
- **Internationalization:** next-intl
- **Email:** Resend API
- **Database:** Airtable
- **Deployment:** Vercel/Netlify

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/erosnol/delphincleanair.git
   cd delphincleanair
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your API keys and configuration.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Environment Variables

```env
# Email Service
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=your_admin_email@gmail.com

# Airtable CRM
AIRTABLE_BASE_ID=your_airtable_base_id
AIRTABLE_API_KEY=your_airtable_api_key

# NextAuth Configuration
NEXTAUTH_URL=https://delphincleanair.com
NEXTAUTH_SECRET=your_random_secret_string

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Admin Dashboard

Access the secure admin dashboard at `/admin-login` with Google authentication. Features include:
- Lead management and analytics
- Testimonials approval system
- Real-time lead notifications
- CRM data visualization

## Deployment

The site is configured for deployment on Vercel or Netlify:

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Netlify
1. Connect repository to Netlify
2. Configure build settings (already in netlify.toml)
3. Add environment variables in Netlify dashboard

## License

© 2024 Delphin Clean Air. All rights reserved.
