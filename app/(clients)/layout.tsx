import { AppShell } from "@/components/app-shell";

// Module Monde B — gestion client. Réutilise le même shell que la prospection (DRY).
export default function ClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
