import React from 'react';
import { Navbar } from './sections/Navbar';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { PortfolioSection } from './sections/PortfolioSection';
import { ProcessSection } from './sections/ProcessSection';
import { BenefitsSection } from './sections/BenefitsSection';
import { PricingSection } from './sections/PricingSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { FAQSection } from './sections/FAQSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './sections/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { mockData } from './data/mockData';

function App() {
  return (
    <div className="min-h-screen relative font-sans">
      <Navbar />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <BenefitsSection />
        <PortfolioSection />
        <ProcessSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer />
      <FloatingWhatsApp phoneNumber={mockData.personalInfo.phone} />
    </div>
  );
}

export default App;
