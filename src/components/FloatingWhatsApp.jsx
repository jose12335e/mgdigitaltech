import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export function FloatingWhatsApp({ phoneNumber }) {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 180);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.a
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href={`https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(t("whatsapp.message"))}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("whatsapp.aria_label")}
          title={t("whatsapp.aria_label")}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-[#25D366] text-slate-950 shadow-[0_20px_40px_-18px_rgba(37,211,102,0.65)] transition-shadow hover:shadow-[0_22px_44px_-16px_rgba(37,211,102,0.72)]"
        >
          <MessageCircle className="h-7 w-7" />
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
