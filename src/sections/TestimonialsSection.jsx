import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, MessageSquarePlus, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TestimonialModal } from "../components/TestimonialModal";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { supabase } from "../lib/supabase";

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const hasTestimonialsBackend = Boolean(supabase);

  const getRandomAvatar = (name) =>
    `https://api.dicebear.com/7.x/initials/svg?seed=${name}&backgroundColor=0ea5e9&textColor=ffffff`;

  const refreshTestimonials = useCallback(async () => {
    if (!supabase) {
      setTestimonials([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setTestimonials(data || []);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setError(t("testimonials.error_load"));
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    refreshTestimonials();
  }, [refreshTestimonials]);

  return (
    <section className="relative overflow-hidden py-24" id="testimonials">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(17,216,210,0.12),transparent_22rem),linear-gradient(180deg,#07101d_0%,#08111f_60%,#060a14_100%)]" />

      <Container className="relative z-10">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading title={t("testimonials.title")} subtitle={t("testimonials.subtitle")} />
          {hasTestimonialsBackend ? (
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
                <MessageSquarePlus size={18} /> {t("testimonials.leave")}
              </Button>
            </motion.div>
          ) : null}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-10 w-10 animate-spin text-primary-300" />
          </div>
        ) : error ? (
          <div className="rounded-[28px] border border-rose-400/15 bg-rose-500/10 py-12 text-center text-rose-200 backdrop-blur-xl">
            {error}
          </div>
        ) : testimonials.length === 0 ? (
          <div className="rounded-[32px] border border-white/8 bg-white/[0.04] px-4 py-20 text-center shadow-[0_20px_60px_-35px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            <MessageSquarePlus className="mx-auto mb-4 h-12 w-12 text-primary-300/65" />
            <h3 className="mb-2 text-lg font-medium text-white">
              {t(hasTestimonialsBackend ? "testimonials.empty_title" : "testimonials.unavailable_title")}
            </h3>
            <p className="mb-6 text-white/62">
              {t(hasTestimonialsBackend ? "testimonials.empty_desc" : "testimonials.unavailable_desc")}
            </p>
            {hasTestimonialsBackend ? (
              <Button onClick={() => setIsModalOpen(true)}>{t("testimonials.leave_first")}</Button>
            ) : null}
          </div>
        ) : (
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="relative flex h-full flex-col bg-white/[0.04] p-8">
                  <Quote className="absolute right-6 top-6 h-10 w-10 rotate-180 text-primary-400/12" />
                  <div className="mb-6 flex items-center gap-4">
                    <img
                      src={getRandomAvatar(testimonial.name)}
                      alt={testimonial.name}
                      loading="lazy"
                      decoding="async"
                      className="h-14 w-14 rounded-full object-cover ring-2 ring-primary-400/30"
                    />
                    <div>
                      <h4 className="text-base font-bold text-white">{testimonial.name}</h4>
                      <span
                        className="block max-w-[200px] truncate text-sm text-primary-300"
                        title={testimonial.role}
                      >
                        {testimonial.role}
                      </span>
                    </div>
                  </div>
                  <p className="relative z-10 flex-grow text-sm italic leading-relaxed text-white/72 md:text-base">
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
        onSuccess={() => refreshTestimonials()}
      />
    </section>
  );
}
