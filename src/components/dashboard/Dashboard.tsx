'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Button, Card } from '@/components/ui'
import { Mic, Headphones, Settings, LogOut, MessageSquare, Heart } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function Dashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  const speakerActions = [
    {
      icon: Mic,
      title: 'Start Sharing',
      description: 'Find a listener to talk to',
      href: '/speaker/queue',
      color: 'bg-primary'
    },
    {
      icon: MessageSquare,
      title: 'My Conversations',
      description: 'View saved chats',
      href: '/chat/history',
      color: 'bg-blue-500'
    }
  ]

  const listenerActions = [
    {
      icon: Headphones,
      title: 'Start Listening',
      description: 'Help someone who needs support',
      href: '/listener/queue',
      color: 'bg-green-500'
    },
    {
      icon: Heart,
      title: 'My Impact',
      description: 'See who you\'ve helped',
      href: '/listener/stats',
      color: 'bg-pink-500'
    }
  ]

  const getActions = () => {
    if (user?.role === 'speaker') return speakerActions
    if (user?.role === 'listener') return listenerActions
    return [...speakerActions, ...listenerActions]
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">♥</span>
            </div>
            <span className="font-bold text-xl text-foreground">HearMeOut</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/settings">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-foreground">
              Welcome {user?.isAnonymous && 'Anonymous User'}!
            </h1>
            <p className="text-muted-foreground">
              {user?.role === 'speaker' && 'Ready to share what\'s on your mind?'}
              {user?.role === 'listener' && 'Ready to make a difference?'}
              {user?.role === 'both' && 'What would you like to do today?'}
            </p>
          </div>

          {/* Role Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              {user?.role === 'speaker' && <Mic className="w-4 h-4 text-primary" />}
              {user?.role === 'listener' && <Headphones className="w-4 h-4 text-primary" />}
              <span className="text-primary font-medium capitalize">{user?.role}</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            {getActions().map((action) => {
              const Icon = action.icon
              return (
                <Link key={action.title} href={action.href}>
                  <Card className="p-6 hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer h-full">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className={`w-16 h-16 ${action.color} rounded-full flex items-center justify-center`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-foreground">{action.title}</h3>
                        <p className="text-muted-foreground text-sm">{action.description}</p>
                      </div>
                      <Button variant="outline" className="w-full">
                        Get Started
                      </Button>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-4 bg-blue-500/10 border-blue-500/20">
              <div className="text-center space-y-1">
                <div className="text-2xl font-bold text-blue-600">100%</div>
                <div className="text-sm text-muted-foreground">Anonymous</div>
              </div>
            </Card>
            <Card className="p-4 bg-green-500/10 border-green-500/20">
              <div className="text-center space-y-1">
                <div className="text-2xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-muted-foreground">Available</div>
              </div>
            </Card>
            <Card className="p-4 bg-purple-500/10 border-purple-500/20">
              <div className="text-center space-y-1">
                <div className="text-2xl font-bold text-purple-600">Safe</div>
                <div className="text-sm text-muted-foreground">& Secure</div>
              </div>
            </Card>
          </div>

          {/* Safety Notice */}
          <Card className="p-6 bg-yellow-500/10 border-yellow-500/20">
            <div className="flex items-start gap-3">
              <div className="text-yellow-600 text-xl">⚠️</div>
              <div className="space-y-1">
                <h4 className="font-semibold text-foreground">Important Reminder</h4>
                <p className="text-sm text-muted-foreground">
                  Never share personal information like your name, address, phone number, or social media handles. 
                  If you're experiencing a crisis, please contact local emergency services or a crisis helpline.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
