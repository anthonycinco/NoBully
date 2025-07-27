# NoBully AI - Simple Cyberbullying Detection

A frontend-only website that detects cyberbullying from user-submitted text or images using keyword-based analysis and OCR.

## Features

- **Text Analysis**: Analyze plain text for cyberbullying content
- **Image Analysis**: Upload images and extract text using OCR for analysis
- **Keyword Detection**: Simple keyword-based analysis that detects:
  - Racial slurs and discriminatory language
  - Gender-based harassment and slurs
  - Suicidal ideation and self-harm content
  - General bullying and abusive behavior
- **Confidence Scoring**: Provides confidence levels (0-100%) for each analysis
- **Theme Detection**: Identifies the dominant theme of harmful content
- **Keyword Highlighting**: Shows specific phrases that contributed to the classification
- **User Feedback**: Allows users to provide feedback on analysis accuracy
- **Educational Content**: Information about cyberbullying and support resources

## Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls
- **Tesseract.js** - OCR for image text extraction

### Backend
- **None** - Pure frontend solution
- **Tesseract.js** - Client-side OCR for image text extraction

## Installation

### Prerequisites

- Node.js 18+ and npm

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env.local
```

3. Start development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

**No backend required!** This is a pure frontend application that runs entirely in the browser.

### Model Training (Optional)

**No training required!** This system uses a simple keyword-based approach that works immediately without any machine learning training.

## Usage

### Text Analysis

1. Navigate to the "Text Input" tab
2. Enter or paste the text you want to analyze
3. Click "Analyze Text"
4. View the results showing:
   - Classification (Safe/Cyberbullying)
   - Confidence score
   - Detected theme
   - Key phrases identified

### Image Analysis

1. Navigate to the "Image Upload" tab
2. Drag and drop an image or click "browse" to select a file
3. Click "Analyze Image"
4. The system will:
   - Extract text from the image using OCR
   - Analyze the extracted text
   - Display results with the same information as text analysis

### Providing Feedback

After each analysis, users can:
- Rate the accuracy of the analysis
- Provide additional comments
- Help improve the AI model

## How It Works

### Text Analysis
- Analyzes text using predefined keyword lists
- Checks for harmful content across multiple categories
- Provides confidence scores based on keyword density

### Image Analysis
- Uses Tesseract.js for client-side OCR
- Extracts text from uploaded images
- Analyzes extracted text using the same keyword system

## Detection System

The cyberbullying detection system uses:

1. **Keyword-based Analysis**: Predefined lists of harmful keywords and phrases
2. **Multi-category Classification**: 4 categories (Racial Slurs, Gender Slurs, Suicidal Ideation, General Bullying)
3. **Confidence Scoring**: Based on keyword density and frequency
4. **Theme Detection**: Identifies the dominant category of harmful content

## Keyword Categories

The system checks for harmful content in these categories:
- Racial slurs and discriminatory language
- Gender-based harassment and slurs
- Suicidal ideation and self-harm content
- General bullying and abusive behavior

## Ethical Considerations

- **Content Warning**: The system handles sensitive and potentially harmful content
- **Privacy**: No user data is stored permanently
- **Transparency**: Clear explanations of how classifications are made
- **Educational Purpose**: Designed to help identify and understand cyberbullying patterns
- **Support Resources**: Provides information about getting help

## Deployment

### Frontend (Vercel)

1. Create a new project on Vercel
2. Upload your project files or connect your local project
3. Deploy - no environment variables needed!

### Alternative: Netlify, GitHub Pages, etc.

Since this is a pure frontend application, you can deploy it to any static hosting service by uploading the project files.

## Contributing

This is a local project. You can modify the code directly to add new features or improve the detection system.

## License

This is a local project for educational purposes.

## Support

If you or someone you know is experiencing cyberbullying, please reach out to appropriate support services or authorities:

- National Suicide Prevention Lifeline: 1-800-273-8255
- Crisis Text Line: Text HOME to 741741
- Your local mental health services

## Disclaimer

This tool is designed for educational and research purposes. It should not be used as the sole method for detecting or addressing cyberbullying. Always consult with appropriate professionals for serious situations. 