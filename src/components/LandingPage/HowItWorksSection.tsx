'use client'

import { useEffect, useState } from 'react'

export function HowItWorksSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section id="how-it-works" className="py-20 px-4 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-lg text-foreground/60">Simple, secure, and supportive in just a few steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-8 ${isLoaded ? 'animate-slideInLeft' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s' }}
          >
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Create Your Account</h3>
                <p className="text-foreground/60">Sign up with minimal information. No personal details required.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Choose Your Role</h3>
                <p className="text-foreground/60">Decide if you want to Share your feelings or Listen to others.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Connect Anonymously</h3>
                <p className="text-foreground/60">Get randomly matched with listeners or share your story.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Feel Lighter</h3>
                <p className="text-foreground/60">Experience genuine support and human connection without fear.</p>
              </div>
            </div>
          </div>

          <div
            className={`${isLoaded ? 'animate-slideInRight' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s' }}
          >
            <div className="bg-linear-to-br from-primary/10 to-accent/10 rounded-2xl p-12 border border-primary/20">
              <div className="space-y-6">
                <div className="aspect-square bg-primary/20 rounded-xl flex items-center justify-center">
                  <span className="text-6xl">✨</span>
                </div>
                <p className="text-center text-foreground/70 font-medium">
                  Your journey to emotional wellness starts here. Be heard, be understood, be supported.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
