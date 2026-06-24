import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Pills/badges (DESIGN) : radius full, bordure verre. Les accents catégoriels bleu/violet
// sont RÉSERVÉS aux pistes (Mardi/Jeudi) et types de relation — jamais action/urgence.
const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "border-glass-line bg-glass-2 text-foreground",
        gold: "border-gold-line bg-gold-soft text-gold",
        blue: "border-[rgba(125,211,252,.3)] bg-[rgba(125,211,252,.1)] text-cat-blue",
        violet:
          "border-[rgba(196,181,253,.3)] bg-[rgba(196,181,253,.1)] text-cat-violet",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

/** Step-tag (DESIGN) : badge or doux marquant l'étape d'une séquence (Touche 1/2/3…). */
export function StepTag({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <Badge
      variant="gold"
      className={cn("tracking-wide uppercase", className)}
      {...props}
    />
  );
}

export { badgeVariants };
