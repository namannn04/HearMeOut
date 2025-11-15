import { Footer } from '@/components/common/Footer';
import { Navbar } from '@/components/common/Navbar';
import { CTASection } from '@/components/LandingPage/CTASection';
import { FeaturesSection } from '@/components/LandingPage/FeaturesSection';
import { HeroSection } from '@/components/LandingPage/HeroSection';
import { HowItWorksSection } from '@/components/LandingPage/HowItWorksSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </main>
  );
}
