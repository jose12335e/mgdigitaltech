import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { mockData } from "./data/mockData";
import { FAQSection } from "./sections/FAQSection";
import { Footer } from "./sections/Footer";
import { HeroSection } from "./sections/HeroSection";
import { ContactSection } from "./sections/ContactSection";
import { Navbar } from "./sections/Navbar";
import { ProcessSection } from "./sections/ProcessSection";
import { ServicesSection } from "./sections/ServicesSection";

function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const language = i18n.resolvedLanguage?.startsWith("en") ? "en" : "es";
    const title = t("seo.title");
    const description = t("seo.description");
    const metaMap = {
      'meta[name="description"]': description,
      'meta[property="og:title"]': title,
      'meta[property="og:description"]': description,
      'meta[name="twitter:title"]': title,
      'meta[name="twitter:description"]': description,
    };

    document.documentElement.lang = language;
    document.title = title;

    Object.entries(metaMap).forEach(([selector, content]) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute("content", content);
      }
    });
  }, [i18n.resolvedLanguage, t]);

  return (
    <div className="relative min-h-screen font-sans">
      <Navbar />

      <main>
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer />
      <FloatingWhatsApp phoneNumber={mockData.personalInfo.phone} />
    </div>
  );
}

export default App;
