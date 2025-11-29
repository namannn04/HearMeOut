'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mic, Headphones, UserPlus } from 'lucide-react'
import { Button, Card } from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'
import { UserRole } from '@/types/user.types'

export function RoleSelector() {
  const router = useRouter()
  const { updateRole } = useAuth()
  
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const roles = [
    {
      value: 'speaker' as UserRole,
      icon: Mic,
      title: 'Speaker',
      description: 'Share your feelings and emotions anonymously. Get support from caring listeners.',
      benefits: ['Express yourself freely', 'Get emotional support', 'Stay anonymous', 'No judgment']
    },
    {
      value: 'listener' as UserRole,
      icon: Headphones,
      title: 'Listener',
      description: 'Be there for others who need support. Make a real difference in someone\'s life.',
      benefits: ['Help others feel heard', 'Build empathy', 'Make connections', 'Give back']
    },
    {
      value: 'both' as UserRole,
      icon: UserPlus,
      title: 'Both',
      description: 'Sometimes speak, sometimes listen. Choose your role based on how you feel.',
      benefits: ['Full flexibility', 'Speak when needed', 'Listen when ready', 'Complete experience']
    }
  ]

  const handleContinue = async () => {
    if (!selectedRole) {
      toast.warning( 'Please select a role to continue')
      return
    }

    setIsLoading(true)
    try {
      await updateRole(selectedRole)
      toast.success( 'Role selected successfully!')
      router.push('/dashboard')
    } catch (error) {
      toast.error( 'Failed to update role')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Choose Your Role</h2>
        <p className="text-muted-foreground">How would you like to use HearMeOut?</p>
      </div>

      {/* Role Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {roles.map((role) => {
          const Icon = role.icon
          const isSelected = selectedRole === role.value
          
          return (
            <Card
              key={role.value}
              className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                isSelected
                  ? 'border-primary border-2 shadow-lg'
                  : 'hover:border-primary/50'
              }`}
              onClick={() => setSelectedRole(role.value)}
            >
              <div className="text-center space-y-4">
                {/* Icon */}
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                  isSelected ? 'bg-primary' : 'bg-muted'
                }`}>
                  <Icon className={`w-8 h-8 ${
                    isSelected ? 'text-primary-foreground' : 'text-muted-foreground'
                  }`} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground">{role.title}</h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground">{role.description}</p>

                {/* Benefits */}
                <ul className="space-y-2 text-left">
                  {role.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-0.5">✓</span>
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Selected Indicator */}
                {isSelected && (
                  <div className="pt-2">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                      Selected
                    </span>
                  </div>
                )}
              </div>
            </Card>
          )
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 pt-4">
        <Button
          variant="outline"
          size="lg"
          onClick={() => router.push('/')}
          disabled={isLoading}
        >
          Go Back
        </Button>
        <Button
          size="lg"
          onClick={handleContinue}
          disabled={!selectedRole}
          isLoading={isLoading}
        >
          Continue to Dashboard
        </Button>
      </div>

      {/* Info */}
      <p className="text-center text-sm text-muted-foreground">
        You can always change your role later in settings
      </p>
    </div>
  )
}
