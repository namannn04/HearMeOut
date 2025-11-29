'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export function CTASection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section id="cta" className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div
          className={`bg-card rounded-3xl border border-primary/30 p-12 md:p-16 text-center space-y-8 ${
            isLoaded ? 'animate-fadeInUp' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.2s' }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Ready to Be Heard?
          </h2>

          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Your lowest moments don't have to be lonely. Join a community that cares, listens, and supports without judgment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/auth/signup?role=speaker">
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity transform hover:scale-105 duration-200">
                Join as Speaker
              </button>
            </Link>
            <Link href="/auth/signup?role=listener">
              <button className="px-8 py-4 bg-accent text-accent-foreground rounded-full font-semibold hover:opacity-90 transition-opacity transform hover:scale-105 duration-200">
                Join as Listener
              </button>
            </Link>
          </div>

          <p className="text-sm text-foreground/50 pt-4">
            Free. Anonymous. Always.
          </p>
        </div>
      </div>
    </section>
  )
}
