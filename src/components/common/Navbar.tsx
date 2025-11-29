'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      const offset = 80 // Height of navbar
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      
      // Close mobile menu after click
      setIsOpen(false)
    }
  }

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">♥</span>
          </div>
          <span className="font-bold text-lg text-foreground hidden sm:inline">HearMeOut</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a 
            href="#features" 
            onClick={(e) => handleSmoothScroll(e, 'features')}
            className="text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            onClick={(e) => handleSmoothScroll(e, 'how-it-works')}
            className="text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            How It Works
          </a>
          <a 
            href="#cta" 
            onClick={(e) => handleSmoothScroll(e, 'cta')}
            className="text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            About
          </a>
          <Link href="/auth/login" className="text-foreground hover:text-primary transition-colors">
            Login
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/onboarding">
            <button className="hidden md:block px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity cursor-pointer">
              Get Started
            </button>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border md:hidden">
            <div className="flex flex-col gap-4 p-4">
              <a 
                href="#features" 
                onClick={(e) => handleSmoothScroll(e, 'features')}
                className="text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                onClick={(e) => handleSmoothScroll(e, 'how-it-works')}
                className="text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                How It Works
              </a>
              <a 
                href="#cta" 
                onClick={(e) => handleSmoothScroll(e, 'cta')}
                className="text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                About
              </a>
              <Link href="/auth/login" onClick={() => setIsOpen(false)} className="text-foreground hover:text-primary transition-colors">
                Login
              </Link>
              <Link href="/onboarding" onClick={() => setIsOpen(false)}>
                <button className="w-full px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity cursor-pointer">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
