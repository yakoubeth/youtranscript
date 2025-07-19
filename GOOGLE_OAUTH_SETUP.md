# 🔐 Google OAuth Setup Guide

## Current Status
✅ **GitHub OAuth**: Working  
⚠️ **Google OAuth**: Needs setup  
✅ **Email/Password**: Working  

## Quick Setup for Google OAuth

### 1. Google Cloud Console Setup

1. **Visit**: https://console.cloud.google.com/
2. **Create Project**:
   - Name: `YouTranscript`
   - Click "Create"

3. **Enable APIs**:
   - Go to "APIs & Services" → "Library"
   - Search and enable: "Google+ API"
   - Search and enable: "Google Identity Services API"

4. **OAuth Consent Screen**:
   - Go to "APIs & Services" → "OAuth consent screen"
   - User Type: "External"
   - Required fields:
     - App name: `YouTranscript`
     - User support email: `your-email@gmail.com`
     - Developer contact: `your-email@gmail.com`
   - Save and Continue

5. **Create Credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Name: "YouTranscript Web Client"
   - **Authorized redirect URIs** (IMPORTANT):
     ```
     http://localhost:3000/api/auth/callback/google
     ```
   - Click "Create"

6. **Copy Credentials**:
   - Copy the "Client ID" and "Client secret"

### 2. Update Environment Variables

Replace in `.env.local`:
```bash
GOOGLE_CLIENT_ID="your-actual-google-client-id-here"
GOOGLE_CLIENT_SECRET="your-actual-google-client-secret-here"
```

### 3. Re-enable Google Auth

Once you have the credentials, uncomment the Google provider in:

**src/lib/auth.ts**:
```typescript
GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
}),
```

**src/components/LoginForm.tsx** and **src/components/SignupForm.tsx**:
Uncomment the Google login buttons.

### 4. Restart Development Server

```bash
npm run dev
```

## For Production

When deploying to production, add these redirect URIs:
```
https://yourdomain.com/api/auth/callback/google
```

## Current Working Features

✅ **Email Registration**: With verification  
✅ **Email Login**: With password  
✅ **GitHub OAuth**: Ready to use  
✅ **Password Reset**: Full flow  
✅ **Protected Routes**: Dashboard access  
✅ **Session Management**: User state tracking  

## Next Steps

1. Set up Google OAuth (optional - GitHub works fine)
2. Set up database connection for full functionality
3. Move to Phase 3: YouTube Integration & Transcription Engine

---

**Note**: The authentication system is fully functional without Google OAuth. Users can register with email or use GitHub OAuth.
