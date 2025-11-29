'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Clock, Bell } from 'lucide-react'
import { Button, Card, Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'
import type { TimerDuration } from '@/types/matching.types'

export function MatchingQueue() {
  const router = useRouter()
  const { user } = useAuth()
  
  const [status, setStatus] = useState<'searching' | 'no-match' | 'matched'>('searching')
  const [showTimerModal, setShowTimerModal] = useState(false)
  const [selectedTimer, setSelectedTimer] = useState<TimerDuration | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)

  const timerOptions: { value: TimerDuration; label: string; description: string }[] = [
    { value: '10min', label: '10 Minutes', description: 'Quick response' },
    { value: '2hr', label: '2 Hours', description: 'Moderate wait' },
    { value: '10hr', label: '10 Hours', description: 'Extended availability' }
  ]

  // Simulate matching search
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)

    // Simulate no match found after 15 seconds for demo
    const matchTimeout = setTimeout(() => {
      setStatus('no-match')
    }, 15000)

    return () => {
      clearInterval(timer)
      clearTimeout(matchTimeout)
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSendNotification = () => {
    if (!selectedTimer) {
      toast.warning( 'Please select a timer duration')
      return
    }

    // TODO: Send notification to listeners
    toast.success( `Notification sent! Expires in ${selectedTimer}`)
    router.push('/dashboard')
  }

  const handleCancel = () => {
    router.push('/dashboard')
  }

  if (status === 'searching') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md p-8 text-center space-y-6">
          <div className="flex justify-center">
            <Loader2 className="w-16 h-16 text-primary animate-spin" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Looking for a listener...</h2>
            <p className="text-muted-foreground">Please wait while we find someone to talk to</p>
          </div>

          <div className="py-4">
            <div className="text-3xl font-mono text-primary">{formatTime(elapsedTime)}</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Searching active listeners...</span>
            </div>
          </div>

          <Button variant="outline" onClick={handleCancel} className="w-full">
            Cancel Search
          </Button>
        </Card>
      </div>
    )
  }

  if (status === 'no-match') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <Bell className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">No listeners available</h2>
            <p className="text-muted-foreground">
              All listeners are currently busy. Would you like to send a notification?
            </p>
          </div>

          <Card className="p-4 bg-blue-500/10 border-blue-500/20">
            <p className="text-sm text-foreground">
              Listeners will receive a notification and can join when available. 
              You'll be notified when someone accepts.
            </p>
          </Card>

          <Button onClick={() => setShowTimerModal(true)} className="w-full">
            Send Notification
          </Button>

          <Button variant="outline" onClick={handleCancel} className="w-full">
            Try Again Later
          </Button>

          {/* Timer Selection Modal */}
          <Dialog open={showTimerModal} onOpenChange={setShowTimerModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Select Timer Duration</DialogTitle>
              </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Choose how long the notification should remain active
              </p>

              <div className="space-y-3">
                {timerOptions.map((option) => (
                  <Card
                    key={option.value}
                    className={`p-4 cursor-pointer transition-all ${
                      selectedTimer === option.value
                        ? 'border-primary border-2'
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedTimer(option.value)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-medium text-foreground">{option.label}</div>
                          <div className="text-sm text-muted-foreground">{option.description}</div>
                        </div>
                      </div>
                      {selectedTimer === option.value && (
                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-primary-foreground text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowTimerModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendNotification}
                  disabled={!selectedTimer}
                  className="flex-1"
                >
                  Send Notification
                </Button>
              </div>
            </div>
            </DialogContent>
          </Dialog>
        </Card>
      </div>
    )
  }

  return null
}
