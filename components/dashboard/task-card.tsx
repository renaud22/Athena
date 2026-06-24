import { Mail, SquarePen } from "lucide-react";

import type { LucideIcon } from "lucide-react";

import { UrgencyPill } from "@/components/ui/urgency-pill";
import type { DashboardTask, TaskKind } from "@/lib/domain/dashboard";
import type { UrgencyLevel } from "@/lib/domain/urgency";
import { cn } from "@/lib/utils";

// Liseré gauche 3px = couleur d'urgence BRUTE (UX-DR4/FR5) — sans gradient ni pulsation.
const railColor: Record<UrgencyLevel, string> = {
  none: "border-l-u-none",
  far: "border-l-u-far",
  soon: "border-l-u-soon",
  now: "border-l-u-now",
};

// Icône de type : DM = enveloppe, post = crayon-dans-cadre (FR8/UX-DR27), avec libellé.
const kindMeta: Record<TaskKind, { icon: LucideIcon; label: string }> = {
  dm: { icon: Mail, label: "Message direct" },
  post: { icon: SquarePen, label: "Publication" },
};

function formatTaskDate(date: Date | null): string | undefined {
  if (!date) return undefined;
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Europe/Paris",
  }).format(date);
}

export function TaskCard({ task }: { task: DashboardTask }) {
  const meta = kindMeta[task.kind];
  const Icon = meta.icon;
  return (
    <article
      className={cn(
        "border-glass-line bg-glass flex items-center gap-3 rounded-sm border border-l-[3px] px-4 py-3",
        railColor[task.urgency],
      )}
    >
      <span aria-label={meta.label} title={meta.label}>
        <Icon className="text-muted-foreground size-4" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1 truncate text-sm">{task.label}</span>
      <UrgencyPill level={task.urgency}>
        {formatTaskDate(task.dateProgrammee)}
      </UrgencyPill>
    </article>
  );
}
