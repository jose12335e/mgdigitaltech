import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { mockData } from "../data/mockData";
import { useTranslation } from "react-i18next";

export function PricingSection() {
  const { t } = useTranslation();

  return (
    <section id="pricing" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(17,216,210,0.12),transparent_26rem),radial-gradient(circle_at_82%_30%,rgba(30,167,255,0.12),transparent_24rem),linear-gradient(180deg,#07101d_0%,#07101d_50%,#060a14_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:88px_88px] opacity-20" />

      <Container className="relative z-10">
        <SectionHeading title={t("pricing.title")} subtitle={t("pricing.subtitle")} />

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {mockData.pricing.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative h-full ${plan.popular ? "z-10 md:-mt-4 md:mb-4" : "z-0 mt-4 md:mt-4"}`}
            >
              {plan.popular ? (
                <div className="absolute -inset-1 rounded-[30px] bg-gradient-to-r from-primary-500/60 to-accent-500/50 blur-xl opacity-70 transition duration-700" />
              ) : null}

              <Card
                className={`relative flex h-full flex-col overflow-visible border p-8 transition-all hover:-translate-y-2 ${
                  plan.popular
                    ? "border-primary-400/35 bg-[#0b1428]/92 shadow-[0_30px_80px_-35px_rgba(17,216,210,0.45)]"
                    : "border-white/8 bg-[#091221]/88"
                }`}
              >
                <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_28%)]" />

                <div className="absolute right-6 top-0 z-20 flex -translate-y-1/2 gap-2">
                  <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg md:text-xs">
                    {t(plan.badgeKey)}
                  </span>
                  {plan.popular ? (
                    <span className="rounded-full border border-primary-300/25 bg-gradient-to-r from-primary-500 to-accent-500 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-950 shadow-lg shadow-primary-500/35 md:text-xs">
                      {t("pricing.popular")}
                    </span>
                  ) : null}
                </div>

                <div className="relative z-10 mb-6 pt-4">
                  <div className="mb-4 h-px w-16 bg-gradient-to-r from-primary-400 to-transparent" />
                  <h3 className="mb-3 text-2xl font-extrabold text-white">{t(plan.tierKey)}</h3>
                  <p className="min-h-[40px] text-sm leading-relaxed text-white/64">{t(plan.descKey)}</p>
                </div>

                <div className="mb-8 rounded-[24px] border border-white/8 bg-white/[0.04] p-6 backdrop-blur-sm">
                  <div className="flex flex-col">
                    <span className="mb-1 text-sm font-medium text-white/35 line-through">
                      {t(plan.priceOriginalKey)}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="bg-gradient-to-r from-primary-300 via-primary-400 to-accent-400 bg-clip-text text-4xl font-black tracking-tight text-transparent md:text-5xl">
                        {t(plan.pricePromoKey)}
                      </span>
                    </div>
                    <p className="mt-3 flex w-fit items-center gap-1.5 rounded-md border border-primary-400/15 bg-primary-500/10 px-2.5 py-1 text-xs font-semibold text-primary-200">
                      {t(plan.urgencyKey)}
                    </p>
                  </div>
                </div>

                <ul className="mb-8 flex-grow space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="group flex items-start gap-3 text-white/80">
                      <div className="mt-0.5 rounded-full border border-primary-400/18 bg-primary-500/10 p-1 transition-colors group-hover:bg-primary-500/18">
                        <Check className="h-4 w-4 shrink-0 text-primary-300" strokeWidth={3} />
                      </div>
                      <span className="text-sm font-medium text-white/76">{t(feature)}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-2">
                  <Button
                    variant={plan.popular ? "primary" : "outline"}
                    className={`relative w-full overflow-hidden shadow-lg ${plan.popular ? "shadow-primary-500/30" : ""}`}
                    onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
                    size="lg"
                  >
                    <span className="relative z-10 flex items-center gap-2 font-bold tracking-wide">
                      {t(plan.ctaKey)}
                    </span>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
