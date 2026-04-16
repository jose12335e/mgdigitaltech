import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { mockData } from "../data/mockData";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language.startsWith("en");
  const nextLanguage = isEnglish ? "ES" : "EN";

  const navLinks = [
    { name: t("navbar.home"), href: "#home" },
    { name: t("navbar.services"), href: "#services" },
    { name: t("navbar.process"), href: "#process" },
    { name: t("navbar.faq"), href: "#faq" },
    { name: t("navbar.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href, closeMenu = false) => {
    const target = document.getElementById(href.replace("#", ""));
    if (closeMenu) {
      setMobileMenuOpen(false);
    }
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <Container className="pt-4 sm:pt-5">
        <div
          className={`mx-auto flex items-center justify-between gap-4 rounded-[22px] border px-4 py-3 transition-all duration-300 sm:px-5 lg:px-6 ${
            isScrolled
              ? "border-white/10 bg-[#08101f]/88 shadow-[0_22px_72px_-40px_rgba(2,8,23,0.86)] backdrop-blur-2xl"
              : "border-white/8 bg-[#08101f]/74 shadow-[0_18px_58px_-40px_rgba(2,8,23,0.72)] backdrop-blur-xl"
          }`}
        >
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              handleNavClick("#home");
            }}
            className="flex min-w-0 items-center gap-3 text-white"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.04]">
              <span className="h-2.5 w-2.5 rounded-full bg-primary-400 shadow-[0_0_16px_rgba(20,201,195,0.82)]" />
            </span>

            <span className="min-w-0">
              <span className="font-display block truncate bg-gradient-to-r from-primary-300 via-primary-400 to-accent-400 bg-clip-text text-[1.08rem] font-bold tracking-[-0.035em] text-transparent sm:text-[1.2rem]">
                {mockData.personalInfo.brand}
              </span>
              <span className="hidden text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/40 md:block">
                {t("navbar.tagline")}
              </span>
            </span>
          </a>

          <nav className="hidden flex-1 justify-center lg:flex">
            <div className="flex items-center gap-1 rounded-full border border-white/8 bg-white/[0.03] p-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="rounded-full px-4 py-2 text-sm font-medium text-white/72 transition-all duration-200 hover:bg-white/[0.08] hover:text-white focus-visible:bg-white/[0.08] focus-visible:text-white"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              onClick={() => i18n.changeLanguage(isEnglish ? "es" : "en")}
              className="inline-flex h-10 items-center rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm font-bold uppercase text-white/86 transition-colors hover:bg-white/[0.08] focus-visible:bg-white/[0.08]"
              aria-label={isEnglish ? t("common.switch_to_spanish") : t("common.switch_to_english")}
            >
              {nextLanguage}
            </button>

            <Button
              size="sm"
              className="h-10 rounded-full px-4.5 text-sm font-semibold"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t("navbar.cta")}
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => i18n.changeLanguage(isEnglish ? "es" : "en")}
              className="inline-flex h-10 items-center rounded-full border border-white/10 bg-white/[0.04] px-3.5 text-sm font-bold uppercase text-white/86 transition-colors hover:bg-white/[0.08]"
              aria-label={isEnglish ? t("common.switch_to_spanish") : t("common.switch_to_english")}
            >
              {nextLanguage}
            </button>

            <button
              onClick={() => setMobileMenuOpen((current) => !current)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors hover:bg-white/[0.08]"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? t("common.close_menu") : t("common.open_menu")}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              id="mobile-navigation"
              className="mt-3 overflow-hidden rounded-[22px] border border-white/10 bg-[#08101f]/92 p-4 shadow-[0_22px_70px_-36px_rgba(2,8,23,0.9)] backdrop-blur-2xl lg:hidden"
            >
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      handleNavClick(link.href, true);
                    }}
                    className="rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3 text-base font-medium text-white/82 transition-colors hover:bg-white/[0.08] hover:text-white"
                  >
                    {link.name}
                  </a>
                ))}

                <Button
                  className="mt-1 w-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {t("navbar.cta")}
                </Button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Container>
    </header>
  );
}
