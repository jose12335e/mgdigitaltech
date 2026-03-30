import { useState, useEffect } from "react";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Quote, Loader2, MessageSquarePlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import { TestimonialModal } from "../components/TestimonialModal";

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fallback avatars locally generated based on name
  const getRandomAvatar = (name) => {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${name}&backgroundColor=0ea5e9&textColor=ffffff`;
  };

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setError("No pudimos cargar los testimonios.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <section className="py-24 bg-background relative overflow-hidden" id="Testimonios">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading 
            title="Lo que dicen mis clientes" 
            subtitle="Testimonios reales" 
          />
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
             className="flex-shrink-0"
          >
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2"
            >
              <MessageSquarePlus size={18} /> Dejar una Reseña
            </Button>
          </motion.div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
          </div>
        ) : error ? (
           <div className="text-center text-red-500 py-12 bg-red-50 rounded-lg dark:bg-red-900/10 border border-red-500/20">{error}</div>
        ) : testimonials.length === 0 ? (
           <div className="text-center py-20 px-4 bg-surface rounded-2xl border border-border">
             <MessageSquarePlus className="w-12 h-12 text-primary-500/50 mx-auto mb-4" />
             <h3 className="text-lg font-medium text-foreground mb-2">Aún no hay testimonios disponibles</h3>
             <p className="text-foreground/70 mb-6">Sé el primero en contar tu experiencia trabajando conmigo.</p>
             <Button onClick={() => setIsModalOpen(true)}>Dejar el primer testimonio</Button>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="h-full p-8 relative flex flex-col">
                  <Quote className="absolute top-6 right-6 h-10 w-10 text-primary-500/10 rotate-180" />
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src={getRandomAvatar(testimonial.name)} 
                      alt={testimonial.name} 
                      className="h-14 w-14 rounded-full object-cover ring-2 ring-primary-500/20"
                    />
                    <div>
                      <h4 className="text-base font-bold text-foreground">{testimonial.name}</h4>
                      <span className="text-sm text-primary-600 dark:text-primary-400 block truncate max-w-[200px]" title={testimonial.role}>{testimonial.role}</span>
                    </div>
                  </div>
                  <p className="text-foreground/80 leading-relaxed italic relative z-10 flex-grow text-sm md:text-base">
                    "{testimonial.text}"
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </Container>

      <TestimonialModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchTestimonials}
      />
    </section>
  );
}
