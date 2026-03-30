import { cn } from "../../utils/cn";

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary-500/30",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
