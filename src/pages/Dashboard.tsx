import { useState, useEffect } from 'react'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { ConnectionCard } from '@/components/dashboard/ConnectionCard'
import { RecentReviews } from '@/components/dashboard/RecentReviews'
import { 
  MessageSquare, 
  Star, 
  TrendingUp, 
  Clock,
  Zap
} from 'lucide-react'
import type { BusinessProfile, Review } from '@/types'

export function Dashboard() {
  const [businessProfiles, setBusinessProfiles] = useState<BusinessProfile[]>([])
  const [recentReviews, setRecentReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      // Mock data for demonstration
      setBusinessProfiles([
        {
          id: '1',
          name: 'Downtown Coffee Shop',
          address: '123 Main St, New York, NY',
          phone: '+1 (555) 123-4567',
          website: 'https://downtowncoffee.com',
          isConnected: true,
          lastSyncAt: new Date().toISOString(),
          reviewCount: 127,
          averageRating: 4.6
        },
        {
          id: '2',
          name: 'Uptown Bakery',
          address: '456 Oak Ave, New York, NY',
          isConnected: false,
          reviewCount: 89,
          averageRating: 4.8
        }
      ])

      setRecentReviews([
        {
          id: '1',
          businessProfileId: '1',
          reviewerName: 'Sarah Johnson',
          reviewerAvatar: '',
          rating: 5,
          text: 'Amazing coffee and great service! The baristas are very knowledgeable and the atmosphere is perfect for working.',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          hasReply: false,
          sentiment: 'positive',
          aiSuggestion: 'Thank you so much for your wonderful review, Sarah! We\'re thrilled to hear you enjoyed our coffee and found our space perfect for working.',
          status: 'pending'
        },
        {
          id: '2',
          businessProfileId: '1',
          reviewerName: 'Mike Chen',
          rating: 4,
          text: 'Good coffee, but the wait time was a bit long during lunch rush.',
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          hasReply: false,
          sentiment: 'neutral',
          aiSuggestion: 'Thank you for your feedback, Mike! We appreciate your patience during our busy lunch hours and are working to improve our service speed.',
          status: 'pending'
        },
        {
          id: '3',
          businessProfileId: '1',
          reviewerName: 'Emily Davis',
          rating: 5,
          text: 'Best latte in the city! Love coming here every morning.',
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          hasReply: true,
          replyText: 'Thank you Emily! We love seeing you every morning too!',
          replyCreatedAt: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
          sentiment: 'positive',
          status: 'replied'
        }
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const handleConnectProfile = () => {
    // Simulate Google OAuth flow
    alert('🔗 Google Business Profile Connection\n\nThis would normally open Google OAuth to connect your business profile. In the demo, this shows how the integration would work!')
    
    // Simulate adding a new connected profile
    setTimeout(() => {
      setBusinessProfiles(prev => [...prev, {
        id: '3',
        name: 'New Business Location',
        address: '789 Demo St, Demo City, DC',
        isConnected: true,
        lastSyncAt: new Date().toISOString(),
        reviewCount: 45,
        averageRating: 4.3
      }])
    }, 1000)
  }

  const handleViewAllReviews = () => {
    window.location.href = '/reviews'
  }

  const totalReviews = businessProfiles.reduce((sum, profile) => sum + profile.reviewCount, 0)
  const averageRating = businessProfiles.length > 0 
    ? businessProfiles.reduce((sum, profile) => sum + profile.averageRating, 0) / businessProfiles.length 
    : 0
  const pendingReviews = recentReviews.filter(r => r.status === 'pending').length
  const responseRate = recentReviews.length > 0 
    ? Math.round((recentReviews.filter(r => r.hasReply).length / recentReviews.length) * 100)
    : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Monitor your review performance and manage AI-powered responses
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Reviews"
          value={totalReviews}
          change="+12%"
          changeType="positive"
          icon={MessageSquare}
          description="vs last month"
        />
        <StatsCard
          title="Average Rating"
          value={averageRating.toFixed(1)}
          change="+0.2"
          changeType="positive"
          icon={Star}
          description="vs last month"
        />
        <StatsCard
          title="Response Rate"
          value={`${responseRate}%`}
          change="+5%"
          changeType="positive"
          icon={TrendingUp}
          description="vs last month"
        />
        <StatsCard
          title="Pending Replies"
          value={pendingReviews}
          icon={Clock}
          description="need attention"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Profiles */}
        <ConnectionCard
          profiles={businessProfiles}
          onConnect={handleConnectProfile}
        />

        {/* AI Quick Actions */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border">
          <div className="flex items-center mb-4">
            <Zap className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">AI Assistant</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Let AI help you craft perfect responses to customer reviews
          </p>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Generate contextual replies
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Maintain consistent tone
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Handle multiple languages
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <RecentReviews
        reviews={recentReviews}
        onViewAll={handleViewAllReviews}
      />
    </div>
  )
}