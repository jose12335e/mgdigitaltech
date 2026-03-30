import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Card } from "../components/ui/Card";
import { mockData } from "../data/mockData";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Code2, MonitorSmartphone, Rocket, ShieldCheck } from "lucide-react";

export function ServicesSection() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const benefits = [
    {
      title: t('benefits.b1_title'),
      description: t('benefits.b1_desc'),
      icon: Code2
    },
    {
      title: t('benefits.b2_title'),
      description: t('benefits.b2_desc'),
      icon: MonitorSmartphone
    },
    {
      title: t('benefits.b3_title'),
      description: t('benefits.b3_desc'),
      icon: Rocket
    },
    {
      title: t('benefits.b4_title'),
      description: t('benefits.b4_desc'),
      icon: ShieldCheck
    }
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <Container>
        <SectionHeading 
          title={t('services.title')} 
          subtitle={t('services.subtitle')} 
        />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mockData.services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.id} variants={itemVariants}>
                <Card className="h-full p-8 group hover:-translate-y-1">
                  <div className="h-12 w-12 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{t(service.title)}</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {t(service.description)}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* --- BENEFITS SECTION (Merged) --- */}
        <div className="mt-24 pt-16 border-t border-border/50">
          <SectionHeading 
            title={t('benefits.title')}
            subtitle={t('benefits.subtitle')}
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
                    <div className="mx-auto h-12 w-12 rounded-full bg-surface flex items-center justify-center mb-4 text-foreground/70 group-hover:text-primary-500 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 transition-all duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2">{benefit.title}</h4>
                    <p className="text-sm text-foreground/70">{benefit.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

      </Container>
    </section>
  );
}
