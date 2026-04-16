import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const variants = {
  primary:
    "border border-primary-400/20 bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 text-slate-950 shadow-[0_18px_45px_-18px_rgba(20,201,195,0.55)] transition-all hover:-translate-y-0.5 hover:brightness-105 focus:ring-2 focus:ring-primary-500/40",
  outline:
    "border border-slate-900/10 bg-white/72 text-slate-900 backdrop-blur-md transition-colors hover:bg-white focus:ring-2 focus:ring-primary-500/40",
  ghost:
    "text-foreground transition-colors hover:bg-slate-900/5 hover:text-primary-600",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-14 px-8 text-lg",
  icon: "flex h-10 w-10 items-center justify-center p-2",
};

export const Button = forwardRef(
  ({ className, variant = "primary", size = "md", children, href, type, ...props }, ref) => {
    const Component = href ? "a" : "button";

    return (
      <Component
        ref={ref}
        href={href}
        type={Component === "button" ? (type ?? "button") : undefined}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center rounded-xl font-medium outline-none ring-offset-background transition-[transform,box-shadow,background-color,border-color,color] focus-visible:ring-2 focus-visible:ring-primary-400/55 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";
