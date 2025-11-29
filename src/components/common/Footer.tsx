import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold">♥</span>
              </div>
              <span className="font-bold text-foreground">HearMeOut</span>
            </Link>
            <p className="text-foreground/60 text-sm">
              A safe space for emotional wellness and human connection.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li><Link href="/auth/signup?role=speaker" className="hover:text-primary transition-colors">Speak</Link></li>
              <li><Link href="/auth/signup?role=listener" className="hover:text-primary transition-colors">Listen</Link></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li><a href="#cta" className="hover:text-primary transition-colors">About</a></li>
              <li><Link href="/settings" className="hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link href="/settings" className="hover:text-primary transition-colors">Terms</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a></li>
              <li><Link href="/auth/login" className="hover:text-primary transition-colors">Login</Link></li>
              <li><Link href="/auth/signup" className="hover:text-primary transition-colors">Sign Up</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-center text-foreground/50 text-sm">
            © 2025 HearMeOut. All rights reserved. Your story matters.
          </p>
        </div>
      </div>
    </footer>
  )
}
