'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className={`space-y-6 ${isLoaded ? 'animate-fadeInDown' : 'opacity-0'}`}
          style={{ animationDelay: '0.1s' }}
        >
          <div className="inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/30">
            <p className="text-sm font-medium text-accent">Your Safe Space Awaits</p>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance text-foreground leading-tight">
            Share Your <span className="text-accent">Feelings</span> Anonymously
          </h1>

          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto text-balance leading-relaxed">
            A safe, judgment-free space where you can express your emotions without revealing your identity. Listen to others or share your story.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/auth/signup?role=speaker">
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity transform hover:scale-105 duration-200 cursor-pointer">
                Start Sharing
              </button>
            </Link>
            <Link href="/auth/signup?role=listener">
              <button className="px-8 py-4 bg-card border border-border text-foreground rounded-full font-semibold hover:bg-muted transition-colors cursor-pointer hover:scale-105">
                Start Listening
              </button>
            </Link>
          </div>
        </div>

        <div
          className={`mt-16 ${isLoaded ? 'animate-fadeInUp' : 'opacity-0'}`}
          style={{ animationDelay: '0.3s' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-2xl border border-border hover:border-primary/50 transition-colors">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-bold text-lg mb-2 text-foreground">Completely Anonymous</h3>
              <p className="text-foreground/60 text-sm">No names, no identity reveal. Complete privacy.</p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border hover:border-primary/50 transition-colors">
              <div className="text-3xl mb-3">❤️</div>
              <h3 className="font-bold text-lg mb-2 text-foreground">Real Human Connection</h3>
              <p className="text-foreground/60 text-sm">Connect with people who understand and care.</p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border hover:border-primary/50 transition-colors">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-bold text-lg mb-2 text-foreground">No Data Sharing</h3>
              <p className="text-foreground/60 text-sm">Your data is yours. We never sell or share.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
