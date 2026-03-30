import { Code, Smartphone, Globe, Layers, Zap, PenTool } from 'lucide-react';

export const mockData = {
  personalInfo: {
    name: "MGtechAD",
    role: "Senior Frontend Engineer",
    tagline: "Construyendo experiencias digitales escalables, accesibles y visualmente atractivas.",
    about: "Soy un ingeniero de software especializado en el ecosistema React. Me apasiona transformar problemas complejos en interfaces intuitivas y de alto rendimiento. Con más de 5 años de experiencia, ayudo a empresas a escalar sus productos digitales.",
    email: "contacto@mgtechad.com",
    phone: "+34 600 000 000"
  },
  services: [
    {
      id: 1,
      title: "Desarrollo Frontend",
      description: "Construcción de aplicaciones web SPA y SSR utilizando React, Next.js y arquitecturas modernas.",
      icon: Code,
    },
    {
      id: 2,
      title: "Diseño UI/UX Integrado",
      description: "Creación de interfaces limpias y sistemas de diseño coherentes con herramientas como Tailwind CSS.",
      icon: PenTool,
    },
    {
      id: 3,
      title: "Optimización de Rendimiento",
      description: "Auditorías de performance, lazy loading y mejora de métricas Core Web Vitals.",
      icon: Zap,
    },
    {
      id: 4,
      title: "Desarrollo Móvil",
      description: "Aplicaciones multiplataforma con React Native ofreciendo experiencias nativas fluidas.",
      icon: Smartphone,
    },
    {
      id: 5,
      title: "Arquitectura Escalable",
      description: "Diseño de bases de código mantenibles y eficientes preparadas para crecer con tu negocio.",
      icon: Layers,
    },
    {
      id: 6,
      title: "Consultoría y SEO",
      description: "Asesoramiento técnico y estrategias de posicionamiento para aplicaciones modernas.",
      icon: Globe,
    }
  ],
  projects: [
    {
      id: 1,
      title: "E-commerce Dashboard",
      category: "Web App",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      id: 2,
      title: "Fintech Platform",
      category: "SaaS",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      id: 3,
      title: "Health Tracking App",
      category: "Mobile",
      image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80",
      link: "#"
    }
  ],
  process: [
    {
      step: "01",
      title: "Descubrimiento",
      description: "Entendemos tus objetivos, público y requerimientos técnicos en profundidad."
    },
    {
      step: "02",
      title: "Diseño & Prototipado",
      description: "Creamos wireframes y una propuesta visual clara antes de tirar código."
    },
    {
      step: "03",
      title: "Desarrollo Ágil",
      description: "Implementación en sprints con entregas iterativas y feedback continuo."
    },
    {
      step: "04",
      title: "Lanzamiento & Soporte",
      description: "Despliegue a producción, monitoreo y mantenimiento a largo plazo."
    }
  ],
  pricing: [
    {
      id: "basic",
      tier: "Landing Page",
      price: "Desde 990€",
      features: [
        "Diseño personalizado",
        "Responsive design",
        "Formulario de contacto",
        "SEO On-Page básico",
        "1 Mes de soporte"
      ],
      popular: false
    },
    {
      id: "pro",
      tier: "Web App Completa",
      price: "Desde 2.500€",
      features: [
        "Todo lo de Landing Page",
        "Panel de administración",
        "Integración de APIs",
        "Base de datos",
        "3 Meses de soporte prioritario"
      ],
      popular: true
    }
  ],
  testimonials: [
    {
      id: 1,
      name: "Laura Gómez",
      role: "CEO, TechStart",
      text: "El trabajo ha sido impecable. No solo entregó el proyecto a tiempo, sino que la calidad del código superó nuestras expectativas.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 2,
      name: "Carlos Ruiz",
      role: "Product Manager",
      text: "Gran profesional. Su capacidad para entender requerimientos complejos y traducirlos en interfaces sencillas es increíble.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
    }
  ],
  faq: [
    {
      question: "¿Cuánto tarda normalmente un proyecto?",
      answer: "Una landing page puede tomar de 2 a 3 semanas. Aplicaciones web más complejas suelen requerir entre 1 y 3 meses, dependiendo del alcance."
    },
    {
      question: "¿Trabajas con otras tecnologías aparte de React?",
      answer: "Sí, aunque mi especialidad es el ecosistema React (Next.js, Vite, React Native), también tengo experiencia con Vue y Node.js para el backend."
    },
    {
      question: "¿Ofreces mantenimiento después del lanzamiento?",
      answer: "¡Por supuesto! Mis planes superiores incluyen soporte, y también ofrezco planes de mantenimiento mensual personalizados."
    }
  ]
};
