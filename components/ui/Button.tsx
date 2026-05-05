import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const variantStyles = {
  primary:
    "bg-primary text-white hover:bg-primary-dark focus-visible:ring-accent",
  accent:
    "bg-accent text-white hover:bg-accent-hover focus-visible:ring-accent",
  outline:
    "border border-primary bg-transparent text-primary hover:bg-primary hover:text-white focus-visible:ring-accent",
  ghost:
    "bg-transparent text-primary hover:bg-primary/10 focus-visible:ring-accent",
} as const;

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3 text-lg",
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };
