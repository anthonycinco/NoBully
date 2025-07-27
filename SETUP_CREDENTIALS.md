# Setup with Existing Google Cloud Vision API Credentials

## 🚀 Quick Setup

Since you already have the Google Cloud Vision API JSON credentials, here's how to integrate them:

### 1. Extract API Key from JSON

Your JSON file should look something like this:
```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "...",
  "client_email": "...",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "..."
}
```

**For client-side usage, you need the API key, not the service account JSON.**

### 2. Get API Key

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Select your project** (same project as your JSON credentials)
3. **Go to APIs & Services > Credentials**
4. **Click "Create Credentials" > "API Key"**
5. **Copy the API key**

### 3. Set Environment Variable

Create a `.env.local` file in your project root:
```env
NEXT_PUBLIC_GOOGLE_VISION_API_KEY=your_api_key_here
```

### 4. For Vercel Deployment

Add the environment variable in Vercel:
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add: `NEXT_PUBLIC_GOOGLE_VISION_API_KEY` = `your_api_key_here`

## 🔧 Alternative: Use Service Account (Server-side)

If you want to use the JSON file directly (more secure), you'll need a backend API:

### Create API Route (Optional)

Create `app/api/ocr/route.ts`:
```typescript
import { google } from 'googleapis'

export async function POST(request: Request) {
  const { image } = await request.json()
  
  const auth = new google.auth.GoogleAuth({
    keyFile: 'path/to/your/service-account.json',
    scopes: ['https://www.googleapis.com/auth/cloud-vision']
  })
  
  const vision = google.vision({ version: 'v1', auth })
  
  const result = await vision.images.annotate({
    requestBody: {
      requests: [{
        image: { content: image },
        features: [{ type: 'TEXT_DETECTION' }]
      }]
    }
  })
  
  return Response.json({ text: result.data.responses[0]?.textAnnotations[0]?.description || '' })
}
```

## 🎯 Recommended Approach

**Use the API Key approach** (steps 1-4 above) because:
- ✅ Simpler setup
- ✅ Works with frontend-only deployment
- ✅ No backend required
- ✅ Sufficient for most use cases

## 🔒 Security Note

- The API key will be visible in the browser (that's okay for this use case)
- For production apps, consider using the server-side approach
- Set up API key restrictions in Google Cloud Console

## 🚀 Test Your Setup

1. Add your API key to `.env.local`
2. Run `npm run dev`
3. Upload an image with text
4. Should see real OCR results in 1-2 seconds!

Your OCR will now be **5-10x faster** than Tesseract.js! 🎉 