import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  LayoutDashboard, 
  MessageSquare, 
  Settings, 
  Building2,
  BarChart3,
  Zap
} from 'lucide-react'

interface SidebarProps {
  className?: string
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Reviews',
    href: '/reviews',
    icon: MessageSquare,
    badge: '12',
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
]

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className={cn('flex h-full w-64 flex-col bg-gray-50 border-r', className)}>
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <nav className="mt-5 flex-1 space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Button
                key={item.name}
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  isActive 
                    ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}
                onClick={() => navigate(item.href)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span className="flex-1 text-left">{item.name}</span>
                {item.badge && (
                  <Badge 
                    variant="secondary" 
                    className="ml-auto bg-blue-100 text-blue-700"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Button>
            )
          })}
        </nav>

        {/* Upgrade Card */}
        <div className="mx-2 mt-6 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
          <div className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            <div className="flex-1">
              <p className="text-sm font-medium">Upgrade to Pro</p>
              <p className="text-xs text-blue-100">Unlimited AI replies</p>
            </div>
          </div>
          <Button 
            size="sm" 
            className="mt-3 w-full bg-white text-blue-600 hover:bg-gray-100"
          >
            Upgrade
          </Button>
        </div>
      </div>
    </div>
  )
}