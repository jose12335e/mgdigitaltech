import { cn } from "../../utils/cn";

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[28px] border border-slate-900/8 bg-surface shadow-[0_24px_60px_-38px_rgba(15,23,42,0.28)] backdrop-blur-xl transition-all duration-300 hover:border-primary-500/28 hover:shadow-[0_28px_65px_-42px_rgba(20,201,195,0.35)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
