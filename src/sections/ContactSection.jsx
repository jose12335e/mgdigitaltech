import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Mail, MapPin, Phone } from "lucide-react";
import { mockData } from "../data/mockData";
import { motion } from "framer-motion";

export function ContactSection() {
  const { email, phone } = mockData.personalInfo;

  return (
    <section id="contact" className="py-24 bg-background">
      <Container>
        <SectionHeading 
          title="Hablemos de tu proyecto" 
          subtitle="Contacto" 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">¿Tienes una idea en mente?</h3>
              <p className="text-foreground/70 leading-relaxed mb-8">
                Estoy disponible para proyectos freelance, consultoría o para unirme a un gran equipo. Escríbeme y responderé en menos de 24 horas.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground/50">Email</p>
                  <a href={`mailto:${email}`} className="text-lg font-semibold text-foreground hover:text-primary-600 transition-colors">
                    {email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground/50">Teléfono</p>
                  <a href={`tel:${phone.replace(/\\s/g, '')}`} className="text-lg font-semibold text-foreground hover:text-primary-600 transition-colors">
                    {phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground/50">Ubicación</p>
                  <p className="text-lg font-semibold text-foreground">Remoto / Worldwide</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">Nombre</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-shadow"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-shadow"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">Asunto</label>
                  <select 
                    id="subject" 
                    defaultValue=""
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-shadow appearance-none"
                    required
                  >
                    <option value="" disabled>¿De qué trata tu proyecto?</option>
                    <option value="Landing Page corporativa">Landing Page / Web corporativa</option>
                    <option value="Tienda Online (E-commerce)">Tienda Online (E-commerce)</option>
                    <option value="Aplicación Web a medida">Aplicación Web a medida</option>
                    <option value="Mantenimiento y Soporte">Mantenimiento y Soporte</option>
                    <option value="Auditoría / Consultoría SEO">Auditoría / Consultoría SEO</option>
                    <option value="Otro tipo de proyecto">Otro tipo de proyecto</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">Mensaje</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-shadow resize-none"
                    placeholder="Cuéntame más sobre tu idea..."
                  />
                </div>
                
                <Button type="submit" className="w-full" size="lg">
                  Enviar Mensaje
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
