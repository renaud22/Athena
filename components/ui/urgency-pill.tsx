import * as React from "react";

import type { UrgencyLevel } from "@/lib/domain/urgency";
import { cn } from "@/lib/utils";

// Le type canonique du palier vit dans le domaine ; ré-exporté ici pour les consommateurs.
export type { UrgencyLevel };

// Système d'urgence à 4 paliers (DESIGN/UX-DR4), SÉPARÉ de l'or. La pastille porte la
// couleur BRUTE ; le texte porte la variante ÉCLAIRCIE (lisibilité AA). Aucune confusion
// possible avec l'or d'action. Les niveaux correspondent à la sortie de `computeUrgency`.

const levelConfig: Record<
  UrgencyLevel,
  { dot: string; text: string; defaultLabel: string }
> = {
  none: {
    dot: "bg-u-none",
    text: "text-u-none-text",
    defaultLabel: "Sans échéance",
  },
  far: { dot: "bg-u-far", text: "text-u-far-text", defaultLabel: "À venir" },
  soon: { dot: "bg-u-soon", text: "text-u-soon-text", defaultLabel: "Demain" },
  now: {
    dot: "bg-u-now",
    text: "text-u-now-text",
    defaultLabel: "Aujourd'hui",
  },
};

export interface UrgencyPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  level: UrgencyLevel;
}

export function UrgencyPill({
  level,
  className,
  children,
  ...props
}: UrgencyPillProps) {
  const c = levelConfig[level];
  return (
    <span
      className={cn(
        "border-glass-line bg-glass inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        c.text,
        className,
      )}
      {...props}
    >
      <span className={cn("size-2 rounded-full", c.dot)} aria-hidden="true" />
      {children ?? c.defaultLabel}
    </span>
  );
}
