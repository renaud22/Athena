import * as React from "react";

import { cn } from "@/lib/utils";

// Input thémé (DESIGN) : fond solid, focus = bordure or + ring `gold-soft`.
export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      "border-solid-line bg-solid text-foreground placeholder:text-muted-2 focus-visible:border-gold focus-visible:ring-gold-soft flex h-10 w-full rounded-sm border px-3 py-2 text-sm focus-visible:ring-[3px] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";
