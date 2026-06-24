import type { TaskKind } from "@/lib/domain/dashboard";
import type { UrgencyLevel } from "@/lib/domain/urgency";

// Vue détail d'une tâche (« le joyau ») — centrée sur le texte. `statutLabel` est déjà
// humanisé côté serveur pour rester agnostique du type (MsgStatut vs PostStatut), au
// service du modèle de boutons unifié post/DM (FR18).
export interface TaskDetail {
  id: string;
  kind: TaskKind;
  label: string;
  statutLabel: string;
  urgency: UrgencyLevel;
  dateProgrammee: Date | null;
  texte: string;
  /** Contexte minimal nécessaire au lien LinkedIn (DM) — le reste arrive en Story 2.5. */
  prospect: string;
  prospectLinkedinUrl: string | null;
}
