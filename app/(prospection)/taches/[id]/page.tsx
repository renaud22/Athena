import { notFound } from "next/navigation";

import { TaskDetailView } from "@/components/detail/task-detail-view";
import { getSampleTaskDetail } from "@/lib/server/task-detail";

// Vue détail d'une tâche (route `/taches/[id]`). Server Component : urgence dérivée côté
// serveur. Source = jeu d'exemples en attendant le repository Prisma/Supabase (lot DB).
export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = getSampleTaskDetail(id, new Date());
  if (!detail) notFound();
  return <TaskDetailView detail={detail} />;
}
