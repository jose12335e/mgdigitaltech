import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { mockData } from "../data/mockData";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const { t } = useTranslation();

  return (
    <section id="faq" className="relative py-24">
      <Container>
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] xl:items-start">
          <div className="xl:sticky xl:top-28">
            <SectionHeading
              alignment="left"
              title={t("faq.title")}
              subtitle={t("faq.subtitle")}
              className="mb-0"
            />

            <div className="mt-6 rounded-[28px] border border-slate-900/8 bg-white/[0.82] p-5 shadow-[0_20px_55px_-42px_rgba(15,23,42,0.25)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-600">
                {t("faq.note_label")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">{t("faq.note_text")}</p>
            </div>
          </div>

          <div className="space-y-4">
            {mockData.faq.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="overflow-hidden rounded-[28px] border border-slate-900/8 bg-white/[0.86] shadow-[0_20px_55px_-42px_rgba(15,23,42,0.24)]"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            isOpen ? "bg-primary-500 shadow-[0_0_12px_rgba(20,201,195,0.7)]" : "bg-slate-300"
                          }`}
                        />
                        <span className="text-lg font-semibold text-slate-950">{t(faq.question)}</span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-slate-500">{t(faq.helper)}</p>
                    </div>

                    <ChevronDown
                      className={`mt-1 h-5 w-5 shrink-0 text-primary-600 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={`faq-panel-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="border-t border-slate-900/8 px-6 py-5 text-sm leading-relaxed text-slate-700">
                          {t(faq.answer)}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
