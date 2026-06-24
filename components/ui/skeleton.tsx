import * as React from "react";

import { cn } from "@/lib/utils";

// Placeholder de chargement (UX-DR30) : occupe l'emplacement réel sans saut de layout,
// pas de spinner plein écran.
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-glass-2 animate-pulse rounded-sm", className)}
      {...props}
    />
  );
}
