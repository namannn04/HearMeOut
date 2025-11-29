import type { Metadata } from 'next'
import Link from 'next/link'
import { RoleSelector } from '@/components/onboarding/RoleSelector'

export const metadata: Metadata = {
  title: 'Choose Your Role - HearMeOut',
  description: 'Select how you want to use HearMeOut',
}

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-6xl space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">♥</span>
            </div>
            <span className="font-bold text-2xl text-foreground">HearMeOut</span>
          </Link>
        </div>

        {/* Role Selector */}
        <RoleSelector />
      </div>
    </div>
  )
}
