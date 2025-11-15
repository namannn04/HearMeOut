'use client'

import { useEffect, useState } from 'react'

export function FeaturesSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const features = [
    {
      icon: '🎤',
      title: 'Speak',
      description: 'Share your story, feelings, and emotions anonymously. Unburden yourself without fear of judgment or exposure.',
    },
    {
      icon: '👂',
      title: 'Listen',
      description: 'Be there for others. Connect with people who need support. Make a real difference in someone\'s life.',
    },
    {
      icon: '🤝',
      title: 'Connect',
      description: 'Get randomly matched with listeners. Receive genuine support from real people who care.',
    },
    {
      icon: '💪',
      title: 'Empower',
      description: 'Build a community based on empathy. Help others feel lighter and less alone.',
    },
  ]

  return (
    <section id="features" className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Why Choose HearMeOut?</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            A platform designed for emotional wellness with your privacy and comfort at its core.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-card p-8 rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 ${
                isLoaded ? 'animate-fadeInUp' : 'opacity-0'
              }`}
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-bold text-xl mb-3 text-foreground">{feature.title}</h3>
              <p className="text-foreground/60 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
