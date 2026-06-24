import type { UrgencyLevel } from "@/lib/domain/urgency";

// Type de tâche affichée au dashboard : un message direct (DM) ou une publication (post).
export type TaskKind = "dm" | "post";

// Modèle d'affichage MINIMAL d'une tâche du dashboard (FR8 : données minimales par carte).
// Construit côté serveur depuis MessageProgramme / PostLinkedIn ; l'urgence est dérivée
// (AD-5), jamais stockée.
export interface DashboardTask {
  id: string;
  kind: TaskKind;
  /** Libellé en action nommée (« Touche 2 à Y », « Préparer post… ») — FR6. */
  label: string;
  /** Date d'envoi/publication prévue (null = pas d'échéance). */
  dateProgrammee: Date | null;
  urgency: UrgencyLevel;
}

// Rang d'affichage : l'urgence la plus forte d'abord (FR4 — tri par urgence-temps seule).
const urgencyRank: Record<UrgencyLevel, number> = {
  now: 0,
  soon: 1,
  far: 2,
  none: 3,
};

export function urgencyOrder(level: UrgencyLevel): number {
  return urgencyRank[level];
}
