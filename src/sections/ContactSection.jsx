import { useEffect, useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";
import { mockData } from "../data/mockData";

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "",
};

export function ContactSection() {
  const { t } = useTranslation();
  const { email, phone } = mockData.personalInfo;
  const [formStatus, setFormStatus] = useState("idle");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isSubjectMenuOpen, setIsSubjectMenuOpen] = useState(false);
  const [highlightedSubjectIndex, setHighlightedSubjectIndex] = useState(0);
  const subjectMenuRef = useRef(null);
  const canSendWithEmailJs = Object.values(emailJsConfig).every(Boolean);
  const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(t("whatsapp.message"))}`;

  const subjectOptions = useMemo(
    () => [
      { value: "landing", label: t("contact.subject_landing") },
      { value: "website", label: t("contact.subject_website") },
      { value: "system", label: t("contact.subject_system") },
      { value: "maintenance", label: t("contact.subject_maint") },
      { value: "audit", label: t("contact.subject_consult") },
      { value: "other", label: t("contact.subject_other") },
    ],
    [t]
  );

  useEffect(() => {
    const handleOfferSelected = (event) => {
      setSelectedSubject(event.detail?.subjectValue || "");
    };

    window.addEventListener("offer:selected", handleOfferSelected);
    return () => window.removeEventListener("offer:selected", handleOfferSelected);
  }, []);

  useEffect(() => {
    if (selectedSubject && !subjectOptions.some((option) => option.value === selectedSubject)) {
      setSelectedSubject("");
    }
  }, [selectedSubject, subjectOptions]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (subjectMenuRef.current && !subjectMenuRef.current.contains(event.target)) {
        setIsSubjectMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  useEffect(() => {
    if (!isSubjectMenuOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsSubjectMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isSubjectMenuOpen]);

  useEffect(() => {
    const currentIndex = subjectOptions.findIndex((option) => option.value === selectedSubject);
    setHighlightedSubjectIndex(currentIndex >= 0 ? currentIndex : 0);
  }, [selectedSubject, subjectOptions]);

  const selectedSubjectLabel =
    subjectOptions.find((option) => option.value === selectedSubject)?.label || t("contact.subject_placeholder");

  const handleSubjectSelect = (value) => {
    setSelectedSubject(value);
    setIsSubjectMenuOpen(false);
  };

  const handleSubjectKeyDown = (event) => {
    if (!subjectOptions.length) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsSubjectMenuOpen(true);
      setHighlightedSubjectIndex((current) => (current + 1) % subjectOptions.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setIsSubjectMenuOpen(true);
      setHighlightedSubjectIndex((current) => (current - 1 + subjectOptions.length) % subjectOptions.length);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (isSubjectMenuOpen) {
        handleSubjectSelect(subjectOptions[highlightedSubjectIndex].value);
      } else {
        setIsSubjectMenuOpen(true);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("submitting");

    const formData = new FormData(e.target);
    const honeypot = `${formData.get("company") || ""}`.trim();

    if (honeypot) {
      setFormStatus("success");
      e.target.reset();
      setSelectedSubject("");
      setTimeout(() => setFormStatus("idle"), 3000);
      return;
    }

    const subjectValue = `${formData.get("subject") || ""}`.trim();
    const projectLabel =
      subjectOptions.find((option) => option.value === subjectValue)?.label || subjectValue;

    const templateParams = {
      name: `${formData.get("name") || ""}`.trim(),
      email: `${formData.get("email") || ""}`.trim(),
      projectType: projectLabel,
      message: `${formData.get("message") || ""}`.trim(),
    };

    try {
      if (canSendWithEmailJs) {
        const response = await emailjs.send(
          emailJsConfig.serviceId,
          emailJsConfig.templateId,
          templateParams,
          emailJsConfig.publicKey
        );

        if (response.status !== 200) {
          throw new Error(`Unexpected EmailJS status: ${response.status}`);
        }
      } else if (typeof window !== "undefined") {
        const subject = encodeURIComponent(`${t("contact.mailto_subject")}: ${projectLabel}`);
        const body = encodeURIComponent(
          `${t("contact.name")}: ${templateParams.name}\n${t("contact.email")}: ${templateParams.email}\n${t("contact.subject")}: ${projectLabel}\n\n${templateParams.message}`
        );
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      }

      setFormStatus("success");
      e.target.reset();
      setSelectedSubject("");
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#08111f_0%,#060c14_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(20,201,195,0.16),transparent_22rem),radial-gradient(circle_at_84%_12%,rgba(47,139,255,0.14),transparent_24rem)]" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-6xl rounded-[40px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_90px_-45px_rgba(2,8,23,0.9)] backdrop-blur-xl md:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex rounded-full border border-primary-300/15 bg-primary-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary-200">
                {t("contact.reply_time")}
              </span>
              <h2 className="font-display mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
                {t("contact.title")}
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/66">
                {t("contact.subtitle")}
              </p>

              <div className="mt-8 grid gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-4 rounded-[26px] border border-primary-400/16 bg-primary-500/10 p-5 text-white transition-all duration-300 hover:bg-primary-500/14"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary-300/20 bg-primary-500/10 text-primary-200">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-primary-200">
                      {t("contact.primary_channel_label")}
                    </span>
                    <span className="mt-2 block text-xl font-semibold">{t("contact.cta_whatsapp")}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-white/68">
                      {t("contact.primary_channel_text")}
                    </span>
                  </span>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-primary-200 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-white/8 bg-[#0d1728]/85 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
                      {t("contact.quick_answer_label")}
                    </p>
                    <p className="mt-3 text-base font-semibold text-white">{t("contact.quick_answer_value")}</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{t("contact.quick_answer_text")}</p>
                  </div>

                  <div className="rounded-[24px] border border-white/8 bg-[#0d1728]/85 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
                      {t("contact.project_entry_label")}
                    </p>
                    <p className="mt-3 text-base font-semibold text-white">{t("contact.project_entry_value")}</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{t("contact.project_entry_text")}</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="flex items-center gap-4 rounded-[24px] border border-white/8 bg-[#0d1728]/85 p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary-300/20 bg-primary-500/10 text-primary-300">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/40">Email</p>
                      <a
                        href={`mailto:${email}`}
                        className="text-lg font-semibold text-white transition-colors hover:text-primary-300"
                      >
                        {email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-[24px] border border-white/8 bg-[#0d1728]/85 p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary-300/20 bg-primary-500/10 text-primary-300">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/40">{t("contact.phone")}</p>
                      <a
                        href={`tel:${phone.replace(/\D/g, "")}`}
                        className="text-lg font-semibold text-white transition-colors hover:text-primary-300"
                      >
                        {phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-[24px] border border-white/8 bg-[#0d1728]/85 p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary-300/20 bg-primary-500/10 text-primary-300">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/40">{t("contact.location")}</p>
                      <p className="text-lg font-semibold text-white">{t("contact.remote")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              id="contact-form"
            >
              <Card className="border-white/10 bg-[#0b1527]/90 p-8">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-300">
                    {t("contact.form_label")}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-white">{t("contact.form_title")}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/58">{t("contact.desc")}</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="company"
                    tabIndex="-1"
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-white/78">
                        {t("contact.name")}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        autoComplete="name"
                        required
                        className="w-full rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/28 focus:outline-none focus:ring-2 focus:ring-primary-500/45"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-white/78">
                        {t("contact.email")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        required
                        className="w-full rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/28 focus:outline-none focus:ring-2 focus:ring-primary-500/45"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label id="subject-label" htmlFor="subject" className="text-sm font-medium text-white/78">
                      {t("contact.subject")}
                    </label>
                    <div ref={subjectMenuRef} className="relative">
                      <input id="subject" name="subject" value={selectedSubject} readOnly required className="sr-only" />

                      <button
                        type="button"
                        onClick={() => setIsSubjectMenuOpen((current) => !current)}
                        onKeyDown={handleSubjectKeyDown}
                        aria-haspopup="listbox"
                        aria-expanded={isSubjectMenuOpen}
                        aria-labelledby="subject-label subject-trigger"
                        id="subject-trigger"
                        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-white transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/45 ${
                          isSubjectMenuOpen
                            ? "border-primary-500/70 bg-[#101c31]"
                            : "border-white/8 bg-white/[0.04] hover:bg-white/[0.06]"
                        }`}
                      >
                        <span className={selectedSubject ? "text-white" : "text-white/52"}>{selectedSubjectLabel}</span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-white/50 transition-transform duration-200 ${
                            isSubjectMenuOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isSubjectMenuOpen ? (
                        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d1728] p-2 shadow-[0_28px_90px_-42px_rgba(2,8,23,0.92)] backdrop-blur-xl">
                          <ul role="listbox" aria-labelledby="subject-label" className="space-y-1">
                            {subjectOptions.map((option, index) => {
                              const isSelected = option.value === selectedSubject;
                              const isHighlighted = index === highlightedSubjectIndex;

                              return (
                                <li key={option.value}>
                                  <button
                                    type="button"
                                    onMouseEnter={() => setHighlightedSubjectIndex(index)}
                                    onClick={() => handleSubjectSelect(option.value)}
                                    className={`flex w-full items-center rounded-xl px-4 py-3 text-left text-sm transition-colors ${
                                      isSelected
                                        ? "bg-primary-500/14 text-primary-200"
                                        : isHighlighted
                                          ? "bg-white/[0.08] text-white"
                                          : "text-white/72 hover:bg-white/[0.06] hover:text-white"
                                    }`}
                                    role="option"
                                    aria-selected={isSelected}
                                  >
                                    {option.label}
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-white/78">
                      {t("contact.message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      autoComplete="off"
                      required
                      rows={5}
                      className="w-full resize-none rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/28 focus:outline-none focus:ring-2 focus:ring-primary-500/45"
                      placeholder={t("contact.message_placeholder")}
                    />
                  </div>

                  <div className="rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
                      {t("contact.form_note_label")}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/68">{t("contact.form_note_text")}</p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={formStatus === "submitting" || formStatus === "success"}
                  >
                    {formStatus === "idle" && t("contact.send")}
                    {formStatus === "submitting" && t("contact.sending")}
                    {formStatus === "success" && t("contact.sent")}
                    {formStatus === "error" && t("contact.error")}
                  </Button>

                  <p className="text-center text-xs leading-relaxed text-white/46">
                    {canSendWithEmailJs ? t("contact.privacy") : t("contact.email_fallback")}
                  </p>

                  <div aria-live="polite">
                    {formStatus === "success" ? (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 text-center text-sm font-medium text-primary-300"
                      >
                        {t("contact.thanks")}
                      </motion.p>
                    ) : null}
                    {formStatus === "error" ? (
                      <p className="mt-4 text-center text-sm font-medium text-rose-300">
                        {t("contact.error_help")}
                      </p>
                    ) : null}
                  </div>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
