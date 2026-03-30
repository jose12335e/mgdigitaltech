import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Card } from "../components/ui/Card";
import { Code2, MonitorSmartphone, Rocket, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function BenefitsSection() {
  const benefits = [
    {
      title: "Código Escalable",
      description: "Arquitectura limpia y componentes modulares listos para crecer.",
      icon: Code2
    },
    {
      title: "Diseño Responsive",
      description: "Experiencias fluidas en cualquier dispositivo, móvil o escritorio.",
      icon: MonitorSmartphone
    },
    {
      title: "Rendimiento Óptimo",
      description: "Auditorías de Core Web Vitals y tiempos de carga rápidos.",
      icon: Rocket
    },
    {
      title: "Seguridad y Calidad",
      description: "Buenas prácticas, tipado y manejo correcto de datos.",
      icon: ShieldCheck
    }
  ];

  return (
    <section className="py-24 bg-surface">
      <Container>
        <SectionHeading 
          title="Por qué elegirme" 
          subtitle="Valor añadido" 
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full p-6 text-center group hover:border-primary-500/50">
                  <div className="mx-auto h-12 w-12 rounded-full bg-background flex items-center justify-center mb-4 text-foreground/70 group-hover:text-primary-500 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 transition-all duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">{benefit.title}</h4>
                  <p className="text-sm text-foreground/70">{benefit.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
