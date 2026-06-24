import { Skeleton } from "@/components/ui/skeleton";

// Skeletons calqués sur la vraie carte-tâche (UX-DR30) : mêmes dimensions => aucun saut
// de layout au passage données réelles.
export function TaskListSkeleton({ rows = 5 }: { rows?: number }) {
  // Liste statique de placeholders : la clé par index est acceptable (jamais réordonnée).
  return (
    <ul className="flex flex-col gap-2" aria-hidden="true">
      {Array.from({ length: rows }, (_, i) => (
        <li key={`skeleton-${i}`}>
          <div className="border-glass-line bg-glass flex items-center gap-3 rounded-sm border border-l-[3px] px-4 py-3">
            <Skeleton className="size-4 rounded-full" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
        </li>
      ))}
    </ul>
  );
}
