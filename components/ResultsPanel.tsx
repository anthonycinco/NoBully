'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, AlertTriangle, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react'
import { AnalysisResult } from '@/types'

interface ResultsPanelProps {
  result: AnalysisResult | null
  isAnalyzing: boolean
  extractedText: string
}

export default function ResultsPanel({ result, isAnalyzing, extractedText }: ResultsPanelProps) {
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState('')

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600'
    if (confidence >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getThemeColor = (theme: string) => {
    switch (theme) {
      case 'Racial Slurs':
        return 'bg-red-100 text-red-800'
      case 'Gender Slurs':
        return 'bg-purple-100 text-purple-800'
      case 'Suicidal Ideation':
        return 'bg-orange-100 text-orange-800'
      case 'General Bullying':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (isAnalyzing) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Analysis Results</h2>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Analyzing content...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
          </div>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Analysis Results</h2>
        <div className="text-center py-12">
          <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No analysis results yet</p>
          <p className="text-sm text-gray-500 mt-2">
            Submit text or upload an image to get started
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Main Results Card */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Analysis Results</h2>
        
        {/* Classification */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            {result.classification === 'Safe' ? (
              <CheckCircle className="h-6 w-6 text-success-600" />
            ) : (
              <XCircle className="h-6 w-6 text-danger-600" />
            )}
            <span className="text-lg font-semibold text-gray-900">
              {result.classification}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {result.explanation}
          </p>
        </div>

        {/* Confidence Score */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Confidence Score</h3>
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  result.confidence >= 80 ? 'bg-success-500' :
                  result.confidence >= 60 ? 'bg-yellow-500' : 'bg-danger-500'
                }`}
                style={{ width: `${result.confidence}%` }}
              ></div>
            </div>
            <span className={`text-sm font-medium ${getConfidenceColor(result.confidence)}`}>
              {result.confidence}%
            </span>
          </div>
        </div>

        {/* Theme */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Detected Theme</h3>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getThemeColor(result.theme)}`}>
            {result.theme}
          </span>
        </div>

        {/* Keywords */}
        {result.keywords.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Key Phrases Detected</h3>
            <div className="flex flex-wrap gap-2">
              {result.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Timestamp */}
        <div className="text-xs text-gray-500">
          Analyzed on {new Date(result.timestamp).toLocaleString()}
        </div>
      </div>

      {/* Feedback Section */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Help Improve Our AI</h3>
        <p className="text-sm text-gray-600 mb-4">
          Was this analysis accurate? Your feedback helps us improve our detection model.
        </p>
        
        {!showFeedback ? (
          <div className="flex space-x-3">
            <button
              onClick={() => setShowFeedback(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
            >
              <ThumbsUp className="h-4 w-4" />
              <span>Accurate</span>
            </button>
            <button
              onClick={() => setShowFeedback(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              <ThumbsDown className="h-4 w-4" />
              <span>Inaccurate</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Please provide additional details about why this analysis was accurate or inaccurate..."
              className="input-field min-h-[80px] resize-none"
            />
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  // TODO: Submit feedback to backend
                  setShowFeedback(false)
                  setFeedback('')
                }}
                className="btn-primary"
              >
                Submit Feedback
              </button>
              <button
                onClick={() => {
                  setShowFeedback(false)
                  setFeedback('')
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Educational Content */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">About Cyberbullying</h3>
        <div className="space-y-3 text-sm text-gray-600">
          <p>
            Cyberbullying includes any form of harassment, intimidation, or abuse that occurs online. 
            This can include:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Racial slurs and discriminatory language</li>
            <li>Gender-based harassment and slurs</li>
            <li>Suicidal ideation and self-harm content</li>
            <li>General bullying and abusive behavior</li>
          </ul>
          <p className="mt-4 text-xs text-gray-500">
            If you or someone you know is experiencing cyberbullying, please reach out to appropriate 
            support services or authorities.
          </p>
        </div>
      </div>
    </div>
  )
} 