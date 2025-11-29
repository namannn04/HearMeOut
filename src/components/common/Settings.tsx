'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, User, Bell, Shield, Moon, Trash2 } from 'lucide-react'
import { Button, Card } from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'
import { ThemeToggle } from '@/components/theme-toggle'
import type { UserRole } from '@/types/user.types'

export function Settings() {
  const router = useRouter()
  const { user, updateRole, logout } = useAuth()

  const [selectedRole, setSelectedRole] = useState<UserRole | null>(user?.role || null)

  const handleRoleChange = async (newRole: UserRole) => {
    setSelectedRole(newRole)
    try {
      await updateRole(newRole)
      toast.success( 'Role updated successfully')
    } catch (error) {
      toast.error( 'Failed to update role')
    }
  }

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // TODO: Implement account deletion
      toast.info( 'Account deletion requested')
      logout()
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-foreground">Settings</h1>
          </div>

          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold">♥</span>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Account Settings */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Account</h2>
            </div>

            <Card className="divide-y divide-border">
              <div className="p-4">
                <h3 className="font-medium text-foreground mb-1">Your Role</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Choose how you want to use HearMeOut
                </p>
                <div className="flex gap-2">
                  <Button
                    variant={selectedRole === 'speaker' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleRoleChange('speaker')}
                  >
                    Speaker
                  </Button>
                  <Button
                    variant={selectedRole === 'listener' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleRoleChange('listener')}
                  >
                    Listener
                  </Button>
                  <Button
                    variant={selectedRole === 'both' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleRoleChange('both')}
                  >
                    Both
                  </Button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-medium text-foreground mb-1">Account Type</h3>
                <p className="text-sm text-muted-foreground">
                  {user?.isAnonymous ? 'Anonymous Guest' : 'Registered Account'}
                </p>
              </div>
            </Card>
          </section>

          {/* Appearance */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Moon className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
            </div>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground mb-1">Theme</h3>
                  <p className="text-sm text-muted-foreground">
                    Toggle between light and dark mode
                  </p>
                </div>
                <ThemeToggle />
              </div>
            </Card>
          </section>

          {/* Notifications */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
            </div>

            <Card className="divide-y divide-border">
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground mb-1">Match Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Get notified when someone wants to chat
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 text-primary rounded"
                />
              </div>

              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground mb-1">Message Sounds</h3>
                  <p className="text-sm text-muted-foreground">
                    Play sound for new messages
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 text-primary rounded"
                />
              </div>
            </Card>
          </section>

          {/* Privacy & Safety */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Privacy & Safety</h2>
            </div>

            <Card className="divide-y divide-border">
              <div className="p-4">
                <h3 className="font-medium text-foreground mb-1">Chat History</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Manage your saved conversations
                </p>
                <Button variant="outline" size="sm">
                  View Chat History
                </Button>
              </div>

              <div className="p-4">
                <h3 className="font-medium text-foreground mb-1">Blocked Users</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Manage users you've blocked
                </p>
                <Button variant="outline" size="sm">
                  View Blocked List
                </Button>
              </div>
            </Card>
          </section>

          {/* Danger Zone */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Trash2 className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
            </div>

            <Card className="p-4 border-red-500/20 bg-red-500/5">
              <h3 className="font-medium text-foreground mb-1">Delete Account</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button variant="destructive" size="sm" onClick={handleDeleteAccount}>
                Delete My Account
              </Button>
            </Card>
          </section>

          {/* About */}
          <section>
            <Card className="p-4 text-center space-y-2">
              <h3 className="font-semibold text-foreground">HearMeOut</h3>
              <p className="text-sm text-muted-foreground">
                Anonymous mental health support platform
              </p>
              <div className="flex justify-center gap-4 text-sm text-muted-foreground">
                <a href="#" className="hover:text-primary">Terms</a>
                <a href="#" className="hover:text-primary">Privacy</a>
                <a href="#" className="hover:text-primary">Help</a>
              </div>
              <p className="text-xs text-muted-foreground">Version 1.0.0</p>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}
