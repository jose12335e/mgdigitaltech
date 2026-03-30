import { Code, Smartphone, Globe, Layers, Zap, PenTool } from 'lucide-react';

export const mockData = {
  personalInfo: {
    name: "Jose Magdiel Aracena",
    email: "mgtechad@gmail.com",
    phone: "849-627-3605"
  },
  services: [
    {
      id: 1,
      title: "services.s1_title",
      description: "services.s1_desc",
      icon: Globe,
    },
    {
      id: 2,
      title: "services.s2_title",
      description: "services.s2_desc",
      icon: Smartphone,
    },
    {
      id: 3,
      title: "services.s3_title",
      description: "services.s3_desc",
      icon: Layers,
    },
    {
      id: 4,
      title: "services.s4_title",
      description: "services.s4_desc",
      icon: Zap,
    }
  ],
  projects: [
    {
      id: 1,
      titleKey: "portfolio.p1_title",
      categoryKey: "portfolio.category_web",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      id: 2,
      titleKey: "portfolio.p2_title",
      categoryKey: "portfolio.category_saas",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      id: 3,
      titleKey: "portfolio.p3_title",
      categoryKey: "portfolio.category_mobile",
      image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80",
      link: "#"
    }
  ],
  process: [
    {
      step: "01",
      title: "process.p1_title",
      description: "process.p1_desc"
    },
    {
      step: "02",
      title: "process.p2_title",
      description: "process.p2_desc"
    },
    {
      step: "03",
      title: "process.p3_title",
      description: "process.p3_desc"
    },
    {
      step: "04",
      title: "process.p4_title",
      description: "process.p4_desc"
    }
  ],
  pricing: [
    {
      id: "basic",
      tierKey: "pricing.p1_tier",
      descKey: "pricing.p1_desc",
      priceOriginalKey: "pricing.p1_price_original",
      pricePromoKey: "pricing.p1_price_promo",
      urgencyKey: "pricing.p1_urgency",
      badgeKey: "pricing.p1_badge",
      ctaKey: "pricing.p1_cta",
      features: [
        "pricing.p1_f1",
        "pricing.p1_f2",
        "pricing.p1_f3",
        "pricing.p1_f4",
        "pricing.p1_f5"
      ],
      popular: false
    },
    {
      id: "pro",
      tierKey: "pricing.p2_tier",
      descKey: "pricing.p2_desc",
      priceOriginalKey: "pricing.p2_price_original",
      pricePromoKey: "pricing.p2_price_promo",
      urgencyKey: "pricing.p2_urgency",
      badgeKey: "pricing.p2_badge",
      ctaKey: "pricing.p2_cta",
      features: [
        "pricing.p2_f1",
        "pricing.p2_f2",
        "pricing.p2_f3",
        "pricing.p2_f4",
        "pricing.p2_f5"
      ],
      popular: true
    }
  ],
  testimonials: [
    // Supabase handles this natively now
  ],
  faq: [
    {
      question: "faq.q1",
      answer: "faq.a1"
    },
    {
      question: "faq.q2",
      answer: "faq.a2"
    },
    {
      question: "faq.q3",
      answer: "faq.a3"
    }
  ]
};
