import type { TaskKind } from "@/lib/domain/dashboard";
import type { Etape } from "@/lib/domain/enums";
import type { UrgencyLevel } from "@/lib/domain/urgency";

/** Un message du fil de conversation : de moi (touche envoyée) ou du prospect (réponse). */
export interface ThreadMessage {
  id: string;
  from: "moi" | "prospect";
  texte: string;
}

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
  // --- Contexte de rédaction (Story 2.5, lecture seule) ---
  /** Étape de séquence courante (DM) ; null pour un post. */
  etape: Etape | null;
  /** Accroche/angle noté sur le prospect (le « pourquoi » du message). */
  accroche: string | null;
  /** Signaux notés à mettre en avant (surlignage or). */
  signaux: string[];
  /** Fil des touches déjà échangées (vide pour un post ou une 1re touche). */
  thread: ThreadMessage[];
  prospect: string;
  prospectLinkedinUrl: string | null;
}
