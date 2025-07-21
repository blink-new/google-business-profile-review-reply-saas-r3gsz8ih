export interface User {
  id: string
  email: string
  displayName?: string
  avatar?: string
}

export interface BusinessProfile {
  id: string
  name: string
  address: string
  phone?: string
  website?: string
  isConnected: boolean
  lastSyncAt?: string
  reviewCount: number
  averageRating: number
}

export interface Review {
  id: string
  businessProfileId: string
  reviewerName: string
  reviewerAvatar?: string
  rating: number
  text: string
  createdAt: string
  hasReply: boolean
  replyText?: string
  replyCreatedAt?: string
  sentiment: 'positive' | 'neutral' | 'negative'
  aiSuggestion?: string
  status: 'pending' | 'replied' | 'ignored'
}

export interface AIReplyTemplate {
  id: string
  name: string
  tone: 'professional' | 'friendly' | 'casual'
  template: string
  isDefault: boolean
}

export interface SyncStatus {
  isActive: boolean
  lastSync: string
  nextSync: string
  totalReviews: number
  newReviews: number
}