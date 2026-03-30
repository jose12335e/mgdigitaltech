import { useState } from "react";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Mail, MapPin, Phone } from "lucide-react";
import { mockData } from "../data/mockData";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';
import { useTranslation } from "react-i18next";

export function ContactSection() {
  const { t } = useTranslation();
  const { email, phone } = mockData.personalInfo;
  const [formStatus, setFormStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("submitting");

    const formData = new FormData(e.target);

    const templateParams = {
      name: formData.get("name"),
      email: formData.get("email"),
      projectType: formData.get("subject"),
      message: formData.get("message")
    };

    try {
      const response = await emailjs.send(
        'service_pntkso8',
        'template_9h8vrvb',
        templateParams,
        '0u6gw7DoZrcoEnTx3'
      );

      if (response.status === 200) {
        setFormStatus("success");
        e.target.reset();
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        setFormStatus("idle");
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <Container>
        <SectionHeading 
          title={t('contact.subtitle')} 
          subtitle={t('contact.title')} 
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
              <h3 className="text-2xl font-bold text-foreground mb-4">{t('contact.idea')}</h3>
              <p className="text-foreground/70 leading-relaxed mb-8">
                {t('contact.desc')}
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
                  <p className="text-sm font-medium text-foreground/50">{t('contact.location')}</p>
                  <p className="text-lg font-semibold text-foreground">{t('contact.remote')}</p>
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
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">{t('contact.name')}</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      required
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-shadow"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">{t('contact.email')}</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      required
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-shadow"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">{t('contact.subject')}</label>
                  <select 
                    id="subject" 
                    name="subject"
                    defaultValue=""
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-shadow appearance-none"
                    required
                  >
                    <option value="" disabled>{t('contact.subject_placeholder')}</option>
                    <option value="Landing Page corporativa">Landing Page / Web corporativa</option>
                    <option value="Tienda Online (E-commerce)">Tienda Online (E-commerce)</option>
                    <option value="Aplicación Web a medida">{t('contact.subject_web')}</option>
                    <option value="Mantenimiento y Soporte">{t('contact.subject_maint')}</option>
                    <option value="Auditoría / Consultoría SEO">{t('contact.subject_consult')}</option>
                    <option value="Otro tipo de proyecto">{t('contact.subject_other')}</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">{t('contact.message')}</label>
                  <textarea 
                    id="message" 
                    name="message"
                    required
                    rows={4}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-shadow resize-none"
                    placeholder={t('contact.message_placeholder')}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={formStatus === "submitting" || formStatus === "success"}
                >
                  {formStatus === "idle" && t('contact.send')}
                  {formStatus === "submitting" && t('contact.sending')}
                  {formStatus === "success" && t('contact.sent')}
                  {formStatus === "error" && t('contact.error')}
                </Button>
                
                {formStatus === 'success' && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="text-emerald-500 text-sm text-center mt-4 font-medium"
                  >
                    {t('contact.thanks')}
                  </motion.p>
                )}
              </form>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
