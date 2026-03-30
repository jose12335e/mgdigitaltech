import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Card } from "../components/ui/Card";
import { mockData } from "../data/mockData";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 bg-surface">
      <Container>
        <SectionHeading 
          title="Casos de Éxito" 
          subtitle="Proyectos destacados" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockData.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="group overflow-hidden">
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                    <a 
                      href={project.link}
                      className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                    >
                      Ver Proyecto <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
