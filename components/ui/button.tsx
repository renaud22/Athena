import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Discipline de marque (DESIGN/UX-DR8) : l'OR = l'action. La variante `gold` est le CTA
// fort (un seul par écran) ; elle n'est donc PAS la variante par défaut (défaut = ghost).
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-[filter,background-color,border-color] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        gold: "bg-primary text-primary-foreground shadow-[0_8px_22px_-10px_rgba(239,172,38,.7),inset_0_1px_0_rgba(255,255,255,.4)] hover:brightness-110",
        ghost:
          "border border-glass-line bg-transparent text-foreground hover:bg-glass-2",
        danger:
          "border border-[rgba(251,44,54,.4)] bg-[rgba(251,44,54,.08)] text-[#ffb3b6] hover:bg-[rgba(251,44,54,.14)]",
        outline:
          "border border-solid-line bg-transparent text-foreground hover:bg-glass-2",
      },
      size: {
        sm: "h-8 px-3 text-[13px]",
        default: "h-10 px-4",
        icon: "size-[38px]",
      },
    },
    defaultVariants: { variant: "ghost", size: "default" },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Rend l'élément enfant à la place du <button> (ex. un <a> stylé en bouton). */
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
