import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export function SectionHeading({
  title,
  subtitle,
  className,
  alignment = "center",
  tone = "default",
}) {
  const isInverse = tone === "inverse";

  return (
    <div
      className={cn(
        "mb-12",
        alignment === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {subtitle ? (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            "mb-3 block text-sm font-semibold uppercase tracking-[0.24em]",
            isInverse ? "text-primary-300" : "text-primary-600"
          )}
        >
          {subtitle}
        </motion.span>
      ) : null}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={cn(
          "font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl",
          isInverse ? "text-white" : "text-slate-950"
        )}
      >
        {title}
      </motion.h2>
    </div>
  );
}
