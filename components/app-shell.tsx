"use client";

import { useState } from "react";

import {
  Building2,
  CalendarDays,
  FileText,
  KanbanSquare,
  LayoutDashboard,
  ListChecks,
  Menu,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { LucideIcon } from "lucide-react";

import { NavItem } from "@/components/nav-item";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

// Architecture d'information : 2 groupes (Prospection / Clients). Les routes encore
// absentes seront créées au fil des epics ; le shell pose l'ossature de navigation.
type NavLink = { href: string; label: string; icon: LucideIcon };
const navGroups: { label: string; items: NavLink[] }[] = [
  {
    label: "Prospection",
    items: [
      { href: "/", label: "Tableau de bord", icon: LayoutDashboard },
      { href: "/production", label: "Production", icon: KanbanSquare },
      { href: "/avancement", label: "Avancement", icon: ListChecks },
      { href: "/calendrier", label: "Calendrier", icon: CalendarDays },
      { href: "/modeles", label: "Modèles", icon: FileText },
    ],
  },
  {
    label: "Clients",
    items: [{ href: "/entreprises", label: "Entreprises", icon: Building2 }],
  },
];

// Contenu de la sidebar, factorisé pour être rendu à l'identique en desktop ET en Sheet
// mobile (DRY — pas de duplication de JSX).
function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <div className="font-display text-gold px-1 text-lg">Solutix</div>

      {/* Unique CTA fort de l'écran (l'or = l'action). */}
      <Button variant="gold" className="w-full justify-start" asChild>
        <Link href="/prospections/nouvelle">
          <Plus />
          Personne à prospecter
        </Link>
      </Button>

      <nav
        className="flex flex-1 flex-col gap-5"
        aria-label="Navigation principale"
      >
        {navGroups.map((group) => (
          <div key={group.label} className="flex flex-col gap-1">
            <div className="eyebrow px-2">{group.label}</div>
            {group.items.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={pathname === item.href}
              />
            ))}
          </div>
        ))}
      </nav>

      {/* Carte profil — branchée sur la vraie session Supabase à la Story 1.2 (auth). */}
      <div className="border-glass-line flex items-center gap-3 rounded-sm border p-2">
        <span className="font-display bg-solid-2 text-gold flex size-9 items-center justify-center rounded-md">
          R
        </span>
        <div className="min-w-0">
          <div className="truncate text-sm">Renaud</div>
          <div className="text-muted-2 truncate text-xs">Opérateur</div>
        </div>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-dvh">
      {/* Sidebar fixe en desktop (≥ 860px). */}
      <aside className="bg-bg-2 border-glass-line hidden w-[264px] shrink-0 border-r min-[860px]:block">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Sidebar en drawer sous 860px. */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent className="p-0">
          <SidebarContent pathname={pathname} />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-glass-line flex h-14 items-center gap-3 border-b px-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Ouvrir le menu"
            className="min-[860px]:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu />
          </Button>
        </header>
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
