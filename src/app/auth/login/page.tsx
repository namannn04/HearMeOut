import type { Metadata } from 'next'
import Link from 'next/link'
import { LoginForm } from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Login - HearMeOut',
  description: 'Sign in to your HearMeOut account',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md space-y-8">
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 justify-center">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">♥</span>
            </div>
            <span className="font-bold text-2xl text-foreground">HearMeOut</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mt-4">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to continue your journey</p>
        </div>

        {/* Login Form */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          <LoginForm />
        </div>

        {/* Anonymous Option */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Want to remain completely anonymous?
          </p>
          <Link
            href="/auth/anonymous"
            className="text-primary hover:underline font-medium"
          >
            Continue as Guest →
          </Link>
        </div>
      </div>
    </div>
  )
}
