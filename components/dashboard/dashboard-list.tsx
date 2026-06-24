import { EmptyState } from "@/components/dashboard/empty-state";
import { TaskCard } from "@/components/dashboard/task-card";
import type { DashboardTask } from "@/lib/domain/dashboard";

// Liste plate UNIQUE triée par urgence (FR4) : pas de sections, pas de bandes, pas de
// carte hero, pas de Kanban. À vide → to-do « Tout est prêt » (FR9).
export function DashboardList({ tasks }: { tasks: DashboardTask[] }) {
  if (tasks.length === 0) {
    return <EmptyState />;
  }
  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard task={task} />
        </li>
      ))}
    </ul>
  );
}
