import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { mockData } from "../data/mockData";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function ProcessSection() {
  const { t } = useTranslation();

  return (
    <section id="process" className="py-24 bg-background">
      <Container>
        <SectionHeading 
          title={t('process.title')} 
          subtitle={t('process.subtitle')} 
        />
        
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          <div className="space-y-12">
            {mockData.process.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-center justify-between flex-col md:flex-row gap-8"
                >
                  <div className={`md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:order-2 md:pl-12'} w-full pl-20 md:pl-0`}>
                    <h3 className="text-2xl font-bold text-foreground mb-3">{t(step.title)}</h3>
                    <p className="text-foreground/70 leading-relaxed md:max-w-md ml-auto mr-auto md:mx-0">
                      {t(step.description)}
                    </p>
                  </div>

                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-14 h-14 rounded-full bg-surface border-4 border-background flex items-center justify-center shadow-lg pt-1 z-10 shadow-primary-500/10 text-primary-600 font-bold">
                    {step.step}
                  </div>

                  <div className={`md:w-1/2 ${isEven ? 'md:order-2' : ''} hidden md:block`} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
