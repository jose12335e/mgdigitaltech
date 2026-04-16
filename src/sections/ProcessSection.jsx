import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { mockData } from "../data/mockData";

export function ProcessSection() {
  const { t } = useTranslation();

  return (
    <section id="process" className="relative py-24">
      <Container>
        <SectionHeading title={t("trust.title")} subtitle={t("trust.subtitle")} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {mockData.trust.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Card className="h-full rounded-[30px] bg-white/[0.84] p-7">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-950">{t(item.titleKey)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{t(item.descriptionKey)}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="mt-8 rounded-[32px] border border-slate-900/8 bg-[#f8f5ee] p-6 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.25)]"
        >
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-600">
                {t("trust.process_label")}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-slate-950">
                {t("trust.process_title")}
              </h3>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600">{t("trust.process_desc")}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {mockData.processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className="rounded-[24px] border border-slate-900/8 bg-white/78 p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                      0{index + 1}
                    </span>
                    <Icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-950">{t(step.titleKey)}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{t(step.descriptionKey)}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
