import { TaskListSkeleton } from "@/components/dashboard/task-list-skeleton";

// Chargement à froid du dashboard (UX-DR30) : skeletons aux emplacements réels, pas de
// spinner plein écran ni de saut de layout.
export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="font-display text-2xl">À faire</h1>
      <TaskListSkeleton />
    </div>
  );
}
