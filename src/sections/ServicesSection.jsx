import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { mockData } from "../data/mockData";

export function ServicesSection() {
  const { t } = useTranslation();

  const handleOfferClick = (subjectValue) => {
    window.dispatchEvent(new CustomEvent("offer:selected", { detail: { subjectValue } }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="relative py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,0.22fr)] lg:items-end">
          <SectionHeading
            alignment="left"
            title={t("offers.title")}
            subtitle={t("offers.subtitle")}
            className="mb-0"
          />

          <div className="rounded-[26px] border border-slate-900/8 bg-white/[0.78] px-5 py-5 shadow-[0_18px_50px_-38px_rgba(15,23,42,0.26)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-600">
              {t("offers.note_label")}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{t("offers.note_text")}</p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-3">
          {mockData.offers.map((offer, index) => {
            const Icon = offer.icon;
            const isFeatured = offer.id === "website";

            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Card
                  className={`flex h-full flex-col rounded-[32px] p-7 ${
                    isFeatured
                      ? "border-white/8 bg-[#09111f] text-white shadow-[0_28px_80px_-44px_rgba(15,23,42,0.72)]"
                      : "border-slate-900/8 bg-white/[0.9]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${
                            isFeatured
                              ? "border border-primary-400/18 bg-primary-500/10 text-primary-200"
                              : "border border-slate-900/8 bg-slate-950/4 text-slate-500"
                          }`}
                        >
                          {t("offers.card_label")}
                        </span>
                        {isFeatured ? (
                          <span className="rounded-full border border-primary-400/18 bg-primary-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-200">
                            {t("offers.featured_badge")}
                          </span>
                        ) : null}
                      </div>

                      <h3
                        className={`mt-5 text-[1.8rem] font-bold leading-tight ${
                          isFeatured ? "text-white" : "text-slate-950"
                        }`}
                      >
                        {t(offer.nameKey)}
                      </h3>
                      <p
                        className={`mt-3 max-w-[32rem] text-sm leading-relaxed ${
                          isFeatured ? "text-white/68" : "text-slate-700"
                        }`}
                      >
                        {t(offer.promiseKey)}
                      </p>
                    </div>

                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                        isFeatured
                          ? "border border-primary-400/20 bg-primary-500/10 text-primary-200"
                          : "border border-slate-900/8 bg-slate-950/[0.03] text-slate-700"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div
                    className={`mt-7 grid gap-3 rounded-[24px] p-5 ${
                      isFeatured
                        ? "border border-white/8 bg-white/[0.04]"
                        : "border border-slate-900/8 bg-[#f8f5ed]"
                    }`}
                  >
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p
                          className={`text-xs font-semibold uppercase tracking-[0.22em] ${
                            isFeatured ? "text-white/42" : "text-slate-500"
                          }`}
                        >
                          {t("offers.starting_label")}
                        </p>
                        <p
                          className={`mt-2 text-[clamp(1.7rem,3.2vw,2.2rem)] font-bold leading-tight ${
                            isFeatured ? "text-white" : "text-slate-950"
                          }`}
                        >
                          {t(offer.startingPriceKey)}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                          isFeatured ? "bg-white text-slate-950" : "bg-slate-950 text-white"
                        }`}
                      >
                        {t(offer.timelineKey)}
                      </span>
                    </div>

                    <p className={`text-sm leading-relaxed ${isFeatured ? "text-white/68" : "text-slate-700"}`}>
                      {t(offer.descriptionKey)}
                    </p>
                  </div>

                  <ul className="mt-7 space-y-3">
                    {offer.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className={`flex items-start gap-3 text-sm ${
                          isFeatured ? "text-white/74" : "text-slate-700"
                        }`}
                      >
                        <span
                          className={`mt-0.5 rounded-full p-1 ${
                            isFeatured ? "bg-primary-500/14 text-primary-200" : "bg-primary-500/10 text-primary-600"
                          }`}
                        >
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                        <span>{t(deliverable)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 space-y-2">
                    <p className={`text-sm ${isFeatured ? "text-white/66" : "text-slate-700"}`}>
                      {t(offer.rangeKey)}
                    </p>
                    <p className={`text-sm ${isFeatured ? "text-white/66" : "text-slate-700"}`}>
                      {t(offer.termsKey)}
                    </p>
                    <p className={`text-xs ${isFeatured ? "text-white/40" : "text-slate-500"}`}>
                      {t("offers.flex_note")}
                    </p>
                  </div>

                  <div className="mt-7 pt-1">
                    <Button
                      className="w-full"
                      size="lg"
                      variant={isFeatured ? "primary" : "outline"}
                      onClick={() => handleOfferClick(offer.subjectValue)}
                    >
                      {t("offers.cta")}
                      <ArrowUpRight className="ml-3 h-5 w-5" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="mt-8 rounded-[30px] border border-white/10 bg-[#0b1424] px-6 py-6 text-white shadow-[0_26px_70px_-42px_rgba(15,23,42,0.82)]"
        >
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-300">
                {t("offers.addon_label")}
              </p>
              <p className="mt-2 text-lg font-semibold">{t("offers.addon_title")}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[20px] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm leading-relaxed text-white/70">
                {t("offers.addon_desc")}
              </div>
              <div className="rounded-[20px] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm leading-relaxed text-white/70">
                {t("offers.addon_note")}
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
