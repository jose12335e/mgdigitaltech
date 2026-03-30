import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const variants = {
  primary: "bg-primary-600 text-white hover:bg-primary-500 shadow-sm transition-all focus:ring-2 focus:ring-primary-500/50",
  outline: "border border-border text-foreground hover:bg-surface-hover transition-colors focus:ring-2 focus:ring-primary-500/50",
  ghost: "text-foreground hover:bg-surface-hover hover:text-primary-600 transition-colors",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-14 px-8 text-lg",
  icon: "h-10 w-10 p-2 flex items-center justify-center",
};

export const Button = forwardRef(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium ring-offset-background cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
