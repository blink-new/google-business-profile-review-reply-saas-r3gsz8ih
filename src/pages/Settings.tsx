import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Settings as SettingsIcon, 
  Building2, 
  Zap, 
  Bell, 
  Shield,
  Trash2,
  Plus,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export function Settings() {
  const [autoReply, setAutoReply] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [replyTone, setReplyTone] = useState('professional')
  const [customTemplate, setCustomTemplate] = useState('')

  const connectedProfiles = [
    {
      id: '1',
      name: 'Downtown Coffee Shop',
      email: 'owner@downtowncoffee.com',
      status: 'connected',
      lastSync: '2 minutes ago'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">
          Manage your account, business profiles, and AI preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Business Profiles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="mr-2 h-5 w-5" />
                Connected Business Profiles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {connectedProfiles.map((profile) => (
                <div key={profile.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium text-gray-900">{profile.name}</p>
                      <p className="text-sm text-gray-500">{profile.email}</p>
                      <p className="text-xs text-gray-400">Last sync: {profile.lastSync}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-green-50 text-green-700">
                      Connected
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Connect Another Profile
              </Button>
            </CardContent>
          </Card>

          {/* AI Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                AI Reply Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto-generate replies</Label>
                  <p className="text-sm text-gray-500">
                    Automatically generate AI replies for new reviews
                  </p>
                </div>
                <Switch
                  checked={autoReply}
                  onCheckedChange={setAutoReply}
                />
              </div>

              <Separator />

              <div className="space-y-3">
                <Label className="text-base">Reply Tone</Label>
                <div className="grid grid-cols-3 gap-3">
                  {['professional', 'friendly', 'casual'].map((tone) => (
                    <Button
                      key={tone}
                      variant={replyTone === tone ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setReplyTone(tone)}
                      className="capitalize"
                    >
                      {tone}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label htmlFor="template" className="text-base">Custom Reply Template</Label>
                <Textarea
                  id="template"
                  placeholder="Add a custom template that AI will use as a base for generating replies..."
                  value={customTemplate}
                  onChange={(e) => setCustomTemplate(e.target.value)}
                  className="min-h-[100px]"
                />
                <p className="text-sm text-gray-500">
                  Use variables like {'{customer_name}'} and {'{business_name}'} for personalization
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email notifications</Label>
                  <p className="text-sm text-gray-500">
                    Get notified when new reviews are received
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Daily summary</Label>
                  <p className="text-sm text-gray-500">
                    Receive a daily summary of review activity
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Urgent alerts</Label>
                  <p className="text-sm text-gray-500">
                    Get immediate alerts for negative reviews
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="user@example.com"
                  disabled
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input
                  id="name"
                  defaultValue="John Doe"
                />
              </div>

              <Button className="w-full">
                Update Profile
              </Button>
            </CardContent>
          </Card>

          {/* Plan Info */}
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Badge className="bg-blue-50 text-blue-700 text-lg px-3 py-1">
                  Pro Plan
                </Badge>
                <p className="text-2xl font-bold text-gray-900 mt-2">$29/month</p>
                <p className="text-sm text-gray-500">Unlimited AI replies</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>AI Replies Used</span>
                  <span>127 / Unlimited</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Business Profiles</span>
                  <span>1 / 5</span>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Manage Billing
              </Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-700">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Permanently delete your account and all associated data.
                </p>
                <Button variant="destructive" size="sm" className="w-full">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700">
          Save Changes
        </Button>
      </div>
    </div>
  )
}