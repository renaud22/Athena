import { DashboardList } from "@/components/dashboard/dashboard-list";
import { getSampleDashboardTasks } from "@/lib/server/dashboard";

// Tableau de bord « À faire » (route `/`). Server Component : l'urgence est dérivée côté
// serveur (AD-5). Alimenté pour l'instant par un jeu d'exemples (lot DB bloqué, cf.
// MORNING-REPORT) ; le branchement repository Prisma/Supabase ne changera que la source.
export default function DashboardPage() {
  const tasks = getSampleDashboardTasks(new Date());
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="font-display text-2xl">À faire</h1>
      <DashboardList tasks={tasks} />
    </div>
  );
}
