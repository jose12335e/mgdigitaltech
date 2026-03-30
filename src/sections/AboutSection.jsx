import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { mockData } from "../data/mockData";
import { motion } from "framer-motion";

export function AboutSection() {
  const { about } = mockData.personalInfo;

  return (
    <section id="about" className="py-24 bg-surface">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-xl border border-border/50">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" 
                alt="Alex Dev Portrait" 
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <p className="font-bold text-xl">🚀 +5 Años</p>
                  <p className="text-white/80 text-sm">Experiencia creando productos digitales</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading 
              title="Sobre mí" 
              subtitle="Conociendo al desarrollador" 
              alignment="left"
              className="mb-6"
            />
            <div className="prose prose-lg dark:prose-invert text-foreground/80">
              <p className="leading-relaxed">
                {about}
              </p>
              <p className="mt-4 leading-relaxed">
                Mi enfoque no se limita a escribir código, sino a entender las necesidades del negocio para ofrecer soluciones técnicas sólidas que impacten directamente en la conversión y la experiencia del usuario final.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="border-l-2 border-primary-500 pl-4">
                <p className="text-3xl font-bold text-foreground">50+</p>
                <p className="text-sm text-foreground/70 mt-1">Proyectos completados</p>
              </div>
              <div className="border-l-2 border-primary-500 pl-4">
                <p className="text-3xl font-bold text-foreground">100%</p>
                <p className="text-sm text-foreground/70 mt-1">Clientes satisfechos</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
