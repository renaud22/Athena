import { AppShell } from "@/components/app-shell";

// Module Monde A — cockpit de prospection. Toutes ses routes vivent dans le shell
// (sidebar + topbar responsive). Le module Clients réutilisera le même AppShell.
export default function ProspectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
