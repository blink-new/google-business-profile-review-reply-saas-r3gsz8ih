import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Star,
  MessageSquare,
  Clock,
  Users,
  Calendar
} from 'lucide-react'

export function Analytics() {
  const metrics = [
    {
      title: 'Total Reviews',
      value: '1,247',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: MessageSquare,
      period: 'vs last month'
    },
    {
      title: 'Average Rating',
      value: '4.6',
      change: '+0.2',
      changeType: 'positive' as const,
      icon: Star,
      period: 'vs last month'
    },
    {
      title: 'Response Rate',
      value: '94%',
      change: '+8%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      period: 'vs last month'
    },
    {
      title: 'Avg Response Time',
      value: '2.4h',
      change: '-1.2h',
      changeType: 'positive' as const,
      icon: Clock,
      period: 'vs last month'
    }
  ]

  const reviewsByRating = [
    { rating: 5, count: 847, percentage: 68 },
    { rating: 4, count: 234, percentage: 19 },
    { rating: 3, count: 89, percentage: 7 },
    { rating: 2, count: 45, percentage: 4 },
    { rating: 1, count: 32, percentage: 2 }
  ]

  const monthlyData = [
    { month: 'Jan', reviews: 89, rating: 4.5 },
    { month: 'Feb', reviews: 97, rating: 4.6 },
    { month: 'Mar', reviews: 112, rating: 4.4 },
    { month: 'Apr', reviews: 134, rating: 4.7 },
    { month: 'May', reviews: 156, rating: 4.6 },
    { month: 'Jun', reviews: 178, rating: 4.8 }
  ]

  const topKeywords = [
    { word: 'coffee', count: 234, sentiment: 'positive' },
    { word: 'service', count: 189, sentiment: 'positive' },
    { word: 'atmosphere', count: 156, sentiment: 'positive' },
    { word: 'wait time', count: 89, sentiment: 'negative' },
    { word: 'price', count: 67, sentiment: 'neutral' },
    { word: 'staff', count: 145, sentiment: 'positive' }
  ]

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
      case 'positive': return 'bg-green-50 text-green-700'
      case 'negative': return 'bg-red-50 text-red-700'
      default: return 'bg-yellow-50 text-yellow-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">
          Track your review performance and customer sentiment
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
                <metric.icon className="h-8 w-8 text-gray-400" />
              </div>
              <div className="mt-4 flex items-center">
                {metric.changeType === 'positive' ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">{metric.period}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rating Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="mr-2 h-5 w-5" />
              Rating Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reviewsByRating.map((item) => (
              <div key={item.rating} className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 w-16">
                  <span className="text-sm font-medium">{item.rating}</span>
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 w-16 text-right">
                  {item.count} ({item.percentage}%)
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Monthly Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((month) => (
                <div key={month.month} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium w-8">{month.month}</span>
                    <div className="flex items-center space-x-1">
                      {renderStars(Math.round(month.rating))}
                      <span className="text-sm text-gray-600 ml-2">{month.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{month.reviews} reviews</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(month.reviews / 200) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Keywords */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Top Keywords
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topKeywords.map((keyword) => (
              <div key={keyword.word} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="font-medium">{keyword.word}</span>
                  <Badge className={getSentimentColor(keyword.sentiment)}>
                    {keyword.sentiment}
                  </Badge>
                </div>
                <span className="text-sm text-gray-600">{keyword.count} mentions</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Response Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Response Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-700">94%</p>
                <p className="text-sm text-green-600">Response Rate</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-700">2.4h</p>
                <p className="text-sm text-blue-600">Avg Response Time</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Replied within 1 hour</span>
                <span className="font-medium">67%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Replied within 24 hours</span>
                <span className="font-medium">89%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Replied within 1 week</span>
                <span className="font-medium">94%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Never replied</span>
                <span className="font-medium text-red-600">6%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            AI Reply Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">87%</p>
              <p className="text-sm text-gray-600">AI suggestions approved</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">156</p>
              <p className="text-sm text-gray-600">Replies generated this month</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">4.8</p>
              <p className="text-sm text-gray-600">Avg quality rating</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}