import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Building2, CheckCircle, AlertCircle, Plus } from 'lucide-react'
import type { BusinessProfile } from '@/types'

interface ConnectionCardProps {
  profiles: BusinessProfile[]
  onConnect: () => void
}

export function ConnectionCard({ profiles, onConnect }: ConnectionCardProps) {
  const connectedProfiles = profiles.filter(p => p.isConnected)
  const hasConnections = connectedProfiles.length > 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Building2 className="mr-2 h-5 w-5" />
            Business Profiles
          </span>
          <Button onClick={onConnect} size="sm" variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Connect
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!hasConnections ? (
          <div className="text-center py-6">
            <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Business Profiles Connected
            </h3>
            <p className="text-gray-500 mb-4">
              Connect your Google Business Profile to start managing reviews
            </p>
            <Button onClick={onConnect} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Connect Google Business Profile
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {connectedProfiles.map((profile) => (
              <div key={profile.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{profile.name}</p>
                    <p className="text-xs text-gray-500">{profile.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-green-50 text-green-700">
                    {profile.reviewCount} reviews
                  </Badge>
                  <Badge variant="outline">
                    ⭐ {profile.averageRating}
                  </Badge>
                </div>
              </div>
            ))}
            
            {profiles.some(p => !p.isConnected) && (
              <div className="flex items-center justify-between p-3 border border-dashed rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {profiles.filter(p => !p.isConnected).length} profile(s) pending
                    </p>
                    <p className="text-xs text-gray-500">Complete setup to sync reviews</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={onConnect}>
                  Setup
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}