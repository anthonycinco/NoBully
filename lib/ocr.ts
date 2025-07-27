// OCR utility using Google Cloud Vision API
// Using your existing JSON credentials

export async function extractTextFromImage(file: File): Promise<string> {
  try {
    // Convert file to base64
    const base64 = await fileToBase64(file)
    
    // Use your Google Cloud Vision API key
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_VISION_API_KEY || '54149be2311b4549b6774bbc3ad91bb2aa09099b'
    
    // Real Google Cloud Vision API call
    return await googleVisionOCR(base64, apiKey)
    
  } catch (error) {
    console.error('OCR failed:', error)
    throw new Error('Failed to extract text from image')
  }
}

// Helper function to convert file to base64
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64 = reader.result as string
      // Remove data URL prefix
      const base64Data = base64.split(',')[1]
      resolve(base64Data)
    }
    reader.onerror = error => reject(error)
  })
}

// Google Cloud Vision API implementation (for production)
export async function googleVisionOCR(base64Image: string, apiKey: string): Promise<string> {
  const response = await fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          {
            image: {
              content: base64Image,
            },
            features: [
              {
                type: 'TEXT_DETECTION',
                maxResults: 1,
              },
            ],
          },
        ],
      }),
    }
  )

  if (!response.ok) {
    throw new Error('Google Vision API request failed')
  }

  const data = await response.json()
  const text = data.responses[0]?.textAnnotations[0]?.description || ''
  
  return text.trim()
} 