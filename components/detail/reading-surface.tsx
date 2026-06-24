import * as React from "react";

import { cn } from "@/lib/utils";

// Boîte de lecture « le joyau » (FR11/UX-DR3) : surface OPAQUE la plus sombre, jamais de
// verre/blur ; Poppins 16px/1.78 pour le confort de relecture ; scroll propre.
export function ReadingSurface({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-reading border-solid-line max-h-[60vh] overflow-y-auto rounded-sm border p-5",
        className,
      )}
    >
      <p className="text-[16px] leading-[1.78] whitespace-pre-wrap">
        {children}
      </p>
    </div>
  );
}
