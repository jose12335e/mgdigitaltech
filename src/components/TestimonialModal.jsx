import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, MessageSquareQuote, Send, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { supabase } from "../lib/supabase";
import { Button } from "./ui/Button";

export function TestimonialModal({ isOpen, onClose, onSuccess }) {
  const [formStatus, setFormStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("submitting");
    setSubmitError("");

    const formData = new FormData(e.target);
    const honeypot = `${formData.get("website") || ""}`.trim();
    const formName = `${formData.get("name") || ""}`.trim();
    const formRole = `${formData.get("role") || ""}`.trim();
    const formText = `${formData.get("text") || ""}`.trim();

    if (honeypot) {
      setFormStatus("success");
      e.target.reset();
      return;
    }

    if (!supabase) {
      setFormStatus("idle");
      setSubmitError(t("testimonials.unavailable_desc"));
      return;
    }

    try {
      const { error } = await supabase.from("testimonials").insert([
        {
          name: formName,
          role: formRole,
          text: formText,
          is_approved: false,
        },
      ]);

      if (error) throw error;

      setFormStatus("success");
      e.target.reset();
      await onSuccess?.();

      setTimeout(() => {
        setFormStatus("idle");
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Supabase Insert Error:", error);
      setFormStatus("idle");
      setSubmitError(t("testimonials.error"));
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" style={{ zIndex: 9999 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="testimonial-modal-title"
          className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 cursor-pointer rounded-full p-2 text-foreground/50 transition-colors hover:bg-surface-hover hover:text-foreground"
            aria-label={t("common.close")}
          >
            <X size={20} />
          </button>

          <div className="flex flex-col items-center p-6 pb-0 text-center sm:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500/10 text-primary-500">
              <MessageSquareQuote size={24} />
            </div>
            <h3 id="testimonial-modal-title" className="font-display mb-2 text-2xl font-bold text-foreground">
              {t("testimonials.modal_title")}
            </h3>
            <p className="text-sm text-foreground/70">{t("testimonials.leave_desc")}</p>
          </div>

          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="website"
                tabIndex="-1"
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="space-y-1.5 text-left">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  {t("testimonials.name")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label htmlFor="role" className="text-sm font-medium text-foreground">
                  {t("testimonials.role")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  autoComplete="organization-title"
                  required
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label htmlFor="text" className="text-sm font-medium text-foreground">
                  {t("testimonials.text")} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="text"
                  name="text"
                  rows="4"
                  required
                  className="w-full resize-y rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500"
                ></textarea>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full disabled:opacity-50"
                  disabled={formStatus === "submitting" || formStatus === "success"}
                >
                  {formStatus === "idle" ? (
                    <span className="flex items-center gap-2">
                      <Send size={18} /> {t("testimonials.send")}
                    </span>
                  ) : null}
                  {formStatus === "submitting" ? t("testimonials.sending") : null}
                  {formStatus === "success" ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle2 size={18} /> {t("testimonials.pending_review")}
                    </span>
                  ) : null}
                </Button>
              </div>

              <div aria-live="polite">
                {submitError ? (
                  <p className="text-center text-sm font-medium text-rose-500">{submitError}</p>
                ) : null}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
