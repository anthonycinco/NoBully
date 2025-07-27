export interface AnalysisResult {
  classification: 'Cyberbullying' | 'Safe'
  confidence: number
  theme: string
  keywords: string[]
  explanation: string
  timestamp: string
}

export interface FeedbackData {
  resultId: string
  isCorrect: boolean
  userComment?: string
  timestamp: string
} 