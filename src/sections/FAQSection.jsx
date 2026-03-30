import { useState } from "react";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { mockData } from "../data/mockData";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-surface">
      <Container>
        <SectionHeading 
          title={t('faq.title')} 
          subtitle={t('faq.subtitle')} 
        />
        
        <div className="max-w-3xl mx-auto space-y-4">
          {mockData.faq.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-border rounded-xl bg-background overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                >
                  <span className="font-semibold text-foreground md:text-lg">{t(faq.question)}</span>
                  <ChevronDown 
                    className={`h-5 w-5 text-primary-500 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 pt-0 text-foreground/70 leading-relaxed">
                        {t(faq.answer)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
