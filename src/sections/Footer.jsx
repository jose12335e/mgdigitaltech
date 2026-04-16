import { Mail, MessageCircle, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Container } from "../components/ui/Container";
import { mockData } from "../data/mockData";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { brand, name, email, phone } = mockData.personalInfo;
  const { t } = useTranslation();
  const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(t("whatsapp.message"))}`;

  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-[#04070d] py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(20,201,195,0.1),transparent_20rem),radial-gradient(circle_at_82%_18%,rgba(47,139,255,0.08),transparent_24rem)]" />

      <Container className="relative z-10">
        <div className="mb-8 rounded-[28px] border border-white/8 bg-white/[0.03] p-6 shadow-[0_22px_60px_-40px_rgba(15,23,42,0.75)]">
          <div className="grid gap-8 md:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] md:items-end">
            <div>
              <a href="#home" className="mb-4 flex items-center gap-2">
                <span className="font-display bg-gradient-to-r from-primary-300 via-primary-400 to-accent-400 bg-clip-text text-2xl font-bold text-transparent">
                  {brand}
                </span>
                <span className="mt-1 h-2 w-2 rounded-full bg-primary-400 shadow-[0_0_14px_rgba(20,201,195,0.7)]" />
              </a>
              <p className="max-w-xl text-sm leading-relaxed text-white/60">{t("footer.desc")}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-300">
                  {t("footer.links")}
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <a href="#services" className="text-white/62 transition-colors hover:text-primary-300">
                    {t("navbar.services")}
                  </a>
                  <a href="#process" className="text-white/62 transition-colors hover:text-primary-300">
                    {t("navbar.process")}
                  </a>
                  <a href="#faq" className="text-white/62 transition-colors hover:text-primary-300">
                    {t("navbar.faq")}
                  </a>
                  <a href="#contact" className="text-white/62 transition-colors hover:text-primary-300">
                    {t("navbar.contact")}
                  </a>
                </div>
              </div>

              <div className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-300">
                  {t("footer.contact_shortcuts")}
                </p>
                <div className="mt-4 flex gap-3">
                  <a
                    href={`mailto:${email}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white transition-colors hover:bg-primary-500 hover:text-slate-950"
                    aria-label={t("footer.email_cta")}
                    title={t("footer.email_cta")}
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white transition-colors hover:bg-[#25D366] hover:text-slate-950"
                    aria-label={t("footer.whatsapp_cta")}
                    title={t("footer.whatsapp_cta")}
                  >
                    <MessageCircle className="h-5 w-5" />
                  </a>
                  <a
                    href={`tel:${phone.replace(/\D/g, "")}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white transition-colors hover:bg-accent-500 hover:text-slate-950"
                    aria-label={t("footer.call_cta")}
                    title={t("footer.call_cta")}
                  >
                    <Phone className="h-5 w-5" />
                  </a>
                </div>

                <p className="mt-4 text-sm text-white/50">
                  {t("footer.signature")} <span className="text-white/68">{name}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 text-sm text-white/40 md:flex-row">
          <p>
            &copy; {currentYear} {brand}. {t("footer.rights")}
          </p>
          <p>{t("footer.built")}</p>
        </div>
      </Container>
    </footer>
  );
}
