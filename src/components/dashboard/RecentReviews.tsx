import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MessageSquare, Star, Clock, ArrowRight } from 'lucide-react'
import type { Review } from '@/types'

interface RecentReviewsProps {
  reviews: Review[]
  onViewAll: () => void
}

export function RecentReviews({ reviews, onViewAll }: RecentReviewsProps) {
  const getStatusColor = (status: Review['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-700'
      case 'replied':
        return 'bg-green-50 text-green-700'
      case 'ignored':
        return 'bg-gray-50 text-gray-700'
      default:
        return 'bg-gray-50 text-gray-700'
    }
  }

  const getSentimentColor = (sentiment: Review['sentiment']) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600'
      case 'negative':
        return 'text-red-600'
      case 'neutral':
        return 'text-gray-600'
      default:
        return 'text-gray-600'
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            Recent Reviews
          </span>
          <Button onClick={onViewAll} size="sm" variant="outline">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {reviews.length === 0 ? (
          <div className="text-center py-6">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Reviews Yet
            </h3>
            <p className="text-gray-500">
              Reviews will appear here once you connect your business profile
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.slice(0, 5).map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={review.reviewerAvatar} />
                    <AvatarFallback>
                      {review.reviewerName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-900">
                          {review.reviewerName}
                        </p>
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="secondary" 
                          className={getStatusColor(review.status)}
                        >
                          {review.status}
                        </Badge>
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {review.text}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="outline" 
                        className={getSentimentColor(review.sentiment)}
                      >
                        {review.sentiment}
                      </Badge>
                      
                      {review.status === 'pending' && review.aiSuggestion && (
                        <Button size="sm" variant="outline">
                          View AI Reply
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}