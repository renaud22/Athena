import Link from "next/link";

import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

// Élément de navigation de la sidebar. Actif = liseré or gauche + fond or doux (DESIGN).
export interface NavItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
  /** Badge compteur optionnel (ex. nombre de tâches en attente). */
  count?: number;
}

export function NavItem({
  href,
  label,
  icon: Icon,
  active = false,
  count,
}: NavItemProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "hover:bg-glass-2 hover:text-foreground text-muted-foreground flex items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm transition-colors",
        active && "border-gold bg-gold-soft text-foreground border-l-2 pl-2",
      )}
    >
      <Icon className="size-4 shrink-0" aria-hidden="true" />
      <span className="flex-1 truncate">{label}</span>
      {count != null && count > 0 && (
        <span className="bg-gold-soft text-gold rounded-full px-1.5 text-xs">
          {count}
        </span>
      )}
    </Link>
  );
}
