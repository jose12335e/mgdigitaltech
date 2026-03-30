import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Check } from "lucide-react";
import { mockData } from "../data/mockData";
import { motion } from "framer-motion";

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-surface relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl" />
      
      <Container className="relative z-10">
        <SectionHeading 
          title="Planes Flexibles" 
          subtitle="Inversión transparente" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {mockData.pricing.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`relative h-full flex flex-col p-8 transition-transform hover:-translate-y-2 ${plan.popular ? 'border-primary-500 ring-1 ring-primary-500 shadow-xl shadow-primary-500/10' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 right-8 transform -translate-y-1/2">
                    <span className="bg-primary-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-sm">
                      Más Popular
                    </span>
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.tier}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">{plan.price}</span>
                </div>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground/80">
                      <Check className="h-5 w-5 text-primary-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.popular ? 'primary' : 'outline'} 
                  className="w-full"
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                >
                  Empezar Ahora
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
