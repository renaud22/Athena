import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Helper standard shadcn/ui : fusionne des classes conditionnelles (clsx) puis résout
// les conflits d'utilitaires Tailwind (tailwind-merge), ex. `px-2` + `px-4` -> `px-4`.
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
