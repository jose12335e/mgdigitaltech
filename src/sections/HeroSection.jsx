import { motion } from "framer-motion";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { mockData } from "../data/mockData";
import { useTranslation } from "react-i18next";

export function HeroSection() {
  const { name, role, tagline } = mockData.personalInfo;
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl opacity-50 dark:opacity-20 animate-pulse" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl opacity-50 dark:opacity-20 animate-pulse animation-delay-2000" />
      
      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border/50 text-sm font-medium mb-8 shadow-sm backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          {t('hero.available')}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6"
        >
          {t('hero.greeting', { name: name })} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">
            {t('personal.role')}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-foreground/70 max-w-2xl mb-10 leading-relaxed"
        >
          {t('personal.tagline')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button size="lg" className="group" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
            {t('hero.cta')}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
            {t('hero.portfolio')}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/50 animate-bounce"
        >
          <span className="text-sm font-medium">{t('hero.scroll')}</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </Container>
    </section>
  );
}
