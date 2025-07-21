import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Search, 
  Filter, 
  Star, 
  MessageSquare, 
  Send, 
  Edit3,
  CheckCircle,
  Clock
} from 'lucide-react'
import type { Review } from '@/types'

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [editingReply, setEditingReply] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')

  useEffect(() => {
    // Mock data
    setReviews([
      {
        id: '1',
        businessProfileId: '1',
        reviewerName: 'Sarah Johnson',
        reviewerAvatar: '',
        rating: 5,
        text: 'Amazing coffee and great service! The baristas are very knowledgeable and the atmosphere is perfect for working. I come here every day and it never disappoints.',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        hasReply: false,
        sentiment: 'positive',
        aiSuggestion: 'Thank you so much for your wonderful review, Sarah! We\'re thrilled to hear you enjoyed our coffee and found our space perfect for working. We look forward to seeing you again soon!',
        status: 'pending'
      },
      {
        id: '2',
        businessProfileId: '1',
        reviewerName: 'Mike Chen',
        rating: 4,
        text: 'Good coffee, but the wait time was a bit long during lunch rush. The quality is definitely there though.',
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        hasReply: false,
        sentiment: 'neutral',
        aiSuggestion: 'Thank you for your feedback, Mike! We appreciate your patience during our busy lunch hours and are working to improve our service speed while maintaining quality.',
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
      },
      {
        id: '4',
        businessProfileId: '1',
        reviewerName: 'David Wilson',
        rating: 2,
        text: 'Coffee was cold and service was slow. Not impressed.',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        hasReply: false,
        sentiment: 'negative',
        aiSuggestion: 'Thank you for your feedback, David. We sincerely apologize for the poor experience. We\'d love to make this right - please reach out to us directly so we can address your concerns.',
        status: 'pending'
      }
    ])
  }, [])

  const handleApproveReply = (reviewId: string, suggestion: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { 
            ...review, 
            hasReply: true, 
            replyText: suggestion,
            replyCreatedAt: new Date().toISOString(),
            status: 'replied' as const
          }
        : review
    ))
  }

  const handleEditReply = (reviewId: string, currentSuggestion: string) => {
    setEditingReply(reviewId)
    setReplyText(currentSuggestion)
  }

  const handleSaveReply = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { 
            ...review, 
            hasReply: true, 
            replyText: replyText,
            replyCreatedAt: new Date().toISOString(),
            status: 'replied' as const
          }
        : review
    ))
    setEditingReply(null)
    setReplyText('')
  }

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.reviewerName.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (selectedFilter === 'all') return matchesSearch
    if (selectedFilter === 'pending') return matchesSearch && review.status === 'pending'
    if (selectedFilter === 'replied') return matchesSearch && review.status === 'replied'
    if (selectedFilter === 'positive') return matchesSearch && review.sentiment === 'positive'
    if (selectedFilter === 'negative') return matchesSearch && review.sentiment === 'negative'
    
    return matchesSearch
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-50 text-green-700 border-green-200'
      case 'negative': return 'bg-red-50 text-red-700 border-red-200'
      default: return 'bg-yellow-50 text-yellow-700 border-yellow-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
        <p className="text-gray-600">
          Manage customer reviews and AI-generated responses
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'pending', 'replied', 'positive', 'negative'].map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter(filter)}
              className="capitalize"
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Review Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.reviewerAvatar} />
                      <AvatarFallback>
                        {review.reviewerName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{review.reviewerName}</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getSentimentColor(review.sentiment)}>
                      {review.sentiment}
                    </Badge>
                    {review.status === 'replied' ? (
                      <Badge variant="secondary" className="bg-green-50 text-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Replied
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-yellow-50 text-yellow-700">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-700">{review.text}</p>

                {/* Existing Reply */}
                {review.hasReply && review.replyText && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Your Reply</span>
                      <span className="text-xs text-blue-600">
                        {review.replyCreatedAt && new Date(review.replyCreatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-blue-800">{review.replyText}</p>
                  </div>
                )}

                {/* AI Suggestion */}
                {!review.hasReply && review.aiSuggestion && (
                  <div className="bg-gray-50 border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-900">AI Suggested Reply</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditReply(review.id, review.aiSuggestion!)}
                      >
                        <Edit3 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                    
                    {editingReply === review.id ? (
                      <div className="space-y-3">
                        <Textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="min-h-[100px]"
                        />
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleSaveReply(review.id)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <Send className="h-4 w-4 mr-1" />
                            Post Reply
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingReply(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-gray-700">{review.aiSuggestion}</p>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleApproveReply(review.id, review.aiSuggestion!)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve & Post
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditReply(review.id, review.aiSuggestion!)}
                          >
                            <Edit3 className="h-4 w-4 mr-1" />
                            Edit Reply
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
          <p className="text-gray-500">
            {searchQuery ? 'Try adjusting your search or filters' : 'Reviews will appear here once you connect your business profile'}
          </p>
        </div>
      )}
    </div>
  )
}