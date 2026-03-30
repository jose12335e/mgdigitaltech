import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { mockData } from "../data/mockData";
import { motion } from "framer-motion";
import profileImg from "../assets/IMG_7756.jpeg";

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
                src={profileImg} 
                alt="Jose Magdiel Aracena" 
                className="object-cover w-full h-full object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <p className="font-bold text-xl">🚀 +1 Año</p>
                  <p className="text-white/80 text-sm">Desarrollando proyectos digitales</p>
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
            <div className="prose prose-lg dark:prose-invert text-foreground/80 space-y-4">
              <p className="leading-relaxed">
                {about}
              </p>
              <p className="leading-relaxed">
                He desarrollado proyectos como aplicaciones de control de gastos, sistemas de gestión empresarial y plataformas digitales orientadas a mejorar la productividad y organización.
              </p>
              <p className="leading-relaxed">
                Mi enfoque va más allá del código: analizo problemas reales para diseñar soluciones tecnológicas que aporten valor y resultados concretos.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="border-l-2 border-primary-500 pl-4">
                <p className="text-3xl font-bold text-foreground">10+</p>
                <p className="text-sm text-foreground/70 mt-1">Proyectos realizados</p>
              </div>
              <div className="border-l-2 border-primary-500 pl-4">
                <p className="text-3xl font-bold text-foreground">100%</p>
                <p className="text-sm text-foreground/70 mt-1">Compromiso con cada proyecto</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
