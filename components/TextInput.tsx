'use client'

import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'

interface TextInputProps {
  onAnalyze: (text: string) => Promise<void>
  isAnalyzing: boolean
}

export default function TextInput({ onAnalyze, isAnalyzing }: TextInputProps) {
  const [text, setText] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim() && !isAnalyzing) {
      await onAnalyze(text.trim())
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-2">
          Enter text to analyze
        </label>
        <textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type the text you want to analyze for cyberbullying content..."
          className="input-field min-h-[120px] resize-none"
          disabled={isAnalyzing}
        />
        <p className="text-xs text-gray-500 mt-1">
          The AI will analyze this text for harmful content including racial slurs, gender-based harassment, 
          suicidal ideation, and general bullying behavior.
        </p>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!text.trim() || isAnalyzing}
        className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Analyzing...</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            <span>Analyze Text</span>
          </>
        )}
      </button>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">What we detect:</h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Racial slurs and discriminatory language</li>
          <li>• Gender-based harassment and slurs</li>
          <li>• Suicidal ideation and self-harm content</li>
          <li>• General bullying and abusive behavior</li>
        </ul>
      </div>
    </div>
  )
} 