import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Check } from "lucide-react";
import { mockData } from "../data/mockData";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function PricingSection() {
  const { t } = useTranslation();

  return (
    <section id="pricing" className="py-24 bg-surface relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl" />
      
      <Container className="relative z-10">
        <SectionHeading 
          title={t('pricing.title')} 
          subtitle={t('pricing.subtitle')} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {mockData.pricing.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4 z-10' : 'z-0 mt-4 h-full'}`}
            >
              {/* Glow effect for popular plan */}
              {plan.popular && (
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-accent-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              )}
              
              <Card className={`relative h-full flex flex-col p-8 transition-all hover:-translate-y-2 border ${plan.popular ? 'border-primary-500 shadow-2xl shadow-primary-500/20 bg-surface/90 backdrop-blur-sm' : 'border-border/50 hover:border-primary-500/30 shadow-lg'}`}>
                
                {/* Visual Badges Container */}
                <div className="absolute top-0 right-6 transform -translate-y-1/2 flex gap-2">
                  <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-[10px] md:text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-full shadow-lg border border-white/10">
                    {t(plan.badgeKey)}
                  </span>
                  {plan.popular && (
                    <span className="bg-primary-600 shadow-lg shadow-primary-500/30 border border-primary-400/30 text-white text-[10px] md:text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-full">
                      {t('pricing.popular')}
                    </span>
                  )}
                </div>
                
                {/* Header info */}
                <div className="mb-6 pt-4">
                  <h3 className="text-2xl font-extrabold text-foreground mb-3">{t(plan.tierKey)}</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed min-h-[40px]">
                    {t(plan.descKey)}
                  </p>
                </div>
                
                {/* Pricing Block */}
                <div className="mb-8 p-6 rounded-xl bg-background/50 border border-border/50">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground/50 line-through mb-1">
                      {t(plan.priceOriginalKey)}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500 tracking-tight">
                        {t(plan.pricePromoKey)}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-rose-500/90 mt-3 flex items-center gap-1.5 bg-rose-500/10 w-fit px-2.5 py-1 rounded-md">
                      {t(plan.urgencyKey)}
                    </p>
                  </div>
                </div>
                
                {/* Features List */}
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground/80 group">
                      <div className="bg-primary-500/10 p-0.5 rounded-full mt-0.5 group-hover:bg-primary-500/20 transition-colors">
                        <Check className="h-4 w-4 text-primary-500 shrink-0" strokeWidth={3} />
                      </div>
                      <span className="text-sm font-medium">{t(feature)}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA Button */}
                <div className="pt-2 mt-auto">
                  <Button 
                    variant={plan.popular ? 'primary' : 'outline'} 
                    className={`w-full group overflow-hidden relative shadow-lg ${plan.popular ? 'shadow-primary-500/30' : ''}`}
                    onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                    size="lg"
                  >
                    <span className="relative z-10 flex items-center gap-2 font-bold tracking-wide">
                      {t(plan.ctaKey)}
                    </span>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
