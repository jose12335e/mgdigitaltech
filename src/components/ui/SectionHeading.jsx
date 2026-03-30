import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

export function SectionHeading({ title, subtitle, className, alignment = "center" }) {
  return (
    <div className={cn("mb-12", alignment === "center" ? "text-center mx-auto" : "text-left", className)}>
      {subtitle && (
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary-600 dark:text-primary-500 font-semibold tracking-wider uppercase text-sm mb-3 block"
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground"
      >
        {title}
      </motion.h2>
    </div>
  );
}
