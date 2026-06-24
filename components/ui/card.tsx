import * as React from "react";

import { cn } from "@/lib/utils";

// Deux registres de surface (DESIGN/UX-DR2-3) : `glass` (verre, blur) pour le chrome et
// les cartes de contexte ; `solid` (opaque, contraste max) pour lecture/écriture et kanban.
type CardVariant = "glass" | "solid";

const cardVariant: Record<CardVariant, string> = {
  glass: "rounded-sm border border-glass-line bg-glass backdrop-blur-[14px]",
  solid:
    "rounded-lg border border-solid-line bg-gradient-to-b from-solid-2 to-solid",
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "glass", ...props }, ref) => (
    <div
      ref={ref}
      data-variant={variant}
      className={cn(cardVariant[variant], className)}
      {...props}
    />
  ),
);
Card.displayName = "Card";

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-1 p-[18px]", className)} {...props} />
  );
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("font-display text-base", className)} {...props} />;
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-[18px] pt-0", className)} {...props} />;
}
