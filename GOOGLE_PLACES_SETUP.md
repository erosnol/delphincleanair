# Google Places API Setup

## Required for Address Autocomplete

To enable address autocomplete functionality, you need to set up Google Places API:

### 1. Get Google Places API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Places API** and **Geocoding API**
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy the API key

### 2. Restrict API Key (Recommended)

1. Click on your API key to edit it
2. Under "Application restrictions":
   - For development: Add `http://localhost:3000/*` and `http://localhost:3002/*`
   - For production: Add `https://delphincleanair.org/*`
3. Under "API restrictions":
   - Select "Restrict key"
   - Choose "Places API" and "Geocoding API"

### 3. Add to Environment Variables

**Local (.env.local):**
```bash
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_api_key_here
```

**Vercel Production:**
Add this environment variable in your Vercel dashboard:
- Variable: `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY`
- Value: `your_api_key_here`

### 4. Features Enabled

With this setup, users will get:
- **Address autocomplete** with real-time suggestions
- **Mobile-friendly** address input
- **Accurate geocoding** for service area verification

### 5. Billing

Google Places API has a free tier:
- First 1,000 requests per month are free
- Additional requests: $17 per 1,000 requests
- For most small businesses, this stays within the free tier

## Phone Number Features (Already Working)

The phone input now includes:
- ✅ **Automatic formatting** (e.g., (555) 123-4567)
- ✅ **Country code support** (defaults to US)
- ✅ **Mobile keyboard** (numeric keypad on iOS/Android)
- ✅ **Input validation** with proper phone number format
- ✅ **International support** (users can change country)

## Testing

1. **Phone Input**: Try entering numbers - they'll auto-format
2. **Address Input**: Start typing an address to see suggestions (requires API key)
