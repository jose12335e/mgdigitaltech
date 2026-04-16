import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, BriefcaseBusiness, Rocket, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { mockData } from "../data/mockData";

function OfferPreview() {
  const { t } = useTranslation();

  return (
    <div className="relative mx-auto w-full max-w-[500px]">
      <div className="absolute inset-x-10 top-8 h-44 rounded-full bg-[radial-gradient(circle,rgba(47,139,255,0.18),transparent_72%)] blur-3xl" />

      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#08101d]/82 p-3 shadow-[0_32px_90px_-52px_rgba(2,8,23,0.96)] backdrop-blur-2xl">
        <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(155deg,#0c162b_0%,#0a1222_52%,#0f2139_100%)] p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="max-w-[23rem]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/42">
                {t("hero.preview_label")}
              </p>
              <h3 className="mt-2 text-[1.45rem] font-semibold leading-tight text-white sm:text-[1.7rem]">
                {t("hero.preview_title")}
              </h3>
            </div>

            <div className="rounded-full border border-primary-400/16 bg-primary-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-200 sm:text-[11px]">
              {t("hero.preview_badge")}
            </div>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-white/60">{t("hero.preview_subtitle")}</p>

          <div className="mt-5 space-y-3">
            {mockData.offers.map((offer) => {
              const Icon = offer.icon;

              return (
                <div
                  key={offer.id}
                  className="rounded-[20px] border border-white/8 bg-white/[0.04] px-4 py-4"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-primary-400/18 bg-primary-500/10 text-primary-300">
                      <Icon className="h-5 w-5" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-base font-semibold text-white">{t(offer.nameKey)}</p>
                        <span className="text-sm font-medium text-white/64">{t(offer.timelineKey)}</span>
                      </div>

                      <div className="mt-3 flex items-center gap-3">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/34">
                          {t("offers.starting_label")}
                        </span>
                        <span className="text-base font-semibold leading-tight text-white sm:text-lg">
                          {t(offer.startingPriceKey)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[20px] border border-white/8 bg-white/[0.035] px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
                {t("hero.preview_stat_1_label")}
              </p>
              <p className="mt-2 text-base font-semibold text-white">{t("hero.preview_stat_1_value")}</p>
            </div>

            <div className="rounded-[20px] border border-white/8 bg-white/[0.035] px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
                {t("hero.preview_stat_2_label")}
              </p>
              <p className="mt-2 text-base font-semibold text-white">{t("hero.preview_stat_2_value")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const { t } = useTranslation();

  const trustSignals = [
    { key: "hero.point_1", icon: ShieldCheck },
    { key: "hero.point_2", icon: BriefcaseBusiness },
    { key: "hero.point_3", icon: BadgeCheck },
    { key: "hero.point_4", icon: Rocket },
  ];

  return (
    <section id="home" className="relative overflow-hidden border-b border-white/8 pt-28 md:pt-32">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#07101b_0%,#08111e_54%,#091420_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_24%,rgba(20,201,195,0.16),transparent_28rem),radial-gradient(circle_at_84%_16%,rgba(47,139,255,0.1),transparent_28rem)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.026)_1px,transparent_1px)] bg-[size:108px_108px] opacity-[0.1]" />

      <Container className="relative z-10 pb-14 md:pb-18">
        <div className="grid items-center gap-10 xl:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.82fr)] xl:gap-14">
          <div className="max-w-[38rem]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white/84 backdrop-blur-md"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-primary-400 shadow-[0_0_16px_rgba(20,201,195,0.8)]" />
              {t("hero.eyebrow")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="mt-6 max-w-[10.6ch] font-display text-[clamp(3rem,6vw,5.1rem)] font-bold leading-[0.94] tracking-[-0.055em] text-white"
            >
              <span className="block">{t("hero.title_line_1")}</span>
              <span className="mt-1 block bg-gradient-to-r from-primary-300 via-primary-400 to-accent-400 bg-clip-text text-transparent">
                {t("hero.title_line_2")}
              </span>
              <span className="mt-1 block">{t("hero.title_line_3")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="mt-6 max-w-[35rem] text-[1.03rem] leading-[1.72] text-white/66 md:text-[1.08rem]"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.24 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                size="lg"
                className="group min-w-0 rounded-2xl px-7 shadow-[0_26px_58px_-24px_rgba(20,201,195,0.74)] sm:min-w-[250px]"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t("hero.cta_primary")}
                <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl border-white/12 bg-white/[0.06] px-7 text-white hover:bg-white/[0.1]"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t("hero.cta_secondary")}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.32 }}
              className="mt-7 flex flex-wrap gap-3"
            >
              {trustSignals.map((signal) => {
                const SignalIcon = signal.icon;

                return (
                  <div
                    key={signal.key}
                    className="inline-flex items-center gap-3 rounded-full border border-white/8 bg-white/[0.04] px-4 py-2.5 text-sm text-white/72 backdrop-blur-md"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary-400/18 bg-primary-500/10 text-primary-300">
                      <SignalIcon className="h-4 w-4" />
                    </span>
                    <span className="font-medium">{t(signal.key)}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.985, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="xl:justify-self-end"
          >
            <OfferPreview />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
