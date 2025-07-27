'use client'

import { useState } from 'react'
import { Shield, Upload, FileText, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import TextInput from '@/components/TextInput'
import ImageUpload from '@/components/ImageUpload'
import ResultsPanel from '@/components/ResultsPanel'
import { AnalysisResult } from '@/types'
import { extractTextFromImage } from '@/lib/ocr'

// Simple keyword detection system
const BULLYING_KEYWORDS = {
  'Racial Slurs': [
    'nigga', 'nigger', 'coon', 'spic', 'chink', 'gook', 'wetback', 'beaner',
    'towelhead', 'sand nigger', 'curry muncher', 'paki', 'raghead'
  ],
  'Gender Slurs': [
    'faggot', 'fag', 'dyke', 'lesbo', 'tranny', 'shemale', 'fairy', 'queer',
    'gayass', 'butch', 'femme', 'twink', 'bear', 'drag queen'
  ],
  'Suicidal Ideation': [
    'kill yourself', 'kys', 'commit suicide', 'end it all', 'no reason to live',
    'want to die', 'better off dead', 'self harm', 'cut myself', 'overdose',
    'hang myself', 'jump off', 'end my life'
  ],
  'General Bullying': [
    'ugly', 'fat', 'stupid', 'idiot', 'moron', 'retard', 'loser', 'weirdo',
    'freak', 'nerd', 'geek', 'dork', 'wimp', 'coward', 'pathetic', 'worthless'
  ]
}

function analyzeText(text: string): AnalysisResult {
  const lowerText = text.toLowerCase()
  const foundKeywords: string[] = []
  let detectedTheme = 'General'
  let maxScore = 0

  // Check each category
  for (const [theme, keywords] of Object.entries(BULLYING_KEYWORDS)) {
    let score = 0
    for (const keyword of keywords) {
      if (lowerText.includes(keyword.toLowerCase())) {
        foundKeywords.push(keyword)
        score += 1
      }
    }
    
    if (score > maxScore) {
      maxScore = score
      detectedTheme = theme
    }
  }

  // Calculate confidence based on keyword density
  const words = text.split(/\s+/).length
  const keywordDensity = foundKeywords.length / Math.max(words, 1)
  const confidence = Math.min((maxScore * 20) + (keywordDensity * 100), 100)

  const isBullying = foundKeywords.length > 0
  const classification = isBullying ? 'Cyberbullying' : 'Safe'

  let explanation = ''
  if (isBullying) {
    explanation = `Detected ${foundKeywords.length} harmful keyword(s) related to ${detectedTheme.toLowerCase()}.`
  } else {
    explanation = 'No harmful content detected in the text.'
  }

  return {
    classification,
    confidence: Math.round(confidence),
    theme: detectedTheme,
    keywords: foundKeywords,
    explanation,
    timestamp: new Date().toISOString()
  }
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [extractedText, setExtractedText] = useState<string>('')

  const handleTextAnalysis = async (text: string) => {
    setIsAnalyzing(true)
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000))
      const analysisResult = analyzeText(text)
      setResult(analysisResult)
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleImageAnalysis = async (imageFile: File) => {
    setIsAnalyzing(true)
    try {
      // Use fast OCR (Google Cloud Vision API simulation)
      const extractedText = await extractTextFromImage(imageFile)
      setExtractedText(extractedText)
      
      if (extractedText) {
        const analysisResult = analyzeText(extractedText)
        setResult(analysisResult)
      } else {
        // No text found in image
        setResult({
          classification: 'Safe',
          confidence: 100,
          theme: 'General',
          keywords: [],
          explanation: 'No text detected in the image.',
          timestamp: new Date().toISOString()
        })
      }
    } catch (error) {
      console.error('Image analysis failed:', error)
      setResult({
        classification: 'Safe',
        confidence: 0,
        theme: 'General',
        keywords: [],
        explanation: 'Failed to process image. Please try again.',
        timestamp: new Date().toISOString()
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">NoBully AI</h1>
            </div>
            <p className="text-sm text-gray-500">Simple Cyberbullying Detection</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Analyze Content
              </h2>
              
              {/* Tab Navigation */}
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
                <button
                  onClick={() => setActiveTab('text')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'text'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  <span>Text Input</span>
                </button>
                <button
                  onClick={() => setActiveTab('image')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'image'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Upload className="h-4 w-4" />
                  <span>Image Upload</span>
                </button>
              </div>

              {/* Input Components */}
              {activeTab === 'text' ? (
                <TextInput 
                  onAnalyze={handleTextAnalysis}
                  isAnalyzing={isAnalyzing}
                />
              ) : (
                <ImageUpload 
                  onAnalyze={handleImageAnalysis}
                  isAnalyzing={isAnalyzing}
                  extractedText={extractedText}
                />
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <ResultsPanel 
              result={result}
              isAnalyzing={isAnalyzing}
              extractedText={extractedText}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>© 2024 NoBully AI. Simple keyword-based cyberbullying detection.</p>
            <p className="mt-2">
              This system analyzes content for harmful keywords and provides educational insights.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 